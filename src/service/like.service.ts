import { Tweet } from "@prisma/client";
import { prismaClient } from "../lib/db";

class likeService {
    public static async createlike(to: string) {
        return await prismaClient.likePost.create({
            data: {
                likepost: { connect: { id: to } }
            }
        })
    };
    public static async unlikepost(to: string) {
        return await prismaClient.likePost.delete({
            where: { likepostId: to }
        })
    }
}
export default likeService;