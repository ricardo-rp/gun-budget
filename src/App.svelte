<script>
  import { gun } from './lib/db/initGun'

  import { fly } from 'svelte/transition'

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

{#key isSignedIn}
  <main
    in:fly={{ y: -50, duration: 250, delay: 300 }}
    out:fly={{ y: 50, duration: 250 }}
  >
    {#if isSignedIn}
      <ToDos {signOut} />
    {:else}
      <AuthForm />
    {/if}
  </main>
{/key}

<style>
  main {
    display: grid;
    place-items: center;
    place-content: center;
    height: 100vh;
  }
</style>
