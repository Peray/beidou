<template>
    <div class="orderapply">

        <el-steps :active="1" simple process-status="finish" finish-status="wait">
            <el-step title="确认订单信息"></el-step>
            <el-step title="付款"></el-step>
            <el-step title="确认收货"></el-step>
            <el-step title="完成订单"></el-step>
        </el-steps>
        
        <el-row class="appplyfinsh">
            <el-col :span='24'>
                <p class="zfststu">
                    <i class="el-icon-success"></i>
                    <span>{{orderapply}}</span>
                </p>
                <p>订单号：{{orderNum}}</p>
                <p>订单金额：{{orderPrice | rmb}}（含运费）</p>
                <p>你可以到订单管理页面查看订单详情</p>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'orderapply',
    data () {
        return {
            hides:true,
    		orderapply:'订单支付成功',
            orderNum:'0014236633',
            orderPrice:58005.00
        }
    },
    mounted: function (){
    	this.$store.dispatch('showup',this.hides);
    },
    computed:{
        
    },
    methods:{
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .orderapply{
        width:1300px;
        margin:auto;
        padding-bottom:200px;
        .el-steps{
            margin:40px 0;
            .el-step__head.is-finish {
                color: $primaryColor;
                border-color: $primaryColor;
            }
            .el-step__title.is-finish{
                color: $primaryColor;
                font-weight: bold;
            }
        }
        .appplyfinsh{
            padding-top:110px;
            p{
                width:280px;
                margin:auto;
                text-align: left;
                color:#666;
                &:not(.zfststu){
                    padding:10px 0 0 113px;
                    font-size:15px;
                }
                &:last-child{
                    color:#999;
                }
            }
            .zfststu{
                padding-bottom:30px;
                i{
                    color:$primaryColor;
                    font-size:36px;
                    vertical-align: middle;
                }
                span{
                    font-size:20px;
                    font-weight: bold;
                    margin-left:15px;
                }
            }
        }
    }
</style>
