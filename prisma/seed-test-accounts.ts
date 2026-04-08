import { ExperienceLevel, PrismaClient, UserRole } from '@prisma/client'

var bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

const main = async () => {
  try {
    console.log('Creating test/demo accounts...')

    const hashedPassword = await bcrypt.hash('password123', 10)

    // --- Test Handler ---
    const handler = await prisma.user.upsert({
      where: { email: 'testhandler@handlerhub.com' },
      update: {
        name: 'Test Handler',
        password: hashedPassword,
        role: 'HANDLER' as UserRole,
        emailVerified: new Date(),
      },
      create: {
        name: 'Test Handler',
        email: 'testhandler@handlerhub.com',
        password: hashedPassword,
        emailVerified: new Date(),
        role: 'HANDLER' as UserRole,
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=testhandler',
      },
    })
    console.log(`  Handler: ${handler.id} (${handler.email})`)

    // Upsert handler profile
    await prisma.handlerProfile.upsert({
      where: { userId: handler.id },
      update: {
        businessName: 'Test Handler Services',
        bio: 'This is a test/demo handler account for QA purposes. Professional conformation handler with 12 years of experience specializing in sporting and herding groups.',
        yearsExperience: 12,
        experienceLevel: 'PROFESSIONAL' as ExperienceLevel,
        contactEmail: 'testhandler@handlerhub.com',
        contactPhone: '(555) 123-4567',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        regions: ['Pacific Northwest', 'Western US'],
        breeds: [
          'Golden Retriever',
          'Labrador Retriever',
          'Border Collie',
          'Australian Shepherd',
        ],
        services: [
          'Professional Handling',
          'Conformation Handling',
          'Show Grooming',
          'Puppy Evaluation',
        ],
        ratePerShow: 250.0,
        ratePerDay: 400.0,
        priceRange: '$200-$400/show',
        availability: 'Available year-round',
        isAvailable: true,
        profileImage:
          'https://api.dicebear.com/7.x/avataaars/svg?seed=testhandler',
        viewCount: 42,
        featured: true,
      },
      create: {
        userId: handler.id,
        businessName: 'Test Handler Services',
        bio: 'This is a test/demo handler account for QA purposes. Professional conformation handler with 12 years of experience specializing in sporting and herding groups.',
        yearsExperience: 12,
        experienceLevel: 'PROFESSIONAL' as ExperienceLevel,
        contactEmail: 'testhandler@handlerhub.com',
        contactPhone: '(555) 123-4567',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        regions: ['Pacific Northwest', 'Western US'],
        breeds: [
          'Golden Retriever',
          'Labrador Retriever',
          'Border Collie',
          'Australian Shepherd',
        ],
        services: [
          'Professional Handling',
          'Conformation Handling',
          'Show Grooming',
          'Puppy Evaluation',
        ],
        ratePerShow: 250.0,
        ratePerDay: 400.0,
        priceRange: '$200-$400/show',
        availability: 'Available year-round',
        isAvailable: true,
        profileImage:
          'https://api.dicebear.com/7.x/avataaars/svg?seed=testhandler',
        viewCount: 42,
        featured: true,
      },
    })
    console.log('  Handler profile created/updated')

    // --- Test Exhibitor ---
    const exhibitor = await prisma.user.upsert({
      where: { email: 'testexhibitor@handlerhub.com' },
      update: {
        name: 'Test Exhibitor',
        password: hashedPassword,
        role: 'EXHIBITOR' as UserRole,
        emailVerified: new Date(),
      },
      create: {
        name: 'Test Exhibitor',
        email: 'testexhibitor@handlerhub.com',
        password: hashedPassword,
        emailVerified: new Date(),
        role: 'EXHIBITOR' as UserRole,
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=testexhibitor',
      },
    })
    console.log(`  Exhibitor: ${exhibitor.id} (${exhibitor.email})`)

    // --- Booking Request ---
    // Check if a booking already exists between these two
    const existingBooking = await prisma.bookingRequest.findFirst({
      where: {
        exhibitorId: exhibitor.id,
        handlerId: handler.id,
      },
    })

    let booking
    if (existingBooking) {
      booking = await prisma.bookingRequest.update({
        where: { id: existingBooking.id },
        data: {
          showName: 'Seattle Kennel Club All-Breed Show',
          showLocation: 'CenturyLink Field Event Center, Seattle, WA',
          showDate: new Date('2026-05-15T09:00:00Z'),
          dogBreed: 'Golden Retriever',
          dogName: 'Sunnyside Goldens Endless Summer',
          message:
            'Hi! I am looking for a professional handler for my Golden Retriever at the Seattle Kennel Club show in May. She is 2 years old, has been shown a few times as a puppy but this will be her first time in the Open class. She is well socialized and comfortable in the ring. Would love to discuss further!',
          status: 'ACCEPTED',
          classEntries: ['Open Bitches', 'Best of Breed'],
          handlerNotes:
            'Happy to handle your Golden! I have extensive experience with the breed. Looking forward to meeting her before the show.',
          handlerResponded: true,
          respondedAt: new Date(),
        },
      })
      console.log(`  Booking updated: ${booking.id}`)
    } else {
      booking = await prisma.bookingRequest.create({
        data: {
          exhibitorId: exhibitor.id,
          handlerId: handler.id,
          showName: 'Seattle Kennel Club All-Breed Show',
          showLocation: 'CenturyLink Field Event Center, Seattle, WA',
          showDate: new Date('2026-05-15T09:00:00Z'),
          dogBreed: 'Golden Retriever',
          dogName: 'Sunnyside Goldens Endless Summer',
          message:
            'Hi! I am looking for a professional handler for my Golden Retriever at the Seattle Kennel Club show in May. She is 2 years old, has been shown a few times as a puppy but this will be her first time in the Open class. She is well socialized and comfortable in the ring. Would love to discuss further!',
          status: 'ACCEPTED',
          classEntries: ['Open Bitches', 'Best of Breed'],
          handlerNotes:
            'Happy to handle your Golden! I have extensive experience with the breed. Looking forward to meeting her before the show.',
          handlerResponded: true,
          respondedAt: new Date(),
        },
      })
      console.log(`  Booking created: ${booking.id}`)
    }

    console.log('')
    console.log('=== Test Account Credentials ===')
    console.log('Handler:   testhandler@handlerhub.com / password123')
    console.log('Exhibitor: testexhibitor@handlerhub.com / password123')
    console.log(`Booking ID: ${booking.id}`)
    console.log('')
    console.log('Done.')
  } catch (error) {
    console.error('Error:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
