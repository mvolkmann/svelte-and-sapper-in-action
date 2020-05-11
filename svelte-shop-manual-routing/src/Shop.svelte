<script>
  import items from './items';
  import {cartStore} from './stores.js';

  function changeQuantity(event, item) {
    const newQuantity = Number(event.target.value);
    cartStore.update(items => {
      // If the new quantity is not zero and the old quantity is zero ...
      if (newQuantity && !item.quantity) {
        // Add the item from the cart.
        items.push(item);
        // If the new quantity is zero and the old quantity is not zero ...
      } else if (newQuantity === 0 && item.quantity) {
        // Remove the item from the cart.
        const {description} = item;
        items = items.filter(i => i.description !== description);
      }

      item.quantity = newQuantity;

      return items;
    });
  }
</script>

<h1>Shop</h1>

<table>
  <tr>
    <th>Description</th>
    <th>Price</th>
    <th>Quantity</th>
  </tr>
  {#each items as item}
  <tr>
    <td>{item.description}</td>
    <td>${item.price.toFixed(2)}</td>
    <td>
      <input type="number" min="0" on:input={e => changeQuantity(e, item)} />
    </td>
  </tr>
  {/each}
</table>

<style>
  input {
    width: 60px;
  }

  table {
    border-collapse: collapse;
  }

  td,
  th {
    border: solid lightgray 1px;
    padding: 0.5rem;
  }
</style>
