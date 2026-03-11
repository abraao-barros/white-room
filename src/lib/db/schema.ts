import {
  pgTable,
  text,
  timestamp,
  uuid,
  doublePrecision,
  jsonb,
  primaryKey,
  unique,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const budgets = pgTable("budgets", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  projectName: text("project_name").notNull(),
  description: text("description"),
  type: text("type").default("hourly").notNull(), // 'hourly' or 'fixed'
  hourlyRate: doublePrecision("hourly_rate"),
  estimatedHours: doublePrecision("estimated_hours"),
  totalValue: doublePrecision("total_value").notNull(),
  deadline: timestamp("deadline").notNull(),
  deliverables: jsonb("deliverables").notNull(), // Array of strings
  slug: text("slug").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const systemSettings = pgTable("system_settings", {
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  id: text("id").notNull(), // The setting key (e.g. 'footer_text')
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  primaryKey({ columns: [table.userId, table.id] }),
  unique("system_settings_unique_idx").on(table.userId, table.id)
]);

import { relations } from "drizzle-orm";

export const usersRelations = relations(users, ({ many }) => ({
  budgets: many(budgets),
}));

export const budgetsRelations = relations(budgets, ({ one }) => ({
  user: one(users, {
    fields: [budgets.userId],
    references: [users.id],
  }),
}));
