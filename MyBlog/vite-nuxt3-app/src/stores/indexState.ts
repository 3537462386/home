import { defineStore } from 'pinia'
import { Post } from '@/types/index'

type indexState = {
  theme: boolean;
  isMobile: boolean;
  likePosts: Post[];
};


export const useIndexState = defineStore('index', {
  state: ():indexState => {
    return {
      theme: false,
      isMobile: false,
      likePosts: []
    };
  },
  actions: {
    changeTheme(){
      this.theme = !this.theme;
    },
    ToMobile(){
      this.isMobile = !this.isMobile;
    },
    setLikePost( post:Post[]){
      this.likePosts = post
    }
  },
  persist: process.client && {
    storage: localStorage
  }
})
