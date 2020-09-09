<script context="module">
  export async function preload({params}) {
    const {name} = params;
    const res = await this.fetch(`dogs/${name}.json`);
    console.log('[name].svelte preload: res.ok =', res.ok);
    if (res.ok) {
      const data = await res.json();
      if (res.status === 200) {
        return {dog: data};
      } else {
        this.error(res.status, data.message);
      }
    } else {
      const {message} = await res.json();
      const status = message && message.endsWith('not found') ? 404 : 500;
      this.error(status, 'error getting dog data: ' + message);
    }
  }
</script>

<script>
  import {goto} from '@sapper/app';

  export let dog;

  function back() {
    goto('/dogs');
  }
</script>

<svelte:head>
  <title>{dog.name}</title>
</svelte:head>

{#if dog.message}
  <h1>{dog.message}</h1>
  <button on:click={back}>Back</button>
{:else}
  <h1>{dog.name} - {dog.breed}</h1>
  <div class="container">
    <div>
      <p>{dog.description}</p>
      <button on:click={back}>Back</button>
    </div>
    <img alt="dog" src={dog.imageUrl} />
  </div>
{/if}

<style>
  .container {
    display: flex;
  }

  img {
    height: 400px;
    margin-left: 1rem;
  }

  p {
    max-width: 300px;
  }
</style>
