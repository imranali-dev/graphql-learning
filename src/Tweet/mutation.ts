export const mutations = `#graphql
createTweets(content: String!, imageURL: String): Tweet
deleteTweet(id:String!):String
updateTweet(id:String!,content:String!):Tweet

`;
