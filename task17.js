/* 数据格式演示
var aqiSourceData = {
  "北京":



   {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }



};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

Date.prototype.getWeek = function (dowOffset) {
/*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() - 
    (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
              the week, it is week #1 of that year*/
            weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};

// 用于渲染图表的数据
var chartData = {};

function getDaydata() {
 var list=[];
 randomBuildData=randomBuildData(500);
 keys=Object.keys(randomBuildData);
 for (i=0;i<keys.length;i++){
    list.push(randomBuildData[keys[i]]);
 }
 return list;

}

//  获取数据，按周分别存储在chartData中；
function getWeekdata(){
  var data=randomBuildData(500);
  var keys=Object.keys(data);
  for (i=0;i<keys.length;i++){
    var date=new Date(keys[i]);
    var aqi=data[keys[i]]   ;
    week=date.getWeek();
    if (!chartData[week]){
      chartData[week]=[];
    }
    
    chartData[week].push(aqi)
  }
  return chartData;

}
// 计算chartData中的周平均值
function cal_weekAverage(){
  var weekData=getWeekdata();
  var averageList=[];
  chartData_keys=Object.keys(weekData);
  for(i=0;i<chartData_keys.length;i++){
    var sum=0;
    var weekgroup=weekData[chartData_keys[i]];
    for (t=0;t<weekgroup.length;t++){
      sum=sum+weekgroup[t]
    }
    average=sum/weekgroup.length;
    averageList.push(average);
  }
  return averageList;
}


// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}
/**
 * 渲染图表  
 */

function renderChart() {
  var canvapart=document.getElementById("canvas");
  canvapart.innerHTML="<canvas id='a' width='1280' height='600'></canvas>";
  var canvas=document.getElementById("a");
  var ctx = canvas.getContext("2d");
  // var citylist=Object.keys(aqiSourceData);
  // var list = aqiSourceData["北京"];
  // var listkey=Object.keys(list);
  for(i=0;i<list.length;i++){
    var color=Math.random().toString(16).substring(3,9);
    ctx.fillStyle="#"+color;
    ctx.fillRect(10*i, 600-list[i], 10, list[i]); 
  }
}
// renderChart()
/**
 * 日、周、月的radio事件点击时的处理函数
 */
 
function graTimeChange() {
  // 确定是否选项发生了变化 
  var day=document.getElementById("day");
  var week=document.getElementById("week");
  var month=document.getElementById("month");

  day.addEventListener("click",function(){
    pageState.nowGraTime="day";
    list=getDaydata();
    renderChart();
  })
  week.addEventListener("click",function(){
    pageState.nowGraTime="week";
    list=cal_weekAverage();
    renderChart();
  })
  month.addEventListener("click",function(){
    pageState.nowGraTime="month";
  })

  // 设置对应数据

  // 调用图表渲染函数

}
graTimeChange()
/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

   list=getDaydata();
    renderChart();
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
