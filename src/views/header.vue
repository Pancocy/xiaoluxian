<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col-md-2">
          <img src="../assets/logo.png" alt="" />
        </div>
        <div class="col-md-6">
          <ul>
            <router-link to="/"><li>首页</li></router-link>
            <router-link to="/about"><li>课程</li></router-link>
          </ul>
        </div>
        <div class="col-md-4">
          <el-icon
            @mouseenter="cartHover()"
            @mouseleave="cartLeave()"
            @click="goCart()"
            :class="cartFlag?'active-cart':''"
            ><ShoppingCart /></el-icon>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="请输入想要搜索的课程"
              aria-label="Search"
            />
            <i class="bi bi-search"></i>
            <router-link to="/login" v-if="!isLogin">
              <button class="btn" type="submit" style="width: 165px">
                登录/注册
              </button>
            </router-link>
            
            <div class="content-login-success" v-else>
				      <div style="cursor: pointer">我的课程</div>

              <div v-if="userInfo.avatar">
				      <img
                @mouseenter="isShow=true"
				        class="avator"
                :src="userInfo.avatar"
				        alt=""
				      />
				    </div>
            <div v-else><img  src="../assets/Avat62.png" alt="" class="avator"></div>
			      </div>
          </form>
        </div>
        <!-- 鼠标滑过头像显示 -->
        <div class="user-info" v-if='isShow' @mouseleave="isShow=false">
				  <div class="user-info-top">
				    <div class="u-i-t-top">
				      <img
				        class="avator"
				        :src="userInfo.avatar"
				        alt=""
				        v-if="userInfo.avatar"
				      />
				      <img class="avator" src='../assets/Avat62.png' v-else />
				      <div class="avator-info">
				        <p>{{userInfo.nickName}}</p>
				      </div>
				      <div class="vip" v-if="vipInfo">
				        <div class="vipImg">
				          <img :src="vipInfo.vipIcon" >
				        </div>
				        <div class="vipName">{{vipInfo.vipName}}</div>
				        <div class="endTime" v-if="vipInfo.isExpired === 0 ">{{endTimeVip}}天到期</div>
				        <div class="endTime" v-else>已过期{{Math.abs(endTimeVip)}}天</div>
				      </div>
				    </div>
				    <div class="u-i-i-bottom">
				      <div>
				        <router-link to="/">
				          <div class="info-item">
				            <img src="../assets/course.png"/>
				            <p>我的课程</p>
				          </div>
				        </router-link>
				      </div>
				      <div>
				        <router-link to="/">
				          <div class="info-item">
				            <img src="../assets/order.png" />
				            <p>订单中心</p>
				          </div>
				        </router-link>
				      </div>
				      <div>
				        <router-link to="/">
				          <div class="info-item">
				            <img src="../assets/mess.png"/>
				            <p>我的消息</p>
				          </div>
				        </router-link>
				      </div>
				      <div>
				        <router-link to="/">
				          <div class="info-item">
				            <img src="../assets/setting.png"/>
				            <p>个人设置</p>
				          </div>
				        </router-link>
				      </div>
				    </div>
				  </div>
				  <div class="user-info-bottom">
				    <div class="logout"  @click="exitLogin">退出登录</div>
				  </div>
				</div>
      </div>
    </div>
  </header>
</template>

<script setup >
//api
import { createToken } from '../utils/api/createToken'
import { getInfo,logout } from '../utils/api/login'
import {useUserStore} from '../store/user'
import router from '../router';
import { ShoppingCart } from '@element-plus/icons-vue';
import { ElMessageBox} from 'element-plus';
import { ElMessage } from 'element-plus';
//用户是否是登录状态
let isLogin = ref(false);
//用户信息
let userInfo = ref({});
//用户vip数据
let vipInfo = ref({});
//VIP到期时间
let endTimeVip = ref();
//显示用户更多数据
let isShow = ref(false);

//购物车icon
let cartFlag = ref(false)

onBeforeMount(()=>{
	createToken().then(res=>{
		let token = res.data.token;
            getInfo({token}).then((res)=>{
                if(res.meta.code == '200'){
                    console.log(res);
                    userInfo.value =res.data.data
                    isLogin.value=true
                    //用户vip
				vipInfo.value = res.data.data.vipInfo;
				//计算会员到期时间
				let now = new Date().getTime();
				let endTime = vipInfo.value.endTime-now;
				endTimeVip.value = Math.floor( endTime/1000/60/60/24);
                }
            })
	})
})

//退出登录
const exitLogin = ()=>{
  ElMessageBox.confirm(
    '确定退出登录吗?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
        logout().then((res)=>{
          if(res.meta.code=='200'){
            ElMessage({
            type: 'success',
            message: '退出成功！',
            });
            //清除本地存储的token
            let userStore = useUserStore();
            userStore.clearToken()
            router.go(0)
          }
        })

    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消退出',
      })
    })
}
//购物车
const cartHover=()=>{
  cartFlag.value=true
}
const cartLeave =()=>{
  cartFlag.value=false
}

const goCart=()=>{
  router.push('/cart')
}
</script>

<style scoped lang="less">
header {
  height: 100px;
  line-height: 100px;
  div {
    height: 100%;
  }
  .col-md-6 {
    ul {
      text-align: center;
      height: 100%;
      padding: 0;
      margin: 0;
      li {
        font-size: 16px;
        color: #808080;
        width: 80px;
        height: 100%;
        list-style: none;
        float: left;
        &:active {
          color: #388fff !important;
          font-weight: 700;
        }
      }
      .router-link-active.router-link-exact-active li {
        color: #388fff !important;
        border-bottom: 4px solid #388fff;
      }
    }
  }
  .col-md-4 {
    font-size: 16px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    form {
        align-items: center;
        position: relative;
      input {
        border: 0;
        border-radius: 8px;
        color: #333333;
        background: #f0f2f4;
        font-size: 14px;
        outline: none !important;
        height: fit-content;
        align-items: center;
        width: 215px;
      }
      .active-cart{
        color: #388fff;
        margin-right: 40px;
      }
      .cartprops{
        height: 300px;
        width: 260px;
        border-radius: 30px;
        background: #f1eded;
        position: absolute;
        top: 100px;
        left: 0;
      }
      .content-login-success {
	height: 53px;
	color: #808080;
	text-align: center;
	width: 200px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	font-size: 18px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #707070;
  div{
    display: flex;
    align-items: center;
  }
}
.avator {
	height: 53px;
	width: 53px;
	cursor: pointer;
	border-radius: 50%;
}
    }
    .bi-search{
      display: block;
      position: absolute;
      left: 45%;
    }
  }
}
.user-info {
  width: 225px;
    height: 220px;
	background-color: #fff;
	border: 1px solid rgba(248, 250, 252, 1);
	box-shadow: 0px 5px 15px 3px #888888;
	position: absolute;
  top: 80px;
    right: 80px;
	z-index: 999;
	display: block;
	border-radius: 10px;
}
.user-info-top {
	display: flex;
	width: 100%;
	height: 160px;
	border-bottom: 1px solid rgba(248, 250, 252, 1);
	flex-direction: column;
}
.u-i-t-top {
	display: flex;
	height: 80px;
	width: 100%;
	align-items: center;
}
.u-i-t-top img {
	width: 40px;
	height: 40px;
	margin: 0 10px;
	cursor: pointer;
}
.avator-info {
	width: 120px;
	height: 60px;
	font-size: 14px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #333333;
	display: flex;
	flex-direction: column;
	/*align-items: center;*/
}
/*有会员了之后高度微调*/
.avator-info p {
	height: 40px;
	line-height: 40px;
	cursor: pointer;
}
.u-i-i-bottom {
	display: flex;
	height: 100px;
	width: 200px;
	margin-top: 10px;
	flex-wrap: wrap;
	justify-content: space-around;
  div{
    height: 33px !important;
    display: flex;
    align-items: center;
    a{
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
}
.u-i-i-bottom a{
	text-decoration: none;
}
.info-item {
	width: 90px;
	height: 30px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 12px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #333333;
	border-radius: 3px;
	cursor: pointer;
	background-color: rgba(0, 0, 0, 0.1) !important;
  p{
    height: 86px;
  }
}
.info-item img {
	width: 14px;
	height: 16px;
}
.user-info-bottom {
	position: relative;
	width: 100%;
	height: 30px;
}
.logout {
	line-height: 30px;
	position: absolute;
	top: 0;
	right: 10px;
	font-size: 12px;
	font-family: Microsoft YaHei;
	font-weight: 400;
	color: #93999f;
	cursor: pointer;
}
/*vip开始*/
.vip{
  display: flex;
  flex-direction: row;
  /*flex-wrap: wrap;*/
  width: 100%;
  height: 30px;
  margin-left: -105px;
  margin-top: 18px;
  font-size: 12px;
  line-height:30px;
}
.vipImg{
  width: 15px;
  height: 15px;
  margin-right: 12px;
}
.vipImg img{
  width: 100% !important;
  height: 100% !important;
}
.vipName{
  color: #93999F;
}
.endTime{
  padding-left: 2px;
  color:#FF0000 ;
  position: absolute;
  top: 45px;
  left: 73px;
  font-size: 12px;
}

</style>