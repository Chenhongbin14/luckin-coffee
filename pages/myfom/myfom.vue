<template>
	<view>
		<view class="shopbag">
			<!-- 导航栏开始 -->
			<view class="box-bg">
				<uni-nav-bar shadow left-icon="left" leftText="返回" title="个人资料" />
			</view>
			<!-- 导航栏结束 -->

			<!-- 背景图片开始 -->
			<view class="bj"></view>
			<!-- 背景图片结束 -->

			<!-- 列表开始 -->
			<view class="box">
				<view class="b1">头像<image src="../../static/my.png"></image></view>
				<view class="b2">用户id<view class="b22">coffee</view></view>
				<view class="b3">昵称<view class="b33">丁真</view></view>
				<view class="b4">简介<view class="b44">这家伙喜欢抽电子烟</view></view>
			</view>
			<!-- 列表结束 -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.bj{
		width: 100%;
		height: 300rpx;
		background-color:#0000ff;
	}
	.box{
		
		.b1{
			image{
				width: 60rpx;
				height: 60rpx;
				margin-left: 600rpx;
				margin-top: -40rpx;
			}
			border-bottom: solid 1px #ccc;
			margin: 30rpx 10rpx 20rpx;
		}
		.b2{
			.b22{
				color: #666;
				margin-left: 480rpx;
				font-weight: 500;
			}
			border-bottom: solid 1px #ccc;
			margin: 30rpx 10rpx 20rpx;
			display: flex;
		}
		.b3{
			.b33{
				color: #666;
				margin-left: 530rpx;
				font-weight: 500;
			}
			border-bottom: solid 1px #ccc;
			margin: 30rpx 10rpx 20rpx;
			display: flex;
		}
		.b4{
			.b44{
				color: #666;
				margin-left: 330rpx;
				font-weight: 500;
			}
			border-bottom: solid 1px #ccc;
			margin: 30rpx 10rpx 20rpx;
			display: flex;
		}
		width: 90%;
		height: 400rpx;
		background-color: #e7e7e7;
		margin: -50rpx 20rpx 0;
		padding: 10rpx;
		border-radius:40rpx 40rpx 0 0;
		font-weight: 700;
		z-index: 2;
	}
</style>