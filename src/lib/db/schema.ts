import {
  pgTable,
  text,
  timestamp,
  uuid,
  doublePrecision,
  jsonb,
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
