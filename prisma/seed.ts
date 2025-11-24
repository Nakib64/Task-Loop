import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // 1. Find or create a user to be the author
    let author = await prisma.user.findFirst();

    if (!author) {
        console.log('No user found, creating a default author...');
        const hashedPassword = await bcrypt.hash('password123', 10);
        author = await prisma.user.create({
            data: {
                email: 'demo@example.com',
                name: 'Demo Instructor',
                password: hashedPassword,
            },
        });
    }

    console.log(`Using author: ${author.name} (${author.id})`);

    // 2. Delete existing courses to avoid duplicates
    await prisma.course.deleteMany({});
    console.log('Cleared existing courses');

    // 3. Create Courses
    const coursesData = [
        {
            title: 'Complete Web Development Bootcamp',
            description: 'Master full-stack web development with React, Node.js, Express, and PostgreSQL. Build real-world projects and deploy to production.',
            difficulty: 'Intermediate',
            imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
            sections: [
                {
                    title: 'Introduction to Web Development',
                    order: 1,
                    lessons: [
                        { title: 'How the Web Works', content: 'Understanding HTTP, DNS, and the client-server architecture.', order: 1 },
                        { title: 'Setting up Development Environment', content: 'Install VS Code, Node.js, Git, and essential extensions.', order: 2 },
                    ]
                },
                {
                    title: 'Frontend Fundamentals',
                    order: 2,
                    lessons: [
                        { title: 'HTML5 & Semantic Markup', content: 'Learn modern HTML5 tags and best practices for semantic markup.', order: 1 },
                        { title: 'CSS3 & Flexbox/Grid', content: 'Master CSS layouts with Flexbox and Grid systems.', order: 2 },
                        { title: 'JavaScript ES6+', content: 'Modern JavaScript features including arrow functions, destructuring, and async/await.', order: 3 },
                    ]
                },
                {
                    title: 'React Mastery',
                    order: 3,
                    lessons: [
                        { title: 'React Hooks', content: 'useState, useEffect, useContext, and custom hooks.', order: 1 },
                        { title: 'State Management', content: 'Managing complex state with Context API and Redux.', order: 2 },
                    ]
                }
            ]
        },
        {
            title: 'UI/UX Design Masterclass',
            description: 'Learn professional UI/UX design principles. Master Figma, color theory, typography, and create stunning user interfaces.',
            difficulty: 'Beginner',
            imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
            sections: [
                {
                    title: 'Design Fundamentals',
                    order: 1,
                    lessons: [
                        { title: 'Color Theory & Psychology', content: 'Understanding color combinations, contrast, and emotional impact.', order: 1 },
                        { title: 'Typography Essentials', content: 'Font pairing, hierarchy, and readability principles.', order: 2 },
                        { title: 'Layout & Composition', content: 'Grid systems, whitespace, and visual balance.', order: 3 },
                    ]
                },
                {
                    title: 'Figma Mastery',
                    order: 2,
                    lessons: [
                        { title: 'Figma Basics', content: 'Interface overview, frames, and components.', order: 1 },
                        { title: 'Advanced Prototyping', content: 'Interactive prototypes and animations.', order: 2 },
                    ]
                }
            ]
        },
        {
            title: 'Python for Data Science',
            description: 'Master Python programming for data analysis. Learn NumPy, Pandas, Matplotlib, and machine learning basics with scikit-learn.',
            difficulty: 'Advanced',
            imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
            sections: [
                {
                    title: 'Python Fundamentals',
                    order: 1,
                    lessons: [
                        { title: 'Python Syntax & Data Types', content: 'Variables, lists, dictionaries, and control flow.', order: 1 },
                        { title: 'Functions & Modules', content: 'Creating reusable code with functions and importing modules.', order: 2 },
                    ]
                },
                {
                    title: 'Data Analysis',
                    order: 2,
                    lessons: [
                        { title: 'NumPy Arrays', content: 'Working with numerical data efficiently.', order: 1 },
                        { title: 'Pandas DataFrames', content: 'Data manipulation and analysis with Pandas.', order: 2 },
                        { title: 'Data Visualization', content: 'Creating charts with Matplotlib and Seaborn.', order: 3 },
                    ]
                }
            ]
        },
        {
            title: 'Mobile App Development with React Native',
            description: 'Build cross-platform mobile apps for iOS and Android using React Native. Learn navigation, state management, and API integration.',
            difficulty: 'Intermediate',
            imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
            sections: [
                {
                    title: 'React Native Basics',
                    order: 1,
                    lessons: [
                        { title: 'Setting Up React Native', content: 'Install Expo CLI and create your first app.', order: 1 },
                        { title: 'Core Components', content: 'View, Text, Image, ScrollView, and more.', order: 2 },
                        { title: 'Styling in React Native', content: 'StyleSheet API and Flexbox layouts.', order: 3 },
                    ]
                },
                {
                    title: 'Navigation & State',
                    order: 2,
                    lessons: [
                        { title: 'React Navigation', content: 'Stack, Tab, and Drawer navigators.', order: 1 },
                        { title: 'State Management', content: 'Context API and Redux for mobile apps.', order: 2 },
                    ]
                }
            ]
        },
        {
            title: 'DevOps & Cloud Computing',
            description: 'Learn Docker, Kubernetes, CI/CD pipelines, and cloud deployment on AWS. Master modern DevOps practices and infrastructure as code.',
            difficulty: 'Advanced',
            imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80',
            sections: [
                {
                    title: 'Docker Fundamentals',
                    order: 1,
                    lessons: [
                        { title: 'Containers vs VMs', content: 'Understanding containerization benefits.', order: 1 },
                        { title: 'Docker Images & Containers', content: 'Building and running Docker containers.', order: 2 },
                        { title: 'Docker Compose', content: 'Multi-container applications.', order: 3 },
                    ]
                },
                {
                    title: 'Kubernetes',
                    order: 2,
                    lessons: [
                        { title: 'K8s Architecture', content: 'Pods, Services, and Deployments.', order: 1 },
                        { title: 'Scaling Applications', content: 'Horizontal pod autoscaling.', order: 2 },
                    ]
                }
            ]
        },
        {
            title: 'Digital Marketing Fundamentals',
            description: 'Master SEO, social media marketing, email campaigns, and Google Analytics. Learn to create effective digital marketing strategies.',
            difficulty: 'Beginner',
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            sections: [
                {
                    title: 'SEO Basics',
                    order: 1,
                    lessons: [
                        { title: 'On-Page SEO', content: 'Keywords, meta tags, and content optimization.', order: 1 },
                        { title: 'Off-Page SEO', content: 'Backlinks and domain authority.', order: 2 },
                    ]
                },
                {
                    title: 'Social Media Marketing',
                    order: 2,
                    lessons: [
                        { title: 'Content Strategy', content: 'Creating engaging social media content.', order: 1 },
                        { title: 'Paid Advertising', content: 'Facebook Ads and Instagram campaigns.', order: 2 },
                    ]
                }
            ]
        },
        {
            title: 'Blockchain & Cryptocurrency',
            description: 'Understand blockchain technology, smart contracts, and cryptocurrency. Learn Solidity and build decentralized applications (DApps).',
            difficulty: 'Advanced',
            imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80',
            sections: [
                {
                    title: 'Blockchain Fundamentals',
                    order: 1,
                    lessons: [
                        { title: 'How Blockchain Works', content: 'Distributed ledger, consensus mechanisms, and cryptography.', order: 1 },
                        { title: 'Cryptocurrency Basics', content: 'Bitcoin, Ethereum, and altcoins.', order: 2 },
                    ]
                },
                {
                    title: 'Smart Contracts',
                    order: 2,
                    lessons: [
                        { title: 'Solidity Programming', content: 'Writing smart contracts for Ethereum.', order: 1 },
                        { title: 'Building DApps', content: 'Decentralized application development.', order: 2 },
                    ]
                }
            ]
        },
        {
            title: 'Cybersecurity Essentials',
            description: 'Learn ethical hacking, network security, and penetration testing. Understand common vulnerabilities and how to protect against them.',
            difficulty: 'Intermediate',
            imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
            sections: [
                {
                    title: 'Security Fundamentals',
                    order: 1,
                    lessons: [
                        { title: 'CIA Triad', content: 'Confidentiality, Integrity, and Availability.', order: 1 },
                        { title: 'Common Vulnerabilities', content: 'SQL injection, XSS, and CSRF attacks.', order: 2 },
                    ]
                },
                {
                    title: 'Penetration Testing',
                    order: 2,
                    lessons: [
                        { title: 'Reconnaissance', content: 'Information gathering techniques.', order: 1 },
                        { title: 'Exploitation', content: 'Using Metasploit and other tools.', order: 2 },
                    ]
                }
            ]
        }
    ];

    for (const courseData of coursesData) {
        const { sections, ...courseInfo } = courseData;

        const course = await prisma.course.create({
            data: {
                ...courseInfo,
                authorId: author.id,
                sections: {
                    create: sections.map(section => ({
                        title: section.title,
                        order: section.order,
                        lessons: {
                            create: section.lessons.map(lesson => ({
                                title: lesson.title,
                                content: lesson.content,
                                order: lesson.order
                            }))
                        }
                    }))
                }
            }
        });
        console.log(`✓ Created course: ${course.title}`);
    }

    console.log('\n🎉 Seeding finished successfully!');
    console.log(`📚 Created ${coursesData.length} courses with sections and lessons`);
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

