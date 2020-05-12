<script context="module">
  export async function preload(page, session) {
    try {
      const res = await this.fetch('dogs.json');
      if (res.ok) {
        const names = await res.json();
        return {names};
      } else {
        const msg = await res.text();
        this.error(res.statusCode, 'error getting dog names: ' + msg);
      }
    } catch (e) {
      this.error(500, 'getDogs error:', e);
    }
  }
</script>

<script>
  // The preload function above makes this available as a prop.
  export let names;
</script>

<svelte:head>
  <title>Dogs</title>
</svelte:head>

<h1>Dogs</h1>

{#each names as name}
<div>
  <a rel="prefetch" href="dogs/{name}">{name}</a>
</div>
{/each}
<div>
  <a rel="prefetch" href="dogs/Spot">Spot</a>
</div>

<style>
  div {
    --padding: 0.5rem;
    box-sizing: border-box;
    height: calc(22px + var(--padding) * 2);
    margin-top: var(--padding);
  }

  div > a {
    border: solid lightgray 2px;
    border-radius: var(--padding);
    padding: var(--padding);
    text-decoration: none;
  }
</style>
