<template>
	<div class='CooperativeCompent'>
		<h3>{{CooperativeTitle}}</h3>
		<span v-show="false">{{facts}}</span>
		<el-carousel height="360px" :initial-index='active' @change="a">
			<el-carousel-item v-for="(item,index) in sizes" :key="index">
				<el-row class="coopList">
					<el-col :span="6" v-for="(item,index) in facts" :key="index">
						<a :href="item.hbLink" target="_blank" class="coop">
							<img :src="imgsrc+item.hbLogo">
							<span>{{ item.hbName }}</span>
						</a>
					</el-col>
				</el-row>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				CooperativeTitle:'合作伙伴',
				active:0,
				imgsrc:'',
				sizes:'',
				pageSize:8,
				items:[]
			}
		},
		mounted: function () {
			//'./static/hzhb.json'
			// config.cooUrl
			this.$http.get(config.cooUrl).then(response => {
				this.items = response.data
			}, response => {
				console.log(response.status);
			});
			this.imgsrc = config.imgsrc
		},
		methods:{
			a(index){
				this.active = index;
			}
		},
		computed:{
			facts(){
				var page = []
				var _this=this;
				if(_this.items){                             
					_this.sizes=Math.ceil(_this.items.length/_this.pageSize);
					for(var i=(_this.active-0)*_this.pageSize;i<(_this.active+1)*_this.pageSize;i++){
						if(_this.items[i]){                                 
							page.push(_this.items[i]);
						};
					};
				};
				return page;
			}
		}
	}
</script>

<style lang="scss">
	$primary-color: #000;
	.CooperativeCompent {
		color: $primary-color;
		h3 {
			font-size: 26px;
			font-weight: normal;
			color: #404040;
			padding: 50px 0 30px;
		}
		.el-carousel__button {
			border: 1px solid #495560;
			width: 14px;
			height: 14px;
			border-radius: 50%;
			background-color: #495560;
		}
		.coop {
			display:block;
			width:270px;
			height:90px;
			line-height:90px;
			border:1px solid #ccc;
			margin:20px auto;
			img {
				display:inline-block;
				vertical-align: middle;
			}
			span {
				font-size: 21px;
			}
		}
		.el-carousel__indicators {
			bottom: 40px;
			.el-carousel__arrow {
				display:none;
			}
		}
	}
</style>