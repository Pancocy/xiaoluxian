<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <ul class="slim-bar">
            <li
              v-for="item in navlist"
              :key="item.id"
              @mouseenter="mouseHover(item.id)"
            >
              {{ item.categoryName }}
            </li>
          </ul>
        </div>
        <div class="col-md-9">
          <el-carousel
            :interval="5000"
            arrow="always"
            v-if="sliderlist.length > 0"
          >
            <el-carousel-item v-for="item in sliderlist" :key="item.id">
              <img :src="item.imageUrl" alt="" />
            </el-carousel-item>
          </el-carousel>
          <!-- 使用v-if来控制显示和隐藏 -->
            <div @mouseout="mouseOut" style="height:545.8px">
              <div class="active-content" v-if="isShow">
            <div class="base">
              <h3 class="base-title">基础知识</h3>
              <div class="kno">
                <div>知识点:</div>
                <ul class="base-list">
                  <li v-for="item in SecondList" :key="item.id">
                    {{ item.categoryName }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="pay">
              <ul class="pay-menu">
                <li v-for="item in courseList" :key="item.id">
                  <img :src="item.courseCover" alt="" />
                  <div>
                    <div class="pay-title">
                      {{ item.firstCategoryName }}
                    </div>
                    <div class="pay-type">
                      {{ courseTypeFn(item.courseLevel) }} . {{ item.clicks }}
                    </div>
                    <div class="pay-price">免费学习</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
            </div>
        </div>
        <ul class="lesson">
          <li>
            <img src="../assets/chuji.png" alt="" />
            <div>
              <span>初级课程</span>
              <p>入门课、岗位多</p>
            </div>
          </li>
          <li>
            <img src="../assets/zhongji.png" alt="" />
            <div>
              <span>中级课程</span>
              <p>进阶与实战</p>
            </div>
          </li>
          <li>
            <img src="../assets/gaoji.png" alt="" />
            <div>
              <span>高级课程</span>
              <p>轻松掌握核心技能</p>
            </div>
          </li>
          <li>
            <img src="../assets/xiangmu.png" alt="" />
            <div>
              <span>项目实战</span>
              <p>手把手实践</p>
            </div>
          </li>
          <li>
            <img src="../assets/suanfa.png" alt="" />
            <div>
              <span>前端算法</span>
              <p>笑傲前端技能</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="newCourse">
    <div class="container">
      <div class="row">
        <h3>新上好课</h3>
        <ul class="newCourseList">
          <li v-for="item in mostNew" :key="item.id">
            <div class="course-img">
              <a href="#">
                <img :src="item.courseCover" alt="" />
              </a>
            </div>
            <div class="course-title">{{item.firstCategoryName}}</div>
            <div class="course-des">{{courseTypeFn(item.courseLevel)}} · {{item.clicks}}</div>
            <div class="course-price">￥:{{item.salePrice}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
//引入等级判断的mixin
import courseType from "../mixin/couseType.js"
import {
  getSlider,
  getSliderbar,
  getSecondCategorys,
  courseSearch,
  getmostNew
} from "../utils/api/slider";
let {courseTypeFn} =courseType()
let sliderlist = ref([]);
let navlist = ref([]);
//右侧二级列表显示状态
let isShow = ref(false);
//右侧二级列表数据
let SecondList = ref([]);
//二级列表底部课程数据
let courseList = ref([]);
//新上好课数据
let mostNew = ref([]);
onBeforeMount(() => {
  //轮播图数据
  getSlider().then((res) => {
    // console.log(res);
    sliderlist.value = res.data.list;
  });
  //侧边导航数据
  getSliderbar().then((res) => {
    // console.log(res);
    navlist.value = res.data.list;
  });
  //新上好课数据
  getmostNew({
    pagenum:1,
    pageSize:8,
  }).then((res)=>{
    mostNew.value=res.data.pageInfo.list
  })
});
const mouseHover = (id) => {
  isShow.value = true;
  //获取知识点
  getSecondCategorys({ categoryId: id }).then((res) => {
    SecondList.value = res.data.list;
  });
  //获取底部课程
  courseSearch({
    pagenum: 1,
    pageSize: 4,
    entity: {
      firstCategory: id,
    },
  }).then((res) => {
    courseList.value = res.data.pageInfo.list;
    // console.log(courseList);
  });
};
const mouseOut = () => {
  isShow.value = false;
};
</script>

<style lang="less" scoped>
.home {
  padding-top: 20px;
  .container {
    height: 100%;
    .row {
      height: 100%;
      .lesson {
        height: 120px;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        align-items: center;
        box-shadow: 0 55px 25px -25px #d3defb;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        border-left: 1px solid #eee;
        border-bottom: 1px solid #eee;
        border-right: 1px solid #eee;
        li {
          list-style: none;
          display: flex;
          justify-content: space-around;
          div {
            display: inline-block;
            height: 100%;
            padding-left: 10px;
          }
          img {
            width: 50px;
            height: 50px;
            // float: left;
          }
        }
      }
      .col-md-3 {
        background-color: #2b283d;
        padding: 0;
        // margin-left: 20px;
        border-top-left-radius: 10px;
        .slim-bar {
          padding: 40px 0px;
          li {
            height: 50px;
            color: #fff;
            font-weight: 400;
            list-style: none;
            line-height: 70px;
            font-size: 20px;
            padding-left: 50px;
          }
          .active-bar {
            background: #ccc;
          }
        }
      }
      .col-md-9 {
        position: relative;
        padding: 0;
        .el-carousel {
          height: 100%;
        }
        .el-carousel__item {
          width: 100%;
          img {
            width: 100%;
            height: 100%;
            border-top-right-radius: 10px;
          }
        }
        .active-content {
          z-index: 99;
          position: absolute;
          width: 724px;
          height: 100%;
          background: #fff;
          top: 0;
          left: 0;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          .base {
            height: 256px;
            padding: 15px;
            background: #fff;
            .base-title {
              font-size: 22px;
            }
            .kno {
              display: flex;
              height: fit-content;
              div {
                font-size: 16px;
                width: 80px;
              }
              ul {
                display: flex;
                flex-wrap: wrap;
                margin-left: 7px;
                padding-left: 0;
                li {
                  list-style: none;
                  margin-left: 11px;
                  margin-top: 5px;
                }
              }
            }
          }
          .pay {
            height: 260px;
            padding: 15px 30px;
            
            .pay-menu {
              height: 100%;
              display: flex;
              flex-wrap: wrap;
              li {
                list-style-type: none;
                width: 50%;
                height: 50%;
                display: flex;
                justify-content: left;
                align-items: center;
                img {
                  width: 140px;
                  height: 81px;
                }
                div {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  padding-left: 5px;
                }
                .pay-title {
                  font-size: 14px;
                }
                .pay-type,
                .pay-price {
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
}
.newCourse {
  h3{
    font-size: 24px;
    padding: 0 5px;
    color: #333333;
    line-height: 31px;
    font-weight: 700;
  }
  .newCourseList {
    padding: 0;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      position: relative;
      width: 310px;
      height: 320px;
      margin-bottom: 20px;
      box-shadow: 1px 1px 10px rgb(27 39 94 / 40%);
      border-radius: 8px;
      transition: margin-top 0.2s;
      -webkit-transition: margin-top 0.2s;
      overflow: hidden;
      .course-img {
        img {
          width: 100%;
          height: 190px;
        }
      }
      .course-title {
        font-size: 16px;
        font-weight: 700;
        margin: 10px 10px 0 10px;
      }
      .course-des {
        font-size: 12px;
        margin: 10px 0 0 10px;
      }
      .course-price {
        font-size: 14px;
        margin: 10px 0 0 10px;
      }
    }
  }
}
</style>