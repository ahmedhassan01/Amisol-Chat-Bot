import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for admin authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"), // admin, guide
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Guides table
export const guides = pgTable("guides", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id), // Link to user account
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  specialties: text("specialties").array(),
  languages: text("languages").array(),
  rating: integer("rating").default(0),
  totalHelped: integer("total_helped").default(0),
  avgResponseTime: integer("avg_response_time").default(0), // in minutes
  isActive: boolean("is_active").default(true),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Hotels table
export const hotels = pgTable("hotels", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address"),
  phone: text("phone"),
  email: text("email"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Guide hotel assignments
export const guideAssignments = pgTable("guide_assignments", {
  id: serial("id").primaryKey(),
  guideId: integer("guide_id").references(() => guides.id).notNull(),
  hotelId: integer("hotel_id").references(() => hotels.id).notNull(),
  daysOfWeek: jsonb("days_of_week").notNull(), // Array of days [0,1,2,3,4,5,6]
  customShifts: jsonb("custom_shifts").notNull(), // Array of shift objects [{startTime: "10:00", endTime: "11:00"}, {startTime: "18:00", endTime: "19:00"}]
  weekStartDates: jsonb("week_start_dates").notNull(), // Array of week start dates ["2025-06-30", "2025-07-07"]
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Chat sessions
export const chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // hotel-change, hotel-complain, booking-tours, medical-assistance, guide-assistance
  guideId: integer("guide_id").references(() => guides.id),
  touristId: text("tourist_id"), // Unique identifier for each tourist for private messaging
  deletedBy: text("deleted_by").array().default([]), // Array of user IDs who have deleted this session
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  closedAt: timestamp("closed_at"),
});

// Chat messages
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => chatSessions.id).notNull(),
  senderType: text("sender_type").notNull(), // "user", "guide", "system"
  senderId: text("sender_id"), // guide id if sender is guide, tourist id if sender is tourist
  content: text("content").notNull(),
  messageType: text("message_type").default("text"), // text, voice, image, file
  metadata: jsonb("metadata"), // for file URLs, voice duration, etc.
  deletedBy: text("deleted_by").array().default([]), // Array of user IDs who have deleted this message
  isRead: boolean("is_read").default(false),
  readBy: text("read_by").array().default([]), // Array of user IDs who have read this message
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Announcements
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  type: text("type").default("info"), // info, warning, urgent
  fileUrl: text("file_url"),
  fileName: text("file_name"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
});

// Departure schedules
export const departureSchedules = pgTable("departure_schedules", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  fileUrl: text("file_url"), // PDF/Excel file URL
  fileName: text("file_name"),
  uploadedBy: integer("uploaded_by").references(() => users.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Emergency contacts
export const emergencyContacts = pgTable("emergency_contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // medical, guide-manager, general
  phone: text("phone"),
  whatsappNumber: text("whatsapp_number"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Session Reviews - Guest feedback for guide conversations
export const sessionReviews = pgTable("session_reviews", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => chatSessions.id).notNull(),
  guideId: integer("guide_id").references(() => guides.id).notNull(),
  touristId: text("tourist_id").notNull(), // Guest identifier
  rating: integer("rating").notNull(), // 1-5 stars
  comment: text("comment"),
  helpfulness: integer("helpfulness"), // 1-5 scale: How helpful was the guide?
  responsiveness: integer("responsiveness"), // 1-5 scale: How responsive was the guide?
  professionalism: integer("professionalism"), // 1-5 scale: How professional was the guide?
  wouldRecommend: boolean("would_recommend"), // Would recommend this guide?
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const guidesRelations = relations(guides, ({ many }) => ({
  assignments: many(guideAssignments),
  chatSessions: many(chatSessions),
}));

export const hotelsRelations = relations(hotels, ({ many }) => ({
  assignments: many(guideAssignments),
}));

export const guideAssignmentsRelations = relations(guideAssignments, ({ one }) => ({
  guide: one(guides, {
    fields: [guideAssignments.guideId],
    references: [guides.id],
  }),
  hotel: one(hotels, {
    fields: [guideAssignments.hotelId],
    references: [hotels.id],
  }),
}));

export const chatSessionsRelations = relations(chatSessions, ({ one, many }) => ({
  guide: one(guides, {
    fields: [chatSessions.guideId],
    references: [guides.id],
  }),
  messages: many(chatMessages),
}));

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  session: one(chatSessions, {
    fields: [chatMessages.sessionId],
    references: [chatSessions.id],
  }),
}));

export const sessionReviewsRelations = relations(sessionReviews, ({ one }) => ({
  session: one(chatSessions, {
    fields: [sessionReviews.sessionId],
    references: [chatSessions.id],
  }),
  guide: one(guides, {
    fields: [sessionReviews.guideId],
    references: [guides.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertGuideSchema = createInsertSchema(guides).omit({
  id: true,
  createdAt: true,
});

export const insertHotelSchema = createInsertSchema(hotels).omit({
  id: true,
  createdAt: true,
});

export const insertGuideAssignmentSchema = z.object({
  guideId: z.union([z.string(), z.number()]),
  hotelId: z.union([z.string(), z.number()]),
  daysOfWeek: z.array(z.number().min(0).max(6)),
  customShifts: z.array(z.object({
    startTime: z.string(),
    endTime: z.string(),
  })),
  weekStartDates: z.array(z.string()),
  isActive: z.boolean().default(true).optional(),
});

export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true,
  closedAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

export const insertAnnouncementSchema = createInsertSchema(announcements).omit({
  id: true,
  createdAt: true,
});

export const insertDepartureScheduleSchema = createInsertSchema(departureSchedules).omit({
  id: true,
  createdAt: true,
});

export const insertEmergencyContactSchema = createInsertSchema(emergencyContacts).omit({
  id: true,
  createdAt: true,
});

export const insertSessionReviewSchema = createInsertSchema(sessionReviews).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Guide = typeof guides.$inferSelect;
export type InsertGuide = z.infer<typeof insertGuideSchema>;

export type Hotel = typeof hotels.$inferSelect;
export type InsertHotel = z.infer<typeof insertHotelSchema>;

export type GuideAssignment = typeof guideAssignments.$inferSelect;
export type InsertGuideAssignment = z.infer<typeof insertGuideAssignmentSchema>;

export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type DepartureSchedule = typeof departureSchedules.$inferSelect;
export type InsertDepartureSchedule = z.infer<typeof insertDepartureScheduleSchema>;

export type EmergencyContact = typeof emergencyContacts.$inferSelect;
export type InsertEmergencyContact = z.infer<typeof insertEmergencyContactSchema>;

export type SessionReview = typeof sessionReviews.$inferSelect;
export type InsertSessionReview = z.infer<typeof insertSessionReviewSchema>;
