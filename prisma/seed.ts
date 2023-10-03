import { PrismaClient } from "./generated/prisma-client-js";

const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.create({
  //   data: { name: "KJ", username: "kj", email: "kj@gm.com", password: "1234" },
  // });
  const user = await prisma.user.create({
    data: {
      name: "KJ",
      username: "kj",
      email: "kj@gm.com",
      password: "1234",
    },
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
