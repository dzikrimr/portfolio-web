'use server';

import { db } from '@/db';
import {
  projects,
  experiences,
  achievements,
  siteSettings,
  heroStats,
  aboutSkills,
  techStacks,
  legalPages,
} from '@/db/schema';
import { desc, eq, asc } from 'drizzle-orm';

export async function getProjects() {
  return await db.select().from(projects).orderBy(desc(projects.id));
}

export async function getExperiences() {

  return await db.select().from(experiences).orderBy(desc(experiences.year));
}

export async function getAchievements() {
  return await db.select().from(achievements).orderBy(desc(achievements.date));
}

export async function getSiteSettings() {
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.id, 1));
  return rows[0];
}

export async function getHeroStats() {
  return await db.select().from(heroStats).orderBy(asc(heroStats.sortOrder));
}

export async function getAboutSkills() {
  return await db.select().from(aboutSkills).orderBy(asc(aboutSkills.sortOrder));
}

export async function getTechStacks() {
  return await db.select().from(techStacks).orderBy(asc(techStacks.sortOrder));
}

export async function getLegalPages() {
  return await db.select().from(legalPages);
}
