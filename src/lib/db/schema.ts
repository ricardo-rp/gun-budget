import type { GunSchema } from 'gun'

export type Todo = {
  title: string
  done: boolean
}

export interface AppState extends Record<string, GunSchema> {
  todos: Record<string, Todo>
}
