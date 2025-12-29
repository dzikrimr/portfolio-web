import 'dotenv/config';
import { db } from './index';
import { projects, experiences, achievements } from './schema';

const seed = async () => {
  console.log('Seeding database...');

  await db.delete(achievements);
  await db.delete(experiences);
  await db.delete(projects);

  await db.insert(projects).values([
    {
      title: 'BabyBloom',
      description: "A team project that secured 3rd place in the Hology 8.0 software development competition. Helps parents cherish every moment by monitoring their child's growth with the power of computer vision and AI.",
      images: ['/assets/babybloom.jpg'],
      tags: ['Computer Vision', 'AI', 'Mobile App', 'React Native', 'Firebase'],
      link: 'https://github.com/yourusername/BabyBloom',
    },
    {
      title: 'DailyPlate',
      description: 'The first application project that I built independently for my internship period was in Raion Community 2023. An app for healthy recipes with Gemini AI-powered.',
      images: ['/assets/dailyplate.jpg'],
      tags: ['AI', 'Gemini API', 'Mobile App', 'React Native', 'Recipe App'],
      link: 'https://github.com/yourusername/DailyPlate',
    },
    {
      title: 'EcoJourney',
      description: 'A mobile app built in one week during HackJam 2024. Helps users track carbon footprint and get eco-friendly recommendations with gamified challenges.',
      images: ['/assets/ecojourney.jpg'],
      tags: ['Mobile App', 'React Native', 'Sustainability', 'Gamification', 'Hackathon'],
      link: 'https://github.com/yourusername/EcoJourney',
    },
    {
      title: 'Logikey',
      description: 'Intelligent Android Input Method Editor (IME) powered by a fine-tuned Llama-3 8B Instruct model. Unlike standard AI assistants, Logikey is integrated directly into the OS level to detect, label, and provide rebuttals for logical fallacies in real-time as you type in any application.',
      images: ['/assets/logikey.jpg'],
      tags: ['Android', 'LLM', 'Llama-3', 'IME', 'AI/ML', 'Logic'],
      link: 'https://github.com/yourusername/Logikey',
    },
    {
      title: 'SlotReality',
      description: 'An award-winning interactive website that secured 2nd place in the Itechnocup 2025 Frontend Development competition. Designed to raise awareness about the dangers of online gambling through an immersive digital experience.',
      images: ['/assets/slotreality.jpg'],
      tags: ['Frontend', 'React', 'Interactive', 'Award Winning', 'Web Development'],
      link: 'https://github.com/yourusername/SlotReality',
    },
    {
      title: 'PrediAI',
      description: 'AI-driven healthcare innovation, we build PrediAI, a mobile application designed for non-invasive early screening of diabetes through image analysis of tongue and nail, no needles, no pain. Developed as part of GEMASTIK XVIII, a national software development competition organized by the Ministry of Education, Culture, Research, and Technology (Kemendikbudristek). PrediAI integrates AI-powered image classification based on MobileNetV2 architecture, analyzing visual biomarkers correlated with hyperglycemia such as discoloration and texture changes in the tongue and nails. Built using Jetpack Compose, Firebase, and FastAPI.',
      images: ['/assets/prediai.jpg'],
      tags: ['AI/ML', 'MobileNetV2', 'Jetpack Compose', 'Firebase', 'FastAPI', 'Healthcare', 'Diabetes'],
      link: 'https://github.com/yourusername/PrediAI',
    },
    {
      title: 'BRIAN by BRI',
      description: 'BRIan adalah sistem digitalisasi laporan harian untuk divisi Marketing & Relation BRI Malang yang terdiri dari Aplikasi Mobile (karyawan) dan Website Dashboard (supervisor & admin). Sistem ini dirancang untuk menggantikan proses pelaporan manual melalui WhatsApp yang selama ini tidak terstandarisasi, sulit ditelusuri, dan tidak menyediakan insight performa operasional. BRIan menyediakan alur pelaporan yang terstruktur, tervalidasi, dan dapat dianalisis, sehingga karyawan dapat mengirim laporan kunjungan secara cepat dan akurat, sementara supervisor dapat melakukan validasi dan monitoring aktivitas secara real-time melalui dashboard.',
      images: ['/assets/brian.jpg'],
      tags: ['Mobile App', 'Web Dashboard', 'React Native', 'Next.js', 'Corporate', 'Reporting System'],
      link: '#',
    },
    {
      title: 'Baby Vision AI',
      description: "An intelligent detection system for baby monitoring using computer vision and MediaPipe. This project is designed to help parents monitor their baby's condition in real-time with various detection features including Eye Detection, Mouth Detection, Movement Detection, Pacifier Detection, Rollover Detection, and Enhanced Frame.",
      images: ['/assets/baby-vision-ai.jpg'],
      tags: ['Computer Vision', 'MediaPipe', 'Python', 'OpenCV', 'AI/ML'],
      link: 'https://github.com/yourusername/BabyVisionAI',
    },
    {
      title: 'Aksa TTS',
      description: 'A powerful Indonesian Text-to-Speech system with support for various regional accents. Built on top of the Chatterbox-TTS framework, it provides high-quality speech synthesis with voice cloning capabilities, allowing users to generate speech in different Indonesian regional accents.',
      images: ['/assets/aksa-tts.jpg'],
      tags: ['Text-to-Speech', 'FastAPI', 'Python', 'AI/ML', 'Indonesian NLP'],
      link: 'https://github.com/yourusername/AksaTTS',
    },
    {
      title: 'Sentinel',
      description: 'A backend API for a blockchain-based warranty management system built to facilitate secure digital warranty creation on the Ethereum Sepolia testnet[cite: 50]. This project integrates Solidity smart contracts for decentralized verification, PostgreSQL with Knex.js for data persistence, and Midtrans for automated payment processing[cite: 51]. Developed as a core backend system for the Blockchain & Digital Financial Platform course.',
      images: ['/assets/sentinel.jpg'],
      tags: ['Blockchain', 'Node.js', 'Solidity', 'Ethereum', 'Midtrans', 'PostgreSQL'],
      link: 'https://github.com/yourusername/sentinel-api',
    },
  ]);


    await db.insert(experiences).values([
    {
      year: '2025',
      command: 'lab-assistant',
      title: 'Laboratory Teaching Assistant of Data Structures & Algorithm',
      company: 'Faculty of Computer Science University of Brawijaya',
      location: 'Malang, Jawa Timur, Indonesia',
      description: 'Assisting students in understanding data structures and algorithms concepts through laboratory sessions.',
      output: [
        'Conducted laboratory sessions',
        'Mentored students',
        'Graded assignments',
      ],
      image: '/assets/project-1.jpg',
      skills: [],
    },
    {
      year: '2025',
      command: 'lab-assistant',
      title: 'Laboratory Teaching Assistant of Mobile Device Application Development',
      company: 'Faculty of Computer Science University of Brawijaya',
      location: 'Malang, Jawa Timur, Indonesia',
      description: 'Assisting students in mobile application development using Android and Kotlin.',
      output: [
        'Conducted laboratory sessions',
        'Mentored students',
        'Graded assignments',
      ],
      skills: [],
    },
    {
      year: '2023',
      command: 'mobile-dev',
      title: 'Mobile Developer',
      company: 'Raion Community',
      location: 'Kota Malang, Jawa Timur, Indonesia',
      description: 'Selected as Programmer Apps in RAION Community after internship. Developed Android mobile applications with focus on user-centered features. Collaborated effectively in a cross-functional team to deliver high-quality projects.',
      output: [
        'Developed Android applications',
        'Collaborated in cross-functional team',
        'Delivered high-quality projects',
      ],
      image: '/assets/project-1.jpg',
      skills: [],
    },
    {
      year: '2025',
      command: 'frontend-dev',
      title: 'Frontend Web Developer',
      company: 'Raion Community',
      location: 'Kota Malang, Jawa Timur, Indonesia',
      description: 'Lead Raion Craft Frontend at the Innovation & Technology Unit, responsible for developing and maintaining user-facing web interfaces.',
      output: [
        'Developed web interfaces',
        'Maintained frontend codebase',
        'Led frontend development team',
      ],
      image: '/assets/project-1.jpg',
      skills: [],
    },
    {
      year: '2023',
      command: 'intern',
      title: 'Mobile Developer (Intern)',
      company: 'Raion Community',
      location: 'Kota Malang, Jawa Timur, Indonesia',
      description: 'Contributed to the design and development of an Android application. Engaged in team brainstorming and concept formulation for real-world solutions. Strengthened skills in Android development and collaborative workflows.',
      output: [
        'Contributed to Android app development',
        'Participated in team brainstorming',
        'Strengthened Android development skills',
      ],
      image: '/assets/project-1.jpg',
      skills: [],
    },
  ]);


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
