<template>
	<view class="home">
		<!-- 头部搜索开始 -->
		<view class="head-search">
			<view class="hello">
				<text class="hello-txt">上午好</text>
				<text class="hello-name">{{nickName}}</text>
			</view>
			<uni-search-bar :readonly="true" :focus="true" placeholder="输入商品名称" radius="36" bg-color="#f7f8fa">
			</uni-search-bar>
		</view>
		<!-- 头部搜索结束 -->
		<!-- 轮播图开始 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" indicator-color="#fff" indicator-active-color="#0c34ba">
			<swiper-item v-for="(item,index) in bannerList" :key="index">
				<image :src="item.bannerImg" mode="widthFix"></image>
				<view class="name">{{item.name}}</view>
			</swiper-item>
		</swiper>
		<!-- 轮播图结束 -->
		
		<!-- 热卖推荐开始 -->
			<view class="hot">
		
				<view class="title">
					<view class="title-txt">热卖推荐</view>
				</view>
		
				<view class="lists">
		
					<view class="list" v-for="(item,index) in hotList" :key="index">
		
						<image :src="item.smallImg" class="hot-img"></image>
		
								<view class="name">{{item.name}}</view>
								<view class="enname">{{item.enname}}</view>
								<view class="price">￥{{item.price}}</view>
								<view class="icon">hot</view>
		
					</view>
		
				</view>
		
			</view>
			<!-- 热卖推荐结束 -->
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据
				bannerList: [],
				// 热卖推荐
				hotList: [],
				// 获取昵称
				nickName:""
			};
		},
		// 页面加载
		onLoad(){
			// 调用一下获取轮播图数据的方法
			this.getBannerList()
			// 调用一下获取热卖推荐数据的方法
			this.getHotList()
			// 3.调用获取昵称的方法
			this.getNickName()
		},
		// 所有的方法
		methods:{
			// 1.获取轮播图数据的方法
			getBannerList(){
				// 发送网络请求
				this.$uni({
					url:"/banner"
				}).then(res=>{
					// 更新原本是空的轮播图数组
					this.bannerList = res;
				})
			},
			// 2.获取热卖推荐数据的方法
			getHotList(){
				// 发送网络请求
				this.$uni({
					url:"/typeProducts",
					data:{
						key:'isHot',
						value:1
					}
				}).then(res=>{
					// 更新原本是空的热卖推荐数组
					this.hotList = res;
				})
			},
			// 3.获取昵称的方法
			getNickName(){
				let token = localStorage.getItem("token")||""
				this.$uni({
					url:"/findMy",
					data:{
						tokenString:token
					}
				}).then(res=>{
					console.log("获取昵称的结果", res[0].nickName);
					this.nickName=res[0].nickName
				})
			}
		}
	}
</script>

<style lang="scss">
	.home{
		background-color: #fff;
		// 头部搜索开始
		.head-search{
			display: flex;
			align-items: center;
			.hello{
				padding: 0 30rpx;
				font-weight: 700;
				.hello-txt{
					color: #646566;
				}
				.hello-name{
					width: 140rpx;
					margin-left: 20rpx;
					color: #0c34ba;
				}
			}
			.uni-search-bar[data-v-180dbe05]{
				flex: 1;
			}
			::v-deep.uniui-search[data-v-a2e81f6e]:before{
				color: #0c34ba;
			}
		}
		// 头部搜索结束
		// 轮播图开始
		swiper{
			padding:20rpx;
			height: 528rpx;
			background-color: #f5f5f5;
			position: relative;
			
			image{
				height: 528rpx;
				border-radius: 20rpx;
				overflow: hidden;
			}
			.name{
				position: absolute;
				bottom: 20rpx;
				left: 20rpx;
				background-color: #0c34ba;
				color: #fff;
				padding: 10rpx 20rpx;
				border-radius: 64rpx;
			}
			
			::v-deep .uni-swiper-dots-horizontal{
				left: 80%;
				
				.uni-swiper-dot{
					border-radius: 0;
					width: 28rpx;
					height: 8rpx;
				}
			}
		}
		// 轮播图结束
		
		// 热卖推荐开始
		.hot {
			padding: 0 20rpx;
			background-color: #f5f5f5;
		
			.title {
				background-color: #fff;
				padding: 20rpx;
				margin-bottom: 20rpx;
		
				.title-txt {
					background-color: blue;
					width: 160rpx;
					color: #fff;
					text-align: center;
					line-height: 60rpx;
					border-top-right-radius: 30rpx;
				}
			}
		
			.lists {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
		
				.list {
					width: calc(50% - 10rpx);
					background-color: #fff;
					margin-bottom: 20rpx;
					border-radius: 20rpx;
					padding: 20rpx;
					box-sizing: border-box;
					position: relative;
		
					.hot-img {
						height: 305rpx;
						border-radius: 20rpx;
					}
		
					.name {
						font-size: 32rpx;
						color: #646566;
						margin: 12rpx 0 16rpx;
					}
		
					.enname {
						color: #999;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
		
					.price {
						color: #0c34ba;
						font-weight: 700;
						margin: 10rpx 0 10rpx;
					}
		
					.icon {
						width: 50rpx;
						height: 50rpx;
						background-color: #0c34ba;
						font-size: 24rpx;
						color: #fff;
						border-bottom-left-radius: 15rpx;
						border-bottom-right-radius: 15rpx;
						text-align: center;
						line-height: 50rpx;
						position: absolute;
						top: 20rpx;
						left: 40rpx;
					}
				}
			}
		}
		
		// 热卖推荐结束
	}
</style>
.uni-searchbar__box[data-v-180dbe05]
head-search