import { User } from "@prisma/client";
import { prismaClient } from "../lib/db";
import UserService, { CreateUserPayload } from "../service/User.service";
import FellowService from "../service/fellower.service";
import { GraphqlContext } from "../types/interfaces";

const queries = {
  getUserToken: async (
    _: any,
    payload: { email: string; password: string }
  ) => {
    const token = await UserService.loginandtoken({
      email: payload.email,
      password: payload.password,
    });
    return token;
  },
  getCurrentLoggedInUser: async (_: any, parameters: any, ctx: GraphqlContext) => {
    if (ctx && ctx.user) {
      const id = ctx.user.email;
      console.log(id)
      const user = await UserService.finduniqueemail(id);
      return user;
    }
    throw new Error("I dont know who are you");
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createNew(payload);
    return res;
  },
  fellowuser:async(parent:any,{to}:{to:string},ctx:GraphqlContext)=>{
    if (!ctx.user || !ctx.user.id) {
      throw new Error("You are not authenticated");
  };
  await FellowService.fellowuser(ctx.user.id,to);
  return true
  },
  unfellowuser:async(parent:any,{to}:{to:string},ctx:GraphqlContext,)=>{
    if (!ctx.user || !ctx.user.id) {
      throw new Error("You are not authenticated");
  };
  const res=await FellowService.unfellowuser(ctx.user.id,to)
  return true
  }

  
};

const extraResolver ={
  User:{
    Tweet:async(parent:User)=>{
     return await prismaClient.tweet.findMany({
        where:{author:{id:parent.id}}
      })
    },
    fellower: async (parent: User) => {
      const result = await prismaClient.fellowers.findMany({
        where: { fellowing: { id: parent.id } },
        include: {
          fellower: true,
        },
      });
      return result.map((el) => el.fellower);
    },
    fellowing:async(parent:User)=>{
      const res =await prismaClient.fellowers.findMany({
        where:{
          fellower:{id:parent.id},
        },
        include:{
          fellowing:true
        }
      });
      return res.map((el)=>{el.fellowing})
    }
  }
}

export const resolvers = { queries, mutations,extraResolver };