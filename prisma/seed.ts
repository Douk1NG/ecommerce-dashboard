import { hash } from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function upsertFilter(id: number, name: string, labels: string[]) {
  return prisma.filter.upsert({
    where: { id },
    update: {
      name,
      options: {
        deleteMany: {},
        create: labels.map((label) => ({ label })),
      },
    },
    create: {
      id,
      name,
      options: {
        create: labels.map((label) => ({ label })),
      },
    },
  })
}

async function main() {
  const passwordHash = await hash('password123', 12)

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      passwordHash,
    },
  })

  const alphabeticSize = await upsertFilter(1, 'Alphabetic Size', ['XS', 'S', 'M', 'L', 'XL'])
  const numericSize = await upsertFilter(2, 'Numeric Size', ['30', '31', '32', '33', '34'])

  const clothing = await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Clothing',
      description: 'All clothing items',
      featuredCategory: false,
      categoryFilters: {
        create: [{ filterId: alphabeticSize.id }, { filterId: numericSize.id }],
      },
    },
  })

  await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'T-Shirts',
      description: 'Casual t-shirts',
      featuredCategory: true,
      parentId: clothing.id,
      categoryFilters: {
        create: [{ filterId: alphabeticSize.id }],
      },
    },
  })

  const xsOption = await prisma.filterOption.findFirst({
    where: { filterId: alphabeticSize.id, label: 'XS' },
  })

  const product = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Classic T-Shirt',
      description: 'A comfortable everyday t-shirt',
      price: 29.99,
      featuredProduct: true,
      active: true,
      categories: {
        create: [{ categoryId: 2 }],
      },
      combinations: xsOption
        ? {
            create: [{
              price: 29.99,
              options: {
                create: [{ filterOptionId: xsOption.id }],
              },
            }],
          }
        : undefined,
    },
    include: {
      combinations: true,
    },
  })

  const combination = product.combinations[0]

  if (combination) {
    await prisma.combinationStock.upsert({
      where: { combinationId: combination.id },
      update: { quantity: 25 },
      create: {
        combinationId: combination.id,
        quantity: 25,
      },
    })
  }

  console.log('Seed complete.')
  console.log('Login: admin@example.com / password123')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
