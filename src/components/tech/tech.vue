<template>
    <div class="tech">
        <div class="techhead">
            <div class="techImg">
                <img :src="tech.src">
            </div>
            <div class="techText">
                <h3>{{tech.title}}</h3>
                <p>{{tech.content}}</p>
                <el-button type="primary">立即下载</el-button>
            </div>
        </div>
        <div class="techService">
            <h3>基本描述</h3>
            <p>{{tech.summaryContent}}</p>
        </div>
        <div class="techFun">
            <h3>特点</h3>
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
    name: 'tech',
    data () {
        return {
    		s:'360px',
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
        this.$store.dispatch('increase',this.active);
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
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .tech{
        color:#fff;
        .techhead{
            height:360px;
            background-color:#15202F;
            .techImg{
                text-align: right;
                img {
                    margin:25px 180px 25px 0;
                }
            }
            .techText {
                position:absolute;
                top:160px;
                left:130px;
                text-align:left;
                h3 {
                    font-size:44px;
                    font-weight:normal;
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
        .techService {
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
        .techFun {
            text-align:left;
            padding: 0 130px 40px;
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