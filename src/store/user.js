import { defineStore } from 'pinia'
export const useUserStore = defineStore('user',{
  state: () => {
    return {
      token: '',
      userInfo:{}
    }
  },
  actions:{
  	setToken( token ){
  		this.token = token;
      this.userInfo.id=token
  	},
    clearToken(){
      this.token='';
      this.userInfo={}
    }
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [{
      key: 'xiaoluxian_user',
      storage: localStorage,
      //paths: ['token']
    }]
  }
})