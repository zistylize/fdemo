
;(function($, hbts){

    hbts.template = {
        config : {
            title : "页面模版", // 标题
            selects : [ //多个选择
                {
                    categroy : "是否本人", //选题
                    list :[
                        {
                            name : "是本人", //字面表达
                            key : "isSelf", //字段名
                            value : 1,      //值 （选中是本人==>那么： isSelf = 1）
                            checked : true  //默认选中             
                        },
                        {
                            name : "不是本人",
                            key : "isSelf",
                            value : 0                       
                        }
                    ]
                },
                {
                    categroy : "银行类型", 
                    list :[
                        {
                            name : "招商银行",
                            key : "bank",
                            value : "0001"                        
                        },
                        {
                            name : "建设银行",
                            key : "bank",
                            value : "0002",
                            checked : true                      
                        },
                        {
                            name : "工商银行",
                            key : "bank",
                            value : "0003"
                        }
                    ]
                },
            ],
            checkboxs : [
                {
                    categroy : "时间范围",
                    list :[
                        {
                            name : "2020年",
                            key : "yearopt",
                            value : 2020                        
                        },
                        {
                            name : "2019年",
                            key : "yearopt",
                            value : 2019,
                            checked : true  //默认选中             
                        },
                        {
                            name : "2018年",
                            key : "yearopt",
                            value : 2018,
                            checked : true  //默认选中             
                        },
                        {
                            name : "2017年",
                            key : "yearopt",
                            value : 2017
                        }
                    ]
                }
            ],
            input : { //输入框
                categroy : "信息填写",               
                list :[
                    {
                        name : "国籍",
                        key : "nation",
                        placeholder : "输入国籍",
                        value : "中国"  //默认值
                    },
                    {
                        name : "身份证号码",
                        key : "identiyCode",
                        placeholder : "输入身份证号码"
                    },
                    {
                        name : "姓名",
                        key : "username",
                        placeholder : "输入姓名"
                    }
                ]
            },
            info :{
                categroy : "信息说明",
                descText  : "这是一个页面模版，JS数据生成动态页面\n 参照template.js实现测试页",   //说明
                descHtml : "<hr>",
                other : {} //备用数据
            }
        },
        //点击‘调用接口’触发的函数方法，参数e代表操作页面后的输出参数
        handle : function (e){

            //模拟使用备用数据----看具体需要
            //var other = this.config.info.other;
            //doLog(other);

            //老式回调方法，js预设好方法名 
            $.callbackDoSomeWork = function(r) {
                doLog("老式回调结果："+r);
            }

            var isWk = isWkjs(); //获取使用接口类型

            if (isWk) {
                doLog("模拟客户 wkwebview 收到消息...");
                //新的调用方式
                hebaoWkjs.doCall("doSomeWork",e,function(c){
                    doLog("新式回调结果："+c);
                });
            } else {
                //老式调用方法
                doSomeWork(e.isSelf, e.bank, e.typeop, e.nation, e.identiyCode, e.username);
            }

        }
    };

}(window,hbts));

//模拟客户注入的方法
function doSomeWork(){
    doLog("模拟客户 uiwebview 收到消息...");
}