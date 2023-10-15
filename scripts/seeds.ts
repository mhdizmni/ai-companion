const { PrismaClient } = require("@prisma/client")

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                {name: "Mahdi"},
                {name: "Bob"}
            ]
        })
    } catch (error) {
        console.error("DB error", error)
    } finally {
        await db.$disconnect();
    }
}

main();