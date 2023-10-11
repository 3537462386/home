// api/staff.ts

import httpRequest from "~/utils/Https";

const GetPosts = (data: any) => {
  return httpRequest.post('/api/post/getAll',data);
};

const AddPosts = (data: any) => {
  return httpRequest.post("/api/post/addPost",data);
};

const AddPostViews = (data: any) => {
  return httpRequest.post("/api/post/addViews",data);
};

const GetCommentByPost = (data: any) => {
  return httpRequest.post("/api/comment/getCommentByPost",data);
};

const AddComment = (data: any) => {
  return httpRequest.post("/api/comment/addComment",data);
};

const GetOnePost = (data: any) => {
  return httpRequest.post("/api/post/getOne",data);
};

const LikePost = (data: any) => {
  return httpRequest.post("/api/post/likePost",data);
};

const addSong = (data: any) => {
  return httpRequest.post("/api/song/addSong",data);
};

const getSong = (data: any) => {
  return httpRequest.post("/api/song/getSong",data);
};
export { GetPosts, AddPosts, AddPostViews ,GetCommentByPost,AddComment,GetOnePost,LikePost,addSong,getSong };

