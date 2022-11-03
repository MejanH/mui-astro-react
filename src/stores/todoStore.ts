import { atom } from "nanostores";

export interface Todo {
  title: string;
}
export const todosAtom = atom<Todo[]>([]);
