import { Tweet } from "@prisma/client";
import Tweetserive, { CreateTweetPayload } from "../service/Twwet.service";
import { GraphqlContext } from "../types/interfaces";
import UserService from "../service/User.service";

const queries = {
  getAllTweets: (parent: any,) => Tweetserive.Alltweets()
};

const mutations = {
  createTweets: async (parent: any, { content, imageURL }: { content: string, imageURL?: string }, ctx: GraphqlContext) => {
    if (!ctx.user) {
      throw new Error("You are not authenticated");
    }

    // Check if content is undefined or empty
    if (!content) {
      throw new Error("Content field is required");
    }

    // Check if content is null or empty after trimming whitespace
    if (!content.trim()) {
      throw new Error("Content field cannot be empty");
    }

    const newTweets = await Tweetserive.createtweet({
      content,
      imageURL,
      userId: ctx.user.id,
    });

    return newTweets;
  },
  deleteTweet: async (parent: any, { id }: { id: string }, ctx: GraphqlContext) => {
    if (!ctx.user) {
      throw new Error("You are not authenticated");
    };
    if (!id) {
      throw new Error(" id not dound");
    }

    const deletes = await Tweetserive.deleteTweet(id)
    return "user deleted"

  },
  updateTweet: async (parent: any, { id, content }: { id: string, content: string }, ctx: GraphqlContext) => {
    if (!ctx.user) {
      throw new Error("You are not authenticated");
    };
    try {
      // Call the EditTweet method of TweetService to update the tweet
      const updatedTweet = await Tweetserive.EditTweet(id, content);

      // If the tweet was successfully updated, return it
      return updatedTweet;
    } catch (error: any) {
      // Handle any errors that might occur during the update process
      throw new Error(`Failed to edit tweet: ${error.message}`);
    }
  }
};
const extraResolver = {
  Tweet: {
    author: async (parent: Tweet) =>await UserService.getUserById(parent.authorId)
  },
}

export const resolvers = { queries, mutations,extraResolver };
