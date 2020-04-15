<script>
  import page from 'page';
  import Checklist from './Checklist.svelte';
  import Login from './Login.svelte';
  import NotFound from './NotFound.svelte';

  /*
  const hashMap = {
    '#login': Login,
    '#checklist': Checklist
  };
  */

  let component = Login;

  //const hashChange = () => (component = hashMap[location.hash] || NotFound);

  page.redirect('/', '/login');
  page('/login', () => (component = Login));
  page('/checklist', () => (component = Checklist));
  page('*', () => (component = NotFound));
  page.start();
</script>

<!-- <svelte:window on:hashchange={hashChange} /> -->

<main>
  <h1 class="hero">Travel Packing Checklist</h1>

  <!-- <svelte:component
    this={component}
    on:login={() => (location.href = '/#checklist')}
    on:logout={() => (location.href = '/#login')} /> -->

  <svelte:component
    this={component}
    on:login={() => page.show('/checklist')}
    on:logout={() => page.show('/login')} />
</main>

<style>
  .hero {
    --height: 7rem;

    background-color: var(--heading-bg-color);
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
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
</style>
