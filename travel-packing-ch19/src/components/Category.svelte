<script>
  import {createEventDispatcher} from 'svelte';
  import {flip} from 'svelte/animate';
  import {linear} from 'svelte/easing';
  import {scale} from 'svelte/transition';
  import Dialog from './Dialog.svelte';
  import Item from './Item.svelte';
  import {fetchPlus, getGuid, sortOnName} from '../util';

  export let categoryMap;
  export let category;
  export let dnd;
  export let show;

  const dispatch = createEventDispatcher();
  const options = {duration: 700, easing: linear, times: 2};

  let myDialog = null;
  let editing = false;
  let hovering = false;
  let itemName = '';
  let items = [];
  let message = '';
  let online = true;

  $: items = Object.values(category.items);
  $: remaining = items.filter(item => !item.packed).length;
  $: total = items.length;
  $: status = `${remaining} of ${total} remaining`;
  $: itemsToShow = sortOnName(items.filter(i => shouldShow(show, i)));

  async function deleteItem(item) {
    try {
      const options = {method: 'DELETE'};
      const path = `categories/${category._id}/items/${item.id}.json`;
      const res = await fetchPlus(path, options);
      if (res.offline) return;
      if (!res.ok) throw new Error('failed to delete item with id ' + item.id);

      delete category.items[item.id];
      category = category; // triggers update
    } catch (e) {
      console.error('checklist.svelte deleteItem:', e.message);
    }
  }

  function handleBlur() {
    editing = false;
    // Signal to checklist.svelte that it should save the category.
    dispatch('persist');
  }

  function handleKey(event) {
    if (event.code === 'Enter') event.target.blur();
  }

  async function saveItem(item) {
    const isNewItem = !item;

    if (isNewItem) {
      // The name cannot match that of any existing item in any category.
      const duplicate = Object.values(categoryMap).some(cat =>
        Object.values(cat.items).some(item => item.name === itemName)
      );
      if (duplicate) {
        message = `The item "${itemName}" already exists.`;
        myDialog.showModal();
        return;
      }

      item = {id: getGuid(), name: itemName, packed: false};
    }

    try {
      const options = {
        method: isNewItem ? 'POST' : 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
      };

      const path = isNewItem
        ? `categories/${category._id}/items.json`
        : `categories/${category._id}/items/${item.id}.json`;
      const res = await fetchPlus(path, options);
      if (res.offline) return;
      if (!res.ok) {
        //TODO: How can you get an error message?
        const message = await res.text();
        console.log('Category.svelte saveItem: message =', message);
        throw new Error(message);
      }

      category.items[item.id] = item;
      categoryMap = categoryMap; // triggers update
      itemName = ''; // clears input
    } catch (e) {
      console.error('checklist.svelte saveItem:', e.message);
    }
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

<svelte:window bind:online={online} />

<section
  class:hover={hovering}
  in:scale={options}
  out:spin={options}
  on:dragenter={() => (hovering = true)}
  on:dragleave={event => {
    const {localName} = event.target;
    if (localName === 'section') hovering = false;
  }}
  on:drop={event => {
    dnd.drop(event, category._id);
    hovering = false;
  }}
  ondragover="return false">
  <h2>
    {#if editing}
      <input
        bind:value={category.name}
        on:blur={handleBlur}
        on:keypress={handleKey} />
    {:else}
      <span on:click={() => (editing = online)}>{category.name}</span>
    {/if}
    <span class="status">{status}</span>
    <button class="icon" on:click={() => dispatch('delete')}>&#x1F5D1;</button>
  </h2>

  <form on:submit|preventDefault={() => saveItem()}>
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
          categoryId={category._id}
          {dnd}
          on:delete={() => deleteItem(item)}
          on:persist={() => saveItem(item)} />
      </div>
    {:else}
      <div>This category does not contain any items yet.</div>
    {/each}
  </ul>
</section>

<Dialog title="Category" bind:dialog={myDialog}>
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
