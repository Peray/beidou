<template>
    <div class="navigationTerminal">
        <div class="banner">
        	<img :src="bannerSrc">
        </div>
        <div class="container">
            <div v-if="renderRedy">
                 <div class="ground" v-for="itemObj in renderItemArr" :id="itemObj.menuId">
                <h3>{{itemObj.name}}</h3>
                <el-row :gutter="27">
                    <el-col :span="8" v-for="(item,index) in itemObj.list" :key="index">
                        <router-link :to="{path:`/navigation/${item.yjId}`}">
                            <img :src="imgsrc+item.yjImg">
                            <h4>{{item.yjName}}</h4>
                            <p>{{item.yjMs}}</p>
                            <strong>{{item.yjPrice | rmb}}</strong>
                        </router-link>
                    </el-col>
                </el-row>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'navigationTerminal',
    data () {
        return {
            hides:true,
            bannerSrc:require('@/assets/img/terminalBanner.png'),
            imgsrc:'',
            items:[],
            renderItemObj: {},
            renderItemArr: [],
            renderRedy: false,
        }
    },
    mounted: function () {
        this.$store.dispatch('showup',this.hides);
        this.$http.get(config.hardUrl).then(response => {
            this.items = response.data
            this.getRenderItemObj();
        }, response => {
            console.log(response.status);
        });
        this.imgsrc = config.imgsrc

        // let rollid = this.rollid;
        // let scrollTop = $(`#${rollid}`).offset().top;
        // $('html, body').animate({scrollTop: scrollTop}, 400);
    },
    methods:{
        getRenderItemObj() {
            this.items.forEach((item) => {
                if(!this.renderItemObj[item.menuId]) {
                    this.renderItemObj[item.menuId] = {
                        name: '',
                        menuId: item.menuId,
                        list: []
                    }
                }
                this.renderItemObj[item.menuId].list.push(item);
                this.renderItemObj[item.menuId].name = this.menuIdtoName[item.menuId];
                this.renderRedy = true;
            })
            for(var key in this.renderItemObj) {
                this.renderItemArr.push(this.renderItemObj[key])
            }
        }
    },
    computed:{
        rollid() {
            return this.$store.state.rollid;
        },
        menuIdtoName() {
            return this.$store.state.menuIdtoName;
        }
    },
    watch:{
        rollid:function(id){
            let scrollTop = $(`#${id}`).offset().top;
            $('html, body').animate({scrollTop: scrollTop}, 400);
        },
        '$store.state.menuIdtoName'(menuIdtoName) {
             this.items.forEach((item) => {
                this.renderItemObj[item.menuId].name = menuIdtoName[item.menuId];
                this.renderItemArr=[];
                for(var key in this.renderItemObj) {
                    this.renderItemArr.push(this.renderItemObj[key])
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .navigationTerminal {
		&>.banner {
			height:350px;
			text-align:center;
            img{
                width:100%;
                height:100%;
            }
		}
		&>.container {
            width:1200px;
            margin: 0 auto 40px;
			.ground {
				h3 {
					padding:40px 0;
					font-size:24px;
					color:#333;
					font-weight:normal;
					text-align:left;
				}
				.el-row {
					.el-col {
						transition:all .5s ease;
						&:hover {
							box-shadow: 0 15px 30px #999;
							transform:translateY(-10px);

						}
						img {
							width:100%;
							height:300px;
						}
						h4 {
							font-size:16px;
							color:#333;
							margin:5px 0;
						}
						p{
							font-size:14px;
							color:#999;
							margin:5px 0;
						}
						strong {
							font-size:18px;
							color:#589bdd;
							padding:50px 0 70px;
							display:block;
						}
					}
				}
			}
		}
    }
</style>