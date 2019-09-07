<template>
	<div class="ContactCompent">
		<el-row>
			<el-col :span="13">
				<h3><img :src="Contact.img">{{Contact.title}}</h3>
				<div class="ContactCotent" v-html="Contact.cotent"></div>
			</el-col>
			<el-col :span="7" :offset="4">
				<h4>{{Contact.us}}</h4>
				<p>{{Contact.affairs}}</p>
				<p>{{Contact.zipcode}}</p>
				<p>{{Contact.recruit}}</p>
				<p>{{Contact.address}}</p>
			</el-col>
		</el-row>
		<footer>{{Contact.record}}</footer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				Contact:{
					img:require('@/assets/img/footlogo.png'),
					title:'中国民航技术研究院',
					cotent:`<p>中国民航科学技术研究院是民航局直属事业单位，是国家科技部批准的综合性科研机构，其前身为成立于1986年10月的北京航空科学技术研究所，2011年1月10日，航科院成立大会在人民大会堂举行。</p>
					<p>航科院主要从事民航安全和发展的科学技术研究，为民航局的决策和监督管理工作提供技术。</p>`,
					us:'联系我们',
					affairs:'商务合作：400-6121-1232',
					zipcode:`邮　　编：100028`,
					recruit:'人才招聘：122@pppi@.com',
					address:`地　　址：北京市朝阳区西坝河北里甲24号`,
					record:'2003-2011 中国民航科学技术研究院 版权所有 京ICP备05040221号'
				}
			}
		}
	}
</script>

<style lang="scss">
	.ContactCompent {
		text-align: left;
		color:#fff;
		background-color: #495560;
		.el-row {
			padding: 0 140px 40px;
			margin:0!important;
		}
		h3 {
			height:40px;
			line-height:40px;
			margin: 50px 0 38px;
			font-size: 24px;
			img {
				vertical-align: middle;
			}
		}
		.ContactCotent {
			p{
				line-height:2;
				font-size:14px;
			}
		}
		h4 {
			height:40px;
			line-height:40px;
			margin: 50px 0 38px;
			&~p{
				line-height:2;
				font-size:14px;
			}
		}
		footer {
			text-align:center;
			line-height: 54px;
			border-top: 1px solid #3B454E;
			font-size:14px;
			margin:0 80px 0;
		}
	}
</style>