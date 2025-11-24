import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // 1. Find or create a user to be the author
    let author = await prisma.user.findFirst();

    if (!author) {
        console.log('No user found, creating a default author...');
        author = await prisma.user.create({
            data: {
                email: 'demo@example.com',
                name: 'Demo User',
                password: 'password123', // In a real app, this should be hashed
            },
        });
    }

    console.log(`Using author: ${author.name} (${author.id})`);

    // 2. Create Courses
    const coursesData = [
        {
            title: 'Fullstack Web Development',
            description: 'Master the art of web development with this comprehensive course covering React, Node.js, and PostgreSQL.',
            difficulty: 'Intermediate',
            imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
            sections: [
                {
                    title: 'Introduction to Web Dev',
                    order: 1,
                    lessons: [
                        { title: 'How the Web Works', content: 'The web is a system of interlinked hypertext documents accessed via the Internet.', order: 1 },
                        { title: 'Setting up your Environment', content: 'Install VS Code, Node.js, and Git to get started.', order: 2 },
                    ]
                },
                {
                    title: 'Frontend Fundamentals',
                    order: 2,
                    lessons: [
                        { title: 'HTML5 Basics', content: 'HTML is the standard markup language for documents designed to be displayed in a web browser.', order: 1 },
                        { title: 'CSS3 Styling', content: 'Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document.', order: 2 },
                        { title: 'JavaScript Essentials', content: 'JavaScript is a programming language that is one of the core technologies of the World Wide Web.', order: 3 },
                    ]
                }
            ]
        },
        {
            title: 'UI/UX Design Principles',
            description: 'Learn how to design beautiful and functional user interfaces. Covers color theory, typography, and layout.',
            difficulty: 'Beginner',
            imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
            sections: [
                {
                    title: 'Design Basics',
                    order: 1,
                    lessons: [
                        { title: 'Color Theory', content: 'Color theory is a body of practical guidance to color mixing and the visual effects of a specific color combination.', order: 1 },
                        { title: 'Typography', content: 'Typography is the art and technique of arranging type to make written language legible, readable, and appealing.', order: 2 },
                    ]
                }
            ]
        },
        {
            title: 'Advanced Python Programming',
            description: 'Take your Python skills to the next level. Learn about decorators, generators, and metaclasses.',
            difficulty: 'Advanced',
            imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
            sections: [
                {
                    title: 'Advanced Concepts',
                    order: 1,
                    lessons: [
                        { title: 'Decorators', content: 'Decorators are a very powerful and useful tool in Python since it allows programmers to modify the behaviour of function or class.', order: 1 },
                        { title: 'Generators', content: 'Generators are a simple way of creating iterators.', order: 2 },
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
        console.log(`Created course: ${course.title}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
