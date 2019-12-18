<script>
  import Login from './Login.svelte';
</script>

<main>
  <h1 class="hero">Travel Packing Checklist</h1>
  <Login />
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
