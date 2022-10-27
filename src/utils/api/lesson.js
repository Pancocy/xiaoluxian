import request from '../request.js'
//过滤一级菜单
export function getFilterOption( ){
	return request({
		url:'/api/slider/getSliders'
	})
}
//课程详情
export function getCourseDetail( params ){
	return request({
		url:'/api/course/getDetail',
		params
	})
}
//检查是否有权限
export function courseCheckAuth( params ){
	return request({
		url:'/api/course/checkAuth',
		params
	})
}


//下载课程资料
export function downloadAttachment( params ){
	return request({
		url:'/api/course/downloadAttachment',
		params,
		responseType: 'blob',
	})
}

//播放课程
export function player( params ){
	return request({
		url:'/api/player/play',
		params
	})
}