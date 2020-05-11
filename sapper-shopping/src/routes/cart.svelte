<script>
  import {cartStore} from '../stores.js';

  let total = $cartStore.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
</script>

<svelte:head>
  <title>Cart</title>
</svelte:head>

<h1>Cart</h1>

{#if $cartStore.length === 0}
<div>empty</div>
{:else}
<table>
  <tr>
    <th>Description</th>
    <th>Quantity</th>
    <th>Price</th>
  </tr>
  {#each $cartStore as item}
  <tr>
    <td>{item.description}</td>
    <td>{item.quantity}</td>
    <td>${item.price.toFixed(2)}</td>
  </tr>
  {/each}
  <tr>
    <td><label>Total</label></td>
    <td></td>
    <td>${total.toFixed(2)}</td>
  </tr>
</table>
{/if}
