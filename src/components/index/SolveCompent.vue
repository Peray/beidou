<template>
	<div class='SolveCompent'>
		<h3>{{solveTitle}}</h3>
		<el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick">
			<el-tab-pane v-for="(item, index) in items" :key="item.faId" :label="item.faName" :name="item.faId.toString()">
				<router-link :to="{path:`/solve/${item.menuId}`}">
					<div class="solve">
						<p class="solveTitle">{{ item.faName }}</p>
						<p class="solveContent">{{ item.faContent }}</p>
					</div>
				</router-link>
				<img :src="imgsrc+item.faIco">
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				solveTitle:'专业解决方案',
				activeName: '1',
				imgsrc:'',
				items:[]
			}
		},
		mounted: function () {
			this.$http.get(config.slovemenuUrl).then(response => {
				this.items = response.data
			}, response => {
				console.log(response.status);
			});
			this.imgsrc = config.imgsrc
		},
		methods:{
			handleClick(tab, event) {
				// console.log(tab, event);
			}
		}
	}
</script>

<style lang="scss">
	$primary-color: #000;
	.SolveCompent {
		color: $primary-color;
		h3 {
			font-size: 26px;
			font-weight: normal;
			color: #404040;
			padding: 50px 0;
		}
		.el-tabs {
			height: 710px;
			background-color: #68ADE5;
			text-align: right;
			.el-tabs__header {
				background-color: #495560;
				.el-tabs__nav-wrap{
					&:after {
						width:0;
					}
					padding-top: 70px;
					.el-tabs__active-bar{
						background-color: #68ADE5;
						right:1px;
						width:5px;
						&::after {
							content:'';
							width: 50px!important;
							height: 50px!important;
							transform: rotate(45deg)!important;
						}
					}
					.el-tabs__item{
						width: 260px;
						height: 70px;
						line-height: 70px;
						text-align: center;
						color: #fff;
						font-size: 16px;
						&:hover {
							color: #68ADE5;
						}
					}
				}
			}
			.el-tabs__content {
				background-color: #68ADE5;
				.el-tab-pane {
					text-align:right;
					.solve {
						position:absolute;
						left: 50px;
						top:90px;
						color:#fff;
						text-align:left;
						width: 500px;
						cursor:pointer;
						.solveTitle {
							font-size:22px;
						}
						.solveContent {
							margin-top:50px;
							line-height:2;
						}
					}
					img{
						margin:170px 100px 0 0;
					}
				}
			}
		}
		
	}

</style>