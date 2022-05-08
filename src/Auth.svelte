<script>
	import { gun } from './initGun';

	let user = gun.user();

	let alias, pass;
	function signUp() {
		user.create(alias, pass);
	}
	function signin() {
		user.auth(alias, pass);
	}
</script>

<form on:submit|preventDefault={signin}>
	<input placeholder="alias" />
	<input type="password" placeholder="pass" />
	<input type="submit" value="sign in" />
	<input type="button" value="sign up" on:click={signUp} />
</form>
