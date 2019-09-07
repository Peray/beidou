<template>
    <div class="acount">
        <p class="invorceTitle">账号安全</p>
        <el-form :model="Accountsafe" label-width="100px" class="Accountsafe">
            <el-form-item label="用户名">
                <span class="user">{{Accountsafe.userName}}</span>
                <el-button type="primary" @click="setuser(0)">修改</el-button>
            </el-form-item>
            <el-form-item label="邮箱账号">
                <span class="user">{{Accountsafe.email}}</span>
                <el-button type="primary" @click="setuser(1)" v-if="Accountsafe.email.length == 0">绑定</el-button>
                <el-button type="primary" @click="setuser(1)" v-if="Accountsafe.email.length != 0">更换</el-button>
                <el-button type="info" @click="setuser(1)" v-if="Accountsafe.email.length != 0">解绑</el-button>


            </el-form-item>
            <el-form-item label="手机账号">
                <span class="user">可以使用<span style="color: #6DA8E1;">{{Accountsafe.tel}}</span>直接登录</span>
                <el-button type="primary" @click="setuser(2)">更换</el-button>
                <el-button type="info" @click="setuser(3)">解绑</el-button>
            </el-form-item>
            <el-form-item label="登录密码">
                <span class="user">{{Accountsafe.password}}</span>
                <el-button type="primary" @click="setuser(4)">修改</el-button>
            </el-form-item>
            <el-form-item label="实名认证">
                <span class="user">{{Accountsafe.realName}}</span>
                <el-button type="primary" @click="setuser(5)" v-if="isConfirm == 0">未认证</el-button>
                <el-button type="success" @click="setuser(5)" v-else-if="isConfirm == 1">已认证</el-button>
                <el-button type="info" disabled v-else-if="isConfirm == 2">认证审核中</el-button>
            </el-form-item>
        </el-form>
        <el-dialog :title="title" :visible.sync="dialogFormVisible" top="30vh" @close="closeEvent">
            <el-form v-if="dialogActive == 0" ref="userForm" :model="userForm" :rules="rule">
                <el-form-item prop="username">
                    <el-input v-model="userForm.name" placeholder="请输入用户名">
                    </el-input>
                </el-form-item>
            </el-form>
            <el-form v-else-if="dialogActive == 1" ref="emailForm" :model="emailForm">
                <el-form-item>
                    <el-input v-model="emailForm.name" placeholder="请输入邮箱">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input class="code" v-model="emailForm.code" placeholder="请输入验证码">
                    </el-input>
                    <el-input class="getcode"></el-input>
                </el-form-item>
            </el-form>
            <el-form v-else-if="dialogActive == 2" ref="telForm" :model="telForm">
                <el-form-item>
                    <el-input v-model="telForm.oldtel" placeholder="请输入原手机号码">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="telForm.newtel" placeholder="请输入最新的手机号码">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input class="code" v-model="telForm.code" placeholder="请输入验证码">
                    </el-input>
                    <el-button type="primary" class="getcode">获取验证码</el-button>
                </el-form-item>
            </el-form>
            <el-form v-else-if="dialogActive == 3" ref="unbindForm" :model="unbindForm">
                <el-form-item>
                    <el-input v-model="unbindForm.oldtel" placeholder="请输入原手机号码">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input class="code" v-model="unbindForm.code" placeholder="请输入验证码">
                    </el-input>
                    <el-button type="primary" class="getcode">获取验证码</el-button>
                </el-form-item>
            </el-form>
            <el-form v-else-if="dialogActive == 4" ref="passwordForm" :model="passwordForm" :rules="rule">
                <el-form-item prop="oldpassword">
                    <el-input v-model="passwordForm.oldpassword" placeholder="请输入原密码">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-col :span="10">
                        <el-form-item>
                            <el-input placeholder="请输入验证码" v-model="passwordForm.validateCode"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="4">
                        <img :src="imgPath" alt="点击切换" class="verification-code" @click="requestCode"
                        >
                    </el-col>
                </el-form-item>
                <el-form-item prop="newpassword">
                    <el-input v-model="passwordForm.newpassword" placeholder="请输入新密码">
                    </el-input>
                </el-form-item>
            </el-form>
            <el-form v-else-if="dialogActive == 5" ref="realForm" :model="realForm" :rules="rule">
                <el-form-item prop="realname">
                    <el-input v-model="realForm.realname" placeholder="请输入您的真实姓名">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <template>
                        <el-radio v-model="realForm.visa" label="1">身份证</el-radio>
                        <el-radio v-model="realForm.visa" label="2" disabled>签证</el-radio>
                    </template>
                </el-form-item>
                <el-form-item prop="idnum">
                    <el-input v-model="realForm.idnum" placeholder="请输入证件号">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <p>请上传身份证件照</p>
                    <el-upload
                        action=""
                        list-type="picture-card"
                        :auto-upload="false"
                        :limit="2"
                        :file-list="realForm.fileList"
                        :on-remove="handlePictureRemove"
                        :before-upload="handleBeforeUpload"
                        :on-change="handlePictureChange"
                        accept="image/png , image/jpeg ,image/jpg"
                        :on-exceed="handleExceed"
                    >
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
                    </el-upload>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">返 回</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>

    export default {
        name: 'acount',
        data() {
            return {
                dialogFormVisible: false,
                dialogActive: '',
                Accountsafe: {
                    userName: 'user',
                    email: '',
                    tel: '',
                    password: '建议你经常修改密码，以保障账号增加安全',
                    realName: '请实名认证购买终端设备'
                },
                userForm: {
                    name: '',
                    code: ''
                },
                emailForm: {
                    name: '',
                    code: ''
                },
                telForm: {
                    oldtel: '',
                    newtel: '',
                    code: ''
                },
                passwordForm: {
                    oldpassword: '',
                    newpassword: '',
                    validateCode: ''
                },
                unbindForm: {
                    oldtel: '',
                    code: ''
                },
                realForm: {
                    realname: '',
                    visa: '1',
                    idnum: '',
                    fileList: []
                },
                rule: {
                    realname: [{required: true, message: '请输入真实姓名', trigger: 'blur'}],
                    idnum: [{required: true, message: '请输入证件号码', trigger: 'blur'}],
                    oldpassword: [{required: true, message: '请输入原密码', trigger: 'blur'}],
                    verificationcode: [{required: true, message: '请输入验证码', trigger: 'blur'}],
                    newpassword: [{required: true, message: '请输入新密码', trigger: 'blur'}]
                },
                isConfirm: '',
                identifyCode: '',
                identifyCodes: '1234567890',
                imgPath: config.validateCodeUrl
            }
        },
        mounted: function () {
            //请求用户信息
            this.requestUserInfo();
            this.requestCode();
        },
        computed: {
            title() {
                let title;
                if (this.dialogActive == 0) {
                    title = '修改用户名'
                } else if (this.dialogActive == 1) {
                    title = '绑定邮箱'
                } else if (this.dialogActive == 2) {
                    title = '更换手机号码'
                } else if (this.dialogActive == 3) {
                    title = '解绑手机号码'
                } else if (this.dialogActive == 4) {
                    title = '修改密码'
                } else if (this.dialogActive == 5) {
                    title = '实名认证'
                }
                return title;
            }
        },
        methods: {
            tab:function(index){
                this.num = index ;
            },

            requestCode: function () {
                this.imgPath = config.validateCodeUrl + "?r=" + Math.random();
                console.log(this.imgPath)
            },
            makeCode: function (length) {
                for (let i = 0; i < length; i++) {
                    this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
                }
                console.log(this.identifyCode);
            },
            randomNum: function (min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            requestUserInfo: function () {
                this.$http.post(config.userdetails).then(response => {
                        if (response.ok) {
                            this.Accountsafe.userName = response.body.name;
                            this.Accountsafe.email = response.body.email;
                            this.Accountsafe.tel = response.body.mobile;

                            this.isConfirm = response.body.isConfirm;

                        } else {
                            this.$message.error('请求异常！' + response.body.message);
                        }
                    },
                    response => {
                        this.$message.error('请求异常！' + response.body.message);
                    })
            },
            setuser(index) {
                this.dialogFormVisible = true;
                this.dialogActive = index;
            },
            getRefName: function () {

                let refName = '';
                switch (this.dialogActive) {
                    case 0:
                        refName = 'userForm';
                        break;
                    case 1:
                        refName = 'emailForm';
                        break;
                    case 2:
                        refName = 'telForm';
                        break;
                    case 3:
                        refName = 'unbindForm';
                        break;
                    case 4:
                        refName = 'passwordForm';
                        break;
                    case 5:
                        refName = 'realForm';
                        break;
                }
                return refName;
            },
            submitForm: function () {
                var formName = this.getRefName();
                this.$refs[formName].validate((valid) => {

                    if (valid) {
                        console.log('验证成功！');

                        switch (this.dialogActive) {
                            case 0:
                                this.submitNameForm();
                                break;
                            case 1:
                                this.submitEmailForm();
                                break;
                            case 2:
                                this.submitTelForm();
                                break;
                            case 3:
                                break;
                            case 4:
                                this.submitPasswordForm();
                                break;
                            case 5:
                                this.submitRealNameForm();
                                break;
                        }
                    } else {
                        console.log('验证失败！')
                    }
                })
            },
            submitNameForm: function () {
                if (this.userForm.name.length == 0) {
                    this.$message.error('请输入用户名！');
                }
                let param = {};
                param.name = this.userForm.name;
                this.$http.get(config.modifyName, {params: param}).then(response => {
                    console.log(response);
                    if (response.ok) {
                        this.requestUserInfo();
                        this.dialogFormVisible = false;
                    } else {
                        console.log(response);
                        this.$message.error('请求异常！' + response.body.message);
                    }
                }, response => {
                    this.$message.error('请求异常！' + response.body.message);
                })
            },
            submitEmailForm: function () {

            },
            submitTelForm: function () {

            },
            submitPasswordForm: function () {
                if (this.passwordForm.validateCode.length == 0) {
                    this.$message.warning('请输入验证码!');
                    return;
                }
                let param = {};
                param.oldPass = this.passwordForm.oldpassword;
                param.newPass = this.passwordForm.newpassword;
                param.validateCode = this.passwordForm.validateCode;
                this.$http.get(config.modifyPassword, {params: param}).then(response => {
                    console.log(response);
                    if (response.ok) {
                        this.$message.success('修改成功！');
                        this.dialogFormVisible = false;
                    } else {
                        this.$message.error(typeof response.body.message != 'undefined' ? response.body.message : '');
                    }
                }, response => {
                    console.log(response);
                })
            },
            submitRealNameForm: function () {
                if (this.realForm.fileList.length < 2) {
                    this.$message.warning('请上传您的身份证正面和反面照片');
                    return;
                }

                let formData = new FormData();

                for (let i = 0; i < this.realForm.fileList.length; i++) {
                    let rawFile = this.realForm.fileList[i].raw;
                    if (this.handleBeforeUpload(rawFile)) {
                        formData.append('file', rawFile);
                    } else {
                        console.log('身份证图片校验失败！');
                        this.realForm.fileList = [];
                        return;
                    }
                }

                formData.append('realName', this.realForm.realname);
                formData.append('idNomber', this.realForm.idnum);


                this.$http.post(config.realNameAuth, formData).then(response => {
                        if (response.ok) {
                            console.log(response);
                            this.$message('已提交审核！');
                            this.requestUserInfo();
                            this.dialogFormVisible = false;
                        } else {
                            console.log(response);
                            this.$message.error('提交失败！' + response.body.message)
                        }
                    },
                    response => {
                        console.log(response);
                        this.$message.error('提交失败！' + response.body.message);
                    });
            },
            closeEvent: function () {
                var formName = this.getRefName();
                if (typeof this.$refs[formName] !== 'undefined') {
                    this.$refs[formName].resetFields();
                }
                this.realForm.fileList = [];
                this.passwordForm.validateCode = '';
            },
            handlePictureChange(file, fileList) {
                this.realForm.fileList = fileList;
            },
            handlePictureRemove(file, fileList) {
                this.realForm.fileList = fileList;
            },
            handleBeforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isLt5M = file.size / 1024 / 1024 < 5;

                if (!isJPG) {
                    if (!isPNG) {
                        this.$message.error('上传图片只能是JPG格式或PNG!');
                    }
                }
                if (!isLt5M) {
                    this.$message.error('上传文件大小不能超过 5MB');
                }
                return (isJPG || isPNG) && isLt5M;
            },
            handleExceed(files, fileList) {
                this.$message.warning('当前限制选择两个文件!');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .verification-code {
        width: 114px;
        height: 40px;
        border: 0px solid red;
        cursor: pointer;
    }

    .el-button--primary {
        background-color: $primaryColor;
        border-color: $primaryColor;
    }

    .el-input__inner,
    .el-button {
        border-radius: 0;
    }

    .el-radio__input.is-checked + .el-radio__label {
        color: $primaryColor;
    }

    .el-radio__input.is-checked .el-radio__inner {
        background-color: $primaryColor;
        border-color: $primaryColor;
    }

    .acount {
        margin: 30px;
        background-color: #fff;
        text-align: left;
        .invorceTitle {
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #E6E6E6;
            padding-left: 40px;
        }
        .Accountsafe {
            width: 650px;
            margin: auto;
            padding: 70px 0 100px;
            .el-form-item__label,
            .el-form-item__content {
                font-size: 16px;
                color: #999;
            }
            .el-form-item__label {
                padding-right: 30px;
                font-weight: bold;
            }
            .el-button {
                float: right;
                padding: 10px 40px;
            }
            .el-button--info {
                margin-right: 20px;
            }
        }
        .user {
        }
        .code {
            width: 150px;
        }
        .getcode {
            float: right;
            width: 150px;
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
                    padding: 60px 143px 30px;
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
