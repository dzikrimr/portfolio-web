import { HomeClient } from '@/components/HomeClient';
import { getSiteSettings, getHeroStats, getAboutSkills, getTechStacks } from '@/app/actions';

export const revalidate = 60;

export default async function Page() {
  const [settings, stats, skills, stacks] = await Promise.all([
    getSiteSettings(),
    getHeroStats(),
    getAboutSkills(),
    getTechStacks(),
  ]);

  return (
    <HomeClient
      settings={settings}
      heroStats={stats}
      aboutSkills={skills}
      techStacks={stacks}
    />
  );
}
