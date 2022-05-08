<script>
	import { gun } from './initGun';

	import Auth from './Auth.svelte';
	import Todos from './Todos.svelte';

	let isLoggedIn = false;

	gun.on('auth', () => {
		isLoggedIn = true;
	});
</script>

<main>
	{#if isLoggedIn}
		<Todos />
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
