
;(function($, hbts){
    hbts.shareToWeChatMiniApps = {
        config : {
            title : "分享到微信小程序",
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "兼容低版本的网页链接",
                        key : "webpageUrl",
                        placeholder : "输入"
                    },
                    {
                        name : "原始ID",
                        key : "username",
                        placeholder : "输入"
                    },
                    {
                        name : "小程序的页面路径",
                        key : "path",
                        placeholder : "输入"
                    },
                    {
                        name : "小程序的高清大图",
                        key : "hdImageStr",
                        placeholder : "输入"
                    },
                    {
                        name : "小程序的标题",
                        key : "appTitle",
                        placeholder : "输入"
                    },
                    {
                        name : "小程序的描述",
                        key : "description",
                        placeholder : "输入"
                    }
                ]
            },
        },
        handle : function (e){
            $.shareCallback = function(r) {
                doLog("回调结果："+ JSON.stringify(r));
            }
            var isWk = this.isWkjs();
            if (!isWk) {            
                shareToWeChatMiniApps(
                    e.webpageUrl,
                    e.username,
                    e.path,
                    e.hdImageStr,
                    e.appTitle,
                    e.description);
            }else{
                hebaoWkjs.doCall('shareToWeChatMiniApps',e);
            }       
        }
    };


    hbts.sendWXSubscribeMessage = {
        config : {
            title : "微信订阅号",
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "微信订阅号信息标题",
                        key : "title",
                        placeholder : "输入"
                    },
                    {
                        name : "微信订阅号信息打开URL",
                        key : "url",
                        placeholder : "输入"
                    },
                    {
                        name : "微信订阅号信息内容",
                        key : "value",
                        placeholder : "输入"
                    },
                    {
                        name : "微信订阅号信息颜色",
                        key : "color",
                        placeholder : "输入"
                    }
                ]
            },
        },
        handle : function (e){
            $.sendWXSubscribeMessageback = function(r) {

                doLog("回调结果："+JSON.stringify(r));
            }
            var isWk = this.isWkjs();
            if (!isWk) {            
                sendWXSubscribeMessage(
                    e.title,
                    e.url,
                    e.value,
                    e.color);
            }else{
                hebaoWkjs.doCall('sendWXSubscribeMessage',e);
            }       
        }
    };

    hbts.openWXApp = function(){
        $.sendWXSubscribeMessageback = function(e){
            ShowAlert(JSON.stringify(e));
        }
        var isWk = this.isWkjs();
        if (!isWk) {            
            openWXApp();
        }else{
            hebaoWkjs.doCall('openWXApp');
        } 
    };


    hbts.callWXChatAppNew = {
        config : {
            title : "跳转微信和包小程序",
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "备用字段",
                        key : "key1",
                        placeholder : "输入"
                    },
                    {
                        name : "appID",
                        key : "appID",
                        placeholder : "输入"
                    },
                    {
                        name : "小程序的页面路径",
                        key : "path",
                        placeholder : "输入"
                    },
                    {
                        name : "分享的环境类型",
                        key : "type",
                        placeholder : "输入"
                    }
                ]
            },
        },
        handle : function (e){
            $.callWXChatAppNewBack = function(r) {
                doLog("回调结果："+JSON.stringify(r));
            }
            var isWk = this.isWkjs();
            if (!isWk) {            
                callWXChatAppNew(e.key1,e.appID,e.path,e.type);
            }else{
                hebaoWkjs.doCall('callWXChatAppNew',e);
            }       
        }
    };



}(window,hbts));
