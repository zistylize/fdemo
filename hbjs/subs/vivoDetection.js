
;(function($, hbts){
    hbts.vivoDetection = {
        config : {
            title : "通政通-活体检测",
            selects : [
                {
                    categroy : "接口类型",
                    list :[
                        {
                            name : "老活体检测",
                            key : "dotype",
                            value : 0                       
                        },
                        {
                            name : "新活体检测",
                            key : "dotype",
                            value : 1,
                            checked : true                      
                        },
                        {
                            name : "活体检测带号码",
                            key : "dotype",
                            value : 2,
                        }
                    ]
                },
                {
                    categroy : "是否本人",
                    list :[
                        {
                            name : "是本人",
                            key : "isSelf",
                            value : true,
                            checked : true                      
                        },
                        {
                            name : "不是本人",
                            key : "isSelf",
                            value : false                      
                        }
                    ]
                }
            ],
            input : {
                categroy : "信息填写",               
                list :[
                    {
                        name : "姓名",
                        key : "name",
                        placeholder : "输入姓名"
                    },
                    {
                        name : "身份证号码",
                        key : "idNum",
                        placeholder : "输入身份证号码"
                    },
                    {
                        name : "序列号",
                        key : "serialNum",
                        placeholder : "输入"
                    },
                    {
                        name : "手机号",
                        key : "phoneNum",
                        placeholder : "输入"
                    }
                ]
            },
        },
        handle : function (e){    
            var isWk = isWkjs(); 
            var type = parseInt(e.dotype);       
            switch (type) {
                case 0:{
                    $.callbackLifeCheckPlus = function(r) {
                         ShowAlert(r);
                    }
                    if (!isWk) {
                        doVivoDetection(e.isSelf,e.name,e.idNum,e.serialNum);
                    }else{
                        hebaoWkjs.doCall('doVivoDetection',e);
                    }
                }
                break; 
                case 1:{
                    $.callbackLifeCheckPlus = function(r) {
                         ShowAlert(r);
                    }
                    if (!isWk) {
                        doVivoDetectionNew(e.isSelf,e.name,e.idNum,e.serialNum);
                    }else{
                        hebaoWkjs.doCall('doVivoDetectionNew',e);
                    }
                }
                break; 
                case 2:{
                    $.callbackLifeCheckPlus = function(r) {
                        ShowAlert(r);
                    }
                    if (!isWk) {
                        doVivoDetectionWithPhone(e.isSelf, e.name, e.idNum, e.serialNum, "callbackLifeCheckPlus('xxxx')", e.phoneNum);
                    }else{
                        hebaoWkjs.doCall('doVivoDetectionWithPhone',e);
                    }
                }
                default:
                    break;
            }

        }
    };
}(window,hbts));
