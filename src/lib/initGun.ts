import type { GunSchema } from 'gun';
import Gun from 'gun/gun';
import 'gun/sea';

export type Todo = {
	title: string;
	done: boolean;
};

interface AppState extends Record<string, GunSchema> {
	todos: Record<string, Todo>;
}

export const gun = Gun<AppState>([
	// Run pnpm start:gun to start a local gun node
	'localhost:8765/gun',
	'https://gun-manhattan.herokuapp.com/gun'
]);

export const user = gun.user<AppState>();
