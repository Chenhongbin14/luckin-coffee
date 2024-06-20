<template>
	<view class="my">
		<!-- 背景开始 -->
		<!-- 登录背景 -->
		<image
			src="https://img2.baidu.com/it/u=37921186,3539657874&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=450"
			mode="widthFix" v-if="isLogin"></image>
			<!-- 未登录背景 -->
			<image
				src="https://img1.baidu.com/it/u=209759519,3186641225&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=450"
				mode="widthFix" v-else></image>
		<!-- 背景结束 -->

		<!-- 个人信息开始 -->
		<view class="info">
			<view class="head-img">
				<!-- 登录 -->
				<image src="../../static/dj.jpg"
					v-if="isLogin"></image>
				<!-- 未登录 -->
				<image src="https://bbs.vivo.com.cn/static/image/smiley/vivo/021.gif" v-else></image>
			</view>
			<view class="info-txt">
				<!-- 登录 -->
				<view class="detail" v-if="isLogin">
					<view class="name">榴莲千层</view>
					<view class="desc">这家伙喜欢吃榴莲千层</view>
				</view>
				<!-- 未登录 -->
				<view class="detail" v-else>
					<view class="btn" @click="goLogin">请登录</view>
				</view>
			</view>
		</view>
		<!-- 个人信息结束 -->

		<!-- 列表开始 -->
		<view class="lists">
			<view v-for="(item,index) in list" :key="index">
				<navigator :url="item.url" open-type="navigate"  class="list">
					<view class="name">{{item.name}}</view>
					<uni-icons type="forward" size="20" color="#666"></uni-icons>   <!-- 图标 -->
				</navigator>
				
			</view>
		</view>
		<!-- 列表结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 登录状态  false没登录 true登录
				isLogin: false,
				// 列表数据
				list: [{
						name: "个人资料",
						url:"/pages/myfom/myfom"
					},
					{
						name: "我的订单"
					},
					{
						name: "我的收藏"
					},
					{
						name: "地址管理"
					},
					{
						name: "安全中心"
					}
				]
			}
		},
		methods:{
			// 1.去登陆
			goLogin(){
				uni.navigateTo({
					// uni
					url:"/pages/login/login"
				})
			},
			// 2是否登录
			isLoginFunction(){
				// 获取存储
				let token = localStorage.getItem("token")||""
				if(token){
					this.isLogin=true
				}
			}
		},
		onShow(){
			// 2.调用是否登录的方法
			this.isLoginFunction()
		}
	}
</script>

<style lang="scss">
	.my {

		// 背景开始
		&>image {
			height: 316rpx;
		}

		// 背景结束
		// 个人信息开始
		.info {
			background-color: rgba(255, 255, 255, 0.5);
			margin: 20rpx;
			position: relative;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			top: -80rpx;
			display: flex;
			padding: 20rpx;
			align-items: center;

			.head-img {
				width: 120rpx;
				height: 120rpx;
				background-color: #ccc;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 20rpx;

				image {
					width: 120rpx;
					height: 120rpx;

				}
			}
		}

		.info-txt {
			.detail {
				.name {
					color: #0c34ba;
					font-weight: 700;
				}

				.desc {
					color: #ccc;
					font-size: 24rpx;
				}

				.btn {
					width: 150rpx;
					background-color: #ccc;
					text-align: center;
					line-height: 60rpx;
					border-radius: 30rpx;
				}
			}
		}

		// 个人信息结束
		// 列表开始
		.lists {
			margin: -100rpx 20rpx 0;
			background-color: rgba(255, 255, 255, 0.7);

			.list {
				margin: 0 20rpx;
				display: flex;
				line-height: 80rpx;
				border-bottom: 2rpx solid #ddd;
				justify-content: space-between;

				.name {
					color: #666;
				}
			}
		}

		// 列表结束
	}
</style>