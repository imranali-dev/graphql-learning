import { prismaClient } from "../lib/db"
export interface CreatecommentPayload {
    content: string;
    imageURL?: string;
    id: string;
}
class CommentsonPost {
    public static async getCommentById(id: string) {
        try {
            const comment = await prismaClient.comments.findUnique({
                where: { id }
            });
            if (!comment) {
                throw new Error('Comment not found');
            }
            return comment;
        } catch (error) {
            console.error('Error fetching comment:', error);
            throw new Error('Failed to fetch comment');
        }
    }
    public static async postcomment(payload: CreatecommentPayload) {
        try {
            const post = await prismaClient.comments.create({
                data: {
                    content: payload.content,
                    imageURL: payload.imageURL,
                    commentsonpost: { connect: { id: payload.id } }
                }
            });
            return post
        } catch (error: any) {
            console.error('Error posting comment:', error);
            throw new Error('Failed to post comment');
        }

    };
    public static async deletecomment(id: string) {
        try {
            return await prismaClient.comments.delete({
                where: { id }
            })
        } catch (error) {
            console.error('Error posting comment:', error);
            throw new Error('Failed to delet comment');
        }
    };
    public static async editcomment(commentId: string, newContent: string, imageURL: string) {
        try {
            const editable = await prismaClient.comments.update({
                where: { id: commentId },
                data: { content: newContent, imageURL }
            })
            return editable
        } catch (error) {
            console.error('Error posting comment:', error);
            throw new Error('Failed to delet comment');
        }
    }
}
export default CommentsonPost