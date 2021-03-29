

;(function($, hbts){
    
     // 调用原生傻逼设计
    // 交易查询 '90001'
    // 密码管理 '90002'
    // 充值 '90003'
    // 提现 '90004'
    // 余额 '90005'
    // 优惠券 '50001'
    //TODO:获取设备信息 '20001'
    //网页内部再打开另一个webview   
    hbts.cmpNativeCall = {
        config : {
            title : "调用原生傻逼设计",
            selects : [{
                categroy : "接口类型",
                list : [{
                    name : "交易查询 '90001'",
                    key : "type",
                    value : 0,
                    cheched : true
                },{
                    name : "密码管理 '90002'",
                    key : "type",
                    value : 1,
                },{
                    name : "充值 '90003'",
                    key : "type",
                    value : 2,
                },{
                    name : "提现 '90004'",
                    key : "type",
                    value : 3,
                    cheched : true
                },{
                    name : "余额 '90005'",
                    key : "type",
                    value : 4,
                },{
                    name : "优惠券 '50001'",
                    key : "type",
                    value : 5,
                },{
                    name : "设备信息 '20001'",
                    key : "type",
                    value : 6,
                }]
            }]
            // ,
            // input : {
            //     categroy : "信息填写",               
            //     list :[
            //         {
            //             name : "目标地址",
            //             key : "target",
            //             placeholder : "输入目标地址"
            //         }
            //     ]
            // }
        },
        handle : function(e){
            var type = parseInt(e.type);
            var isWk = this.isWkjs();  
            var actionname = ['90001','90002','90003','90004','90005','50001','20001'][type];      
            $.callback999 = function (e){
                var t = JSON.stringify(e);
                ShowAlert(t);
            };
            var isWk = this.isWkjs();
            if (!isWk) {
                cmpNativeCall({actionName: actionname ,needCmpLoadding:false ,callback: 'callback999'}); 
            }else{
                hebaoWkjs.doCall('cmpNativeCall',{ 
                    actionName : actionname,
                    needCmpLoadding :false ,
                    callback: 'callback999'
                });
            }
        }   
    };

}(window,hbts));


(function($, hbts){
    
   hbts.authorization = {
       config : {
           title : "获取权限",
           selects : [{
               categroy : "接口类型",
               list : [{
                   name : "获取相机权限",
                   key : "type",
                   value : 0,
                   cheched : true
               },{
                   name : "获取相册权限",
                   key : "type",
                   value : 1,
               },{
                   name : "获取通讯录权限",
                   key : "type",
                   value : 2,
               },{
                   name : "调用消息推送是否开启",
                   key : "type",
                   value : 3,
                   cheched : true
               },{
                   name : "获取定位权限",
                   key : "type",
                   value : 4,
               }]
           }],
           info :{
            categroy : "信息说明",
            descText  : "获取权限有弹窗回调\n 相机1-0 相册1-0 通讯录1-0 推送2-1 定位1-0",   //说明
            descHtml : "<hr>",
            other : {} //备用数据
        }
       },
       handle : function(e){
           var type = parseInt(e.type);
           $.callbackAuthorization = function (e){
               ShowAlert(e);
           };
           var isWk = this.isWkjs();
           switch (type) {
                case 0:{
                    $.checkCameraAuthorizationback = function(r) {
                        ShowAlert(r);
                    }
                    if (!isWk) {
                        checkCameraAuthorization();
                    }else{
                        hebaoWkjs.doCall('checkCameraAuthorization');
                    }
                }
                break;
               case 1:{
                   $.checkPhotoLibraryAuthorizationback = function(r) {
                        ShowAlert(r);
                   }
                   if (!isWk) {
                        checkPhotoLibraryAuthorization();
                   }else{
                       hebaoWkjs.doCall('checkPhotoLibraryAuthorization');
                   }
               }
               break;
               case 2:{
                   $.checkAddressBookAuthorizationback = function(r) {
                        ShowAlert(r);
                   }
                   if (!isWk) {
                        checkAddressBookAuthorization();
                   }else{
                       hebaoWkjs.doCall('checkAddressBookAuthorization');
                   }
               }
               break;    
               case 3:{
                   $.callBackWhetherHasNoticePermission = function(r) {
                        ShowAlert(r);
                   }
                   if (!isWk) {
                        whetherHasNotificationPermission();
                   }else{
                       hebaoWkjs.doCall('whetherHasNotificationPermission');
                   }
               }
               break; 
               case 4:{
                   if (!isWk) {
                        doApplyLocationPermission('callbackAuthorization');
                   }else{
                       hebaoWkjs.doCall('doApplyLocationPermission',{jsCallBack:'callbackAuthorization'});
                   }
               }
               break; 
               default:
                   break;
           }
       }   
   };

}(window,hbts));





