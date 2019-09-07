<template>
	<div class="ServiceCompent">
		<h3>{{serviceTitle}}</h3>
		<el-row :gutter="20">
			<el-col :span="6" v-for="(item, index) in items" :key="index" :offset="index > 0 ? .3 : 0">
				<el-card :body-style="{ padding: '0px' }">
					<div @mouseenter="showActive(index,true)" @mouseleave="showActive(index,false)">
						<img :src="item.active == 0 ? imgsrc+item.cpIco.split(';')[1] : imgsrc+item.cpIco.split(';')[0]" class="image">
						<p class="CardTitle">{{ item.cpName }}</p>
						<p class="CardContent">{{ item.cpMs }}</p>
						<!-- <p class="CardMore">
							<router-link :to="{path:`/product/${item.menuId}`}">了解更多&nbsp;&nbsp;>></router-link>
						</p> -->
						<p class="CardBtn">
							<router-link :to="{path:`/product/${item.menuId}`}">
								<el-button type="primary" size="small">查看详情</el-button>
							</router-link>
						</p>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name:'ServiceCompent',
		data() {
			return {
				serviceTitle:'通航服务推荐',
				imgsrc:'',
				items:[]
			}
		},
		mounted: function () {
			this.$http.get(config.serviceList).then(response => {
				this.items = response.data;
			}, response => {
				console.log(response.status);
			});

			this.imgsrc = config.imgsrc
		},
		methods:{
			showActive: function(index,bool) {
				bool === true ? this.$set(this.items[index],'active',0) : this.$set(this.items[index],'active',1)
			}
		}
	}
</script>

<style scoped>
	.ServiceCompent {
		color: #000;
		padding: 0 0 10px;
		height: 625px;
	}
	.ServiceCompent>h3{
		font-size: 26px;
		font-weight: normal;
		color: #404040;
		padding: 40px 0;
	}
	.el-row{
		width: 1200px;
		margin: 0 auto!important;
	}
	.el-card {
		border-radius: 0;
		box-shadow: 0px 0px 12px 5px #ccc;
		transition: all .5s ease;
	}
	.el-card:hover {
		transform: scale(1.1);
		box-shadow: 0px 0px 15px 5px #ccc;
	}
	.CardTitle{
		font-size: 20px;
		color: #2d2d2d;
	}
	.CardContent {
		padding: 30px 30px 10px;
		font-size: 12px;
		word-break:break-all;
		text-align: left;
		line-height: 2;
		/*height: 80px;*/
		color: #838383;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}
	.CardMore {
		text-align: left;
		padding: 0 30px;
	}
	.CardMore>a {
		font-size: 12px;
		color: #65AAE2;
		font-weight: 700;
	}
	.CardBtn{
		margin: 30px 0 40px 0;
	}
	.CardBtn>button {
		width: 120px;
		height: 40px;
		border-radius: 0;
		background-color: #65AAE2;
	}
</style>