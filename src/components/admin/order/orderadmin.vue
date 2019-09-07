<template>
    <div class="orderadmin">
        <div class="tab">
            <div class="tab-title clearfix">
                <el-row>
                    <el-col :span="24">
                <span :class="{active:index == num}" 
                v-for="(item,index) in items" @click="tab(index)">
                    <a>{{item}}</a>
                </span>
            </el-col>
            </el-row>
            </div>
            <div class="tab-content">
                <div class="searchTitle">
                    <div>
                        <div>
                        <el-input placeholder="请输入订单编号进行搜索" v-model="allinput">
                            <i slot="suffix" class="el-input__icon el-icon-search" @click="searchOrder"></i>
                        </el-input>
                        <el-button @click="allShowing = !allShowing">筛选
                            <i class="el-icon-arrow-up el-icon--right" v-show="!allShowing"></i>
                            <i class="el-icon-arrow-down el-icon--right" v-show="allShowing"></i>
                        </el-button>
                    </div>

                        <el-collapse-transition>
                            <el-form status-icon :model="filterBeanForm" :inline="true" v-show="allShowing">
                                <el-form-item label="订单类型：" label-width='120'>
                                    <el-select v-model="filterBeanForm.value" class="selectinput">
                                        <el-option
                                        v-for="item in filterBeanForm.options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="下单时间：" label-width='120'>
                                    <el-date-picker
                                        v-model="datePickerValue"
                                        type="datetimerange"
                                        :picker-options="pickerOptions"
                                        range-separator="~"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        align="right"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="orderQuery">查询</el-button>
                                </el-form-item>
                            </el-form>
                        </el-collapse-transition>
                    </div>
                </div>
                <div>
                    <div class="orderList">
                        <el-row class="orderHead" style="font-weight:normal">
                            <el-col :span="5">订单内容</el-col>
                            <el-col :span="5">商品数量</el-col>
                            <el-col :span="5">订单金额</el-col>
                            <el-col :span="5">订单状态</el-col>
                            <el-col :span="4">操作</el-col>
                        </el-row>
                    </div>
                <div v-show="true">
                    <order-none v-if="dataTable.length == 0"></order-none>
                    <div class="orderList" v-for="item in dataTable">
                        <el-row class="orderHead">
                            <el-col :span="24" align="left" >
                                <span style="margin-left: 20px">{{item.startTime | formatDate}}</span>
                                <span style="margin-left: 20px;font-weight:normal">订单号：{{item.orderId}}</span>
                            </el-col>
                        </el-row>
                        <el-row class="orderContent">
                            <el-col :span="5">
                                <img v-if="item.itemType == 1" :src="bdkimg">
                                <span>{{item.orderInfo}}</span>
                            </el-col>
                            <el-col :span="5">
                                {{item.total}}
                            </el-col>
                            <el-col :span="5">
                                {{item.fullPrice}}
                            </el-col>
                            <el-col :span="5">
                                <span v-if="item.status == 0">已退回</span>
                                <span v-else-if="item.status == 1">待审核</span>
                                <span v-else-if="item.status == 2">
                                    <!-- <span v-if="item.handleStatus == 0">正在办理</span>
                                    <span v-if="item.handleStatus == 1">发卡中</span>
                                    <span v-else-if="item.handleStatus == 2">发货中</span>
                                    <span v-else-if="item.handleStatus == 3">办理完成</span>
                                    <span v-else>正在办理中</span> -->
                                    
                                    <el-steps :active="parseInt(item.handleStatus)" direction="vertical" process-status="success" align-center style="padding-left:25%">
                                        <el-step title="已受理"></el-step>
                                        <el-step title="发卡完成" v-if="item.orderType == 1"></el-step>
                                        <el-step title="发货完成"></el-step>
                                    </el-steps>
                                    </span>
                                <span v-else-if="item.status == 3">订单完成</span>
                                <span v-else>未知</span>
                            </el-col>
                            <el-col :span="4">
                                <div>
                                    <el-button size="mini" @click="orderDetail(item)">查看详情<i class="el-icon-document el-icon--right"></i>
                                    </el-button>
                                    <p style="height:2px"></p>
                                    <el-button type="danger" plain size="mini" v-if="item.status == 1" @click="orderCancle(item)">取消订单<i class="el-icon-delete el-icon--right"></i>
                                    </el-button>
                                    <el-button type="success" plain size="mini" v-if="item.status == 2 && item.handleStatus == 3" @click="confirmReceipt(item)">确认收货<i class="el-icon-success el-icon--right"></i>
                                    </el-button>

                                </div>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="block">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :background="true"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="prev,pager,next,jumper,total"
                        :page-count="pageCount"
                        prev-text="上一页"
                        next-text="下一页">
                        </el-pagination>
                    </div>
                </div>
                </div>
                <div v-show="num === 0" v-if="false">
                    <order-none v-if="dataTable.length == 0"></order-none>
                    <div class="orderList" v-for="item in dataTable">
                        <el-row class="orderHead">
                            <el-col :span="24" align="left" >
                                <span style="margin-left: 20px">{{item.startTime | formatDate}}</span>
                                <span style="margin-left: 20px;font-weight:normal">订单号：{{item.orderId}}</span>
                            </el-col>
                        </el-row>
                        <el-row class="orderContent">
                            <el-col :span="5">
                                <img v-if="itemType == 1" :src="bdkimg">
                                <span>{{item.orderInfo}}</span>
                            </el-col>
                            <el-col :span="5">
                                {{item.total}}
                            </el-col>
                            <el-col :span="5">
                                {{item.fullPrice}}
                            </el-col>
                            <el-col :span="5">
                                <span v-if="item.status == 0">已退回</span>
                                <span v-else-if="item.status == 1">待审核</span>
                                <span v-else-if="item.status == 2">已审核</span>
                                <span v-else-if="item.status == 3">已发货</span>
                                <span v-else-if="item.status == 4">已完成</span>
                                <span v-else-if="item.status == 5">已开票</span>
                                <span v-else>未知</span>
                            </el-col>
                            <el-col :span="4">
                                <div>
                                    <el-button size="mini" @click="orderDetail(item)">查看详情<i class="el-icon-document el-icon--right"></i>
                                    </el-button>
                                    <p style="height:2px"></p>
                                    <el-button type="danger" plain size="mini" @click="orderDetail(item)" v-if="item.status == 1">取消订单<i class="el-icon-delete el-icon--right"></i>
                                    </el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="block">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :background="true"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="prev,pager,next,jumper,total"
                        :page-count="pageCount"
                        prev-text="上一页"
                        next-text="下一页">
                        </el-pagination>
                    </div>
                </div>
                <div v-show="num === 1" v-if="false">
                    <order-none v-if="dataTable1.length == 0"></order-none>
                    <div class="orderList" v-for="item in dataTable1">
                        <el-row class="orderHead">
                            <el-col :span="5">订单号</el-col>
                            <el-col :span="4">订单信息</el-col>
                            <el-col :span="5">订单状态</el-col>
                            <el-col :span="5">下单时间</el-col>
                            <el-col :span="5">操作</el-col>
                        </el-row>
                        <el-row class="orderContent">
                            <el-col :span="5">
                                {{item.orderId}}
                            </el-col>
                            <el-col :span="4">
                                <img v-if="itemType == 1" :src="bdkimg">
                                <span>{{orderName}} &times; {{fullPrice/price}}张</span>
                            </el-col>
                            <el-col :span="5">
                                <span v-if="item.status == 1">待审核</span>
                                <span v-else-if="item.status == 2">已审核</span>
                                <span v-else-if="item.status == 3">已发货</span>
                                <span v-else-if="item.status == 4">已退回</span>
                                <span v-else>无状态</span>
                            </el-col>
                            <el-col :span="5">{{item.startTime | formatDate}}</el-col>
                            <el-col :span="5">
                                <div v-if="item.status == 1">
                                    <span class="ordericon" 
                                    @click="orderDetail(item.orderId)">
                                        <i class="el-icon-document">查看详情</i>
                                    </span>
                                    <span class="ordericon" 
                                    @click="orderCancle(item.orderId)">
                                        <i class="el-icon-delete">取消订单</i>
                                    </span>
                                </div>
                                
                                <span class="ordericon" 
                                @click="orderDetail(item.orderId)"
                                v-if="item.status == 2">
                                    <i class="el-icon-document">查看详情</i>
                                </span>
                                <span class="ordericon" 
                                @click="orderDetail(item.orderId)"
                                v-if="item.status == 3">
                                    <i class="el-icon-document">查看详情</i>
                                </span>
                                <span class="ordericon" 
                                @click="orderDetail(item.orderId)"
                                v-if="item.status == 4">
                                    <i class="el-icon-document">查看详情</i>
                                </span>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="block">
                        <el-pagination
                        @size-change="handleSizeChange1"
                        @current-change="handleCurrentChange1"
                        :background="true"
                        :current-page.sync="currentPage1"
                        :page-size="pagesize1"
                        layout="prev,pager,next,jumper,total"
                        :total="totalCount1"
                        prev-text="上一页"
                        next-text="下一页">
                        </el-pagination>
                    </div>
                </div>
                <div v-show="num === 2" v-if="false">
                    <order-none v-if="dataTable2.length == 0"></order-none>
                    <div class="orderList" v-for="item in dataTable2">
                        <el-row class="orderHead">
                            <el-col :span="5">订单号</el-col>
                            <el-col :span="4">订单信息</el-col>
                            <el-col :span="5">订单状态</el-col>
                            <el-col :span="5">下单时间</el-col>
                            <el-col :span="5">操作</el-col>
                        </el-row>
                        <el-row class="orderContent">
                            <el-col :span="5">
                                {{item.orderId}}
                            </el-col>
                            <el-col :span="4">
                                <img v-if="itemType == 1" :src="bdkimg">
                                <span>{{orderName}} &times; {{fullPrice/price}}张</span>
                            </el-col>
                            <el-col :span="5">
                                <span v-if="item.status == 1">待审核</span>
                                <span v-else-if="item.status == 2">已审核</span>
                                <span v-else-if="item.status == 3">已发货</span>
                                <span v-else-if="item.status == 4">已退回</span>
                                <span v-else>无状态</span>
                            </el-col>
                            <el-col :span="5">{{item.startTime | formatDate}}</el-col>
                            <el-col :span="5">
                                <div v-if="item.status == 1">
                                    <span class="ordericon" 
                                    @click="orderDetail(item.orderId)">
                                        <i class="el-icon-document">查看详情</i>
                                    </span>
                                    <span class="ordericon" 
                                    @click="orderCancle(item.orderId)">
                                        <i class="el-icon-delete">取消订单</i>
                                    </span>
                                </div>
                                
                                <span class="ordericon" 
                                @click="orderDetail(item.orderId)"
                                v-if="item.status == 2">
                                    <i class="el-icon-document">查看详情</i>
                                </span>
                                <span class="ordericon" 
                                @click="orderDetail(item.orderId)"
                                v-if="item.status == 3">
                                    <i class="el-icon-document">查看详情</i>
                                </span>
                                <span class="ordericon" 
                                @click="orderDetail(item.orderId)"
                                v-if="item.status == 4">
                                    <i class="el-icon-document">查看详情</i>
                                </span>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="block">
                        <el-pagination
                        @size-change="handleSizeChange2"
                        @current-change="handleCurrentChange2"
                        :background="true"
                        :current-page.sync="currentPage2"
                        :page-size="pagesize2"
                        layout="prev,pager,next,jumper,total"
                        :total="totalCount2"
                        prev-text="上一页"
                        next-text="下一页">
                        </el-pagination>
                    </div>
                </div>
                <div v-show="num === 3" v-if="false">
                    <order-none v-if="dataTable3.length == 0"></order-none>
                    <div class="orderList" v-for="item in dataTable3">
                        <el-row class="orderHead">
                            <el-col :span="5">订单号</el-col>
                            <el-col :span="4">订单信息</el-col>
                            <el-col :span="5">订单状态</el-col>
                            <el-col :span="5">下单时间</el-col>
                            <el-col :span="5">操作</el-col>
                        </el-row>
                        <el-row class="orderContent">
                            <el-col :span="5">
                                <span @click="orderDetail(item.orderId)" class="ordericon">{{item.orderId}}</span>
                            </el-col>
                            <el-col :span="4">
                                <img v-if="itemType == 1" :src="bdkimg">
                                <span>{{orderName}} &times; {{fullPrice/price}}张</span>
                            </el-col>
                            <el-col :span="5">
                                <span v-if="item.status == 1">待审核</span>
                                <span v-else-if="item.status == 2">已审核</span>
                                <span v-else-if="item.status == 3">已发货</span>
                                <span v-else-if="item.status == 4">已退回</span>
                                <span v-else>无状态</span>
                            </el-col>
                            <el-col :span="5">{{item.startTime | formatDate}}</el-col>
                            <el-col :span="5">
                                <div v-if="item.status == 1">
                                    <span class="ordericon" 
                                    @click="orderDetail(item.orderId)">
                                        <i class="el-icon-document">查看详情</i>
                                    </span>
                                    <span class="ordericon" 
                                    @click="orderCancle(item.orderId)">
                                        <i class="el-icon-delete">取消订单</i>
                                    </span>
                                </div>
                                
                                <span class="ordericon" 
                                @click="orderDetail(item.orderId)"
                                v-if="item.status == 2">
                                    <i class="el-icon-document">查看详情</i>
                                </span>
                                <span class="ordericon" 
                                @click="orderDetail(item.orderId)"
                                v-if="item.status == 3">
                                    <i class="el-icon-document">查看详情</i>
                                </span>
                                <span class="ordericon" 
                                @click="orderDetail(item.orderId)"
                                v-if="item.status == 4">
                                    <i class="el-icon-document">查看详情</i>
                                </span>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="block">
                        <el-pagination
                        @size-change="handleSizeChange3"
                        @current-change="handleCurrentChange3"
                        :background="true"
                        :current-page.sync="currentPage3"
                        :page-size="pagesize3"
                        layout="prev,pager,next,jumper,total"
                        :total="totalCount3"
                        prev-text="上一页"
                        next-text="下一页">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="订单详情" :visible.sync="orderdetail" top="30vh" @close="orderDetailDialogCloseEvent">
            <div class="cardDetail">
                <p>订单号：{{detail.number}}</p>
                <p>订单状态：
                    <span class="statu" v-if="detail.statu == 1">申请</span>
                    <span class="statu" v-else-if="detail.statu == 2">受理</span>
                    <span class="statu" v-else-if="detail.statu == 3">完成</span>
                    <span class="statu" v-else-if="detail.statu == 0">退回</span>
                </p>
                <div class="cardTrack">
                    <p>订单跟踪</p>
                    <el-steps direction="vertical" :active="detail.title.length">
                        <el-step :title="item" v-for="(item,index) in detail.title" :key="index"></el-step>
                    </el-steps>
                </div>
                <template>
                    <el-table ref="multipleTable" :data="detail.dataCard" stripe>

                        <el-table-column label="服务名称">
                            <template slot-scope="scope">
                                <i class="edit el-icon-edit-outline" @click="showServiceDetail"></i>
                                <span>{{scope.row.name}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="服务类型">
                            <template slot-scope="scope">
                                <span v-if="scope.row.itemType == 1">北斗卡</span>
                                <span v-else-if="scope.row.itemType == 2">硬件</span>
                                <span v-else-if="scope.row.itemType == 3">增值服务</span>
                                <span v-else-if="scope.row.itemType == 4">转网</span>
                            </template>
                        </el-table-column>

                         <el-table-column label="数量">
                            <template slot-scope="scope">
                                <span>{{scope.row.total}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="单价">
                            <template slot-scope="scope">
                                <span>{{scope.row.price}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="总价">
                            <template slot-scope="scope">
                                <span>{{scope.row.fullPrice | rmb}}</span>
                            </template>
                        </el-table-column>

                    </el-table>
                </template>
                <div class="receipt">
                    <p>收货信息</p>
                    <p class="receiptMes rtop">收货地址：{{detail.receipt.addres}}</p>
                    <p class="receiptMes">收货人邮编：{{detail.receipt.zip}}</p>
                    <p class="receiptMes">收货人姓名：{{detail.receipt.name}}</p>
                    <p class="receiptMes">收货人电话：{{detail.receipt.tel}}</p>
                </div>
                <div class="receipt">
                    <p>配送方式</p>
                    <p class="receiptMes rtop">{{detail.receipt.style}}</p>
                </div>
            </div>
        </el-dialog>

        <el-dialog title="服务详情" :visible.sync="serviceDetailDialog" top="30vh" class="orderdetail">
            <el-row class="borderPrimary">
                <el-col :span="4" class="center">
                    <span>北斗卡信息</span>
                </el-col>
                <el-col :span="20">
                    <el-row>
                        <el-col :span="12" class="orderbottom">
                            <p>北斗卡类型：{{dialogDetail.cardType}}</p>
                            <p>通讯等级：{{dialogDetail.cardLeven}}</p>
                            <p>服务频度：{{dialogDetail.frequentncy}}</p>
                            <p>使用方式：{{dialogDetail.usageMode}}</p>
                        </el-col>
                        <el-col :span="12" class="orderbottom">
                            <p>测试报告编号：{{dialogDetail.reportNumber}}</p>
                            <p>是否建立通播关系：{{dialogDetail.relations}}</p>
                            <p>申请数量：{{dialogDetail.total}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <el-row class="borderPrimary">
                <el-col :span="4" class="center">用户信息</el-col>
                <el-col :span="20">
                    <el-row>
                        <el-col :span="12" class="orderbottom">
                            <p>使用单位：{{dialogDetail.usageUnit}}</p>
                            <p>使用区域：{{dialogDetail.usageArea}}</p>
                        </el-col>
                        <el-col :span="12" class="orderbottom">
                            <p>用途：{{dialogDetail.yt}}</p>
                            <p>用途描述：{{dialogDetail.ytms}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="borderPrimary">
                <el-col :span="4" class="center">附件信息</el-col>
                <el-col :span="20">
                    <el-row>
                        <el-col :span="8">
                            <el-button type="success" size="mini" @click="downloadFile(1)">监测报告<i class="el-icon-download el-icon--right"></i>
                            </el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="success" size="mini" @click="downloadFile(2)">用户合同<i class="el-icon-download el-icon--right"></i>
                            </el-button>
                        </el-col>
                        <el-col :span="8">
                         <el-button type="success" size="mini" @click="downloadFile(3)">航空信息表<i class="el-icon-download el-icon--right"></i>
                         </el-button>
                     </el-col>
                 </el-row>
             </el-col>
            </el-row>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="serviceDetailDialog = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
//无订单显示的内容
let ordernone = {
    template: `<div class="ordernone">
                    <img :src="noneimg"/>
                    <p>您还没有订单，赶快去下单吧！</P>
                </div>`,
    data(){
        return{
            noneimg:require('@/assets/img/admin/ordernone.png')
        }
    }
}
export default {
    name: 'orderadmin',
    components:{
        'orderNone':ordernone
    },
    data () {
        return {
            items:['全部订单','待审核','待发货','待收货','审核未通过'],
            num:0,
            orderdetail:false,
            allinput:'',
            allShowing: false,
            orderName:'',
            itemType:'',
            fullPrice:'',
            price:'',
            bdkimg:require('@/assets/img/admin/icon2_normal.png'),
            filterBeanForm: {
                value: '',
                options: [
                    {
                      value: '1',
                      label: '北斗卡'
                    }, {
                      value: '2',
                      label: '硬件'
                    },{
                      value: '3',
                      label: '增值服务'
                    },{
                      value: '4',
                      label: '转网'
                    }
                ],
            },
            pickerOptions: {
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.setHours(0, 0, 0, 0));
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '昨天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.setHours(0, 0, 0, 0));
                            start.setTime(start.getTime() - 3600 * 1000 * 24);
                            start.setTime(start.setHours(0, 0, 0, 0));
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
            },
            datePickerValue:'',
            dataTable:[],//当前页数据全部订单
            dataTable1:[],//当前页数据待审核
            dataTable2:[],
            dataTable3:[],
            currentPage:1,//当前页
            currentPage1:1,
            currentPage2:1,
            currentPage3:1,
            pageSize:5,//每页条数
            pageCount:0,
            pagesize1:5,
            pagesize2:5,
            pagesize3:5,
            totalCount:0,//总数全部订单
            totalCount1:0,//总数待审核
            totalCount2:0,
            totalCount3:0,
            detail:{
                number:'',
                statu:'',
                title:'',
                dataCard:[],
                receipt:{
                    addres:'',
                    zip:'',
                    name:'',
                    tel:'',
                    style:''
                }
            },
            orderId:'',
            goodsId:'',
            addressId:'',
            orderType:'',
            serviceDetailDialog: false,
            dialogDetail: {
                    orderNum: '',
                    orderDate: '',
                    cardType: '',
                    cardLeven: '',
                    frequentncy: '',
                    usageMode: '',
                    usageArea: '',
                    usageUnit: '',
                    userName: '',
                    yt: '',
                    ytms: '',
                    reportFile: '',
                    contractFile: '',
                    aircraftFile: '',
                    filterBeanForm: {
                        value: '2',
                        options: [
                            {
                                label: '退回',
                                value: '1'
                            }, {
                                label: '受理',
                                value: '2'
                            }
                        ]
                    },
                    textarea: ''
                },
        }
    },
    mounted: function (){
        this.tab(0);
    },
    computed:{
        userId:{
            get: function(){
                return this.$store.state.LoginedUser.id;
                }
            }
    },
    methods:{
        tab(index) {
            //每次切换标签页请求第一页5条数据
            this.num = index;
            this.loadPageData();
            
        },
        loadPageData: function(){
            //载入第一页数据
            var param = {};
            this.currentPage = 1;
            param.pageNum = this.currentPage;
            param.pageSize = this.pageSize;
            param.userId = this.userId
            if(this.tabIndex2status() != -1){
                param.status = this.tabIndex2status();
            }
            if(this.num == 3){
                param.handleStatus = 3;
            }
            if(this.num == 2){
                param.flag = 1;
            }
            this.loadData(param);
        },
        tabIndex2status:function(){
            var status = -1;
                switch(this.num){
                case 0://全部订单
                status = -1;
                break;
                case 1://待审核 status = 1
                status = 1;
                break;
                case 2://待发货 status = 2
                status = 2;
                break;
                case 3://待收货 status =2 handleStatus = 3
                status = 2;
                break;
                case 4://审核未通过
                status = 0 ;
                break;
            }
            return status ;
        },
        orderDetailDialogCloseEvent(){
                this.resetOrderInfo();
        },
        setOrderInfo(response){
                this.detail.dataCard = response.body;
                this.detail.number = response.body[0].orderId;
                this.detail.statu = response.body[0].status;
                if (response.body[0].operate) {
                    this.detail.title = response.body[0].operate.split(",");
                }
                this.detail.receipt.addres = response.body[0].address;
                this.detail.receipt.zip = response.body[0].postalcode;
                this.detail.receipt.name = response.body[0].consignee;
                this.detail.receipt.tel = response.body[0].mobile;
        },
        resetOrderInfo(){
                this.detail.number = ''
                this.detail.statu = '';
                this.detail.title = '';
                this.detail.dataCard = [];
                this.detail.receipt.addres = '';
                this.detail.receipt.zip = '';
                this.detail.receipt.name = '';
                this.detail.receipt.tel = '';
        },
        showServiceDetail: function () {
                //填写表单信息

                this.$http.post(config.bdkSh, {
                    'requestId': this.detail.number
                }, {emulateJSON: true}).then(response => {
                        if (response.ok) {
                            this.dialogDetail.orderNum = response.body[0].requestId;
                            this.dialogDetail.orderDate = response.body[0].startTime;
                            this.dialogDetail.cardType = response.body[0].cardType;
                            this.dialogDetail.cardLeven = response.body[0].cardLeven;
                            this.dialogDetail.frequentncy = response.body[0].frequentncy;
                            this.dialogDetail.usageMode = response.body[0].usageMode;
                            this.dialogDetail.reportNumber = response.body[0].reportNumber;
                            this.dialogDetail.relations = response.body[0].relations;
                            this.dialogDetail.total = response.body[0].total;
                            this.dialogDetail.userName = response.body[0].userId;
                            this.dialogDetail.usageUnit = response.body[0].usageUnit;
                            this.dialogDetail.usageArea = response.body[0].usageArea;
                            this.dialogDetail.yt = response.body[0].content.split(",")[0];
                            this.dialogDetail.ytms = response.body[0].content.split(",")[1];
                            this.dialogDetail.reportFile = response.body[0].reportFile;
                            this.dialogDetail.contractFile = response.body[0].contractFile;
                            this.dialogDetail.aircraftFile = response.body[0].aircraftFile;

                            this.serviceDetailDialog = true;
                        } else {
                            this.dialogDetail.orderNum = '';
                            this.dialogDetail.orderDate = '';
                            this.dialogDetail.cardType = '';
                            this.dialogDetail.cardLeven = '';
                            this.dialogDetail.frequentncy = '';
                            this.dialogDetail.usageMode = '';
                            this.dialogDetail.reportNumber = '';
                            this.dialogDetail.relations = '';
                            this.dialogDetail.total = '';
                            this.dialogDetail.userName = '';
                            this.dialogDetail.usageUnit = '';
                            this.dialogDetail.usageArea = '';
                            this.dialogDetail.yt = [];
                            this.dialogDetail.ytms = [];
                            this.dialogDetail.reportFile = '';
                            this.dialogDetail.contractFile = '';
                            this.dialogDetail.aircraftFile = '';
                        }
                    },
                    response => {
                        console.log(response);
                    });

        },
        searchOrder(){
            //输入订单号进行搜索
            var param = {};
            param.orderId = this.allinput;
            this.loadData(param);
        },
        orderQuery(){
            //更多筛选条件
            var param = {};
            if(this.tabIndex2status() != -1){
                param.status = this.tabIndex2status();
            }
            if(this.num == 3){
                param.handleStatus = 3;
            }
            if(this.num == 2){
                param.flag = 1;
            }
            param.orderType = this.filterBeanForm.value;
            param.strTime = this.datePickerValue[0];
            param.endTime = this.datePickerValue[1];
            this.loadData(param);
        },
        orderDetail(item){
            this.$http.post(config.bdkDetail,{
                'orderId':item.orderId,
                'goodsId':item.goodsId,
                'addressId':item.addressId,
                'orderType':item.orderType
            },{emulateJSON:true}).then(response => {
                  if (response && response.body.length != 0) {
                        this.orderdetail = true;
                        this.setOrderInfo(response);
                    } else {
                        this.orderdetail = false;
                        this.$message.error('无效订单！');
                        this.resetOrderInfo();
                    }
            },response =>{
            
            })
        },
        confirmReceipt: function(item){

            this.$confirm('请收到货后再确认收货，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post(config.confirmReceipt ,{'orderId': item.orderId},{emulateJSON:true}).then(response => {
                    if(response){
                        this.$message.success('操作成功！');
                        this.loadPageData();
                    }else{
                        this.$message.error('操作失败！');
                    }
            });
          }).catch(() => {
          });
        },
        orderCancle(item){
            this.$confirm('确认取消订单？','提示',{
                cancelButtonText:'取消',
                confirmButtonText:'确定',
                type:'warning'
            })
            .then(_ => {
                this.$http.post(config.bdkDelete,{
                    'orderId':item.orderId
                },{emulateJSON:true}).then(response => {
                    if(response.body == true){
                        this.$message.success('取消成功！');
                        this.loadPageData();
                    }else{
                        this.$message.error('取消出错！');
                    }
                },response =>{
                    console.log(response); 
                })
            })
            .catch(_ => {});
        },
        handleSizeChange: function (size) {
            this.pageSize = size;
        },
        handleSizeChange1: function (size) {
            this.pagesize1 = size;
        },
        handleSizeChange2: function (size) {
            this.pagesize2 = size;
        },
        handleSizeChange3: function (size) {
            this.pagesize3 = size;
        },
        handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            var param = {};
            if(this.tabIndex2status() != -1){
                param.status = this.tabIndex2status();
            }
            if(this.num == 3){
                param.handleStatus = 3;
            }
            if(this.num == 2){
                param.flag = 1;
            }
            param.pageNum = this.currentPage;
            param.pageSize = this.pageSize;
            param.userId = this.userId;
            this.loadData(param);
        },
        handleCurrentChange1: function(currentPage){
            this.currentPage1 = currentPage;
            this.loadData1(currentPage,this.pagesize1);
        },
        handleCurrentChange2: function(currentPage){
            this.currentPage2 = currentPage;
            this.loadData2(currentPage,this.pagesize2);
        },
        handleCurrentChange3: function(currentPage){
            this.currentPage3 = currentPage;
            this.loadData3(currentPage,this.pagesize3);
        },
        loadData(param){

            this.$http.get(config.ordercommit,{params:param}).then(response => {
            if (response.ok) {
                //判断如果为用户搜索，list为空不更改界面
            if(("orderId" in param)||("orderType" in param)){
                if(response.body.list && response.body.list.length == 0){
                        this.$message.warning('暂无搜索记录！');
                        return;
                    }else{
                        //请求结果不为空，将顶部tab显示更改为全部订单
                        if("orderId" in param){
                        this.num = 0;
                    }
                    }
                }
                    response.body.list.forEach((dataTableTr, index) => {
                        dataTableTr.orderInfo = "加载中"
                        this.$http.post(config.bdkDetail, {
                            'goodsId': dataTableTr.goodsId,
                            'addressId': dataTableTr.addressId,
                            'orderType': dataTableTr.orderType,
                            'orderId': dataTableTr.orderId
                        }, {emulateJSON: true}).then(response => {
                            if (response.body.length != 0) {
                                dataTableTr.orderName = response.body[0].name;
                                dataTableTr.itemType = response.body[0].itemType;
                                dataTableTr.fullPrice = response.body[0].fullPrice;
                                dataTableTr.price = response.body[0].price;
                                dataTableTr.total = response.body[0].total;
                                dataTableTr.orderInfo = dataTableTr.orderName + 'x' + dataTableTr.total + '张';
                            } else {
                                dataTableTr.orderInfo = "无"
                            }
                        },
                        response => {
                            
                        });
                    });

                    this.dataTable = response.body.list;
                    this.pageCount = response.body.pages;
                    
                } else {
                    
                }
            },
            response => {
                this.$message.error('查询异常！');
            });               
        },
        loadData1(pageNum,pageSize1){  
            this.$http.post(config.ordercommit,{
                'pageNum':pageNum,
                'pageSize':pageSize1,
                'status':1
            },{emulateJSON:true}).then(response => {
                if (response.ok) {
                    this.dataTable1 = response.body.list;
                    this.totalCount1 = response.body.total;

                    this.goodsId = this.dataTable[0].goodsId;
                    this.addressId = this.dataTable[0].addressId;
                    this.orderType = this.dataTable[0].orderType;
                    this.orderId = this.dataTable[0].orderId;

                }else{
                    console.log(response);
                }
            },
            response => {
                this.$message.error('查询异常！');
            });               
        },
        loadData2(pageNum,pageSize2){
            this.$http.post(config.ordercommit,{
                'pageNum':pageNum,
                'pageSize':pageSize2,
                'status':2
            },{emulateJSON:true}).then(response => {
                if (response.ok) {
                    this.dataTable2 = response.body.list;
                    this.totalCount2 = response.body.total;

                    this.goodsId = this.dataTable[0].goodsId;
                    this.addressId = this.dataTable[0].addressId;
                    this.orderType = this.dataTable[0].orderType;
                    this.orderId = this.dataTable[0].orderId;
                }else{
                    console.log(response);
                }
            },
            response => {
                this.$message.error('查询异常！');
            });               
        },
        loadData3(pageNum,pageSize3){  
            this.$http.post(config.ordercommit,{
                'pageNum':pageNum,
                'pageSize':pageSize3,
                'status':3
            },{emulateJSON:true}).then(response => {
                if (response.ok) {
                    this.dataTable3 = response.body.list;
                    this.totalCount3 = response.body.total;

                    this.goodsId = this.dataTable[0].goodsId;
                    this.addressId = this.dataTable[0].addressId;
                    this.orderType = this.dataTable[0].orderType;
                    this.orderId = this.dataTable[0].orderId;

                }else{
                    console.log(response);
                }
            },
            response => {
                this.$message.error('查询异常！');
            });               
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .search-title{
                    padding:20px 43px 0;
                    background-color:#fff;
                    .el-button{
                        margin:0 0 30px 20px;
                        width:120px;
                        border-radius:0;
                        &:focus, &:hover{
                            color: #000;
                            border-color: $primaryColor;
                            background-color: #fff;
                        }
                    }
                    .selectinput>.el-input{
                        width:160px;
                    }
                }         
    .el-select-dropdown__item.selected {
        color: $primaryColor!important;
    }
    .el-select .el-input.is-focus .el-input__inner,
    .el-range-editor.is-active, .el-range-editor.is-active:hover,
    .el-input__inner:focus,
    .el-textarea__inner:focus{
        border-color:$primaryColor;
    }
    .el-button--primary {
        background-color: $primaryColor;
        border-color: $primaryColor;
    }
    .el-input__inner,
    .el-textarea__inner{
        border-radius:0;
    }
    .el-steps--vertical{
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
                    }
                }
            }
        }
    }
    .orderadmin{
        padding:30px;
        text-align: left;
        background-color:inherit;
        &>.tab{
            &>.tab-title {
                border-bottom:1px solid #E6E6E6;
                padding-left:20px;
                background-color:#fff;
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
                .ordernone{
                    text-align: center;
                    padding:220px 0;
                    background-color:#fff;
                    &>p{
                        padding:20px 0;
                        font-size:17px;
                    }
                }
                .searchTitle{
                    padding:20px 43px 0;
                    background-color:#fff;
                    .el-input{
                        width:250px;
                        margin:0 0 30px;
                        .el-input__suffix{
                            color:$primaryColor;
                            font-size:18px;
                            cursor: pointer;
                            .el-icon-search{
                                font-weight:bold;
                                width:30px;
                            }
                        }
                    }
                    .el-button{
                        margin:0 0 30px 20px;
                        width:120px;
                        border-radius:0;
                        &:focus, &:hover{
                            color: #000;
                            border-color: $primaryColor;
                            background-color: #fff;
                        }
                    }
                    .selectinput>.el-input{
                        width:160px;
                    }
                }
                .orderList{
                    margin-bottom:20px;
                    background-color:#fff;
                    .orderHead{
                        height:50px;
                        line-height:50px;
                        background-color:#E7F1FB;
                        border:1px solid #D7E0EA;
                        text-align: center;
                        font-weight:bold;
                        font-size:15px
                    }
                    .orderContent{
                        padding:35px 0 75px;
                        text-align: center;
                        font-size:15px;
                        .btn{
                            padding:5px 0;
                        }
                        span.ordericon{
                            cursor:pointer;
                            padding: 0 5px;
                            i{
                                font-size:16px;
                            }
                            &:hover{
                                color:$primaryColor;
                            }
                        }
                        
                    }
                }
                .el-pager{
                    color:#666;
                    li{
                        border:1px solid #D9D9D9;
                        border-radius:3px;
                        font-size:16px;
                        margin: 0 2px;
                        height:30px;
                        font-weight:normal;
                        min-width:30px;
                        &.active{
                            background-color:$primaryColor;
                            border: 1px solid $primaryColor;
                        }
                    }
                }
                .el-pagination{
                    text-align:center;
                    padding:40px 0 60px;
                    .btn-next,.btn-prev{
                        border:1px solid #D9D9D9;
                        border-radius:3px;
                        height:30px;
                        padding:0 10px;
                    }
                    .el-pagination__total{
                        font-size:16px;
                        margin-left:20px;
                    }
                    .el-pagination__jump{
                        height:30px;
                        height:30px;
                        font-size:16px;
                        .el-pagination__editor.el-input .el-input__inner{
                            height:30px;
                        }
                    }
                    
                }
            }
        }
        &>.el-dialog__wrapper{
            .el-dialog{
                width:620px;
                .el-dialog__header{
                    background-color:$primaryColor;
                    .el-dialog__title{
                        color:#fff;
                    }
                    .el-dialog__headerbtn{
                        .el-dialog__close{
                            color:#fff;
                        }
                    }
                }
                .el-dialog__body{
                    padding:30px 40px 0;
                }
                .el-dialog__footer{
                    text-align: center;
                    padding-bottom:25px;
                    .el-button{
                        padding:10px 20px;
                        border-radius:0;
                    }
                    .el-button--default{
                        border-color:$primaryColor;
                        &:hover{
                            color:$primaryColor;
                        }
                    }
                }
            }
        }
        .orderdetail{
            .el-dialog{
                width:50%!important;
                .el-dialog__body{
                    padding:30px;
                }
                .el-col{
                    padding:10px;
                    &.right{
                        text-align: right;
                    }
                    &.center{
                        text-align: center;
                    }
                    &.el-col-20{
                        border-left:1px solid $primaryColor;
                    }
                    .orderbottom>p{
                        padding-bottom:10px;
                        color:#606266;
                    }
                    .textsm{
                        margin-top:10px;
                        width:80%;
                    }
                }
            }
        }
        .borderPrimary{
            border:1px solid $primaryColor;
            border-top:0;
            &:nth-child(1){
                border-top:1px solid $primaryColor;
            }
            .imgfile{
                vertical-align: middle;
                width:100px;
                margin-left: 10px;
                cursor:pointer;
                border: 1px solid #909399;
            }
        }
        .cardDetail{
            font-size:16px;
            color:#333;
            padding-bottom:50px;
            p{
                span.statu{
                    color:$primaryColor;
                }
            }
            .cardTrack{
                padding:35px 0; 
            }
            .el-table{
                border:1px solid #D1D1D1;
            }
            .el-table thead{
                color:#000;
            }
            .el-table th,
            .el-table td,{
                text-align: center;
                padding:15px 0;
            }
            .el-table th{
                font-size:15px;
                background-color:#E7F1FB;
            }
            .el-table td{
                font-size:13px;
                .edit{
                    margin-top: -3px;
                    vertical-align: middle;
                    cursor:pointer;
                    color: $primaryColor;
                    font-size:16px;
                }
            }
            .receipt{
                margin-top:40px;
                p:not(.receiptMes){
                    margin:10px 0;
                }
                .receiptMes{
                    font-size:14px;
                    margin-left:80px;
                }
                .rtop{
                    margin-top:-34px;
                }
                .receiptRadio{
                    &>.el-radio{
                        display:block;
                        line-height:2;
                        &+.el-radio{
                            margin-left:0;
                        }
                    }
                }
            }
        }
    }
</style>