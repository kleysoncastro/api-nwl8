import prismaClient from "../prisma";

class GetLastMessageService {
    async execute() {
        const getMessage = await prismaClient.message.findMany({
            take: 3,
            orderBy: {
                created_at: "desc",
            },
            include: {
                user: true,
            },
        });
        return getMessage;
    }
}

export { GetLastMessageService };
