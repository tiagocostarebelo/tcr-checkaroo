import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

async function mainSeed() {
    console.log('Starting seeding...');

    try {
        // Create user
        const user = await prisma.user.upsert({
            where: { email: 'test@example.com' },
            update: {},
            create: {
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                passwordHash: 'placeholder_hashed_password',
            },
            where: { email: 'test2@example.com' },
            update: {},
            create: {
                firstName: 'Test2',
                lastName: 'User',
                email: 'test2@example.com',
                passwordHash: 'placeholder_hashed_password',
            },
            where: { email: 'test3@example.com' },
            update: {},
            create: {
                firstName: 'Test3',
                lastName: 'User',
                email: 'test3@example.com',
                passwordHash: 'placeholder_hashed_password',
            },
        });
        console.log('Users created.')

        // Create labels
        await prisma.label.createMany({
            data: [
                {
                    name: 'Work',
                    userId: user.id,
                    color: '#4F46E5'
                },
                {
                    name: 'Personal',
                    userId: user.id,
                    color: '#10B981'
                },
                {
                    name: 'Urgent',
                    userId: user.id,
                    color: '#EF4444'
                },
            ],
            skipDuplicates: true,
        });
        console.log('Labels created.');

        // Fetch the labels so we can link them to tasks
        const allLabels = await prisma.label.findMany({ where: { userId: user.id } });

        const task1 = await prisma.task.create({
            data: {
                title: 'Finish Checkaroo Schema',
                description: 'Complete Prisma schema and push to Supabase',
                dueDate: new Date(Date.now() + 3 * 86400000),
                status: 'IN_PROGRESS',
                priority: 'HIGH',
                userId: user.id,
                labels: {
                    create: [
                        {
                            label: {
                                connect: { id: allLabels.find(l => l.name === 'Work').id, }
                            }
                        },
                        {
                            label: {
                                connect: { id: allLabels.find(l => l.name === 'Personal').id, }
                            }
                        }
                    ]
                }
            }
        })
        const task2 = await prisma.task.create({
            data: {
                title: 'Buy groceries',
                description: 'Milk, eggs, and bread',
                dueDate: new Date(Date.now() + 1 * 86400000),
                status: 'PENDING',
                priority: 'MEDIUM',
                userId: user.id,
                labels: {
                    create: [
                        {
                            label: {
                                connect: { id: allLabels.find(l => l.name === 'Personal').id, }
                            }
                        }
                    ]
                }
            }
        });
        const task3 = await prisma.task.create({
            data: {
                title: 'Doctor appointment',
                description: 'Visit Dr. Smith at 4pm',
                dueDate: new Date(Date.now() + 5 * 86400000),
                priority: 'LOW',
                userId: user.id,
            }
        });

        console.log('Seeding complete!');
    } catch (e) {
        console.error('Error during seeding:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.log('Disconnected from database.');
    }
}

mainSeed();