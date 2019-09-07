<template>
    <div class="userbase">
        <div class="tab">
            <div class="tab-title clearfix">
                <span :class="{active:index == num}"
                      v-for="(item,index) in items" @click="tab(index)">
                    <a>{{item}}</a>
                </span>
            </div>
            <div>
                <div v-show="num === 0" class="certification">
                    <div v-if="isConfirm == 0" >
                        <!-- 未认证 -->
                        <el-form label-position="right" label-width="200px"
                        ref="personCertificateForm" :model="personCertificate"
                        >
                        <el-row>
                            <el-col>
                                <span style="color:#6DA8E1;">该账号尚未进行实名认证！</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="真实姓名">
                                    <el-input v-model.trim="personCertificate.realName"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="身份证号码">
                                    <el-input v-model.trim="personCertificate.idCardNumber"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="10">
                                <el-form-item label="身份证正面照片" class="upload-style">
                                    <el-upload
                                    class="avatar-uploader"
                                    action=""
                                    :show-file-list="false"
                                    accept="image/png , image/jpeg ,image/jpg"
                                    :auto-upload="false"
                                    :on-change="handleIDCardFrontImage"
                                    >
                                    <img v-if="personCertificate.frontImageUrl" :src="personCertificate.frontImageUrl" class="avatar">
                                    <div v-else class="el-upload__text avatar-uploader-icon" style="font-size:15px;color:#6DA8E1;">上传身份证正面</div>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" class="tip-style">
                            <p style="padding:5px">1 照片要求png或jpeg格式</p>
                            <p style="padding:5px">2 大小要求5M以内</p>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                        <el-form-item label="身份证反面照片" class="upload-style">
                            <el-upload
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            accept="image/png , image/jpeg ,image/jpg"
                            :auto-upload="false"
                            :on-change="handleIDCardBackImage"
                            >
                            <img v-if="personCertificate.backImageUrl" :src="personCertificate.backImageUrl" class="avatar">
                                <div v-else class="el-upload__text avatar-uploader-icon" style="font-size:15px;color:#6DA8E1;">上传身份证反面</div>
                            </el-upload>
                        </el-form-item>
                        </el-col>
                        <el-col :span="10" class="tip-style">
                            <p style="padding:5px">1 照片要求png或jpeg格式</p>
                            <p style="padding:5px">2 大小要求5M以内</p>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item>
                            <el-button type="primary" @click="realInfoSubmit()">提交认证</el-button>
                        </el-form-item>
                    </el-row>
                    </el-form>
                </div>
                <div v-if="isConfirm == 1">
                    <!-- 已认证 -->
                    <el-row>
                        <el-col>
                    <i class="el-icon-circle-check" style="color:#6DA8E1;font-size:18px;">您已通过了个人实名认证！</i>
                        </el-col>
                    </el-row>
                    <el-row style="font-size:15px;color:grey;"><el-col>您个人实名认证已成功，您还可以升级至企业账户</el-col></el-row>
                    <div style="font-size:16px;margin-top:20px;">
                    <el-row>
                        <el-col :span="3" align="right" style="font-weight:bold;">个人认证信息</el-col></el-row>
                    <el-row>
                        <el-col :span = "3" align="right">真实姓名</el-col>
                        <el-col :span= "5">{{realInfo.realName}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span = "3" align="right">身份证号码</el-col>
                        <el-col :span= "5">{{realInfo.idCardNumber}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span = "3" align="right">认证时间</el-col>
                        <el-col :span= "5">{{realInfo.certificateTime | formatDate}}</el-col>
                    </el-row>
                    </div>
                </div>
                <div v-if="isConfirm == 2">
                    <!-- 认证审核 -->
                    <el-row>
                        <el-col>
                        <i class="el-icon-info" style="color:#6DA8E1;font-size:18px;">实名认证审核中！</i>
                        </el-col>
                    </el-row>
                </div>
                </div>
                <div v-show="num === 1" class="certification">
                    <!-- 企业认证 -->
                    <el-row>
                        <el-col>
                        <span style="color:#6DA8E1;" v-if="isConfirm == 0">该账号尚未进行实名认证！</span>
                        <span style="color:#6DA8E1;" v-if="isConfirm == 2">实名认证信息审核中！</span>
                        </el-col>
                    </el-row>
                    <el-form label-position="right" label-width="200px"
                    ref="company" :model="company">
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="企业名称">
                                <el-input v-model.trim="company.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <span class="tip-style">请填写企业营业执照上的名称</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="联系方式">
                                <el-input v-model.trim="company.tel"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="联系人">
                                <el-input v-model.trim="company.contact"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="身份证号码">
                            <el-input v-model.trim="company.idCardNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                    <el-row>
                        <el-col :span="10">
                        <el-form-item label="手持证件照片" class="upload-style">
                            <el-upload
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            accept="image/png , image/jpeg ,image/jpg"
                            :auto-upload="false"
                            :on-change="handleIDCardFrontImage"
                            >
                            <img v-if="company.paperworkUrl" :src="company.paperworkUrl" class="avatar">
                                <div v-else class="el-upload__text avatar-uploader-icon" style="font-size:15px;color:#6DA8E1;">选择文件</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" class="tip-style">
                            <p style="padding:5px">1 照片内所持身份证必须在有效期内</p>
                            <p style="padding:5px">2 信息清晰可见，真实有效，无遮挡，无修改</p>
                            <p style="padding:5px">3 照片内持证人五官清晰可见</p>
                            <p style="padding:5px">4 照片要求png或jpeg格式，大小不超过5M</p>
                        </el-col>
                </el-row>
                <el-row>
                <el-col :span="10">
                        <el-form-item label="营业执照照片或组织机构代码证" class="upload-style">
                            <el-upload
                            class="avatar-uploader"
                            action=""
                            :show-file-list="false"
                            accept="image/png , image/jpeg ,image/jpg"
                            :auto-upload="false"
                            :on-change="handleIDCardBackImage"
                            >
                            <img v-if="company.businessLicenseUrl" :src="company.businessLicenseUrl" class="avatar">
                                <div v-else class="el-upload__text avatar-uploader-icon" style="font-size:15px;color:#6DA8E1;">选择文件</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" class="tip-style">
                            <p style="padding:5px">1 信息清晰可见，无遮挡，无修改</p>
                            <p style="padding:5px">2 照片要求png或jpeg格式，大小不超过5M</p>
                        </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item>
                            <el-button type="primary" @click="realInfoSubmit()">提交认证</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                    </el-form>
                </div>
            </div>
        </div>
        <div v-if="false">
            <p class="invorceTitle">注册信息</p>
            <el-row class="resignInfo">
                <el-form ref="form" :model="resignInfo" label-width="100px">
                    <el-col :span="12">
                        <el-form-item label="用户名">
                            <span class="user">{{resignInfo.userName}}</span>
                        </el-form-item>
                        <el-form-item label="昵称">
                            <span v-if="!modify" class="user">{{resignInfo.nickName}}</span>
                            <el-input v-else v-model="resignInfo.nickName">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <span v-if="!modify" class="user">
                                <span v-if="resignInfo.sex == '1'">男</span>
                                <span v-else-if="resignInfo.sex == '2'">女</span>
                                <span v-else="resignInfo.sex == '3'">保密</span>
                            </span>
                            <template v-else>
                                <el-radio v-model="resignInfo.sex" label="1">男</el-radio>
                                <el-radio v-model="resignInfo.sex" label="2">女</el-radio>
                                <el-radio v-model="resignInfo.sex" label="3">保密</el-radio>
                            </template>
                        </el-form-item>
                        <el-form-item label="生日">
                            <span v-if="!modify" class="user">{{resignInfo.birthday}}</span>
                            <el-date-picker
                                v-else
                                v-model="resignInfo.birthday"
                                type="date"
                                value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号码">
                            <span class="user">{{resignInfo.tel}}</span>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <span class="user">{{resignInfo.email}}</span>
                        </el-form-item>
                        <el-form-item label="城市">
                            <span v-if="!modify" class="user">{{resignInfo.city}}</span>
                            <el-input v-else v-model.trim="resignInfo.city">
                            </el-input>
                        </el-form-item>
                        <el-form-item class="setBtn">
                            <el-button type="primary" v-if="!modify" @click="modify = true">修改信息</el-button>
                            <el-button type="info" v-if="modify" @click="registerInfoCancel">取消</el-button>
                            <el-button type="primary" v-if="modify" @click="registerInfoSubmit">保存</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </div>
        <div v-if="false">
            <p class="invorceTitle">实名认证信息
                <el-tag v-if="isConfirm == 0" type="primary">未认证</el-tag>
                <el-tag v-if="isConfirm == 1" type="success">已认证</el-tag>
                <el-tag v-if="isConfirm == 2" type="info">认证审核中</el-tag>
            </p>
            <el-row class="resignInfo">
                <el-form ref="realname" :model="realname" label-width="100px">
                    <el-col :span="12">
                        <el-form-item label="姓名">
                            <span v-if="!modifyname" class="user">{{realname.fullName}}</span>
                            <el-input v-else v-model.trim="realname.fullName">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="证件类型">
                            <span v-if="!modifyname" class="user">
                                <span v-if="realname.Certificates == '1'">身份证</span>
                                <span v-else-if="realname.Certificates == '2'" disabled>签证</span>
                            </span>
                            <template v-else>
                                <el-radio v-model="realname.Certificates" label="1">身份证</el-radio>
                                <el-radio v-model="realname.Certificates" label="2" disabled>签证</el-radio>
                            </template>
                        </el-form-item>
                        <el-form-item label="证件号码">
                            <span v-if="!modifyname" class="user">{{realname.Certifinum}}</span>
                            <el-input v-else v-model.trim="realname.Certifinum">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="证件有效期">
                            <span class="user">{{realname.Certifidate}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <!--<el-form-item label="手机号码">-->
                        <!--<span class="user">{{realname.tel}}</span>-->
                        <!--</el-form-item>-->
                        <el-form-item label="证件照片">
                            <el-upload
                                action=""
                                list-type="picture-card"
                                accept="image/png , image/jpeg ,image/jpg"
                                :auto-upload="false"
                                :limit="2"
                                :file-list="realname.fileList"
                                :disabled="!modifyname"
                                :on-preview="handlePicturePreview"
                                :on-remove="handlePictureRemove"
                                :before-upload="handleBeforeUpload"
                                :on-change="handlePictureChange"
                                :on-exceed="handleExceed"
                            >
                                <i class="el-icon-plus"></i>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
                            </el-upload>
                            <!--<img v-if="!modifyname" v-for="img in realname.fileList" class="pictureStyle"-->
                            <!--:src="img.url">-->

                            <el-dialog :visible.sync="dialogVisible" size="tiny">
                                <img width="100%" :src="realname.dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                        <el-form-item class="setBtn">
                            <div v-if="isConfirm != 2 ">
                                <el-button type="primary" v-if="!modifyname" @click="modifyname = true">修改信息</el-button>
                                <el-button type="info" v-if="modifyname" @click="realInfoCancel">取消</el-button>
                                <el-button type="primary" v-if="modifyname" @click="realInfoSubmit">保存</el-button>
                            </div>
                            <div v-else>
                                <el-button type="info" disabled>认证审核中</el-button>
                            </div>

                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'userbase',
        data() {
            return {
                num:0,
                items:['个人认证','企业认证'],
                modify: false,
                modifyname: false,
                dialogVisible: false,
                resignInfo: {
                    userName: 'yonghuming',
                    nickName: 'lili',
                    sex: '1',
                    birthday: '',
                    tel: 'xxx xxxx xxxx',
                    email: 'xxx@xx.com',
                    city: ''
                },
                realname: {
                    fullName: '未知',
                    Certificates: '1',
                    Certifinum: '未知',
                    Certifidate: '未知',
                    tel: '未知',
                    fileList: [],
                    dialogImageUrl: ''
                },
                personCertificate: {
                    realName:'',
                    idCardNumber:'',
                    idCardFrontPhoto:{},
                    idCardBackPhoto:{},
                    frontImageUrl:'',
                    backImageUrl:''
                },
                company:{
                    name:'',
                    tel:'',
                    contact:'',
                    idCardNumber:'',
                    paperwork:{},
                    businessLicense:{},
                    paperworkUrl:'',
                    businessLicenseUrl:''
                },
                realInfo:{
                    realName:'',
                    idCardNumber:'',
                    certificateTime:''
                },
                defaultValue: {},
                defaultResignInfo: {},
                isConfirm: 0, // 0 未认证 1 已认证 2 认证申请
                imageUrl:''
            }
        },
        mounted: function () {
            //查询用户信息
            this.requestUserData();

        },
        computed: {},
        methods: {
            tab: function(index){
                this.num = index;
            },

            requestUserData: function () {
                this.$http.post(config.userdetails).then(response => {
                        console.log(response);
                        if (response.ok) {

                            this.isConfirm = response.body.isConfirm;
                            // if(this.isConfirm == 1){
                                this.realInfo.realName = response.body.realName;
                                this.realInfo.idCardNumber = response.body.idNomber;
                                this.realInfo.certificateTime = response.body.updateDate;
                            // }


                            //设置实名信息
                            // this.realname.fullName = response.body.realName;
                            // this.realname.Certifinum = response.body.idNomber;
                            // this.realname.tel = response.body.mobile;
                            // const file1 = response.body.uploadIdFile1;
                            // const file2 = response.body.uploadIdFile2;
                            // this.realname.fileList.push({url: config.lslimgurl + file1}, {url: config.lslimgurl + file2});

                            // this.saveDefaultValue(response.body.realName, response.body.idNomber, this.realname.fileList);

                            // //设置注册信息
                            // this.resignInfo.userName = response.body.name;
                            // this.resignInfo.tel = response.body.mobile;
                            // this.resignInfo.email = response.body.email;

                            // this.defaultResignInfo = this.deepCopy(this.resignInfo);


                        } else {

                        }
                    },
                    response => {
                        this.$message.error('请求异常！');
                        console.log(response);
                    })
            },
            registerInfoCancel: function () {
                this.modify = false;
                this.setDefaultResignValue();
            },
            registerInfoSubmit: function () {
                this.modify = false
            },
            deepCopy: function (obj) {
                if (typeof obj != 'object') {
                    return obj;
                }
                let newobj = {};
                for (let attr in obj) {
                    newobj[attr] = this.deepCopy(obj[attr]);
                }
                return newobj;
            },
            saveDefaultValue: function (name, cardId, fileList) {
                this.defaultValue.fullName = name;
                this.defaultValue.Certifinum = cardId;
                this.defaultValue.fileList = fileList.slice(0);
            },
            setDefaultValue: function () {
                this.realname.fullName = this.defaultValue.fullName;
                this.realname.Certifinum = this.defaultValue.Certifinum;
                this.realname.fileList = this.defaultValue.fileList.slice(0);
            },
            setDefaultResignValue: function () {

                this.resignInfo = this.deepCopy(this.defaultResignInfo);

            },
            realInfoCancel: function () {
                this.modifyname = false;
                this.setDefaultValue();
            },
            realInfoSubmit: function () {

                if (this.personCertificate.realName.length == 0) {
                    this.$message.warning('请填写真实姓名');
                    return;
                }

                if (!this.isIdCard(this.personCertificate.idCardNumber)) {
                    this.$message.warning('请填写正确的身份证号码');
                    return;
                }

                if (!this.personCertificate.idCardFrontPhoto)  {
                    this.$message.warning('请上传您的身份证正面照片');
                    return;
                }
                if(!this.personCertificate.idCardBackPhoto){
                    this.$message.warning('请上传您的身份证反面照片');
                    return;
                }

                if(!this.handleBeforeUpload(this.personCertificate.idCardFrontPhoto.raw)){
                    return;
                }
                if(!this.handleBeforeUpload(this.personCertificate.idCardBackPhoto.raw)){
                    return;
                }



                let formData = new FormData();

                // for (let i = 0; i < this.realname.fileList.length; i++) {
                //     let rawFile = this.realname.fileList[i].raw;
                //     if (typeof rawFile === 'undefined') {
                //         console.log('跳过图片验证');
                //         break;
                //     }

                //     if (this.handleBeforeUpload(rawFile)) {
                //         formData.append('file', rawFile);
                //     } else {
                //         console.log('身份证图片校验失败！');
                //         this.realname.fileList = [];
                //         return;
                //     }
                // }

                formData.append('file',this.personCertificate.idCardFrontPhoto.raw);
                formData.append('file',this.personCertificate.idCardBackPhoto.raw);

                formData.append('realName', this.personCertificate.realName);
                formData.append('idNomber', this.personCertificate.idCardNumber);


                this.$http.post(config.realNameAuth, formData).then(response => {
                        if (response.ok) {
                            console.log(response);
                            this.$message.success('已提交审核！');

                            // this.modifyname = false;
                            // this.realname.fileList = [];
                            // this.requestUserData();
                        } else {
                            this.$message.error('提交失败！' + response.body.message);
                        }
                    },
                    response => {
                        this.$message.error('提交失败！' + response.body.message);
                    });
            }
            ,
            isMobile: function (mobile) {
                var patt = /^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;
                return patt.test(mobile);
            }
            ,
            isIdCard: function (card) {
                var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
                return regIdCard.test(card);
            }
            ,
            handlePictureChange(file, fileList) {
                this.realname.fileList = fileList;
            },
            handleIDCardFrontImage(file, fileList) {
                this.personCertificate.idCardFrontPhoto = file;
                this.personCertificate.frontImageUrl = URL.createObjectURL(file.raw);
            },
            handleIDCardBackImage(file, fileList) {
                this.personCertificate.idCardBackPhoto = file;
                this.personCertificate.backImageUrl = URL.createObjectURL(file.raw);
            }
            ,
            handlePicturePreview(file) {
                this.realname.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }
            ,
            handlePictureRemove(file, fileList) {
                console.log('handlePictureRemove');
                this.realname.fileList = [];
            }
            ,
            handleBeforeUpload(file) {
                console.log('handleBeforeUpload');
                console.log(file);
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
            }
            ,
            handleExceed(files, fileList) {
                console.log('handleExceed');
                this.$message.warning('当前限制选择两个文件!');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .el-button--primary {
        background-color: $primaryColor;
        border-color: $primaryColor;
    }

    .el-select .el-input.is-focus .el-input__inner,
    .el-range-editor.is-active, .el-range-editor.is-active:hover,
    .el-input__inner:focus {
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

    .el-upload--picture-card {
        border: 1px solid #d9d9d9;
    }

    .el-upload--picture-card:hover, .el-upload:focus {
        border-color: $primaryColor;
        color: $primaryColor;
    }

    .userbase {
        margin: 30px;
        background-color: #fff;
        text-align: left;
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
        }
        .invorceTitle {
            height: 50px;
            line-height: 50px;
            vertical-align: center;
            border-bottom: 1px solid #E6E6E6;
            padding-left: 40px;
        }



        .certification {
            padding: 20px;
            .tip-style {
            font-size: 13px;
            color:grey;
            }
            .el-form-item {
                .el-form-item__label {
                    padding-right: 20px;
                }
                .el-form-item__content {
                    text-align: left;
                }
            }
            .upload-style {
              .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                overflow: hidden;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
            }
            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 250px;
                height: 178px;
                line-height: 178px;
                text-align: center;
                background-color:#E9F3FC;
            }
            .avatar {
                width: 250px;
                height: 178px;
                display: block;
            }
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
        .resignInfo {
            text-align: center;
            padding: 70px 0 20px;
            .el-form-item {
                width: 300px;
                margin: auto;
                padding: 10px 0;
                .el-form-item__label {
                    padding-right: 20px;
                }
                .el-form-item__content {
                    text-align: left;
                }
            }
            .user {

            }
            .el-input {
                width: 200px;
            }
            .setBtn {
                margin-top: 10px;
            }
            .pictureStyle {
                width: 146px;
                height: 146px;
                border-radius: 5px;
                cursor: pointer;
                margin-left: 8px;
            }
        }
    }
</style>
