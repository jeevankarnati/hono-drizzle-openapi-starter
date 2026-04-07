import { eq } from "drizzle-orm";
import db from "@/db";
import type { InsertTodo, UpdateTodo } from "./todos.schema";
import { todosTable } from "./todos.model";

export const getAllTodos = async () => {
  return await db.query.todos.findMany();
};

export const getTodoById = async (id: string) => {
  return await db.query.todos.findFirst({
    where: eq(todosTable.id, id),
  });
};

export const createTodo = async (todo: InsertTodo) => {
  return await db.insert(todosTable).values(todo).returning();
};

export const updateTodo = async (id: string, todo: UpdateTodo) => {
  return await db.update(todosTable).set(todo).where(eq(todosTable.id, id)).returning();
};

export const deleteTodo = async (id: string) => {
  return await db.delete(todosTable).where(eq(todosTable.id, id));
};
