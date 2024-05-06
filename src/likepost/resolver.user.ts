import CommentsonPost, { CreatecommentPayload } from "../service/Coomentonpost.service";
import likeService from "../service/like.service";
import { GraphqlContext } from "../types/interfaces";


const queries = {

};
const mutations = {
  likePost: async (parent: any, { to }: { to: string }, ctx: GraphqlContext) => {
    if (!ctx.user || !ctx.user.id) {
      throw new Error("You are not authenticated");
    };
    await likeService.createlike(to)
    return true
  },
  unlikepost: async (parent: any, { to }: { to: string }, ctx: GraphqlContext) => {
    if (!ctx.user || !ctx.user.id) {
      throw new Error("You are not authenticated");
    };
    await likeService.unlikepost(to)
    return true
  },
  CommentsonPosts: async (_: any, payload: CreatecommentPayload, ctx: GraphqlContext) => {
    const { content, imageURL, id } = payload
    if (!ctx.user || !ctx.user.id) {
      throw new Error("You are not authenticated");
    };
    try {
      const comments = await CommentsonPost.postcomment({
        content: payload.content,
        imageURL: payload.imageURL,
        id: payload.id
      });
      return comments
    } catch (error) {
      console.error("Error fetching comment:", error);
      throw new Error("Failed to fetch comment");
    }

  },
  delCommentsonPosts: async (_: any, payload: CreatecommentPayload, ctx: GraphqlContext) => {
    const { content, imageURL, id } = payload;
    if (!ctx.user || !ctx.user.id) {
      throw new Error("You are not authenticated");
    };
    CommentsonPost.deletecomment(id)
      .then(() => {
        console.log("Comment has been deleted");
        return "Comment has been deleted successfully";
      })
      .catch((error) => {
        console.error("Error deleting comment: ", error);
      });
  },
  updateCommentsonPosts: async (_: any, { content, imageURL, id }: { content: string, imageURL: string, id: string }, ctx: GraphqlContext) => {
    if (!ctx.user || !ctx.user.id) {
      throw new Error("You are not authenticated");
    };
   CommentsonPost.editcomment(
      content,
      imageURL,
      id,
    )
      .then((result) => {
        console.log("Comment has been updated");
        return result;
      }).catch((err:any) => {
        console.error("Error updating comment: ", err);
      });
  }
};
const extraResolver = {}

export const resolvers = { queries, mutations, extraResolver };
