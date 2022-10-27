import request from '../request'

//去结算
export function settlement( data ){
	return request({
		url:'/api/order/settlement',
		method:"post",
		data
	})
}

//支付宝结算
export function alipayOrder( data ){
	return request({
		url:'/api/pay/alipay/createOrder',
		method:"post",
		data
	})
}

//查询支付宝，支付订单状态
export function queryAlipay( params ){
	return request({
		url:'/api/pay/alipay/queryOrder',
		params
	})
}