<script>
	// Inspired by https://svelte.dev/repl/810b0f1e16ac4bbd8af8ba25d5e0deff?version=3.4.2.
	let baskets = [
    {
      "name": "Basket 1",
      "items": ["Orange", "Pineapple"]
    },
    {
      "name": "Basket 2",
      "items": ["Banana", "Apple"]
    },
		{
      "name": "Basket 3",
      "items": ["GrapeFruit"]
    }
  ];
</script>

<p>Drag a fruit from one basket to another.</p>

{#each baskets as basket, basketIndex}
  <b>{basket.name}</b>
  <ul>
	  {#each basket.items as item, itemIndex}
	  	<li draggable={true}>{item}</li>
	  {/each}
  </ul>
{/each}

<style>
	.hovering {
		border-color: orange;
	}
	/* This prevents hovering over a child element from
	   generating a dragleave event, which would cause the app
	   to think you are no longer over the parent. */
	.hovering * {
		pointer-events: none;
	}
	li {
		background-color: lightgray;
		cursor: pointer;
		display: inline-block;
		margin-right: 10px;
		padding: 10px;
	}
	li:hover {
		background: orange;
		color: white;
	}
  ul {
		border: solid lightgray 1px;
		height: 40px; /* needed when empty */
		padding: 10px;
	}
</style>