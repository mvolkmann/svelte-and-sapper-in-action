<script>
  import {createEventDispatcher} from 'svelte';
  import {flip} from 'svelte/animate';
  import Category from './Category.svelte';
  import Dialog from './Dialog.svelte';
  import {getGuid, sortOnName} from './util';

  const dispatch = createEventDispatcher();
  const options = {duration: 700};

  let categoryArray = [];
  let categories = {};
  let categoryName;
  let dialog = null;
  let message = '';
  let show = 'all';

  $: categoryArray = sortOnName(Object.values(categories));

  let dragAndDrop = {
    drag(event, categoryId, itemId) {
      const data = {categoryId, itemId};
      event.dataTransfer.setData('text/plain', JSON.stringify(data));
    },
    drop(event, categoryId) {
      const json = event.dataTransfer.getData('text/plain');
      const data = JSON.parse(json);

      const category = categories[data.categoryId];
      const item = category.items[data.itemId];
      delete category.items[data.itemId];

      categories[categoryId].items[data.itemId] = item;

      categories = categories;
    }
  };

  function addCategory() {
    const duplicate = Object.values(categories).some(
      cat => cat.name === categoryName
    );
    if (duplicate) {
      message = `The category "${categoryName}" already exists.`;
      dialog.showModal();
      return;
    }

    const id = getGuid();
    categories[id] = {id, name: categoryName, items: {}};
    categories = categories; // trigger update
    categoryName = ''; // clear the input
  }

  function clearAllChecks() {
    for (const category of Object.values(categories)) {
      for (const item of Object.values(category.items)) {
        item.packed = false;
      }
    }
    categories = categories;
  }

  function deleteCategory(category) {
    if (Object.values(category.items).length) {
      message = 'This category is not empty.';
      dialog.showModal();
      return;
    }

    delete categories[category.id];
    categories = categories;
  }

  // Must do this before first call to persist.
  restore();

  // Any time categories changes, persist it to localStorage.
  $: if (categories) persist();

  function persist() {
    localStorage.setItem('travel-packing', JSON.stringify(categories));
  }

  function restore() {
    const text = localStorage.getItem('travel-packing');
    if (text && text !== '{}') {
      categories = JSON.parse(text);
    }
  }
</script>

<section>
  <header>
    <form on:submit|preventDefault={addCategory}>
      <label>
        New Category
        <input
          data-testid="category-name-input"
          required
          bind:value={categoryName} />
      </label>
      <button>Add Category</button>
    </form>
    <button class="logout-btn" on:click={() => dispatch('logout')}>
      Log Out
    </button>
    <p>
      Suggested categories include Backpack, Clothes,
      <br />
      Last Minute, Medicines, Running Gear, and Toiletries.
    </p>

    <fieldset>
      <div>
        <legend>Show</legend>
        <label>
          <input name="show" type="radio" value="all" bind:group={show} />
          All
        </label>
        <label>
          <input name="show" type="radio" value="packed" bind:group={show} />
          Packed
        </label>
        <label>
          <input name="show" type="radio" value="unpacked" bind:group={show} />
          Unpacked
        </label>
        <button class="clear" on:click={clearAllChecks}>
          Clear All Checks
        </button>
      </div>
    </fieldset>
  </header>

  <div class="categories">
    {#each categoryArray as category (category.id)}
      <div class="animate" animate:flip={options}>
        <Category
          bind:category
          {categories}
          dnd={dragAndDrop}
          {show}
          on:delete={() => deleteCategory(category)}
          on:persist={persist} />
      </div>
    {/each}
  </div>
</section>
<Dialog title="Checklist" bind:dialog>
  <div>{message}</div>
</Dialog>

<style>
  .animate {
    display: inline-block;
  }

  .categories {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .clear {
    margin-left: 2rem;
  }

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }

  fieldset > div {
    display: flex;
    align-items: center;
  }

  fieldset input {
    margin-left: 1.5rem;
  }

  fieldset legend {
    padding: 0;
  }

  input[type='radio'] {
    --size: 1.5rem;
    height: var(--size);
    width: var(--size);
  }

  .logout-btn {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 1.5rem;
    margin-top: 1rem;
  }
</style>
