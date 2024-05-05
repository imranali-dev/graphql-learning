export const mutations = `#graphql
likePost(to:ID!):Boolean
unlikepost(to:ID!):Boolean
CommentsonPosts(id:ID!,content:String!,imageURL:String):Comment
delCommentsonPosts(id:ID!):String
updateCommentsonPosts(id:ID!,content:String!,imageURL:String):Comment
`;
// CommentsonPost