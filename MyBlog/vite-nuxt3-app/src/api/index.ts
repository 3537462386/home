import { requestParams } from "@/utils/Https";

export const GetPosts= async (body:any) => {
  const {data:result,error} = await useFetch("/api/post/getAll",{ ...requestParams, ...body });
  console.log()
  return Result(result,error);
}

export const GetHeadText= async () => {
  const {data:result,error} = await useFetch("https://v1.hitokoto.cn?c=a&c=c&c=h&c=i");
  
  return Result(result,error);
}

const Result = (res:any,err:any) => {
    if(!err.value) return res;
    return {
      code:400,
      message:"服务异常",
      data:{}
    };
  }
  
