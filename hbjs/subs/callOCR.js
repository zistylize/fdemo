;(function($, hbts){
    hbts.callOCR = {
        config : {
            title : "OCR能力",
            selects : [
                {
                    categroy : "ORC类型",
                    list :[
                        {
                            name : "身份证正面",
                            key : "type",
                            value : 1,
                            checked : true                                              
                        },
                        {
                            name : "身份证反面",
                            key : "type",
                            value : 2
                        },
                        {
                            name : "营业执照",
                            key : "type",
                            value : 3
                        },
                        {
                            name : "银行卡",
                            key : "type",
                            value : 4
                        }
                    ]
                }
            ]
        },
        handle : function (e){
            var type = parseInt(e.type);
            var isWk = this.isWkjs();
            switch (type) {
                case 1:{
                    $.getFrontIdCard = function(r) {
                        doLog(r);
                    }
                    if (!isWk) {
                        cmpay.callOCRFront();
                    }else{
                        hebaoWkjs.doCall('cmpayCallOCRFront');
                    }
                }
                break;
                case 2:{
                    $.getBackIdCard = function(r) {
                        doLog(r);
                    }
                    if (!isWk) {
                        cmpay.callOCRBack();
                    }else{
                        hebaoWkjs.doCall('cmpayCallOCRBack');
                    }
                }
                break;    
                case 3:{
                    $.callbackBusinessInfo = function(r) {
                        doLog(r);
                    }
                    if (!isWk) {
                        getBusinessInfo();
                    }else{
                        hebaoWkjs.doCall('getBusinessInfo');
                    }
                }
                break; 
                case 4:{
                    $.callbackBankInfo = function(r) {
                        doLog(r);
                    }
                    if (!isWk) {
                        getBankCardInfo();
                    }else{
                        hebaoWkjs.doCall('getBankCardInfo');
                    }
                }
                break; 
                default:
                    break;
            }
        }
    }; 
}(window,hbts));

