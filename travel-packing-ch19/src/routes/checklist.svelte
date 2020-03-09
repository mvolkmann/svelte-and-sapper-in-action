<script context="module">
  export async function preload() {
    try {
      const res = await this.fetch('categories.json');
      if (res.offline) return;
      if (res.ok) {
        const categories = await res.json();

        // Create a map of category ids to category objects.
        const categoryMap = categories.reduce((acc, category) => {
          acc[category._id] = category;
          return acc;
        }, {});

        return {categoryMap};
      } else {
        const msg = await res.text();
        this.error(res.statusCode, 'checklist preload: ' + msg);
      }
    } catch (e) {
      this.error(500, 'checklist preload: ' + e.message);
    }
  }
</script>

<script>
  import {flip} from 'svelte/animate';

  import Category from '../components/Category.svelte';
  import Dialog from '../components/Dialog.svelte';
  import {fetchPlus, sortOnName} from '../util';

  export let categoryMap;

  const options = {duration: 700};

  let categoryArray = [];
  let categoryName;
  let myDialog = null;
  let message = '';
  let show = 'all';

  $: categoryArray = sortOnName(Object.values(categoryMap));

  let dragAndDrop = {
    drag: (event, categoryId, itemId) => {
      const data = {categoryId, itemId};
      event.dataTransfer.setData('text/plain', JSON.stringify(data));
    },
    drop: async (event, newCategoryId) => {
      event.preventDefault();
      const json = event.dataTransfer.getData('text/plain');
      const data = JSON.parse(json);

      try {
        const oldCategory = categoryMap[data.categoryId];
        const item = oldCategory.items[data.itemId];

        // Delete the item from the old category.
        let options = {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(item)
        };
        let path = `categories/${oldCategory._id}/items/${item.id}.json`;
        let res = await fetchPlus(path, options);
        if (res.offline) return;
        if (!res.ok) throw new Error(await res.text());

        // Add the item to the new category.
        const newCategory = categoryMap[newCategoryId];
        options = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(item)
        };
        path = `categories/${newCategory._id}/items.json`;
        res = await fetchPlus(path, options);
        if (res.offline) return;
        if (!res.ok) throw new Error(await res.text());

        // Update the UI.
        delete oldCategory.items[data.itemId];
        newCategory.items[item.id] = item;
        categoryMap = categoryMap; // triggers update
      } catch (e) {
        console.error('checklist.svelte drop:', e.message);
      }
    }
  };

  function clearAllChecks() {
    for (const category of Object.values(categoryMap)) {
      for (const item of Object.values(category.items)) {
        item.packed = false;
      }
    }
    categoryMap = categoryMap; // triggers update
  }

  async function deleteCategory(category) {
    if (Object.values(category.items).length) {
      message = 'This category is not empty.';
      myDialog.showModal();
      return;
    }

    const id = category._id;
    try {
      const options = {method: 'DELETE'};
      // This invokes the "del" middleware function
      // defined in [id].json.js.
      const res = await fetchPlus(`categories/${id}.json`, options);
      if (res.offline) return;
      if (!res.ok) throw new Error('failed to delete category with id ' + id);
      delete categoryMap[id];
      categoryMap = categoryMap; // triggers update
    } catch (e) {
      console.error('checklist.svelte deleteCategory:', e.message);
    }
  }

  async function saveCategory(category) {
    if (!category) {
      // adding a new category
      const duplicate = Object.values(categoryMap).some(
        cat => cat.name === categoryName
      );
      if (duplicate) {
        message = `The category "${category.name}" already exists.`;
        myDialog.showModal();
        return;
      }
      category = {name: categoryName, items: {}};
    }

    const id = category._id;

    try {
      const options = {
        method: id ? 'PUT' : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(category)
      };

      const path = id ? `categories/${id}.json` : 'categories.json';
      const res = await fetchPlus(path, options);
      if (res.offline) return;
      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      categoryMap[result._id] = result;
      categoryMap = categoryMap; // triggers update

      categoryName = ''; // clear the input
    } catch (e) {
      console.error('checklist.svelte saveCategory:', e.message);
    }
  }
</script>

<svelte:head>
  <title>Checklist</title>
</svelte:head>

<section>
  <header>
    <form on:submit|preventDefault={() => saveCategory()}>
      <label>
        New Category
        <input
          data-testid="category-name-input"
          required
          bind:value={categoryName} />
      </label>
      <button>Add Category</button>
    </form>
    <a class="button logout-btn" href="/">Log Out</a>
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
    {#each categoryArray as category (category._id)}
      <div class="animate" animate:flip={options}>
        <Category
          bind:category
          {categoryMap}
          dnd={dragAndDrop}
          {show}
          on:delete={() => deleteCategory(category)}
          on:persist={() => saveCategory(category)} />
      </div>
    {/each}
  </div>
</section>
<Dialog title="Checklist" bind:dialog={myDialog}>
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
