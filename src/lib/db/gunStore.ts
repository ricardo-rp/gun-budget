import Gun from 'gun/gun'
import 'gun/sea'

type Todo = {
  title: string
  done: boolean
}

interface AppState extends Record<string, GunSchema> {
  todos: Record<string, Todo>
}

const gun = Gun<AppState>([
  // Run pnpm start:gun to start a local gun node
  'localhost:8765/gun',
  'https://gun-manhattan.herokuapp.com/gun',
])

import type { GunSchema, IGunChain, IGunInstance } from 'gun'
import { writable } from 'svelte/store'

function createGunStore<
  RootSchema extends Record<string, GunSchema>, // Root schema
  NodeKey extends keyof RootSchema & string = keyof RootSchema & string, // 'todos'
  ParentNode extends RootSchema[NodeKey] = RootSchema[NodeKey], // Record<string, Todo>
  Node extends ParentNode[keyof ParentNode] = ParentNode[keyof ParentNode] // { title: string, done: boolean }
>(
  ref: IGunChain<
    Node,
    IGunChain<
      Record<string, Node>,
      IGunInstance<RootSchema>,
      IGunInstance<RootSchema>,
      NodeKey
    >,
    IGunInstance<RootSchema>,
    keyof ParentNode & string
  >
) {
  const { update, subscribe } = writable<ParentNode>({} as ParentNode)

  ref.on((gunData, key) => {
    update((svelteStore) => {
      if (gunData === null) return deleteGunKeyFromStore(key, svelteStore)

      return updateGunKeyInStore(key, gunData, svelteStore)
    })
  })

  return {
    subscribe,
    update: <Key extends keyof Node & string = keyof Node & string>(
      key: Key,
      value: Node[Key]
    ) => {
      const put = ref.get(key).put
      const assertedPut = put as (value: Node[Key]) => ReturnType<typeof put>
      return assertedPut(value)
    },
  }
}

const todosRef = gun.get('todos').map()
export const todos = createGunStore(todosRef)

todos.update('done', true)

function isObject(value: unknown): value is Exclude<object, null> {
  return typeof value === 'object' && value !== null
}

function updateGunKeyInStore<Node, ParentNode>(
  key: keyof ParentNode,
  gunData: Node,
  svelteStore: ParentNode
) {
  if (isObject(svelteStore)) return { ...svelteStore, [key]: gunData }

  return svelteStore
}

function deleteGunKeyFromStore<ParentNode>(
  key: keyof ParentNode,
  svelteStore: ParentNode
) {
  if (!isObject(svelteStore)) return null

  delete svelteStore[key]
  return svelteStore
}
