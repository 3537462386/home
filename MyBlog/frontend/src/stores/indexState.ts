import { defineStore } from 'pinia'

type indexState = {
  theme: boolean;
  isMobile: boolean;
  likePosts: [];
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
    setLikePost( likes:any){
      this.likePosts = likes
    }
  },
  persist: process.client && {
    storage: localStorage
  }
})
