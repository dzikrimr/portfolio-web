import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  images: text('images').array(), // Nullable temporarily for migration
  tags: text('tags').array().notNull(),
  link: text('link'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const experiences = pgTable('experiences', {
  id: serial('id').primaryKey(),
  year: text('year').notNull(),
  command: text('command').notNull(),
  title: text('title').notNull(),
  company: text('company').notNull(),
  location: text('location').notNull(),
  description: text('description').notNull(),
  output: text('output').array().notNull(),
  image: text("image"),
  skills: text('skills').array().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const achievements = pgTable('achievements', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  event: text('event').notNull(),
  description: text('description').notNull(),
  date: text('date').notNull(),
  image: text('image').notNull(),
  rank: text('rank').notNull(),
  tier: text('tier').notNull(), // 'gold' | 'silver' | 'bronze' | 'special' | 'default'
  createdAt: timestamp('created_at').defaultNow(),
});

export const siteSettings = pgTable('site_settings', {
  id: integer('id').primaryKey().default(1),
  firstName: text('first_name').notNull().default('Dzikri'),
  lastName: text('last_name').notNull().default('Murtadlo'),
  heroDescription: text('hero_description').notNull().default(''),
  cvDownloadUrl: text('cv_download_url').notNull().default('#'),
  positionBadge: text('position_badge').notNull().default('BE'),
  portraitImage: text('portrait_image').notNull().default(''),
  githubUrl: text('github_url').notNull().default('#'),
  linkedinUrl: text('linkedin_url').notNull().default('#'),
  emailUrl: text('email_url').notNull().default(''),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const heroStats = pgTable('hero_stats', {
  id: serial('id').primaryKey(),
  val: text('val').notNull(),
  label: text('label').notNull(),
  description: text('description').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const aboutSkills = pgTable('about_skills', {
  id: serial('id').primaryKey(),
  iconName: text('icon_name').notNull(),
  label: text('label').notNull(),
  description: text('description').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const techStacks = pgTable('tech_stacks', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  logoSvg: text('logo_svg').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
});

export const legalPages = pgTable('legal_pages', {
  slug: text('slug').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const pageViews = pgTable('page_views', {
  id: serial('id').primaryKey(),
  visitorId: text('visitor_id').notNull(),
  path: text('path').notNull(),
  durationMs: integer('duration_ms'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const requestLogs = pgTable('request_logs', {
  id: serial('id').primaryKey(),
  path: text('path').notNull(),
  statusCode: integer('status_code').notNull(),
  durationMs: integer('duration_ms').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const contactSubmissions = pgTable('contact_submissions', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;

export type Achievement = typeof achievements.$inferSelect;
export type NewAchievement = typeof achievements.$inferInsert;

export type SiteSettings = typeof siteSettings.$inferSelect;
export type NewSiteSettings = typeof siteSettings.$inferInsert;

export type HeroStat = typeof heroStats.$inferSelect;
export type NewHeroStat = typeof heroStats.$inferInsert;

export type AboutSkill = typeof aboutSkills.$inferSelect;
export type NewAboutSkill = typeof aboutSkills.$inferInsert;

export type TechStack = typeof techStacks.$inferSelect;
export type NewTechStack = typeof techStacks.$inferInsert;

export type LegalPage = typeof legalPages.$inferSelect;
export type NewLegalPage = typeof legalPages.$inferInsert;

export type PageView = typeof pageViews.$inferSelect;
export type NewPageView = typeof pageViews.$inferInsert;

export type RequestLog = typeof requestLogs.$inferSelect;
export type NewRequestLog = typeof requestLogs.$inferInsert;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;
