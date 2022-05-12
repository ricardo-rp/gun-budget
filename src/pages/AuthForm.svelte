<script lang="ts">
  import { user } from '../lib/db/initGun'
  import { slide } from 'svelte/transition'

  let alias: string, pass: string, error: string
  function signUp() {
    user.create(alias, pass, (ack) => {
      if (handleAuthError(ack)) return
      signIn()
    })
  }
  function signIn() {
    user.auth(alias, pass, (ack) => {
      if (handleAuthError(ack)) return
    })
  }

  function handleAuthError<T extends {}>(
    ack: { err: string } | T
  ): ack is { err: string } {
    error = 'err' in ack ? ack.err : ''
    return Boolean(error)
  }
</script>

<form on:submit|preventDefault={signIn}>
  <h1>Auth</h1>

  <input bind:value={alias} placeholder="alias" />
  <input bind:value={pass} type="password" placeholder="pass" />

  <input type="submit" value="sign in" />
  <input type="button" value="sign up" on:click={signUp} />

  {#if error}
    <strong transition:slide>
      Error:
      <div class="error-message">
        {#key error}
          <i transition:slide>{error}</i>
        {/key}
      </div>
    </strong>
  {/if}
</form>

<style>
  form {
    display: grid;
    min-width: 14rem;
  }

  .error-message {
    display: inline-flex;
    flex-direction: column;
  }
</style>
