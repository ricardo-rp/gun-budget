<script lang="ts">
  import { Todo, user } from '../lib/db/initGun'

  export let signOut: () => void

  let title = ''

  function addToDo() {
    user.get('todos').get(title).put({ title, done: false })
    title = ''
  }
  function removeTodo(key: string) {
    user.get('todos').get(key).put(null)
  }
  function updateTodo(key: string, todo: Partial<Todo>) {
    user.get('todos').get(key).put(todo)
  }

  let store: Record<string, Todo> = {}
  user
    .get('todos')
    .map()
    .on((data, key) => {
      // Deleted values in gun are set to null
      if (data === null) {
        delete store[key]
        store = store
      } else {
        store[key] = data
      }
    })

  // Create array from store so we can iterate
  $: toDos = Object.entries(store)
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
        <label for={key}>{title}</label>
        <a href="/" on:click|preventDefault={() => removeTodo(key)}>remove</a>
      </li>
    {/each}
  </ul>
</div>

<a href="/" on:click|preventDefault={signOut}>Sign-out</a>
