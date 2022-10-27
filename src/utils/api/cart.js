import request from '../request'

//获取购物车商品
//新上好课数据
export function getShopCarList(data){
	return request({
		url:'/api/course/mostNew',
		method:'post',
		data
	})
}

//删除购物车
export function deleteShopCar( params , token ){
	return request({
		url:'/api/shopcar/deleteShopCar',
		params,
		headers:{
			token
		}
	})
}