import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { todosTable } from "./todos.model";

export const insertTodoSchema = createInsertSchema(todosTable, {
  title: (schema) => schema.min(1),
})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .required({
    title: true,
    completed: true,
  });

export const selectTodoSchema = createSelectSchema(todosTable);

export const updateTodoSchema = insertTodoSchema.partial();

export type InsertTodo = z.infer<typeof insertTodoSchema>;
export type SelectTodo = z.infer<typeof selectTodoSchema>;
export type UpdateTodo = z.infer<typeof updateTodoSchema>;
