<script>
  import { gun } from './lib/initGun'

  import AuthForm from './pages/AuthForm.svelte'
  import ToDos from './pages/ToDos.svelte'

  let isLoggedIn = false

  gun.on('auth', () => {
    isLoggedIn = true
  })
</script>

<main>
  {#if isLoggedIn}
    <ToDos />
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
