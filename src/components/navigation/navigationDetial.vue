<template>
    <div class="navigationDetial">
        <div class="navigationhead">
            <div class="navigationImg">
                <img :src="imgsrc+item[0].yjImg">
            </div>
            <div class="navigationText">
                <h3>{{item[0].yjName}}</h3>
                <p>{{item[0].yjMs}}</p>
                <el-button type="primary" @click="orderbuy">立即购买</el-button>
                <span class="price">{{item[0].yjPrice | rmb}}/台</span>
            </div>
        </div>
        <ul>
            <li v-for="(it,index) in item" v-if="index==0 || index == 1">
                <el-row>
                    <el-col :span="12">
                        <h3>{{it.yjgnName}}</h3>
                        <p>{{JSON.parse(it.yjgnContent).content[0].value}}</p>
                        <!-- <div class="icons">
                            <img v-for="src in item.icon" :src="src.imgSrc" >
                        </div> -->
                    </el-col>
                    <el-col :span="12">
                        <span class="imgDetial">
                            <img :src="imgsrc+it.yjgnImg">
                        </span>
                    </el-col>
                </el-row>
            </li>
        </ul>
        <div class="fun" v-for="(it,index) in item.sysYjSonList" v-if="index==2">
            <h3>{{it.yjgnName}}</h3>
            <p>{{JSON.parse(it.yjgnContent).content[0].value}}</p>
            <!-- <ol class="clearfix">
                <li v-for="item in item.fun.icon">
                    <span><img :src="item.imgSrc"></span>
                </li>
            </ol> -->
        </div>
        <div class="overall">
            <h3>{{alltitle}}</h3>  
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="value" label="规格参数"></el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>

export default {
    name: 'navigation',
    data () {
        return {
            s:'360px',
            hides:true,
            imgsrc:'',
            item:[],
            tableData:[],
            alltitle:''
        }
    },
    mounted: function () {
        let index = this.$route.params.id
        this.$http.get(config.harddetailUrl,{params:{yjId:index}}).then(response => {
            this.item = response.data
            this.tableData = JSON.parse(response.data[3].yjgnContent).content
            this.alltitle = response.data[3].yjgnName
            console.log(response.data);
        }, response => {
            console.log(response.status);
        });
        this.imgsrc = config.imgsrc
        this.$store.dispatch('h',this.s);
        this.$store.dispatch('showup',this.hides);
    },
    methods:{
        orderbuy(){
            this.$router.push({path:'/orderstart'})
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .navigationDetial{
        color:#fff;
        .navigationhead{
            height:360px;
            background-color:#15202F;
            .navigationImg{
                height:100%;
                text-align: right;
                margin: auto;
                img {
                    margin:85px 170px 25px 0;
                }
            }
            .navigationText {
                position:absolute;
                top:160px;
                left:100px;
                text-align:left;
                h3 {
                    font-size:44px;
                    font-family:"sourcehansansCN-Regular";
                    font-weight:normal;
                }
                p {
                    width:600px;
                    font-size:14px;
                    line-height:1.8;
                    font-family:"sourcehansansCN-Light";
                    margin:20px 0 60px;
                }
                .el-button {
                    width:120px;
                    height:38px;
                    border-radius:0;
                }
                .price {
                    color:#589bdd;
                    font-size:20px;
                    font-weight:bold;
                    margin: 0 0 0 20px;
                }
            }
        }
        ul {
            margin:auto;
            padding:0 10%;
            text-align:left;
            li{
                color:#000;
                .el-row{
                    .el-col{
                        vertical-align:middle;
                        padding:0 20px;
                        h3{
                            font-size:30px;
                            padding:30px 0;
                        }
                        p{
                            color:#666;
                            font-size:16px;
                        }
                        .icons{
                            padding:66px 0;
                            img {
                                display:inline-block;
                                width:60px;
                                height:60px;
                                margin: 0 15px;
                            }
                        }
                        .imgDetial{
                            display:inline-block;
                            margin:60px auto;
                            img {
                                width:100%;
                            }
                        }
                    }
                }
                &:nth-child(even) {
                    .el-col {
                        float:right;
                    }
                }
            }
        }
        .fun{
            padding:0 10%;
            background:url("~@/assets/img/detailbg.png") center center;
            color:#fff;
            h3{
                font-size:32px;
                padding:110px 0 50px;
                font-weight:normal;
            }
            p{
                text-align:left;
                font-size:18px;
                line-height:1.8;
                padding-bottom:62px;
            }
            &>ol{
                padding-bottom:160px;
                &.clearfix:after {
                    display: table;
                    content: " ";
                    clear: both;
                }
                &.clearfix{
                    *zoom: 1;
                }
                li{
                    float:left;
                    width:20%;
                    span{
                        width:80px;
                        height:80px;
                        border-radius:50%;
                        display: inherit;
                        margin:auto;
                    }
                }
            }
        }
        .overall{
            padding:0 10% 40px;
            color:#000;
            h3{
                font-size:32px;
                padding:70px 0 80px;
            }
            table{
                font-size:24px;
                th,td{
                    color:#333;
                    font-weight:normal;
                    height:70px;
                    line-height:70px;
                    border-bottom:1px solid #d1d1d1;
                    padding:0;
                }
            }
            .el-table th{
                text-align:center;
            }
            .el-table__body-wrapper{
                overflow:hidden;
            }
            .el-table .cell{
                line-height:70px;
            }
        }
    }
</style>