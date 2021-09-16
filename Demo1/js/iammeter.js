const connectUrl = 'wss://mqtt.iammeter.com:8084/mqtt';
// const connectUrl = 'wss://127.0.0.1:8084/mqtt';
//change your sn list here
//data shown configed in "items"


//setup option using your login name and userkey
var options = {
        clean: true,
        connectTimeout: 10000,
        clientId: '',
        username: username,
        password: password,
}
options.clientId = username + Math.floor((Math.random()*10000000));
var client;
var seriesData = [];
var units = ['V','A','W','kWh','kWh'];
var itemName = ['Vol','Cur','Pow','KwhIN','kWhOUT'];
var itemDispText = ['Voltage','Current','Power','Energy','EnergyOut'];
var itemPhase = ['A','B','C'];
var threshold;
var connect = function(options){
    try{
        client.end();
        console.log("end prev connection");
    }
    catch(err)
    {
        console.log("no connection to end");
    }
    client = mqtt.connect(connectUrl,options);
    client.on('connect', function () {
        console.log('connect');
        for (var i = 0; i < sns.length; i++) {
            sub('device/'+sns[i].sn+'/realtime');
        }
    });

    function cb(err,a) {
        console.log(err,a);
    }

    var sub = function (topic) {
        client.subscribe(topic, function (err) {
            if (err)
                console.log(err);
        })
    };

    client.on('reconnect', (error) => {
        console.log('reconnect:', error);
    })

    client.on('error', (error) => {
        console.log('error:', error)
        client.end();
    })

    client.on('message', (topic, message) => {
        // console.log('message：', topic, message.toString());
        if (topic.indexOf('realtime') > -1) {
            for (var i = 0; i < sns.length; i++) {
                var sn = sns[i].sn;
                if (topic.indexOf(sn) > -1) {
                    // 处理
                    setChartData(sns[i], JSON.parse(message));
                }
            }
        }
        showLines(seriesData);
    });

}

var setChartData =  function (sensor,data)
{
    if(sensor.type =="1")
    {
        for(i=0;i<sensor.items.length;i++)
        {
            addSerialData(sensor.name  +"_"+ itemName[sensor.items[i]],data.Data[sensor.items[i]]);
            updateItemValue("item_"+sensor.name  +"_"+ sensor.items[i],data.Data[sensor.items[i]]);
        }
    }
    else if(sensor.type =="3")
    {
        for(i=0;i<sensor.items.length;i++)
        {
            addSerialData(sensor.name +"_phase"+ itemPhase[sensor.items[i][0]] +"_"+ itemName[sensor.items[i][1]],data.Datas[sensor.items[i][0]][sensor.items[i][1]]);
            updateItemValue("item_"+sensor.name  +"_"+ sensor.items[i][0] +"_"+ sensor.items[i][1],data.Datas[sensor.items[i][0]][sensor.items[i][1]]);
        }
    }
};

var updateItemValue = function(id,value)
{
    $("#"+id).text(value);
    if(threshold != undefined )
    {
        if (parseFloat(value)>threshold)
        {
            $("#"+id).parent().parent().parent().addClass("ol_over_threshold");
        }else
        {
            $("#"+id).parent().parent().parent().removeClass("ol_over_threshold");
        }
    }
};

var addSerialData = function(name,value)
{
    for(var idx=0;idx<seriesData.length;idx++)
    {
        if(seriesData[idx].name==name)
        {
            seriesData[idx].data.push([new Date().getTime(),parseFloat(value)]);
            if(seriesData[idx].data.length>100)seriesData[idx].data.shift();
        }
    }
};

for (var i = 0; i < sns.length; i++) {
    for(var itemId = 0;itemId<sns[i].items.length;itemId++)
    {
        if(sns[i].type=="1")seriesData.push({name:sns[i].name +"_" + itemName[sns[i].items[itemId]],data:[]});
        else if(sns[i].type=="3")seriesData.push({name:sns[i].name+"_phase" + itemPhase[sns[i].items[itemId][0]] +"_"+itemName[sns[i].items[itemId][1]],data:[]});
    }
}
// console.log(seriesData);

var removeSn = function(sn)
{
    var devName = "";
    for (var i = 0; i < sns.length; i++) {
        if(sns[i].sn == sn){
            devName = sns[i].name;
            sns.splice(i,1);
            break;
        }
    }
    client.unsubscribe('device/'+sn+'/realtime', function (err) {
        if (err)
            console.log(err);
    })
    for(var idx=seriesData.length-1;idx>-1;idx--)
    {
        if(seriesData[idx].name.indexOf(devName)>-1)
        {
            seriesData.splice(idx,1);
        }
    }
    showItemsDetail();
}

var addDev = function(name,sn,type)
{
    // alert(name+sn+type);
    if(name != "" && sn != "" && type != "")
    {
        client.subscribe('device/'+sn+'/realtime', function (err) {
            if (err)
                console.log(err);
        });
        if(type=="1")
        {
            sns.push({"sn":sn,"name":name,"type":type,"items":[2]});
            seriesData.push({"name":name+"_Pow",data:[]});
        }
        else if(type=="3")
        {
            sns.push({"sn":sn,"name":name,"type":type,"items":[[0,2],[1,2],[2,2]]});
            seriesData.push({"name":name+"_phaseA_Pow",data:[]});
            seriesData.push({"name":name+"_phaseB_Pow",data:[]});
            seriesData.push({"name":name+"_phaseC_Pow",data:[]});
        }
    }

    showItemsDetail();
}


var showItemsDetail = function()
{
    //clear sn list
    $("#snList").find("li").remove();
    $("#itemsRealtime").find("ul").remove();
    for (var i = 0; i < sns.length; i++) {
        $("#itemsRealtime").append('<ul class="ul_type_'+sns[i].type+'" id="item_'+sns[i].name+'">'+sns[i].name+'</ul>')
        $("#snList").append("<li>"+sns[i].name+"/"+sns[i].sn+"<img src='./images/remove.png' onclick='removeSn(\""+sns[i].sn+"\")'></li>");
        for(var itemId = 0;itemId<sns[i].items.length;itemId++)
        {
            if(sns[i].type=="1")
            {
                $("#item_"+sns[i].name).append('\
                <ol id="ol_'+sns[i].name+'" class="ol_'+itemDispText[sns[i].items[itemId]]+'"><img src="./images/icon_img0'+sns[i].items[itemId]+'.png" /><div class="text"><p>'+itemDispText[sns[i].items[itemId]]+'</p><p><span id="item_'+sns[i].name+'_'+sns[i].items[itemId]+'">0</span>'+units[sns[i].items[itemId]]+'</p></div></ol>')
            }
            else if(sns[i].type=="3")
            {
                $("#item_"+sns[i].name).append('\
                <ol id="ol_'+sns[i].name+'_'+itemId+'" class="ol_'+itemDispText[sns[i].items[itemId][1]]+'"><img src="./images/icon_img0'+sns[i].items[itemId][1]+'.png" /><div class="text"><p>'+itemDispText[sns[i].items[itemId][1]]+'</p><p><span id="item_'+sns[i].name+'_'+sns[i].items[itemId][0]+'_'+sns[i].items[itemId][1]+'">0</span>'+units[sns[i].items[itemId][1]]+'</p></div></ol>')
            }
        }
    }
};

var changeSettingDisplay = function()
{
    var stat = $("#settingBlock").css("display");
    if(stat == "none")$("#settingBlock").css("display","block");
    else $("#settingBlock").css("display","none");
}

//设置阈值
var setThreshold = function(t){
    if(t!="")
    {
        threshold = Number(t);
    }
}

$(document).ready(function()
{
    $("#btnConnect").click(function(){
        var mqttUserName = $("#mqttUserName").val();
        var mqttPassword = $("#mqttPassword").val();
        options = {
                clean: true,
                connectTimeout: 10000,
                clientId: '',
                username: mqttUserName,
                password: mqttPassword,
        }
        options.clientId = mqttUserName + Math.floor((Math.random()*10000000));
        connect(options);
    });
    $("#btnAddSn").click(function(){
        addDev($("#displayName").val(),$("#devSn").val(),$("input[name='snType']:checked").val());
    });
    $("#threshold").blur(function(){
        // alert($("#threshold").val());
        setThreshold($("#threshold").val());
    });
    $("#mqttUserName").attr("value",options.username);
    $("#mqttPassword").attr("value",options.password);
    $("#settingIcon").bind("click",function(){
        changeSettingDisplay();
    });
    connect(options);
    showItemsDetail();
});


var showLines = function (serials){
    chart = Highcharts.chart('chartContainer', {
        chart: {
            zoomType: 'x',
            type: 'spline'
        },
        xAxis: {
            type: 'datetime',
            minPadding: 0.05,
            maxPadding: 0.05
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: '',
            labels: {
                formatter: function () {
                        return this.value;
                }
            }
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                fillOpacity: 0.3,
                marker: {
                    enabled: true,
                    radius:2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: seriesData
    });
};
