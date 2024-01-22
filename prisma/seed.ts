import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  //Create Plans
  await prisma.plan.create({
    data: {
      description: 'Free plan',
      price: 0,
      id: '1'
    }
  });
  await prisma.plan.create({
    data: {
      description: 'Essential plan',
      price: 20,
      id: '2'
    }
  });
  await prisma.plan.create({
    data: {
      description: 'Premium plan',
      price: 30,
      id: '3'
    }
  });

  //Create user
  const devUser = await prisma.user.create({
    data: {
      email: 'dev@teste.com',
      name: 'dev test',
      password: '12345678Aa@',
      plan_id: '1'
    }
  });

  //Create user auth info
  await prisma.userAuth.create({
    data: {
      user_id: devUser.id,
      activation_code: '123456',
      activation_code_expiration: `${new Date().getTime()}`,
      is_active: true,
      admin: false
    }
  });

  //Create user preference
  await prisma.preference.create({
    data: {
      theme: 'light',
      user_id: devUser.id,
      app_language: 'pt-BR'
    }
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
