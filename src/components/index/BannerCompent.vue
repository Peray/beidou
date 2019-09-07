<template>
	<div class="BannerCompent">
		<el-carousel :interval="5000">
			<el-carousel-item v-for="(item,index) in ImgItems" :key="index">
				<div class="popus"></div>
				<div class="banner">
					<img :src="imgsrc+item.newsPath">
				</div>
				<div class="bannerText">
					<p>{{item.newsTitle}}</p>
					<p>{{item.newsContent}}</p>
				</div>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	export default {
		name: 'BannerCompent',
		data () {
			return {
				imgsrc:'',
				ImgItems:[]
			}
		},
		mounted: function () {
			this.$http.get(config.bannerUrl).then(response => {
				this.ImgItems = response.data
			}, response => {
				console.log(response.status);
			});
			// this.$store.commit('show',this.hides);
			this.imgsrc = config.imgsrc
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.el-main{
	padding: 0;
	.BannerCompent {
		.el-carousel {
			background-color:#1A2739;
			height:500px;
			.el-carousel__container{
				height:100%;
				.el-carousel__arrow {
					background-color: rgba(255, 255, 255, 0.3);
				}
				.popus{
					position:absolute;
					top:0;
					left:0;
					width:100%;
					height:100%;
					z-index:1;
				}
				.banner{
					text-align: right;
					height:100%;
					img{
						height: 500px;
					}
				}
				.bannerText{
					position: absolute;
					top: 190px;
					left: 100px;
					color: #fff;
					&>p:nth-child(1) {
						font-size: 33px;
						margin: 10px;
					}
				}
			}
			.el-carousel__indicators {
				bottom:20px;
				.el-carousel__indicator {
					padding: 12px 7px;
					.el-carousel__button {
						width: 14px;
						height: 14px;
						border-radius: 50%;
					}
				}
			}
		}
	}
}
</style>