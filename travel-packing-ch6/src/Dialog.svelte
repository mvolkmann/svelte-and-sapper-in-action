<script>
  import dialogPolyfill from 'dialog-polyfill'
  import {createEventDispatcher, onMount} from 'svelte';

  // Boolean that determines whether a close "X" should be displayed.
  export let canClose = true;

  // Optional CSS class name to be added to the dialog element.
  export let className = '';

  // Parent components can use bind:dialog={myDialog} to get a
  // reference so they can call show(), showModal(), and close().
  export let dialog;

  // An optional icon to render in the header before the title.
  export let icon = undefined;

  // Title text to display in the dialog header.
  export let title;

  const dispatch = createEventDispatcher();

  $: classNames = 'dialog' + (className ? ' ' + className : '');

  onMount(() => dialogPolyfill.registerDialog(dialog));

  function close() {
    // Parent components can optionally listen for this event.
    dispatch('close');
    dialog.close();
  }
</script>

<dialog bind:this={dialog} class={classNames}>
  <header>
    {#if icon}{icon}{/if}
    <div class="title">{title}</div>
    {#if canClose}
      <!-- Displays a unicode "heavy multiplication X". -->
      <button class="close-btn" on:click={close}>&#x2716;</button>
    {/if}
  </header>
  <main>
    <slot />
  </main>
</dialog>

<style>
  .body {
    padding: 10px;
  }

  .close-btn {
    background-color: transparent;
    border: none;
    color: white;
    font-size: 24px;
    outline: none;
    margin: 0;
    padding: 0;
  }

  dialog {
    /* These properties center the dialog in the browser window. */
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);

    border: none;
    box-shadow: 0 0 10px darkgray;
    padding: 0;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: cornflowerblue;
    box-sizing: border-box;
    color: white;
    font-weight: bold;
    padding: 10px;
    width: 100%;
  }

  main {
    padding: 10px;
  }

  .title {
    flex-grow: 1;
    font-size: 18px;
    margin-right: 10px;
  }

  dialog::backdrop,
  dialog + .backdrop {
    /* a transparent shade of gray */
    background-color: rgba(0, 0, 0, 0.4);
  }
</style>