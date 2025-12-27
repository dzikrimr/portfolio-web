import 'dotenv/config';
import { db } from './index';
import { projects, experiences, achievements } from './schema';

const seed = async () => {
  console.log('Seeding database...');

  // Clear existing data
  await db.delete(achievements);
  await db.delete(experiences);
  await db.delete(projects);

  // Projects
  await db.insert(projects).values([
    {
      title: 'Analytics Dashboard',
      description: 'A comprehensive data visualization platform with real-time analytics and intuitive user interface.',
      image: '/assets/project-1.jpg',
      tags: ['React', 'TypeScript', 'D3.js'],
      link: '#',
    },
    {
      title: 'Luxury E-Commerce',
      description: 'Premium shopping experience for high-end fashion brands with seamless checkout flow.',
      image: '/assets/project-2.jpg',
      tags: ['Next.js', 'Stripe', 'Prisma'],
      link: '#',
    },
    {
      title: 'Creative Agency',
      description: 'Bold and expressive portfolio website featuring dynamic animations and immersive storytelling.',
      image: '/assets/project-3.jpg',
      tags: ['React', 'GSAP', 'Three.js'],
      link: '#',
    },
  ]);

  // Experiences
  await db.insert(experiences).values([
    {
      year: '2023',
      command: 'senior-developer',
      title: 'Senior Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      description: 'Leading frontend architecture and mentoring junior developers. Building scalable design systems and driving technical decisions across multiple product teams.',
      output: [
        'Led team of 8 engineers',
        'Shipped 12 major features',
        'Reduced load time by 40%',
      ],
      skills: ['React', 'TypeScript', 'System Design', 'Leadership'],
    },
    {
      year: '2022',
      command: 'lead-engineer',
      title: 'Lead Engineer',
      company: 'Digital Products Co.',
      location: 'New York, NY',
      description: 'Spearheaded product development for fintech solutions. Managed cross-functional teams and delivered enterprise-grade applications.',
      output: [
        'Managed $2M project budget',
        'Built payment processing system',
        'Achieved 99.9% uptime',
      ],
      skills: ['Node.js', 'AWS', 'PostgreSQL', 'Team Lead'],
    },
    {
      year: '2021',
      command: 'fullstack-dev',
      title: 'Full Stack Developer',
      company: 'Digital Agency Co.',
      location: 'Austin, TX',
      description: 'Built scalable applications for enterprise clients. Implemented CI/CD pipelines and optimized database performance for high-traffic systems.',
      output: [
        'Delivered 20+ client projects',
        'Automated deployment pipeline',
        'Improved API response by 60%',
      ],
      skills: ['Full Stack', 'Docker', 'CI/CD', 'MongoDB'],
    },
    {
      year: '2019',
      command: 'frontend-dev',
      title: 'Frontend Developer',
      company: 'Startup Labs',
      location: 'Remote',
      description: 'Developed user interfaces for early-stage products. Collaborated closely with designers to ship pixel-perfect, accessible experiences.',
      output: [
        'Built 5 MVPs from scratch',
        'Established component library',
        'Improved accessibility score to 98',
      ],
      skills: ['React', 'CSS', 'Figma', 'A11y'],
    },
    {
      year: '2018',
      command: 'init',
      title: 'Junior Developer',
      company: 'Web Solutions',
      location: 'Boston, MA',
      description: 'Started journey in web development and design. Learned fundamentals of modern JavaScript, responsive design, and version control.',
      output: [
        'Completed 100+ code reviews',
        'First production deployment',
        'Mentored by senior engineers',
      ],
      skills: ['JavaScript', 'HTML/CSS', 'Git', 'Agile'],
    },
  ]);

  // Achievements
  await db.insert(achievements).values([
    {
      title: "2nd Winner ITechnoCup Front End Dev",
      event: "ITechnoCup - Politeknik Negeri Jakarta",
      description: "SlotReality as an interactive web platform serves as a critical digital literacy tool to expose the dangers and psychological traps of online gambling.",
      date: "2025-10-01",
      image: "/assets/project-1.jpg",
      rank: "2nd Winner",
      tier: "silver"
    },
    {
      title: "3rd Winner HOLOGY 8.0 of Software Development",
      event: "HOLOGY 8.0 - Universitas Brawijaya",
      description: "BabyBloom, an AI-powered parenting assistant designed to bridge the gap between technology and childcare. My role involved architecting a hybrid AI system and real-time monitoring infrastructure.",
      date: "2025-10-01",
      image: "/assets/project-2.jpg",
      rank: "3rd Winner",
      tier: "bronze"
    },
    {
      title: "Finalist Hackathon x IDCloudHost & ILCS of Informatics Festival",
      event: "Informatics Festival - Universitas Padjajaran",
      description: "PIER (Pelindo Integrated Electronic Repository) developed to solve real-world contract management challenges at PT ILCS (Pelindo Group). This AI-powered web platform automates the entire contract lifecycle, from drafting and review to risk monitoring.",
      date: "2025-10-01",
      image: "/assets/project-3.jpg",
      rank: "Finalist",
      tier: "default"
    },
    {
      title: "3rd Winner Dekan Cup Startup Academy Faculty of Computer Science 2023",
      event: "DEKAN CUP - Universitas Brawijaya",
      description: "The Development of the 'Productify' Application to Prevent Social Media Addiction in Indonesian Society.",
      date: "2023-10-01",
      image: "/assets/project-1.jpg",
      rank: "3rd Winner",
      tier: "bronze"
    },
    {
      title: "Finalist GEMASTIK XVIII Software Development",
      event: "GEMASTIK XVIII - Kemendikbudristek",
      description: "PrediAI is an AI-driven healthcare innovation designed for non-invasive early screening of diabetes through image analysis of tongue and nail. Built using Jetpack Compose, Firebase, and FastAPI.",
      date: "2025-10-01",
      image: "/assets/project-2.jpg",
      rank: "Finalist",
      tier: "default"
    },
  ]);

  console.log('Seeding completed!');
};

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
