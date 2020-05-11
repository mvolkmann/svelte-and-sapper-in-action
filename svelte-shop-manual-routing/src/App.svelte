<script>
  import {cartStore} from './stores.js';

  import NavButton from './NavButton.svelte';

  // These are the page components.
  import Cart from './Cart.svelte';
  import Ship from './Ship.svelte';
  import Shop from './Shop.svelte';

  const pageMap = {
    cart: Cart,
    ship: Ship,
    shop: Shop
  };

  let pageName = 'shop';
</script>

<nav>
  <NavButton bind:pageName="{pageName}" name="shop">Shop</NavButton>
  <NavButton bind:pageName="{pageName}" name="cart"
    >&#x1F6D2; {$cartStore.length}</NavButton
  >
  <NavButton bind:pageName="{pageName}" name="ship">Ship</NavButton>
</nav>

<main>
  <!-- This is a special Svelte element
       that renders a given component. -->
  <svelte:component this="{pageMap[pageName]}" />
</main>

<style>
  /* This defines a CSS variable that any rule can use. */
  :root {
    --space: 10px;
  }

  main {
    padding: var(--space);
  }

  nav {
    display: flex;
    align-items: center;
    background-color: cornflowerblue;
    padding: var(--space);
  }
</style>
