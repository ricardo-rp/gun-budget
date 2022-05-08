<script>
  import { gun } from './lib/db/initGun'

  import AuthForm from './pages/AuthForm.svelte'
  import ToDos from './pages/ToDos.svelte'

  let isSignedIn = false

  gun.on('auth', () => {
    isSignedIn = true
  })

  function signOut() {
    try {
      user.leave()
    } catch (e) {
      console.error(e)
    } finally {
      isSignedIn = false
    }
  }
</script>

<main>
  {#if isSignedIn}
    <ToDos {signOut} />
  {:else}
    <AuthForm />
  {/if}
</main>

<style>
  main {
    display: grid;
    place-items: center;
    height: 100vh;
  }
</style>
