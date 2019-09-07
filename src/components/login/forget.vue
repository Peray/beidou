<template>
	<div class="resign">
		<header>
			<el-row>
				<el-col :span="12">
					<img :src="forget.img">
					<span>{{ forget.title}}</span>
				</el-col>
				<el-col :span="12">
					已有账号，
					<a @click="login">马上登录</a>
					&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
					<a @click="backin">返回通航北斗门户网</a>
				</el-col>
			</el-row>
		</header>
		<div class="main">
			<div class="tab">
				<div class="tab-title clearfix">
					<span :class="{active:index == forget.num}" 
					v-for="(item,index) in forget.items" @click="tab(index)">
						<a>{{item}}</a>
					</span>
				</div>
				<div class="tab-content">
					<div v-show="forget.num === 0">
						<el-form :model="ruleForm1" 
						status-icon :rules="rules1" 
						ref="ruleForm1" class="demo-ruleForm" 
						:label-position="labelPosition">
							<el-form-item prop="account">
								<el-input type="text" 
								v-model="ruleForm1.account" 
								auto-complete="off" 
								placeholder="请输入手机号码/邮箱">
								</el-input>
							</el-form-item>
							<el-form-item prop="code">
								<el-input type="text" class="input-left" 
								v-model="ruleForm1.code" 
								auto-complete="off" 
								placeholder="验证码">
								</el-input>
								<el-button type="primary" class="btn-right" disabled
								@click="">发送验证码</el-button>
							</el-form-item>
							<el-form-item prop="pass">
								<el-input type="password" 
								v-model="ruleForm1.pass" 
								auto-complete="off" 
								placeholder="请输入新密码">
								</el-input>
							</el-form-item>
							<el-form-item prop="passConfirm">
								<el-input type="password" v-model="ruleForm1.passConfirm" auto-complete="off"
								placeholder="请再次输入新密码"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" 
								@click="submitForm('ruleForm1')">提交</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import '@/assets/css/drag.css'
	import '@/assets/js/drag.js'
	import {isvalidPhone,isvalidEmail,isvalidPassword} from '@/assets/js/validate/validate.js'
	export default {
		data() {
			//个人
			var validate1Account = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入手机号码/邮箱'));
				}else{
					if(!isvalidPhone(value) && !isvalidEmail(value)){
						callback(new Error('请输入正确的手机号码/邮箱'));
					}
					callback();
				}
			};
			var validate1Code = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入验证码'));
				} else {
					if (this.ruleForm1.checkPass !== '') {
						this.$refs.ruleForm1.validateField('checkPass');
					}
					callback();
				}
			};
			var validate1Pass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(!isvalidPassword(value)){
						callback(new Error('请输入以字母开头，只能包含字母、数字和下划线的6~18密码'));
					}
					callback();
				}
			};

			var validate1ConfirmPass = (rule , value , callback) =>{
				if(value === ''){
					callback(new Error('请再次输入密码'));
				}else {
					if(this.ruleForm1.pass != value){
						callback(new Error('两次输入不一致！'));
					}
					callback();
				}
			};
			//企业
			var validate2Name = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入企业名称'));
				} else {
					// if (this.ruleForm2.name !== '') {
					// 	this.$refs.ruleForm1.validateField('name');
					// }
					callback();
				}
			};
			var validate2Tel = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入手机号码/邮箱'));
				}else{
					if(!isvalidPhone(value) && !isvalidEmail(value)){
						callback(new Error('请输入正确的手机号码/邮箱'));
					}
					callback();
				}
			};
			var validate2Code = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入验证码'));
				} else {
					// if (this.ruleForm2.code !== '') {
					// 	this.$refs.ruleForm2.validateField('code');
					// }
					callback();
				}
			};
			var validate2Pass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(!isvalidPassword(value)){
						callback(new Error('请输入以字母开头，只能包含字母、数字和下划线的6~18密码'));
					}
					callback();
				}
			};
			return {
				hides:false,
				forget:{
					img:require('@/assets/img/resignlogo.png'),
					title:'通航北斗门户',
					num:0,
					show:false,
					items:['忘记密码']
				},
				labelPosition:'top',
				ruleForm1: {
					account: '',
					code:'',
					pass: '',
					passConfirm: ''
				},
				rules1: {
					account: [
						{ validator: validate1Account, trigger: 'blur' }
					],
					code: [
						{ validator: validate1Code, trigger: 'blur' }
					],
					pass: [
						{ validator: validate1Pass, trigger: 'blur' }
					],
					passConfirm: [
						{ validator: validate1ConfirmPass, trigger: 'blur' }
					]
				},
				ruleForm2: {
					name: '',
					province :'',
					city:'',
					tel: '',
					code: '',
					pass: ''
				},
				rules2: {
					name: [
						{ validator: validate2Name, trigger: 'blur' }
					],
					province: [
						{ required: true, message: '请选择省份', trigger: 'change' }
					],
					city: [
						{ required: true, message: '请选择城市', trigger: 'change' }
					],
					tel: [
						{ validator: validate2Tel, trigger: 'blur' }
					],
					code: [
						{ validator: validate2Code, trigger: 'blur' }
					],
					pass: [
						{ validator: validate2Pass, trigger: 'blur' }
					]
				}
			}
		},
		mounted: function (x){
			this.$store.dispatch('showup',this.hides);
		},
		methods:{
			login(){
				this.$router.push({path:'/login'})
			},
			backin(){
				this.$router.push({path:'/index'})
			},
			tab(index) {
				this.forget.num = index
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.resign {
		background:url("~@/assets/img/loginbg.png") center center;
		background-size:cover;
		width:100%;
		min-width:1200px;
		min-height:600px;
		height:100%;
		overflow:hidden;
		header{
			height:70px;
			line-height:70px;
			color:#666;
			background-color:#fff;
			font-size:12px;
			img {
				vertical-align: middle;
			}
			span{
				font-size:20px;
				font-weight:bold;
			}
			a{
				color:#589bdd;
				cursor:pointer;
			}
		}
		.main{
			width:400px;
			padding:50px 0;
			margin:0 auto;
			.tab {
				background-color:#fff;
			}
			.tab-title {
				span {
					display:inline-block;
					width:100%;
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
				padding:30px;
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
				text-align:left;
				padding: 0 30px 30px;
				font-size:12px;
				a{
					color:#589bdd;
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

