import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone").notNull(),
  country: text("country").notNull(),
  currency: text("currency").notNull(),
  accountTier: text("account_tier").notNull().default("Bronze"),
  isVerified: boolean("is_verified").notNull().default(false),
  invested: decimal("invested", { precision: 10, scale: 2 }).notNull().default("0.00"),
  profit: decimal("profit", { precision: 10, scale: 2 }).notNull().default("0.00"),
  bonus: decimal("bonus", { precision: 10, scale: 2 }).notNull().default("0.00"),
  balance: decimal("balance", { precision: 10, scale: 2 }).notNull().default("0.00"),
  btcEquivalent: decimal("btc_equivalent", { precision: 10, scale: 8 }).notNull().default("0.00000000"),
  depositAddress: text("deposit_address"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Transactions table
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  type: text("type").notNull(), // deposit, withdrawal, profit, bonus
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // pending, completed, failed, cancelled
  description: text("description"),
  reference: text("reference"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Notifications table
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  type: text("type").notNull(), // success, warning, info, trading
  title: text("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Document verification table
export const documentVerifications = pgTable("document_verifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  documentType: text("document_type").notNull(), // passport, drivers_license, national_id
  frontImageUrl: text("front_image_url").notNull(),
  backImageUrl: text("back_image_url").notNull(),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
  reviewNotes: text("review_notes"),
});

// Payment submissions table
export const paymentSubmissions = pgTable("payment_submissions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  screenshotUrl: text("screenshot_url").notNull(),
  status: text("status").notNull().default("pending"), // pending, confirmed, rejected
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
  processedAt: timestamp("processed_at"),
  processingNotes: text("processing_notes"),
});

// Market data table (for caching live prices)
export const marketData = pgTable("market_data", {
  id: serial("id").primaryKey(),
  symbol: text("symbol").notNull().unique(),
  price: decimal("price", { precision: 18, scale: 8 }).notNull(),
  change24h: decimal("change_24h", { precision: 5, scale: 2 }).notNull(),
  changePercent24h: decimal("change_percent_24h", { precision: 5, scale: 2 }).notNull(),
  volume24h: decimal("volume_24h", { precision: 18, scale: 2 }),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export const insertDocumentVerificationSchema = createInsertSchema(documentVerifications).omit({
  id: true,
  submittedAt: true,
  reviewedAt: true,
});

export const insertPaymentSubmissionSchema = createInsertSchema(paymentSubmissions).omit({
  id: true,
  submittedAt: true,
  processedAt: true,
});

export const insertMarketDataSchema = createInsertSchema(marketData).omit({
  id: true,
  lastUpdated: true,
});

// Update schemas
export const updateUserSchema = insertUserSchema.partial();
export const updateTransactionSchema = insertTransactionSchema.partial();
export const updateNotificationSchema = insertNotificationSchema.partial();
export const updateDocumentVerificationSchema = insertDocumentVerificationSchema.partial();
export const updatePaymentSubmissionSchema = insertPaymentSubmissionSchema.partial();

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type UpdateTransaction = z.infer<typeof updateTransactionSchema>;

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type UpdateNotification = z.infer<typeof updateNotificationSchema>;

export type DocumentVerification = typeof documentVerifications.$inferSelect;
export type InsertDocumentVerification = z.infer<typeof insertDocumentVerificationSchema>;
export type UpdateDocumentVerification = z.infer<typeof updateDocumentVerificationSchema>;

export type PaymentSubmission = typeof paymentSubmissions.$inferSelect;
export type InsertPaymentSubmission = z.infer<typeof insertPaymentSubmissionSchema>;
export type UpdatePaymentSubmission = z.infer<typeof updatePaymentSubmissionSchema>;

export type MarketData = typeof marketData.$inferSelect;
export type InsertMarketData = z.infer<typeof insertMarketDataSchema>;
