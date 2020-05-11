<script>
  import {cartStore} from '../stores.js';

  let total = $cartStore.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let city = '';
  let name = '';
  let state = '';
  let street = '';
  let zip = '';

  $: shipping = total === 0 ? 0 : total < 10 ? 2 : total < 30 ? 6 : 10;

  const format = cost => '$' + cost.toFixed(2);
</script>

<svelte:head>
	<title>Ship</title>
</svelte:head>

<h1>Ship</h1>

<form on:submit|preventDefault>
  <label>
    Name
    <input bind:value={name} />
  </label>
  <label>
    Street
    <input bind:value={street} />
  </label>
  <label>
    City
    <input bind:value={city} />
  </label>
  <label>
    State
    <input bind:value={state} />
  </label>
  <label>
    Zip
    <input bind:value={zip} />
  </label>
</form>

<h3>Shipping to:</h3>
<div>{name}</div>
<div>{street}</div>
<div>{city ? city + ',' : ''} {state} {zip}</div>

<div class="totals">
  <label>Total</label> {format(total)}
  <label>Shipping</label> {format(shipping)}
  <label>Grand Total</label> {format(total + shipping)}
</div>

<style>
  form {
    display: inline-block;
  }

  form > label {
    display: block;
    margin-bottom: 5px;
    text-align: right;
    width: 100%;
  }

  .totals {
    margin-top: 10px;
  }
</style>