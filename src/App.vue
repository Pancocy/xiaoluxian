

<template>
  <Header></Header>
  <router-view></router-view>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <img src="./assets/logo.png" alt="" />
          <img src="./assets/foot-factory.png" alt="" />
        </div>
        <div class="col-md-6">
          <ul>
            <li>关于我们</li>
            <li>联系我们</li>
            <li>意见反馈</li>
            <li>版权声明</li>
          </ul>
          <p>
            Copyright © 2018~2038 小鹿线 www.xuexiluxian.cn
            24小时服务热线:010-86483040
          </p>
          <span
            >《小鹿线用户服务协议》 《小鹿线隐私政策》 京ICP备18061704号</span
          >
        </div>
        <div class="col-md-3 qrcode">
          <img src="./assets/775debc713214fdbab4ee6a2f51851da.jpg" alt="" />
          <img src="./assets/d9f204b427634984a85ddf5f34902cc2.jpg" alt="" />
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import Header from './views/header.vue'
</script>
<style scoped lang="less">

footer {
  height: 150px;
  background: #3483ff;
  div {
    height: 100%;
  }
  .col-md-3 {
    padding: 20px 0;
    img {
      &:nth-child(2) {
        width: 140px;
        height: 100px;
        margin-left: 30px;
      }
    }
  }
  .col-md-6 {
    color: #fff;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ul {
      li {
        list-style: none;
        float: left;
        margin: 0 15px;
      }
    }
  }
  .qrcode {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 80px !important;
      height: 80px !important;
    }
  }
}
</style>
