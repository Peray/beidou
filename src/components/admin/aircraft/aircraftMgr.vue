<template>
    <div class="aircraftMgr">
        <div class="headerStyle">
            <el-row>
                <el-col :span="6">
                    <el-button @click="registerAircraft">注册</el-button>
                </el-col>
                <el-col :span="6" :offset="12">
                    <el-input placeholder="请输入机尾号" v-model="aircraftNum">
                        <el-button slot="append" icon="el-icon-search" @click="searchAircraft">
                        </el-button>
                    </el-input>
                </el-col>

            </el-row>
        </div>
        <div class="bodyStyle">
            <el-table ref="bdCardTable" :data="respTableData"
                      stripe>
                <el-table-column label="序号" type="index" width="100" :index="indexMethod">
                </el-table-column>

                <el-table-column label="机尾号" prop="tailCode">
                </el-table-column>

                <el-table-column label="机型" prop="type">
                </el-table-column>

                <el-table-column label="机龄" prop="age">
                </el-table-column>

                <el-table-column label="所属单位" prop="owner">
                </el-table-column>

                <el-table-column label="是否关联">
                    <template slot-scope="scope">
                        <span>{{scope.row.monitor ? '是':'否'}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="状态" prop="status">
                    <template slot-scope="scope">
                        <span>{{scope.row.status == 0 ? '未审批':'已审批'}}</span>
                    </template>
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
        <el-dialog :visible.sync="registerDialogVisible" :title="registerDialogTitle"
                   @close="dialogCloseEvent('registerDialogRef')">
            <el-form ref="registerDialogRef" :model="aircraftForm" :label-width="formLabelWidth" :rules="rule">
                <el-form-item label="机尾号" prop="airNum">
                    <el-input type="text" v-model.trim="aircraftForm.airNum"/>
                </el-form-item>
                <el-form-item label="制造商" prop="manufacturer">
                    <el-input type="text" v-model.trim="aircraftForm.manufacturer"/>
                </el-form-item>
                <el-form-item label="机型" prop="airModel">
                    <el-input type="text" v-model.trim="aircraftForm.airModel"/>
                </el-form-item>
                <el-form-item label="出厂日期" prop="date">
                    <el-date-picker v-model="aircraftForm.date" type="date" placeholder="选择日期"
                                    value-format="yyyy-MM-dd 00:00:00">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="用途" prop="use">
                    <el-input type="textarea" v-model.trim="aircraftForm.use" placeholder="请说明申请飞行器用途"/>
                </el-form-item>
            </el-form>
            <div slot="footer" style="text-align: center">
                <el-button @click="registerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitAircraftForm('registerDialogRef')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "aircraft",
        data() {
            return {
                aircraftNum: '',
                registerDialogTitle: '注册飞行器',
                registerDialogVisible: false,
                formLabelWidth: '100px',
                aircraftForm: {
                    airNum: '',
                    manufacturer: '',
                    airModel: '',
                    date: '',
                    use: ''
                },
                respTableData: [],
                currentPage: 1,
                pageSize: 10,
                pageCount: 0,
                rule: {
                    airNum: [{required: true, message: '请输入机尾号', trigger: 'blur'}],
                    manufacturer: [{required: true, message: '请输入制造商', trigger: 'blur'}],
                    airModel: [{required: true, message: '请输入机型', trigger: 'blur'}],
                    date: [{required: true, message: '请选择出场日期', trigger: 'change'}],
                    use: [{required: true, message: '请说明用途', trigger: 'blur'}]
                }
            }
        },
        mounted: function () {
            let param = {};
            param.pageNum = 1;
            param.pageSize = this.pageSize;
            this.requestList(param);
        },
        methods: {
            handleSizeChange: function (size) {

            },
            handleCurrentChange: function (currentPage) {
                console.log(`当前页: ${currentPage}`);
                this.currentPage = currentPage;
                let param = {};
                param.pageNum = currentPage;
                param.pageSize = this.pageSize;
                this.requestList(param);
            },
            indexMethod: function (index) {
                return (this.currentPage - 1) * this.pageSize + index + 1;
            },
            registerAircraft: function () {
                this.registerDialogVisible = true;
            },
            requestList: function (param) {
                this.$http.get(config.getAircraftList, {params: param}).then(response => {
                        if (response.ok) {
                            console.log(response);
                            if (response.body.list.length === 0) {
                                this.$message.success('查询结果为空!');
                            } else {
                                this.$message.success('查询成功!');
                            }
                            this.pageCount = response.body.pages;
                            this.respTableData = response.body.list;
                        } else {
                            console.log(response);
                            this.$message.error('查询异常!');
                        }
                    },
                    response => {
                        this.$message.error('查询异常!');
                        console.log(response);
                    });
            },
            searchAircraft: function () {
                if (this.aircraftNum == '') {
                    this.$message.error('请输入要查询的机尾号！');
                    return;
                }

                let param = {};
                param.pageNum = 1;
                param.pageSize = this.pageSize;
                param.tailCode = this.aircraftNum;

                this.$http.get(config.getOneAircraft, {params: param}).then(response => {
                        if (response.ok) {
                            console.log(response);
                            if (!$.isEmptyObject(response.body)) {
                                let obj = {};
                                obj.tailCode = response.body.tailCode;
                                obj.type = response.body.type;
                                obj.age = response.body.age;
                                obj.owner = response.body.owner;
                                obj.status = response.body.status;
                                this.respTableData.splice(0, this.respTableData.length, obj);
                            } else {
                                this.$message.error('找不到该机尾号数据！');
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
            },
            submitAircraftForm: function (formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let param = {};
                        param.tailCode = this.aircraftForm.airNum;
                        param.owner = this.aircraftForm.manufacturer;
                        param.type = this.aircraftForm.airModel;
                        param.factoryTime = this.aircraftForm.date;
                        param.purpose = this.aircraftForm.use;

                        console.log(param);

                        this.$http.get(config.registerAircraft, {params: param}).then(response => {
                                console.log(response);
                                if (response.ok) {
                                    this.$message.success('提交成功！');
                                    this.registerDialogVisible = false;
                                    let param = {} ;
                                    param.pageNum = 1 ;
                                    param.pageSize = 10 ;
                                    this.requestList(param);
                                } else {
                                    this.$message.error('提交失败！');
                                }
                            },
                            response => {
                                console.log(response);
                                this.$message.error('提交失败！')
                            });
                        console.log('验证成功！');
                    } else {
                        console.log('验证失败！');
                    }
                });
            },
            dialogCloseEvent: function (formName) {
                if (this.$refs[formName] !== undefined) {
                    this.$refs[formName].clearValidate();
                }
                this.clearForm();
            },
            clearForm: function () {
                this.aircraftForm.airNum = '';
                this.aircraftForm.airModel = '';
                this.aircraftForm.use = '';
                this.aircraftForm.manufacturer = '';
                this.aircraftForm.date = '';
            }
        }
    }
</script>

<style lang="scss">
    $primaryColor: #6DA8E1;
    .aircraftMgr {
        text-align: left;
        padding: 30px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

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

        & > .el-input {
            width: 250px;
            margin: 0 0 30px;
            .el-input__inner {
                border-radius: 0;
            }
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

        .headerStyle {
            margin: 15px;
        }

        & > .el-dialog__wrapper {
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
                    padding: 30px 90px 0;
                    .el-cascader {
                        width: 340px;
                    }
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
