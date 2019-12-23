<script>
  import Checklist from './Checklist.svelte';
  import Login from './Login.svelte';
  import NotFound from './NotFound.svelte';
  import page from 'page';

  let component = Login;

  page.redirect('/', '/login');
  page('/login', () => (component = Login));
  page('/checklist', () => (component = Checklist));
  page('*', () => (component = NotFound));
  page.start();
</script>

<main>
  <h1 class="hero">Travel Packing Checklist</h1>

  {#if component === Login}
    <Login on:login={() => page.show('/checklist')} />
  {:else}
    <Checklist on:logout={() => page.show('/login')} />
  {/if}
</main>

<style>
  .hero {
    --height: 7rem;

    background-color: orange;
    color: white;
    font-size: 4rem;
    height: var(--height);
    line-height: var(--height);
    margin: 0 0 3rem 0;
    text-align: center;
    vertical-align: middle;
    width: 100vw;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
  }
</style>
