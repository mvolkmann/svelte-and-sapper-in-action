import {cleanup, render} from '@testing-library/svelte';

import Item from './Item.svelte';

describe('Item', () => {
  const categoryId = 1;
  const dnd = {drag: () => {}}; // no-op
  const item = {id: 2, name: 'socks', packed: false};
  const trashcanUnicode = '&#x1F5D1;';

  // Unmounts any components mounted in the previous test.
  afterEach(cleanup);

  test('should render', () => {
    const {getByText} = render(Item, {props: {categoryId, dnd, item}});
    const checkbox = document.querySelector('input[type="checkbox"]');
    expect(checkbox).not.toBeNull(); // found checkbox
    expect(getByText(item.name)); // found item name
    expect(getByText(trashcanUnicode)); // found trashcan button
  });

  // There is no easy way to test that events are fired
  // when the checkbox state is changed
  // or when the delete button is pressed.
  // These are covered by tests in Category.spec.js.
});
