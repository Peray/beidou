<template>
	<div class="NavCompent">
		<el-row>
			<el-col :span="5">
				<div class="nav-logo">
					<img :src="logoImg">
				</div>
			</el-col>
			<el-col :span="14" :offset="1">
				<el-menu :default-active="activeIndex" 
				class="el-menu-demo" mode="horizontal" 
				background-color="#3D4751" 
				text-color="#fff" 
				active-text-color="#589BDD" 
				@select="handleSelect">

					<el-menu-item index="1" 
					@click="onClickMe">
						<router-link to="/index">
							<p>首页</p>
						</router-link>
					</el-menu-item>

					<el-menu-item index="2" :class="{active:2 == num}" 
					@mouseenter.native="show(2)" 
					@click="onClickMe">
						<router-link to="/product/47b2e865b8084ce9b18faddab4d6bd9d">
							<p>{{items[0].name}}</p>
						</router-link>
					</el-menu-item>

					<el-menu-item index="3" :class="{active:3 == num}" 
					@mouseenter.native="show(3)" 
					@click="onClickMe">
						<router-link to="/gis">
							<p>{{items[1].name}}</p>
						</router-link>
					</el-menu-item>

					<el-menu-item index="4" :class="{active:4 == num}" 
					@mouseenter.native="show(4)" 
					@click="onClickMe">
						<router-link to="/terminal">
							<p>{{items[2].name}}</p>
						</router-link>
					</el-menu-item>

					<el-menu-item index="5" :class="{active:5 == num}" 
					@mouseenter.native="show(5)" 
					@click="onClickMe">
						<router-link to="/solve/e134ae59ce9443cc841a612f19a2c175">
							<p>{{items[3].name}}</p>
						</router-link>
					</el-menu-item>

					<el-menu-item index="6" :class="{active:6 == num}" 
					@mouseenter.native="show(6)" 
					@click="onClickMe">
						<router-link to="/tech/24">
							<p>{{items[4].name}}</p>
						</router-link>
					</el-menu-item>

					<el-menu-item index="7" 
					@click="onClickMe">
						<router-link to="/adminindex">
							<p>控制台</p>
						</router-link>
					</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="4">
				<div v-if="logined" class="navLogin">
					<el-dropdown trigger="click" :hide-on-click="false" :show-timeout="0" :hide-timeout="0">
	                    <span class="el-dropdown-link">
	                        {{Username}}
	                        <i class="el-icon-arrow-down el-icon--right"></i>
	                    </span>
	                    <el-dropdown-menu slot="dropdown">
	                        <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
	                    </el-dropdown-menu>
	                </el-dropdown>
				</div>
				<div v-else class="navLogin">
					<el-button size="mini" round class="loginBtn" @click="login">登录</el-button>
					<el-button size="mini" class="regiBtn" @click="resign">注册</el-button>
				</div>
			</el-col>
		</el-row>
		<transition name="fade">
			<div class="mask" v-if='showdata' 
			@mouseenter="showdata=true" 
			@mouseleave="showdata=false" 
			:style="{height:num === 3 ? 0 : popu}">

				<el-row v-if="num === 2">
					<el-col :span="6">
						<div class="right">
							<span v-for="(item,index) in items[0].childMenus" 
							:class="{bgactive:selected==index}" 
							@mouseenter="tabchange(index)">
								{{item.name}}<b>></b>
							</span>
						</div>
					</el-col>
					<el-col :span="18">
						<div v-show="selected===0" @click="onClickMe">
							<router-link :to="{path:`/product/${sp.id}`}" 
							v-for="(sp,index) in items[0].childMenus[0].childMenus" 
							:key="index">
								<span>{{sp.name}}</span>
							</router-link>
						</div>
						<div v-show="selected===1" @click="onClickMe">
							<router-link :to="{path:`/product1/${sp.id}`}" 
							v-for="(sp,index) in items[0].childMenus[1].childMenus" 
							:key="index">
								<span>{{sp.name}}</span>
							</router-link>
						</div>
						<div v-show="selected===2" @click="onClickMe">

						</div>
					</el-col>
				</el-row>

				<el-row  v-else-if="num === 4">
					<el-col :span="6">
						<div class="right">
							<span v-for="(item,index) in items[2].childMenus" 
							:class="{bgactive:selected==index}" 
							@mouseenter="tabchange(index)">
								{{item.name}}<b>></b>
							</span>
						</div>
					</el-col>
					<el-col :span="18">
						<div v-show="selected===0" @click="onClickMe">
							<router-link :to="{path:`/terminal`}" 
							v-for="(sp,index) in items[2].childMenus[0].childMenus" 
							:key="index">
								<span @click="roll(sp.id)">{{sp.name}}</span>
							</router-link>
						</div>
						<div v-show="selected===1" @click="onClickMe">
							<router-link :to="{path:`/terminal`}" 
							v-for="(sp,index) in items[2].childMenus[1].childMenus" 
							:key="index">
								<span @click="roll(sp.id)">{{sp.name}}</span>
							</router-link>
						</div>
					</el-col>
				</el-row>

				<el-row  v-else-if="num === 5">
					<el-col :span="6">
						<div class="right">
							<span v-for="(item,index) in items[3].childMenus" 
							:class="{bgactive:selected==index}" 
							@mouseenter="tabchange(index)">
								{{item.name}}<b>></b>
							</span>
						</div>
					</el-col>
					<el-col :span="18">
						<div v-show="selected===0" 
						@click="onClickMe">
							<router-link 
							:to="{path:`/solve/${sp.id}`}" 
							v-for="(sp,index) in items[3].childMenus[0].childMenus" 
							:key="index">
								<span>{{sp.name}}</span>
							</router-link>
						</div>
						<div v-show="selected===1" @click="onClickMe">

						</div>
					</el-col>
				</el-row>

				<el-row  v-else-if="num === 6">
					<el-col :span="6">
						<div class="right">
							<span v-for="(item,index) in items[4].childMenus" 
							:class="{bgactive:selected==index}" 
							@mouseenter="tabchange(index)">
								{{item.name}}<b>></b>
							</span>
						</div>
					</el-col>
					<el-col :span="18">
						<div v-show="selected===0" @click="onClickMe">
							<router-link :to="{path:`/tech/${sp.id}`}" 
							v-for="(sp,index) in items[4].childMenus[0].childMenus" 
							:key="index">
								<span>{{sp.name}}</span>
							</router-link>
						</div>
						<div v-show="selected===1" @click="onClickMe">

						</div>
					</el-col>
				</el-row>

				<el-row  v-else-if="num === 7">
					
				</el-row>
			</div>
		</transition>
	</div>
</template>

<script>

import $ from 'jquery'


	export default {
		name: 'NavCompent',
		data () {
			return {
				logoImg:require('@/assets/img/logo.png'),
				selected:0,
        		num:1,
        		showdata:false,
        		items:[
        			{
        				name:''
        			},
        			{
        				name:''
        			},
        			{
        				name:''
        			},
        			{
        				name:''
        			},
        			{
        				name:''
        			}
        		],
        		menuIdtoName: {}
			}
		},
		mounted: function () {
			this.$http.get(config.menuUrl,{params:{target:1}}).then(response => {
				if(response.data.length != 0){
					this.items = response.data;
					this.getMenuIdtoName(this.items);

				}
			}, response => {
				console.log(response.status);
			});
		},
		methods:{
			getMenuIdtoName(items) {
				items.forEach((item) => {
					this.menuIdtoName[item.id] = item.name;
					if(item.childMenus) {
						this.getMenuIdtoName(item.childMenus);
						this.$store.commit('setMenuIdtoName',this.menuIdtoName);
					}
				})
			},
			show(index) {
				this.num = index;
				this.$set(this,'showdata',true)
			},
			handleSelect(key, keyPath) {
		        $(".el-menu--horizontal>li").css("border-bottom","0")
			},
			login() {
				this.$router.push({path:'/login'})
			},
			resign(){
				this.$router.push({path:'/resign'})
			},
			loginOut(){
				this.$http.get(config.logout).then(response => {
					sessionStorage.removeItem('user')
					this.$store.dispatch('logout')
					this.$router.push({path:'/login'})
				}, response => {
					console.log(response);
				});
			},
			onClickMe() {
	            this.$store.dispatch('increase',this.num);
	            this.showdata = false
	        },
	        roll(id) {
	        	this.$store.dispatch('roll',id);
	        },
	        tabchange(index) {
	        	this.selected = index;
	        }
		},
		computed:{
			activeIndex() {
				return this.$store.state.activeIndex;
			},
			popu() {
				return this.$store.state.popu;
			},
			logined(){
				return this.$store.state.logined;
			},
			Username(){
				return this.$store.state.LoginedUser.username
			}
		}
	}
</script>

<style lang="scss">
	.NavCompent {
		background-color: #3D4751;
		.nav-logo,
		.navLogin {
			height: 70px;
			line-height: 70px;
			img {
				vertical-align: middle;
			}
			.loginBtn{
				border: 1px solid #fff;
				padding: 7px 20px;
				width:80px;
				height:30px;
				background-color: #3D4751;
				color: #fff;
			}
			.regiBtn{
				border: 0;
				width:80px;
				height:30px;
				background-color: #3D4751;
				color: #fff;
				&:hover {
					background-color: #3D4751;
				}
			}
		}
		.el-dropdown{
			span{
				color:#fff;
			}
		}
		.el-menu--horizontal{
			border-bottom: 0;
			.el-menu-item{
				height: 70px;
				line-height: 70px;
				width: 14.28%;
				&.is-active {
					font-weight: 700;
				}
			}
		}
		.mask {
			position: absolute;
			top:70px;
			left:0;
			width:100%;
			z-index:3;
			opacity:1;
			background-color:rgba(49,57,65,.9);
			.el-row {
				height:100%;
				.el-col-6 {
					height:100%;
					border-right:1px solid #909399;
					.right {
						float:right;
						span {
							display:block;
							width:184px;
							height:44px;
							line-height:44px;
							font-size:14px;
							color:#fff;
							cursor:pointer;
							b {
								float:right;
								padding-right:22px;
							}
							&.bgactive {
								background-color:#3D4751;
							}
							&:nth-child(1) {
								margin-top:20px;
							}
						}
					}
				}
				.el-col-18 {
					div {
						text-align:left;
						margin-top:20px;
						span {
							display:inline-block;
							width:300px;
							height:44px;
							line-height:44px;
							font-size:14px;
							color:#fff;
							cursor:pointer;
							padding-left:20px;
							&:hover {
								background-color:#3D4751;
							}
							&:nth-child(1) {
								margin-left:28px;
							}
							&:nth-child(2) {
								margin-left:42px;
							}
						}
					}
				}
			}

		}
		.fade-enter-active, .fade-leave-active {
            transition: opacity .5s;
        }

        .fade-enter, .fade-leave-active {
            opacity: 0;
        }

	}
	.el-menu--horizontal>.el-menu-item.is-active, 
	.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
		border-bottom:0!important;
	}
</style>