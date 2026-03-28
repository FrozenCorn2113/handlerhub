import { faker } from '@faker-js/faker'
import { ExperienceLevel, PrismaClient, UserRole } from '@prisma/client'

var bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

// Dog breeds commonly shown
const dogBreeds = [
  'Golden Retriever',
  'Labrador Retriever',
  'German Shepherd',
  'French Bulldog',
  'Bulldog',
  'Poodle',
  'Beagle',
  'Rottweiler',
  'Yorkshire Terrier',
  'Boxer',
  'Dachshund',
  'Siberian Husky',
  'Great Dane',
  'Doberman Pinscher',
  'Australian Shepherd',
  'Border Collie',
  'Shih Tzu',
  'Boston Terrier',
  'Pomeranian',
  'Cavalier King Charles Spaniel',
]

const regions = [
  'Pacific Northwest',
  'California',
  'Western US',
  'Southwest',
  'Midwest',
  'Northeast',
  'Southeast',
  'Texas',
  'Florida',
  'Mid-Atlantic',
]

const services = [
  'Professional Handling',
  'Conformation Handling',
  'Show Grooming',
  'Handler Training',
  'Puppy Evaluation',
  'Stacking Training',
  'Gaiting Training',
  'Ring Preparation',
]

const cities = [
  { city: 'Seattle', state: 'WA' },
  { city: 'Portland', state: 'OR' },
  { city: 'Los Angeles', state: 'CA' },
  { city: 'San Francisco', state: 'CA' },
  { city: 'San Diego', state: 'CA' },
  { city: 'Phoenix', state: 'AZ' },
  { city: 'Denver', state: 'CO' },
  { city: 'Austin', state: 'TX' },
  { city: 'Dallas', state: 'TX' },
  { city: 'Houston', state: 'TX' },
  { city: 'Chicago', state: 'IL' },
  { city: 'New York', state: 'NY' },
  { city: 'Boston', state: 'MA' },
  { city: 'Atlanta', state: 'GA' },
  { city: 'Miami', state: 'FL' },
]

const main = async () => {
  try {
    console.log('🌱 Starting HandlerHub database seeding...')

    // Cleanup existing data
    console.log('🧹 Cleaning up existing data...')
    await prisma.bookingRequest.deleteMany()
    await prisma.handlerProfile.deleteMany()
    await prisma.session.deleteMany()
    await prisma.account.deleteMany()
    await prisma.user.deleteMany()

    const hashedPassword = await bcrypt.hash('password123', 10)

    // Create 1 admin user
    console.log('👤 Creating admin user...')
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@handlerhub.com',
        password: hashedPassword,
        emailVerified: new Date(),
        role: 'ADMIN' as UserRole,
      },
    })

    // Create 10 handlers with profiles
    console.log('🐕 Creating 10 handler profiles...')
    for (let i = 0; i < 10; i++) {
      const location = faker.helpers.arrayElement(cities)
      const selectedBreeds = faker.helpers.arrayElements(dogBreeds, {
        min: 2,
        max: 5,
      })
      const selectedRegions = faker.helpers.arrayElements(regions, {
        min: 1,
        max: 3,
      })
      const selectedServices = faker.helpers.arrayElements(services, {
        min: 2,
        max: 4,
      })

      const handler = await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: `handler${i + 1}@handlerhub.com`,
          password: hashedPassword,
          emailVerified: new Date(),
          role: 'HANDLER' as UserRole,
          image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
          handlerProfile: {
            create: {
              businessName: `${faker.person.lastName()} Handling`,
              bio: faker.lorem.paragraphs(2),
              yearsExperience: faker.number.int({ min: 1, max: 25 }),
              experienceLevel: faker.helpers.arrayElement([
                'BEGINNER',
                'INTERMEDIATE',
                'ADVANCED',
                'PROFESSIONAL',
              ]) as ExperienceLevel,
              contactEmail: `handler${i}@handlerhub.com`,
              contactPhone: faker.phone.number(),
              website: faker.internet.url(),
              facebook: `facebook.com/${faker.internet.userName()}`,
              instagram: `@${faker.internet.userName()}`,
              city: location.city,
              state: location.state,
              country: 'USA',
              regions: selectedRegions,
              breeds: selectedBreeds,
              services: selectedServices,
              ratePerShow: faker.number.float({
                min: 100,
                max: 400,
                fractionDigits: 2,
              }),
              ratePerDay: faker.number.float({
                min: 200,
                max: 600,
                fractionDigits: 2,
              }),
              priceRange: faker.helpers.arrayElement([
                '$',
                '$$',
                '$$$',
                '$100-$200/show',
                '$200-$400/show',
              ]),
              availability: faker.helpers.arrayElement([
                'Available year-round',
                'Weekend shows only',
                'Available April-October',
                'Currently booking for 2025',
              ]),
              isAvailable: faker.datatype.boolean({ probability: 0.8 }),
              profileImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
              viewCount: faker.number.int({ min: 0, max: 500 }),
              featured: faker.datatype.boolean({ probability: 0.3 }),
            },
          },
        },
      })

      console.log(`  ✓ Created handler: ${handler.name}`)
    }

    // Create 5 exhibitors
    console.log('👥 Creating 5 exhibitor users...')
    const exhibitors: any[] = []
    for (let i = 0; i < 5; i++) {
      const exhibitor = await prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: `exhibitor${i + 1}@handlerhub.com`,
          password: hashedPassword,
          emailVerified: new Date(),
          role: 'EXHIBITOR' as UserRole,
          image: `https://api.dicebear.com/7.x/avataaars/svg?seed=exhibitor${i}`,
        },
      })
      exhibitors.push(exhibitor)
      console.log(`  ✓ Created exhibitor: ${exhibitor.name}`)
    }

    // Create some booking requests
    console.log('📝 Creating sample booking requests...')
    const handlers = await prisma.user.findMany({
      where: { role: 'HANDLER' },
      take: 5,
    })

    for (let i = 0; i < 8; i++) {
      const exhibitor = faker.helpers.arrayElement(exhibitors)
      const handler = faker.helpers.arrayElement(handlers)

      await prisma.bookingRequest.create({
        data: {
          exhibitorId: exhibitor.id,
          handlerId: handler.id,
          showName: `${faker.location.city()} Kennel Club Show`,
          showLocation: `${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`,
          showDate: faker.date.future(),
          dogBreed: faker.helpers.arrayElement(dogBreeds),
          dogName: faker.person.firstName(),
          message: faker.lorem.paragraph(),
          status: faker.helpers.arrayElement([
            'PENDING',
            'ACCEPTED',
            'DECLINED',
          ]),
        },
      })
    }

    console.log(`✅ Database has been seeded successfully! 🌱`)
    console.log('')
    console.log('📋 Test Accounts Created:')
    console.log('  Admin:     admin@handlerhub.com / password123')
    console.log('  Handlers:  handler1-10@handlerhub.com / password123')
    console.log('  Exhibitors: exhibitor1-5@handlerhub.com / password123')
    console.log('')
  } catch (error) {
    console.error('❌ Error while seeding the database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((err) => {
  console.error('❌ Error while executing main function:', err)
  process.exit(1)
})
