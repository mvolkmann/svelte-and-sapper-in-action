<script>
  import page from 'page';
  import {cartStore} from './stores.js';

  // These are the page components.
  import Cart from './Cart.svelte';
  import NotFound from './NotFound.svelte';
  import Ship from './Ship.svelte';
  import Shop from './Shop.svelte';

  // This holds the page component to be rendered.
  let component;

  page.redirect('/', '/shop');
  page('/cart', () => (component = Cart));
  page('/ship', () => (component = Ship));
  page('/shop', () => (component = Shop));

  // Since this is the last registered path
  // and it matches everything.
  // It will be invoked for any path not already handled.
  // If the first parameter, '*', is omitted,
  // it will do the same thing.
  page('*', () => (component = NotFound));

  // This tells "page" to start
  page.start();
</script>

<nav>
  <a href="/shop" class:active={component === Shop}>Shop</a>
  <a class="icon" href="/cart" class:active={component === Cart}>&#x1F6D2; {$cartStore.length}</a>
  <a href="/ship" class:active={component === Ship}>Ship</a>
</nav>

<main>
  <!-- This is a special Svelte element
       that renders a given component. -->
  <svelte:component this={component} />
</main>

<style>
  /* This defines a CSS variable that any rule can use. */
  :root {
    --space: 10px;
  }

  a {
    background-color: white;
    border-radius: var(--space);
    margin-right: var(--space);
    padding: var(--space);
    text-decoration: none;
  }

  a.active {
    background-color: yellow;
  }

  .icon {
    padding-bottom: 6px;
    padding-top: 6px;
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
