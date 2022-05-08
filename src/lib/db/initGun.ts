import Gun from 'gun/gun'
import 'gun/sea'

import type { AppState } from './schema'

export const gun = Gun<AppState>([
  // Run pnpm start:gun to start a local gun node
  'localhost:8765/gun',
  'https://gun-manhattan.herokuapp.com/gun',
])

export const user = gun.user<AppState>()
