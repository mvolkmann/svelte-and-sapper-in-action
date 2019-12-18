import {cleanup, render} from '@testing-library/svelte';

import Todo from './Todo.svelte';

describe('Todo', () => {
  const text = 'buy milk';
  const todo = {text};

  afterEach(cleanup);

  test('should render', () => {
    const {getByText} = render(Todo, {props: {todo}});
    const checkbox = document.querySelector('input[type="checkbox"]');
    expect(checkbox).not.toBeNull();
    expect(getByText(text)); // the todo text
    expect(getByText('Delete')); // the button
  });

  test('should fire delete event', () => {
    // There is no easy way to do this.
    // It is covered by a test in TodoList.spec.js.
    // The approach below does not work!
    /*
    const {container, getByText} = render(Todo, {props: {todo}});

    let fired = false;
    container.addEventListener('delete', () => {
      console.log('Todo.spec.js got delete event');
      fired = true;
    });
    fireEvent.click(getByText('Delete'));
    await tick();
    expect(fired).toBe(true);
    */
  });

  test('should fire todoToggle event', () => {
    // There is no easy way to do this.
    // It is covered by a test in TodoList.spec.js.
  });
});
