<template>
	<view class="login">
	
	        <!-- 头部开始 -->
	        <view class="head">
	            <image src="../../static/home_active.png" mode="widthFix"></image>
	            <view class="name">Luckin Coffee</view>
	            <navigator url="/pages/home/home" open-type="switchTab">先逛一逛</navigator>
	        </view>
	        <!-- 头部结束 -->
	
	        <!-- 欢迎开始 -->
	        <view class="hello">
	            <view class="name">欢迎回来！</view>
	            <view class="enname">Please login to your accounts</view>
	        </view>
	        <!-- 欢迎结束 -->
	
	        <!-- 登录表单开始 -->
	        <view class="login-form">
	            <uni-forms ref="login" :modelValue="loginData" :rules="rules">
	                <uni-forms-item label="手机号" name="phone">
	                    <uni-easyinput type="text" v-model="loginData.phone" placeholder="请输入手机号" />
	                </uni-forms-item>
	                <uni-forms-item label="密码" name="password">
	                    <uni-easyinput type="password" v-model="loginData.password" placeholder="请输入密码" />
	                </uni-forms-item>
	            </uni-forms>
	            <view class="forget">忘记密码？</view>
	            <view class="btn btn1" @click="submitLogin">登录</view>
	            <view class="btn btn2" @click="open">注册</view>
	        </view>
	        <!-- 登录表单结束 -->
	
	        <!-- 注册弹窗开始 -->
	        <view class="popup">
	            <uni-popup ref="popup" type="bottom">
	                <view class="open">
	                    <!-- 注册模块 -->
	                    <view class="head">
	                        <view class="txt">注册</view>
	                        <uni-icons type="closeempty" size="30" color="#666" @click="close"></uni-icons>
	                    </view>
	                    <!-- 登录表单开始 -->
	                    <view class="login-form">
	                        <uni-forms ref="register" :modelValue="registerData" :rules="rules">
	                            <uni-forms-item label="手机号" name="phone">
	                                <uni-easyinput type="text" v-model="registerData.phone" placeholder="请输入手机号" />
	                            </uni-forms-item>
	                            <uni-forms-item label="密码" name="password">
	                                <uni-easyinput type="password" v-model="registerData.password" placeholder="请输入密码" />
	                            </uni-forms-item>
	                            <uni-forms-item label="昵称" name="nickName">
	                                <uni-easyinput type="text" v-model="registerData.nickName" placeholder="请输入昵称" />
	                            </uni-forms-item>
	                        </uni-forms>
	                        <view class="btn btn1" @click="submitRegister">注册</view>
	                    </view>
	                    <!-- 登录表单结束 -->
	                </view>
	            </uni-popup>
	        </view>
	        <!-- 注册弹窗结束 -->
	
	    </view>
</template>

<script>
    export default {
        data() {
            return {
                // 登录表单数据
                loginData: {
                    phone: '13539603055',
                    password: 'a123456'
                },
                // 注册表单的数据
                registerData: {
                    phone: '13539603055',
                    password: 'a123456',
                    nickName: "榴莲千层"
                },
                // 规格
                rules: {
                    // 对phone字段进行必填验证
                    phone: {
                        rules: [{
                            required: true,
                            errorMessage: '请输入正确的手机号',
                        }]
                    },
                    // 对密码字段进行必填验证
                    password: {
                        rules: [{
                                errorMessage: '请输入正确的密码',
                            },
                            {
                                minLength: 6,
                                maxLength: 16,
                                errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
                            }
                        ]
                    },
                    // 对昵称字段进行必填验证
                    nickName: {
                        rules: [{
                            required: true,
                            errorMessage: '请输入正确的昵称',
                        }]
                    },
                }
            }
        },
        methods: {
            // 1.触发登录的提交表单
            submitLogin() {
                this.$refs.login.validate().then(res => {
                    console.log('表单数据信息：', res);
                    // 发送网络请求
                    this.$uni({
                        url:"/login",
                        method:"post",
                        data:{
                            password: res.password,
                            phone: res.phone
                        }
                    }).then(res=>{
                        console.log("登录结果",res);
                        if(res.code==201){
                            uni.showToast({
                                title:res.msg,
                                icon:"error"
                            })
                        }else if(res.code==200 ){
							// 登录成功
                            uni.showToast({
                                title:res.msg,
                            })
                            // 存储token
                            localStorage.setItem("token",res.token)
							uni.switchTab({
								url:"/pages/home/home"
							})
                        }else {
                            uni.showToast({
                                title:res.msg,
                                icon:"error"
                            })
                        }
                    })
                }).catch(err => {
                    console.log('表单错误信息：', err);
                })
            },
            // 2.点击打开弹出层
            open() {
                this.$refs.popup.open('bottom')
            },
            // 3.触发注册的提交表单
            submitRegister() {
                this.$refs.register.validate().then(res => {
                    console.log('表单数据信息：', res);
                    this.regFunction(res.phone, /^1[3-9]\d{9}$/, "手机号").then(() => {
                        this.regFunction(res.password, /^[A-Za-z][A-Za-z\d]{5,15}$/, "密码").then(() => {
                            this.regFunction(res.nickName, /^[A-Za-z\u4e00-\u9fa5]{1,5}$/, "昵称")
                                .then(() => {
                                    console.log("您提交的数据都对", res);

                                    // 开始发送网络请求
                                    this.$uni({
                                        url:"/register",
                                        method:"post",
                                        data:{
                                            nickName:res.nickName,
                                            password:res.password,
                                            phone:res.phone
                                        }
                                    }).then(result=>{
                                        console.log("注册结果",result);
                                        if(result.code==102){
                                            // 已经注册
                                            uni.showToast({
                                                title:result.msg,
                                                icon:"error"
                                            })
                                        }else if(result.code==100){
                                            // 成功注册
                                            uni.showToast({
                                                title: result.msg
                                            });
                                            for(let k in this.registerData){
                                                this.registerData[k]=""
                                            }
                                            setTimeout(()=>{
                                                this.close()
                                            },1000)
                                            
                                        }else {
                                            // 失败注册
                                            uni.showToast({
                                                title:"注册失败",
                                                icon:"none"
                                            })
                                        }
                                    })
                                })
                        })
                    })

                }).catch(err => {
                    console.log('表单错误信息：', err);
                })
            },
            // 4.关闭弹窗
            close() {
                this.$refs.popup.close()
            },
            // 5.验证规格方法  str 要验证的数据  reg正则表达式  txt验证的对象（密码/手机号）
            regFunction(str, reg, txt) {
                // 判断是否通过验证
                let is = reg.test(str)
                // 标题
                let title = "您输入的" + txt + "不正确"
                return new Promise(reslove => {
                    if (!is) {
                        uni.showToast({
                            title,
                            icon: "error"
                        })
                    } else {
                        reslove()
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
page {
        height: 100%;

        .login {
            padding: 20rpx;
            background-color: #fff;
            height: 100%;
            box-sizing: border-box;

            // 头部开始
            .head {
                border-bottom: 2rpx solid #ddd;
                display: flex;
                align-items: center;

                image {
                    width: 80rpx;
                }

                .name {
                    flex: 1;
                    margin-left: 20rpx;
                    font-size: 32rpx;
                    font-weight: 700;
                    color: #666;
                }

                navigator {
                    color: #0c34ba;
                    font-weight: 700;
                }
            }

            // 头部结束

            // 欢迎开始
            .hello {
                margin-bottom: 60rpx;

                .name {
                    font-size: 64rpx;
                    font-weight: 700;
                    color: #666;
                    margin: 300rpx 0 40rpx;
                }

                .enname {
                    color: #666;
                }
            }

            // 欢迎结束

            // 登录表单开始
            .login-form {
                .forget {
                    color: #999;
                    margin: 20rpx 0;
                    text-align: right;
                }

                .btn {
                    width: 100%;
                    border-radius: 60rpx;
                    border: 2rpx solid #ccc;
                    line-height: 70rpx;
                    text-align: center;
                    margin-bottom: 50rpx;
                    color: #666;

                    &.btn1 {
                        background-color: #0c34ba;
                        color: #f4fff6;
                    }

                    &.btn2 {}
                }
            }

            // 登录表单结束

            // 弹窗开始
            .popup {
                .open {
                    height: 550rpx;
                    background-color: #fff;
                    padding: 20rpx;

                    .head {
                        display: flex;
                        justify-content: space-between;
                        border-bottom: none;
                        margin-bottom: 50rpx;

                        .txt {
                            font-size: 40rpx;
                            color: #666;
                        }
                    }
                }
            }

            // 弹窗结束
        }
    }
</style>