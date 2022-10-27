import request from '../request.js'
//获取首页轮播图数据
export function getSlider( ){
	return request({
		url:'/api/slider/getSliders'
	})
}
//获取左侧navbar
export function getSliderbar( ){
	return request({
		url:'/api/course/category/getFirstCategorys'
	})
}
//获取二级分类
export function getSecondCategorys(params){
	return request({
		url:'/api/course/category/getSecondCategorys',
		params
	})
}
//获取课程
export function courseSearch(data){
	return request({
		url:'/api/course/search',
		method:'post',
		data
	})
}
//新上好课数据
export function getmostNew(data){
	return request({
		url:'/api/course/mostNew',
		method:'post',
		data
	})
}