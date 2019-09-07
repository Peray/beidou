<template>
    <div class="adresslist">
        <p class="invorceTitle">收货地址</p>
        <div v-if="responseData.length === 0 ">
            <order-none @setAddress="setAddress"></order-none>
        </div>
        <div v-else class="tableStyle">
            <el-table ref="addressTableRef"
                      :data="responseData.slice((currentPage - 1)*pageSize , currentPage * pageSize)" stripe>
                <el-table-column label="收货人姓名" prop="consignee">
                </el-table-column>
                <el-table-column label="所在地区" prop="region">
                </el-table-column>
                <el-table-column label="街道地址" prop="detailAddress">
                </el-table-column>
                <el-table-column label="邮政编码" prop="postalcode">
                </el-table-column>
                <el-table-column label="手机号码" prop="mobile">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span class="operation" @click="updateRow(scope.$index,scope.row)">修改</span>
                        <span class="operation" @click="deleteRow(scope.$index,scope.row)">删除</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="footer">
                <el-button type="primary" @click="bottomAddAddress()">新增收货地址</el-button>
                <span class="explain">最多可设置3条收货地址</span>
            </div>
        </div>
        <el-dialog :visible.sync="addressSetDialogVisible" :title="dialogTitle"
                   @close="closeEvent('addressFormRef')"
                   @open="openEvent('addressFormRef')">
            <el-form ref="addressFormRef" :model="addressForm" :rules="rules" :label-width="formLabelWidth">
                <el-form-item label="收货人姓名" prop="consignee">
                    <el-input type="text" v-model.trim="addressForm.consignee"/>
                </el-form-item>

                <el-form-item label="所在地区" style="text-align: left">
                    <el-cascader :options="regionOptions" v-model="selectedRegion" :props="props" separator="-"
                                 @active-item-change="handleItemChange">
                    </el-cascader>
                </el-form-item>

                <el-form-item label="街道地址" prop="detailAddress">
                    <el-input type="text" v-model="addressForm.detailAddress"/>
                </el-form-item>

                <el-form-item label="邮政编码" prop="postalcode">
                    <el-input type="text" v-model.number="addressForm.postalcode"/>
                </el-form-item>

                <el-form-item label="手机号码" prop="mobile">
                    <el-input type="text" v-model.number="addressForm.mobile"/>
                </el-form-item>

                <el-form-item>
                    <el-checkbox v-model="setDefault">设为默认</el-checkbox>
                </el-form-item>
            </el-form>
            <div slot="footer" style="text-align: center">
                <el-button @click="addressSetDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addressFormSubmit('addressFormRef')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {isvalidPhone} from '@/assets/js/validate/validate.js'

    let ordernone = {
        template: `<div class="ordernone">
                    <img :src="noneimg"/>
                       <p>您还没有收货地址，
                           <span @click="childSetAddress">立即设置</span>
                       </p>
                </div>`,
        data() {
            return {
                noneimg: require('@/assets/img/admin/ordernone.png')
            }
        },
        methods: {
            childSetAddress: function () {
                this.$emit('setAddress');
            },
        }
    };

    export default {
        name: 'adresslist',
        components: {
            'orderNone': ordernone
        },
        data() {
            return {
                addressSetDialogVisible: false,
                dialogTitle: '新增收货地址',
                dialogType: 1, // 1 增加 , 0 更新
                formLabelWidth: '100px',
                setDefault: false,
                responseData: [],
                currentPage: 1,
                pageSize: 10,
                regionOptions: [],
                selectedRegion: [],
                props: {
                    value: 'name',
                    label: 'name',
                    children: 'sub'
                },
                addressForm: {
                    consignee: '',
                    region: '',
                    detailAddress: '',
                    postalcode: '',
                    mobile: '',
                    level: '0',//1 默认地址 0 普通地址
                },
                rules: {
                    consignee: [
                        {required: true, message: '请输入收货人', trigger: 'blur'}
                    ],
                    region: [
                        {required: true, message: '请选择所在地区', trigger: 'change'}
                    ],
                    detailAddress: [
                        {required: true, message: '请输入详细地址', trigger: 'blur'}
                    ],
                    postalcode: [
                        {required: true, message: '请输入邮编', trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'}
                    ]
                },
                provinceIndex: 0,
                updateFlag: false
            }
        },
        mounted: function () {
            //请求数据
            this.requestData();

        },
        computed: {},
        methods: {
            setAddress: function () {
                this.addressSetDialogVisible = true;
            },
            addressFormSubmit: function (addressFormRef) {
                this.checkBoxLevel();
                this.$refs[addressFormRef].validate((valid) => {
                    if (valid) {
                        if (!this.isPostCode(this.addressForm.postalcode)) {
                            this.$message.error('请输入正确的邮编！');
                            return;
                        }
                        if (!this.isMobile(this.addressForm.mobile)) {
                            this.$message.error('请输入正确的手机号！');
                            return;
                        }

                        var url = '';
                        if (this.dialogTitle == '修改收货地址') {
                            url = config.updateAddress;
                        } else {
                            url = config.addAddress;
                        }
                        this.addressForm.region = this.selectedRegion.join('-');
                        console.log(this.addressForm.region);
                        // let param = {};
                        // param.consignee = this.addressForm.consignee;
                        // param.region = this.addressForm.region;
                        // param.detailAddress = this.addressForm.detailAddress;
                        // param.postalcode = this.addressForm.postalcode;
                        // param.mobile = this.addressForm.mobile;
                        // param.level = this.addressForm.level;
                        if (!this.updateFlag) {
                            delete this.addressForm.id;
                        }
                        this.$http.get(url, {params: this.addressForm}).then(response => {
                            console.log(response);
                            if (response.data) {
                                this.$message.success('提交成功!');
                                this.addressSetDialogVisible = false;
                                this.requestData();
                            }
                        }, response => {
                            this.$message.error('提交失败');
                            console.log(response);
                        })
                    } else {
                        console.log('验证失败!')
                    }
                });
            },
            closeEvent: function (addressFormRef) {
                this.$refs[addressFormRef].resetFields();
                this.resetObject();
                this.selectedRegion = [];
                this.regionOptions = [];
                this.dialogTitle = '新增收货地址';
                this.updateFlag = false;
            },
            openEvent: function (addressFormRef) {
                if (this.$refs[addressFormRef] !== undefined) {
                    this.$refs[addressFormRef].clearValidate();
                }
                //请求省列表
                this.$http.get(config.getProvinceList).then(response => {
                        console.log(response);
                        for (var i = 0; i < response.body.length; i++) {
                            //添加下级数组
                            response.body[i].sub = [];
                        }
                        this.regionOptions = response.body;
                    },
                    response => {
                        console.log(response);
                    })

            },
            checkBoxLevel: function () {
                this.addressForm.level = (this.setDefault ? 1 : 0);
            },
            requestData: function () {
                var param = {};
                // param.userId = 1;
                this.$http.get(config.queryAddressList, {params: param}).then(response => {
                    if ("list" in response.data) {
                        this.responseData = response.data.list;
                    }
                }, response => {
                    console.log(response);
                })
            },
            updateRow: function (index, row) {
                this.updateFlag = true;
                this.addressForm.id = row.id;
                this.addressForm.consignee = row.consignee;
                this.addressForm.region = row.region;
                this.selectedRegion = row.region.split("-");
                this.addressForm.detailAddress = row.detailAddress;
                this.addressForm.postalcode = row.postalcode;
                this.addressForm.mobile = row.mobile;
                this.setDefault = (row.level == 1);
                this.dialogTitle = '修改收货地址';
                this.addressSetDialogVisible = true;
            },
            deleteRow: function (index, row) {
                console.log(index, row);
                //首先弹出确认框
                this.$confirm('确定删除此收货地址？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var param = {};
                    param.id = row.id;
                    // param.userId = 1;
                    this.$http.get(config.deleteAddress, {params: param}).then(
                        response => {
                            console.log(response);
                            if (response.data) {
                                this.$message.success('删除成功！');
                                this.requestData();
                            } else {
                                this.$message.error('删除失败！');
                            }
                        },
                        response => {
                            console.log(response);
                        }
                    )
                }).catch(() => {
                    this.$message.info('已取消删除！');
                })
            },
            bottomAddAddress: function () {
                if (this.responseData.length >= 3) {
                    this.$message.error('最多可设置3条收货地址！');
                } else {
                    this.addressSetDialogVisible = true;
                }
            },
            resetObject: function () {
                this.addressForm.consignee = '';
                this.addressForm.region = '';
                this.addressForm.detailAddress = '';
                this.addressForm.postalcode = '';
                this.addressForm.mobile = '';
                this.addressForm.level = '0';
            },
            isPostCode: function (postcode) {
                var patt = /^[1-9][0-9]{5}$/;
                return patt.test(postcode);
            },
            isMobile: function (mobile) {
                var patt = /^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;
                return patt.test(mobile);
            },
            handleItemChange: function (val) {
                if (val.length == 1) {
                    for (var i = 0; i < this.regionOptions.length; i++) {
                        if (this.regionOptions[i].name == val[0]) {
                            this.provinceIndex = i;
                            this.requestCityList(this.regionOptions[i].id, i);
                            return;
                        }
                    }
                } else if (val.length == 2) {
                    for (var i = 0; i < this.regionOptions[this.provinceIndex].sub.length; i++) {
                        var city = this.regionOptions[this.provinceIndex].sub[i];
                        if (city.name == val[1]) {
                            this.requestCountyList(city.id, i);
                            return;
                        }
                    }
                }
            },
            requestCityList: function (parentId, index) {
                let param = {};
                param.parentId = parentId;
                this.$http.get(config.getCityList, {params: param}).then(response => {
                        console.log(response);
                        for (var i = 0; i < response.body.length; i++) {
                            //添加下级数组
                            response.body[i].sub = [];
                        }
                        this.regionOptions[index].sub = response.body;
                    },
                    response => {
                        console.log(response);
                    });
            },
            requestCountyList: function (parentId, index) {
                let param = {};
                param.parentId = parentId;
                this.$http.get(config.getCityList, {params: param}).then(response => {
                        console.log(response);
                        this.regionOptions[this.provinceIndex].sub[index].sub = response.body;
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

    .el-select .el-input.is-focus .el-input__inner,
    .el-range-editor.is-active, .el-range-editor.is-active:hover,
    .el-input__inner:focus {
        border-color: $primaryColor;
    }

    .el-button--primary {
        background-color: $primaryColor;
        border-color: $primaryColor;
    }

    .el-input__inner,
    .el-button {
        border-radius: 0;
    }

    .adresslist {
        margin: 30px;
        background-color: #fff;
        text-align: left;
        height: 90%;
        .invorceTitle {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #E6E6E6;
            padding-left: 40px;
        }
        .ordernone {
            text-align: center;
            padding: 180px 0;
            background-color: #fff;
            & > p {
                padding: 20px 0;
                font-size: 17px;
                span {
                    color: $primaryColor;
                    cursor: pointer;
                }
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
    }
</style>
