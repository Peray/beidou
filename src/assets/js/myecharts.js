import echarts from 'echarts';
echarts.myecharts=function(){
	var option = {
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			type: 'value'
		},
		series: [{
			data: [820, 932, 901, 934, 1290, 1330, 1320],
			type: 'line'
		}]
	};
	let worldMapContainer = document.getElementById('myChart')
	let myChart = echarts.init(worldMapContainer);
	let prent = document.getElementsByClassName('winmapdt');
	//用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
	var resizeWorldMapContainer = function () {
	    worldMapContainer.style.width = prent.innerWidth+'px';
	    // myChart.style.height = window.innerHeight+'px';
	};
	//设置容器高宽
	resizeWorldMapContainer();
	myChart.setOption(option);
}