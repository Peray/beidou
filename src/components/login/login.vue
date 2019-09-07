<template>
	<div class="login">
		<div class="main">
			<header>
				<img :src="login.img">
					<span>{{ login.title}}</span>
			</header>
			<div class="tab">
				<div class="tab-title clearfix">
					<span :class="{active:index == login.num}" 
					v-for="(item,index) in login.items" @click="tab(index)">
						<a>{{item}}</a>
					</span>
				</div>
				<div class="tab-content">
					<div v-show="login.num === 0">
						<el-form :model="ruleForm1" 
						status-icon :rules="rules1" 
						ref="ruleForm1" class="demo-ruleForm" 
						:label-position="labelPosition">
							<el-form-item prop="username">
								<el-input type="text"
								name="username" 
								v-model="ruleForm1.username" 
								auto-complete="off" 
								placeholder="手机号码/邮箱">
								</el-input>
							</el-form-item>
							<el-form-item prop="password">
								<el-input type="password" 
								name="password"
								v-model="ruleForm1.password" 
								auto-complete="off" 
								placeholder="密码"
								@keyup.enter.native="submitForm('ruleForm1')">
								</el-input>
							</el-form-item>
							<el-form-item prop="validateCode" v-if="errorTimes >= 3">
								<el-input type="text"
								placeholder="验证码"
								v-model="ruleForm1.validateCode"
								auto-complete="off"
								>
								<img :src="validateImg" alt="点击切换" slot="suffix" style="padding:5px;cursor:pointer;" @click="requestValidateImg()"></img>
								</el-input>
								<!-- <img :src="validateImg" alt="点击切换" class="btn-right" style="cursor:pointer;" @click="requestValidateImg()"></img> -->
							</el-form-item>
							<el-form-item>
								<el-button type="primary" 
								@click="submitForm('ruleForm1')">登录</el-button>
							</el-form-item>
						</el-form>
					</div>
					<div v-show="login.num === 1">
						<el-form :model="ruleForm2" 
						status-icon :rules="rules2" 
						ref="ruleForm2" class="demo-ruleForm" 
						:label-position="labelPosition">
							<el-form-item prop="tel">
								<el-input type="text" 
								v-model="ruleForm2.tel" 
								auto-complete="off" 
								placeholder="手机号码">
								</el-input>
							</el-form-item>
							<el-form-item>
							<el-input type= "text" auto-complete="false" placeholder="请输入验证码">
								<img :src="validateImg" slot="suffix" style="padding:5px;cursor:pointer"></img>
							</el-input>
							</el-form-item>
							<!-- <div id="drag"></div> -->
							<el-form-item prop="code">
								<el-input type="text" class="input-left" 
								v-model="ruleForm2.code" 
								auto-complete="off" 
								placeholder="验证码">
								</el-input>
								<el-button type="primary" class="btn-right" disabled
								@click="">发送验证码</el-button>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" 
								@click="submitForm('ruleForm2')">登录</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
				<p class="forget clearfix">
					<a @click="forget">忘记密码</a>
					<a @click="resign">立即注册</a>
				</p>
				<div class="wxlogin">
					<p class="wx-text">第三方登录</p>
					<p class="wx-img">
						<img @mouseenter="login.show=true" @mouseleave="login.show=false" :src="login.show ? login.wxImghover : login.wxImg">
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import { mapActions } from 'vuex'
 //    import { USER_SIGNIN } from '@/store/user'
	import $ from 'jquery'
	import '@/assets/css/drag.css'
	import '@/assets/js/drag.js'
	import {isvalidPhone,isvalidEmail} from '@/assets/js/validate/validate.js'
	export default {
		data() {
			var validateUsername = (rule, value, callback) => {
				if (value === '' || value == undefined) {
					callback(new Error('请输入手机号码/邮箱'));
				}else{
					if(!isvalidPhone(value) && !isvalidEmail(value)){
						callback(new Error('请输入正确的手机号码/邮箱'));
					}
					callback()
				}
			};
			var validatePassword = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				}else{
					callback();
				}
			};
			var validateTel = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入手机号码'));
				}else{
					if(!isvalidPhone(value)){
						callback(new Error('请输入正确的手机号码'));
					}
					callback()
				}
			};
			var validateCode = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入验证码'));
				}else{
					if (this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};
			return {
				btn:false,
				hides:false,
				validateImg:'',
				errorTimes:0,
				login:{
					img:require('@/assets/img/resignlogo.png'),
					title:'通航北斗门户',
					num:0,
					show:false,
					items:['账号登录','短信登录'],
					wxImg:require('@/assets/img/wx_normal.png'),
					wxImghover:require('@/assets/img/wx_hover.png')
				},
				labelPosition:'top',
				ruleForm1: {
					username: '',
					password: '',
					validateCode: ''
				},
				rules1: {
					username: [
						{ validator: validateUsername, trigger: 'blur' }
					],
					password: [
						{ validator: validatePassword, trigger: 'blur' }
					]
				},
				ruleForm2: {
					tel: '',
					code: ''
				},
				rules2: {
					tel: [
						{ validator: validateTel, trigger: 'blur' }
					],
					code: [
						{ validator: validateCode, trigger: 'blur' }
					]
				}
			}
		},
		mounted: function (x){
			$('#drag').drag();
			if($(".drag_text").text() == "验证成功"){
				$(".btn-right").removeAttr('disabled');
			}
			this.$store.dispatch('showup',this.hides);
			this.requestValidateImg();
		},
		methods:{
			tab(index) {
				this.login.num = index
			},
			requestValidateImg:function(){
				this.validateImg = config.validateCodeUrl + "?r="+Math.random();
			},
			// ...mapActions([USER_SIGNIN]),
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http.post(config.login,{
							'username':this.ruleForm1.username,
							'password':this.ruleForm1.password,
							'validateCode':this.ruleForm1.validateCode
						},{emulateJSON:true}).then(response => {
							if(response.bodyText == "登录成功"){
								this.$message.success(response.bodyText);
								this.$http.post(config.userdetails,{emulateJSON:true}).then(response => {
									let user = response.body;
									sessionStorage.setItem('user',JSON.stringify(user))
									this.$store.dispatch('login')
									setTimeout(() => {
										this.$router.push({path:global.jumpPage})
									}, 500);
								}, response => {
									console.log(response.status);	
								});
							}else {
								this.$message.error(response.bodyText);
								this.requestValidateImg();
								this.errorTimes++;
							}
						}, response => {
							console.log(response.status);	
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resign(){
				this.$router.push({path:'/resign'});
			},
			forget(){
				this.$router.push({path:'/forget'});
			},
			submit: function() {  
                console.log(this.ruleForm1);  
            }
		}
	}
</script>
		<!-- min-height:974px; -->

<style lang="scss">
	.login {
		background:url("~@/assets/img/loginbg.png") center center;
		background-size:cover;
		width:100%;
		min-width:1200px;
		min-height:600px;
		height:100%;
		overflow:hidden;
		.main{
			width:400px;
			padding:50px 0;
			margin:0 auto;
			header {
				padding: 30px 0;
				img{
					vertical-align: middle;
				}
				span{
					font-size:20px;
					color:#fff;
					font-weight:bold;
				}
			}
			.tab {
				background-color:#fff;
			}
			.tab-title {
				span {
					display:inline-block;
					width:50%;
					float:left;
					padding:20px 0;
					cursor:pointer;
					&.active{
						a{
							border-bottom:2px solid #589bdd;
							color:#589bdd;
						}
					}
					a{
						display:inline-block;
						font-size:16px;
						color:#666;
						border-bottom:2px solid #fff;
						padding-bottom:12px;
					}
				}
				&.clearfix:after {
					display: table;
					content: " ";
					clear: both;
				}
				&.clearfix{
					*zoom: 1;
				}
			}
			.tab-content {
				padding:30px 30px 0;
				.input-left {
					width:50%;
					float:left;
				}
				.btn-right {
					width:50%;
					float:right;
				}
			}
			.el-form-item:last-child{
				margin-bottom:12px;
			}
			.forget{
				padding: 0 30px;
				margin-bottom:50px;
				&>a:nth-child(1){
					float:left;
				}
				&>a:nth-child(2){
					float:right;
				}
				a{
					font-size:12px;
					color:#589bdd;
					cursor:pointer;
				}
				&.clearfix:after {
					display: table;
					content: " ";
					clear: both;
				}
				&.clearfix{
					*zoom: 1;
				}
			}
			.wxlogin {
				padding-bottom:30px;
				.wx-text{
					font-size:14px;
					color:#666;
					padding-bottom:20px;
				}
				.wx-img{
					cursor:pointer;
				}
			}
		}
		.el-input__inner{
			border-radius:0;
			height:42px;
			line-height:42px;
			border:1px solid #d1d1d1;
			color:#333;
		}
		.el-button {
			border-radius:0;
			width:100%;
			height:42px;
		}
		.el-form-item.is-error .el-input__inner, 
		.el-form-item.is-error .el-input__inner:focus, 
		.el-form-item.is-error .el-textarea__inner, 
		.el-form-item.is-error .el-textarea__inner:focus, 
		.el-message-box__input input.invalid, 
		.el-message-box__input input.invalid:focus {
			border-color: #eb6d6d;
		}
		.el-form-item.is-success .el-input__inner, 
		.el-form-item.is-success .el-input__inner:focus, 
		.el-form-item.is-success .el-textarea__inner, 
		.el-form-item.is-success .el-textarea__inner:focus{
			border-color: #7ac23c;
		}
	}
	
</style>
