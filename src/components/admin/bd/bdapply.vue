<template>
    <div class="bdapply">
        <div class="tab">
            <div class="tab-title clearfix">
                <span :class="{active:index == num}"
                      v-for="(item,index) in items" @click="tab(index)">
                    <a>{{item}}</a>
                </span>
            </div>
            <div class="tab-content">
                <div v-show="num === 0" class="step">
                    <el-row v-for="(item,index) in steps" :key="index">
                        <el-col :span="4" class="title">
                            <span>{{index+1}}</span>
                            {{item.name}}
                        </el-col>
                        <el-col :span="20" class="detail">
                            <div v-if="(index==0)|| (index == 1)  || (index == 3)">
                                <span>{{item.detail.name}}</span>
                                <p class="userapply" v-for="(list,subIndex) in item.detail.list">
                                    {{list.name}}
                                    <el-button v-if="index == 0 && (subIndex == 2 | subIndex ==  3)"
                                    style="margin-left: 10px;" size="normal" type="text"
                                    @click="downloadTemplate">模板下载
                                </el-button>
                            </p>
                        </div>
                        <div v-else-if="index == 4">
                                <span>{{item.detail.name}}</span>
                                <p class="ups">{{item.detail.ups}}</p>
                            </div>
                            <div v-else-if="(index == 2)||(index == 5)">{{item.detail}}</div>
                        </el-col>
                    </el-row>
                </div>
                <div v-show="num === 1" class="cardapply">
                    <el-form :model="ruleForm" class="demo-ruleForm" ref="ruleForm" status-icon :rules="rules">
                        <el-row v-loading="loading" style="padding: 50px 0;">
                            <el-col :offset="2" :span="12">
                                <el-form-item :label-width="formLabelWidth" label="北斗卡类型：" prop="activeName">
                                    <!--<el-radio v-model="ruleForm.activeName" label="民用普通卡" border></el-radio>-->
                                    <!--<el-radio v-model="ruleForm.activeName" label="民用指挥卡" border></el-radio>-->
                                    <el-radio-group v-model="ruleForm.activeName" @change="bdCardTypeChangeEvent">
                                        <el-radio :label="item" border v-for="(item , index) in bdCardType"
                                                  :key="index">
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item :label-width="formLabelWidth" label="通讯等级：" prop="grade">
                                    <el-radio v-model="ruleForm.grade" label="一级" border>
                                    </el-radio>
                                    <el-radio v-model="ruleForm.grade" label="二级" border>
                                    </el-radio>
                                    <el-radio v-model="ruleForm.grade" label="三级" border>
                                    </el-radio>
                                    <el-radio v-model="ruleForm.grade" label="四级" border>
                                    </el-radio>
                                </el-form-item>
                                <el-form-item :label-width="formLabelWidth" label="服务频度：" prop="freq">
                                    <!--<el-radio v-model="ruleForm.freq" label="30s" border></el-radio>-->
                                    <!--<el-radio v-model="ruleForm.freq" label="60s" border></el-radio>-->
                                    <el-radio-group v-if="ruleForm.activeName == '民用普通卡'" v-model="ruleForm.freq">
                                        <el-radio label="30s" border>
                                        </el-radio>
                                        <el-radio label="60s" border>
                                        </el-radio>
                                    </el-radio-group>
                                    <el-radio-group v-model="ruleForm.freq" v-else>
                                        <el-radio label="50s" border>
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item :label-width="formLabelWidth" label="是否建立通播关系：" prop="ship">
                                    <el-select v-model="ruleForm.ship">
                                        <el-option label="是" value="1">
                                        </el-option>
                                        <el-option label="否" value="2">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item :label-width="formLabelWidth" label="测试报告编号：" prop="serial">
                                    <el-input type="text"
                                              v-model.number="ruleForm.serial"
                                              auto-complete="off"
                                              placeholder="请填写八位序列号号段">
                                    </el-input>
                                </el-form-item>
                                <el-form-item :label-width="formLabelWidth" label="检测报告：" prop="report">
                                    <el-upload
                                        class="upload-demo"
                                        action=""
                                        :auto-upload="false"
                                        :on-change="handleChange1"
                                        :file-list="ruleForm.fileList1"
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        accept="application/pdf"
                                    >
                                        <el-button size="small" type="primary" slot="trigger">点击上传</el-button>
                                        <span style="margin-left: 10px" class="el-upload__tip">{{uploadFileTip}}</span>

                                    </el-upload>
                                </el-form-item>
                                <el-form-item :label-width="formLabelWidth" label="用户合同：" prop="report">
                                    <el-upload
                                        class="upload-demo"
                                        action=""
                                        :auto-upload="false"
                                        :on-change="handleChange2"
                                        :file-list="ruleForm.fileList2"
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        accept="application/pdf"
                                    >
                                        <el-button size="small" type="primary" slot="trigger">点击上传</el-button>
                                        <span style="margin-left: 10px" class="el-upload__tip">{{uploadFileTip}}</span>


                                    </el-upload>
                                </el-form-item>
                                <el-form-item :label-width="formLabelWidth" label="航空器信息表：" prop="report">
                                    <el-upload
                                        ref="upload"
                                        class="upload-demo"
                                        action=""
                                        :auto-upload="false"
                                        :on-change="handleChange3"
                                        :file-list="ruleForm.fileList3"
                                        :limit="1"
                                        :on-exceed="handleExceed"
                                        accept="application/pdf"
                                    >
                                        <el-button size="small" type="primary" slot="trigger">点击上传</el-button>
                                        <el-button style="margin-left: 10px;" size="mini" type="success"
                                                   @click="downloadTemplate">点击下载模板
                                        </el-button>
                                          <span style="margin-left: 10px" class="el-upload__tip">
                                            （普通用途不必上传）
                                        </span>
                                        <div slot="tip" class="el-upload__tip">{{uploadFileTip}}</div>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item :label-width="formLabelWidth" label="使用区域：" prop="useArea">
                                    <el-radio v-model="ruleForm.useArea" label="国内" border></el-radio>
                                </el-form-item>
                                <el-form-item :label-width="formLabelWidth" label="使用方式：" prop="userMode">
                                    <el-radio v-model="ruleForm.userMode" label="定位" border>
                                    </el-radio>
                                    <el-radio v-model="ruleForm.userMode" label="定时" border>
                                    </el-radio>
                                    <el-radio v-model="ruleForm.userMode" label="通信" border>
                                    </el-radio>
                                </el-form-item>
                                <el-form-item :label-width="formLabelWidth" label="使用单位：" prop="unit">
                                    <el-input type="text"
                                              v-model="ruleForm.unit"
                                              auto-complete="off"
                                              placeholder="请填写公司名称">
                                    </el-input>
                                </el-form-item>
                                <el-form-item :label-width="formLabelWidth" label="用途：" prop="purpose">
                                    <el-radio-group v-model="ruleForm.purpose" @change="bdCardPurposeChangeEvent">
                                        <el-radio label="航空用途" border>
                                        </el-radio>
                                        <el-radio label="普通用途" border>
                                        </el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item :label-width="formLabelWidth" label="" prop="editpurpose">
                                    <el-input type="textarea" v-model="ruleForm.editpurpose"
                                              placeholder="请填写用途">
                                    </el-input>
                                </el-form-item>
                                <el-form-item :label-width="formLabelWidth" label="运营费：" prop="num">
                                    <el-button type="text">{{operatingExpenses}}元/年</el-button>
                                </el-form-item>
                                <el-form-item :label-width="formLabelWidth" label="申请数量：" prop="num">
                                    <el-input-number v-model="ruleForm.num" :min="1" :max="10">
                                    </el-input-number>
                                    <span class="price">{{ruleForm.price}}元/张</span>
                                </el-form-item>
                                <el-form-item label="使用期限：" :label-width="formLabelWidth">
                                    <el-button type="text">{{useLife}}年</el-button>
                                </el-form-item>
                                <el-form-item>
                                    <p class="totalprice">
                                        <span>总价：{{totalprice | rmb}}元</span>
                                    </p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-form-item style="text-align:center;">
                                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                            </el-form-item>
                        </el-row>
                    </el-form>
                </div>
                <div v-show="num === 2" class="cardRecord">
                    <template>
                        <el-table
                            ref="multipleTable"
                            :data="dataTable"
                            @selection-change="handleSelectionChange">

                            <el-table-column label="序号" width="150">
                                <template slot-scope="scope">
                                    <span>{{scope.$index+1}}</span>
                                </template>
                            </el-table-column>

                            <!-- <el-table-column prop="id" label="申请ID"></el-table-column> -->

                            <el-table-column label="申请时间">
                                <template slot-scope="scope">
                                    <span>{{scope.row.startTime | formatDate}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column label="申请内容">
                                <template slot-scope="scope">
                                    <span>{{scope.row.cardType}}</span>
                                    <span>{{scope.row.total}}张</span>
                                    <i class="edit el-icon-tickets"
                                       @click="handleEdit(scope.$index,scope.row)"></i>
                                </template>
                            </el-table-column>

                            <el-table-column label="状态">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.status == 1">申请</span>
                                    <span v-else-if="scope.row.status == 2">受理</span>
                                    <span v-else-if="scope.row.status == 3">完成</span>
                                    <span v-else-if="scope.row.status == 0">退回</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
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
            </div>
        </div>
        <el-dialog title="详情" :visible.sync="dialogFormVisible" top="30vh">
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
                        <el-step :title="item" v-for="(item,index) in detail.title" :key="index">
                        </el-step>
                    </el-steps>
                </div>
                <template>
                    <el-table ref="multipleTable" :data="detail.dataCard">

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
                    <p class="receiptMes rtop">收货地址：{{detail.receipt.address}}</p>
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

        <!-- <el-dialog title="详情" :visible.sync="increment" top="30vh">
            <div class="cardDetail">
                <p>订单号：{{detail.number}}</p>
                <p>订单状态：<span class="statu">{{detail.statu}}</span></p>
                <div class="cardTrack">
                    <p>订单跟踪</p>
                    <el-steps direction="vertical" :active="1" process-status="finish" finish-status="process">
                        <el-step title="2018-12-02 09:00 订单创建成功"></el-step>
                        <el-step title="2018-12-02 09:00 已发货"></el-step>
                        <el-step title="2018-12-02 09:00 完成订单"></el-step>
                    </el-steps>
                </div>
                <template>
                    <el-table ref="multipleTable" :data="detail.incretable">

                        <el-table-column prop="incre" label="增值服务"></el-table-column>

                        <el-table-column label="短信包(条)">
                            <template slot-scope="scope">
                                <span>{{scope.row.mess}}条</span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="num" label="数量"></el-table-column>

                        <el-table-column prop="price" label="价格"></el-table-column>

                    </el-table>
                </template>
                <div class="receipt">
                    <p>收货信息</p>
                    <p class="receiptMes rtop">收货地址：无</p>
                </div>
                <div class="receipt">
                    <p>配送方式</p>
                    <p class="receiptMes rtop">配送方式：无</p>
                </div>
            </div>
        </el-dialog> -->

        <el-dialog title="提交订单" :visible.sync="orderSubmit" top="30vh">
            <div class="cardDetail">
                <p>订单号：{{orderId}}</p>
                <p>订单状态：<span class="statu">待提交</span></p>
                <div style="padding:20px 0 0;">
                    <el-table ref="multipleTable" :data="detail.orderSubmit">
                        <el-table-column prop="orderId" label="订单编号"></el-table-column>
                        <el-table-column label="订单类型">
                            <template slot-scope="scope">
                                <span v-if="scope.row.orderType == 1">北斗卡申请</span>
                                <span v-if="scope.row.orderType == 3">增值服务</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="下单时间">
                            <template slot-scope="scope">
                                <span>{{scope.row.createTime | formatDate}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品总价">
                            <template slot-scope="scope">
                                <span>{{scope.row.fullPrice | rmb}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="userName" label="购买人"></el-table-column>
                    </el-table>
                </div>
                <div class="receipt">
                    <p>收货信息</p>
                    <div class="receiptRadio">
                        <el-radio v-model="detail.receiptRadio" :label="item.id"
                                  v-for="(item,index) in detail.adressinfo" :key="index">
                            <span>{{item.consignee}}</span>&nbsp;
                            <span>{{item.region}}</span>&nbsp;
                            <span>{{item.detailAddress}},</span>&nbsp;
                            <span>{{item.mobile}}</span>&nbsp;
                            <!-- <span>{{item.telephone}},</span>&nbsp; -->
                            <span>{{item.email}}</span>&nbsp;
                        </el-radio>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="orderCancle(orderId)">取 消</el-button>
                <el-button type="primary" @click="order(detail.receiptRadio)">确 定</el-button>
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
                            <a :href=" resourceUrl + this.dialogDetail.reportFile">
                                <el-tag type="success">监测报告</el-tag>
                            </a>
                        </el-col>
                        <el-col :span="8">
                            <a :href=" resourceUrl + this.dialogDetail.reportFile">
                                <el-tag type="success">用户合同</el-tag>
                            </a>


                        </el-col>
                        <el-col :span="8">
                            <a :href=" resourceUrl + this.dialogDetail.reportFile">
                                <el-tag type="success">航空器信息表</el-tag>
                            </a>

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
    import {isvalidNumber} from '@/assets/js/validate/validate.js'
    import ElRadioGroup from "element-ui/packages/radio/src/radio-group";

    export default {
        components: {ElRadioGroup},
        name: 'bdapply',
        data() {
            var validateSerial = (rule, value, callback) => {
                if (value === "" || value === undefined) {
                    callback(new Error('请填写八位序列号号段'));
                } else {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数值类型'));
                    } else {
                        if (!isvalidNumber(value)) {
                            callback(new Error('数值不为8位'));
                        }
                        callback()
                    }
                }
            };
            return {
                items: ['步骤说明', '北斗卡申请', '申请记录'],
                num: 0,
                orderId: '',
                loading: false,
                ruleForm: {
                    activeName: '民用普通卡',
                    useArea: '国内',
                    grade: '三级',
                    userMode: '定位',
                    freq: '30s',
                    unit: '',
                    ship: '是',
                    purpose: '航空用途',
                    serial: 12345678,
                    editpurpose: '',
                    fileList1: [],
                    fileList2: [],
                    fileList3: [],
                    num: 1,
                    price: 300
                },
                detail: {
                    number: '',
                    statu: '',
                    title: '',
                    dataCard: [
                        {
                            name: '',
                            itemType: '',
                            price: '',
                            total: 0,
                            fullPrice: 0
                        }
                    ],
                    incretable: [
                        {
                            incre: '短信互通业务',
                            mess: 2000,
                            num: 1,
                            price: 200
                        }
                    ],
                    orderSubmit: [],
                    adressinfo: [],
                    receiptRadio: 0,
                    receipt: {
                        address: '',
                        zip: '',
                        name: '',
                        tel: '',
                        style: '第三方配送'
                    }
                },
                formLabelWidth: '138px',
                multipleSelection: [],
                dialogFormVisible: false,
                orderSubmit: false,
                rules: {
                    serial: [
                        {validator: validateSerial, trigger: 'blur'}
                    ],
                    editpurpose: [
                        {required: true, message: '请填写用途', trigger: 'blur'}
                    ],
                    unit: [
                        {required: true, message: '请填写公司名称', trigger: 'blur'}
                    ]
                },
                steps: [
                    {
                        name: '用户申请',
                        detail: {
                            name: '通过本系统的北斗卡申请入口，在线向我方提出北斗导航民用用户卡的申请，除填写申请页面必要的信息之外，需要提前准备如下材料：',
                            list: [
                                {
                                    name: '一、北斗用户终端设备检测报告复印件（联系北斗终端厂商提供）'
                                },
                                {
                                    name: '二、与最终用户签订的项目合同复印件'
                                },
                                {
                                    name: '三、加装北斗用户终端设备的航空器基本信息表'
                                },
                                {
                                    name: '四、北斗卫星应用入网服务合同初稿'
                                },
                                {
                                    name: '五、其他材料'
                                }
                            ]
                        }
                    },
                    {
                        name: '资料审核',
                        detail: {
                            name: '我方在收到申请之后的5个工作日内对用户申请材料进行审核',
                            list: [
                                {
                                    name: '一、对于材料不齐全或者不符合要求的，予以退回，通知申请人一次补正所有内容。'
                                },
                                {
                                    name: '二、对于材料通过审核的，申请单位与我方签订北斗卫星应用入网服务合同，可通过邮寄或者上门办理的方式完成。'
                                }
                            ]
                        }
                    },
                    {
                        name: '申办北斗卡',
                        detail: '我方在合同签署完成之日起10个工作日内向中国卫星导航定位应用管理中心提交用户入网注册申请，申请受理并通过审批后，由卫星导航定位总站按照中国卫星导航定位应用管理中心的业务流程开展用户入网、注册和办卡等工作。'
                    },
                    {
                        name: '关联航空器',
                        detail: {
                            name: '北斗卡办理完成后5个工作日内，我方向申请人下发北斗用户卡与航空器关联信息表，告知用户北斗卡ID与航空器机尾号的默认的关联关系。',
                            list: [
                                {
                                    name: '一、航科院根据航空器信息表对航空器和北斗卡进行初始关联'
                                }, {
                                    name: '二、用户收到北斗卡后，根据实际使用情况，可在线进行关联变更，确保登记信息与实际使用的关联关系保持一致'
                                }
                            ]
                        }
                    },
                    {
                        name: '发往客户',
                        detail: {
                            name: '我方将北斗卡发往客户',
                            ups: '(快递公司：顺丰，圆通.....)'
                        }
                    },
                    {
                        name: '完成订单',
                        detail: '双方确认订单完成'
                    }
                ],
                dataTable: [],//当前页数据
                currentPage: 1,//当前页
                pagesize: 10,//每页条数
                totalCount: 0,//总数
                bdrecord: [],
                bdCardType: ['民用普通卡', '民用指挥卡'],
                uploadFileTip: '多个文件请合成为一个PDF文件，文件大小10M以内',
                downloadFileUrl: config.downloadFileUrl,
                operatingExpenses: 0,
                useLife: 1,
                serviceDetailDialog: false,
                dialogDetail: {
                    cardType: '',
                    reportNumber: '',
                    cardLeven: '',
                    relations: '',
                    frequentncy: '',
                    total: 0,
                    usageMode: '',
                    yt: '',
                    ytms: '',
                    usageUnit: '',
                    usageArea: '',

                    aircraftFile: '',
                    contractFile: '',
                    reportFile: ''
                },
                rowData: {},
                resourceUrl: config.imgsrc
            }
        },
        mounted: function () {
            this.loadData(this.currentPage);
        },
        created: function () {

        },
        computed: {
            totalprice() {
                return this.ruleForm.num * (this.ruleForm.price + this.operatingExpenses);
            },
            UserId() {
                return this.$store.state.LoginedUser.id
            }
        },
        methods: {
            //请求用户的申请记录列表
            loadData(pageNum) {
                this.$http.post(config.bdklist, {
                    'userId': this.UserId,
                    'pageNum': pageNum
                }, {emulateJSON: true}).then(response => {
                        if (response.ok) {
                            this.dataTable = response.body.list;
                            this.totalCount = response.body.total;
                        } else {
                        }
                    },
                    response => {
                    });
            },
            tab(index) {
                this.num = index
            },
            handleChange1(file, fileList) {
                this.ruleForm.fileList1 = fileList;
            },
            handleChange2(file, fileList) {
                this.ruleForm.fileList2 = fileList;
            },
            handleChange3(file, fileList) {
                this.ruleForm.fileList3 = fileList;
            },
            handleBeforeUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                // const isPNG = file.type === 'image/png';
                // const isLt5M = file.size / 1024 / 1024 < 5;

                // if (isJPG || isPNG) {
                //     if (!isLt5M) {
                //         this.$message.error('上传图片大小不能超过 5MB');
                //     }
                // } else {
                //     this.$message.error('上传图片只能是JPG格式或PNG!');
                // }
                // return (isJPG || isPNG) && isLt5M;

                const isPDF = file.type === 'application/pdf';
                const isLt10M = file.size / 1024 / 1024 < 10;
                if (isPDF) {
                    if (!isLt10M) {
                        this.$message.error('上传文件大小不能超过 10MB')
                    }
                } else {
                    this.$message.error('上传文件只能为PDF文件!');
                }

                return isPDF && isLt10M;
            },
            handleExceed(files, fileList) {
                this.$message.warning('只允许上传1个文件，请删除后重新选择!');
            },
            bdCardTypeChangeEvent: function (val) {
                for (let i = 0; i < this.bdCardType.length; i++) {
                    if (this.bdCardType[i] == val) {
                        this.ruleForm.freq = (i == 0 ? '30s' : '50s');
                        if (this.ruleForm.purpose == '航空用途') {
                            this.operatingExpenses = 0;
                        } else {
                            this.operatingExpenses = (i == 0 ? 600 : 1000);
                        }
                    }
                }
            },
            bdCardPurposeChangeEvent: function (val) {
                if (val == '航空用途') {
                    this.operatingExpenses = 0;
                } else {
                    for (let i = 0; i < this.bdCardType.length; i++) {
                        if (this.ruleForm.activeName == this.bdCardType[i]) {
                            this.operatingExpenses = (i == 0 ? 600 : 1000);
                        }
                    }
                }
            },
            downloadTemplate: function () {
                var $eleForm = $("<form method='get'></form>");

                $eleForm.attr("action", this.downloadFileUrl);

                $(document.body).append($eleForm);

                //提交表单，实现下载
                $eleForm.submit();
            },
            submitForm(formName) {
                var _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.ruleForm.fileList1.length > 0 && this.ruleForm.fileList2.length > 0) {

                            if(this.ruleForm.purpose != '普通用途' && this.ruleForm.fileList3.length == 0){
                                this.$message.error("请选择上传文件！");
                                return;
                            }
                            var fileLists = this.ruleForm.fileList1.concat(this.ruleForm.fileList2, this.ruleForm.fileList3)
                            var formData = new FormData();
                            for (var i = 0; i < fileLists.length; i++) {
                                //如果为普通用途则航空信息表不需要上传
                                if (i == 2 && (this.ruleForm.purpose == '普通用途')) {
                                    break;
                                }

                                if (this.handleBeforeUpload(fileLists[i].raw)) {
                                    formData.append('file', fileLists[i].raw);
                                } else {
                                    this.ruleForm.fileList1 = [];
                                    this.ruleForm.fileList2 = [];
                                    this.ruleForm.fileList3 = [];
                                    return;
                                }
                            }
                            formData.append('cardType', this.ruleForm.activeName);
                            formData.append('cardLeven', this.ruleForm.grade);
                            formData.append('content', this.ruleForm.purpose + ',' + this.ruleForm.editpurpose);
                            formData.append('relations', this.ruleForm.ship);
                            formData.append('usageMode', this.ruleForm.userMode);
                            formData.append('frequentncy', this.ruleForm.freq);
                            formData.append('usageArea', this.ruleForm.useArea);
                            formData.append('reportNumber', this.ruleForm.serial);
                            formData.append('usageUnit', this.ruleForm.unit);
                            formData.append('total', this.ruleForm.num);
                            formData.append('fullPrice', this.totalprice);


                            this.$http.post(config.bdkapply, formData, {
                                before: function () {
                                    _this.loading = true;
                                }
                            }).then(response => {
                                this.loading = false;
                                this.orderId = response.bodyText;
                                this.orderSubmit = true;
                                //提交申请详情

                                this.$http.post(config.ordercommit,
                                    {'orderId': this.orderId}, {emulateJSON: true}
                                ).then(response => {
                                    this.detail.orderSubmit = response.body.list
                                }, response => {
                                });

                                //获取地址
                                this.$http.post(config.getAddress, {emulateJSON: true}
                                ).then(response => {
                                    this.detail.adressinfo = response.body.list;
                                    this.detail.adressinfo.forEach((adress, index) => {
                                        if (adress.level == 1) {
                                            this.detail.receiptRadio = adress.id;
                                        }

                                    })
                                }, response => {
                                    this.$message.error('订单号获取异常！');
                                    this.ordercommit = false;
                                });

                            }, response => {
                                this.$message.error('订单号获取异常！');
                                this.ordercommit = false;
                            });
                        } else {
                            this.$message.error("请选择上传文件！");
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            orderCancle(index) {
                this.orderSubmit = false;
                this.$http.post(config.bdkDelete, {
                    'orderId': index
                }, {emulateJSON: true}).then(response => {
                    if (response.body == true) {
                        this.loadData(this.currentPage, this.pagesize);
                    }
                }, response => {
                })
            },
            handleSelectionChange(rows) {
                this.multipleSelection = rows;
            },
            setOrderInfo(response){

                this.resetOrderInfo();

                this.detail.dataCard = response.body;
                this.detail.number = response.body[0].orderId;
                this.detail.statu = response.body[0].status;
                if (response.body[0].operate) {
                    this.detail.title = response.body[0].operate.split(",");
                }
                this.detail.receipt.address = response.body[0].address;
                this.detail.receipt.zip = response.body[0].postalcode;
                this.detail.receipt.name = response.body[0].consignee;
                this.detail.receipt.tel = response.body[0].mobile;

            },
            resetOrderInfo(){
                this.detail.dataCard = [];
                this.detail.number = '';
                this.detail.statu = '';
                this.detail.title = '';
                this.detail.receipt.address = '';
                this.detail.receipt.zip = '';
                this.detail.receipt.name = '';
                this.detail.receipt.tel= '';
            },
            handleEdit(index, row) {
                if (this.rowData != null) {
                    this.rowData = null;
                }
                this.rowData = row;

                this.dialogFormVisible = true;
                var formData = new FormData();
                formData.append('orderId', row.requestId);
                this.$http.post(config.ordercommit, formData, {emulateJSON: true}).then(response => {
                    if (response.body.list.length !== 0) {
                        let goodsId = response.body.list[0].goodsId;
                        let addressId = response.body.list[0].addressId;
                        let orderType = response.body.list[0].orderType;
                        this.$http.post(config.bdkDetail, {
                            'orderId': row.requestId,
                            'goodsId': goodsId,
                            'addressId': addressId,
                            'orderType': orderType
                        }, {emulateJSON: true}).then(response1 => {
                            if (response1 && response1.body.length !== 0) {
                                this.setOrderInfo(response1);
                            }else{
                                this.resetOrderInfo();
                                this.$message.error('查询错误！');
                            }
                        }, response => {
                        })
                    } else {
                        console.log('无数据')
                    }
                }, response => {
                });
            },
            handleSizeChange: function (size) {
                this.pagesize = size;
            },
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                this.loadData(currentPage);
            },
            order(index) {
                var formData = new FormData();
                formData.append('addressId', index);
                formData.append('orderId', this.orderId);
                this.$http.post(config.bdksubmit, formData, {emulateJSON: true}).then(response => {
                    this.orderSubmit = false;
                    this.num = 2;
                    this.loadData(this.currentPage);
                }, response => {
                });
            },
            showServiceDetail: function () {
                //填写表单信息
                this.dialogDetail.cardType = this.rowData.cardType;
                this.dialogDetail.reportNumber = this.rowData.reportNumber;
                this.dialogDetail.cardLeven = this.rowData.cardLeven;
                this.dialogDetail.relations = this.rowData.relations;
                this.dialogDetail.frequentncy = this.rowData.frequentncy;
                this.dialogDetail.total = this.rowData.total;
                this.dialogDetail.usageMode = this.rowData.usageMode;
                this.dialogDetail.yt = this.rowData.content.split(",")[0];
                this.dialogDetail.ytms = this.rowData.content.split(",")[1];
                this.dialogDetail.usageUnit = this.rowData.usageUnit;
                this.dialogDetail.usageArea = this.rowData.usageArea;
                this.dialogDetail.aircraftFile = this.rowData.aircraftFile;
                this.dialogDetail.contractFile = this.rowData.contractFile;
                this.dialogDetail.reportFile = this.rowData.reportFile;

                this.serviceDetailDialog = true;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .el-button {
        border-radius: 0 !important;
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

    .el-button--primary {
        background-color: $primaryColor !important;
        border-color: $primaryColor !important;
        border-radius: 0;
    }

    .el-radio__input.is-checked + .el-radio__label {
        color: $primaryColor !important;
    }

    .el-radio.is-bordered.is-checked {
        border-color: $primaryColor !important;
    }

    .el-radio__input.is-checked .el-radio__inner {
        border-color: $primaryColor !important;
        background: $primaryColor !important;
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

    .bdapply {
        padding: 30px;
        text-align: left;
        & > .tab {
            background-color: #fff;
            & > .tab-title {
                border-bottom: 1px solid #E6E6E6;
                padding-left: 20px;
                span {
                    display: inline-block;
                    padding: 15px 20px 0;
                    cursor: pointer;
                    &.active {
                        a {
                            border-bottom: 2px solid $primaryColor;
                            color: $primaryColor;
                            font-weight: bold;
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
                padding: 20px 43px 0;
                .step {
                    margin: 30px 0;
                    padding-bottom: 50px;
                    .el-row {
                        margin: 30px 0;
                        .title {
                            font-size: 16px;
                            color: $primaryColor;
                            font-weight: bold;
                            span {
                                margin-right: 20px;
                            }
                        }
                        .detail {
                            font-size: 14px;
                            .userapply {
                                line-height: 2;
                            }
                            .ups {
                                font-weight: bold;
                                line-height: 2;
                            }
                        }
                    }
                }
                .cardapply {
                    // text-align: center;
                    padding-bottom: 50px;
                    .el-form {
                        .el-form-item {
                            .el-form-item__content {
                                line-height: 35px;
                                .el-input__inner {
                                    height: 35px;
                                    border-radius: 0;
                                }
                                & > .el-input {
                                    width: 260px;
                                }
                                .el-radio__input {
                                    display: none;
                                }
                                .el-radio.is-bordered {
                                    height: 35px;
                                    padding-top: 10px;
                                    border-radius: 0;
                                }
                                .el-input-number {
                                    line-height: 35px;
                                    & + .price {
                                        color: $primaryColor;
                                        margin-left: 10px;
                                    }
                                }
                                .el-button--primary {
                                    background-color: $primaryColor;
                                    border-color: $primaryColor;
                                    border-radius: 0;
                                }
                                .el-input-number__decrease,
                                .el-input-number__increase {
                                    height: 33px;
                                }
                            }
                            .totalprice {
                                text-align: center;
                                color: red;
                                font-size: 20px;
                            }
                            .el-textarea {
                                width: 260px;
                                display: block;
                                textarea {
                                    min-height: 100px !important;
                                    border-radius: 0;
                                }
                            }
                        }

                    }
                }
                .cardRecord {
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
                            padding: 40px 0 60px;
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
                    & > .el-table thead {
                        color: #000;
                    }
                    & > .el-table th,
                    & > .el-table td {
                        text-align: center;
                        padding: 15px 0;
                    }
                    & > .el-table th {
                        font-size: 15px;
                    }
                    & > .el-table td {
                        font-size: 13px;
                        .edit {
                            margin: -3px -26px 0 10px;
                            cursor: pointer;
                            color: $primaryColor;
                            font-size: 16px;
                        }
                    }
                }
            }
        }
        & > .el-dialog__wrapper {
            .el-dialog {
                // width:620px;
                .el-dialog__header {
                    border-bottom: 1px solid #E6E6E6;
                    .el-dialog__title {
                        color: $primaryColor;
                        padding-left: 20px;
                    }
                }
                .el-dialog__body {
                    padding: 30px 40px 0;
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
                        .el-table td {
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
            }
        }
    }
</style>
