<script>
  import {goto} from '@sapper/app';

  let password = '';
  let username = '';

  const login = () => goto('/checklist');
  const signup = () => alert('You pressed Signup.');
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<section>
  <form on:submit|preventDefault={login}>
    <label>
      Username
      <input required bind:value={username} />
    </label>
    <label>
      Password
      <input type="password" required bind:value={password} />
    </label>
    <div class="buttons">
      <button>Login</button>
      <!-- <a class="button" href="/checklist">Login</a> -->
      <button type="button" on:click={signup}>Sign Up</button>
    </div>
  </form>
</section>

<style>
  .buttons {
    display: flex;
    justify-content: space-between;

    font-size: 1.5rem;
    margin-top: 1rem;
  }

  form {
    display: inline-block;
  }

  input {
    display: block;
    margin-top: 0.3rem;
  }

  label {
    color: white;
    display: block;
    font-size: 1.5rem;
    margin-top: 0.5rem;
  }
</style>
