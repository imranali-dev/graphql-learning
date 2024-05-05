import { prismaClient } from "../lib/db"

class FellowService{
    public static async fellowuser(to:string,from:string){
       return await prismaClient.fellowers.create({
            data:{
               fellower:{connect:{id:from}}, 
               fellowing:{connect:{id:to}}
            }
        })
    }
    public static async unfellowuser(to:string,from:string){
      return await prismaClient.fellowers.delete({
            where:{fellowingid_fellowerId:{fellowerId:from,fellowingid:to}}
        })
    }
}
export default FellowService