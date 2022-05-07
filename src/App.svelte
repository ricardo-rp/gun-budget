<script lang="ts">
	import Gun from 'gun/gun';
	import 'gun/sea';

	// Connect GUN to other peers in network.
	let gun = Gun(['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun']);

	// Handle user registration and login
	let user = gun.user();

	let username: string, password: string;

	function signUp() {
		user.create(username, password, () => {});
	}

	function signIn() {
		user.auth(username, password);
	}
</script>

<h1>Todo</h1>

<hr />
<form>
	<input bind:value={username} type="text" placeholder="username" />
	<input bind:value={password} type="password" placeholder="password" />

	<input type="submit" value="sign in" on:click|preventDefault={signIn} />
	<input type="button" value="sign up" on:click={signUp} />
</form>
<hr />

<ul />

<hr />
<form id="said">
	<input id="say" />
	<input id="speak" type="submit" value="speak" />
</form>
<hr />
