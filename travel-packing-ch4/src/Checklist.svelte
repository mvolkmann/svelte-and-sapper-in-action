<script>
  import Category from './Category.svelte';
  import {getGuid, sortOnName} from './util';

  let categoryArray = [];
  let categories = {};
  let categoryName;
  let message = '';
  let show = 'all';

  $: categoryArray = sortOnName(Object.values(categories));

  function addCategory() {
    const duplicate = Object.values(categories).some(
      cat => cat.name === categoryName
    );
    if (duplicate) {
      message = `The category "${categoryName}" already exists.`;
      alert(message); // will change to a dialog later
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
</script>

<section>
  <header>
    <form on:submit|preventDefault={addCategory}>
      <label>
        New Category
        <input required bind:value={categoryName} />
      </label>
      <button>Add Category</button>
      <button class="logout-btn">Log Out</button>
    </form>
    <p>
      Suggested categories include Backpack, Clothes,
      <br />
      Last Minute, Medicines, Running Gear, and Toiletries.
    </p>

    <div class="radios">
      <label>Show</label>
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

      <button class="clear" on:click={clearAllChecks}>Clear All Checks</button>
    </div>
  </header>

  <div class="categories">
    {#each categoryArray as category (category.id)}
      <Category bind:category {categories} {show} />
    {/each}
  </div>
</section>

<style>
  .categories {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .clear {
    margin-left: 2rem;
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

  .radios {
    display: flex;
    align-items: center;
  }

  .radios > label:not(:first-of-type) {
    display: inline-flex;
    align-items: center;

    margin-left: 1rem;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 1.5rem;
    margin-top: 1rem;
  }
</style>
