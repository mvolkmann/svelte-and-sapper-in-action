import {tick} from 'svelte';
import {cleanup, fireEvent, render, waitFor} from '@testing-library/svelte';

import TodoList from './TodoList.svelte';

describe('TodoList', () => {
  const PREDEFINED_TODOS = 2;

  afterEach(cleanup);

  function expectTodoCount(count) {
    return waitFor(() => {
      // Each todo has an <li> root element.
      const lis = document.querySelectorAll('li');
      expect(lis.length).toBe(count);
    });
  }

  test('should render', async () => {
    const {getByText} = render(TodoList);
    expect(getByText('To Do List'));
    expect(getByText('1 of 2 remaining'));
    expect(getByText('Archive Completed'));
    await expectTodoCount(PREDEFINED_TODOS);
  });

  test('should add a todo', async () => {
    const {getByTestId, getByText} = render(TodoList);

    const input = getByTestId('todo-input');
    const value = 'buy milk';
    fireEvent.input(input, {target: {value}});
    fireEvent.click(getByText('Add'));

    await expectTodoCount(PREDEFINED_TODOS + 1);
    expect(getByText(value));
  });

  test('should archive completed', async () => {
    const {getByText} = render(TodoList);
    fireEvent.click(getByText('Archive Completed'));
    await expectTodoCount(PREDEFINED_TODOS - 1);
    expect(getByText('1 of 1 remaining'));
  });

  test('should delete a todo', async () => {
    const {getAllByText, getByText} = render(TodoList);
    const text = 'learn Svelte'; // first todo
    expect(getByText(text));

    const deleteBtns = getAllByText('Delete');
    fireEvent.click(deleteBtns[0]); // deletes first todo
    await expectTodoCount(PREDEFINED_TODOS - 1);
  });

  test('should toggle a todo', async () => {
    const {container, getByText} = render(TodoList);
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');

    fireEvent.click(checkboxes[1]); // second todo
    await tick();
    expect(getByText('0 of 2 remaining'));

    fireEvent.click(checkboxes[0]); // first todo
    await tick();
    expect(getByText('1 of 2 remaining'));
  });
});
