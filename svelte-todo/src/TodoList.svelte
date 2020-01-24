<script>
  //import ShippingLabel from './ShippingLabel.svelte';
  import Todo from './Todo.svelte';

  let lastId = 0;
  const createTodo = (text, done = false) => ({id: ++lastId, text, done});

  let todoText = '';
  let todos = [
    createTodo('learn Svelte', true),
    createTodo('build a Svelte app')
  ];

  //let uncompletedCount = 0;
  $: uncompletedCount = todos.filter(t => !t.done).length;
  $: status = `${uncompletedCount} of ${todos.length} remaining`;

  function addTodo() {
    todos = todos.concat(createTodo(todoText));
    todoText = '';
  }

  const archiveCompleted = () => (todos = todos.filter(t => !t.done));

  const deleteTodo = todoId => (todos = todos.filter(t => t.id !== todoId));

  function toggleDone(todo) {
    const {id} = todo;
    todos = todos.map(t => (t.id === id ? {...t, done: !t.done} : t));
  }
</script>

<style>
  button {
    margin-left: 10px;
  }

  ul.unstyled {
    list-style: none;
    margin-left: 0;
    padding-left: 0;
  }
</style>

<div>
  <!-- <ShippingLabel>
    Mark Volkmann<br />
    123 Some Street<br />
    Somewhere, Some State 12345
  </ShippingLabel>
  <ShippingLabel /> -->
  <h2>To Do List</h2>
  <div>
    {status}
    <button on:click={archiveCompleted}>Archive Completed</button>
  </div>
  <br />
  <form on:submit|preventDefault>
    <!-- svelte-ignore a11y-autofocus -->
    <input
      data-testid="todo-input"
      type="text"
      size="30"
      autofocus
      placeholder="enter new todo here"
      bind:value={todoText} />
    <button disabled={!todoText} on:click={addTodo}>Add</button>
  </form>
  <ul class="unstyled">
    {#each todos as todo}
      <Todo
        {todo}
        on:delete={() => deleteTodo(todo.id)}
        on:toggleDone={() => toggleDone(todo)} />
    {/each}
  </ul>
</div>
