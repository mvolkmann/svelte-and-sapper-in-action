<script>
  import Dialog from '../src/Dialog.svelte';
  let content = 'This is some\\nlong content.';
  let dialog;
  let title = 'My Dialog Title';

  $: lines = content.split('\\n');
</script>

<section>
  <label>
    Title
    <input bind:value={title} />
  </label>

  <label>
    Content
    <textarea bind:value={content} />
    Insert \n to get multi-line content.
  </label>

  <button on:click={() => dialog.showModal()}>Show Dialog</button>

  <Dialog {title} bind:dialog on:close={() => dialog.close()}>
    {#each lines as line}
      <div>{line}</div>
    {/each}
  </Dialog>
</section>

<style>
  input, textarea {
    margin: 0 1rem 1rem 1rem;
  }

  label {
    color: white;
    display: flex;
    align-items: flex-start;
  }

  section {
    background-color: #3F6FDE;
    height: 100vh;
    padding: 1rem;
  }
</style>
