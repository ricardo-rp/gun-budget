<script>
	import { user } from './initGun';

	let alias, pass;
	function signUp() {
		user.create(alias, pass);
	}
	function signin() {
		user.auth(alias, pass);
	}
</script>

<form on:submit|preventDefault={signin}>
	<h1>Auth</h1>

	<input bind:value={alias} placeholder="alias" />
	<input bind:value={pass} type="password" placeholder="pass" />

	<input type="submit" value="sign in" />
	<input type="button" value="sign up" on:click={signUp} />
</form>
