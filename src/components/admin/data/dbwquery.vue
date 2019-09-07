<template>
    <div class="dbwquery">
        <el-button @click="filterMenuShowing = !filterMenuShowing">筛选
            <i class="el-icon-arrow-up el-icon--right" v-show="!filterMenuShowing"></i>
            <i class="el-icon-arrow-down el-icon--right" v-show="filterMenuShowing"></i>
        </el-button>

        <el-collapse-transition>
            <el-form ref="filterFormRef" status-icon :model="filterBeanForm" :rules="rule" :inline="true"
                     v-show="filterMenuShowing">
                <el-form-item label="卡号：" label-width='120' prop="cardNumber">
                    <el-input type="text" v-model.trim="filterBeanForm.cardNumber" suffix-icon="el-icon-tickets">
                    </el-input>
                </el-form-item>
                <el-form-item label="选择日期：" label-width='120'>
                    <el-date-picker
                        v-model="filterBeanForm.datePickerValue"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                        :editable="false"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryBDMessageList('filterFormRef')">查询</el-button>
                </el-form-item>
            </el-form>
        </el-collapse-transition>

        <div class="bodyStyle">
            <el-table ref="bdCardTable" :data="respTableData"
                      stripe :default-sort="{prop: 'date',order:'descending'}">
                <el-table-column label="序号" type="index" width="100" :index="indexMethod">
                </el-table-column>

                <el-table-column label="发放卡号" prop="sendCardId">
                </el-table-column>

                <el-table-column label="收方卡号" prop="toCardId">
                </el-table-column>

                <el-table-column label="时间" prop="createTime" sortable>
                    <template slot-scope="scope">
                        {{new Date(scope.row.createTime).toLocaleString()}}
                    </template>
                </el-table-column>

                <el-table-column label="内容" prop="content">
                </el-table-column>
            </el-table>

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
</template>

<script>
    import ElCollapseTransition from "element-ui/src/transitions/collapse-transition";

    export default {
        components: {ElCollapseTransition},
        name: 'dbwquery',
        data() {
            return {
                filterMenuShowing: false,
                inputCardNumber: 0,
                filterBeanForm: {
                    cardNumber: '',
                    datePickerValue: ''
                },
                respTableData: [],
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
                currentPage: 1,
                pageSize: 10,
                pageCount: 0,
                rule: {
                    // cardNumber: [{required: true, message: '请输入卡号', trigger: 'blur'}]
                },
                datetimeFormat: function (datetime) {
                    var year = datetime.getFullYear(),
                        month = datetime.getMonth() + 1,
                        date = datetime.getDate(),
                        hour = datetime.getHours(),
                        minutes = datetime.getMinutes(),
                        second = datetime.getSeconds();
                    if (month < 10) {
                        month = "0" + month;
                    }
                    if (date < 10) {
                        date = "0" + date;
                    }
                    if (hour < 10) {
                        hour = "0" + hour;
                    }
                    if (minutes < 10) {
                        minutes = "0" + minutes;
                    }
                    if (second < 10) {
                        second = "0" + second;
                    }
                    return (year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + second);
                }
            }
        },
        mounted: function () {
            let param = {};
            //消息类型 0:短报文 1:分发
            param.type = 0;
            param.pageNum = 1;
            param.pageSize = this.pageSize;
            this.requestList(param);
        },
        methods: {
            handleSizeChange(size) {
                this.pageSize = size;
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                let param = {};
                param.type = 0;
                param.pageNum = currentPage;
                param.pageSize = this.pageSize;
                this.requestList(param);
            },
            indexMethod(index) {
                return (this.currentPage - 1) * this.pageSize + index + 1;
            },
            queryBDMessageList: function (formName) {

                let param = {};
                param.type = 0;
                param.pageSize = this.pageSize;

                if (this.filterBeanForm.datePickerValue != null && this.filterBeanForm.datePickerValue.length > 0) {
                    console.log(this.filterBeanForm.datePickerValue[0]);
                    const startTime = this.datetimeFormat(this.filterBeanForm.datePickerValue[0]);
                    const endTime = this.datetimeFormat(this.filterBeanForm.datePickerValue[1]);

                    param.startAt = startTime;
                    param.endAt = endTime;
                }
                if (this.filterBeanForm.cardNumber.length !== 0) {
                    param.cardId = this.filterBeanForm.cardNumber;
                }

                this.requestList(param);

            },
            requestList: function (param) {

                this.$http.get(config.bdMessageQuery, {params: param}).then(response => {
                        if (response.ok) {
                            console.log(response);
                            if (response.body.list.length === 0) {
                                this.$message.success('查询结果为空!');
                            } else {
                                this.$message.success('查询成功!');
                            }
                            this.pageCount = response.body.pages;
                            if (typeof response.body.list !== 'undefined') {
                                this.respTableData = response.body.list;
                            }
                        } else {
                            console.log(response);
                            this.$message.error('查询异常!');
                        }
                    },
                    response => {
                        this.$message.error('查询异常!');
                        console.log(response);
                    });
            }
        },
        computed: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .dbwquery {
        text-align: left;
        padding: 30px;
        .el-select .el-input.is-focus .el-input__inner,
        .el-range-editor.is-active, .el-range-editor.is-active:hover,
        .el-input__inner:focus {
            border-color: $primaryColor
        }
        & > .el-button {
            margin-bottom: 30px;
            width: 120px;
            border-radius: 0;
            &:focus, &:hover {
                color: #000;
                border-color: $primaryColor;
                background-color: #fff;
            }
        }
        & > .el-form {
            .el-form-item__label {
                font-size: 16px;
            }
            .el-form-item:nth-child(1) {
                .el-input {
                    width: 160px;
                    .el-input__inner {
                        border-radius: 0;
                    }
                }
                .el-range-editor.is-active,
                .el-range-editor.is-active:hover {
                    border-color: $primaryColor;
                }
            }
            .el-form-item:nth-child(2) {
                .el-input__inner {
                    width: 360px;
                    border-radius: 0;
                }
                .el-range-editor.is-active,
                .el-range-editor.is-active:hover {
                    border-color: $primaryColor;
                }
            }
            .el-form-item:nth-child(3) {
                .el-button {
                    width: 120px;
                    background-color: $primaryColor;
                    font-size: 16px;
                    padding: 10px 20px;
                    border-color: $primaryColor;
                    border-radius: 0;
                }
            }
        }
        .bodyStyle {
            background: #fff;
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
            }
            & > .block {
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

    }
</style>
