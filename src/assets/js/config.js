/* jshint esversion: 6 */
//服务器
// const ip = 'http://192.168.0.90:8082/';
// const imgip = 'http://124.193.178.218:8081';

// const adminip = 'http://192.168.0.90:8082/';
// const adminimgip = 'http://124.193.178.218:8081';

// const ip = 'http://124.193.178.218:8082/';
const ip
    // = 'http://124.193.178.218:8081/';
    // = 'http://10.10.1.113:8082/'; //刘士雷
    = 'http://10.10.1.175:8082/';


const imgip
    = 'http://124.193.178.218:8081';
    // = 'http://10.10.1.113:8080'; //刘士雷tomcat

const adminimgip = 'http://124.193.178.218:8081';


export default {
    //前台
    imgsrc: imgip + '',//图片ip
    menuUrl: ip + 'bcsql/menu/execute',// 菜单
    bannerUrl: ip + 'bcsql/news/findListByStatus',//banner图接口
    serviceList: ip + 'bcsql/cpfw/execute',//服务推荐
    servicedetail: ip + 'bcsql/cpfw/getCpDetail',//服务推荐详情
    slovemenuUrl: ip + 'bcsql/jjfa/findListInHome',//解决方案列表
    slovedetailUrl: ip + 'bcsql/jjfa/getOneWithSonByMenuId',//解决方案详情
    cooUrl: ip + 'bcsql/hzhb/findAll',//合作伙伴
    hardUrl: ip + 'bcsql/yjsb/execute',//硬件设备
    harddetailUrl: ip + 'bcsql/yjsb/getCpDetail',//硬件设备详情
    login: ip + 'admin/login',//登录
    logout: ip + 'admin/logout',//退出
    register: ip + 'noUser/register/registerUser',//注册

    //后台
    adminimgfile: ip + '',
    adminmenu: ip + 'admin/menu/execute',//菜单
    adminimgsrc: adminimgip + '',//图片ip

    //用户详情
    userdetails: ip + 'admin/sys/user/info',//菜单
    // adminsMenu: ip + 'admin/sys/user/userRole',//管理员菜单

    //我的问题
    queryAnswerList: ip + 'admin/questionAnswer/findListByVo',//查询问题列表
    addAnswerUrl: ip + 'admin/questionAnswer/addOne',//添加问题
    lslimgurl: imgip + '/web_image_uploads/',//图片ip
    queryAnswerDetail: ip + 'admin/questionAnswer/findImgsByQaId',

    //地址管理
    addAddress: ip + 'admin/address/addOne',//添加地址
    deleteAddress: ip + 'admin/address/delById',//删除地址
    updateAddress: ip + 'admin/address/editOne',//编辑地址
    queryAddressList: ip + 'admin/address/findListByUserId',//查询地址
    setDefaultAddress: ip + 'admin/privateMessage/setDefaultAddress',

    getProvinceList: ip + 'admin/area/getProvinceList',
    getCityList: ip + 'admin/area/getCityList',
    getCountyList: ip + 'admin/area/getCountyList',

    //消息
    getSystemSMS: ip + 'bcsql/news/findListByPage',//查询系统消息
    getPrivateSMS: ip + 'admin/privateMessage/findAll',//查询私人消息
    getSMSCountNotRead: ip + 'admin/privateMessage/findListNotRead',//查询未读消息
    getUnReadMessageRead: ip + 'admin/privateMessage/getCountNotRead',//查询未读消息数量
    setSMSReaded: ip + 'admin/privateMessage/setReaded',//设置已读
    getUnReadMessageCount: ip + 'admin/privateMessage/getCountNotRead',//查询未读消息数量

    //北斗卡申请表单
    bdkapply: ip + 'admin/cardRequest/userAdd',//北斗卡申请
    ordercommit: ip + 'admin/orderItem/orderList',//订单详情
    getAddress: ip + 'admin/address/findListByUserId',//获取地址
    bdksubmit: ip + 'admin/orderItem/addAddress',//订单确认
    bdklist: ip + 'admin/cardRequest/requestList',//订单申请列表
    bdkDetail: ip + 'admin/orderItem/orderDetail',//订单申请列表详情
    bdkSh: ip + 'admin/cardRequest/getDetail',//订单审核
    bdkReview: ip + 'admin/orderOperator/reviewOrder',//订单审核提交
    bdkAdd: ip + 'admin/northCard/addOne',//增加北斗卡
    bdkDelete: ip + 'admin/orderItem/delete',//订单删除

    //硬件购买
    hardwareStock :ip + 'admin/hardwareRequest/userAdd',

    //北斗卡列表
    // bdklists: ip + 'admin/northCard/findListByUser',//北斗卡列表
    bdklists: ip + 'admin/northCard/findListByPage',//北斗卡列表
    bdklistsquery: ip + 'admin/northCard/getOneByCardId',//北斗卡列表
    getBdCardRelList: ip + 'admin/cardBind/requestList',//北斗卡关联列表
    bdkLost: ip + 'admin/northCard/lossReq',//北斗卡挂失

    //数据管理
    bdMessageQuery: ip + 'admin/dbSms/findListByPage', //短报文查询
    locateMessageQuery: ip + 'admin/location/findListByPage',//定位数据查询


    //个人信息
    realNameAuth: ip + 'admin/sys/user/realNameAuthentication',//实名认证
    modifyPassword: ip + 'admin/admin/sys/user/editPassword',//修改密码
    realNameVerify: ip + 'admin/sys/user/realNameAudit',//认证审核
    modifyMobile: ip + 'admin/sys/user/bindMobile',
    bindEmail: ip + 'admin/sys/user/bindEmail',
    modifyName: ip + 'admin/sys/user/editName',
    // validateCodeUrl: ip + 'useradmin/servlet/validateCodeServlet',
    validateCodeUrl: ip + 'noUser/validateCode/createImage',


    //飞行器管理
    getAircraftList: ip + 'admin/airplaneManager/findListByPage',
    getOneAircraft: ip + 'admin/airplaneManager/getOneByTailCode',
    registerAircraft: ip + 'admin/airplaneManager/register',

    //发票管理
    getInvoiceList: ip + 'admin/invoice/findListByPage',//查询发票列表

    addInvoice: ip + 'admin/invoice/userAdd',//添加发票
    deleteInvoice: ip + 'admin/invoice/userDelete',
    updateInvoice: ip + 'bcsql/invoice/userEdit',

    downloadFileUrl: 'http://124.193.178.218:8081' + '/web_image_uploads/hkxxb.docx',

    //管理员
    getBdCardListByOrderId: ip + 'admin/northCard/findListByPage', //获取已添加的北斗卡列表
    deleteBdCardByCardId: ip + 'admin/northCard/delOne',//删除北斗卡
    queryCardIdIsExist: ip + 'admin/northCard/verify', //查询北斗卡是否存在
    submitExpressNumber: ip + 'admin/orderItem/addSmsOrder', //提交快递单号

    //订单管理
    confirmReceipt: ip + 'admin/orderItem/finishOrder',//确认收货

    //gis快视图查询
    queryQuickViewById: ip + 'admin/quickView/queryById',
    //新增快捷视图
    insertQuickView: ip + 'admin/quickView/insertQuickView',
    //根据PID查询父节点组 有问题
    queryQuickViewGroupByPid: ip + 'admin/quickView/queryByPid',

    //获取图层父节点
    queryTypeDict: ip + 'admin/layerControl/queryTypeDict',
    queryBylayerGroupIdLayer: ip + 'admin/layerControl/queryBylayerGroupIdLayer',

    //修改图层信息
    updateByIdlayerOrderAndlayerDisplay: ip + 'admin/layerControl/updateByIdlayerOrderAndlayerDisplay',

    //新增图层
    insertLayerControl: ip + 'admin/layerControl/insertLayerControl',
    //删除图层
    deleteLayerControl: ip + 'admin/layerControl/delBatch',

    //保存图层feature
    insertFeaturesManager: ip + 'admin/featuresManager/insertFeaturesManager',

    //获取图层feature
    queryBylayerIdFeaturesManager: ip + 'admin/featuresManager/queryBylayerIdFeaturesManager',

    //根据北斗卡ID查询最新位置
    queryByCardIdNewestLocation: ip + 'admin/location/queryByCardIdNewestLocation',
    //根据北斗卡cardId和 location_time时间区间查询历史轨迹
    queryByCardIdAndLocationTime: ip + 'admin/location/queryByCardIdAndLocationTime',

    //根据北斗卡cardId查询飞行器信息
    queryByCardIdAirplaneCardBind: ip + 'admin/cardBind/queryByCardIdAirplaneCardBind',

    //根据北斗卡ID修改北斗卡信息
    updateByCardIdNorthCard: ip + 'admin/northCard/updateByCardIdNorthCard',

    //根据用户ID查询北斗卡及飞行器相关信息
    queryNorthCard: ip + 'admin/northCard/queryNorthCard'
    //删除feature 
};

