import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

async function mainSeed() {
    console.log('Seeding started...');
    try {
        const aliceId = 'seed-alice-001';
        const alice = await prisma.user.upsert({
            where: { email: 'alice@example.com' },
            update: {},
            create: {
                id: aliceId,
                email: 'alice@example.com',
                firstName: 'Alice',
                lastName: 'Doe',
            }
        });
        console.log('Upserted user Alice:', alice.email);

        const aliceWorkLabel = await prisma.label.upsert({
            where: {
                name_userId: {
                    name: 'Work',
                    userId: alice.id
                }
            },
            update: {},
            create: {
                name: 'Work',
                color: '#4F46E5',
                userId: alice.id,
            }
        });
        const alicePersonalLabel = await prisma.label.upsert({
            where: {
                name_userId: {
                    name: 'Personal',
                    userId: alice.id
                }
            },
            update: {},
            create: {
                name: 'Personal',
                color: '#10B981',
                userId: alice.id,
            }
        });
        console.log('Upserted labels for Alice');

        await prisma.task.create({
            data: {
                title: 'Finish Checkaroo Schema',
                description: 'Complete Prisma schema and push to Supabase',
                dueDate: new Date(Date.now() + 3 * 86400000),
                status: 'IN_PROGRESS',
                priority: 'HIGH',
                userId: alice.id,
                labels: {
                    create: [
                        {
                            label: {
                                connect: {
                                    id: aliceWorkLabel.id
                                }
                            },
                            label: {
                                connect: {
                                    id: alicePersonalLabel.id
                                }
                            }
                        }
                    ]
                }
            }
        });
        console.log('Created tasks for Alice');


        const bobId = 'seed-bob-001';
        const bob = await prisma.user.upsert({
            where: { email: 'bob@example.com' },
            update: {},
            create: {
                id: bobId,
                firstName: 'Bob',
                lastName: 'Doe',
                email: 'bob@example.com',
            },
        });
        console.log('Upserted user Bob:', bob.email);

        const bobWorkLabel = await prisma.label.upsert({
            where: {
                name_userId: {
                    name: 'Bob',
                    userId: bob.id,
                }
            },
            update: {},
            create: {
                name: 'Work',
                color: '#06B6D4',
                userId: bob.id,
            },
        });
        const bobErrandsLabel = await prisma.label.upsert({
            where: {
                name_userId: {
                    name: 'Bob',
                    userId: bob.id,
                }
            },
            update: {},
            create: {
                name: 'Errands',
                color: '#F59E0B',
                userId: bob.id,
            },
        });
        console.log('Upserted labels for Bob');

        await prisma.task.create({
            data: {
                title: 'Buy groceries',
                description: 'Milk, eggs, bread, and fruit',
                dueDate: new Date(Date.now() + 3 * 86400000),
                status: 'IN_PROGRESS',
                priority: 'MEDIUM',
                userId: bob.id,
                labels: {
                    create: [
                        {
                            label: {
                                connect: {
                                    id: bobErrandsLabel.id
                                }
                            }
                        }
                    ]
                }
            }
        });
        console.log('Created tasks for Bob');

        console.log('Seeding complete!')

    } catch (error) {
        console.error('Error during seeding', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.log('Disconnected from database.');
    }

}

mainSeed();