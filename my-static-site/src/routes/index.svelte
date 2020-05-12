<script>
  let name = 'Hello';
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<h1>Purpose</h1>

<p>
  This is a Sapper app that can be used
  to demonstrate exporting a static site.
</p>

<label>Name <input bind:value={name}></label>
<h1>Hello, {name}!</h1>