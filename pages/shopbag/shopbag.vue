<template>
	<view>
		<view class="shopbag">
			<!-- 导航栏开始 -->
			<view class="box-bg">
				<uni-nav-bar shadow left-icon="left" leftText="返回" rightText="编辑" title="购物袋" />
			</view>
			<!-- 导航栏结束 -->

			<!-- 背景图片开始 -->
			<image src="../../static/shopbag_bg.png" mode="widthFix"></image>
			<!-- 背景图片结束 -->

			<!-- 空状态开始-->
			<view class="none">
				<image src="../../static/kong.png" mode="widthFix"></image>
				<navigator url="/pages/menu/menu" open-type="switchTab">购物袋为空，点击跳转菜单页</navigator>   <!-- 网页链接 -->
			</view>
			<!-- 空状态结束 -->

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
	.shopbag {

		// 背景图片开始
		image {
			height: 136rpx;
		}

		// 背景图片结束

		.none {
			display: flex;   //弹性布局
			flex-direction: column;   // flex 容器的主轴和块轴相同。
			align-items: center;   //元素居中

			image {
				width: 200rpx;
				height: 200rpx;
				margin-top: 100rpx;
			}
			navigator {
				width: 420rpx;
				background-color: #ccc;
				text-align: center;
				line-height: 60rpx;
				border-radius: 30rpx;
				color: #fff;
				margin-top: 20rpx;
			}
		}
	}
</style>