<script lang="ts">
  import { user } from '../lib/db/initGun'

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
    <strong>
      Error: <i>{error}</i>
    </strong>
  {/if}
</form>
