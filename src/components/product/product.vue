<template>
    <div class="product">
        <div class="producthead">
            <div class="productImg">
                <img :src="imgsrc+item[0].cpBanner">
            </div>
            <div class="productText">
                <h3>{{item[0].cpName}}</h3>
                <p>{{item[0].cpJs}}</p>
                <el-button type="primary">立即购买</el-button>
            </div>
        </div>
        <div class="productService">
            <h3>基础服务概述</h3>
            <p>{{item[0].cpMs}}</p>
        </div>
        <div class="productFun">
            <h3 style="padding-left:130px;">产品功能</h3>
            <el-row :gutter="20">
                <el-col :span="24/(item.length)" v-for="(list, index) in item" :key="index" :offset="index > 0 ? .3 : 0">
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="imgsrc+list.cpgnIco">
                        <p class="CardTitle">{{list.cpgnName}}</p>
                        <p class="CardContent">{{ list.cpgnContent }}</p>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'product',
    data () {
        return {
          s:'360px',
          hides:true,
          imgsrc:'',
          item:[],
        }
    },
    mounted: function (){
        let index = this.$route.params.id
        this.$http.get(config.servicedetail,{params:{menuId:index}}).then(response => {
            this.item = response.data
        }, response => {
            console.log(response.status);
        });
        this.imgsrc = config.imgsrc;
        this.$store.dispatch('h',this.s);
        this.$store.dispatch('showup',this.hides);
    },
    watch:{
        '$route':function(){
            let index = this.$route.params.id;
            this.$http.get(config.servicedetail,{params:{menuId:index}}).then(response => {
                this.item = response.data
            }, response => {
                console.log(response.status);
            });
        }
    },
    computed:{

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .product {
        color:#fff;
        .producthead{
            height:360px;
            background-color:#15202F;
            .productImg{
                text-align: right;
                img {
                    margin:25px 180px 25px 0;
                }
            }
            .productText {
                position:absolute;
                top:160px;
                left:130px;
                text-align:left;
                h3 {
                    font-size:44px;
                    font-family:"sourcehansansCN-Regular";
                }
                p {
                    font-size:18px;
                    font-family:"sourcehansansCN-Light";
                    margin:30px 0 40px;
                }
                .el-button {
                    width:120px;
                    height:38px;
                    border-radius:0;
                }
            }
        }
        .productService {
            text-align:left;
            padding: 0 130px;
            h3 {
                font-size:24px;
                color:#333;
                margin:40px 0;
            }
            p {
                font-size:16px;
                color:#2d2d2d;
            }
        }
        .productFun {
            text-align:left;
            padding: 0 0 40px;
            h3 {
                font-size:24px;
                color:#333;
                margin:50px 0 40px;
            }
            .el-row {
                width:1100px;
                margin:0 auto!important;
                .el-col {
                    padding:0;
                    .el-card{
                        border-radius:0;
                        border:1px solid #E1E1E1;
                        .el-card__body{
                            text-align:center;
                            img {
                                margin:30px 0;
                            }
                            .CardTitle {
                                text-align:center;
                                font-size:18px;
                            }
                            .CardContent {
                                font-size:14px;
                                height:63px;
                                line-height:1.5;
                                padding:0 20px;
                                margin:30px 0 50px;
                                color:#838383;
                                text-align:left;
                                word-break:break-all;
                            }
                        }
                    }
                }
            }
        }
    }
</style>