
;(function($, hbts){

    hbts.cmpCommonPay = {
        config : {
            title : "支付", 
            
            input : { 
                categroy : "信息填写",               
                list :[
                    {
                        name : "订单号",
                        key : "orderNo",
                        placeholder : "输入订单号",
                    },
                    {
                        name : "订单类型",
                        key : "orderType",
                        placeholder : "输入订单类型(见参数说明)"
                    },
                    {
                        name : "捡起类型",
                        key : "pickupType",
                        placeholder : "输入捡起类型(见参数说明)"
                    }
                ]
            },
            info :{
                categroy : "参数说明",
                descText  : "订单类型:\n\
                0: 商户客户端发起的订单(sesionid(需要补录)，如：交通罚款；或订单号，如：生活缴费：水电等)\n\
                1: cmpay直接支付订单(订单号)\n\
                2:缴话费订单（包括和聚宝充值）\n\
                3:收付款(转账到和包账号)\n\
                订单捡起类型：\n\
                0: 订单号捡起\n\
                1: sessionid捡起"  
            }
        },

        handle : function (e){
            //老式回调方法，js预设好方法名 
            $.callbackCmpCommonPay = function(r) {
                doLog("老式回调结果："+r);
            }

            var isWk = isWkjs(); //获取使用接口类型

            if (isWk) {
                //新的调用方式
                hebaoWkjs.doCall("cmpCommonPay",e,function(r){
                    doLog("新式回调结果："+r);
                });
            } else {
                cmpCommonPay(e.orderNo, e.orderType, e.pickupType);
            }

        }
    };


    hbts.cmpOutPay = {
        config : {
            title : "支付能力外放",
            selects : [
                {
                    categroy : "环境",
                    list :[
                        {
                            name : "生产",
                            key : "env",
                            value : 1,
                            checked : true                      
                        },
                        {
                            name : "测试",
                            key : "env",
                            value : 0                       
                        }
                    ]
                }
            ],
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "订单号",
                        key : "orderNo",
                        placeholder : "输入订单号"
                    },
                    {
                        name : "手机号",
                        key : "mobileNo",
                        placeholder : "输入手机号"
                    },
                    {
                        name : "商户订单号",
                        key : "merppcaid",
                        placeholder : "输入商户订单号"
                    },
                    {
                        name : "商户签名数据",
                        key : "signdata",
                        placeholder : "输入商户签名数据"
                    },
                    {
                        name : "会话ID",
                        key : "sessionID",
                        placeholder : "输入会话ID"
                    }
                ]
            },
        },
        handle : function (e){
            var orderNo = e.orderNo;//订单号
            var mobileNo = e.mobileNo;//手机号码
            var merppcaid = e.merppcaid;//商户ID
            var signdata = e.signdata;//商户签名数据
            var sessionID = e.sessionID;//会话ID
            var Merctimestamp = Date.parse(new Date()); //当前时间戳
            var SORCNL = '20';//SORCNL  目标页面
            var MERCSIGN;
            //假如是测试环境 不成立是-1 成立是0
            if(e.env == '1'){ //生成
                MERCSIGN = 'aifIpzfEzNLYyqkGi4p5VlkqutdSPugT';
            }else{
                MERCSIGN = 'okB54CEbp0DT6C4MEGxBrsrDERjOMTrf';
            }
            var link = 'cmpay://PaymentMethod/fetchMethodiPosVC?payOrderNumber='+orderNo+'&fromScheme=screem&mobileNo='+mobileNo+'&paymentType=&orderType=0&Mercappid='+merppcaid+'&Signdata='+signdata+'Merctimestamp=&SORCNL='+SORCNL+'&MERCSIGN='+MERCSIGN+'&sessionId'+sessionID+'';
            doLog(link);

            var ua = navigator.userAgent.toLowerCase();
            var isHebao =  ua.match(/(hebao)/);
            var safari =  ua.match(/(safari)/);

            if (isHebao != null) {
                ShowAlert('请在Safari中测试');
            }else{
                window.location.href = link;
            }
        }
    };
    
}(window,hbts));
 