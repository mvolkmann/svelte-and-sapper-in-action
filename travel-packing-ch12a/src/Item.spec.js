import {cleanup, render} from '@testing-library/svelte';

import Item from './Item.svelte';

describe('Item', () => {
  const categoryId = 1;
  const dnd = {};
  const item = {id: 2, name: 'socks', packed: false};

  // Unmounts any components mounted in the previous test.
  afterEach(cleanup);

  test('should render', () => {
    const {getByTestId, getByText} = render(Item, {categoryId, dnd, item});
    const checkbox = document.querySelector('input[type="checkbox"]');
    expect(checkbox).not.toBeNull(); // found checkbox
    expect(getByText(item.name)); // found item name
    expect(getByTestId('delete')); // found delete button
  });

  test('should match snapshot', () => {
    const {container} = render(Item, {categoryId, dnd, item});
    expect(container).toMatchSnapshot();
  });
});
