import { prismaClient } from "../lib/db";

export interface CreateTweetPayload {
    content: string;
    imageURL?: string;
    userId: string;
}
class Tweetserive {
    public static async createtweet(payload: CreateTweetPayload) {
        // const { content, imageURL, userId } = payload
        // console.log(payload.content)
        const createtweets = await prismaClient.tweet.create({
            data: {
                content:payload.content, 
                imageURL:payload.imageURL,
                author: { connect: { id: payload.userId } }
            }
        });
        return createtweets
    };
    public static async Alltweets(){
        const All = await prismaClient.tweet.findMany({
            orderBy:{createdAt:"desc"}
        });
        return All
    }
    public static async deleteTweet(tweetId: string) {
        const deleteTweets = await prismaClient.tweet.delete({ where: { id: tweetId } })
        return deleteTweets;
    }
    public static async EditTweet(tweetId: string, newContent: string) {
        const deleteTweets = await prismaClient.tweet.update({
            where: { id: tweetId },
            data: { content: newContent }
        })
        return deleteTweets;
    }
}
export default Tweetserive