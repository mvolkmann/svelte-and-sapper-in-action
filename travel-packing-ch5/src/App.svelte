<script>
  import Checklist from './Checklist.svelte';
  import Login from './Login.svelte';

  let page = Login;
</script>

<main>
  <h1 class="hero">Travel Packing Checklist</h1>

  {#if page === Login}
    <Login on:login={() => (page = Checklist)} />
  {:else}
    <Checklist on:logout={() => (page = Login)} />
  {/if}
</main>

<style>
  .hero {
    --height: 120px;

    background-color: orange;
    color: white;
    font-size: 64px;
    height: var(--height);
    line-height: var(--height);
    margin: 0 0 50px 0;
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
