<script>
	import { gun } from './lib/initGun';

	import Auth from './pages/Auth.svelte';
	import ToDos from './pages/ToDos.svelte';

	let isLoggedIn = false;

	gun.on('auth', () => {
		isLoggedIn = true;
	});
</script>

<main>
	{#if isLoggedIn}
		<ToDos />
	{:else}
		<Auth />
	{/if}
</main>

<style>
	main {
		display: grid;
		place-items: center;
		height: 100vh;
	}
</style>
