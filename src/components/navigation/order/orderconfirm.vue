<template>
    <div class="orderconfirm">

        <el-steps class="first" :active="2" simple process-status="finish" finish-status="wait">
            <el-step title="确认订单信息"></el-step>
            <el-step title="付款"></el-step>
            <el-step title="确认收货"></el-step>
            <el-step title="完成订单"></el-step>
        </el-steps>
        
        <div class="equip">
            <p class="ordertitle">已收到设备，立即打款</p>
            <el-table :data="equip">
                <el-table-column label="商品" width="210">
                    <template slot-scope="scope">
                        <img class="imgtitle" :src="scope.row.img">
                        <span >{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="ordersty" label="订单类型"></el-table-column>

                <el-table-column label="单价">
                    <template slot-scope="scope">
                        <span >{{scope.row.oneprice}}.00</span>
                    </template>
                </el-table-column>

                <el-table-column prop="num" label="数量"></el-table-column>

                <el-table-column label="运费">
                    <template slot-scope="scope">
                        <span >{{scope.row.freight}}.00元</span>
                    </template>
                </el-table-column>

                <el-table-column label="小计">
                    <template slot-scope="scope">
                        <span >{{scope.row.xjtotal}}.00</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="cardTrack">
            <p class="ordertitle">订单跟踪</p>
            <el-steps direction="vertical" :active="2" process-status="finish" finish-status="process">
                <el-step title="2018-12-02 09:00 订单创建成功"></el-step>
                <el-step title="2018-12-02 09:00 卖家发货"></el-step>
                <el-step title="2018-12-02 09:00 商品成功签收，本人签收"></el-step>
            </el-steps>
        </div>

        <div class="playmoney">
            <p class="ordertitle">确认打款</p>
            <div>
                <span>输入支付密码:</span>
                <el-input type="password" v-model="password"></el-input>
            </div>
            <el-button>确认收货</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderconfirm',
    data () {
        return {
            hides:true,
    		equip:[
                {
                    name:'北斗通用型指挥机',
                    img:require('@/assets/img/dmsb1.png'),
                    ordersty:'指挥机',
                    oneprice:58000,
                    num:1,
                    freight:5,
                    xjtotal:58005
                }
            ],
            password:''
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
        .equip{
            .imgtitle{
                width:65px;
                vertical-align: middle;
            }
            &>.el-table{
                border:1px solid #D1D1D1;
                .el-table__header-wrapper{
                    border-bottom:1px solid #D1D1D1;
                }
            }
            &>.el-table::before{
                height:0;
            }
            &>.el-table thead{
                color:#000;
            }
            &>.el-table th,
            &>.el-table td,{
                text-align: center;
                padding:15px 0;
            }
            &>.el-table th{
                font-size:16px;
                background-color:#E7F1FB;
            }
            &>.el-table td{
                font-size:15px;
                border: 0;
                &.el-table_1_column_3,
                &.el-table_1_column_5,
                &.el-table_1_column_6  {
                    color:#E12F2F;
                    font-weight:bold;
                }
            }
            .el-table--enable-row-hover .el-table__body tr:hover>td {
                background-color: #fff;
            }
        }
        .cardTrack{
            padding:35px 0;
            .el-steps--vertical{
                height:120px;
                padding: 10px 0;
                .el-step{
                    .el-step__head{
                        .el-step__line{

                        }
                        &.is-finish{
                            color: $primaryColor;
                            border-color: $primaryColor;
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
        .playmoney{
            .el-input{
                width:200px;
                .el-input__inner{
                    height:35px;
                    border-radius:0;
                    border-color:#999;
                }
            }
            .el-button{
                display:block;
                margin:15px 104px;
                width:200px;
                border-radius:0;
                border: 1px solid $primaryColor;
                font-size:16px;
                font-weight:bold;
                color:#fff;
                background-color:$primaryColor;
            }
        }
    }
</style>
