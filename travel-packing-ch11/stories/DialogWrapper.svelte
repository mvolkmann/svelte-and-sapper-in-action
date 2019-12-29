<script>
  import Dialog from '../src/Dialog.svelte';
  let content = 'This is some content.';
  let dialog;
  let title = 'My Dialog Title';
</script>

<section>
  <label>
    Title
    <input bind:value={title} />
  </label>

  <label>
    Content
    <textarea bind:value={content} />
  </label>

  <button on:click={() => dialog.showModal()}>Show Dialog</button>

  <Dialog {title} bind:dialog={dialog} on:close={() => dialog.close()}>
    {content}
  </Dialog>
</section>

<style>
  input, textarea {
    margin-left: 1rem;
  }

  label {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  section {
    background-color: cornflowerblue;
    height: 100vh;
    padding: 1rem;
  }
</style>
