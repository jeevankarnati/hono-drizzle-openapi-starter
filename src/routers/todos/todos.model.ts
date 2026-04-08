import { relations, sql } from "drizzle-orm";
import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "../users/users.model";

export const todosTable = pgTable("todos", {
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
  title: varchar({ length: 255 }).notNull(),
  userId: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  completed: boolean().notNull().default(false),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const todosRelations = relations(todosTable, ({ one }) => ({
  users: one(usersTable, {
    fields: [todosTable.userId],
    references: [usersTable.id],
  }),
}));
