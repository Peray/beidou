<template>
    <div class="orderadmin">
        <div class="tab">
            <div class="tab-title clearfix">
                <span :class="{active:index == num}"
                      v-for="(item,index) in items" @click="tab(index)">
                    <a>{{item}}</a>
                </span>
            </div>
            <div class="tab-content">
                <div class="searchTitle">
                    <div>
                        <el-input placeholder="请输入订单编号进行搜索" v-model="allinput">
                            <i slot="suffix" class="el-input__icon el-icon-search" @click="searchOrder"></i>
                        </el-input>
                        <el-button @click="allShowing = !allShowing">筛选
                            <i class="el-icon-arrow-up el-icon--right" v-show="!allShowing"></i>
                            <i class="el-icon-arrow-down el-icon--right" v-show="allShowing"></i>
                        </el-button>

                        <el-collapse-transition>
                            <el-form status-icon :model="filterBeanForm" :inline="true" v-show="allShowing">
                                <el-form-item label="商品类型：" label-width='120'>
                                    <el-select v-model="filterBeanForm.value" class="selectinput">
                                        <el-option
                                            v-for="item in filterBeanForm.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="交易时间：" label-width='120'>
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
                <div v-show="num === 0">
                    <order-none v-if="dataTable.length == 0"></order-none>
                    <div class="orderList" v-for="item in dataTable">
                        <el-row class="orderHead">
                            <el-col :span="5">订单号</el-col>
                            <el-col :span="4">订单信息</el-col>
                            <el-col :span="5">订单状态</el-col>
                            <el-col :span="5">下单时间</el-col>
                            <el-col :span="5">操作</el-col>
                        </el-row>
                        <el-row class="orderContent">
                            <el-col :span="5">
                                <span @click="orderDetail(item)" class="ordericon">{{item.orderId}}</span>
                            </el-col>
                            <el-col :span="4">
                                <img v-if="itemType == 1" :src="bdkimg">
                                <span>{{item.orderInfo}}</span>
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
                            <el-col :span="5">{{item.startTime | formatDate}}</el-col>
                            <el-col :span="5">
                                <span class="ordericon"
                                      @click="orderExamine(item)"
                                      v-if="item.status == 1">
                                    <i class="el-icon-warning">审核</i>
                                </span>
                              <!--   <span class="ordericon"
                                      @click="addbdk(item.orderId)"
                                      v-if="item.status == 2">
                                    <i class="el-icon-plus">添加北斗卡</i>
                                </span> -->
                                <el-button type="primary" plain size="mini" @click="addbdk(item.orderId)"
                            v-if="item.status == 2" >添加北斗卡</el-button>

                                <span class="ordericon"
                                      v-if="item.status == 3">
                                    <el-button type="success" plain size="mini">已完成</el-button>
                                </span>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="block">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :background="true"
                            :current-page.sync="currentPage"
                            :page-size="pagesize"
                            layout="prev,pager,next,jumper,total"
                            :total="totalCount"
                            prev-text="上一页"
                            next-text="下一页">
                        </el-pagination>
                    </div>
                </div>
                <div v-show="num === 1">
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
                                <span @click="orderDetail(item)" class="ordericon">{{item.orderId}}</span>
                            </el-col>
                            <el-col :span="4">
                                <img v-if="itemType == 1" :src="bdkimg">
                                <span>{{item.orderInfo}}</span>
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
                            <el-col :span="5">{{item.startTime | formatDate}}</el-col>
                            <el-col :span="5">
                                <span class="ordericon"
                                      @click="orderExamine(item)"
                                      v-if="item.status == 1">
                                    <i class="el-icon-warning">审核</i>
                                </span>
                                <span class="ordericon"
                                      @click="addbdk(item.orderId)"
                                      v-if="item.status == 2">
                                    <i class="el-icon-plus">添加北斗卡</i>
                                </span>
                                <span class="ordericon"
                                      v-if="item.status == 3">
                                    <i class="el-icon-success">已完成</i>
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
                <div v-show="num === 2">
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
                                <span @click="orderDetail(item)" class="ordericon">{{item.orderId}}</span>
                            </el-col>
                            <el-col :span="4">
                                <img v-if="itemType == 1" :src="bdkimg">
                                <span>{{item.orderInfo}}</span>
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
                            <el-col :span="5">{{item.startTime | formatDate}}</el-col>
                            <el-col :span="5">
                                <span class="ordericon"
                                @click="orderExamine(item)"
                                v-if="item.status == 1">
                                <i class="el-icon-warning">审核</i>
                            </span>
                            <el-button type="primary" plain size="mini" @click="addbdk(item.orderId)"
                            v-if="item.status == 2 && item.orderType == 1" >添加北斗卡</el-button>
                            <el-button type="info" plain size="mini" @click="addExpress(item.orderId,item.emsOrder)"
                            v-if="item.status == 2 && (item.orderType == 1 || item.orderType == 2)">
                        添加快递单号</el-button>
                        <p></p>
                        <!-- <el-button type="text" v-if="item.status == 2 && (item.orderType == 1 || item.orderType == 2)" @click="markOrderSuccess(item.orderId)">
                            标记为已完成
                        </el-button> -->
                        <span class="ordericon"
                        v-if="item.status == 3">
                        <i class="el-icon-success">已完成</i>
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
                <div v-show="num === 3">
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
                                <span @click="orderDetail(item)" class="ordericon">{{item.orderId}}</span>
                            </el-col>
                            <el-col :span="4">
                                <img v-if="itemType == 1" :src="bdkimg">
                                <span>{{item.orderInfo}}</span>
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
                            <el-col :span="5">{{item.startTime | formatDate}}</el-col>
                            <el-col :span="5">
                                <el-button type="success" plain size="mini">已完成</el-button>
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
        <el-dialog title="订单审核" :visible.sync="orderexamine" top="30vh" class="orderdetail">

            <el-row class="borderPrimary">
                <el-col :span="12">申请编号：{{dialogDetail.orderNum}}</el-col>
                <el-col :span="12" class="right">申请时间：{{dialogDetail.orderDate | formatDate}}</el-col>
            </el-row>

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
                            <p>用户名称：{{dialogDetail.userName}}</p>
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
                            <!-- <span>监测报告</span> -->
                      <!--       <img class="imgfile" @click="big(adminimgfile+dialogDetail.reportFile)"
                       :src="adminimgfile+dialogDetail.reportFile"> -->
                       <el-button type="success" size="mini" @click="downloadFile(1)">监测报告
                        <i class="el-icon-download el-icon--right"></i>
                    </el-button>
                </el-col>
                <el-col :span="8">
                    <el-button type="success" size="mini" @click="downloadFile(2)">用户合同<i class="el-icon-download el-icon--right"></i></el-button>
                        <!--     <span>用户合同</span>
                            <img class="imgfile" @click="big(adminimgfile+dialogDetail.contractFile)"
                            :src="adminimgfile+dialogDetail.contractFile"> -->
                        </el-col>
                        <el-col :span="8">
                           <el-button type="success" size="mini" @click="downloadFile(3)">航空信息表<i class="el-icon-download el-icon--right"></i></el-button>
                     <!--        <span>航空器信息表</span>
                            <img class="imgfile" @click="big(adminimgfile+dialogDetail.aircraftFile)"
                            :src="adminimgfile+dialogDetail.aircraftFile"> -->

                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <el-row class="borderPrimary">
                <el-col :span="4" class="center">受理记录</el-col>
                <el-col :span="20">
                    受理记录：
                    <el-steps direction="vertical" :active="record.length">
                        <el-step :title="item" v-for="(item,index) in record" :key="index"></el-step>
                    </el-steps>
                </el-col>
            </el-row>

            <el-row class="borderPrimary">
                <el-col :span="4" class="center">操作</el-col>
                <el-col :span="20">
                    操作与说明：
                    <el-select v-model="dialogDetail.filterBeanForm.value">
                        <el-option
                            v-for="item in dialogDetail.filterBeanForm.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <div class="textsm" v-if="dialogDetail.filterBeanForm.value == 1">
                        <el-input type="textarea" v-model="dialogDetail.textarea" placeholder="请说明理由">
                        </el-input>
                    </div>
                </el-col>
            </el-row>

            <div slot="footer" class="dialog-footer">
                <el-button @click="orderexamine = false">取 消</el-button>
                <el-button type="primary" @click="submitSh">确 定</el-button>
            </div>
        </el-dialog>
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
        <el-dialog :visible.sync="dialogfile" size="tiny" class="dialogfile">
            <img width="100%" :src="dialogImageUrl">
        </el-dialog>
        <el-dialog title="添加北斗卡" :visible.sync="addBdkdialog" top="30vh" class="orderdetail"
                   @close="addBdCardDialogCloseEvent">
            <el-row class="borderPrimary">
                <el-col :span="4" class="center">
                    <span>订单信息</span>
                </el-col>
                <el-col :span="20">
                    <el-row>
                        <el-col :span="12" class="orderbottom">
                            <p>北斗卡类型：{{dialogAdd.cardType}}</p>
                            <p>通讯等级：{{dialogAdd.cardLeven}}</p>
                            <p>使用区域：{{dialogAdd.usageArea}}</p>
                            <p>数量：{{dialogAdd.total}}</p>
                        </el-col>   
                        <el-col :span="12" class="orderbottom">
                            <p>使用方式：{{dialogAdd.usageMode}}</p>
                            <p>服务频度：{{dialogAdd.frequentncy}}</p>
                            <p>订单ID：{{dialogAdd.orderId}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <el-row class="borderPrimary">
                <el-col :span="4" class="center">
                    <span>北斗卡信息</span>
                </el-col>
                <el-col :span="20">
                    <el-table :data="bdCardList" stripe>
                        <el-table-column label="北斗卡ID" prop="cardId">
                        </el-table-column>
                        <el-table-column label="频度" prop="frequentncy">
                        </el-table-column>
                        <el-table-column label="通拨号" prop="broadcostCode">
                        </el-table-column>
                        <el-table-column label="所属指挥卡" prop="parentCardId">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                            @size-change="handleSizeChangeBD"
                            @current-change="handleCurrentChangeBD"
                            :background="true"
                            :current-page.sync="currentPageBD"
                            :page-size="pageSizeBD"
                            layout="prev,pager,next,jumper,total"
                            :page-count="pageCountBD"
                            prev-text="上一页"
                            next-text="下一页">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>

            <el-row class="borderPrimary">
                <el-col :span="4" class="center">添加北斗卡</el-col>
                <el-col :span="20">
                    <el-row>
                        <el-input
                            v-model="addBdCardForm.startCardId"
                            placeholder="请输入起始北斗卡号"
                            style="width: 50%;margin:5px 0;">
                        </el-input>
                        <el-input-number v-model="addBdCardForm.num" @change="handleInputCardNum" 
                        :min="0" :max="dialogAdd.total - dialogAdd.cardSum < 0 ? 0:(dialogAdd.total - dialogAdd.cardSum)" size="mini" style="margin:5px 0;"></el-input-number>
                
                    </el-row>
                     <el-row>
                        <el-input
                            v-model="addBdCardForm.frequentncy"
                            placeholder="请输入频度"
                            style="width: 50%;margin:5px 0;">
                        </el-input>
                    </el-row>
                     <el-row>
                        <el-input
                            v-model="addBdCardForm.broadcostCode"
                            placeholder="请输入通拨号"
                            style="width: 50%;margin:5px 0;">
                        </el-input>
                    </el-row>
                     <el-row>
                        <el-input
                            v-model="addBdCardForm.parentCardId"
                            placeholder="请输入所属指挥卡"
                            style="width: 50%;margin:5px 0;">
                        </el-input>
                    </el-row>
                    <el-row>
                       <!--  <el-input
                            v-model="addBdCardForm.endCardId"
                            placeholder="请输入终止北斗卡号（批量添加）"
                            style="width: 50%;margin:5px 0;">
                        </el-input> -->

                    </el-row>
                    <el-row>
                        <el-button id="addBdCardButton" type="primary" size="mini" @click="addBdCardBatch">添加</el-button>
                        <span style="font-size: 12px; margin-left: 16px">还可添加&nbsp;<span style="color: red;font-weight:bold;font-size: 16px;">{{dialogAdd.total - dialogAdd.cardSum < 0 ? 0:(dialogAdd.total - dialogAdd.cardSum)}}</span>&nbsp;张北斗卡</span>
                    </el-row>
                </el-col>
            </el-row>

            <div slot="footer" class="dialog-footer" v-show="false">
                <el-button @click="addBdkdialog = false">取 消</el-button>
                <el-button type="primary" @click="addbdkSub">确 定</el-button>
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
                           <!--  <a :href=" resourceUrl + this.dialogDetail.reportFile">
                                <el-tag type="success">监测报告</el-tag>
                            </a> -->
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
        <el-dialog title="添加快递单号" :visible.sync="expressDialogVisible" top="30ch" class="orderdetail" @close="clearExpress">

            <el-input placeholder="请输入快递单号" v-model="express" style="margin-bottom: 30px">
            </el-input>
            <div slot="footer" style="text-align: center">
                <el-button @click="expressDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitExpress">确定</el-button>
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
        data() {
            return {
                noneimg: require('@/assets/img/admin/ordernone.png')
            }
        }
    }
    export default {
        name: 'orderadmin',
        components: {
            'orderNone': ordernone
        },
        data() {
            return {
                expressNumber: '',
                userInput: '',
                items: ['全部订单', '待审核', '待处理', '已完成'],
                num: 0,
                orderdetail: false,
                orderexamine: false,
                dialogfile: false,
                addBdkdialog: false,
                allinput: '',
                allShowing: false,
                orderName: '',
                itemType: '',
                fullPrice: '',
                price: '',
                bdkimg: require('@/assets/img/admin/icon2_normal.png'),
                bdk: [],
                tbh: [],
                zhk: [],
                filterBeanForm: {
                    value: '',
                    options: [
                        {
                            value: '1',
                            label: '北斗卡'
                        }, {
                            value: '2',
                            label: '硬件'
                        }, {
                            value: '3',
                            label: '增值服务'
                        }, {
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
                datePickerValue: '',
                dataTable: [],//当前页数据全部订单
                dataTable1: [],//当前页数据待审核
                dataTable2: [],
                dataTable3: [],
                currentPage: 1,//当前页
                currentPage1: 1,
                currentPage2: 1,
                currentPage3: 1,
                pagesize: 5,//每页条数
                pagesize1: 5,
                pagesize2: 5,
                pagesize3: 5,
                totalCount: 0,//总数全部订单
                totalCount1: 0,//总数待审核
                totalCount2: 0,
                totalCount3: 0,
                detail: {
                    number: '',
                    statu: '',
                    title: '',
                    dataCard: [],
                    receipt: {
                        addres: '',
                        zip: '',
                        name: '',
                        tel: '',
                        style: '第三方配送'
                    }
                },
                record: [],
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
                rowData: {},
                resourceUrl: config.imgsrc,
                dialogAdd: {
                    orderId: '',
                    cardType: '',
                    cardLeven: '',
                    cardSum:0,
                    frequentncy: '',
                    usageMode: '',
                    usageArea: '',
                    total:'',
                    value: [],
                    value1: [],
                    options: [{
                        value: '1',
                        label: '二代北斗卡'
                    }, {
                        value: '2',
                        label: '三代北斗卡'
                    }],
                    options1: [{
                        value: '1',
                        label: '4G'
                    }, {
                        value: '2',
                        label: '北斗定位'
                    }, {
                        value: '3',
                        label: '其他'
                    }],

                },
                orderId: '',
                goodsId: '',
                addressId: '',
                orderType: '',
                adminimgfile: '',
                dialogImageUrl: '',
                serviceDetailDialog: false,
                requestId: '',
                addBdCardForm: {
                    startCardId: '',
                    endCardId: '',
                    num:0,
                    frequentncy:'',
                    broadcostCode:'',
                    parentCardId:''
                },
                bdCardList: [],
                currentPageBD: 1,
                pageSizeBD: 5,
                pageCountBD: 0,
                expressDialogVisible: false,
                orderRowId: '',
                express: ''
            }
        },
        mounted: function () {
            this.loadData(this.currentPage, this.pagesize);
            this.adminimgfile = config.adminimgfile;
        },
        computed: {},
        methods: {
            markOrderSuccess: function(orderId){
                 this.$http.post(config.bdkReview, {
                        'orderId': orderId,
                        'status': 3,
                        'content': ''
                    }, {emulateJSON: true}).then(response => {
                        this.loadData(this.currentPage, this.pagesize);
                        this.loadData1(this.currentPage, this.pagesize1);
                        this.loadData2(this.currentPage, this.pagesize2);
                        this.loadData3(this.currentPage, this.pagesize3);
                    }, response => {
                    });
            },
            handleInputCardNum: function(val){},
            downloadFile: function(index){
                var fileUrl = '';
                switch(index){
                    case 1:
                    fileUrl = this.dialogDetail.reportFile;
                    break;
                    case 2:
                    fileUrl = this.dialogDetail.contractFile;
                    break;
                    case 3:
                    fileUrl = this.dialogDetail.aircraftFile
                    break;
                }
                this.downloadAction(fileUrl);
            },
               downloadAction: function (downloadFileUrl) {
                if(downloadFileUrl && downloadFileUrl.length == 0){
                    return;
                }
                var $eleForm = $("<form method='get'></form>");

                $eleForm.attr("action", downloadFileUrl);

                $(document.body).append($eleForm);

                //提交表单，实现下载
                $eleForm.submit();
            },
            addExpress: function (orderRowId,emsOrder) {
                this.express = emsOrder;
                this.orderRowId = orderRowId;
                this.expressDialogVisible = true;
            },
            clearExpress: function(){
                this.express = '';
            },
            //填写快递单号
            submitExpress: function () {
                if (this.express.length == 0) {
                    this.$message.warning('请填写快递单号!');
                    return;
                }

                this.$http.post(config.submitExpressNumber, {
                    'orderId': this.orderRowId,
                    'smsOrder': this.express
                }, {emulateJSON: true}).then(response => {
                    if (response.ok) {
                        this.expressDialogVisible = false;
                        this.loadData(this.currentPage, this.pagesize);
                        this.loadData1(this.currentPage, this.pagesize1);
                        this.loadData2(this.currentPage, this.pagesize2);
                        this.loadData3(this.currentPage, this.pagesize3);
                    }
                }, response => {
                })
            },
            addBdCardDialogCloseEvent: function () {
                this.addBdCardForm.startCardId = '';
                this.addBdCardForm.endCardId = '';
                this.addBdCardForm.num = 0;
                this.addBdCardForm.frequentncy = '';
                this.addBdCardForm.broadcostCode = '';
                this.addBdCardForm.parentCardId = '';
            },
            handleSizeChangeBD(size) {
                this.pageSizeBD = size;
            }
            ,
            handleCurrentChangeBD(currentPage) {
                this.currentPageBD = currentPage;
                //刷新信息
                //北斗卡信息
                var param = {};
                param.orderId = this.dialogAdd.orderId;
                param.pageNum = currentPage;
                param.pageSize = this.pageSizeBD;
                this.bdListUpdate(param);

            },
            //删除已添加的北斗卡
            handleDelete(index , row){
                console.log(row);
                var p = {};
                p.cardId = row.cardId;
                console.log(p);
                this.$http.get(config.deleteBdCardByCardId , {params: p}).then(response => {
                    console.log(response);
                    if(response.ok){
                        this.$message.success('删除成功！');
                        var param = {};
                        param.orderId = this.dialogAdd.orderId;
                        param.pageSize = this.pageSizeBD;
                        this.bdListUpdate(param);
                    }
                },
                response => {

                })
            },
            //请求北斗卡列表
            bdListUpdate: function (param) {
                this.$http.get(config.getBdCardListByOrderId, {params: param}).then(response => {
                        if (response.ok) {
                            
                            this.bdCardList = response.body.list;
                            this.dialogAdd.cardSum = response.body.total;
                            this.pageCountBD = response.body.pages;

                            // if(this.dialogAdd.cardSum >= this.dialogAdd.total){
                            //     document.getElementById("addBdCardButton").disabled = true;
                            //     // $('#addBdCardButton').attr('disabled',true);
                            // }else{
                            //     document.getElementById("addBdCardButton").disabled = false;
                            //     // $('#addBdCardButton').attr('disabled',false);
                            // }
                        
                        }
                    },
                    response => {
                        console.log(response);
                    });
            },
            inputExpressNumber: function () {
                this.expressNumber = this.userInput;
            },
            //批量添加北斗卡,添加之前先查询是否有重复的北斗卡，若存在则提示错误，终止添加
            addBdCardBatch: function () {

                if (this.addBdCardForm.startCardId.length == 0) {
                    this.$message.warning('请输入要添加的北斗卡ID！');
                    return;
                }

                 if (this.addBdCardForm.frequentncy.length == 0) {
                    this.$message.warning('请输入频度！');
                    return;
                }

                 if (this.addBdCardForm.broadcostCode.length == 0) {
                    this.$message.warning('请输入通拨号！');
                    return;
                }

                if (this.addBdCardForm.parentCardId.length == 0) {
                    this.$message.warning('请输入所属指挥卡号！');
                    return;
                }

                if(this.addBdCardForm.num == 0){
                    this.$message.warning('请选择要添加的北斗卡数量！');
                    return;
                }

                var num = this.addBdCardForm.num;

                // if (this.addBdCardForm.endCardId.length != 0) {
                //     var range = parseInt(this.addBdCardForm.endCardId) - parseInt(this.addBdCardForm.startCardId);
                //     if(range < 0){
                //         this.$message.error('终止北斗卡号必须大于起始北斗卡号！');
                //         return;
                //     }
                //     num = range + 1;
                // } else {
                //     num = 1;
                // }

                if(this.dialogAdd.cardSum + num > this.dialogAdd.total){
                    var message = '';
                    if(this.dialogAdd.total - this.dialogAdd.cardSum > 0){
                        message = '只能添加 '+(this.dialogAdd.total - this.dialogAdd.cardSum)+' 张北斗卡';
                    }else{
                        message = '北斗卡添加数量已达上限'
                    }
                  this.$message.error(message);
                  return;
              }


              var queryParam = {};
                queryParam.startId = this.addBdCardForm.startCardId;
                if (num == 1) {
                    queryParam.endId = this.addBdCardForm.startCardId;
                }else{
                    queryParam.endId = parseInt(this.addBdCardForm.startCardId) + (num - 1) + '';
                }

                this.$http.get(config.queryCardIdIsExist,{params: queryParam}).then(response =>{
                    if(response.ok){
                        if(response.body && response.body.length > 0){
                            this.$message.error('卡号：'+response.body.join(" ")+' 已存在！请重新添加卡号');
                            return;
                        }else{
                            this.commitBdCardInfo(num);
                        }
                    }
                },
                response =>{

                });
            },
            //提交北斗卡信息
            commitBdCardInfo(num){
                    var params = {
                    orderId: this.dialogAdd.orderId,
                    list: []
                };

                for (var i = 0; i < num; i++) {
                    let cardId = parseInt(this.addBdCardForm.startCardId) + i;
                    var oneList = {
                        cardId: cardId,
                        parentCardId: this.addBdCardForm.parentCardId,
                        broadcostCode: this.addBdCardForm.broadcostCode,
                        frequentncy: this.addBdCardForm.frequentncy,
                        cardVersion: '',
                        locationType: '',
                    };
                    params.list.push(oneList);
                }

                this.$http.post(config.bdkAdd, params).then(response => {
                        if (response.ok) {
                            this.$message.success('成功添加北斗卡！');
                            var param = {};
                            param.orderId = this.dialogAdd.orderId;
                            param.pageNum = 1;
                            param.pageSize = this.pageSizeBD;
                            this.bdListUpdate(param);
                        } else {
                            this.$message.error('添加错误！');
                        }
                    },
                    response => {
                    });
            },
            tab(index) {
                this.num = index;
                if (index == 0) {
                    this.loadData(this.currentPage, this.pagesize);
                } else if (index == 1) {
                    this.loadData1(this.currentPage1, this.pagesize1);
                } else if (index == 2) {
                    this.loadData2(this.currentPage2, this.pagesize2);
                } else if (index == 3) {
                    this.loadData3(this.currentPage3, this.pagesize3);
                }
            },
            searchOrder() {
                this.$http.post(config.ordercommit, {
                    "orderId": this.allinput
                }, {emulateJSON: true}).then(response => {
                    if (response.body.list.length != 0) {
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

                                        dataTableTr.orderInfo = dataTableTr.orderName + 'x' + (dataTableTr.fullPrice / dataTableTr.price) + '张';
                                    } else {
                                        dataTableTr.orderInfo = "无"
                                    }
                                },
                                response => {
                                    console.log(response);
                                });
                        })
                        this.dataTable = response.body.list;
                        this.dataTable1 = response.body.list;
                        this.dataTable2 = response.body.list;
                        this.dataTable3 = response.body.list;
                    } else {
                        this.$message.error('订单号不存在！');
                    }
                }, response => {
                    console.log(response);
                })
            },
            orderQuery() {
                if (this.num == 0) {
                    this.num = '';
                }
                this.$http.post(config.ordercommit, {
                    "status": this.num,
                    "orderType": this.filterBeanForm.value,
                    "strTime": this.datePickerValue[0],
                    "endTime": this.datePickerValue[1]
                }, {emulateJSON: true}).then(response => {
                    if (response.body.list.length != 0) {
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

                                        dataTableTr.orderInfo = dataTableTr.orderName + 'x' + (dataTableTr.fullPrice / dataTableTr.price) + '张';
                                    } else {
                                        dataTableTr.orderInfo = "无"
                                    }
                                },
                                response => {
                                    console.log(response);
                                });
                        })
                        this.dataTable = response.body.list;
                        this.dataTable1 = response.body.list;
                        this.dataTable2 = response.body.list;
                        this.dataTable3 = response.body.list;
                    } else {
                        this.$message.error('该时间段无记录！');
                    }
                }, response => {
                    console.log(response);
                })
            },
            orderExamine(item) {
                this.$http.post(config.bdkSh, {
                    'requestId': item.orderId
                }, {emulateJSON: true}).then(response => {
                        if (response.ok) {
                            this.orderexamine = true;
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

                this.$http.post(config.bdkDetail, {
                    'orderId': item.orderId,
                    'goodsId': item.goodsId,
                    'addressId': item.addressId,
                    'orderType': item.orderType
                }, {emulateJSON: true}).then(response => {
                    if (response.body.length !== 0) {
                        this.record = response.body[0].operate.split(',')
                    }
                }, response => {
                    console.log(response.status);
                })
            },
            addbdk(index) {
                //添加北斗卡 请求订单信息和订单中已添加的北斗卡信息
                this.addBdkdialog = true;

                //订单信息
                this.$http.post(config.bdkSh, {
                    'requestId': index
                }, {emulateJSON: true}).then(response => {
                        if (response.ok) {
                            this.dialogAdd.orderId = index;
                            this.dialogAdd.cardType = response.body[0].cardType;
                            this.dialogAdd.cardLeven = response.body[0].cardLeven;
                            this.dialogAdd.frequentncy = response.body[0].frequentncy;
                            this.dialogAdd.usageMode = response.body[0].usageMode;
                            this.dialogAdd.usageArea = response.body[0].usageArea;
                            this.dialogAdd.total = response.body[0].total;

                            //北斗卡信息
                            var param = {};
                            param.orderId = this.dialogAdd.orderId;
                            param.pageNum = 1;
                            param.pageSize = this.pageSizeBD;

                            this.bdListUpdate(param);

                        } else {
                            this.$message.error(response.body.message);
                        }
                    },
                    response => {
                    });
            },

            addbdkSub() {

                //为申请北斗卡订单添加北斗卡完成后更改订单状态
                this.addBdkdialog = false;
                this.$http.post(config.bdkReview, {
                    'orderId': this.dialogAdd.orderId,
                    'status': 'a',
                    'content': ''
                }, {emulateJSON: true}).then(response => {
                    this.loadData(this.currentPage, this.pagesize);
                    this.loadData1(this.currentPage, this.pagesize1);
                    this.loadData2(this.currentPage, this.pagesize2);
                    this.loadData3(this.currentPage, this.pagesize3);
                }, response => {
                    console.log(response.status);
                })

            },
            orderDetail(item) {
                this.$http.post(config.bdkDetail, {
                    'orderId': item.orderId,
                    'goodsId': item.goodsId,
                    'addressId': item.addressId,
                    'orderType': item.orderType
                }, {emulateJSON: true}).then(response => {
                    if (response && response.body.length != 0) {
                        this.orderdetail = true;
                        this.setOrderInfo(response);
                    } else {
                        this.orderdetail = false;
                        this.$message.error('无效订单！');
                        this.resetOrderInfo();
                    }
                }, response => {
                    console.log(response.status);
                });
                this.requestId = item.orderId;
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
            handleSizeChange: function (size) {
                this.pagesize = size;
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
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                this.loadData(currentPage, this.pagesize);
            },
            handleCurrentChange1: function (currentPage) {
                this.currentPage1 = currentPage;
                this.loadData1(currentPage, this.pagesize1);
            },
            handleCurrentChange2: function (currentPage) {
                this.currentPage2 = currentPage;
                this.loadData2(currentPage, this.pagesize2);
            },
            handleCurrentChange3: function (currentPage) {
                this.currentPage3 = currentPage;
                this.loadData3(currentPage, this.pagesize3);
            },
            loadData(pageNum, pageSize) {
                this.$http.post(config.ordercommit, {
                    'pageNum': pageNum,
                    'pageSize': pageSize
                }, {emulateJSON: true}).then(response => {
                        if (response.ok) {
                            //先请求订单列表，再逐个请求订单详细信息
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

                                            dataTableTr.orderInfo = dataTableTr.orderName + 'x' + response.body[0].total + '张';
                                        } else {
                                            dataTableTr.orderInfo = "无"
                                        }
                                    },
                                    response => {
                                        console.log(response);
                                    });
                            })
                            this.dataTable = response.body.list;
                            this.totalCount = response.body.total;
                        } else {
                            console.log(response);
                        }
                    },
                    response => {
                        this.$message.error('查询异常！');
                    });
            },
            loadData1(pageNum, pageSize1) {
                this.$http.post(config.ordercommit, {
                    'pageNum': pageNum,
                    'pageSize': pageSize1,
                    'status': 1
                }, {emulateJSON: true}).then(response => {
                        if (response.ok) {
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

                                            dataTableTr.orderInfo = dataTableTr.orderName + 'x' + response.body[0].total + '张';
                                        } else {
                                            dataTableTr.orderInfo = "无"
                                        }
                                    },
                                    response => {
                                        console.log(response);
                                    });
                            })
                            this.dataTable1 = response.body.list;
                            this.totalCount1 = response.body.total;
                        } else {
                            console.log(response);
                        }
                    },
                    response => {
                        this.$message.error('查询异常！');
                    });
            },
            loadData2(pageNum, pageSize2) {

                this.$http.post(config.ordercommit, {
                    'pageNum': pageNum,
                    'pageSize': pageSize2,
                    'status': 2
                }, {emulateJSON: true}).then(response => {
                        if (response.ok) {
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
                                            dataTableTr.orderInfo = dataTableTr.orderName + 'x' + response.body[0].total+ '张';
                                        } else {
                                            dataTableTr.orderInfo = "无"
                                        }
                                    },
                                    response => {
                                        console.log(response);
                                    });
                            })
                            this.dataTable2 = response.body.list;
                            this.totalCount2 = response.body.total;
                        }
                    },
                    response => {
                        this.$message.error('查询异常！');
                    });
            },
            loadData3(pageNum, pageSize3) {

                var dataLength = 0;
                var tableData = []

                this.$http.post(config.ordercommit , {
                    'pageNum':pageNum,
                    'pageSize': pageSize3,
                    'status': 3
                }, {emulateJSON: true}).then(response => {
                        if (response.ok) {
                            response.body.list.forEach((dataTableTr, index) => {
                                dataTableTr.orderInfo = "加载中";
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

                                            dataTableTr.orderInfo = dataTableTr.orderName + 'x' + response.body[0].total + '张';
                                        } else {
                                            dataTableTr.orderInfo = "无";
                                        }
                                    },
                                    response => {
                                        console.log(response);
                                    });
                            });
                            this.dataTable3 = response.body.list;
                            this.totalCount3 = response.body.total;
                            // if(response.body.list && response.body.list.length > 0 ){
                            // tableData.concat(response.body.list);      
                            // dataLength += response.body.total;                          
                            // }
                        } else {
                            console.log(response);
                        }
                    },
                    response => {
                        this.$message.error('查询异常！');
                    });

                // this.totalCount3 = dataLength;
                // this.dataTable3 = tableData;
            },
            submitSh() {
                if (this.dialogDetail.filterBeanForm.value == 1 && this.dialogDetail.textarea == '') {
                    this.$message.error('请说明退回理由！');
                } else {
                    var status = (this.dialogDetail.filterBeanForm.value == 1 ? 0 : 2); 

                    this.$http.post(config.bdkReview, {
                        'orderId': this.dialogDetail.orderNum,
                        'status': status,
                        'content': this.dialogDetail.textarea
                    }, {emulateJSON: true}).then(response => {
                        this.orderexamine = false;
                        this.loadData(this.currentPage, this.pagesize);
                        this.loadData1(this.currentPage, this.pagesize1);
                        this.loadData2(this.currentPage, this.pagesize2);
                        this.loadData3(this.currentPage, this.pagesize3);
                    }, response => {
                    });
                }
            },
            big(url) {
                this.dialogfile = true;
                this.dialogImageUrl = url;
            },
            showServiceDetail: function () {
                //填写表单信息

                this.$http.post(config.bdkSh, {
                    'requestId': this.requestId
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

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .el-select-dropdown__item.selected {
        color: $primaryColor !important;
    }

    .block {
        .el-pager {
            color: #666;
            li {
                border: 1px solid #D9D9D9;
                border-radius: 3px;
                font-size: 16px;
                margin: 0 2px;
                height: 30px;
                font-weight: normal;
                min-width: 30px;
            }
        }
        .el-pagination {
            text-align: center;
            padding: 10px 0;
            &.is-background .el-pager li.active {
                background-color: $primaryColor;
                border: 1px solid $primaryColor;
            }
            .btn-next, .btn-prev {
                border: 1px solid #D9D9D9;
                border-radius: 3px;
                height: 30px;
                padding: 0 10px;
            }
            .el-pagination__total {
                font-size: 16px;
                margin-left: 20px;
            }
            .el-pagination__jump {
                height: 30px;
                height: 30px;
                font-size: 16px;
                .el-pagination__editor.el-input .el-input__inner {
                    height: 30px;
                }
            }

        }
    }

    .el-select .el-input.is-focus .el-input__inner,
    .el-range-editor.is-active, .el-range-editor.is-active:hover,
    .el-input__inner:focus,
    .el-textarea__inner:focus {
        border-color: $primaryColor;
    }

    .el-button--primary {
        background-color: $primaryColor;
        border-color: $primaryColor;
    }

    .el-input__inner,
    .el-textarea__inner {
        border-radius: 0;
    }

    .el-steps--vertical {
        padding: 10px 0;
        .el-step {
            .el-step__head {
                .el-step__line {

                }
                &.is-finish {
                    color: $primaryColor;
                    border-color: $primaryColor;
                }
            }
            .el-step__main {
                .el-step__title {
                    font-size: 15px;
                    &.is-finish {
                        color: $primaryColor;
                    }
                }
            }
        }
    }

    .orderadmin {
        padding: 30px;
        text-align: left;
        background-color: inherit;
        & > .tab {
            & > .tab-title {
                border-bottom: 1px solid #E6E6E6;
                padding-left: 20px;
                background-color: #fff;
                span {
                    display: inline-block;
                    padding: 15px 20px 0;
                    cursor: pointer;
                    &.active {
                        a {
                            border-bottom: 2px solid $primaryColor;
                            color: $primaryColor;
                        }
                    }
                    a {
                        display: inline-block;
                        font-size: 16px;
                        color: #999;
                        border-bottom: 2px solid #fff;
                        padding: 0 3px 15px;
                    }
                }
                &.clearfix:after {
                    display: table;
                    content: " ";
                    clear: both;
                }
                &.clearfix {
                    *zoom: 1;
                }
            }
            & > .tab-content {
                .ordernone {
                    text-align: center;
                    padding: 220px 0;
                    background-color: #fff;
                    & > p {
                        padding: 20px 0;
                        font-size: 17px;
                    }
                }
                .searchTitle {
                    padding: 20px 43px 0;
                    background-color: #fff;
                    .el-input {
                        width: 250px;
                        margin: 0 0 30px;
                        .el-input__suffix {
                            color: $primaryColor;
                            font-size: 18px;
                            cursor: pointer;
                            .el-icon-search {
                                font-weight: bold;
                                width: 30px;
                            }
                        }
                    }
                    .el-button {
                        margin: 0 0 30px 20px;
                        width: 120px;
                        border-radius: 0;
                        &:focus, &:hover {
                            color: #000;
                            border-color: $primaryColor;
                            background-color: #fff;
                        }
                    }
                    .selectinput > .el-input {
                        width: 160px;
                    }
                }
                .orderList {
                    margin-bottom: 20px;
                    background-color: #fff;
                    .orderHead {
                        height: 50px;
                        line-height: 50px;
                        background-color: #E7F1FB;
                        border: 1px solid #D7E0EA;
                        text-align: center;
                        font-weight: bold;
                        font-size: 15px;
                    }
                    .orderContent {
                        padding: 35px 0 75px;
                        text-align: center;
                        font-size: 15px;
                        .btn {
                            padding: 5px 0;
                        }
                        span.ordericon {
                            cursor: pointer;
                            padding: 0 5px;
                            i {
                                font-size: 16px;
                            }
                            &:hover {
                                color: $primaryColor;
                            }
                        }

                    }
                }
                .el-pager {
                    color: #666;
                    li {
                        border: 1px solid #D9D9D9;
                        border-radius: 3px;
                        font-size: 16px;
                        margin: 0 2px;
                        height: 30px;
                        font-weight: normal;
                        min-width: 30px;
                        &.active {
                            background-color: $primaryColor;
                            border: 1px solid $primaryColor;
                        }
                    }
                }
                .el-pagination {
                    text-align: center;
                    padding: 40px 0 60px;
                    .btn-next, .btn-prev {
                        border: 1px solid #D9D9D9;
                        border-radius: 3px;
                        height: 30px;
                        padding: 0 10px;
                    }
                    .el-pagination__total {
                        font-size: 16px;
                        margin-left: 20px;
                    }
                    .el-pagination__jump {
                        height: 30px;
                        height: 30px;
                        font-size: 16px;
                        .el-pagination__editor.el-input .el-input__inner {
                            height: 30px;
                        }
                    }

                }
            }
        }
        & > .el-dialog__wrapper:not(.dialogfile) {
            .el-dialog {
                width: 620px;
                .el-dialog__header {
                    background-color: $primaryColor;
                    .el-dialog__title {
                        color: #fff;
                    }
                    .el-dialog__headerbtn {
                        .el-dialog__close {
                            color: #fff;
                        }
                    }
                }
                .el-dialog__body {
                    padding: 30px 40px 0;
                }
                .el-dialog__footer {
                    text-align: center;
                    padding-bottom: 25px;
                    .el-button {
                        padding: 10px 20px;
                        border-radius: 0;
                    }
                    .el-button--default {
                        border-color: $primaryColor;
                        &:hover {
                            color: $primaryColor;
                        }
                    }
                }
            }
        }
        .orderdetail {
            .el-dialog {
                width: 50% !important;
                .el-dialog__body {
                    padding: 30px;
                }
                .el-col {
                    padding: 10px;
                    &.right {
                        text-align: right;
                    }
                    &.center {
                        text-align: center;
                    }
                    &.el-col-20 {
                        border-left: 1px solid $primaryColor;
                    }
                    .orderbottom > p {
                        padding-bottom: 10px;
                        color: #606266;
                    }
                    .textsm {
                        margin-top: 10px;
                        width: 80%;
                    }
                }
            }
        }
        .borderPrimary {
            border: 1px solid $primaryColor;
            border-top: 0;
            &:nth-child(1) {
                border-top: 1px solid $primaryColor;
            }
            .imgfile {
                vertical-align: middle;
                width: 100px;
                margin-left: 10px;
                cursor: pointer;
                border: 1px solid #909399;
            }
        }
        .cardDetail {
            font-size: 16px;
            color: #333;
            padding-bottom: 50px;
            p {
                span.statu {
                    color: $primaryColor;
                }
            }
            .cardTrack {
                padding: 35px 0;
            }
            .el-table {
                border: 1px solid #D1D1D1;
            }
            .el-table thead {
                color: #000;
            }
            .el-table th,
            .el-table td, {
                text-align: center;
                padding: 15px 0;
            }
            .el-table th {
                font-size: 15px;
                background-color: #E7F1FB;
            }
            .el-table td {
                font-size: 13px;
                .edit {
                    margin-top: -3px;
                    vertical-align: middle;
                    cursor: pointer;
                    color: $primaryColor;
                    font-size: 16px;
                }
            }
            .receipt {
                margin-top: 40px;
                p:not(.receiptMes) {
                    margin: 10px 0;
                }
                .receiptMes {
                    font-size: 14px;
                    margin-left: 80px;
                }
                .rtop {
                    margin-top: -34px;
                }
                .receiptRadio {
                    & > .el-radio {
                        display: block;
                        line-height: 2;
                        & + .el-radio {
                            margin-left: 0;
                        }
                    }
                }
            }
        }
    }
</style>
