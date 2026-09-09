import { HomeClient } from '@/components/HomeClient';
import { getSiteSettings, getHeroStats, getAboutSkills, getTechStacks, getLegalPages } from '@/app/actions';

export const revalidate = 60;

export default async function Page() {
  const [settings, stats, skills, stacks, legalPages] = await Promise.all([
    getSiteSettings(),
    getHeroStats(),
    getAboutSkills(),
    getTechStacks(),
    getLegalPages(),
  ]);

  return (
    <HomeClient
      settings={settings}
      heroStats={stats}
      aboutSkills={skills}
      techStacks={stacks}
      legalPages={legalPages}
    />
  );
}
