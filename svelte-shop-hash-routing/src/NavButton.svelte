<script>
  export let name;
  export let pageName;
</script>

<button
  class:active={pageName === name}
  on:click={() => pageName = name}
>
  <slot />
</button>

<style>
  button {
    background-color: white;
    border-radius: var(--space);
    height: 38px;
    margin-right: var(--space);
    padding: var(--space);
  }

  .active {
    background-color: yellow;
  }
</style>