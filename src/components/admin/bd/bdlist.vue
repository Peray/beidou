<template>
    <div class="bdlist">
        <el-input placeholder="请输入北斗卡号" v-model="cardinput">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="orderQuery"></i>
        </el-input>
        <div class="bdchild">
            <template>
                <el-table 
                ref="multipleTable"
                :data="dataTable" 
                @selection-change="handleSelectionChange"
                @select="select"
                @select-all="selectAll">
                    <el-table-column type="selection" width="100"></el-table-column>

                    <el-table-column label="序号" type="index" width="50" :index="indexMethod">
                </el-table-column>

                    <el-table-column prop="cardId" label="北斗ID"></el-table-column>

                    <el-table-column prop="cardType" label="卡类型"></el-table-column>

                    <el-table-column prop="frequentncy" label="通信频度"></el-table-column>

                    <el-table-column prop="broadcostCode" label="通播号"></el-table-column>

                    <el-table-column prop="parentCardId" label="所属指挥卡"></el-table-column>

                    <el-table-column prop="startTime" label="申请时间">
                          <template slot-scope="scope">
                        {{new Date(scope.row.startTime).toLocaleString()}}
                    </template>
                    </el-table-column>

                    <el-table-column prop="endTime" label="到期时间">
                        <template slot-scope="scope">
                            {{new Date(scope.row.endTime).toLocaleString()}}
                        </template>
                    </el-table-column>

                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.status}}</span>
                            <i class="edit el-icon-edit-outline" 
                            v-if="dataTable[scope.$index].isSelected" 
                            @click="handleEdit(scope.$index,scope.row)"></i>
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
                :page-size="pageSize"
                layout="prev,pager,next,jumper,total"
                :page-count="pageCount"
                prev-text="上一页"
                next-text="下一页">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="北斗卡挂失" :visible.sync="dialogFormVisible" top="30vh"  @close="resetLostForm">
            <el-form :inline="true" :model="lostForm" :rules="rules" ref="lostForm">
                <el-form-item label="卡号" :label-width="formLabelWidth">
                    <el-input v-model="lostForm.cardId" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="挂失原因" :label-width="formLabelWidth" prop="reason">
                    <el-input type="textarea" v-model="lostForm.reason" placeholder="请填写挂失原因"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitLostForm()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'bdlist',
    data () {
        return {
            cardinput:'',
            currentPage:1,
            pageSize:10,
            pageCount:0,
            dataTable:[],
            multipleSelection:[],
            dialogFormVisible: false,
            lostForm: {
                cardId: '',
                reason:  ''
            },
            formLabelWidth: '80px',
            rules:{
                reason: [{required: true,message:'请填写挂失原因',trigger:'blur'}]
            }
        }
    },
    mounted: function (){
        // this.$refs.multipleTable.toggleRowSelection(this.bdlist[0],false)
        // this.loadData(this.currentPage,this.pageSize)
        var param ={};
        param.pageNum = 1;
        param.pageSize = this.pageSize;
        this.requestList(param);
    },
    computed:{
        UserId(){
            return this.$store.state.LoginedUser.id
        }
    },
    methods:{
        submitLostForm: function(){
            this.$refs.lostForm.validate((valid)=>{
                if(valid){
                    var param = {};
                    param.cardId = this.lostForm.cardId;
                    param.note = this.lostForm.reason;
                    this.$http.get(config.bdkLost,{params:param}).then(response => {
                        if (response) {
                            this.$message.success('挂失成功！');
                            this.dialogFormVisible = false;
                            var param = {};
                            param.pageNum = this.currentPage;
                            this.requestList(param);
                        }
                    },
                        response =>{})
                }else{

                }
            });
        },
        resetLostForm: function(){
            this.$refs.lostForm.resetFields();
        },
        handleEdit(index,row){
            this.lostForm.cardId = row.cardId;
            this.dialogFormVisible = true
        },
        indexMethod(index) {
                return (this.currentPage - 1) * this.pageSize + index + 1;
            },
        loadData(pageNum,pageSize){  
            this.$http.post(config.bdklists,{
                // 'userId':this.UserId,
                'pageNum':pageNum,
                'pageSize':pageSize
            },{emulateJSON:true}).then(response => {
                if (response.ok) {
                    this.dataTable = response.body.list;
                    this.pageCount = response.body.pages;
                }else{
                    console.log(response);
                }
            },
            response => {
                console.log(response);
            });
        },
        requestList(param){
            this.$http.get(config.bdklists,{params: param}).then(response => {
            if (response.ok) {
                if(response.body.list && response.body.list.length > 0){
                    this.dataTable = response.body.list;
                    this.pageCount = response.body.pages;
                }else{
                    this.$message.warning('暂无数据！');
                }
            }else{

            }
        },
        response => {

        });      
      },
        orderQuery(){
            var param = {};
            param.pageNum = 1;
            param.pageSize = this.pageSize;
            param.cardId = this.cardinput;
            this.requestList(param);
        },
        handleSelectionChange(rows){
            this.multipleSelection = rows;
        },
        select(selection,row){
            row.isSelected = !row.isSelected;
        },
        selectAll(selection){
            selection.forEach(row => {
                if(row){
                    row.isSelected = true;
                }else{
                    row.isSelected = false;
                }
                
            });
        },

        handleSizeChange: function (size) {
            this.pageSize = size;
        },
        handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            var param = {};
            param.pageNum = currentPage;
            param.pageSize = this.pageSize;
            this.requestList(param);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $primaryColor: #6DA8E1;
    .bdlist{
        padding:30px;
        text-align: left;
        &>.el-input{
            width:250px;
            margin:0 0 30px;
            .el-input__inner{
                border-radius:0;
            }
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
        .bdchild{
            background-color:#fff;
            &>.el-table thead{
                color:#000;
            }
            &>.el-table th,
            &>.el-table td,{
                text-align: center;
                padding:15px 0;
            }
            &>.el-table th{
                font-size:15px;
            }
            &>.el-table td{
                font-size:13px;
                .edit{
                    margin: -3px -26px 0 10px;
                    cursor:pointer;
                    color: $primaryColor;
                    font-size:16px;
                }
            }
            &>.block{
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
                    padding:30px 20px 0;
                    .el-form{
                        padding: 0 28px;
                        &>.el-form-item:nth-child(1),
                        &>.el-form-item:nth-child(2){
                            &>.el-form-item__label{
                                line-height:35px;
                            }
                            &>.el-form-item__content{
                                width:170px;
                                line-height:35px;
                                .el-input__inner{
                                    height:35px;
                                    border-radius:0;
                                }
                            }
                        }
                        &>.el-form-item:nth-child(3){
                            &>.el-form-item__content{
                                width:434px;
                                .el-textarea{
                                    textarea{
                                        min-height:120px!important;
                                        border-radius:0;
                                    }
                                }
                            }
                        }
                    }
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
                    .el-button--primary{
                        background-color:$primaryColor;
                        border-color:$primaryColor;
                    }
                }
            }
        }
    }
</style>