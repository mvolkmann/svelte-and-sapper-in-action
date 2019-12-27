import {tick} from 'svelte';
import {cleanup, fireEvent, render, wait} from '@testing-library/svelte';

import Category from './Category.svelte';

describe('Category', () => {
  const PREDEFINED_ITEMS = 2;

  const items = {
    1: {id: 1, name: 'socks', packed: true},
    2: {id: 2, name: 'shoes', packed: false}
  };
  const category = {id: 1, name: 'Clothes', items};
  const categories = [category];
  const dnd = {drag: () => {}}; // no-op
  const props = {categories, category, dnd, show: 'all'};

  // Unmounts any components mounted in the previous test.
  afterEach(cleanup);

  test('should match snapshot', async () => {
    const {container} = render(Category, props);
    //await tick();
    //await sleep(1000);
    expect(container).toMatchSnapshot();
  });

  function expectItemCount(count) {
    return wait(() => {
      // Each todo has an <li> root element.
      const lis = document.querySelectorAll('li');
      expect(lis.length).toBe(count);
    });
  }

  test('should render', async () => {
    const {getByText} = render(Category, props);
    expect(getByText('Clothes'));
    expect(getByText('1 of 2 remaining'));
    expect(getByText('New Item'));
    expect(getByText('Add Item'));
    await expectItemCount(PREDEFINED_ITEMS);
  });

  test.skip('should add an item', async () => {
    const {getByTestId, getByText} = render(Category, props);

    const input = getByTestId('todo-input');
    const value = 'buy milk';
    fireEvent.input(input, {target: {value}});
    fireEvent.click(getByText('Add'));

    await expectItemCount(PREDEFINED_ITEMS + 1);
    expect(getByText(value));
  });

  test.skip('should delete an item', async () => {
    const {getAllByText, getByText} = render(Category, props);
    const text = 'learn Svelte'; // first todo
    expect(getByText(text));

    const deleteBtns = getAllByText('Delete');
    fireEvent.click(deleteBtns[0]); // deletes first todo
    await expectItemCount(PREDEFINED_ITEMS - 1);
  });

  test.skip('should toggle an item', async () => {
    const {container, getByText} = render(Category, props);
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');

    fireEvent.click(checkboxes[1]); // second todo
    await tick();
    expect(getByText('0 of 2 remaining'));

    fireEvent.click(checkboxes[0]); // first todo
    await tick();
    expect(getByText('1 of 2 remaining'));
  });
});
