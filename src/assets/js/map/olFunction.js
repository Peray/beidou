/* jshint esversion: 6 */
import ol from 'openLayers/dist/ol.js';
import './animatedclusterlayer.js';
import './ol3-ext.js';
import './ol3-ext.css';
import './measuretool.css';
import './popupoverlay.anim.css';

ol.default = {
	planeImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfbChoAATWOkRx0AAAA1klEQVQoz4XRMUoDcRTE4e/vrtk1mBXFEFAwrVjYpFIsLWzEK3gFKz2BjadSPICVRWo7hejKbjaEJBYGMUqSaR5v+DE85rFE0cy249KxF/k8vOVZ1+7fhJqGprYDpy5kXiUyNSvGRsGtjqZNmbpEwMRAKdfz5im2ry2VYChM5xCpLXVVkGhIpdYkjtwJbjyq9FUqn7NHHurJdX5b8QzQV4mU84FCKVYsSijEixIGCquqeVXvuXZm24au9/9A7Mq51EjLugfjbzv8AEEmOBG5x4fJsj9P9QUt6jL0bV5vOwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0xMlQxMjozMDo1NSswODowMBb+D6EAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTEtMTAtMjZUMDA6MDE6NTMrMDg6MDCtuBb+AAAATXRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA3LjAuMS02IFExNiB4ODZfNjQgMjAxNi0wOS0xNyBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZ93ZpU4AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADI1NunDRBkAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMjU2ejIURAAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxMzE5NTU4NTEzyurrXQAAABJ0RVh0VGh1bWI6OlNpemUANC43NktCFq+OXwAAAF10RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvd3d3cm9vdC9zaXRlL3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvNTY3Mi81NjcyNDgucG5nolev5AAAAABJRU5ErkJggg==',
	planeShadowImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfbChoAATWOkRx0AAAA1klEQVQoz4XRMUoDcRTE4e/vrtk1mBXFEFAwrVjYpFIsLWzEK3gFKz2BjadSPICVRWo7hejKbjaEJBYGMUqSaR5v+DE85rFE0cy249KxF/k8vOVZ1+7fhJqGprYDpy5kXiUyNSvGRsGtjqZNmbpEwMRAKdfz5im2ry2VYChM5xCpLXVVkGhIpdYkjtwJbjyq9FUqn7NHHurJdX5b8QzQV4mU84FCKVYsSijEixIGCquqeVXvuXZm24au9/9A7Mq51EjLugfjbzv8AEEmOBG5x4fJsj9P9QUt6jL0bV5vOwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMS0xMlQxMjozMDo1NSswODowMBb+D6EAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTEtMTAtMjZUMDA6MDE6NTMrMDg6MDCtuBb+AAAATXRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA3LjAuMS02IFExNiB4ODZfNjQgMjAxNi0wOS0xNyBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZ93ZpU4AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADI1NunDRBkAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMjU2ejIURAAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxMzE5NTU4NTEzyurrXQAAABJ0RVh0VGh1bWI6OlNpemUANC43NktCFq+OXwAAAF10RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2hvbWUvd3d3cm9vdC9zaXRlL3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9zcmMvNTY3Mi81NjcyNDgucG5nolev5AAAAABJRU5ErkJggg==',
	planeSize: [16, 16],
	planeUnSelectedStyle: null,
	planeSelectedStyle: null,
	planeLayer: null,
	selectedFeature: null,
	editLayer: null,
	styleCache: {},
	distanceRingLayer: null,
	styles: {}
};

//从数据库初始化Map
ol.initial = function(vueMode) {
	global.vueGis = vueMode;
	// var layerGroup = vueGis.search.layers;
	var httpGet = vueGis.$http;
	var targetMap = vueGis.mapId;
	//快速视图
	httpGet.get(config.queryQuickViewById, {
		params: {
			'id': 6
		}
	}).then(l => {
			if (l.ok) {
				var data = l.body;
				var center = ol.proj.fromLonLat([data.centerLon, data.centerLat]);
				ol.initialMap(targetMap, data.zoomLevel, center);

				map.createGroup(999, 'tempGroup', 0);
				//图层父节点
				httpGet.get(config.queryTypeDict).then(m => {
						if (m.ok) {
							var layers = m.body;
							layers.forEach(n => {
								// layerGroup[n.sort - 1].name = n.value;
								// layerGroup[n.sort - 1].id = n.id;
								// layerGroup.push({
								// 	'name': n.value,
								// 	'id': n.id,
								// 	'order': n.sort,
								// 	'layervalue': 100,
								// 	'layersshow': false,
								// 	'detailshow': false,
								// 	'eyesicon': true,
								// 	'type': 'group',
								// 	'childlayers': []
								// });

								map.createGroup(n.id, n.value, n.sort);
								//根据父节点查询Layer
								httpGet.get(config.queryBylayerGroupIdLayer, {
									params: {
										'layerGroupId': n.id
									}
								}).then(p => {
										if (p.body.length > 0) {
											p.body.forEach(q => {
												var isVisible = (q.layerDisplay == '1') ? true : false;
												// layerGroup[n.sort - 1].childlayers.push({
												// 	'name': q.layerLabel,
												// 	'detailshow': false,
												// 	'eyesicon': isVisible,
												// 	'layervalue': 100,
												// 	'id': q.id,
												// 	'type': 'layer',
												// 	'edits': false
												// });
												map.addLayerToGroup(n.id, q.id, q.layerType, q.layerLabel, (n.sort * 100 + q.layerOrder), isVisible);
												//获取矢量图层数据
												httpGet.get(config.queryBylayerIdFeaturesManager, {
													params: {
														'layerId': q.id
													}
												}).then(r => {
													if (r.body.length > 0) {
														map.getLayerById(q.id).setStyle(ol.defaultStyle);
														r.body.forEach(s => {
															var testArray = ol.getGeometryByTypeString(s.type, s.features, s.projection);
															map.getLayerById(q.id).addFeaturesByTypeArray(s.type, testArray, s.id);
														});
													}
												});
											});
										}
									},
									p => {
										vueGis.$message.error('查询异常!');
									});
							});
						} else {
							vueGis.$message.error('查询异常!');
						}
					},
					m => {
						vueGis.$message.error('查询异常!');
					});

				map.loadQuickViewTree();
				ol.updateInfoBar();
				map.addControl(new ol.control.LayerSwitcher({
					show_progress: true,
					extent: true,
					trash: true, //删除按钮
					oninfo: function(l) {
						alert(l.get("title"));
					}
				}));

				// updateAirPlane();

				// ol.searchAirPlane();
			} else {
				vueGis.$message.error('查询异常!');
			}
		},
		l => {
			vueGis.$message.error('查询异常!');
			// vueGis.$router.push({
			// 	'path': '/login'
			// });
		});
};

//矢量图层style
ol.defaultStyle = function(feature, resolution) {
	var pointSize = 5;
	var pointColor = "rgba(102,0,255,1)";

	var LRWWidth = 2;
	var LRWColor = "#FF0000";
	var rectColor = "rgb(204,0,0)";
	var rectTrans = "0.3";

	var rectRGBAColor = rgb2rgba(rectColor, rectTrans);

	function rgb2rgba(rgb, opacity) {
		var e = rgb.split("(")[1].split(")")[0];
		return "rgba(" + e + "," + opacity + ")";
	}

	var testStyle = new ol.style.Style({
		image: new ol.style.Circle({
			radius: pointSize,
			fill: new ol.style.Fill({
				color: pointColor
			}),
			stroke: new ol.style.Stroke({
				color: pointColor,
				width: 1
			})
		}),
		stroke: new ol.style.Stroke({
			color: LRWColor,
			width: LRWWidth
		}),
		fill: new ol.style.Fill({
			color: rectRGBAColor
		})
	});
	var type = feature.getGeometry().getType();
	var style;
	switch (type) {
		case "Point":
			style = testStyle;
			break;
		case "LineString":
			style = testStyle;
			break;
		case "Polygon":
			style = testStyle;
			break;
		case "Circle":
			style = testStyle;
			break;
		default:
			break;
	}
	return style;
};

//距离环style
ol.defaultDistanceRingStyle = function(feature, resolution) {
	var pointSize = 5;
	var pointColor = "rgba(102,0,255,1)";

	var LRWWidth = 4;
	var LRWColor = "#FF0000";
	var rectColor = "rgb(204,0,0)";
	var rectTrans = "0";

	var rectRGBAColor = rgb2rgba(rectColor, rectTrans);

	function rgb2rgba(rgb, opacity) {
		var e = rgb.split("(")[1].split(")")[0];
		return "rgba(" + e + "," + opacity + ")";
	}

	// var r = f.getProperties().geometry.getRadius();
	// var text = f.getProperties().text;
	var style = new ol.style.Style({
		image: new ol.style.Circle({
			radius: pointSize,
			fill: new ol.style.Fill({
				color: pointColor
			}),
			stroke: new ol.style.Stroke({
				color: pointColor,
				width: 1
			})
		}),
		stroke: new ol.style.Stroke({
			color: LRWColor,
			width: LRWWidth
		}),
		fill: new ol.style.Fill({
			color: rectRGBAColor
		}),
		// text: new ol.style.Text({
		// 	text: text,
		// 	textAlign: "left",
		// 	offsetX: r / 10,
		// 	fill: new ol.style.Fill({
		// 		color: '#000'
		// 	})
		// })
	});
	return style;
};

//根据样式ID，样式参数设置图层style
ol.getStyleByDataBase = function(options) {
	var styleID = options.id;
	var pointSize = options.pointSize;
	var pointColor = options.pointColor;
	var lineType = options.lineType;

	var lineWidth = options.lineWidth;
	var lineColor = options.lineColor;
	var fillColor = options.fillColor;

	var labelText = options.text;
	var fontSize = options.fontSize;

	var style = ol.default.styles[styleID];
	if (!style) {
		style = ol.default.styles[styleID] = new new ol.style.Style({
			image: new ol.style.Circle({
				radius: pointSize,
				fill: new ol.style.Fill({
					color: pointColor
				}),
				stroke: new ol.style.Stroke({
					color: pointColor,
					width: 1
				})
			}),
			stroke: new ol.style.Stroke({
				color: lineColor,
				width: lineWidth
			}),
			fill: new ol.style.Fill({
				color: fillColor
			}),
			text: new ol.style.Text({
				text: text,
				font: 'Bold ' + fontSize + 'px Arial',
				fill: new ol.style.Fill({
					color: '#000'
				})
			})
		});
	}
};

//加载地图
ol.initialMap = function(tartget, zoom, center) {
	var view = new ol.View({
		center: center,
		zoom: zoom,
		maxZoom: 18,
		minZoom: 1
	});

	global.map = new ol.Map({
		target: tartget,
		controls: [
			new ol.control.ScaleLine(),
			new ol.control.Zoom()
		]
	});
	map.setView(view);

	$(map.getViewport()).on("contextmenu", function(event) {
		event.preventDefault();
	});
};

//创建group
ol.Map.prototype.createGroup = function(groupId, groupName, groupOrder) {
	var boole = true;
	if (groupId == 999)
		boole = false;
	var groupLayer = new ol.layer.Group({
		title: groupName,
		displayInLayerSwitcher: boole,
		// openInLayerSwitcher: true,
		id: groupId,
		noSwitcherDelete: true,
		zIndex: -groupOrder
	});
	this.addLayer(groupLayer);
};

//加载图层到图层组
ol.Map.prototype.addLayerToGroup = function(groupId, layerId, type, layerName, layerOrder, visible) {
	var groups = this.getLayers();
	var groupLayer = this.getGroupById(groupId);
	if (type == "XYZ") {
		var layerUrl = {
			'基础矢量图': 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0',
			'谷歌地形图': 'http://mt3.google.cn/vt/lyrs=t@131,r@216000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Gal',
			'谷歌影像图': 'http://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=G'
		};
		var source = new ol.source.XYZ({
			crossOrigin: 'anonymous',
			url: layerUrl[layerName]
		});
		// var tempLayer = new ol.layer.Tile({
		// 	source: source
		// });
		// var extent = tempLayer.getExtent();

		// debugger
		var xyzLayer = new ol.layer.Tile({
			id: layerId,
			baseLayer: true,
			noSwitcherDelete: true,
			title: layerName,
			visible: visible,
			zIndex: -layerOrder,
			source: source
		});

		groupLayer.getLayers().push(xyzLayer);
	} else if (type == "矢量") {
		if (layerName == "北斗航空器") {
			ol.loadAirPlane(groupLayer, layerId, layerName, layerOrder, visible);
		} else {
			var layer = new ol.layer.Vector({
				id: layerId,
				title: layerName,
				visible: visible,
				zIndex: -layerOrder,
				source: new ol.source.Vector()
			});
			if (layerName == "距离环图层")
				ol.default.distanceRingLayer = layer;
			groupLayer.getLayers().push(layer);
		}
	}

};

//通过ID获取图层
ol.Map.prototype.getLayerById = function(id) {
	var temp;
	this.getLayers().forEach(group => {
		if (group.getProperties().id != undefined) {
			group.getLayers().forEach(layer => {
				if (layer.getProperties().id == id)
					temp = layer;
			});
		}
	});
	return temp;
};

//通过groupId获取组
ol.Map.prototype.getGroupById = function(id) {
	var temp;
	this.getLayers().forEach(group => {
		if (group.getProperties().id == id)
			temp = group;
	});
	return temp;
};

//通过layerID互换Zindex
ol.Map.prototype.changeZIndexByTwoLayerId = function(layerId1, layerId2) {
	var layer1 = this.getLayerById(layerId1);
	var layer2 = this.getLayerById(layerId2);
	var tempZindex = layer1.getZIndex();
	layer1.setZIndex(layer2.getZIndex());
	layer2.setZIndex(tempZindex);
};

//通过layerID互换Zindex
ol.Map.prototype.changeZIndexByTwoGroupId = function(groupId1, groupId2) {
	var group1 = this.getGroupById(groupId1);
	var group2 = this.getGroupById(groupId2);
	var tempZindex = group1.getZIndex();
	group1.setZIndex(group2.getZIndex());
	group2.setZIndex(tempZindex);
};

//设置投影方式
ol.Collection.prototype.setProjectionControl = function(command) {
	var oldProj, newProj;
	if (command == "4326") {
		oldProj = ol.proj.get("EPSG:3857");
		newProj = ol.proj.get("EPSG:4326");
	} else {
		newProj = ol.proj.get("EPSG:3857");
		oldProj = ol.proj.get("EPSG:4326");
	}
	var view = map.getView();
	map.setView(new ol.View({
		projection: newProj,
		extent: newProj.getExtent(),
		center: ol.proj.transform(view.getCenter(), oldProj, newProj),
		zoom: view.getZoom()
	}));
	this.getGroupProjectionToChange(oldProj, newProj);
};
//改变图层投影方式
ol.Collection.prototype.getGroupProjectionToChange = function(oldProj, newProj) {
	var layer = this;
	var type = layer.type;
	if (type == undefined) {
		var array = layer.getArray();
		for (var i = 0; i < array.length; i++) {
			if (array[i].type == undefined)
				array[i].getLayers().getGroupProjectionToChange(oldProj, newProj);
			else
				ol.changeLayerProjection(array[i], oldProj, newProj);
		}
	}
};
ol.changeLayerProjection = function(layer, oldProj, newProj) {
	var type = layer.type;
	if (type != undefined) {
		if (type == 'TILE') {
			var tileLoadFunction = layer.getSource().getTileLoadFunction();
			layer.getSource().setTileLoadFunction(tileLoadFunction);
		} else if (type == 'VECTOR') {
			var currProj = layer.getSource().getProjection();
			var features = layer.getSource().getFeatures();
			if (currProj === null) {
				for (var j = 0; j < features.length; j += 1) {
					features[j].getGeometry().transform(oldProj, newProj);
				}
			}
		}
	}
};

//添加混合矢量图层
ol.Map.prototype.createVectorLayer = function(groupId, layerId, layerName, order, visible) {
	var group = this.getGroupById(groupId);
	// if (group != undefined) {
	var newLayer = new ol.layer.Vector({
		id: layerId,
		title: layerName,
		visible: visible,
		zIndex: -order,
		source: new ol.source.Vector()
	});
	group.getLayers().push(newLayer);
	return newLayer;
	// }
};

//添加混合矢量数据到图层
ol.layer.Vector.prototype.addFeaturesByTypeArray = function(type, array, featureId) {
	var geometry;
	switch (type) {
		case "Point":
			geometry = new ol.geom.Point(array);
			break;
		case "LineString":
			geometry = new ol.geom.LineString(array);
			break;
		case "Polygon":
			geometry = new ol.geom.Polygon(array);
			break;
		case "Rectangle":
			geometry = new ol.geom.Polygon(array);
			break;
		case "Circle":
			geometry = array;
			break;
		default:
			break;
	}
	var feature = new ol.Feature({
		geometry: geometry,
		type: type,
		id: featureId
	});
	this.getSource().addFeature(feature);
};

//绘制矢量
ol.drawFigureFunction = function(index) {
	ol.clearInteraction("");
	ol.clearOverlay();
	var types = ["Point", "LineString", "Polygon", "Rectangle", "Circle"];
	var figureLayer;
	if (ol.default.editLayer != null)
		figureLayer = ol.default.editLayer;
	else {
		figureLayer = new ol.layer.Vector({
			title: '临时绘制图层',
			source: new ol.source.Vector()
		});
		map.getGroupById(999).getLayers().push(figureLayer);
		ol.default.editLayer = figureLayer;
	}


	var figureInteraction;

	figureLayer.setStyle(ol.defaultStyle);

	// setDrawRectangleInteraction();
	var setFigureInteraction = function(type) {
		if (figureInteraction != null)
			map.removeInteraction(figureInteraction);
		if (type == "Rectangle") {
			figureInteraction = new ol.interaction.DrawRegular({
				source: figureLayer.getSource(),
				sides: 4
			});
		} else {
			figureInteraction = new ol.interaction.Draw({
				type: type,
				source: figureLayer.getSource()
			});
		}
		map.addInteraction(figureInteraction);

		figureInteraction.on('drawend', function(e) {
			e.feature.set("type", type);
		});
	};

	setFigureInteraction(types[index]);

	$(map.getViewport()).on("contextmenu", function(event) {
		map.removeInteraction(figureInteraction);
	});
};

//将字符串拼接成geometry
ol.getGeometryByTypeString = function(type, featureString, projection) {
	var geometryArray;
	switch (type) {
		case "Point":
			geometryArray = pinjiePoint(featureString);
			break;
		case "LineString":
			geometryArray = pinjieLineString(featureString);
			break;
		case "Polygon":
			geometryArray = pinjiePolygon(featureString);
			break;
		case "Rectangle":
			geometryArray = pinjiePolygon(featureString);
			break;
		case "Circle":
			var rA = pinjieCircle(featureString);
			geometryArray = new ol.geom.Circle(rA[0], rA[1]);
			break;
		default:
			break;
	}

	function pinjiePoint(array) {
		var p = [];
		var splitString = array.split(',');
		p.push(parseFloat(splitString[0]));
		p.push(parseFloat(splitString[1]));
		return p;
	}

	function pinjieLineString(array) {
		var p1 = [];
		var splitString = array.split(',');
		for (var i = 0; i < splitString.length - 1; i = i + 2) {
			var p2 = [];
			p2.push(parseFloat(splitString[i]));
			p2.push(parseFloat(splitString[i + 1]));
			p1.push(p2);
		}
		return p1;
	}

	function pinjiePolygon(array) {
		var p1 = [];
		var p2 = [];
		var splitString = array.split(',');
		for (var i = 0; i < splitString.length - 1; i = i + 2) {
			var p3 = [];
			p3.push(parseFloat(splitString[i]));
			p3.push(parseFloat(splitString[i + 1]));
			p2.push(p3);
		}
		p1.push(p2);
		return p1;
	}

	function pinjieCircle(array) {
		var t = [];
		var c = [];
		var splitString = array.split(',');
		c.push(parseFloat(splitString[0]));
		c.push(parseFloat(splitString[1]));
		t.push(c);
		var r = parseFloat(splitString[2]);
		t.push(r);
		return t;
	}
	return geometryArray;
};

//量测
ol.measureFunction = function(index) {
	ol.clearInteraction("");
	var types = ["Polygon", "LineString"];
	var drawLayer = new ol.layer.Vector({
		title: '测量图层',
		visible: true,
		source: new ol.source.Vector(),
		style: new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),
			stroke: new ol.style.Stroke({
				color: '#ffcc33',
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 7,
				fill: new ol.style.Fill({
					color: '#ffcc33'
				})
			})
		})
	});
	// map.addLayer(drawLayer);
	map.getGroupById(999).getLayers().push(drawLayer);

	var drawMeasure;
	var addInteraction;

	var wgs84Sphere = new ol.Sphere(6378137);

	var sketch; //Currently drawn feature
	var helpTooltipElement; //The help tooltip element
	var helpTooltip; //Overlay to show the help messages
	var measureTooltipElement; //The measure tooltip element
	var measureTooltip; //Overlay to show the measurement
	var continuePolygonMsg = '左键继续画，双击左键确定，右键取消'; //Message to show when the user is drawing a polygon
	var continueLineMsg = '左键继续画，双击左键确定，右键取消'; //Message to show when the user is drawing a line
	var measureId = Math.floor(Math.random() * 1000);
	//Handle pointer move
	var pointerMoveHandler = function(evt) {
		if (evt.dragging) {
			return;
		}
		var helpMsg = '左键开始，右键取消';

		if (sketch) {
			var geom = (sketch.getGeometry());
			if (geom instanceof ol.geom.Polygon) {
				helpMsg = continuePolygonMsg;
			} else if (geom instanceof ol.geom.LineString) {
				helpMsg = continueLineMsg;
			}
		}

		helpTooltipElement.innerHTML = helpMsg;
		helpTooltip.setPosition(evt.coordinate);

		helpTooltipElement.classList.remove('hidden');
	};

	var geodesic = true;

	//Format length output
	var formatLength = function(line) {
		var length;
		if (geodesic) {
			var coordinates = line.getCoordinates();
			length = 0;
			var sourceProj = map.getView().getProjection();
			for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
				var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
				var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
				length += wgs84Sphere.haversineDistance(c1, c2);
			}
		} else {
			length = Math.round(line.getLength() * 100) / 100;
		}
		var output;
		if (length > 100) {
			output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
		} else {
			output = (Math.round(length * 100) / 100) + ' ' + 'm';
		}
		return output;
	};


	//Format area output
	var formatArea = function(polygon) {
		var area;
		if (geodesic) {
			var sourceProj = map.getView().getProjection();
			var geom = (polygon.clone().transform(sourceProj, 'EPSG:4326'));
			var coordinates = geom.getLinearRing(0).getCoordinates();
			area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
		} else {
			area = polygon.getArea();
		}
		var output;
		if (area > 10000) {
			output = (Math.round(area / 1000000 * 100) / 100) + ' ' + 'km<sup>2</sup>';
		} else {
			output = (Math.round(area * 100) / 100) + ' ' + 'm<sup>2</sup>';
		}
		return output;
	};
	var isToolTip = null;

	addInteraction = function(e) {
		if (drawMeasure != undefined)
			map.removeInteraction(drawMeasure);
		drawMeasure = new ol.interaction.Draw({
			source: drawLayer.getSource(),
			type: (types[index]),
			style: new ol.style.Style({
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				}),
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 0, 0.5)',
					lineDash: [10, 10],
					width: 2
				}),
				image: new ol.style.Circle({
					radius: 5,
					stroke: new ol.style.Stroke({
						color: 'rgba(0, 0, 0, 0.7)'
					}),
					fill: new ol.style.Fill({
						color: 'rgba(255, 255, 255, 0.2)'
					})
				})
			})
		});
		map.addInteraction(drawMeasure);

		createMeasureTooltip();
		createHelpTooltip();
		startEventListener();
		var listener;
		drawMeasure.on('drawstart', function(evt) {
			// set sketch
			sketch = evt.feature;
			var tooltipCoord = evt.coordinate;

			listener = sketch.getGeometry().on('change', function(evt) {
				var geom = evt.target;
				var output;
				if (geom instanceof ol.geom.Polygon) {
					output = formatArea(geom);
					tooltipCoord = geom.getInteriorPoint().getCoordinates();
				} else if (geom instanceof ol.geom.LineString) {
					output = formatLength(geom);
					tooltipCoord = geom.getLastCoordinate();
				}
				measureTooltipElement.innerHTML = output;
				measureTooltip.setPosition(tooltipCoord);
			});
		}, this);

		drawMeasure.on('drawend', function(e) {
			measureTooltipElement.className = 'tooltip tooltip-static';
			measureTooltip.setOffset([0, -7]);
			measureTooltip.id = 'measureTooltip' + measureId;
			sketch = null;
			ol.Observable.unByKey(listener);

			//删除按钮
			e.feature.setId(measureId);

			var popupcloser = document.createElement('a');
			popupcloser.classList.add('ol-popup-closer');
			popupcloser.id = measureId;
			measureTooltipElement.appendChild(popupcloser);

			popupcloser.onclick = function(e) {
				var deleteId = this.id;
				var drawSource = drawLayer.getSource();
				drawSource.forEachFeature(f => {
					if (f.getId() == deleteId)
						drawSource.removeFeature(f);
				});
				var overlays = map.getOverlays();
				overlays.forEach(function(lay) {
					if (lay != undefined)
						if (lay.id.indexOf(deleteId) > 0)
							map.removeOverlay(lay);
				});
				// overlays.forEach(function(lay) {
				// 	if (lay != undefined)
				// 		if (lay.id.indexOf(deleteId) > 0)
				// 			map.removeOverlay(lay);
				// });
			};

			measureId = Math.floor(Math.random() * 1000);
			measureTooltipElement = null;
			createMeasureTooltip();
		}, this);

		isToolTip = true;
	};

	//Creates a new help tooltip
	function createHelpTooltip() {
		if (helpTooltipElement) {
			helpTooltipElement.parentNode.removeChild(helpTooltipElement);
		}
		helpTooltipElement = document.createElement('div');
		helpTooltipElement.className = 'tooltip hidden';
		helpTooltip = new ol.Overlay({
			id: 'helpTooltip',
			element: helpTooltipElement,
			offset: [15, 0],
			positioning: 'center-left'
		});
		map.addOverlay(helpTooltip);
	}

	//Creates a new measure tooltip
	function createMeasureTooltip() {
		if (measureTooltipElement) {
			measureTooltipElement.parentNode.removeChild(measureTooltipElement);
		}
		measureTooltipElement = document.createElement('div');
		measureTooltipElement.className = 'tooltip tooltip-measure';
		measureTooltip = new ol.Overlay({
			id: 'measureTooltip',
			element: measureTooltipElement,
			offset: [0, -15],
			positioning: 'bottom-center'
		});
		map.addOverlay(measureTooltip);
	}


	$(map.getViewport()).on("contextmenu", function(event) {
		if (drawMeasure != undefined) {
			map.removeInteraction(drawMeasure);
			map.removeOverlay(helpTooltip);
			map.removeOverlay(measureTooltip);
			map.un('pointermove', pointerMoveHandler);
			map.getViewport().removeEventListener('mouseout', function() {
				helpTooltipElement.classList.add('hidden');
			});
			isToolTip = null;
		}
	});

	function removeTooltip() {
		if (isToolTip != null) {
			if (isToolTip) {
				map.removeOverlay(helpTooltip);
				document.getElementById('tooltip').value = "添加提示";
			} else {
				map.addOverlay(helpTooltip);
				document.getElementById('tooltip').value = "去掉提示";
			}
			isToolTip = !isToolTip;
		}
	}

	function startEventListener() {
		map.on('pointermove', pointerMoveHandler);
		map.getViewport().addEventListener('mouseout', function() {
			helpTooltipElement.classList.add('hidden');
		});
	}

	map.removeInteraction(drawMeasure);
	addInteraction(types[index]);
};

//选择操作
ol.selectTransInteraction = function() {
	// $(map.getViewport()).off("mousedown",popupFunction);

	ol.clearInteraction("");

	var selectInteraction = new ol.interaction.Select({
		layers: [ol.default.editLayer]
	});

	var translateInteraction = new ol.interaction.Translate({
		features: selectInteraction.getFeatures()
	});

	map.addInteraction(selectInteraction);
	map.addInteraction(translateInteraction);
	$(map.getViewport()).on("contextmenu", function(event) {
		map.removeInteraction(modifyInteraction);
		map.removeInteraction(translateInteraction);
	});
};

//删除操作
ol.deleteFeatureInteraction = function() {
	ol.clearInteraction("");
	ol.setCursorFunction(true);
	$(map.getViewport()).bind("click", ol.deleteControl);
	$(map.getViewport()).on("contextmenu", function(e) {
		ol.clearInteraction("");
	});
};
ol.deleteControl = function(e) {
	var pixel = map.getEventPixel(e.originalEvent);
	map.forEachFeatureAtPixel(pixel, function(feature, layer) {
		if (layer != null) {
			if (layer.get('title') == ol.default.editLayer) {
				vueGis.$confirm('确认删除？').then(_ => {
					layer.getSource().removeFeature(feature);
				}).catch(_ => {});
			}
		}
	});
};

//编辑操作
ol.setEditInteraction = function() {
	ol.clearInteraction("");

	var selectInteraction = new ol.interaction.Select();

	var modifyInteraction = new ol.interaction.Modify({
		features: selectInteraction.getFeatures()
	});

	map.addInteraction(selectInteraction);
	map.addInteraction(modifyInteraction);

	$(map.getViewport()).on("contextmenu", function(event) {
		map.removeInteraction(modifyInteraction);
		map.removeInteraction(selectInteraction);
	});
};

//清除操作
ol.clearInteraction = function(interaction) {
	ol.setCursorFunction(false);
	$(map.getViewport()).unbind("click", ol.deleteControl);
	var interactions = map.getInteractions();
	interactions.forEach(function(inter) {
		if (inter instanceof ol.interaction.Select || inter instanceof ol.interaction.Modify)
			map.removeInteraction(inter);
		if (interaction != "" && inter == interaction)
			map.removeInteraction(inter);
		if (inter instanceof ol.interaction.Draw || inter instanceof ol.interaction.DrawRegular)
			map.removeInteraction(inter);
	});
};
//清除量测帮助图层
ol.clearOverlay = function() {
	var overlays = map.getOverlays();
	overlays.forEach(function(lay) {
		if (lay != undefined)
			if (lay.id == "helpTooltip")
				map.removeOverlay(lay);
	});
};

//清除overlay图层
ol.clearMeasureOverlays = function() {
	var overlays = map.getOverlays();
	overlays.forEach(function(lay) {
		if (lay != undefined)
			map.removeOverlay(lay);
	});
};

//设置指针
ol.setCursorFunction = function(f) {
	if (f)
		map.on("pointermove", ol.changeCursor);
	else
		map.un("pointermove", ol.changeCursor);
};

ol.changeCursor = function(event) {
	var layer = map.forEachLayerAtPixel(event.pixel, function(ly, l) {
		return ly;
	});
	if (layer) {
		if (layer.get('title') == "矢量图层")
			map.getTargetElement().style.cursor = "pointer";
		else
			map.getTargetElement().style.cursor = "";
	} else
		map.getTargetElement().style.cursor = "";
};

ol.searchAirPlane = function() {
	var data = {
		"type": "FeatureCollection",
		"crs": {
			"type": "name",
			"properties": {
				"name": "EPSG:4326"
			}
		},
		"features": [{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [116.34623248528104, 40.054683157297546]
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [116.29130084465602, 40.02103776902973]
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [116.20341021965602, 39.94106345282336]
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [115.99466998528104, 39.77661250851958]
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [116.22538287590604, 39.582138494559615]
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [116.54947955559354, 39.59907101346451]
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [116.75272662590604, 39.73860634011322]
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [117.01090533684352, 39.87364407393116]
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [116.83512408684354, 40.18909865324639]
			}
		}, {
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [116.45609576653102, 40.356744145252236]
			}
		}]
	};
	var inputNum = 1;
	ol.default.planeUnSelectedStyle = function(feature, resolution) {
		var layerStyle = new ol.style.Style({
			image: new ol.style.Circle({
				radius: 10,
				fill: new ol.style.Fill({
					color: 'red'
				}),
				stroke: new ol.style.Stroke({
					color: 'red',
					width: 1
				})
			}),
			text: new ol.style.Text({
				text: feature.getProperties().id.toString(),
				fill: new ol.style.Fill({
					color: '#FFF'
				})
			})
		});
		return layerStyle;
	};
	ol.default.planeSelectedStyle = function(feature, resolution) {
		var layerStyle = new ol.style.Style({
			image: new ol.style.Circle({
				radius: 10,
				fill: new ol.style.Fill({
					color: 'blue'
				}),
				stroke: new ol.style.Stroke({
					color: 'blue',
					width: 1
				})
			}),
			text: new ol.style.Text({
				text: feature.getProperties().id.toString(),
				fill: new ol.style.Fill({
					color: '#FFF'
				})
			})
		});
		return layerStyle;
	};
	var airPlaneSource = new ol.source.Vector();
	var airPlaneLayer = new ol.layer.Vector({
		title: 'searchLayer',
		source: airPlaneSource,
		style: ol.default.planeUnSelectedStyle
	});

	map.addLayer(airPlaneLayer);

	var features = [];

	var tempFeatures = data.features;

	for (var i = 0; i < tempFeatures.length; i++) {
		var coordinate = tempFeatures[i].geometry.coordinates;
		// features[i] = new ol.Feature(new ol.geom.Point(coordinate));		
		// features[i].set('id',tempFeatures[i].id);

		var t = ol.proj.fromLonLat(coordinate);
		features[i] = new ol.Feature(new ol.geom.Point(t));
		features[i].set('id', i);

		var properties = tempFeatures[i].properties;
		if (properties != undefined) {
			features[i].set('beidouID', properties.beidouID);
			// features[i].set('pathID',properties.raQuantity);
		}
	}

	airPlaneSource.clear();
	airPlaneSource.addFeatures(features);
	var selectedFeature;
	map.on("pointermove", (e) => {
		map.getTargetElement().style.cursor = "";
		var pixel = map.getEventPixel(e.originalEvent);
		if (selectedFeature != undefined)
			selectedFeature.setStyle(ol.default.planeUnSelectedStyle);
		map.forEachFeatureAtPixel(pixel, function(feature, layer) {
			if (layer != null) {
				if (layer.get('title') == "searchLayer") {
					map.getTargetElement().style.cursor = "pointer";
					selectedFeature = feature;
					feature.setStyle(ol.default.planeSelectedStyle);
					var p = feature.getGeometry().getCoordinates();
				}
			}
		});
	});
	map.on("click", (e) => {
		var pixel = map.getEventPixel(e.originalEvent);
		map.forEachFeatureAtPixel(pixel, function(feature, layer) {
			if (layer != null) {
				if (layer.get('title') == "searchLayer") {
					var p = feature.getGeometry().getCoordinates();
					map.getView().animate({
						center: p,
						duration: 1000
					});
				}
			}
		});
	});
};

//加载飞行器
ol.loadAirPlane = function(groupLayer, layerId, layerName, layerOrder, visible) {
	var airPlanes = [];
	vueGis.$http.get(config.bdklists).then(response => {
		if (response.ok) {
			var planeArray = response.body;
			planeArray.forEach(p => {
				if (p.lon != null && p.lat != null) {
					airPlanes.push(p);
				}
			});
			createLayer(airPlanes);
		}
	});

	function createLayer(airPlanes) {
		var isCluster;
		var planeSelected = null;
		var lastPlaneSelected = null;
		var planeStyle = function(feature, resolution) {
			var size = feature.get('features').length;
			var style = ol.default.styleCache[size];
			if (!style) {
				var color = size > 25 ? "248, 128, 0" : size > 8 ? "248, 192, 0" : "128, 192, 64";
				var radius = Math.max(8, Math.min(size * 0.75, 20));
				if (size > 1) {
					style = styleCache[size] = [
						new ol.style.Style({
							image: new ol.style.Circle({
								radius: radius + 2,
								stroke: new ol.style.Stroke({
									color: "rgba(" + color + ",0.3)",
									width: 4
								})
							})
						}),
						new ol.style.Style({
							image: new ol.style.Circle({
								radius: radius,
								fill: new ol.style.Fill({
									color: "rgba(" + color + ",0.6)"
								})
							}),
							text: new ol.style.Text({
								text: size.toString(),
								fill: new ol.style.Fill({
									color: '#000'
								})
							})
						})
					];
				} else {
					style = [new ol.style.Style({
						image: new ol.style.Icon({
							src: ol.default.planeImage,
							size: ol.default.planeSize
						}),
						text: new ol.style.Text({
							text: feature.getProperties().features[0].get('beidouID'),
							font: 'Bold 12px Arial',
							fill: new ol.style.Fill({
								color: 'green'
							}),
							stroke: new ol.style.Stroke({
								color: '#ffffff',
								width: 3
							}),
							// offsetX: 10,
							offsetY: 15
						})
					})];
				}
			}

			return style;
		};

		// Cluster Source
		var planeSource = new ol.source.Cluster({
			distance: 100,
			source: new ol.source.Vector()
		});
		// Animated cluster layer
		var planeLayer = new ol.layer.AnimatedCluster({
			id: layerId,
			title: layerName,
			visible: visible,
			zIndex: -layerOrder,
			source: planeSource,
			style: planeStyle
		});

		// map.getGroupById(999).getLayers().push(planeLayer);
		// map.addLayer(planeLayer);

		var features = [];

		// var tempFeatures = data.features;

		for (var i = 0; i < airPlanes.length; i++) {
			var lonFloat = parseFloat(airPlanes[i].lon);
			var latFloat = parseFloat(airPlanes[i].lat);
			var coordinate = [lonFloat, latFloat];
			// features[i] = new ol.Feature(new ol.geom.Point(coordinate));		
			// features[i].set('id',tempFeatures[i].id);

			var t = ol.proj.fromLonLat(coordinate);
			features[i] = new ol.Feature(new ol.geom.Point(t));
			features[i].set('id', airPlanes[i].id);
			features[i].set('beidouID', airPlanes[i].cardId);
			features[i].set('dataSource', airPlanes[i].locationType);
		}

		planeSource.getSource().clear();
		planeSource.getSource().addFeatures(features);
		ol.default.planeLayer = planeLayer;
		groupLayer.getLayers().push(planeLayer);
	}
};

//更新飞行器位置
global.updateAirPlane = function() {
	map.getLayers().forEach(group => {
		group.getLayers().forEach(l => {
			if (l === ol.default.planeLayer) {
				var features = l.getSource().getFeatures();
				features.forEach(f => {
					var properties = f.getProperties();
					var pFeatures = properties.features;
					pFeatures.forEach(pf => {
						var airPlanes = [];
						var beidouID = pf.getProperties().beidouID;
						var geom = pf.getGeometry().getCoordinates();
						// debugger
						vueGis.$http.get(config.queryByCardIdNewestLocation, {
							params: {
								'cardId': beidouID
							}
						}).then(response => {
							if (response.ok) {
								var lon = parseFloat(response.body.lon);
								var lat = parseFloat(response.body.lat);
								var coord = ol.proj.fromLonLat([lon, lat]);
								if (geom[0] != coord[0] && geom[1] != coord[1]) {
									// console.log(response.body);
									var result = response.body;
									var newGeom = new ol.geom.Point(coord);

									//lon lat alt angle type
									// console.log(pf.getProperties());
									vueGis.$http.post(config.updateByCardIdNorthCard, {
										'lon': result.lon,
										'lat': result.lat,
										'alt': result.alt,
										'angle': result.angle,
										'locationType': result.type,
										'cardId': result.cardId
									}, {
										emulateJSON: true
									}).then(res => {
										if (res.ok) {
											// debugger
											pf.setGeometry(newGeom);
											pf.set('dataSource', response.body.type);
										}
									});
								}
							}
						});
					});
				});
			}
		});
	});


	// vueGis.$http.get(config.queryNorthCard,{
	//                'pageNum': 1
	//            },{emulateJSON:true}).then(r=>{
	// 	if(r.ok)
	// 		console.log(r.body);
	// });

	// vueGis.$http.get(config.queryByCardIdAirplaneCardBind,{params:{'cardId':'425218'}}).then(r=>{
	// 	if(r.ok)
	// 		console.log(r.body);
	// });
	//轮询
	// setTimeout(updateAirPlane, 5000);
};

//更新信息栏
ol.updateInfoBar = function() {
	map.on("pointermove", (e) => {
		var c = e.coordinate;
		var lonlat = ol.proj.toLonLat(c);
		var coordString = ol.coordinate.toStringHDMS(lonlat);
		// var source = map.getLayers().getArray()[0].getSource();	
		// var coordString;
		// if(source.getProjection().getCode() == "EPSG:3857")
		// 	coordString = ol.coordinate.toStringXY(c,2);
		// else
		// 	coordString = ol.coordinate.toStringXY(c,8);
		// var coordString = ol.coordinate.toStringXY(c, 7);
		vueGis.copyright.coord = coordString;

		map.getTargetElement().style.cursor = "";
		var pixel = map.getEventPixel(e.originalEvent);
		map.forEachFeatureAtPixel(pixel, function(feature, layer) {
			if (layer != null && ol.default.planeLayer != null) {
				if (layer === ol.default.planeLayer && feature.getProperties().features.length == 1) {
					map.getTargetElement().style.cursor = "pointer";
				}
			}
		});
	});

	map.on("moveend", (e) => {
		var coordinate = e.frameState.focus;
		var zoom = e.map.getView().getZoom();
		vueGis.copyright.zoom = (Math.round(zoom)).toString();
		// var planeLayer = map.getLayerById('北斗航空器');
		var planeLayer = ol.default.planeLayer;
		if (planeLayer != undefined) {
			var extent = e.frameState.extent;
			var features = planeLayer.getSource().getFeaturesInExtent(extent);
			var sum = 0;
			for (var i = 0; i < features.length; i++) {
				var len = features[i].getProperties().features.length;
				sum = sum + len;
			}
			planeLayer.getSource().setDistance(100);
			var distance = 0;
			if (sum > 100)
				distance = 100;
			else
				distance = 0.00001;
			vueGis.copyright.num = sum.toString();
		}
		removeOverlays();
	});

	map.on("click", function(e) {
		ol.default.selectedFeature = undefined;
		removeOverlays();
		var pixel = map.getEventPixel(e.originalEvent);
		map.forEachFeatureAtPixel(pixel, function(feature, layer) {
			if (layer != null && ol.default.planeLayer != null) {
				if (layer === ol.default.planeLayer && feature.getProperties().features.length == 1) {
					ol.default.selectedFeature = feature;
					var p = feature.getGeometry().getCoordinates();
					var properties = feature.getProperties().features[0].getProperties();

					// var lonlat = ol.proj.toLonLat(p);

					vueGis.$http.get(config.queryByCardIdNewestLocation, {
						params: {
							'cardId': properties.beidouID
						}
					}).then(t => {
						// console.log(response);
						vueGis.$http.get(config.queryByCardIdAirplaneCardBind, {
							params: {
								'cardId': properties.beidouID
							}
						}).then(q => {
							clickPopup(t.body, q.body, p);
						});

					});

				}
			}
		});

		// console.log(vueGis.toolTip);
		//工具栏菜单close
		vueGis.toolTip.forEach(t => {
			if (t.isclose)
				t.isclose = false;
		});
	});

	function clickPopup(array, planeArray, p) {
		var planePopup = new ol.Overlay.Popup({
			id: 'planePopup',
			popupClass: "default",
			closeBox: false,
			positioning: 'bottom-center',
			autoPan: false,
			autoPanAnimation: {
				duration: 100
			}
		});
		map.addOverlay(planePopup);
		var id = array.cardId;
		var planeId = planeArray.airplaneId;
		var speed = array.speed;
		var planeType = 'X';
		var height = array.alt;
		var angle = array.angle;
		var lon = parseFloat(array.lon);
		var lat = parseFloat(array.lat);
		var time = array.locationTime;
		var date = getDateByYMDhms(new Date(time));
		var type = array.type;
		var content = `	<p class='topInfo closeButton' style="text-align:right;padding-top:2px;">
									<i style="cursor:pointer;" class="el-icon-close"></i>
								</p>
						<div id='topinfo'>
							<div style='display: flex; justify-content:space-around;padding:5px 0;'> 
								<div style='color:red;'>卡号：
									<span>${id}</span>
								</div>
								<div style='color:green;'>机号：
									<span>${planeId}</span>
								</div>
								
							</div>
							<table cellpadding='0' cellspacing='0' width='100%' height='100%'>
								<tr style='text-align:center;background-color:gray;color:white;'>
									<th>飞机属性</th>
									<th></th>
									<th>飞行状态</th>
								</tr>
								<tr style='color:gray;text-align:left;'>
									<td>卡号：
										<span>${id}</span>
									</td>
									<td>高度：
										<span>${height}</span>m
									</td>
									<td>航班号：
										<span>${id}</span>
									</td>
								</tr>
								<tr style='color:gray;text-align:left;'>
									<td>机型：
										<span>${planeType}</span>
									</td>
									<td>速度：
										<span>${speed}</span>
									</td>
									<td>经度：
										<span>${lon.toFixed(4)}</span>
									</td>
								</tr>
								<tr style='color:gray;text-align:left;'>
									<td>机号：
										<span>${planeId}</span>
									</td>
									<td>航向：
										<span>${angle}</span>
									</td>
									<td>纬度：
										<span>${lat.toFixed(4)}</span>
									</td>
								</tr>
							</table>
							<div style='display: flex; justify-content:space-around;color:black;background-color:lightgray;'>
								<div>信息源：
									<span>${type}</span>
								</div>
								<div>更新日期：${date}</div>
							</div>
						</div>`;
		planePopup.show(p, content);
		$('.topInfo.closeButton').on('click', function(e) {
			planePopup.hide();
		});
	}

	$(map.getViewport()).on("contextmenu", function(e) {
		ol.default.selectedFeature = undefined;
		removeOverlays();
		var pixel = map.getEventPixel(e.originalEvent);
		map.forEachFeatureAtPixel(pixel, function(feature, layer) {
			if (layer != null && ol.default.planeLayer != null) {
				// var title = ol.default.planeLayer.get('title');
				if (layer === ol.default.planeLayer && feature.getProperties().features.length == 1) {
					ol.default.selectedFeature = feature;
					var p = feature.getGeometry().getCoordinates();
					var planeMenu = new ol.Overlay.Popup({
						id: 'planeMenu',
						popupClass: "right",
						closeBox: false,
						positioning: 'bottom-left',
						offset: [10, 0],
						autoPan: false,
						autoPanAnimation: {
							duration: 0
						}
					});
					map.addOverlay(planeMenu);
					var lonlat = ol.proj.toLonLat(p);
					// var content = `	
					// 				<ul class="popupMenu">		
					// 					<li id="centerMap"><img src="../../img/version2/mapcener.png" /><span>设置为地图中心</span></li>
					// 					<li id="distanceRing"><img src="../../img/version2/jtjlh.png" /><span>静态距离环</span></li>
					// 					<li id="clearPath"><img src="../../img/version2/clearhis.png" /><span>清空历史轨迹</span></li>
					// 					<li id="addPath"><img src="../../img/version2/thhis.png" /><span>通航历史轨迹</span></li>
					// 					<li id="zoomInMap"><img src="../../img/version2/enlarge.png" /><span>放大</span></li>
					// 					<li id="zoomOutMap"><img src="../../img/version2/narrow.png" /><span>缩小</span></li>
					// 					<li id="newWin"><span>添加新窗口</span></li>
					// 				</ul>
					// 			`;
					var content = `	
						<ul class="popupMenu">		
							<li id="centerMap"><span>设置为地图中心</span></li>
							<li id="distanceRing"><span>静态距离环</span></li>
							<li id="clearPath"><span>清空历史轨迹</span></li>
							<li id="addPath"><span>通航历史轨迹</span></li>
							<li id="zoomInMap"><span>放大</span></li>
							<li id="zoomOutMap"><span>缩小</span></li>
							<li id="newWin"><span>添加新窗口</span></li>
						</ul>
					`;
					planeMenu.show(p, content);
					// mapcener
				}
			}
		});
	});


	$('.ol-overlaycontainer-stopevent').on('click', '.popupMenu li', function(e) {
		var selectedFeatureId = ol.default.selectedFeature.getProperties().features[0].getProperties().beidouID;
		switch (e.currentTarget.id) {
			case "centerMap":
				map.setCenterMap();
				break;
			case "distanceRing":
				staticRing();
				break;
			case "clearPath":
				map.removeLayers();
				break;
			case "addPath":
				ol.getPath(selectedFeatureId);
				break;
			case "zoomInMap":
				map.setZoomIn();
				break;
			case "zoomOutMap":
				map.setZoomOut();
				break;
			case "newWin":
				planeWindow();
				break;
			default:
				break;
		}
		removeOverlays();

	});

	//静态距离环
	function staticRing() {
		ol.default.distanceRingLayer.setStyle(ol.defaultDistanceRingStyle);
		var centerPoint = ol.default.selectedFeature.getGeometry().getCoordinates();
		var count = 4;
		var defautDistance = 1000;
		for (var i = 0; i < count; i++) {
			var Circle = new ol.geom.Circle(centerPoint, defautDistance * (i + 1));
			ol.default.distanceRingLayer.getSource().addFeature(new ol.Feature(Circle));
		}
	}

	function planeWindow() {
		vueGis.mapboole = true;
		// setTimeout(map.updateSize(),2000);
		// var timeNum = 0;
		// var timer = setInterval(()=>{
		// 	timeNum++;
		// 	if(timeNum>2000){
		// 		clearInterval(timer);
		// 		map.updateSize();
		// 	}
		// },20);
	}

	function removeOverlays() {
		var overlays = map.getOverlays();
		overlays.forEach(function(lay) {
			if (lay != undefined)
				if (lay.id == "planeMenu")
					map.removeOverlay(lay);
		});
	}

	function getDateByYMDhms(date) {
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		return Y + M + D + h + m + s;
	}
};

ol.getPath = function(id) {
	var param = {};
	param.cardId = id;
	param.startAt = '2017-07-05 14:29:13';
	param.endAt = '2017-07-05 14:44:13';
	vueGis.$http.get(config.queryByCardIdAndLocationTime, {
		params: param
	}).then(response => {
		// console.log(response);
		map.getPathPlayback(response.body);
	});
};

//通过OverlayId获得Overlay
ol.Map.prototype.getOverlayById = function(id) {
	var lay;
	var overlays = map.getOverlays();
	overlays.forEach(function(l) {
		if (l.id == "planeMenu")
			lay = l;
	});
	return lay;
};

//保存选中Feature
ol.default.selectedFeature = undefined;

ol.elastic = function(t) {
	return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
};

//设置地图中心
ol.Map.prototype.setCenterMap = function() {
	var view = this.getView();
	var coordinate = ol.default.selectedFeature.getGeometry().getCoordinates();
	view.animate({
		duration: 700,
		easing: ol.elastic,
		center: coordinate
	});
};
//放大
ol.Map.prototype.setZoomIn = function() {
	var view = this.getView();
	var coordinate = ol.default.selectedFeature.getGeometry().getCoordinates();
	view.animate({
		zoom: view.getZoom() + 1,
		duration: 700,
		center: coordinate
	});
};
//缩小
ol.Map.prototype.setZoomOut = function() {
	var view = this.getView();
	var coordinate = ol.default.selectedFeature.getGeometry().getCoordinates();
	view.animate({
		zoom: view.getZoom() - 1,
		duration: 700,
		center: coordinate
	});
};

//历史轨迹
ol.Map.prototype.getPathPlayback = function(data) {
	console.log(data.length);
	var planeStyle = [
		new ol.style.Style({
			// image: new ol.style.Shadow({
			// 	radius: ol.default.planeSize[0],
			// }),
			image: new ol.style.Icon({
				src: ol.default.planeShadowImage,
				size: ol.default.planeSize,
				rotateWithView: true,
				offset: [10, 10],
				rotation: 0
			}),
			stroke: new ol.style.Stroke({
				color: [0, 0, 0, 0],
				width: 2
			}),
			fill: new ol.style.Fill({
				color: [0, 0, 0, 0]
			}),
			zIndex: -1
		}),
		new ol.style.Style({
			image: new ol.style.Icon({
				src: ol.default.planeImage,
				size: ol.default.planeSize,
				rotateWithView: true,
				rotation: 0
			}),
			stroke: new ol.style.Stroke({
				color: [0, 0, 255, 0],
				width: 2
			}),
			fill: new ol.style.Fill({
				color: [0, 0, 255, 0]
			})
		})
	];

	// ol.default.pathPlayBackLayer

	// var polylinesFeatures = data.features;
	var lineArray = [];
	for (var i = 0; i < data.length; i++) {
		var lon = parseFloat(data[i].lon);
		var lat = parseFloat(data[i].lat);
		var temp = ol.proj.fromLonLat([lon, lat]);
		lineArray.push(temp);
	}
	// var polylines = polylinesFeatures[0].geometry.coordinates;
	// var transPolyline = tansformFromLonLat(polylinesFeatures);
	var route = new ol.geom.LineString(lineArray);
	var source = new ol.source.Vector({
		features: [new ol.Feature({
			type: 'route',
			geometry: route
		})]
	});
	var pathPlayBackLayer = new ol.layer.Vector({
		id: '轨迹线',
		title: "轨迹线",
		source: source,
		style: planeStyle
	});
	map.getGroupById(999).getLayers().push(pathPlayBackLayer);

	var features = [];
	for (var j = 1; j < lineArray.length; j++) {
		var pointFeature = new ol.Feature({
			geometry: new ol.geom.Point(lineArray[j])
		});
		pointFeature.set("isVisible", false);
		pointFeature.set('type', data[j].type);
		features.push(pointFeature);
	}
	var pointsLayer = new ol.layer.Vector({
		title: '轨迹点',
		zIndex: -600,
		source: new ol.source.Vector({
			features: features
		}),
		style: pointsStyle
	});
	map.getGroupById(999).getLayers().push(pointsLayer);

	function pointsStyle(feature) {
		var fill, stroke;
		var isVisible = feature.getProperties().isVisible;
		if (isVisible) {
			var type = feature.getProperties().type;
			fill = new ol.style.Fill({
				color: 'rgba(255,255,255,0.4)'
			});
			if (type == "北斗") {
				stroke = new ol.style.Stroke({
					color: '#CC0000',
					width: 1.25
				});
			} else {
				stroke = new ol.style.Stroke({
					color: '#3333CC',
					width: 1.25
				});
			}
		} else {
			fill = new ol.style.Fill({
				color: 'rgba(255,255,255,0)'
			});
			stroke = new ol.style.Stroke({
				color: 'rgba(255,255,255,0)',
				width: 0
			});
		}
		var style = new ol.style.Style({
			image: new ol.style.RegularShape({
				points: 4,
				radius: 5,
				fill: fill,
				stroke: stroke
			}),
			stroke: stroke,
			fill: fill
		});
		return style;
	}

	function startPathAnimation() {
		var f = new ol.Feature(new ol.geom.Point([0, 0]));
		var anim = new ol.featureAnimation.Path({
			path: source.getFeatures()[0],
			easing: ol.easing.linear,
			speed: 1,
			revers: true,
			isFollow: true
		});
		pathPlayBackLayer.animateFeature(f, planeStyle, anim);

		// map.getView().fit(source.getExtent(), {
		// 	duration: 1
		// });

		f.on('change', function(e) {
			var movePoint = e.target.getGeometry().getCoordinates();
			pointsLayer.getSource().getFeatures().forEach(f => {
				var tempC = f.getGeometry().getCoordinates();
				var lineGeom = new ol.geom.LineString([movePoint, tempC]);
				var isvisible = f.getProperties().isVisible;
				if (!isvisible) {
					var distance = ol.Sphere.getLength(lineGeom);
					if (distance < 10)
						f.set("isVisible", true);
				}
			});
		});
	}

	setTimeout(startPathAnimation(), 2000);
};

//定位
ol.inputLocation = function(x, y) {
	var view = map.getView();
	var fx = parseFloat(x);
	var fy = parseFloat(y);
	var proj = view.getProjection().getCode();
	var center;
	if (proj == "EPSG:3857")
		center = ol.proj.fromLonLat([fx, fy]);
	else
		center = [x, y];
	map.setView(new ol.View({
		projection: proj,
		center: center,
		zoom: view.getZoom()
	}));
};

//清除tempGroup下图层
ol.Map.prototype.removeLayers = function() {
	var group = this.getGroupById(999);
	var array = group.getLayers().getArray();
	array.splice(0, array.length);
	ol.clearMeasureOverlays();
	map.render();
};

//加载快视图树
ol.Map.prototype.loadQuickViewTree = function() {
	vueGis.$http.get(config.queryQuickViewGroupByPid, {
		params: {
			'pId': 1
		}
	}).then(r => {
		// r.body.forEach(m => {
		// 	vueGis.$http.get(config.queryQuickViewById, {
		// 		params: {
		// 			'id': 6
		// 		}
		// 	}).then(t => {
		// 		var arr = vueGis.search.quick;
		// 		arr.push({
		// 			'name': m.label,
		// 			'layersshow': false,
		// 			'type': 'group',
		// 			'id': m.id,
		// 			'childlayers': []
		// 		});
		// 		vueGis.groupchildlayers = vueGis.search.quick[arr.length - 1].childlayers;
		// 		vueGis.groupchildlayers.push({
		// 			'name': t.body.label,
		// 			'type': 'layer',
		// 			'id': t.body.id
		// 		});
		// 	});
		// });
		r.body.forEach(m => {
			var arr = vueGis.search.quick;
			arr.push({
				'name': m.label,
				'id': m.id
			});
		});
		// r.body.forEach(m => {
		// 	vueGis.$http.get(config.queryQuickViewById, {
		// 		params: {
		// 			'id': 6
		// 		}
		// 	}).then(t => {
		// 		var arr = vueGis.search.quick;
		// 		arr.push({
		// 			'name': m.label,
		// 			'layersshow': false,
		// 			'type': 'group',
		// 			'id': m.id,
		// 			'childlayers': []
		// 		});
		// 		vueGis.groupchildlayers = vueGis.search.quick[arr.length - 1].childlayers;
		// 		vueGis.groupchildlayers.push({
		// 			'name': t.body.label,
		// 			'type': 'layer',
		// 			'id': t.body.id
		// 		});
		// 	});
		// });
	});

	//云图
	// var ctrl = new ol.control.Cloud({ opacity:0.3, density:0.5, windSpeed:1, windAngle:45*Math.PI/180});
	// map.addControl(ctrl);
};

ol.View.prototype.setViewById = function(id) {
	vueGis.$http.get(config.queryQuickViewById, {
		params: {
			'id': id
		}
	}).then(t => {
		var arr = t.body;
		var lon = parseFloat(arr.centerLon);
		var lat = parseFloat(arr.centerLat);
		var center = ol.proj.fromLonLat([lon, lat]);
		var zoom = parseInt(arr.zoomLevel);
		var currentCenter = this.getCenter();
		// var lineGeom = new ol.geom.LineString([currentCenter, center]);
		// var distance = ol.Sphere.getLength(lineGeom);
		// var duration = distance / 100;
		// console.log(duration);
		var duration = 2000;
		this.animate({
			center: center,
			zoom: zoom,
			duration: duration
		});
	});
};