<template>
    <div class="orderstart">

        <el-steps :active="0" simple process-status="finish" finish-status="wait">
            <el-step title="确认订单信息"></el-step>
            <el-step title="付款"></el-step>
            <el-step title="确认收货"></el-step>
            <el-step title="完成订单"></el-step>
        </el-steps>
        
        <div class="adress">
            <el-row>
                <el-col :span="12" class="ordername">确认收货地址</el-col>
                <el-col :span="12" class="ordername">管理收货地址</el-col>
            </el-row> 
            <el-row v-for="(item,index) in addressList" :key="index">
                <el-col :span="18" class="adress_radio">
                    <el-radio-group v-model="radio">
                        <el-radio>{{item.region}}</el-radio>
                    </el-radio-group>
                </el-col>
                <el-col :span="6" class="set">
                    <span>默认地址</span>
                    <span>修改本地址</span>
                </el-col>
            </el-row> 
        </div>

        <div class="confirm">
            <p class="ordertitle">确认订单信息</p>
            <el-table :data="confirm">
                <el-table-column label="商品" width="210">
                    <template slot-scope="scope">
                        <img class="imgtitle" :src="scope.row.img">
                        <span >{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="ordersty" label="订单类型"></el-table-column>

                <el-table-column prop="oneprice" label="单价"></el-table-column>

                <el-table-column label="数量">
                    <template slot-scope="scope">
                        <el-input-number size="mini" v-model="scope.row.num" :min="1"></el-input-number>
                    </template>
                </el-table-column>

                <el-table-column label="小计" width="300">
                    <template slot-scope="scope">
                        <span>{{xjtotal}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-row class="ysfs">
                <el-col :span="18">运送方式：普通配送快递{{kd | rmb}}</el-col>
                <el-col :span="6">{{kd}}</el-col>
                <el-col :span="24">合计（含运费）:<span>{{totals | rmb}}</span></el-col>
            </el-row>
        </div>

        <div class="apply">
            <p class="ordertitle">支付方式</p>
            <div class="applyradio">
                <el-radio v-model="radio1" label="1">在线支付</el-radio>
            </div>
        </div>

        <div class="submit">
            <el-button>提交订单</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'orderstart',
    data () {
        return {
            hides:true,
    		radio:"1",
            radio1:"1",
            adressRadio:[
                {
                    address:'北京市海淀区上地三街金玉华大厦c座1023（韩梅梅收）17845632398',
                    label:'1'

                },
                {
                    address:'北京市昌平区回龙观西大街华联超市12号楼4单元403（李磊收）17845632398',
                    label:'2'
                }
            ],
            addressList:[],
            confirm:[
                {
                    name:'北斗通用型指挥机',
                    img:require('@/assets/img/dmsb1.png'),
                    ordersty:'指挥机',
                    oneprice:58000,
                    num:1
                }
            ],
            kd:5,

        }
    },
    mounted: function (){
    	this.$store.dispatch('showup',this.hides);
        this.requestAddressList();
    },
    computed:{
        xjtotal(){
            let xjtotal
            for (var value of this.confirm) {
                xjtotal = value.oneprice*value.num;
            }
            return xjtotal
        },
        totals(){
            return this.xjtotal+this.kd
        }
    },
    methods:{
        requestAddressList: function(){
                var param = {};
                // param.userId = 1;
                this.$http.get(config.queryAddressList, {params: param}).then(response => {
                    if(response.ok){
                        this.addressList = response.data.list;
                    }else{

                    }
                }, response => {
                    console.log(response);
                })

        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .orderstart{
        width:1300px;
        margin:auto;
        padding-bottom:200px;
        text-align:left;
        .ordertitle{
            font-weight:bold;
            padding: 30px 0;
        }
        .el-radio__input.is-checked .el-radio__inner {
            border-color: $primaryColor;
            background: $primaryColor;
        }
        .el-radio__input.is-checked+.el-radio__label {
            color: $primaryColor;
        }
        .el-radio__label{
            font-weight:bold;
        }
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
        .adress{
            padding:5px 0 20px;
            .ordername{
                font-weight:bold;
                padding:5px 0 15px;
                &:nth-child(2){
                    color:$primaryColor;
                    text-align: right;
                }
            }
            .adress_radio{
                line-height:2;
                padding-left:100px;
            }
            .set{
                text-align: right;
                font-size:14px;
                font-weight:bold;
                &>span:nth-child(2){
                    color: $primaryColor;
                    cursor: pointer;
                }
            }
        }
        .confirm{
            .imgtitle{
                width:65px;
                vertical-align: middle;
            }
            &>.el-table{
                border:1px solid #D1D1D1;
                border-bottom:0;
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
                &.el-table_1_column_5{
                    color:#E12F2F;
                    font-weight:bold;
                    font-size:20px;
                }
            }
            .el-table--enable-row-hover .el-table__body tr:hover>td {
                background-color: #fff;
            }
            .ysfs{
                border:1px solid #D1D1D1;
                border-top:0;
                .el-col:nth-child(1){
                    padding-left:20px!important;
                }
                .el-col:nth-child(2){
                    text-align:center;
                    color:#E12F2F;
                    font-weight:bold;
                }
                .el-col:nth-child(3){
                    text-align:right;
                    font-weight:bold;
                    font-size:20px;
                    padding:20px 90px 30px 0;
                    span{
                        color:#E12F2F;
                    }
                }
                
            }
        }
        .apply{
            .applyradio{
                padding-bottom:20px;
            }
        }
        .submit{
            &>button{
                width:180px;
                background-color:#E12F2F;
                color:#fff;
                border:none;
                border-radius:0;
                font-size:16px;
                font-weight:bold;
            }
        }
    }
</style>
