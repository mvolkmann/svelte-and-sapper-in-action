<script>
  import {createEventDispatcher} from 'svelte';
  import {blurOnKey} from './util';

  export let categoryId;
  export let dnd;
  export let item;

  const dispatch = createEventDispatcher();
  let editing = false;
</script>

<li>
  <input
    aria-label="Toggle Packed"
    type="checkbox"
    bind:checked={item.packed} />
  {#if editing}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      aria-label="Edit Name"
      autofocus
      bind:value={item.name}
      on:blur={() => (editing = false)}
      on:keydown={blurOnKey}
      type="text" />
  {:else}
    <span
      class="packed-{item.packed}"
      draggable={true}
      on:dragstart={event => dnd.drag(event, categoryId, item.id)}
      on:click={() => (editing = true)}>
      {item.name}
    </span>
  {/if}
  <button class="icon" data-testid="delete" on:click={() => dispatch('delete')}>
    &#x1F5D1;
  </button>
</li>

<style>
  button {
    background-color: transparent;
    border: none;
  }

  input[type='checkbox'] {
    --size: 1.5rem;
    height: var(--size);
    width: var(--size);
  }

  input[type='text'] {
    border: solid lightgray 1px;
  }

  li {
    display: flex;
    align-items: center;
  }

  .packed-true {
    color: gray;
    text-decoration: line-through;
  }

  span {
    margin: 0 0.5rem;
  }
</style>
