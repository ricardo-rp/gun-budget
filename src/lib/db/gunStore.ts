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

import type {
  GunSchema,
  GunValueSimple,
  IGunChain,
  IGunInstance,
  LEXQuery,
} from 'gun'
import { writable } from 'svelte/store'

function createMapStore<
  AppState extends Record<string, GunSchema>,
  TNode extends Exclude<GunSchema, GunValueSimple>,
  Ref extends IGunChain<
    TNode,
    IGunChain<
      Record<string, TNode>,
      IGunInstance<AppState>,
      IGunInstance<AppState>,
      keyof AppState & string
    >,
    IGunInstance<AppState>,
    keyof TNode & string
  >
>(ref: Ref) {
  const { update, subscribe } = writable<TNode>({} as TNode)

  ref.on(function (data, key) {
    if (data !== null) {
      update((store) => ({ ...store, [key]: data }))
    } else {
      update((store) => {
        delete store[key]
        return store
      })
    }
  })

  return {
    subscribe,
    update: <K extends keyof TNode & string>(
      key: LEXQuery<K>,
      value: TNode[K] & GunValueSimple
    ) => ref.get(key).put(value as any),
  }
}

const todosRef = gun.get('todos').map()
export const todos = createMapStore(todosRef)
