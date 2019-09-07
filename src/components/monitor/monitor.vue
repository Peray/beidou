<template>
    <div class="productbase">
       <div class="producthead">
           <div class="productImg">
               <img :src="product.src">
           </div>
           <div class="productText">
               <h3>{{product.title}}</h3>
               <p>{{product.content}}</p>
               <el-button type="primary">立即购买</el-button>
           </div>
       </div>
       <div class="productService">
           <h3>{{product.summaryTitle}}</h3>
           <p>{{product.summaryContent}}</p>
       </div>
       <div class="productFun">
            <h3 style="padding-left:130px;">{{product.funTitle}}</h3>
            <el-row :gutter="20">
                <el-col :span="6" v-for="(item, index) in items" :key="index" :offset="index > 0 ? .3 : 0">
                    <el-card :body-style="{ padding: '0px' }">
                        <img :src="item.CardImg">
                        <p class="CardTitle">{{item.CardTitle}}</p>
                        <p class="CardContent">{{ item.CardContent }}</p>
                    </el-card>
                </el-col>
            </el-row>
       </div>
    </div>
</template>

<script>

export default {
    components:{

    },
    name: 'product',
    data () {
        return {
            hides:true,
            active:'3',
            s:'360px',
            product:{
                src:require('@/assets/img/jspt.png'),
                title:'监视平台',
                content:'无间断通信保障，已累计为超过十万用户提供了高质量的运营服务',
                summaryTitle:'监视平台概述',
                summaryContent:'包含北斗卡、北斗基础服务及北斗云平台基础服务。可以进行北斗通信和定位数据查询，同时可通过北斗云平台，对下属终端进行位置管理',
                funTitle:'产品功能'   
            },
            items:[
                {
                    CardImg:require('@/assets/img/txdw.png'),
                    CardTitle:'通信定位服务',
                    CardContent:'缴纳北斗运营年费后，可实现各北斗终端之间的通信及单个终端的定位功能。'
                },
                {
                    CardImg:require('@/assets/img/sjcx.png'),
                    CardTitle:'数据查询服务',
                    CardContent:'再北斗云平台上可实时查询北斗运营服务的通信数据和定位数据，并了解下属终端的所有情况。'
                },
                {
                    CardImg:require('@/assets/img/sjts.png'),
                    CardTitle:'数据推送服务',
                    CardContent:'在北斗云平台开通账号并关联北斗终端，即在云平台上快速实现北斗数据的外部推送。'
                },
                {
                    CardImg:require('@/assets/img/bdypt.png'),
                    CardTitle:'北斗云平台服务',
                    CardContent:'使用北斗云平台，可对终端进行位置管理，实现历史轨迹绘制、回放等功能，并直接向北斗终端发送短报文。'
                }
            ]
        }
    },
    mounted: function () {
        this.$store.dispatch('increase',this.active);
        this.$store.dispatch('h',this.s);
        this.$store.dispatch('showup',this.hides);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .productbase{
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
                width:1200px;
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