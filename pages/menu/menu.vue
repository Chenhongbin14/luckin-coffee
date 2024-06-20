<template>
	<view class="menu">
		<!-- 头部搜索开始 -->
		<view class="search">
			<uni-search-bar :readonly="true" :focus="true" placeholder="输入商品名称" radius="36" bgColor="#f7f8fa">
			</uni-search-bar>
		</view>
		<!-- 头部搜索结束 -->

		<!-- 类型列表开始 -->
		<view class="type-lists">
			<view class="type-list" v-for="(item,index) in typeList" :key="index" @click="toggleType(index)">
				<image :src="activeIndex==index?item.activeImg:item.noActiveImg" mode=""></image>
				<view class="desc" :class="[activeIndex==index?'active':'']">{{item.typeDesc}}</view>
				<!-- <view class="desc" :class="{'active':activeIndex==index}">{{item.typeDesc}}</view> -->
			</view>
		</view>
		<!-- 类型列表结束 -->

		<!-- 商品列表开始 -->
		<view class="pro-lists">
			<view class="pro-list" v-for="(item,index) in proList" :key="index">
				<image :src="item.smallImg"></image>
				<view class="info">
					<view class="name">{{item.name}}</view>
					<view class="enname">{{item.enname}}</view>
				</view>
				<view class="price">￥{{item.price}}</view>
			</view>
		</view>
		<!-- 商品列表结束 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 默认被选中的下标
				activeIndex: 0,
				// 类型列表
				typeList: [],
				// 商品数据
				proList: [],
				// 图标列表
				iconList: [{
						noActiveImg: "../../static/icons_01.png",
						activeImg: "../../static/icons_02.png",
						key: "isHot"
					},
					{
						noActiveImg: "../../static/icons_03.png",
						activeImg: "../../static/icons_04.png",
						key: "type"
					},
					{
						noActiveImg: "../../static/icons_05.png",
						activeImg: "../../static/icons_06.png",
						key: "type"
					},
					{
						noActiveImg: "../../static/icons_07.png",
						activeImg: "../../static/icons_08.png",
						key: "type"
					},
					{
						noActiveImg: "../../static/icons_09.png",
						activeImg: "../../static/icons_10.png",
						key: "type"
					}
				]
			};
		},
		// 页面加载
		async onLoad() {
			// 调用获取类型列表的方法
			await this.getTypeList()
			// 获取商品方法
			this.toggleType(0)
		},
		methods: {
			// 1.获取类型列表
			getTypeList() {
				return new Promise(reslove => {
					this.$uni({
						url: "/type"
					}).then(res => {
						console.log("第一次", res);
						let arr = res
						// 把推荐添加进数组
						arr.unshift({
							id: 0,
							type: 1,
							typeDesc: "推荐"
						})
						console.log("第二次", arr);
						// 把图标数据和类型数组进行合并
						arr.forEach((item, index) => {
							for (let k in this.iconList[index]) {
								item[k] = this.iconList[index][k]
							}
						})
						console.log("第三次", arr);
						// 更新原本是空的类型列表
						this.typeList = arr

						reslove()
					})
				})
			},
			// 2.切换类型
			toggleType(index) {
				console.log("index==>", index)
				// 更新选中下标
				this.activeIndex = index;
				// 开始获取类型商品
				this.$uni({
					url: "/typeProducts",
					data: {
						key: this.typeList[index].key,
						value: this.typeList[index].type
					}
				}).then(res => {
					console.log("商品数据", res);
					this.proList = res
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	::-webkit-scrollbar {
		display: none;
	}

	.menu {
		height: 100%;

		// 头部搜索开始
		.search {
			background: #fff
		}

		// 头部搜索结束

		// 类型列表开始
		.type-lists {
			background: #fdfcfc;
			display: flex;

			.type-list {
				width: 20%;
				padding: 30rpx;
				box-sizing: border-box;

				image {
					height: 90rpx;
				}

				.desc {
					text-align: center;
					font-weight: 700;

					&.active {
						color: #0c34ba;
					}
				}
			}
		}

		// 类型列表结束

		// 商品列表开始
		.pro-lists {
			height: calc(100% - 346rpx);
			overflow-y: scroll;
			margin: 20rpx;

			.pro-list {
				background-color: #fff;
				margin-bottom: 20rpx;
				border-radius: 20rpx;
				padding: 20rpx;
				display: flex;
				align-items: center;

				image {
					width: 150rpx;
					height: 150rpx;
					margin-right: 20rpx;
				}

				.info {
					flex: 1;
					color: #646566;

					.enname {
						font-size: 24rpx;
						width: 360rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				.price {
					width: 140rpx;
					color: #0c34ba;
					font-weight: 700;
				}
			}
		}

		// 商品列表结束
	}
</style>
none