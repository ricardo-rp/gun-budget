<script lang="ts">
	import { Todo, user } from '../lib/initGun';

	let title = '';

	function addToDo() {
		if (!user.is) {
			alert('You must be logged in to add a todo');
			return;
		}

		user.get('todos').get(title).put({ title, done: false });
		title = '';
	}
	function removeTodo(key: string) {
		user.get('todos').get(key).put(null);
	}
	function updateTodo(key: string, todo: Partial<Todo>) {
		user.get('todos').get(key).put(todo);
	}

	let store: Record<string, Todo> = {};
	user
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
	$: toDos = Object.entries(store);
</script>

<div>
	<h1>To-dos</h1>

	<form on:submit|preventDefault={addToDo}>
		<input placeholder="Add todo" bind:value={title} />

		<button>Add</button>
	</form>

	<ul>
		{#each toDos as [key, { title, done }] (key)}
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
</div>
