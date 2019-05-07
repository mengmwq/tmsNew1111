<template>
  <div style="height:100%;">
    <div id="allMap" style="height:100%;"></div>

  </div>
</template>

<script>
export default {
  name: "ProductStatistics",
  mounted() {
    this.showMap();
  },
  methods: {
    showMap() {
      // 百度地图API功能
      var map = new BMap.Map("allMap");
      var point = new BMap.Point(116.404, 39.915);
      map.centerAndZoom(point, 5);
      map.enableScrollWheelZoom(true); 
    //   var marker = new BMap.Marker(new BMap.Point(116.404, 39.915)); // 创建标注
    //   map.addOverlay(marker); // 将标注添加到地图中


      var circle = new BMap.Circle(point, 500000,{
          fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3,text:'aaa'
      });

      map.addOverlay(circle); //增加圆
    //   hideOver();

    //   function showOver() {
    //     marker.show();
    //     circle.show();
    //   }
    //   function hideOver() {
    //     marker.hide();
    //     polyline.hide();
    //     circle.hide();
    //   }
    	// 百度地图API功能
	// var map = new BMap.Map("allMap");
	// map.centerAndZoom(new BMap.Point(116.403765, 39.914850), 5);
    // map.enableScrollWheelZoom();
    // //  map.centerAndZoom(point, 15);

   
    // var circle = new BMap.Circle(new BMap.Point(116.403765, 39.914850), 500);
    // map.addOverlay(circle); //增加圆

	// function getBoundary(){       
	// 	var bdary = new BMap.Boundary();
	// 	bdary.get("北京市海淀区", function(rs){       //获取行政区域
	// 		map.clearOverlays();        //清除地图覆盖物       
	// 		var count = rs.boundaries.length; //行政区域的点有多少个
	// 		if (count === 0) {
	// 			alert('未能获取当前输入行政区域');
	// 			return ;
	// 		}
    //       	var pointArray = [];
	// 		for (var i = 0; i < count; i++) {
	// 			var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
	// 			map.addOverlay(ply);  //添加覆盖物
	// 			pointArray = pointArray.concat(ply.getPath());
	// 		}    
	// 		map.setViewport(pointArray);    //调整视野  
	// 		// addlabel();               
	// 	});   
	// }

	// setTimeout(function(){
	// 	getBoundary();
	// }, 2000);

	// function addlabel() {
	//     var pointArray = [
	//       new BMap.Point(121.716076,23.703799),
	//       new BMap.Point(112.121885,14.570616),
	//       new BMap.Point(123.776573,25.695422)];
	//     var optsArray = [{},{},{}];
	//     var labelArray = [];
	//     var contentArray = [
	//       "台湾是中国的！",
	//       "南海是中国的！",
	//       "钓鱼岛是中国的！"];
	//     for(var i = 0;i < pointArray.length; i++) {
	//       optsArray[i].position = pointArray[i];
	//       labelArray[i] = new BMap.Label(contentArray[i],optsArray[i]);
	//       labelArray[i].setStyle({
	// 		color : "red",
	// 		fontSize : "12px",
	// 			 height : "20px",
	// 			 lineHeight : "20px",
	// 			 fontFamily:"微软雅黑"
	// 		 });
	//       map.addOverlay(labelArray[i]);
	//     }	  
	// }
    }
  }
};
</script>

<style scoped>
</style>