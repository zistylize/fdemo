
var needImportJs = [
    "subs/callOCR.js",
    "subs/callContacts.js",
    "subs/vivoDetection.js",
    "subs/cmpCommonPay.js",
    "subs/billQuery.js",
    "subs/callNative.js",
    "subs/wechat.js"
];

function ImportJSFileToJs(e){

    //https://www.cnblogs.com/junb/p/4253544.html
    var t=document.getElementsByTagName("SCRIPT"),
    src = t[t.length - 1].src,
    baseSrc = src.replace(/(\/[^\/]*?)$/i, '');

    for(var i =0; i<e.length; i++){        
        var fullp = baseSrc + "/" + e[i];
        var scrp = "<script src=" + "'" +fullp + "'" + "></script>";
        document.write(scrp);
        //https://blog.csdn.net/qq_42249896/article/details/90769809
    }
};


;(function($){
    if($.hbts != null) return;

    $.hbts = {
        isWkjs : function(){
            var type = localStorage.getItem("ios-webview-type");
            if(type == null) return true;
            var isWk = type === '1'? true : false;
            return isWk;
        },
    };

    //alert在低机型中卡死
    //https://www.jianshu.com/p/83b5522b4607
    //https://www.onezen.cc/2017/09/15/iosissues/webviewdead/


    $.ShowAlert = function (e){
        setTimeout(function(){
            alert(e);
        },100)                
    };
    
    $.isWkjs = hbts.isWkjs;

    ImportJSFileToJs(needImportJs);


    //网页内部再打开另一个webview   
    hbts.goWeb = {
        config : {
            title : "网页内部再打开其它页面",
            selects : [{
                categroy : "接口类型",
                list : [{
                    name : "goWeb",
                    key : "type",
                    value : 1,
                    cheched : true
                },{
                    name : "goWebNoLogin",
                    key : "type",
                    value : 2,
                },{
                    name : "ToApp",
                    key : "type",
                    value : 3,
                }]
            }],
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "目标地址",
                        key : "target",
                        placeholder : "输入目标地址"
                    }
                ]
            },
            info :{
                categroy : "信息说明",
                descText  : "goWeb和goWebNoLogin都支持activity协议和http链接，后者不对链接单点登录。输入示例：activity://ZZ 或者 https://www.baidu.com \n\
                ToApp只支持activity协议，且不能带activity:// 。输入示例：BDYHK \
                ",   //说明
                other : {} //备用数据
            }
        },
        handle : function(e){
            var isWk = this.isWkjs();
            if(!isWk){
                if (e.type === '1') {
                    goWeb(e.target);
                }else if(e.type === '2'){
                    goWebNoLogin(e.target);
                }else{
                    ToApp(e.target);
                }
            }else{
                if (e.type === '1') {
                    hebaoWkjs.doCall("goWeb",e);
                }else if(e.type === '2'){
                    hebaoWkjs.doCall("goWebNoLogin",e);
                }else{
                    hebaoWkjs.doCall("ToApp",e);
                }
            }
        }   
    };


     //退出和包
     hbts.exitHebao = function(){
        var isWk = this.isWkjs();
        var mys = confirm("确定要退出和包吗？");
        if(mys == true){
            if (!isWk) {
                CmpExitAction();
            }else{
                hebaoWkjs.doCall('CmpExitAction');
            }
        }
    };


     //打开浏览器
     hbts.openSafari = function(){
        var isWk = this.isWkjs();
        if (!isWk) {
            openSafari('https://magi.com');
        }else{
            hebaoWkjs.doCall('openSafari',{url:'https://magi.com'});
        }
    };


     //我的客服
     hbts.serviceOnline = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            CmpServiceOnline();
        }else{
            hebaoWkjs.doCall('CmpServiceOnline');
        }
    };

    
     //我要反馈
     hbts.feedback = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            CmpNeedFeedback();
        }else{
            hebaoWkjs.doCall('CmpNeedFeedback');
        }
    };

    //唤起小程序
    hbts.openMiniApp = {
        config : {
            title : "唤起小程序",
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "小程序ID",
                        key : "miniID",
                        placeholder : "输入小程序ID"
                    }
                ]
            }
        },
        handle : function (e){
            var isWk = isWkjs(); 
            if (isWk) {
                hebaoWkjs.doCall("openMiniApplication",e,function(c){
                    doLog("新式回调结果："+c);
                });
            } else {
                openMiniApplication(e.miniID);
            }
        }
    };


    //调起深度链接 
    hbts.openMigu = function(){
        var isWk = this.isWkjs();
        var obj = {
            openUrl : 'miguvideo://amber_deeplink?DLSI=a75b353fe99443b5af2edd6bf443414e&amp;JA=miguvideos',
            downUrl : 'https://itunes.apple.com/cn/app/id787130974'
        };
        if (!isWk) {            
            cmpOpenDeepLinkApp(obj.openUrl, obj.downUrl);
        }else{
            hebaoWkjs.doCall('cmpOpenDeepLinkApp',obj);
        }
    };


    //游客登录
    hbts.touristLogin = {
        config : {
            title : "游客模式拉起登录页面",
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "回调页面地址",
                        key : "url",
                        placeholder : "输入页面地址"
                    }
                ]
            },
            info : {
                categroy : "参数说明",
                descText : "回调页面地址targetUrl为登录成功后回调页面地址，如果不传该值，则登录成功回调函数也不会传入单点登录后拼接的地址"
            }
        },
        handle : function (e){
            e.ssoFlagStr = 'true';
            $.touristLoginSuccessCallback = function(r) {
                doLog("老式回调结果："+r);
            }
            var isWk = isWkjs(); 
            if (isWk) {
                hebaoWkjs.doCall("touristLogin",e,function(c){
                    doLog("新式回调结果："+c);
                });
            } else {
                touristLogin(e.targetUrl);
            }
        }
    };

   

    //单点登录   
    hbts.ssoLogin = {
        config : {
            title : "单点登录",
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "目标链接",
                        key : "urlStr",
                        placeholder : "输入url"
                    }
                ]
            }
        },
        handle : function(e){
            $.callBackSSOResult = function(e){
                var j = JSON.stringify(e);
                doLog(j);
            }
            var isWk = this.isWkjs();
            if(!isWk){
                CmpGetSsoUrl(e.urlStr);
            }else{
                hebaoWkjs.doCall("CmpGetSsoUrl",e);
            }
        }   
    }


     //导航栏操作  
     hbts.navView = {
        config : {
            title : "导航栏操作",
            selects : [{
                categroy : "接口类型",
                list : [{
                    name : "显示导航栏",
                    key : "type",
                    value : 1,
                    cheched : true
                },{
                    name : "隐藏导航栏",
                    key : "type",
                    value : 2,
                },{
                    name : "设置标题",
                    key : "type",
                    value : 3,
                }]
            }],
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "标题",
                        key : "title",
                        placeholder : "输入标题"
                    }
                ]
            }
        },
        handle : function(e){
            var isWk = this.isWkjs();
            if(!isWk){
                if (e.type === '1') {
                    showNavView();
                }else if(e.type === '2'){
                    hideNavView();
                }else{
                    CmpChangeTitle(e.title);
                }
            }else{
                if (e.type === '1') {
                    hebaoWkjs.doCall("showNavView");
                }else if(e.type === '2'){
                    hebaoWkjs.doCall("hideNavView");
                }else{
                    hebaoWkjs.doCall("CmpChangeTitle",e);
                }
            }
        }   
    };


    //显示Toast2.5秒
    hbts.showToast = function(){ 
        var isWk = this.isWkjs();
        if (!isWk) {
            showToast('测试文字-老接口');
        }else{
            hebaoWkjs.doCall('showToast',{message:'测试文字-新接口'});
        }
    };


    //亮度调节
    hbts.changBright = {
        config : {
            title : "亮度调节",
            selects : [{
                categroy : "亮度调节类型",
                list : [{
                    name : "亮度调节",
                    key : "type",
                    value : 1,
                    cheched : true
                },{
                    name : "关闭亮度调节",
                    key : "type",
                    value : 2,
                }]
            }],
            input : {
                categroy : "信息填写",               
                list : [
                    {
                        name : "亮度值",
                        key : "value",
                        placeholder : "输入亮度值(0~1.0)"
                    }
                ]
            }
        },
        handle : function (e){
            var isWk = isWkjs(); 
            if (isWk) {
                if(e.type == '1'){
                    hebaoWkjs.doCall("CmpSetOpenBrightnessValue",e);
                }else{
                    hebaoWkjs.doCall("CmpSetColseBrightnessValue");
                }
            } else {
                if(e.type == '1'){
                    CmpSetOpenBrightnessValue(e.value);
                }else{
                    CmpSetColseBrightnessValue();
                }
            }
        }
    };


    //动态菜单
    hbts.dynamicMenu = {
        config : {
            title : "导航栏操作",
            selects : [{
                categroy : "接口类型",
                list : [{
                    name : "设置动态菜单",
                    key : "type",
                    value : 1,
                    cheched : true
                },{
                    name : "清除动态菜单",
                    key : "type",
                    value : 2,
                }]
            }]
        },
        handle : function(e){
            $.dynmCallback = function(e){
                ShowAlert('点击了' + e);
            }
            var list = [{menuName:'按钮1',menuUrl:"dynmCallback('按钮1');"},
                        {menuName:'按钮2',menuUrl:"dynmCallback('按钮2');"},
                        {menuName:'按钮3',menuUrl:"dynmCallback('按钮3');"}]

            var isWk = this.isWkjs();
            if(!isWk){
                if (e.type === '1') {
                    CmpSetTitleMenuList(list);
                }else{
                    H5CmpRemoveTitleMenuList();
                }
            }else{
                if (e.type === '1') {
                    hebaoWkjs.doCall("CmpSetTitleMenuList",{params : list});
                }else{
                    hebaoWkjs.doCall("H5CmpRemoveTitleMenuList");
                }
            }
        }   
    };


      //获取统一认证token
      hbts.getTokenForH5 = function(){
        $.getTokenForH5CallBack = function(status,token){
            ShowAlert('status: '+status + " token: "+ token);
        };
        var isWk = this.isWkjs();
        if (!isWk) {            
            getTokenForH5() ;
        }else{
            hebaoWkjs.doCall('getTokenForH5',function(r){
                var j = JSON.stringify(r);
                ShowAlert(j);
            });
        }
    };

     //网络状态 
     hbts.networkType = function(){
        $.getNetworkType_callback = function (e){
            ShowAlert(e);
        };
        var isWk = this.isWkjs();
        if(!isWk){
            getNetworkType();
        }else{
            hebaoWkjs.doCall('getNetworkType');
        }
    };

     //获取版本号
     hbts.fetchVersion = function(){
        $.callBackFetchVersion =function(e){
            ShowAlert(e);
        }
        var isWk = this.isWkjs();
        if (!isWk) {
            fetchVersion(); 
        }else{
            hebaoWkjs.doCall('fetchVersion');
        }
    };


    
    //是否本机
    hbts.checkIsLocalNumber = function(){

        $.callbackCheckIsLocalNum = function(e){
            var m = "是否本机结果 ：" + e;
            ShowAlert(m);
        };
    
        var isWk = this.isWkjs();
        var val = prompt("请输入手机号码");
        if(val !=null && val.length > 10){
            if (!isWk) {
                CmpCheckIsLocalNumber(val);
            } else {
                hebaoWkjs.doCall('CmpCheckIsLocalNumber',{phoneNumber : val});
            }
        }
    };


     //检测更新  
     hbts.checkAppVersion = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            downLatestApp();
        }else{
            hebaoWkjs.doCall('downLatestApp');
        }
    };    


    //获取定位信息-实时
    hbts.getExactLocationInfo = function(){
        $.callBackGetExactLocationInfo = function(e){
            ShowAlert(e);
        };    
        var isWk = this.isWkjs();
        if (!isWk) {
            getExactLocationInfo('callBackGetExactLocationInfo');
        }else{
            hebaoWkjs.doCall('getExactLocationInfo',{jsCallBack:'callBackGetExactLocationInfo'});
        }
    };
       
    //获取定位信息-缓存
    hbts.getLocationInfo = function(){
        $.callBackGetLocationInfo = function(e){
            ShowAlert(e);
        };    
        var isWk = this.isWkjs();
        if (!isWk) {
            getLocationInfo();
        }else{
            hebaoWkjs.doCall('getLocationInfo');
        }
    };

    //消息推送弹窗
    hbts.showNotifDialog = function(){
        var isWk = this.isWkjs();
        if (!isWk) {
            showRequestNotificationPermissionDialog();
        }else{
            hebaoWkjs.doCall('showRequestNotificationPermissionDialog');
        }
    };


    //拉起发短信
    hbts.evokeMsgUI = {
        config : {
            title : "拉起短信面板",
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "手机号码",
                        key : "phoneNum",
                        placeholder : "输入手机号码"
                    },
                    {
                        name : "短信内容",
                        key : "content",
                        placeholder : "输入短信内容"
                    }
                ]
            },
        },
        handle : function (e){
            var isWk = isWkjs(); 
            if (isWk) {
                hebaoWkjs.doCall('MessageUI',e);
            }else{
                MessageUI(e.phoneNum,e.content);
            }
        }
    };


    //拨打电话
    hbts.callPhone = function(){
        var isWk = this.isWkjs();
        var val = prompt("请输入手机号码");

        if(val && val>7){
            if(!isWk){
                CmpCmpDailNumber({phoneNumber:val});
            }else{
                hebaoWkjs.doCall('CmpCmpDailNumber',{phoneNumber:val});
            }
        }
    };

    //保存图片 
    hbts.savePicToAlbum = function(){
        var isWk = this.isWkjs();
        var imgUrl = 'https://pic2.zhimg.com/711713742_xll.jpg';            
        if (!isWk) {
            CmpSavePicToAlbum(imgUrl); 
        }else{
            hebaoWkjs.doCall('CmpSavePicToAlbum',{imgUrl:imgUrl});
        }
    };

    //拉起地图
    hbts.openMapLocation = function(){
        var obj = {
            startName : '长沙火车站',
            endName : '长沙天园假日小区',
            startLatitude : '28.197272',
            startLongitude : '112.983306',
            endLatitude : '28.196794',
            endLongitude : '113.07177'
        };

        var isWk = this.isWkjs();
        if (!isWk) {
            CmpOpenMapLocation( obj.startName , 
                                obj.endName ,
                                obj.startLatitude , 
                                obj.startLongitude,
                                obj.endLatitude , 
                                obj.endLongitude );
        }else{
            hebaoWkjs.doCall('CmpOpenMapLocation',obj);
        }
    };



    //拍照
    hbts.takePhoto = function(){
        var isWk = this.isWkjs();
        if (!isWk) {
            CmpTakePhoto(0,0); 
        }else{
            hebaoWkjs.doCall('CmpTakePhoto',{});
        }
    };

  
    //初始化地铁SDK 
    hbts.startHtcsCode = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            CmpStartHtcsCode({key:"00000000000000000000"});
        }else{
            hebaoWkjs.doCall('CmpStartHtcsCode',{params: {key:"00000000000000000000"}});
        }
    };  

     //发送信息给地铁SDK?什么消息？ 
     hbts.sendToHtcsCode = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            CmpSendToHtcsCode({key:"00000000000000000000"});
        }else{
            hebaoWkjs.doCall('CmpSendToHtcsCode',{params: {key:"00000000000000000000"}});
        }
    };    

    //地铁缓存操作
    hbts.metroValue = {
        config : {
            title : "地铁数据缓存",
            selects : [{
                categroy : "操作类型",
                list : [{
                    name : "写缓存",
                    key : "type",
                    value : 1,
                    cheched : true
                },{
                    name : "读缓存",
                    key : "type",
                    value : 2,
                }]
            }],
            input : {
                categroy : "信息填写",               
                list : [
                    {
                        name : "缓存值",
                        key : "value",
                        placeholder : "输入任意字符"
                    }
                ]
            }
        },
        handle : function (e){            
            var isWk = isWkjs(); 
            if(e.type == '1'){
                if(!isWk){
                    CmpSetCsMetroValue(e.value);
                }else{
                    hebaoWkjs.doCall('CmpSetCsMetroValue',e);
                }
            }else{
                $.callBackCMPCsMetroValue = function (e){
                    ShowAlert('缓存信息：'+ e)
                };
                if(!isWk){
                    CmpGetCsMetroValue();
                }else{
                    hebaoWkjs.doCall('CmpGetCsMetroValue');
                }
            }
        }
    };


    //扫一扫 
    hbts.scanCodeByApp = function(){
        var isWk = this.isWkjs();
        if (!isWk) {
            scanCodeByApp();
        }else{
            hebaoWkjs.doCall('scanCodeByApp');
        }
    };

     //扫一扫原生处理 
     hbts.scanCodeByAppWithParam = function(){
        $.callbackScanCodeByAppWithParam = function(e){
            ShowAlert(e);
        }
        var isWk = this.isWkjs();
        if (!isWk) {
            scanCodeByAppWithParam(true);
        }else{
            hebaoWkjs.doCall('scanCodeByAppWithParam',{backJs:true});
        }
    };




    //分享功能
    hbts.shareAction = function(){
        var isWk = this.isWkjs();
        if (!isWk) {
            CMPShareAction( 'www.baidu.com' , '我是一个标题' ); 
        }else{
            hebaoWkjs.doCall('CMPShareAction',{shareUrl:'www.baidu.com',shareDetail: '是一个标题'});
        }
    };


    //分享到QQ
    hbts.shareToQQ = function(){
        $.shareCallback = function(e){
            ShowAlert('回调结果'+e);
        }
        var isWk = this.isWkjs();
        if (!isWk) {            
            shareToQQ( '分享测试' , 'https://www.baidu.com' , '哈哈哈你好呀' , '' );
        }else{
            hebaoWkjs.doCall('shareToQQ',{title:'分享测试',url:'https://www.baidu.com',detail:'哈哈哈你好呀'});
        }
    };

     //分享到微信
     hbts.shareToWeChat = function(){
        $.shareCallback = function(e){
            ShowAlert('回调结果'+e);
        }
        var isWk = this.isWkjs();
        if (!isWk) {
            shareToWeChat( '分享测试' , 'https://www.baidu.com' , '哈哈哈你好呀' , '' );
        }else{
            hebaoWkjs.doCall('shareToWeChat',{title:'分享测试',url:'https://www.baidu.com',detail:'哈哈哈你好呀'});
        }

    };

     //分享到微博
     hbts.shareToSinaWeibo = function(){
        $.shareCallback = function(e){
            ShowAlert('回调结果'+e);
        }
        var isWk = this.isWkjs();
        if (!isWk) {            
            shareToSinaWeibo('我是分享的内容', 'https://www.baidu.com') ;
        }else{
            hebaoWkjs.doCall('shareToSinaWeibo',{title:'分享测试',url:'https://www.baidu.com',detail:'哈哈哈你好呀'});
        }
    };

    //分享到微信朋友圈
    hbts.shareToWeChatGroup = function(){
        $.handleSuccess = function(e){
            ShowAlert('回调结果'+e);
        }
        var isWk = this.isWkjs();
        if (!isWk) {            
            shareToWeChatGroup('分享标题', 'https://www.baidu.com','哈哈哈你好呀') ;
        }else{
            hebaoWkjs.doCall('shareToWeChatGroup',{title:'分享测试',url:'https://www.baidu.com',detail:'哈哈哈你好呀'});
        }
    };

    //amount 新老接口均调通
    hbts.recharge = {
        config : {
            title : "充值",
            input : {
                categroy : "信息填写",
                list :[
                    {
                        name : "充值金额",
                        key : "amount",
                        placeholder : "充值金额"
                    }
                ]
            },
        },
        handle : function (e){           
            var isWk = isWkjs(); 
            if (isWk) {
                hebaoWkjs.doCall('callToPayRecharge',e);
            }else{
                callToPayRecharge(e.amount);
            }
        }
    };


    //调用支付插件（旧接口）
    hbts.checkPayPassword = function(){

        $.callBackCMPCheckPayPassword = function(e){
            ShowAlert("支付插件结果"+e);
        };
        
        var isWk = this.isWkjs();
        if (!isWk) {            
            CMPCheckPayPassword();
        }else{
            hebaoWkjs.doCall('CMPCheckPayPassword');
        }
    };

    //调用支付插件（新接口）(名字错误)
    hbts.checkPayPasswordNew = function(){

        $.callBackCMPCheckPayPasswordNew = function(e){
            ShowAlert("调用支付插件结果:"+e);
        };
        var isWk = this.isWkjs();
        if (!isWk) {            
            CMPResetPayPasswordNew();
        }else{
            hebaoWkjs.doCall('CMPCheckPayPasswordNew'); //名字修正
        }
    };

     //重置支付密码
     hbts.resetPayPassword = function(){

        $.callBackCMPResetPayPassword = function(e){
            ShowAlert("重置密码结果:"+e);
        };

        var isWk = this.isWkjs();
        if (!isWk) {            
            CMPResetPayPassword();
        }else{
            hebaoWkjs.doCall('CMPResetPayPassword');
        }
    };    



    //调起名片SDK
    hbts.goBusinessSDK = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            goBusinessSDK();
        }else{
            hebaoWkjs.doCall('goBusinessSDK');
        }
    };


    //拉起原生名片 
    hbts.goCardClipIndex = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            goCardClipIndex();
        }else{
            hebaoWkjs.doCall('goCardClipIndex');
        }
    };

    //和包果园添加好友
    hbts.goMocamContact = function(){
        $.addFriend = function(r) {
            ShowAlert("回调结果："+r);
        }   
        var isWk = this.isWkjs();
        if(!isWk){
            goMocamContact();
        }else{
            hebaoWkjs.doCall('goMocamContact');
        }
    };



    //不知道干啥用的 
    hbts.readCardInfo = function(){
        $.callBackCmpReadCardInfo = function(e){
            ShowAlert(e);
        }
        var isWk = this.isWkjs();
        if (!isWk) {
            CmpReadCardInfo( 'https://wwww.baidu.com' , 'https://www.taobao.com');
        }else{
            hebaoWkjs.doCall('CmpReadCardInfo',{xx1:'https://wwww.baidu.com',xx2:'https://www.taobao.com'});
        }
    }

    //和包红包专用
    hbts.goBatchPacketsContact = {
        config : {
            title : "和包红包专用",
            input : {
                categroy : "信息填写",
                list :[
                    {
                        name : "数量？",
                        key : "total",
                        placeholder : "输入"
                    },
                    {
                        name : "内容？",
                        key : "content",
                        placeholder : "输入"
                    }
                ]
            },
        },
        handle : function (e){
            $.callBackGetPacketsContacts = function(r) {
                doLog("回调结果："+r);
            }
            var isWk = isWkjs(); 
            if (isWk) {
                hebaoWkjs.doCall('goBatchPacketsContact',e);
            }else{
                goBatchPacketsContact(e.total,e.content);
            }
        }
    };

    //刷新二维码状态
    hbts.CmpNoticeCardChangeStatu = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            CmpNoticeCardChangeStatu();
        }else{
            hebaoWkjs.doCall('CmpNoticeCardChangeStatu');
        }
    };


    //设置支付密码后通知客户端
    hbts.CmpSyncPayPwdSts = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            CmpSyncPayPwdSts();
        }else{
            hebaoWkjs.doCall('CmpSyncPayPwdSts');
        }
    };


    //刷新和聚宝资产
    hbts.notifyHJBBalanceUpdate = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            notifyHJBBalanceUpdate();
        }else{
            hebaoWkjs.doCall('notifyHJBBalanceUpdate');
        }
    };

    //和小窗删除信息调用
    hbts.deletehxc = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            deletehxc();
        }else{
            hebaoWkjs.doCall('deletehxc');
        }
    };

    //清除游客模式 ？？
    hbts.clearTouristModel = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            clearTouristModel();
        }else{
            hebaoWkjs.doCall('clearTouristModel');
        }
    };

    //h5页面返回拦截 
    hbts.addInterceptPageUrl = function(){
        var isWk = this.isWkjs();
        var list = [{url:'/',jsCallBack:"ShowAlert('你确定要退出本页面吗？')"}];
        if(!isWk){
            addInterceptPageUrl(JSON.stringify(list));
        }else{
            hebaoWkjs.doCall('addInterceptPageUrl',{jsonArrays:JSON.stringify(list)});
        }
    };

    hbts.bank_yhkxq = {
        config : {
            title : "网页版银行卡银行卡信息",
            input : {
                categroy : "信息填写",
                list :[
                    {
                        name : "银行编号",
                        key : "bankCode",
                        placeholder : "输入银行编号"
                    },
                    {
                        name : "银行名称",
                        key : "bankName",
                        placeholder : "输入银行名称"
                    },
                    {
                        name : "协议号",
                        key : "bankAgreementNo",
                        placeholder : "输入协议号"
                    },
                    {
                        name : "预留手机号",
                        key : "bankMobileNo",
                        placeholder : "输入手机号"
                    },
                    {
                        name : "卡末4位",
                        key : "cardLastNo",
                        placeholder : "输入卡末4位",
                    },
                    {
                        name : "银行卡类型",
                        key : "cardType",
                        placeholder : "见参数说明",
                    },
                    {
                        name : "签约日期",
                        key : "signDate",
                        placeholder : "yyyymmdd",
                    },
                    {
                        name : "是否安全卡",
                        key : "secureCard",
                        placeholder : "见参数说明",
                    }
                ]
            },
            info : {
                categroy : "参数说明",
                descText : "银行卡类型 0:借记卡，1:信用卡\n 是否安全卡 0:非安全卡 1：安全卡 2：安全卡解除快捷"
            }
        },
        handle : function (e){
            //{"bankCode":"CMB","bankName":"招商银行","bankAgreementNo":"NEWAG000000030637053","bankMobileNo":"15874252636",
            //"cardLastNo":"3966","cardType":"0","signDate":"20200210","bankColorType":"red",
            //"paymentLimit":"单笔10000元 / 每日10000元 / 每月50000元","secureCard":"0"}
            var _json = JSON.stringify(e);
            var isWk = isWkjs(); 
            if (isWk) {
                hebaoWkjs.doCall('yhkxq',{jsonCard:_json});
            }else{                
                yhkxq(_json);
            }
        }
    };

    //快捷绑卡(H5方式)完成 客户端返回前置页面 测试页无意义，返回俩层页面
    hbts.finishFastBindingCard = function(){
        var isWk = this.isWkjs();
        if(!isWk){
            finishFastBindingCard();
        }else{
            hebaoWkjs.doCall('finishFastBindingCard');
        }
    };


    //H5调起头像修改原生页面---wk改版后接口(无老接口)
    hbts.goUserHeadActivity = function(){
        hebaoWkjs.doCall('goUserHeadActivity',function(e){
            ShowAlert(JSON.stringify(e));
        });
    };

    //h5调用提现去绑卡---wk改版后接口(无老接口)
    hbts.goNewAddBankCard ={
        config : {
            title : "提现去绑卡",
            input : {
                categroy : "信息填写",
                list :[
                    {
                        name : "订单号",
                        key : "orderNumber",
                        placeholder : "输入"
                    }
                ]
            },
        },
        handle : function (e){
            hebaoWkjs.doCall('goNewAddBankCard',e,function(r){
                ShowAlert(JSON.stringify(r));
            });
        }
    };

    //快捷绑卡回调参数刷新支付插件---wk改版后接口(无老接口)
    hbts.finishFastBindingCardWithArgs ={
        config : {
            title : "快捷绑卡回调参数刷新支付插件",
            input : {
                categroy : "信息填写",
                list :[
                    {
                        name : "快捷签约协议号",
                        key : "bankAgreementNo",
                        placeholder : "输入"
                    }
                ]
            },
        },
        handle : function (e){
            hebaoWkjs.doCall('finishFastBindingCardWithArgs',e,function(r){
                ShowAlert(JSON.stringify(r));
            });
        }
    };


    //第三方APP绑卡---wk改版后接口(无老接口)
    hbts.fastBindingCardJumpToThirdApp ={
        config : {
            title : "第三方APP绑卡",
            input : {
                categroy : "信息填写",
                list :[
                    {
                        name : "APP链接",
                        key : "appBankUrl",
                        placeholder : "输入"
                    }
                ]
            },
        },
        handle : function (e){
            hebaoWkjs.doCall('fastBindingCardJumpToThirdApp',e,function(r){
                ShowAlert(JSON.stringify(r));
            });
        }
    };

    //s客户端ession共享---wk改版后接口(无老接口)
    hbts.relogin = function(){
        hebaoWkjs.doCall('relogin',function(r){
            ShowAlert(JSON.stringify(r));
        });
    };
    
}(window));


(function($){

    $.notifyAuthSuccess = function() {
        ShowAlert('实名成功了哟');
    };

}(window));

// activity跳转和包本地应用???
// 双录？
//web检测器不生效
//https://stackoverflow.com/questions/53052995/safari-web-inspector-not-working-with-cordova-in-ios12-and-mac-os-mojave