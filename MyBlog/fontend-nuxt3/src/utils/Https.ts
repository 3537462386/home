// 暴露这么一个属性
export const requestParams = {
    baseURL:"http://8.137.16.32:3000",
    method:"post",
    headers:{

    },
    // 请求拦截
    onRequest({ request, options }) {},
    // 请求错误
    onRequestError({ request, options, error }) {},
    // 响应拦截
    onResponse({ request, response, options }) {
      return response.data;
    },
    // 响应错误
    onResponseError({ request, response, options }) {}
  }
  