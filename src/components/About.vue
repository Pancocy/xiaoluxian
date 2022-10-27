<template>
  <div class="filter-tab">
    <div class="container">
      <div class="row">
        <div class="filter-direction">
          <div class="filter-title">课程方向</div>
          <div class="filter-all">全部</div>
          <ul>
            <li
              v-for="item in FirstfilterData"
              :key="item.id"
              @click="evevtFirst(item.id)"
              :class="currentId==item.id?'active-option':''"
            >
              {{ item.categoryName }}
            </li>
          </ul>
        </div>
        <div class="filter-direction">
          <div class="filter-title">课程分类</div>
          <div class="filter-all">全部</div>
          <ul>
            <li
              v-for="item in SecondFilterData"
              :key="item.id"
              @click="eventSec(item.id)"
              :class="currentIndex==item.id?'active-option':''"
            >
              {{ item.categoryName }}
            </li>
          </ul>
        </div>
        <div class="filter-direction">
          <div class="filter-title">课程难度</div>
          <div class="filter-all">全部</div>
          <ul>
            <li
              v-for="item in levelList"
              :key="item.id"
              @click="eventLevel(item.id)"
              :class="currentLv==item.id?'active-option':''"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="filter-content">
    <div class="container">
      <div class="row">
        <div class="filter-option">
          <ul>
              <li
              v-for="item in moreOption"
              :key="item.id"
              style="border-right:3px solid #ccc"
              @click="addOption(item.id,item.status)"
              :class="item.id==currentOption?'active-option':''"
              >
            {{item.name}}
            </li>
          </ul>
          <div class="filter-type">
            <el-radio-group v-model="radio" @change='tabCourse'>
					    <el-radio :label="1">免费课程</el-radio>
					    <el-radio :label="2">会员免费课程</el-radio>
					</el-radio-group>
          </div>
        </div>
        <ul class="filter-result">
          <li 
          v-for="item in filterResult" 
          :key="item.id"
          @click="jumpToDo(item.id)"
          >
            <div class="course-img">
                <img :src="item.courseCover" alt="" />
            </div>
            <div class="course-title">{{ item.courseName }}</div>
            <div class="course-des">
              {{ courseTypeFn(item.courseLevel) }} · {{ item.clicks }}人已学习
            </div>
            <div class="course-price">￥:{{ item.salePrice }}</div>
          </li>
        </ul>
        <div class="filter-paganation">
          <el-pagination
            :page-size="8"
            layout="prev, pager, next"
            :total="totalPage"
            @current-change='currentChange'
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "@vue/runtime-core";
import courseType from "../mixin/couseType.js";
import router from "../router";
import {
  getSliderbar,
  getSecondCategorys,
  courseSearch,
} from "../utils/api/slider";
let { courseTypeFn } = courseType();
//一级过滤菜单数据
let FirstfilterData = ref([]);
//二级过滤菜单数据
let SecondFilterData = ref([]);
//过滤结果课程数据
let filterResult = ref([]);
//分页计算
let totalPage = ref([0]);
//查询课程的参数
let courseParams = reactive({
  pageNum: 1,
  pageSize: 8,
  entity: {
    firstCategory: "",
    secondCategory: "",
    courseLevel: "",
    //其他筛选选项
    sortBy:'',
		isMember:'',
		isFree:''
  },
});
//等级筛选的数据
let levelList = ref([
  { name: "初阶", id: 1 },
  { name: "中阶", id: 2 },
  { name: "高阶", id: 3 },
]);
//定义其他筛选数据
let moreOption= ref([
  {name:"综合",id:1,status:''},
  {name:"最新课程",id:2,status:''},
  {name:"最多购买",id:3,status:''},
  {name:"价格",id:4,status:''}
])
//筛选选项的动态类绑定
let currentId=ref([0])
let currentIndex=ref([0])
let currentLv=ref([0])
let currentOption=ref([0])
onBeforeMount(() => {
  //获取一级分类
  getSliderbar().then((res) => {
    FirstfilterData.value = res.data.list;
    console.log(FirstfilterData.value);
  });
  //获取二级分类
  SecondFilter({ categoryId: -1 });
  //获取筛选结果
  getFilterRes(courseParams);
});
const SecondFilter = (id) => {
  getSecondCategorys(id).then((res) => {
    SecondFilterData.value = res.data.list;
    console.log(SecondFilterData.value);
  });
};
const getFilterRes = (params) => {
  courseSearch(params).then((res) => {
    filterResult.value = res.data.pageInfo.list;
    totalPage.value = res.data.pageInfo.total;
  });
};
//点击一级筛选菜单显示对应二级菜单
const filterAllList =  document.querySelectorAll('.filter-all');
const evevtFirst = (id) => {
  SecondFilter({ categoryId: id });
  currentId.value=id;
  // const filterAllList =  document.querySelectorAll('.filter-all');
  // filterAllList[0].className='unactive'
  courseParams.entity.firstCategory = id;
  courseParams.entity.courseLevel = "";
  courseParams.entity.secondCategory = "";


  getFilterRes(courseParams);
};
//点击二级显示对应课程
const eventSec = (id) => {
  courseParams.entity.secondCategory = id;
  courseParams.entity.courseLevel = "";
  currentIndex.value=id;
  getFilterRes(courseParams);
};
//点击等级筛选对应课程
const eventLevel = (id) => {
  courseParams.entity.courseLevel = id;
  currentLv.value=id
  getFilterRes(courseParams);
};
//点击其他筛选条件
const addOption=(id,status)=>{
  currentOption.value=id;
  if( id == 1 ){
		courseParams.entity.sortBy = '';
		moreOption.value[3].status = '';
		courseParams.entity.isMember = '';
		courseParams.entity.isFree = '';
	}else if( id == 2 ){
		courseParams.entity.sortBy = 'time-desc';
		moreOption.value[3].status = '';
		courseParams.entity.isMember = '';
		courseParams.entity.isFree = '';
	}else if( id == 3 ){
		courseParams.entity.sortBy = 'clicks-desc';
		moreOption.value[3].status = '';
		courseParams.entity.isMember = '';
		courseParams.entity.isFree = '';
	}else if( id == 4 ){
		courseParams.entity.isMember = '';
		courseParams.entity.isFree = '';
		if( status == 'price-desc' || status == '' ){
			moreOption.value[3].status = 'price-asc';
			status = 'price-asc';
		}else{
			moreOption.value[3].status = 'price-desc';
			status = 'price-desc';
		}
		courseParams.entity.sortBy = status;
	}
  getFilterRes(courseParams);
}

//点击免费课程 和 会员课程
const radio = ref(3);
let tabCourse = ( val )=>{
	if( val == '1' ){
	    courseParams.entity.isMember = '';
	    courseParams.entity.isFree = '1';
	}else if( val =='2' ){
	    courseParams.entity.isFree = '';
	    courseParams.entity.isMember = '1';
	}
	getFilterRes(courseParams);
}
//分页
const currentChange = ( val )=>{
	courseParams.pageNum = val;
	getFilterRes(courseParams);
}

//点击每个课程进入详情页
const jumpToDo=(id)=>{
  router.push(
    {
      path:'/about/coursedetail',
      query:{
        id
      }
    }
    )
}
</script>

<style scoped lang="less">
.active-option{
        color: #388fff !important;
        text-decoration: none;
        background: rgba(44, 128, 255, 0.1);
        border-radius: 5px;
        padding: 5px;
}
.filter-tab {
  height: 312px;
  background: #f3f5f9;
  padding: 30px 0;
  .container,
  .row {
    height: 100%;
    .filter-direction {
      display: flex;
      height: fit-content;
      align-items: center;
      justify-content: flex-start;
      .filter-title {
        font-weight: 700;
        line-height: 48px;
        color: #333;
      }
      .filter-all {
        color: #388fff;
        text-decoration: none;
        background: rgba(44, 128, 255, 0.1);
        border-radius: 5px;
        padding: 5px;
        margin-left: 45px;
      }
      ul {
        display: flex;
        align-items: center;
        margin-bottom: 0;
        flex-wrap: wrap;
        border-bottom: 1px dotted #e0e0e0;
        padding: 5px;
        li {
          list-style: none;
          margin-left: 30px;
          color: #515759;
          font-size: 14px;
          line-height: 25px;
          cursor: pointer;
        }
      }
    }
  }
}
.filter-option {
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ul {
    display: flex;
    padding: 0;
    margin: 0;
    font-size: 14px;
    color: #515759;
    li {
      list-style: none;
      padding: 0 10px;
      cursor: pointer;
    }
  }
  .filter-type {
    display: flex;
    justify-content: flex-end;
    div {
      margin-right: 30px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .lable {
        width: 14px;
        height: 14px;
        border: 1px solid;
        margin-right: 5px;

      }
    }
  }
}
.filter-result {
  padding: 0;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  li {
    margin: 0px 10px;
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
.filter-paganation {
  margin: 20px 0;
  .el-pagination {
    justify-content: center;
    align-items: center;
  }
}
</style>