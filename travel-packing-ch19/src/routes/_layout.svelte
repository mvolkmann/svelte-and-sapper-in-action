<script>
  let mainElement;
  let online = true;
  $: title = 'Travel Packing Checklist' + (online ? '' : ' Offline');
  $: if (mainElement) {
    mainElement.style.setProperty(
      '--main-bg-color',
      online ? '#3f6fde' : 'gray'
    );
  }
</script>

<svelte:window bind:online />

<main bind:this={mainElement}>
  <h1 class="hero">{title}</h1>
  <slot />
</main>

<style>
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
    --main-bg-color: #3f6fde; /* shade of blue */
    background-color: var(--main-bg-color);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
  }
</style>
