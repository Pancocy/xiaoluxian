<template>
  <div class="detail-title">
    <div class="detail-main">
      <div class="detail-map">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item>课程</el-breadcrumb-item>
          <el-breadcrumb-item>免费课</el-breadcrumb-item>
          <el-breadcrumb-item>{{detail.courseName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="detail-name">{{detail.courseName}}</div>
      <div class="detail-content">难度 {{courseTypeFn(courseLevel.Level)}}</div>
    </div>
  </div>
  <div class="detail-container">
    <div class="tab-name">
      <ul>
        <li @click="isActive = 1" :class="isActive == 1 ? 'active' : ''">
          章节
        </li>
        <li @click="isActive = 2" :class="isActive == 2 ? 'active' : ''">
          下载笔记代码
        </li>
      </ul>
    </div>
    <div class="tab-chapters" v-if="isActive == 1">
      <div class="tab-txt">
        <div class="txt-content">
          简介：{{bizCourseDetail.description?bizCourseDetail.description:'暂无课程介绍'}}
        </div>
        <div class="txt-btn">
          <div class="payment">立即购买</div>
          <div class="add-cart">加入购物车</div>
        </div>
      </div>
      <div class="detail-list">
        <div class="item"
        v-for="item in bizCourseChapters"
        :key="item.id"
        >
          <div class="item-title">
            <div class="item-name">{{item.chapterName}}</div>
            <div class="item-key">
              {{item.description}}
            </div>
          </div>
          <ul>
            <li v-for="k in (item.children)" :key="k.id">
              <div class="course">
                <img src="../assets/detail-video.png" />
                <div>视频：{{k.chapterName}}</div>
              </div>
              <div class="course-video"
              @click="goVideo(item,k.id)"
              >开始学习</div>
            </li>
          </ul>
        </div>

      </div>
    </div>
    <div class="tab-main" v-if="isActive == 2">
      <ul>
        <li
        v-for="item in Attachment"
        :key="item.id"
        >
          <div>01 {{item.attachmentName}}</div>
          <div 
          class="download"
          @click="downloadCourse(item)"
          >下载资料</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, reactive } from "@vue/runtime-core";
import { getCourseDetail,courseCheckAuth,downloadAttachment } from "../utils/api/lesson";
//引入难度等级判断的混入
import courseType from "../mixin/couseType.js";
import { useUserStore } from "../store/user";
import router from "../router";
import { ElMessage } from "element-plus";
const userStore =useUserStore()
let { courseTypeFn } = courseType();
//引入pinia
let isActive = ref(1);
//课程详情数据
let detail = reactive({
  courseName: "",
  chapters:'',
});
//课程难度
let courseLevel =reactive({
    Level:'',
})
//课程章节
let bizCourseChapters = ref([]);
//课程资料
let bizCourseDetail = ref([]);
//资料下载
let Attachment = ref([]);
//引入请求课程详情的api
let route = useRoute();
onBeforeMount(() => {
    getCourseDetail({
    courseId: route.query.id,
  }).then((res) => {
    let data = res.data.data;
    console.log(data);
    detail.courseName=data.courseName
    courseLevel.Level=data.courseLevel
    bizCourseChapters.value=data.bizCourseChapters
    bizCourseDetail.value=data.bizCourseDetail
    Attachment.value= data.bizCourseAttachments
  });
});
//下载资料
const downloadCourse =(item)=>{
    // console.log(userStore.token);
    if(userStore.token == ''){
      ElMessage('请先登录，正在跳转至登录界面')
      setTimeout(()=>{
          router.push('/login')
      },1000)
    }else{
      //如果登录检查用户的权限 
      courseCheckAuth({courseId:item.courseId}).then((res)=>{
        console.log(res);
        if(res.data.data.hasAuth == true){
            // alert(1)
            downloadAttachment({
      courseId:item.courseId,
      attachmentId:item.id
    }).then(res=>{
      const blob = new Blob([res]);
      let fileName = item.attachmentName;
      let fileUrl = item.attachmentUrl;
      const extName = fileUrl.substring(
          fileUrl.lastIndexOf('.')
      );
      fileName = fileName + extName;
      const link = document.createElement('a');
      link.download = fileName;
      link.target = '_blank';
      link.style.display = 'none';
      link.href = URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    })
        }
        else{
          ElMessage('请先购买此课程')
        }
      })
    }
}

//跳转视频界面
const goVideo =(item,chapterId)=>{
  if(userStore.token == ''){
      ElMessage('请先登录，正在跳转至登录界面')
      setTimeout(()=>{
          router.push('/login')
      },1000)
    }else{
      //如果登录,检查用户的权限 
      courseCheckAuth({courseId:item.courseId}).then((res)=>{
        if(res.data.data.hasAuth == true){
          router.push(
    {
      path:'/videoCourse/' +item.courseId +'/'+chapterId,
    }
  )
        }
        else{
          ElMessage('请先购买此课程')
        }
      })
    }
}

</script>

<style scoped>
.detail-title {
  width: 100%;
  height: 183px;
  background: url("../assets/detail-bg.png") no-repeat;
  background-size: 100% 100%;
}
.detail-main {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1000px;
  margin: 0 auto;
  height: 100%;
}
::v-deep .el-breadcrumb__separator {
  color: #fff;
}
::v-deep .el-breadcrumb__inner {
  color: #fff;
}
::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: #fff;
  font-weight: 500;
}
.detail-name {
  font-size: 27px;
  font-weight: 500;
  color: #ffffff;
}
.detail-content {
  font-size: 12px;
  font-weight: 400;
  color: #ffffff;
}
.tab-name {
  width: 100%;
  height: 57px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
}
.tab-name ul {
  display: flex;
  align-items: center;
  height: 57px;
  width: 1000px;
  margin: 0 auto;
  font-size: 16px;
  cursor: pointer;
}
.tab-name ul li {
  list-style: none;
}
.tab-name ul li + li {
  margin-left: 67px;
}
.tab-name ul li.active {
  position: relative;
  color: #388fff;
  font-weight: bold;
}
.tab-name ul li.active:after {
  content: "";
  position: absolute;
  left: 50%;
  margin-left: -20%;
  bottom: -6px;
  width: 40%;
  height: 3px;
  background: #388fff;
  border-radius: 1px;
}
.tab-chapters {
  width: 1000px;
  margin: 0 auto;
}
.tab-txt {
  margin: 29px 0;
  width: 100%;
  height: 147px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09);
  border-radius: 5px;
}
.txt-content {
  padding: 24px 27px;
}
.txt-btn {
  display: flex;
  justify-content: flex-end;
}
.payment {
  margin-right: 13px;
  width: 99px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  color: #ffffff;
  background: #f11d1d;
  border-radius: 15px;
}
.add-cart {
  margin-right: 33px;
  width: 99px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  color: #f11d1d;
  background: #fde7e7;
  border-radius: 15px;
}
.detail-list {
  margin-top: 30px;
}
.item {
  margin-bottom: 10px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.09);
  border-radius: 5px;
}
.item-title {
  padding: 16px 27px;
}
.item-name {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}
.item-key {
  margin-top: 10px;
  font-size: 12px;
  font-weight: 400;
  color: #5c5c5c;
}

.item ul li {
  display: flex;
  justify-content: space-between;
  padding: 16px 27px;
}
.item ul li .course {
  display: flex;
}
.course {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
}
.course img {
  width: 13px;
  height: 11px;
  margin-right: 7px;
}
.course-video {
  width: 73px;
  height: 20px;
  text-align: center;
  font-size: 12px;
  color: #ffffff;
  line-height: 20px;
  background: #388fff;
  border-radius: 8px;
}
.tab-main {
  width: 1000px;
  margin: 0 auto;
}
.tab-main ul {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.tab-main ul li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 10px 0;
  line-height: 35px;
  font-size: 14px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 3px 6px rgb(0 0 0 / 9%);
}
.download {
  width: 100px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  background-color: #007bff;
}
</style>