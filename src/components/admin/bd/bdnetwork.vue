<template>
    <div class="bdnetwork">
        <div class="tab">
            <div class="tab-title clearfix">
                <span :class="{active:index == num}" 
                v-for="(item,index) in items" @click="tab(index)">
                    <a>{{item}}</a>
                </span>
            </div>
            <div class="tab-content">
                <div class="step" v-show="num === 0">
                    <el-steps :active="3" align-center>
                        <el-step :title="item.title" 
                        :description="item.description" 
                        v-for="(item,index) in steps"
                        :key="index">
                        </el-step>
                    </el-steps>
                </div>
                <div class="networkform" v-show="num === 1">
                     <el-form :inline="true" :model="form">
                        <el-form-item label="项目名称：" :label-width="formLabelWidth">
                            <el-input v-model="form.name" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="转网卡号：" :label-width="formLabelWidth">
                            <el-input v-model="form.acounnt" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="转网事由：" :label-width="formLabelWidth">
                            <el-input type="textarea" v-model="form.reason" placeholder="请填写转网原因"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bdnetwork',
    data () {
        return {
            items:['流程说明','申请信息填写'],
            num:0,
            formLabelWidth:'280px',
            form:{
                name:'',
                acounnt:'',
                reason:''
            },
            steps:[
                {
                    title:'关系变更',
                    description:'已经通过非民航局授权的北斗民用分理服务单位申请获得的北斗用户卡应完成注册关系变更'
                },
                {
                    title:'填写注册申请表',
                    description:'由航科院向中国卫星导航定位应用管理中心提交北斗民用用户卡转网注册申请'
                },
                {
                    title:'提交证明材料',
                    description:'转移方北斗民用分理服务单位出具情况证明'
                }
            ]
        }
    },
    mounted: function (){
        
    },
    computed:{
        
    },
    methods:{
        tab(index) {
            this.num = index
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .bdnetwork{
        padding:30px;
        text-align: left;
        &>.tab{
            background-color:#fff;
            &>.tab-title {
                border-bottom:1px solid #E6E6E6;
                padding-left:20px;
                span {
                    display:inline-block;
                    padding:15px 20px 0;
                    cursor:pointer;
                    &.active{
                        a{
                            border-bottom:2px solid $primaryColor;
                            color:$primaryColor;
                        }
                    }
                    a{
                        display:inline-block;
                        font-size:16px;
                        color:#999;
                        border-bottom:2px solid #fff;
                        padding:0 3px 15px;
                    }
                }
                &.clearfix:after {
                    display: table;
                    content: " ";
                    clear: both;
                }
                &.clearfix{
                    *zoom: 1;
                }
            }
            &>.tab-content {
                padding:20px 43px 0;
                height:100%;
                .step{
                    margin:120px 0 120px;
                    .el-step__head{
                        .el-step__line{
                            top:19px;
                            border-color:#6DA8E1;
                        }
                        .el-step__icon{
                            width:40px;
                            height:40px;
                            background-color:#6DA8E1;
                            border:none;
                            .el-step__icon-inner{
                                color:#fff;
                                font-size:18px;
                            }
                        }
                    }
                    .el-step__main{
                        .el-step__title{
                            color:#6DA8E1;
                            padding:10px 0;
                            font-weight:bold;
                        }
                        .el-step__description{
                            color:#747474;
                            font-size:14px;
                            line-height:1.8;
                            text-align: left;
                        }
                    }
                }
                .networkform{
                    .el-form{
                        .el-form-item{
                            margin:0 50px 30px 0;
                            &>.el-form-item__label{
                                line-height:35px;
                            }
                            .el-form-item__content{
                                width:260px;
                                line-height:35px;
                                .el-input{
                                    .el-input__inner{
                                        border-radius:0;
                                        height:35px;
                                    }
                                }
                                .el-textarea{
                                    textarea{
                                        min-height:100px!important;
                                        border-radius:0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>