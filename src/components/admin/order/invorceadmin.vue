<template>
    <div class="invorceadmin">
        <el-row class="invorceTitle">
            <el-col :span='12' class="invorceName">发票信息</el-col>
            <el-col :span='12' class="invorceSet">
                <span @click="invorce = true">设置发票信息</span>
            </el-col>
        </el-row>
        <div v-if="responseData != null ? responseData.length === 0: false">
            <p class="invorceContent">您还没有设置发票信息，
                <span class="sets" @click="invorce = true">立即设置</span>
            </p>
        </div>
        <div v-else class="tableStyle">
            <el-table ref="invoiceTableRef"
                      :data="responseData" stripe>
                <el-table-column label="开票单位/个人" prop="name">
                </el-table-column>
                <el-table-column label="税号" prop="taxpayerNumber">
                </el-table-column>
                <el-table-column label="单位地址" prop="address" v-if="true">
                </el-table-column>
                <el-table-column label="电话号码" prop="phone" v-if="true">
                </el-table-column>
                <el-table-column label="开户行及账号" prop="bankInfo" v-if="true">
                </el-table-column>
                <el-table-column label="状态" prop="status">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status == 1">申请中</el-tag>
                        <el-tag v-if="scope.row.status == 2" type="success">已完成</el-tag>
                        <el-tag v-if="scope.row.status == 3" type="warning">已驳回</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span class="operation" @click="updateRow(scope.$index,scope.row)">修改</span>
                        <span class="operation" @click="deleteRow(scope.$index,scope.row)">删除</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="新增发票信息" :visible.sync="invorce" top="30vh" @close="addDialogCloseEvent('submitFormRef')">
            <p>请完善以下发票信息</p>
            <el-form status-icon :model="invorceForm" class="invorceForm" ref="submitFormRef" :rules="rules">
                <el-form-item label="开票类型" label-width='120px'>
                    <el-radio-group v-model="invorceForm.style">
                        <el-radio label="个人"></el-radio>
                        <el-radio label="企业"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="发票抬头" label-width='120px' prop="name">
                    <el-input v-model="invorceForm.name"></el-input>
                </el-form-item>
                <el-form-item label="纳税人识别号" v-if="invorceForm.style == '企业'" label-width='120px' prop="num">
                    <el-input v-model="invorceForm.num"></el-input>
                </el-form-item>
                <el-form-item label="发票类型" label-width='120px'>
                    <el-radio-group v-model="invorceForm.resource">
                        <el-radio label="增值税普通发票"></el-radio>
                        <el-radio label="增值税专用发票"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="invorce = false">取 消</el-button>
                <el-button type="primary" @click="invoiceFormSubmit('submitFormRef')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改发票信息" :visible.sync="updateInvoiceDialog" @close="updateDialogCloseEvent('updateFormRef')">
            <el-form status-icon class="invorceForm" ref="updateFormRef">
                <el-form-item label="开票单位/个人" label-width="120px">
                    <el-input v-model="invoiceName">
                    </el-input>
                </el-form-item>
                <el-form-item label="税号" label-width="120px" v-if="taxId != null ? taxId.length > 0 : false">
                    <el-input v-model="taxId">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateInvoiceDialog = false">取 消</el-button>
                <el-button type="primary" @click="invoiceFormUpdate('updateFormRef')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'invorceadmin',
        data() {
            return {
                invorce: false,
                invorceForm: {
                    style: '个人',
                    name: '',
                    num: '',
                    resource: '增值税普通发票'
                },
                rules: {
                    name: [{required: true, message: '请输入发票抬头', trigger: 'blur'}],
                    num: [{required: true, message: '请输入税号', trigger: 'blur'}]
                },
                responseData: [],
                currentPage: 1,
                pageSize: 10,
                pageCount: 0,
                invoiceName: '',
                updateInvoiceDialog: false,
                taxId: ''
            }
        },
        mounted: function () {
            this.requestTableData();
        },
        computed: {
            UserId() {
                return this.$store.state.LoginedUser.id;
            }
        },
        methods: {
            requestTableData: function () {

                let param = {};
                param.userId = this.UserId;
                console.log(param);
                this.$http.get(config.getInvoiceList, param).then(response => {
                        console.log(response);
                        if (response.ok) {
                            if (typeof response.body.list !== 'undefined') {
                                this.responseData = response.body.list;
                            }
                        } else {

                        }
                    },
                    response => {
                        console.log(response);
                    });
            },
            updateRow: function (index, row) {
                this.updateInvoiceDialog = true;
                this.invoiceName = row.name;
                this.taxId = row.taxpayerNumber;
            },
            deleteRow: function (index, row) {
                this.$confirm('确定删除此发票？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let param = {};
                    param.id = row.id;
                    this.$http.get(config.deleteInvoice, param).then(response => {
                            console.log(response);
                            if (response.ok) {
                                this.requestTableData();
                            }
                        },
                        response => {
                            console.log(response);
                        });
                })
            },
            invoiceFormUpdate: function (formName) {
                let param = {};
                param.name = this.invoiceName;
                if (this.taxId != null && this.taxId.length > 0) {
                    param.taxpayerNumber = this.taxId;
                }
                this.$http.get(config.updateInvoice).then(response => {
                        console.log(response);
                        if (response.ok) {
                            //更新
                            this.updateInvoiceDialog = false;
                            this.requestTableData();
                        } else {

                        }
                    },
                    response => {
                        console.log(response);
                    });
            },
            invoiceFormSubmit: function (formName) {
                this.$refs[formName].validate(
                    (valid) => {
                        if (valid) {
                            let param = {};
                            param.userId = this.UserId;
                            param.name = this.invorceForm.name;
                            if (this.invorceForm.style == '企业') {
                                param.num = this.invorceForm.num;
                            }
                            console.log(param);
                            this.$http.post(config.addInvoice, param).then(response => {
                                    console.log(response);
                                    if (response.ok) {
                                        this.invorce = false;
                                        this.requestTableData();
                                    } else {

                                    }
                                },
                                response => {
                                    console.log(response)
                                });
                            console.log('验证通过!')
                        } else {
                            console.log('验证失败!')
                        }
                    }
                );
            },
            addDialogCloseEvent: function (formName) {
                if (this.$refs[formName] !== undefined) {
                    this.$refs[formName].resetFields();
                }
            },
            updateDialogCloseEvent: function (formName) {
                if (this.$refs[formName] !== undefined) {
                    this.$refs[formName].resetFields();
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    @mixin font-style {
        color: $primaryColor;
        cursor: pointer;
    }

    .el-button--primary {
        background-color: $primaryColor;
        border-color: $primaryColor;
    }

    .el-input__inner {
        border-radius: 0;
    }

    .el-radio__input.is-checked + .el-radio__label {
        color: $primaryColor;
    }

    .el-radio__input.is-checked .el-radio__inner {
        background-color: $primaryColor;
        border-color: $primaryColor;
    }

    .el-select .el-input.is-focus .el-input__inner,
    .el-range-editor.is-active, .el-range-editor.is-active:hover,
    .el-input__inner:focus {
        border-color: $primaryColor;
    }

    .invorceadmin {
        margin: 30px;
        text-align: left;
        background-color: #fff;
        .invorceTitle {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #E6E6E6;
            .invorceName {
                padding-left: 40px;
            }
            .invorceSet {
                text-align: right;
                padding-right: 40px;
                font-weight: bold;
                @include font-style;
            }
        }
        .invorceContent {
            text-align: center;
            padding: 370px 0;
            font-size: 18px;
            .sets {
                @include font-style;
            }
        }
        .tableStyle {
            .operation {
                color: $primaryColor;
                cursor: pointer;
                padding: 0 5px;
            }
            .footer {
                padding: 20px 0 0 40px;
                .explain {
                    color: grey;
                    font-size: 14px;
                    margin-left: 30px;
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
                background-color: #E7F1FB;
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
                    padding: 20px 20px 0;
                    p {
                        text-align: center;
                        color: #999;
                        padding-bottom: 10px;
                    }
                    .invorceForm {
                        width: 410px;
                        margin: auto;
                        .el-input {
                            width: 280px;
                        }
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
    }
</style>
