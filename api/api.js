// 计算
let ajaxNum = 0

const request = obj => {
	// 计算加1
	ajaxNum++
	// 公告URL
	const baseUrl = "http://www.kangliuyong.com:10002"
	// 开启提示
	uni.showLoading({
		title: "努力加载中..."
	})
	// 请求头
	let header = {}
	// 如果是post请求 改变请求头
	if (obj.method == "post") {
		header = {
			'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
		}
	}
	return new Promise(reslove => {
		console.log(header);
		// 发送网络请求
		uni.request({
			...obj,
			url: baseUrl + obj.url,
			data: {
				appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
				...obj.data
			},
			header,
			success: (res) => {
				console.log("api数据", res);
				if (obj.method == "post") {
					reslove(res.data)
				} else {
					reslove(res.data.result)
				}
				// 计算减1
				ajaxNum--
				// 判断是否所有请求都成功
				if (ajaxNum == 0) {
					// 关闭提示
					uni.hideLoading()
				}

			}
		})
	})
}

export default {
	request
}