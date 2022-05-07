import type { GunSchema } from 'gun';
import Gun from 'gun/gun';

export type Todo = {
	title: string;
	done: boolean;
};

interface AppState extends Record<string, GunSchema> {
	todos: Record<string, Todo>;
}

export const gun = new Gun<AppState>();
