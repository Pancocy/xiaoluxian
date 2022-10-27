<template>
  <div class="fixed">
    <div class="bgColor">
      <h1 class="main-shopcart">购物车</h1>
    </div>
    <div class="container">
      <div class="main">
        <div class="nav">
          <span class="left">全部课程</span>
        </div>
        <ul class="head">
          <li class="item check">
            <el-checkbox
            v-model="isAllChecked"
            @change="checkAll()"
            >全选</el-checkbox>
          </li>
          <li class="item classInfo">课程信息</li>
          <li class="item price">单价</li>
          <li class="item count">数量</li>
          <li class="item total">金额</li>
          <li class="item function">操作</li>
        </ul>
        <div v-if="true">
          <ul class="haveorder" v-for="(item ,index) in cartList" :key="index">
            <li class="order-item">
              <el-checkbox
              v-model="item.check"
              @change="cartStore.itemChecked(index)"
              ></el-checkbox>
            </li>
            <li class="order-item info">
              <div class="courseimg">
                <img :src="item.courseCover" alt="" />
              </div>
              <div class="course-name">{{item.courseName}}</div>
            </li>
            <li class="order-item">￥{{item.discountPrice}}</li>
            <li class="order-item num">{{item.courseLevel}}</li>
            <li class="order-item totoalprice">￥{{item.discountPrice * item.courseLevel }}</li>
            <li class="order-item delete">
              <a href="javascript:;">
                <i class="el-icon-delete"></i>
                <span class="deletd-text"
                @click="del(item.id)"
                >删除</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="noOrder" v-else>
          <img src="/image/norder365.png" alt="" />
          <div class="order-alert">哎呦！暂无订单</div>
        </div>
        <el-divider class="line"></el-divider>
        <ul class="foot">
          <li class="foot-item">已选课程<span class="unique">{{total.single.number}}</span></li>
          <li class="foot-item">合计<span class="unique">{{total.single.sum}}</span></li>
          <li>
            <button class="btn" @click='goOrder'>去结算</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
//引入api
import { onBeforeMount } from '@vue/runtime-core'
import { getShopCarList,deleteShopCar } from '../utils/api/cart'
import { createToken} from '../utils/api/createToken'
//引入pinia
import { useCartInfo } from '../store/cart'

//用于解构

import { storeToRefs } from 'pinia'
import router from '../router'
const  cartStore =useCartInfo()
let { cartList ,isAllChecked,total} = storeToRefs(cartStore)

//定义购物车商品的数据
onBeforeMount(()=>{
  getShopCarList({    pagenum:1,
    pageSize:8,}).then((res)=>{
    cartStore.storeCart(res.data.pageInfo.list)
  })
  console.log(total);
})

//点击选择
const checkAll = ()=>{

if( isAllChecked.value ){
  //不选
  cartStore.unAll();
}else{
  //全选
  cartStore.all();
}

}

//删除
const del=(id)=>{
  ElMessageBox.confirm('确定删除该课程吗？', '删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    createToken().then(res=>{
      let token = res.data.token;
      deleteShopCar({
        id
      },token)
    })
    ElMessage.success({
      message: '删除成功!'
    });
  }).catch(() => {
    ElMessage.info({
      message: '已取消删除'
    });
  });
}
//去结算界面
const goOrder = ()=>{
  router.push('/confirmOrder');
}
</script>

<style scoped>
li{list-style: none;}
.fixed {
  width: 100%;
  height: 100%;
  background: #ffffff;
}
.bgColor {
  width: 100%;
  height: 200px;
  background-color: red;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.container {
  width: 1200px;
  margin: -100px auto 50px auto;
  background: #ebedf2;
  border-radius: 12px;
  box-shadow: 0px 2px 5px #888888;
}
.main {
  padding: 20px;
  border-radius: 5px;
}
.main-shop {
  position: relative;
  display: flex;
  align-content: center;
}
.main-shop i {
  font-size: 35px;
  padding: 20px 10px 0 0;
  color: #ff4400;
  font-weight: bold;
}
.main-shopcart {
  width: 1200px;
  margin: 0 auto;
  height: 42px;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 35px;
  color: #ffffff;
  padding: 30px 0;
  opacity: 1;
}
.nav {
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #e6e6e6;
}
.nav .left {
  width: 80px;
  height: 26px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 0px;
  color: #ff4400;
  opacity: 1;
  border-bottom: 2px solid #ff4400;
}
.nav .right {
  width: 108px;
  height: 24px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 0px;
  color: #333333;
  opacity: 0.5;
}

/* 头部开始 */
.head {
  display: flex;
  padding: 0 10px;
  margin: 20px 0;
  width: 100%;
  height: 35px;
  line-height: 35px;
  background: #fcfcfc;
  opacity: 1;
  border-radius: 0px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0px 2px 5px 2px #cccccc;
}
.head .item {
  width: 150px;
  font-size: 14px;
  color: #333333;
}
.check .all {
  margin-right: 10px;
}
.check .text {
  width: 1487px;
  height: 40px;
}
.classInfo {
  width: 400px !important;
  color: #333333;
}
/* 头部结束 */

/* 订单开始 */
.haveorder {
  display: flex;
  width: 100%;
  height: 200px;
  background: #fcfcfc;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px 2px #cccccc;
}
.haveorder .order-item {
  height: 200px;
  line-height: 200px;
  margin: 5px;
}
.order-item:first-child {
  width: 30px;
}
.order-item {
  width: 150px;
  font-size: 16px;
  color: #333333;
}
.totoalprice {
  color: #e2231a;
}
.num {
  width: 120px !important;
  padding-left: 15px;
}
.info {
  display: flex;
  width: 470px !important;
  height: 200px;
  line-height: 200px;
}
.courseimg {
  width: 200px;
  height: 120px;
}
.courseimg img {
  width: 100%;
  height: 100%;
}
.info .course-name {
  width: 300px;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.delete {
  cursor: pointer;
}
.deletd-text {
  margin-left: 5px;
}

/* 订单结束 */

/* 暂无订单开始 */
.noOrder {
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 200px 0;
}
.order-alert {
  height: 31px;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 0px;
  color: #b5b9bc;
  opacity: 1;
  margin: 20px 120px;
}
/* 暂无订单结束 */
.foot {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #333333;
  margin-bottom: 10px;
}
.foot-item {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
  margin: 0 20px;
}
.unique {
  margin-left: 5px;
  font-size: 24px;
  color: #ff4400;
}
.btn {
  width: 120px;
  height: 40px;
  margin-left: 20px;
  border: none;
  color: #ffffff;
  font-size: 22px;
  border-radius: 5px;
  background: #ff4400;
  cursor: pointer;
  box-shadow: 0px 3px 5px 2px #ff727f;
}
</style>