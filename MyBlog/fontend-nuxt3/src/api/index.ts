import { requestParams } from "@/utils/Https";

export const GetPosts= async (body) => {
  const {data:result,error} = await useFetch("/api/post/getAll",{ ...requestParams, ...body });
  return Result(result,error);
}

const Result = (res,err) => {
    if(!err.value) return res;
    
    return {
      code:400,
      message:"服务异常",
      data:{}
    };
  }
  
