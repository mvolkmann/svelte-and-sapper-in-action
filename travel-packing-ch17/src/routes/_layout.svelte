<main>
  <h1 class="hero">Travel Packing Checklist</h1>
  <slot />
</main>

<style>
  :global(body) {
    background-color: #3f6fde;
  }

  .hero {
    --height: 7rem;

    /* background-color: orange; fails accessibility tests */
    background-color: #a3660a;
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
