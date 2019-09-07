<template>
    <div class="orderconfirm">

        <el-steps class="first" :active="3" simple process-status="finish" finish-status="process">
            <el-step title="确认订单信息"></el-step>
            <el-step title="付款"></el-step>
            <el-step title="确认收货"></el-step>
            <el-step title="完成订单"></el-step>
        </el-steps>

        <div class="orderinfo">
            <span>订单号：<b>{{ordernum}}</b></span>
            <span>状态：<b class="statu">{{prderstatu}}</b></span>
            <p>{{finshtip}}</p>
        </div>

        <div class="cardfinsh">
            <p class="ordertitle">订单跟踪</p>
            <el-steps direction="vertical" :active="2" process-status="finish" finish-status="process">
                <el-step title="2018-12-02 03:00 订单创建成功"></el-step>
                <el-step title="2018-12-02 09:00 付款成功"></el-step>
                <el-step title="2018-12-02 10:00 正在打包，准备发货"></el-step>
                <el-step title="2018-12-02 09:00 设备已出发"></el-step>
                <el-step title="2018-12-02 12:00 商品正在派送中，请注意接收快递电话"></el-step>
                <el-step title="2018-12-03 09:00 商品成功签收，本人签收"></el-step>
            </el-steps>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderconfirm',
    data () {
        return {
            hides:true,
            ordernum:'0014236633',
            prderstatu:'完成',
            finshtip:'您的订单已完成，感谢您对我们的信任与支持'
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
    .orderconfirm{
        width:1300px;
        text-align:left;
        margin:auto;
        padding-bottom:200px;
        .ordertitle{
            font-weight:bold;
            padding: 30px 0;
        }
        .el-steps.first{
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
        .orderinfo{
            padding:0 0 30px;
            span{
                font-weight:bold;
                b{
                    font-weight:normal;
                    font-size:15px;
                    &.statu{
                        color:$primaryColor;
                        font-weight:bold;
                    }
                }
            }
            p{
                line-height:3;
                font-size:15px;
                color:#999;
            }
        }
        .cardfinsh{
            padding:10px 20px 30px;
            border: 1px solid #D1D1D1;
            .el-steps--vertical{
                height:360px;
                padding: 10px 0;
                .el-step{
                    .el-step__head{
                        .el-step__line{

                        }
                        &.is-finish{
                            color: $primaryColor;
                            border-color: $primaryColor;
                            font-weight: bold;
                        }
                    }
                    .el-step__main{
                        .el-step__title{
                            font-size: 15px;
                            &.is-finish{
                                color: $primaryColor;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
