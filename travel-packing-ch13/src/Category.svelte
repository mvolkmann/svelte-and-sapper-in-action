<script>
  import {createEventDispatcher} from 'svelte';
  import {flip} from 'svelte/animate';
  import {linear} from 'svelte/easing';
  import {scale} from 'svelte/transition';
  import Dialog from './Dialog.svelte';
  import Item from './Item.svelte';
  import {getGuid, blurOnKey, sortOnName} from './util';

  export let categories;
  export let category;
  export let dnd;
  export let show;

  const dispatch = createEventDispatcher();
  const options = {duration: 700, easing: linear, times: 2};

  let dialog = null;
  let editing = false;
  let hovering = false;
  let itemName = '';
  let items = [];
  let message = '';

  $: items = Object.values(category.items);
  $: remaining = items.filter(item => !item.packed).length;
  $: total = items.length;
  $: status = `${remaining} of ${total} remaining`;
  $: itemsToShow = sortOnName(items.filter(i => shouldShow(show, i)));

  function addItem() {
    const duplicate = Object.values(categories).some(cat =>
      Object.values(cat.items).some(item => item.name === itemName)
    );
    if (duplicate) {
      message = `The item "${itemName}" already exists.`;
      dialog.showModal();
      return;
    }

    const {items} = category;
    const id = getGuid();
    items[id] = {id, name: itemName, packed: false};
    category.items = items;
    itemName = '';

    dispatch('persist');
  }

  function deleteItem(item) {
    delete category.items[item.id];
    category = category; // triggers update

    dispatch('persist');
  }

  function shouldShow(show, item) {
    return (
      show === 'all' ||
      (show === 'packed' && item.packed) ||
      (show === 'unpacked' && !item.packed)
    );
  }

  function spin(node, options) {
    const {easing, times = 1} = options;
    return {
      ...options,
      css(t) {
        const eased = easing(t);
        const degrees = 360 * times; // through which to spin
        return (
          'transform-origin: 50% 50%; ' +
          `transform: scale(${eased}) ` +
          `rotate(${eased * degrees}deg);`
        );
      }
    };
  }
</script>

<section
  class:hover={hovering}
  in:scale={options}
  out:spin={options}
  on:dragenter={() => (hovering = true)}
  on:dragleave={event => {
    const {localName} = event.target;
    if (localName === 'section') hovering = false;
  }}
  on:drop|preventDefault={event => {
    dnd.drop(event, category.id);
    hovering = false;
  }}
  on:dragover|preventDefault>
  <h2>
    {#if editing}
      <input
        bind:value={category.name}
        on:blur={() => (editing = false)}
        on:keypress={blurOnKey} />
    {:else}
      <span on:click={() => (editing = true)}>{category.name}</span>
    {/if}
    <span class="status">{status}</span>
    <button class="icon" on:click={() => dispatch('delete')}>&#x1F5D1;</button>
  </h2>

  <form on:submit|preventDefault={addItem}>
    <label>
      New Item
      <input data-testid="item-input" required bind:value={itemName} />
    </label>
    <button>Add Item</button>
  </form>

  <ul>
    {#each itemsToShow as item (item.id)}
      <div animate:flip>
        <!-- This bind causes the category object to update
            when the item packed value is toggled. -->
        <Item
          bind:item
          categoryId={category.id}
          {dnd}
          on:delete={() => deleteItem(item)} />
      </div>
    {:else}
      <div>This category does not contain any items yet.</div>
    {/each}
  </ul>
</section>

<Dialog title="Category" bind:dialog>
  <div>{message}</div>
</Dialog>

<style>
  button,
  input {
    border: solid lightgray 1px;
  }

  button.icon {
    border: none;
  }

  h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0;
  }

  .hover {
    border-color: orange;
  }

  section {
    --padding: 0.5rem;

    background-color: white;
    border: solid transparent 3px;
    border-radius: var(--padding);
    color: black;
    display: inline-block;
    margin: var(--padding);
    padding: calc(var(--padding) * 2);
    padding-top: 0;
    vertical-align: top;
  }

  .status {
    font-size: 1.2rem;
    font-weight: normal;
    margin: 0 1rem;
  }

  ul {
    list-style: none;
    margin: 0;
    padding-left: 0;
  }
</style>
