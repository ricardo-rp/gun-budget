<script lang="ts">
  import { user } from '../lib/db/initGun'
  import type { Todo } from '../lib/db/schema'

  import { slide } from 'svelte/transition'

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
    {#if toDos.length}
      {#each toDos as [key, { title, done }] (key)}
        <li transition:slide>
          <label for={key}>
            <input
              id={key}
              type="checkbox"
              checked={done}
              on:change={() => updateTodo(key, { done: !done })}
            />
            {title}
          </label>

          <a href="/" on:click|preventDefault={() => removeTodo(key)}>remove</a>
        </li>
      {/each}
    {:else}
      <li transition:slide style="justify-content: center;">
        <em>Add some to-dos above</em>
      </li>
    {/if}
  </ul>
</div>

<a href="/" on:click|preventDefault={signOut}>Sign-out</a>

<style>
  div {
    min-width: 14rem;
    display: grid;
  }
  form {
    display: grid;
  }
  form > * {
    margin-right: 0;
  }
  ul {
    padding: 0;
  }
  li {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
  }
</style>
