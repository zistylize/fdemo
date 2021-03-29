;(function($, hbts){
    //拉起账单
    hbts.billChecking = function(){
        var isWk = isWkjs();
        if(isWk){
            hebaoWkjs.doCall('billChecking');
        }else{  
            billChecking();
        }
    };
     
    hbts.billDetails = {
        config : {
            title : "账单条件查询",
            input : {
                categroy : "信息填写",               
                list : [
                    {
                        name : "请求类型",
                        key : "reqType",
                        placeholder : "输入请求类型"
                    },
                    {
                        name : "订单编号",
                        key : "orderNo",
                        placeholder : "输入订单编号"
                    },
                    {
                        name : "订单建立日期",
                        key : "orderCreateDate",
                        placeholder : "输入订单建立日期"
                    },
                    {
                        name : "转账类型",
                        key : "reqType",
                        placeholder : "输入转账类型"
                    },
                    {
                        name : "收付款标识",
                        key : "txnFlg",
                        placeholder : "输入收付款标识"
                    },
                    {
                        name : "是否展示往来记录标示",
                        key : "showRecordFlg",
                        placeholder : "输入是否展示往来记录标示"
                    },
                    {
                        name : "云Pos订单标识",
                        key : "ypsFlg",
                        placeholder : "输入云Pos订单标识"
                    }
                ]
            },

            info:{
                categroy : "参数说明",
                descHtml : " <p>查询类型:</p> \
                <span>需要查询的账单类型，如果只需要查询时间，这里不填即可<br> \
                类型对应的值:<br>00:消费<br>01:充话费<br>02:充流量<br>03:转账<br>05:和聚宝<br>06:充值<br>07:提现<br>08:当面付<br>09:信用卡还款<br>10:生活缴费<br>11:闪付卡<br>12:现金红包<br>15:收发红包订单<br></span>\
                <p>订单编号:</p> \
                <span>订单编号</span> \
                <p>订单建立日期:</p> \
                <span>订单建立日期（如20171002）</span>\
                <p>转账类型:</p>\
                <span>是否是收款时实名1表示是在确认收款流程中实名</span>\
                <p>收付款标识:</p>\
                <span>p:是 R:收款</span>\
                <p>是否展示往来记录:</p>\
                <span>只有转账订单才返回该字段 1:展示 0以及其他不展示</span>\
                <p>云pos订单标识:</p>\
                <span>1:是 2:否</span>"
            }
        },
        handle : function (e){
            var isWk = isWkjs(); 
            if (isWk) {
                hebaoWkjs.doCall("billDetails",e);
            } else {
                var jsonStr = JSON.stringify(e);
                billDetails(e.reqType, jsonStr);
            }
        }
    };


    hbts.billCheckingDetails = {
        config : {
            title : "账单条件查询",
            input : {
                categroy : "信息填写",               
                list : [
                    {
                        name : "查询类型",
                        key : "reqtype",
                        placeholder : "输入查询类型"
                    },
                    {
                        name : "查询时间",
                        key : "time",
                        placeholder : "输入查询时间"
                    }
                ]
            },

            info:{
                categroy : "参数说明",
                descHtml : "<p>查询类型:</p>\
                <span>需要查询的账单类型，如果只需要查询时间，这里不填即可<br>\
                类型对应的值:<br>00:消费<br>01:充话费<br>02:充流量<br>03:转账<br>05:和聚宝<br>06:充值<br>07:提现<br>08:当面付<br>09:信用卡还款<br>10:生活缴费<br>11:闪付卡<br>12:现金红包<br>15:收发红包订单<br></span>\
                <p>查询时间:</p>\
                <span>需要查询的时间，格式为年月，例:201802,如果只需要查询类型则这里不填即可</span>"
            }
        },
        handle : function (e){
            var isWk = isWkjs(); 
            if (isWk) {
                hebaoWkjs.doCall("billCheckingDetails",e);
            } else {
                billCheckingDetails(e.reqtype, e.time);
            }
        }
    };

    hbts.billRecordList = {
        config : {
            title : "拉起转账记录",
            input : {
                categroy : "信息填写",               
                list : [
                    {
                        name : "账单号",
                        key : "orderNum",
                        placeholder : "输入"
                    },
                    {
                        name : "账单时间",
                        key : "orderDate",
                        placeholder : "输入"
                    },
                    {
                        name : "账单类型",
                        key : "orderType",
                        placeholder : "输入"
                    }
                ]
            }
        },
        handle : function (e){
            var isWk = isWkjs(); 
            if (isWk) {
                hebaoWkjs.doCall("gotoBillContactRecordListActivity",e);
            } else {
                gotoBillContactRecordListActivity(e.orderNum, e.orderDate, e.orderType);
            }
        }
    };



    hbts.getNewBillOrder = {
        config : {
            title : "拉起账单区分支出和收入",
            input : {
                categroy : "信息填写",               
                list : [
                    {
                        name : "账单类型",
                        key : "orderType",
                        placeholder : "输入"
                    },
                    {
                        name : "账单时间",
                        key : "time",
                        placeholder : "输入"
                    },
                    {
                        name : "1收入/0支出",
                        key : "orderType",
                        placeholder : "输入"
                    }
                ]
            }
        },
        handle : function (e){
            var isWk = isWkjs(); 
            if (isWk) {
                hebaoWkjs.doCall("getNewBillOrder",e);
            } else {
                getNewBillOrder(e.orderType, e.time, e.incomeType);
            }
        }
    };

    hbts.notifyOperationResult = {
        config : {
            title : "通知账单刷新",
            input : {
                categroy : "信息填写",               
                list : [
                    {
                        name : "账单号",
                        key : "orderNo",
                        placeholder : "输入"
                    }
                ]
            }
        },
        handle : function (e){
            e.result = '1'; 
            var isWk = isWkjs(); 
            if (isWk) {
                hebaoWkjs.doCall("notifyOperationResult",e);
            } else {
                notifyOperationResult(e.result, e.orderNo);
            }
        }
    };

    hbts.doRecallTransfer = {
        config : {
            title : "通知账单刷新",
            input : {
                categroy : "信息填写",               
                list : [
                    {
                        name : "账单号",
                        key : "orderNum",
                        placeholder : "输入"
                    },
                    {
                        name : "账单类型",
                        key : "orderType",
                        placeholder : "输入"
                    }
                ]
            }
        },
        handle : function (e){
            var isWk = isWkjs(); 
            if (isWk) {
                hebaoWkjs.doCall("doRecallTransfer",e);
            } else {
                doRecallTransfer(e.orderNum, e.orderType);
            }
        }
    };

    

    

}(window,hbts));