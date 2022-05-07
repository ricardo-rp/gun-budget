<script lang="ts">
	import { gun, Todo } from './initGun';

	let title = '';

	function addTodo() {
		gun.get('todos').get(title).put({ title, done: false });
		title = '';
	}
	function removeTodo(key: string) {
		gun.get('todos').get(key).put(null);
	}
	function updateTodo(key: string, todo: Partial<Todo>) {
		gun.get('todos').get(key).put(todo);
	}

	let store: Record<string, Todo> = {};
	gun
		.get('todos')
		.map()
		.on((data, key) => {
			if (data) {
				store[key] = data;
			} else {
				// gun.map() can return null (deleted) values for keys
				// if so, this else clause will update your local variable
				delete store[key];
				store = store;
			}
		});
	// Create array from store so we can iterate
	$: todos = Object.entries(store);
</script>

<h1>Todo</h1>

<form on:submit|preventDefault={addTodo}>
	<input placeholder="Add todo" bind:value={title} />

	<button>Add</button>
</form>

<ul>
	{#each todos as [key, { title, done }] (key)}
		<li>
			<input
				id={key}
				type="checkbox"
				checked={done}
				on:change={() => updateTodo(key, { done: !done })}
			/>
			<label for={key}>{title} </label>
			<a href="/" on:click|preventDefault={() => removeTodo(key)}>remove</a>
		</li>
	{/each}
</ul>
