
var globalMap;

//Osm layer
var layer_watercolor;
var layer_osm;
var layer_toner_lite;
var layer_toner;
var layer_sat_quest;
var layer_osm_quest;
var layer_hyb_quest;
var layer_local;

function renderComplexMap(divContainer, JsonData, action) {
	var data = JSON.parse(JsonData);
	var originLat = data.lat;
	var originLong = data.long;
	var zoom = data.zoom;
	var boundLeft = data.minLong;
	var boundBottom = data.minLat;
	var boundRight = data.maxLat;
	var boundTop = data.maxLong;
	var content = data.levels;
	
	
	var fromProjection = new ol.proj.Projection("EPSG:4326");
	var toProjection = new ol.proj.Projection("EPSG:900913");
	//var	proj = new ol.proj.Projection(fromProjection);
	
	var layers = [];
	var vector_feature = [];
	var circle_feature = [];
	var heatmap_feature = [];
	
	var displayedNames = [];
	
	var texts = {
	    text: "normal",
	    align: "center",
	    baseline: "middle",
	    rotation: 0,
	    font: "Verdana",
	    weight: "bold",
	    size: "8px",
	    offsetX: 0,
	    offsetY: 0,
	    color: "black",
	    outline: "#ffffff",
	    outlineWidth: 3,
	    maxreso: '1200'
	  };
	
	var getText = function(feature, resolution, dom) {
		  var type = dom.text.value;
		  var maxResolution = dom.maxreso.value;
		  var text = feature.get('name');

		  if (resolution > maxResolution) {
		    text = '';
		  } /*else if (type == 'hide') {
		    text = '';
		  } else if (type == 'shorten') {
		    text = text.trunc(12);
		  } else if (type == 'wrap') {
		    text = stringDivider(text, 16, '\n');
		  }*/

		  return text;
		};
	
	var createTextStyle = function(feature, resolution, dom) {
		  var align = dom.align.value;
		  var baseline = dom.baseline.value;
		  var size = dom.size.value;
		  var offsetX = parseInt(dom.offsetX.value, 10);
		  var offsetY = parseInt(dom.offsetY.value, 10);
		  var weight = dom.weight.value;
		  var rotation = parseFloat(dom.rotation.value);
		  var font = weight + ' ' + size + ' ' + dom.font.value;
		  var fillColor = dom.color.value;
		  var outlineColor = dom.outline.value;
		  var outlineWidth = parseInt(dom.outlineWidth.value, 10);

		  return new ol.style.Text({
		    textAlign: align,
		    textBaseline: baseline,
		    font: font,
		    text: getText(feature, resolution, dom),
		    fill: new ol.style.Fill({color: fillColor}),
		    stroke: new ol.style.Stroke({color: outlineColor, width: outlineWidth}),
		    offsetX: offsetX,
		    offsetY: offsetY,
		    rotation: rotation
		  });
		};
		
		var createCircleStyleFunction = function() {
			
			return function(feature, resolution) {
				 var style = new ol.style.Style({
			    	fill: new ol.style.Fill({
	            		//color: '#' + metricColor
			    		color: '#BBBBBB'
					}),
					stroke: new ol.style.Stroke({
					   // color: '#' + metricColor,
					   // width: 1
					 }),
					 text: createTextStyle(feature, resolution, texts)
			    });
			    return [style];
			  };
		};
	
	//calcul de l'extent : A REVOIR
	//var extentValue = new ol.extent.boundingExtent([boundLeft,boundBottom,boundRight,boundTop]);
	var extentValue = [boundLeft,boundBottom,boundRight,boundTop];
	var tfn = ol.proj.getTransform('EPSG:4326', 'EPSG:900913');
	extentValue = ol.extent.applyTransform(extentValue, tfn);
	
	//definition des controles
	var controls = [
		//new ol.control.Control(),
		new ol.control.Zoom(),
		new ol.control.ZoomSlider({
			target: divContainer
		}),
		new ol.control.MousePosition()
		//new ol.control.Control.LayerSwitcher(),
		//new ol.control.Control.KeyboardDefaults()
	];
	
	//Osm layer
	layer_local = new ol.layer.Tile({
	      source: new ol.source.OSM({
	    	  layer : 'local-tile',
	    	  url : "http://51.255.95.107:9900/osm_tiles/{z}/{x}/{y}.png",
              crossOrigin: null
	      }),
	      name: "Tile"
	    });
	layer_watercolor = new ol.layer.Tile({
	      source: new ol.source.Stamen({
	    	  layer : 'watercolor'
	      }),
	      name: "Tile"
	    });
	layer_toner_lite = new ol.layer.Tile({
	      source: new ol.source.Stamen({
	    	  layer : 'toner-lite'
	      }),
	      name: "Tile"
	    });
	layer_toner = new ol.layer.Tile({
	      source: new ol.source.Stamen({
	    	  layer : 'toner'
	      }),
	      name: "Tile"
	    });
	layer_osm = new ol.layer.Tile({
	      source: new ol.source.OSM(),
	      name: "Tile"
	    });
	layers.push(layer_toner_lite);
	$(".attr-osm").hide();
	$(".attr-stamen").show();
	

	var map = new ol.Map({
		layers: layers,
		controls: controls,
		target: divContainer,
		view: new ol.View({
		    zoom: zoom,
		    center: ol.proj.transform([originLong, originLat], 'EPSG:4326', 'EPSG:900913')
		}),
		displayed: displayedNames
	});
	
	globalMap = map;

	
}

function changeTile(name) {
	var layers = globalMap.getLayers();
	switch(name) {
	    case "none":
	    	layers.removeAt(0);
	        layers.insertAt(0, new ol.layer.Tile({}));
	        $(".attr-osm").hide();
	        $(".attr-stamen").hide();
	        break;
	    case "osm":
	    	layers.removeAt(0);
	        layers.insertAt(0, layer_osm);
	        $(".attr-osm").show();
	        $(".attr-stamen").hide();
	        break;
	    case "local-tile":
	    	layers.removeAt(0);
	        layers.insertAt(0, layer_local);
	        $(".attr-osm").show();
	        $(".attr-stamen").hide();
	        break;
	    case "watercolor":
	    	layers.removeAt(0);
	        layers.insertAt(0, layer_watercolor);
	        $(".attr-osm").hide();
	        $(".attr-stamen").hide();
	        break;
	    case "toner":
	    	layers.removeAt(0);
	        layers.insertAt(0, layer_toner);
	        $(".attr-osm").hide();
	        $(".attr-stamen").show();
	        break;
	    case "toner-lite":
	    	layers.removeAt(0);
	        layers.insertAt(0, layer_toner_lite);
	        $(".attr-osm").hide();
	        $(".attr-stamen").show();
	        break;
	    default:
	    	layers.removeAt(0);
	    	layers.insertAt(0, layer_osm);
	    	$(".attr-osm").hide();
	        $(".attr-stamen").hide();
	}
}

function resizeMap() {
	
	globalMap.updateSize();

} 


function initTooltip() {
	try{
		info = $('#info');
	} catch(e){
		info = jQuery2('#info');
	}
    
    info.tooltip({
      animation: false,
      trigger: 'manual',
      html: true,
      placement: "auto top"
    });

    var displayFeatureInfo = function(pixel) {
      info.css({
        left: pixel[0] + 'px',
        top: (pixel[1] - 15) + 'px'
      });
      var feature = globalMap.forEachFeatureAtPixel(pixel, function(feature) {
        return feature;
      }, null, function(layer) {
        return (layer === globalMap.getLayers().getArray()[1]) 
        || (globalMap.getLayers().getArray().length > 1 
        		/*&& globalMap.getLayers().getArray()[1].getSource().getFeatures()[0].getGeometry().flatCoordinates.length <= 2 */
        		&& layer instanceof ol.layer.Vector);
      });
      if (feature) {
        info.tooltip('hide')
            .attr('title', renderTextFeature(feature.get('data').properties))
            .tooltip('fixTitle')
            .tooltip('show');
      } else {
        info.tooltip('hide');
      }
    };

    globalMap.on('pointermove', function(evt) {
      if (evt.dragging) {
        info.tooltip('hide');
        return;
      }
      displayFeatureInfo(globalMap.getEventPixel(evt.originalEvent));
    });

  /*  globalMap.on('click', function(evt) {
      displayFeatureInfo(evt.pixel);
    });*/
    
}

function getDataDisplayedMetrics(name) {
	var displayed = globalMap.get('displayed');
	if(!displayed){
		return ""; 
	}
	var layers = globalMap.getLayers().getArray();
	var result = "";
	for(i=0; i< layers.length; i++){
		if(layers[i].get('name') == 'Tile' || layers[i].get('name') == 'Vector_layer'){
			continue;
		}
		
		for(j=0; j<displayed.length; j++){
			if(displayed[j] == layers[i].get('name')){
				var feature;
				for(b=0; b< layers[i].getSource().getFeatures().length; b++){
					if(layers[i].getSource().getFeatures()[b].get('name') == name){
						feature = layers[i].getSource().getFeatures()[b];
						break;
					}
				}
	/**/		result = result + "<h4>" + feature.get('metricName') + "</h4>";
				var datas = feature.get('data');
				for(k=0; k<datas.length; k++){
					result = result + "<p>" + datas[k].text + "</p>";
				}
			}
		}
	}
	return result;

}

function fitExtent(features) {
	
	var ext = d3.geoBounds(features);
	var ext2 = new Array(ext[0][0], ext[0][1], ext[1][0], ext[1][1]);
	
	if(JSON.stringify(ext)!=JSON.stringify([[-180,-90],[180,90]])){
		var tfn = ol.proj.getTransform('EPSG:4326', 'EPSG:900913');
		var ext3 = ol.extent.applyTransform(ext2, tfn);
		globalMap.getView().fit(ext3, globalMap.getSize());
	} else {
		globalMap.getView().fit(globalMap.getView().calculateExtent(), globalMap.getSize());
	}
	
}

var features, featuresArray, featuresProp;
function loadMapData(){

	var data = '{"levels":[], "minLat":46.00532496697866, "maxLat":48.53549206567581, "minLong":-0.9306642172507187, "maxLong":10.80273422024928, "lat":47.28553336245761, "long":4.936035001499281, "zoom":8, "maptype":"polygon"}';
	renderComplexMap("map", data, "VALEUR");
	
	initTooltip();

    //fitExtent(features);

    resizeMap();
	//console.time('analyseProperties');
    analysePropertiesforMap();
	//console.timeEnd('analyseProperties');
	canvas = d3.select(document.createElement('canvas'));
	context = canvas.node().getContext('2d');
	
	color = d3.scaleOrdinal(d3.schemeCategory20);

	$(".imgCollapse").on('click',function(){
		$(".float-panel").width("150px");
		$(".float-panel").height("36px");
		$(".float-panel-content").hide();
		$(".imgCollapse").hide();
		$(".imgExpand").show();
		$(".lblDatas").show();
	});		
	
	$(".imgExpand, .lblDatas").on('click',function(){
		$(".float-panel").width("auto");
		$(".float-panel").height("auto");
		$(".float-panel-content").show();
		$(".imgCollapse").show();
		$(".imgExpand").hide();
		$(".lblDatas").hide();
	});		
	
	$(".float-panel-content").show();
	$(".imgCollapse").show();
	$(".imgExpand").hide();
	$(".lblDatas").hide();

	renderD3DefaultLayer();
}

function loadTabData(format){
	
	/*if(format == "CSV"){
		if(featuresArray[0].toString().split(',').length == 1){
			d3.select('table').append("p").text("Fichier mal formaté");
			return;
		
		}
	}*/
	tabulate(featuresArray.slice(0, 100));
	initPagination();
	
	$('#table th').on('click',function(){
		if($(this).attr("scope") == "col")
			sortTable($(this));
	});		
}
var formData;
function loadChartData( format){
	//var features;
	$("#choice-x").hide();
	$("#choice-y-type").hide();
	$("#choice-y").hide();
	color = d3.scaleOrdinal(d3.schemeCategory20);
	formData = format;

	$("#choice-type-select").attr('disabled','disabled');

	/*if(format == "CSV"){
		if(featuresArray[0].toString().split(',').length == 1){
			d3.select('.chart-visu').append("p").text("Fichier mal formaté");
			return;
		}
	}*/
	
	$("#choice-type-select").removeAttr('disabled');
	if(format == "GeoJSON" || format == "SHP"){
		analysePropertiesforMap();
	} else {
		analyseProperties();
	}
	
	fillChoices();
	onChangeChart();
	
}

function renderD3DefaultLayer(){

	$(".caption-panel").hide();
		var circle_feature = [];
		var style_circle = function(feature) {
			var c =  "#ea8b25";
			if(feature.get('data').geometry.type =="Point" || feature.get('data').geometry.type =="MultiPoint"){
        		
				var style = new ol.style.Style({
					image: new ol.style.Circle({
	               	 	radius: 5,
	                	fill: new ol.style.Fill({
		            		color: c
						}),
						stroke: new ol.style.Stroke({
						    color: "transparent",
						    width: 0
						 })
	              	})
	            	
				});
			    return style;
        	} else if(feature.get('data').geometry.type =="Polygon" || feature.get('data').geometry.type =="MultiPolygon"){
        		var style = new ol.style.Style({
					
                	fill: new ol.style.Fill({
	            		color: c
					}),
					stroke: new ol.style.Stroke({
					    color: "white",
					    width: 2
					 })
	            	
				});
        		return style;
        	} else if(feature.get('data').geometry.type =="LineString" || feature.get('data').geometry.type =="MultiLineString"){
        		var style = new ol.style.Style({
					
                	fill: new ol.style.Fill({
	            		color: c
					}),
					stroke: new ol.style.Stroke({
					    color: c,
					    width: 5
					 })
	            	
				});
        		return style;
        	} else {
        		var style = new ol.style.Style({
					
                	fill: new ol.style.Fill({
	            		color: c
					}),
					stroke: new ol.style.Stroke({
					    color: black,
					    width: 1
					 })
	            	
				});
        		return style;
        	}
			
		};

		var render_geom = function(feature) {
			if(feature.geometry.type =="Point"){
        		return new ol.geom.Point(ol.proj.getTransform('EPSG:4326', 'EPSG:900913')(feature.geometry.coordinates));
        	} else if(feature.geometry.type =="Polygon"){
				var poly = new ol.geom.Polygon(feature.geometry.coordinates);
				poly.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:900913'));
				return poly;
        	}
        	else if(feature.geometry.type =="MultiPolygon"){
				var poly = new ol.geom.MultiPolygon(feature.geometry.coordinates);
				poly.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:900913'));
				return poly;
        	} else if(feature.geometry.type =="LineString"){
				var poly = new ol.geom.LineString(feature.geometry.coordinates);
				poly.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:900913'));
				return poly;
        	} else if(feature.geometry.type =="MultiLineString"){
				var poly = new ol.geom.MultiLineString(feature.geometry.coordinates);
				poly.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:900913'));
				return poly;
        	}

		};
	
		var source_circles = new ol.source.Vector({
			features: circle_feature
		});

		var layer = new ol.layer.Vector({
			source: source_circles,
			opacity: 0.8,
			name: "default"

		});
		if(globalMap.getLayers().getArray())
		globalMap.removeLayer(globalMap.getLayers().getArray()[1]);
		globalMap.addLayer(layer);

		featuresArray.forEach(function(d, i) {

			var circle = new ol.Feature({
	            geometry: render_geom(d),
	        	data: d
			});

			
			circle.setStyle(style_circle(circle));
			source_circles.addFeature(circle);

		});
		
}

function renderD3Layer(key, display){

	if(display){
		var captionClass = "caption-point";
		if(featuresArray[0].geometry.type =="Point" || featuresArray[0].geometry.type =="MultiPoint"){
        	captionClass = "caption-point"	;
    	} else if(featuresArray[0].geometry.type =="Polygon" || featuresArray[0].geometry.type =="MultiPolygon"){
    		captionClass = "caption-background";
    	} else if(featuresArray[0].geometry.type =="LineString" || featuresArray[0].geometry.type =="MultiLineString"){
    		captionClass = "caption-line";
    	}
		$(".caption-panel").show();
		var captionPanel = $(".caption-list");
		captionPanel.html("");
		$.each(properties[key], function(i, v) {
			var label = v;
			try{
				label = decodeURIComponent(escape(label));
			} catch(error){

			}
			captionPanel.append('<li class="caption-item">'+
							'<div class="caption-img">'+
								'<div class="'+ captionClass +'" style="background-color: '+ color(i) +'"></div>'+
							'</div>'+
							'<span class="caption-label">'+ label +'</span>'+
						'</li>');
		});
		var circle_feature = [];
		var style_circle = function(feature) {
			var c =  color(properties[key].indexOf(feature.get('data').properties[key]));
			if(feature.get('data').geometry.type =="Point" || feature.get('data').geometry.type =="MultiPoint"){
        		
				var style = new ol.style.Style({
					image: new ol.style.Circle({
	               	 	radius: 5,
	                	fill: new ol.style.Fill({
		            		color: c
						}),
						stroke: new ol.style.Stroke({
						    color: "transparent",
						    width: 0
						 })
	              	})
	            	
				});
			    return style;
        	} else if(feature.get('data').geometry.type =="Polygon" || feature.get('data').geometry.type =="MultiPolygon"){
        		var style = new ol.style.Style({
					
                	fill: new ol.style.Fill({
	            		color: c
					}),
					stroke: new ol.style.Stroke({
					    color: "white",
					    width: 2
					 })
	            	
				});
        		return style;
        	} else if(feature.get('data').geometry.type =="LineString" || feature.get('data').geometry.type =="MultiLineString"){
        		var style = new ol.style.Style({
					
                	fill: new ol.style.Fill({
	            		color: c
					}),
					stroke: new ol.style.Stroke({
					    color: c,
					    width: 5
					 })
	            	
				});
        		return style;
        	} else {
        		var style = new ol.style.Style({
					
                	fill: new ol.style.Fill({
	            		color: c
					}),
					stroke: new ol.style.Stroke({
					    color: black,
					    width: 1
					 })
	            	
				});
        		return style;
        	}
			
		};

		var render_geom = function(feature) {
			if(feature.geometry.type =="Point"){
        		return new ol.geom.Point(ol.proj.getTransform('EPSG:4326', 'EPSG:900913')(feature.geometry.coordinates));
        	} else if(feature.geometry.type =="Polygon"){
        		/*var points = [];
        		for(l = 0 ; l < feature.geometry.coordinates[0].length ; l++) {  
					var p = new ol.geom.Point(ol.proj.transform([Number(feature.geometry.coordinates[0][l][0]), Number(feature.geometry.coordinates[0][l][1])], 'EPSG:4326', 'EPSG:900913'));
					points.push(p.getCoordinates());
				}
				return new ol.geom.Polygon([points]);*/
				var poly = new ol.geom.Polygon(feature.geometry.coordinates);
				poly.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:900913'));
				return poly;
        	}
        	else if(feature.geometry.type =="MultiPolygon"){
        		/*var points = [];
        		for(l = 0 ; l < feature.geometry.coordinates[0].length ; l++) {  
					var p = new ol.geom.Point(ol.proj.transform([Number(feature.geometry.coordinates[0][l][0]), Number(feature.geometry.coordinates[0][l][1])], 'EPSG:4326', 'EPSG:900913'));
					points.push(p.getCoordinates());
				}
				return new ol.geom.Polygon([points]);*/
				var poly = new ol.geom.MultiPolygon(feature.geometry.coordinates);
				poly.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:900913'));
				return poly;
        	} else if(feature.geometry.type =="LineString"){
        		/*var points = [];
        		for(l = 0 ; l < feature.geometry.coordinates[0].length ; l++) {  
					var p = new ol.geom.Point(ol.proj.transform([Number(feature.geometry.coordinates[0][l][0]), Number(feature.geometry.coordinates[0][l][1])], 'EPSG:4326', 'EPSG:900913'));
					points.push(p.getCoordinates());
				}
				return new ol.geom.Polygon([points]);*/
				var poly = new ol.geom.LineString(feature.geometry.coordinates);
				poly.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:900913'));
				return poly;
        	} else if(feature.geometry.type =="MultiLineString"){
        		/*var points = [];
        		for(l = 0 ; l < feature.geometry.coordinates[0].length ; l++) {  
					var p = new ol.geom.Point(ol.proj.transform([Number(feature.geometry.coordinates[0][l][0]), Number(feature.geometry.coordinates[0][l][1])], 'EPSG:4326', 'EPSG:900913'));
					points.push(p.getCoordinates());
				}
				return new ol.geom.Polygon([points]);*/
				var poly = new ol.geom.MultiLineString(feature.geometry.coordinates);
				poly.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:900913'));
				return poly;
        	}

		};
		/*var duration = 3000;
		function flash(feature) {
			var start = new Date().getTime();
			var listenerKey;
			function animate(event) {
          		var vectorContext = event.vectorContext;
		          var frameState = event.frameState;
		          var flashGeom = feature.getGeometry().clone();
		          flashGeom.translate(0,  100);
		          var elapsed = frameState.time - start;
		          var elapsedRatio = elapsed / duration;
		          // radius will be 5 at start and 30 at end.
		          var radius = ol.easing.easeOut(elapsedRatio) * 25 + 5;
		          var opacity = ol.easing.easeOut(1 - elapsedRatio);

		          var style = new ol.style.Style({
		            image: new ol.style.Circle({
		              radius: radius,
		              snapToPixel: false,
		              stroke: new ol.style.Stroke({
		                color: 'rgba(255, 0, 0, ' + opacity + ')',
		                width: 0.25 + opacity
		              })
		            })
		          });

		          //vectorContext.setStyle(style_circle(feature));
		          vectorContext.drawGeometry(flashGeom);
		          if (elapsed > duration) {
		            ol.Observable.unByKey(listenerKey);
		            return;
		          }
	          	// tell OpenLayers to continue postcompose animation
	          	globalMap.render();
	        }
			listenerKey = globalMap.on('postcompose', animate);
		}*/
		
	
		var source_circles = new ol.source.Vector({
			features: circle_feature
		});
		/*source_circles.on('addfeature', function(e) {
			flash(e.feature);
		});*/
		var layer = new ol.layer.Vector({
			source: source_circles,
			opacity: 0.8,
			name: key

		});
		if(globalMap.getLayers().getArray())
		globalMap.removeLayer(globalMap.getLayers().getArray()[1]);
		globalMap.addLayer(layer);

		featuresArray.forEach(function(d, i) {

			var circle = new ol.Feature({
	            geometry: render_geom(d),
	        	//name: d,
	        	data: d
			});

			
			circle.setStyle(style_circle(circle));
			//circle_feature.push(circle);
			source_circles.addFeature(circle);
			 

		});
		/*function addFeature() {
	        source_circles.addFeature(circle_feature[0]);
	        circle_feature.shift();
		}

		window.setInterval(addFeature, 0.000001);*/
	} else {
		var layer = getLayerbyName(data);
		globalMap.removeLayer(layer);
		var captionPanel = $(".caption-list");
		captionPanel.html("");
	}
	
	
}

function analysePropertiesforMap(){
	allProperties = Object.keys(featuresArray[0].properties);

	etats = [];

	$.each(allProperties, function(i, v) {
		etats = [];
		$.each(featuresArray, function(index, value) {
			if(etats.length > 25) return false;
		    if ($.inArray(value.properties[v], etats) === -1) {
		        etats.push(value.properties[v]);
		    }
		});
		if(etats.length <= 20 && etats.length >1 && v.toLowerCase() != "gml_id" && v.toLowerCase() != "gid" && v.toLowerCase() != "objectid"){
			properties[v] = etats;
		}
		allProperties[v] = etats;
	});

	var dataPanel = $(".data-list");
	dataPanel.html("");
	var keys =  Object.keys(properties);
	for(i=0; i< keys.length; i++){
		dataPanel.append('<li class="data-item" name="'+ keys[i] +'">'+
							'<input type="radio" class="data-cb" name="selection" value="'+ keys[i] 
							+'" onclick="renderD3Layer(\''+ keys[i] +'\', this.checked)">'+
							'<span class="data-label">'+ keys[i] +'</span>'+
						'</li>');
	}
	
}

function analyseProperties(){
	allProperties = Object.keys(featuresArray[0]);

	etats = [];

	$.each(allProperties, function(i, v) {
		etats = [];
		$.each(featuresArray, function(index, value) {
			if(etats.length > 25) return false;
		    if ($.inArray(value[v], etats) === -1) {
		        etats.push(value[v]);
		    }
		});
		if((etats.length <= 20 && etats.length >1)/* || (etats.length == 1 && etats[0] != null)*/){
			properties[v] = etats;
		}
		allProperties[v] = etats;
	});

	
}

function getLayerbyName(name){
	var layers = globalMap.getLayers().getArray();
	for(i=0; i< layers.length; i++){
		if(layers[i].get('name') == name){
			return layers[i];
		}
		
		
	}
	return null;
}

function labelize(value){
	try{
		value = decodeURIComponent(escape(value));
	} catch(error){}
	return value;
}

function labelizeArray(value){
	var res = [];
	$.each(value, function(i, v) {
		try{
			v = decodeURIComponent(escape(v));
		} catch(error){}
		res.push(v);
	});
	
	return res;
}

function renderTextFeature(feature){
	var res = "<div class='tooltip-inner'>";
	var allProps = Object.keys(feature);
	$.each(allProps, function(i, v) {
		if(feature[v] != null){
			var label = feature[v];
			try{
				label = decodeURIComponent(escape(label));
			} catch(error){}
			res += "<span class='tooltip-key'>" + v + "</span>"+
			"  :  <span class='tooltip-value'>" + label + "</span><br>";
		}
		
	});
	res+="</div>";
	return res;
}

function tabulate(data) {
		table = d3.select('table');
		thead = table.append('thead');
		tbody = table.append('tbody');

		var obj;
		if(Array.isArray(data)){
			obj = data[0];
		} else {
			obj = data;
		}
		var max = 0;
		max = getKeysProfondeur(obj, 0, max);
		
		var i=0;
		parseKey(obj, i, max, "");

		$.each(data, function(i, row) {
			var rowHtml = tbody.append('tr');
			renderRowData(row, rowHtml);
		});
		
	  return table;
	}

function parseKey(object, level, max, parentKey){
	var res = 0;
	var tr = thead.selectAll("tr").filter(function (d, i) { return i === level;})[0];
	if(tr == null || tr.length == 0){
		thead.append('tr');
		//thead.insert('tr','tr')
	} 

	for(var key in object) {
	    //console.log(key);
	    var colres = 0
	    if(typeof object[key] != 'string'){
	    	if(Array.isArray(object[key])){
	    		if(object[key][0].length > 6){
	    			colres = 1;
	    		} else {
					colres = parseKey(object[key][0], level+1, max, ((parentKey!="")?parentKey+".":"")+ key);
	    		}
				
	    	} else {
	    		colres = parseKey(object[key], level+1, max, ((parentKey!="")?parentKey+".":"")+ key);
	    	}
	    	
	    } else {
	    	colres =1;
	    }
	    if(colres == 0) colres = 1;
	    res += colres;
	   

		if(level == 0){
			if(colres == 1){
				table.insert('col', 'thead');
				thead.selectAll("tr").filter(function (d, i) { return i === level;}).append('th').attr("colspan", colres).attr("rowspan", max-level).attr("key", key).attr("scope", "col").text(key);
			} else {
				table.insert('colgroup', 'thead').attr("span", colres);
				thead.selectAll("tr").filter(function (d, i) { return i === level;}).append('th').attr("colspan", colres).attr("key", key).attr("scope", "colgroup").text(key);
			}
		} else {
			if(colres == 1){
				thead.selectAll("tr").filter(function (d, i) { return i === level;}).append('th').attr("colspan", colres).attr("rowspan", max-level).attr("key", ((parentKey!="")?parentKey+".":"")+ key).attr("scope", "col").text(key);
			} else {
				thead.selectAll("tr").filter(function (d, i) { return i === level;}).append('th').attr("colspan", colres).attr("key", ((parentKey!="")?parentKey+".":"")+ key).attr("scope", "colgroup").text(key);
			}
			
		}
		

	}


	return res;
	}

function getKeysProfondeur(object, level, max) {
	if(level > max) max = level;
	for(var key in object) {
	 
	    if(typeof object[key] != 'string'){
	    	if(Array.isArray(object[key])){
	    		if(object[key][0].length < 6){
					max = getKeysProfondeur(object[key][0], level+1, max);
	    		}
				
	    	} else {
	    		max = getKeysProfondeur(object[key], level+1, max);
	    	}
	    	
	    }
	    
	}
	return max;
}

function renderRowData(object, tr) {
	var res = 0;
	for(var key in object) {
	  	var colres = 0
	    if(typeof object[key] != 'string'){
	    	if(Array.isArray(object[key])){
	    		if(key == "coordinates"){
					tr.append('td').text(object[key][0].toString().substring(0,20) + "...");
					colres = 1;
	    		} else {
	    			if(object[key][0].length > 6){
	    			colres = 1;
	    			try{
						tr.append('td').text(object[key][0].toString().substring(0,20) + "...");
	    			} catch(e){
	    				tr.append('td').text(object[key][0].toString());
	    			}
	    			
	    		} else {
					colres = renderRowData(object[key][0], tr);
	    		}
	    		}
	    		
				
				if(colres == 0) tr.append('td').text(object[key].toString());
	    	} else if(object[key] == null) {
	    		tr.append('td').text("null");
	    	} else if(Number.isFinite(object[key])) {
	    		tr.append('td').text(object[key]+"");
	    	} else {
	    		colres = renderRowData(object[key], tr);
	    	}
	    	
	    } else {
	    	colres = 1;
	    	var label = object[key];
			try{
				label = decodeURIComponent(escape(label));
			} catch(error){}
			
	    	tr.append('td').text(label);
	    }
	    res += colres;
	}
	return res;
}

function sortTable(elem) {
	var keys = elem.attr("key").split(".");
	var ord = elem.attr("order");
	if(ord != "asc"){
		ord = "asc";
	} else {
		ord = "desc";
	}

	var sortArray = featuresArray.map(function(d){ return d;});
	sortArray.sort(function(a,b){
		for(var i=0; i<keys.length; i++){
			a = a[keys[i]];
			b = b[keys[i]];
			if(a == null)
			{
				a = "NULL";
			}
			if(b == null)
			{
				b = "NULL";
			}
		}
		if(isNumeric(a) && isNumeric(b)){
			return a - b;
		} else if(Array.isArray(a) && Array.isArray(b)){
			a = JSON.stringify(a);
			b = JSON.stringify(b);
			if (a.toLowerCase() < b.toLowerCase()) return -1;
		    if (a.toLowerCase() > b.toLowerCase()) return 1;
		    return 0;
		} else {
			if (a.toLowerCase() < b.toLowerCase()) return -1;
		    if (a.toLowerCase() > b.toLowerCase()) return 1;
		    return 0;
		}
	});

	if(ord == "desc"){
		sortArray.reverse();
	} 
	var data = sortArray.slice(0,100);
	tbody = table.select('tbody');
	tbody.html("");

	$.each(data, function(i, row) {
		var rowHtml = tbody.append('tr');
		renderRowData(row, rowHtml);
	});

	$("#table th").attr("order", "");
	elem.attr("order", ord);
}

function previzMap(){
	var body=d3.select("body");
	var svg=body.append("svg");
	svg.attr({"width":"600px","height":"600px"});
	var path = d3.geo.path();
	var projection = d3.geo.conicConformal()
	    .center([2.454071, 46.279229])
	    .scale(5000)
	    .translate([300,300]);
	path.projection(projection);
	var key = selectTypeKey();
	svg.selectAll("path").data(featuresArray.slice(0, 100))
			.enter()
	        .append("path")
	        .attr("fill",function(d){  if(key == null){ 
	        	return color(0); 
	        } else {
	         return color(properties[key].indexOf(d.properties[key])); 
	     } })
	        .attr("stroke","transparent")
	        .attr("d", path);
	
	/*var tile = d3.geo.tile()
    .scale(projection.scale() * 2 * Math.PI)
    .translate(projection([0, 0]))
    .zoomDelta((window.devicePixelRatio || 1) - .5);

    var tiles = tile();
     var defs = svg.append("defs");
     var bounds = d3.geoBounds(features);
var rect = [bounds[0], [bounds[0][0], bounds[1][1]], [bounds[1][0], bounds[0][1]], bounds[1]];
  defs.append("path")
      .attr("id", "land")
      .datum({type: "FeatureCollection", features: [{type: "Feature", properties: {}, geometry: {type: "Polygon", coordinates: rect}}]})
      .attr("d", path);

  defs.append("clipPath")
      .attr("id", "clip")
    .append("use")
      .attr("xlink:href", "#land");
    svg.append("g").attr("clip-path", "url(#clip)")
    .selectAll("image")
      .data(tiles)
    .enter().append("image").attr("xlink:href", function(d) { return "http://" + ["a", "b", "c", "d"][Math.random() * 4 | 0] + ".tiles.mapbox.com/v3/mapbox.natural-earth-2/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
      .attr("width", Math.round(tiles.scale))
      .attr("height", Math.round(tiles.scale))
      .attr("x", function(d) { return Math.round((d[0] + tiles.translate[0]) * tiles.scale); })
      .attr("y", function(d) { return Math.round((d[1] + tiles.translate[1]) * tiles.scale); });*/
}

function selectTypeKey(){
	var pattern = /((?:_|\b)type(?:_|\b))/;
	var key;
	$.each(Object.keys(properties), function(i, v) {
		if(v.match(pattern)){
			key = v;
			return false;
		}
	});
	return key;
}



function createBarChart(){
	

	svg = d3.select("svg.chart"),
    margin = {top: 20, right: 20, bottom: 40, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
 
	x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
	y = d3.scaleLinear().rangeRound([height, 0]);
	//z = d3.

	svg.html("");
	g = svg.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	g.append("g")
			  .attr("class", "axis axis--x")
			  .attr("transform", "translate(0," + height + ")")
			  .append("text")
				.attr("y", -20)
				.attr("x", width)
				.attr("dy", "0.71em")
				.attr("text-anchor", "end")
				.attr("fill", "#000")
				.attr("font-size", "15px")
				.attr("class", "axis--x xlabel");

	g.append("g")
	.attr("class", "axis axis--y")
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", "0.71em")
	.attr("text-anchor", "end")
	.attr("fill", "#000")
	.attr("font-size", "15px")
	.attr("class", "axis--y ylabel");

	var today = new Date();
	svg.append("text")      // text label for the x axis
        .attr("x", width / 2 + 40 )
        .attr("y",  10 )
        .style("text-anchor", "middle")
        .attr("font-family","'Helvetica Neue',Helvetica,Arial,sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .text($('#datasetTitle').text());

	svg.append("text")      // text label bottom of chart
        .attr("x", width / 2 + 40 )
        .attr("y", height + 55 )
        .style("text-anchor", "middle")
        .attr("font-family","'Helvetica Neue',Helvetica,Arial,sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .text("Source : " + $('.well ul:first li:nth-child(2)').text() + " - Date : " + today.getDate() + "/"+ (today.getMonth()+1) + "/"+ today.getFullYear());

		
	
	tooltip = d3.select("body").append("div").attr("class", "toolTip");
}

function renderBarChart(type, xdata, ytype, ydata){
	


	getFirstKey = function(d){
		if(formData == "GeoJSON" || formData == "SHP"){
			return Object.keys(d.properties)[0];
		} else {
			return Object.keys(d)[0];
		}
	}

	renderTooltip = function(d, display){
		if(!display){
			tooltip.style("display", "none");
			return;
		}
		if(type == "repartition"){
			if(ytype == "count"){
				tooltip
	              .style("left", d3.event.pageX - 50 + "px")
	              .style("top", d3.event.pageY - 100 + "px")
	              .style("display", "inline-block")
	              .html(function(){ var c = getCount(xxx, d); return c + "<br>(" + (c/featuresArray.length*100).toFixed(2) + "%)";});
			} else {
				tooltip
	              .style("left", d3.event.pageX - 50 + "px")
	              .style("top", d3.event.pageY - 100 + "px")
	              .style("display", "inline-block")
	              .html(function(){ return getSum(xxx, d, yyy); });
			}
		} else {
			tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 100 + "px")
              .style("display", "inline-block")
              .html(function(){ return getData(d, yyy);});
		}
	}

	renderColor = function(d){
		if(type == "repartition"){
			if(ytype == "count"){
				return color(properties[xdata].indexOf(d));
			} else {
				return color(properties[xdata].indexOf(d));
			}
		} else {
			return color(allProperties[ydata].indexOf(getData(d, ydata)));
		}
	}

    
	xxx = xdata;
	yyy = ydata;
	if(type == "repartition"){
		if(xdata == null) return;
		//var data = featuresArray;
		

		if(ytype == "count"){
			var data = properties[xdata];
			var _data = labelizeArray(data);
			x.domain(_data);
			var max = d3.max(data, function(d) { return getCount(xdata, d); });
		  	y.domain([0, max]);

			
			g.select('.axis--x').transition().duration(300).call(d3.axisBottom(x));

			g.select(".axis--y").transition().duration(300).call(d3.axisLeft(y).ticks(5, "s"))

			var bars = g.selectAll(".bar").data(data) ;
			bars.exit()
				.transition()
				  .duration(300)
				.attr("y", y(0))
				.attr("height", height - y(0))
				.style('fill-opacity', 1e-6)
				.remove();

			bars.enter().append("rect")
		     	.attr("class", "bar")
		  		.attr("y", y(0))
    			.attr("height", height - y(0))
			  	.attr("fill", function(d){  return renderColor(d);  })
			  	
			  	.on("mousemove", function(d){
		            renderTooltip(d, true);
		        })
    			.on("mouseout", function(d){ renderTooltip(d, false);});

			  
			bars.transition().duration(300).attr("x", function(d) { return x(labelize(d)); }) 
			    .attr("width", x.bandwidth())
			    .attr("y", function(d) { return y(getCount(xdata, d)); })
			    .attr("fill", function(d){  return renderColor(d);  })
			    .attr("height", function(d) { return height - y(getCount(xdata, d)); });

			
		} else {
			if(ydata == null) return;

			var data = properties[xdata];
			var _data = labelizeArray(data);
			x.domain(_data);
		  	y.domain([0, d3.max(data, function(d) { return getSum(xdata, d, ydata); })]);

			g.select('.axis--x').transition().duration(300).call(d3.axisBottom(x));

			g.select(".axis--y").transition().duration(300).call(d3.axisLeft(y).ticks(5, "s"));

			var bars = g.selectAll(".bar").data(data) ;
			bars.exit()
				.transition()
				  .duration(300)
				.attr("y", y(0))
				.attr("height", height - y(0))
				.style('fill-opacity', 1e-6)
				.remove();

			bars.enter().append("rect")
		     	.attr("class", "bar")
		  		.attr("y", y(0))
    			.attr("height", height - y(0))
			  
			  	.attr("fill", function(d){  return renderColor(d);  })
			  	.on("mousemove", function(d){
		             renderTooltip(d, true);
		        })
    		.on("mouseout", function(d){ renderTooltip(d, false);});

			  
			bars.transition().duration(300)
				.attr("x", function(d) { return x(labelize(d)); })
			  	.attr("y", function(d) { return y(getSum(xdata, d, ydata)); })
			  	.attr("fill", function(d){  return renderColor(d);  })
			    .attr("width", x.bandwidth())
			    .attr("height", function(d) { return height - y(getSum(xdata, d, ydata)); });

			
		}
	} else {
		if(ydata == null) return;

		var data = featuresArray.slice(0,20);
		x.domain(data.map(function(d) { return getData(d, getFirstKey(d));}));
	  	y.domain([0, d3.max(data, function(d) {  var res = getData(d, ydata); 
		    	if(res != null) { return +(getData(d, ydata).toString().replace(",",".")); }
		    	else { return 0}})]);

		g.select('.axis--x').transition().duration(300).call(d3.axisBottom(x));

		g.select(".axis--y").transition().duration(300).call(d3.axisLeft(y).ticks(5, "s"));

		var bars = g.selectAll(".bar").data(data) ;
		bars.exit()
			.transition()
			  .duration(300)
			.attr("y", y(0))
			.attr("height", height - y(0))
			.style('fill-opacity', 1e-6)
			.remove();

		bars.enter().append("rect")
	     	.attr("class", "bar")
	  		.attr("y", y(0))
			.attr("height", height - y(0))
		  	.attr("fill", function(d){  return renderColor(d);  })
		  	
		  	.on("mousemove", function(d){
		             renderTooltip(d, true);
		        })
    		.on("mouseout", function(d){ renderTooltip(d, false);});

		  
		bars.transition().duration(300)
			.attr("x", function(d) { return x(getData(d, getFirstKey(d))); })
		  	.attr("y", function(d) { var res = +(getData(d, ydata).toString().replace(",",".")); 
		    	if(res != null) {
		    		return y(res); }
		    	else { return  y(0)} })
		    .attr("width", x.bandwidth())
		    .attr("fill", function(d){  return renderColor(d);  })
		    .attr("height", function(d) { var res = +(getData(d, ydata).toString().replace(",",".")); 
		    	if(res != null) {
		    		return height - y(res); }
		    	else { return height - y(0)}});

		/*g.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		  .attr("class", "bar")
		  .attr("x", function(d) { return x(getData(d, getFirstKey(d))); })
		  .attr("y", function(d) { return y(getData(d, ydata)); })
		  .attr("fill", function(d){  return color(allProperties[ydata].indexOf(getData(d, ydata)));  })
		  .attr("width", x.bandwidth())
		  .attr("height", function(d) { return height - y(getData(d, ydata)); })
			  .on("mousemove", function(d){
		            tooltip
		              .style("left", d3.event.pageX - 50 + "px")
		              .style("top", d3.event.pageY - 70 + "px")
		              .style("display", "inline-block")
		              .html(function(){ getData(d, ydata);});
		        })
    		.on("mouseout", function(d){ tooltip.style("display", "none");});*/

	}
	setTimeout(function(){ g.select('.axis--x').selectAll(".tick text")
      .call(wrap, x.bandwidth());
  }, 200);

	
      d3.select('#saveButton').on('click', function(){
		
      		exportSVG();
		
	});
}

function getUrl(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}

function onChangeChart(){
	var select = $("#choice-chart-select");
	if(select.val() == "bar"){
		createBarChart();
		onChangeType();
		onChangeX();
		onChangeX(); //hack 2x pour initialisation

	} else if(select.val() == "stack"){
		createBarChart();
		onChangeType();
		if($(".y-list input[name=y-list]:checked").get().length == 0){
			onCheckAll(true);
		} else {
			onCheckY(null);
		}
		
		//renderStackBarChart("valeur", "", $( "#choice-y-select option" ).map(function() {  return $( this ).val();  }));

	} else if(select.val() == "pie"){
		createPieChart();
		onChangeType();
		onChangeYType()
		onChangeX();
		onChangeX();
		//renderPieChart("repartition", "statut_nom", "count", "");

	} else if(select.val() == "treemap"){
		createTreeMapChart();
		$("#choice-x").hide();
		$("#choice-y-type").hide();
		$("#choice-y").hide();
		$("#check-y").hide();
		//todo
	} else if(select.val() == "line"){
		createLineChart();
		$("#choice-type-select").hide();
		$("#choice-x").hide();
		$("#choice-x2").show();
		$("#choice-y-type").hide();
		$("#choice-y").show();
		$("#check-y").hide();
		onChangeX2();
	}
}

function onChangeType(){
	var select = $("#choice-type-select");
	if(select.val() == "repartition"){
		if($("#choice-chart-select").val() == "stack"){
			$("#choice-x").show();
			$("#choice-y-type").hide();
			$("#choice-y").hide();
			$("#choice-x2").hide();
			$("#check-y").show();
		} else {
			$("#choice-x").show();
			$("#choice-y-type").show();
			$("#choice-y").hide();
			$("#check-y").hide();
			$("#choice-x2").hide();
		}
		

	} else {
		$("#choice-x").hide();
		$("#choice-y-type").hide();
		if($("#choice-chart-select").val() == "stack"){
			$("#choice-y").hide();
			$("#check-y").show();
		} else {
			$("#choice-y").show();
			$("#check-y").hide();
		}
		$("#choice-x2").hide();
	}
}
function onChangeX(){
	//var select = $("#choice-x-select");
	if($("#choice-chart-select").val() == "bar"){
		renderBarChart($("#choice-type-select").val(), $("#choice-x-select").val(), $("#choice-y-type-select").val(), $("#choice-y-select").val());
	} else if($("#choice-chart-select").val() == "stack"){
		renderStackBarChart($("#choice-type-select").val(), $("#choice-x-select").val(), $(".y-list input[name=y-list]:checked").map(function() {  return $( this ).val();  }));
	} else if($("#choice-chart-select").val() == "pie"){
		renderPieChart($("#choice-type-select").val(), $("#choice-x-select").val(), $("#choice-y-type-select").val(), $("#choice-y-select").val());
	}
	
}
function onChangeX2(){
	renderLineChart($("#choice-x2-select").val(), $("#choice-y-select").val());
}
function onChangeYType(){
	var select = $("#choice-y-type-select");
	if(select.val() == "count"){
		$("#choice-y").hide();

	} else {
		$("#choice-y").show();
	}
}
function onChangeY(){
	//var select = $("#choice-y-select");
	if($("#choice-chart-select").val() == "bar"){
		renderBarChart($("#choice-type-select").val(), $("#choice-x-select").val(), $("#choice-y-type-select").val(), $("#choice-y-select").val());
	} else if($("#choice-chart-select").val() == "pie"){
		renderPieChart($("#choice-type-select").val(), $("#choice-x-select").val(), $("#choice-y-type-select").val(), $("#choice-y-select").val());
	} else if($("#choice-chart-select").val() == "line"){
		renderLineChart($("#choice-x2-select").val(), $("#choice-y-select").val());
	}
}
function onCheckAll(checked){
	if(checked){
		$(".y-list input[name=y-list]").prop("checked", true);
	} else {
		$(".y-list input[name=y-list]").prop('checked', false);
	}
	renderStackBarChart($("#choice-type-select").val(), $("#choice-x-select").val(), $(".y-list input[name=y-list]:checked").map(function() {  return $( this ).val();  }));
}
function onCheckY(e){
	//console.log(e.checked);
	//console.log($(".y-list input[name=y-list]:checked").map(function() {  return $( this ).val();  }));
	renderStackBarChart($("#choice-type-select").val(), $("#choice-x-select").val(), $(".y-list input[name=y-list]:checked").map(function() {  return $( this ).val();  }));
}

function fillChoices(){
	for(var key in allProperties) {
		if(allProperties[key][0] != null){
			if(isNumeric(allProperties[key][0])) {
				$("#choice-y-select").append($('<option>', {  value: key, text: key}));
				$(".y-list").append('<li class="y-item">'+
							'<input type="checkbox" class="choice-cb" name="y-list" value="'+ key 
							+'" onclick="onCheckY(this)">'+
							'<span class="choice-label">'+ key +'</span>'+
						'</li>');
				$("#choice-x2-select").append($('<option>', {  value: key, text: key}));
			} else {
				if(properties.hasOwnProperty(key)){
					$("#choice-x-select").append($('<option>', {  value: key, text: key}));
				}
			}
		} else {
			if(allProperties[key].length > 1 && isNumeric(allProperties[key][1])) {
				$("#choice-y-select").append($('<option>', {  value: key, text: key}));
				$("#choice-x2-select").append($('<option>', {  value: key, text: key}));
			} else {
				if(properties.hasOwnProperty(key)){
					$("#choice-x-select").append($('<option>', {  value: key, text: key}));
				}
			}
		}
	}

	var request = new Object();
		var data = new Object();
		
		request.action = "get";
		data.id = id_dataset;
		request.data = data;
		
		$.ajax({
			type : "POST",
		    dataType : "json",
		    url : "../Admin_preset.php", 
			data : request,
			success : function(response){
				if(response){
					$("#choice-chart-select").val(response.chart);
					$("#choice-type-select").val(response.type);
					$("#choice-x-select").val(response.x);
					$("#choice-y-select").val(response.y);
					$("#choice-y-type-select").val(response.yType);
					$("#choice-x2-select").val(response.x2);
					var yList = JSON.parse(response.yList);
					$(".y-list input[name=y-list]").prop("checked", false);
					for(var i=0; i<yList.length; i++){
						$(".y-list input[name=y-list][value="+yList[i]+"]").prop("checked", true);
					}
					onChangeChart();
				}
				

				
			},
			error : function(e){
				console.log(e);
			}
		});		
}
function isNumeric(n) {
  return !isNaN(+(n.toString().replace(",","."))) && isFinite(n);
}

function getData(d, c){
	if(formData == "GeoJSON" || formData == "SHP"){
		return d.properties[c];
	} else {
		return d[c];
	}
}

function getCount(key, value){
	count = featuresArray.filter(function (d, i) { return getData(d, key) === value}).length;
	return count;
}

function getSum(xkey, value, ykey){
	var filtered = featuresArray.filter(function (d, i) { return getData(d, xkey) === value});
	var count = 0;
	$.each(filtered, function(i, v) {
		var res = getData(v, ykey);
		if(res != null && !isNaN(+(res.toString().replace(",",".")))){
			count += +(res.toString().replace(",","."));
		} else {
			count += 0;
		}
		
		
	});
	return count;
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

function renderStackBarChart(type, xdata, ydatas){
	


	getFirstKey = function(d){
		if(formData == "GeoJSON" || formData == "SHP"){
			return Object.keys(d.properties)[0];
		} else {
			return Object.keys(d)[0];
		}
	}

	renderTooltip = function(d, elem, display){
		if(!display){
			tooltip.style("display", "none");
			return;
		}
		if(type == "repartition"){
			
			tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 100 + "px")
              .style("display", "inline-block")
              .html(function(){ return elem.parentElement.getAttribute("data") + ":<br>" + (d[1]-d[0]); });
			
		} else {
			tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 100 + "px")
              .style("display", "inline-block")
              .html(function(){ return elem.parentElement.getAttribute("data") + ":<br>" + (d[1]-d[0]);});
		}
	}

	renderColor = function(d){
		if(type == "repartition"){
			
			return color(properties[xdata].indexOf(d));
			
		} else {
			return color(allProperties[ydata].indexOf(getData(d, ydata)));
		}
	}

    
	xxx = xdata;
	//yyy = ydata;
	if(type == "repartition"){
		if(xdata == null) return;
		//var data = featuresArray;
		

		if(ydatas == null) return;

			
			var data = properties[xdata].map(function(d){
				var count = 0;
				var res = [];
				res.name = labelize(d);
				$.each(ydatas, function(i, v) {
					var sum = getSum(xdata, d, v);
					res[v] = sum;
					if(sum != null){
						count += +sum;
					} else {
						count += 0;
					}
				});
	  			res.total = count;
				return res;
			});

			data.sort(function(a, b) { return b.total - a.total; });
			var _data = labelizeArray(data.map(function(d){return d.name}));
			x.domain(_data);
			y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
			color.domain(ydatas);

			g.select('.axis--x').transition().duration(300).call(d3.axisBottom(x));

			g.select(".axis--y").transition().duration(300).call(d3.axisLeft(y).ticks(5, "s"));

			var rows = g.selectAll(".rowbar").data(d3.stack().keys(ydatas)(data)) ;
 
			rows.exit()
			.transition().duration(300)
			.style('fill-opacity', 1e-6)
				.remove();

			bars = rows.enter().append("g")
			.attr("class", "rowbar")
			.attr("data", function(d) { return d.key; })
	      	.attr("fill", function(d) { return color(d.key); }).
	      	selectAll("rect").data(function(d) { return d; });

	      	rows
	    	.attr("fill", function(d){  return color(d.key);  });

	      	// rows.selectAll("rect").data(function(d) { return d; });

			bars.exit()
				.transition()
				  .duration(300)
				.attr("y", y(0))
				.attr("height", height - y(0))
				.remove();

			bars.enter().append("rect")
		     	.attr("class", "bar")
		  		.attr("y", function(d) { return y(d[1]); })
				.attr("height", function(d) { return y(d[0]) - y(d[1]);})
				.attr("width", x.bandwidth())
			  	.attr("x", function(d) { return x(d.data.name); })
			  	.on("mousemove", function(d){
			             renderTooltip(d, this, true);
			        })
	    		.on("mouseout", function(d){ renderTooltip("", "", false);});

	    	

	    	bars2 = rows.
	      	selectAll("rect").data(function(d) { return d; }).attr("y", function(d) { return y(d[1]); });

			bars2.exit()
				.transition()
				  .duration(100)
				.attr("y", y(0))
				.attr("height", height - y(0))
				.remove();
			bars2.enter().append("rect")
		     	.attr("class", "bar")
		  		.attr("y", function(d) { return y(d[1]); })
				.attr("height", function(d) { return y(d[0]) - y(d[1]);})
				.attr("width", x.bandwidth())
			  	.attr("x", function(d) { return x(d.data.name); })
			  	.on("mousemove", function(d){
			             renderTooltip(d, this, true);
			        })
	    		.on("mouseout", function(d){ renderTooltip("", "", false);});
	      	bars2.transition().duration(100)
	      	.attr("y", function(d) { return y(d[1]); })
			.attr("height", function(d) { return y(d[0]) - y(d[1]);}).attr("width", x.bandwidth())
			  	.attr("x", function(d) { return x(d.data.name); });
			
	} else {
		if(ydatas == null) return;

		var data = featuresArray.slice(0,20).map(function(d){
			var count = 0;
			$.each(ydatas, function(i, v) {
				if(getData(d, v) != null){
					var value = +(getData(d, v).toString().replace(",","."));
					if(formData == "GeoJSON" || formData == "SHP"){
						d.properties[v] = value;
					} else {
						d[v] = value;
					}
					count += value;
				} else {
					count += 0;
				}
			});
  			d.total = count;
			return d;
		});

		data.sort(function(a, b) { return b.total - a.total; });
		x.domain(data.map(function(d) { return getData(d, getFirstKey(d));}));
		y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
		color.domain(ydatas);

		g.select('.axis--x').transition().duration(300).call(d3.axisBottom(x));

		g.select(".axis--y").transition().duration(300).call(d3.axisLeft(y).ticks(5, "s"));

		var rows = g.selectAll(".rowbar").data(d3.stack().keys(ydatas)(data.map(function(d){ if(formData == "GeoJSON" || formData == "SHP"){
																												return d.properties;
																											} else {
																												return d;
																											}}))) ;

		rows.exit()
		.transition().duration(300)
		.style('fill-opacity', 1e-6)
			.remove();

		bars = rows.enter().append("g")
		.attr("class", "rowbar")
		.attr("data", function(d) { return d.key; })
      	.attr("fill", function(d) { return color(d.key); }).
      	selectAll("rect").data(function(d) { return d; });

      	// rows.selectAll("rect").data(function(d) { return d; });

		bars.exit()
			.transition()
			  .duration(300)
			.attr("y", y(0))
			.attr("height", height - y(0))
			.remove();

		bars.enter().append("rect")
	     	.attr("class", "bar")
	  		.attr("y", function(d) { return y(d[1]); })
			.attr("height", function(d) { return y(d[0]) - y(d[1]);})
			.attr("width", x.bandwidth())
		  	.attr("x", function(d) { return x(d.data[Object.keys(d.data)[0]]); })
		  	.on("mousemove", function(d){
		             renderTooltip(d, this, true);
		        })
    		.on("mouseout", function(d){ renderTooltip("", "", false);});

    	rows.transition().duration(300)
    	.attr("fill", function(d){  return color(d.key);  });

    	bars2 = rows.
	      	selectAll("rect").data(function(d) { return d; }).attr("y", function(d) { return y(d[1]); });

		bars2.exit()
			.transition()
			  .duration(100)
			.attr("y", y(0))
			.attr("height", height - y(0))
			.remove();
		bars2.enter().append("rect")
	     	.attr("class", "bar")
	  		.attr("y", function(d) { return y(d[1]); })
			.attr("height", function(d) { return y(d[0]) - y(d[1]);})
			.attr("width", x.bandwidth())
		  	.attr("x", function(d) { return x(d.data[Object.keys(d.data)[0]]); })
		  	.on("mousemove", function(d){
		             renderTooltip(d, this, true);
		        })
    		.on("mouseout", function(d){ renderTooltip("", "", false);});
      	bars2.transition().duration(100)
      	.attr("y", function(d) { return y(d[1]); })
		.attr("height", function(d) { return y(d[0]) - y(d[1]);}).attr("width", x.bandwidth())
		  	.attr("x", function(d) { return x(d.data[Object.keys(d.data)[0]]); });

	}
	setTimeout(function(){ g.select('.axis--x').selectAll(".tick text")
      .call(wrap, x.bandwidth());
  }, 200);

	d3.select('#saveButton').on('click', function(){
		
			var legendRectSize = 18;
			var legendSpacing = 4;
			var keydata;
			if(type == "repartition"){
				keydata = d3.stack().keys(ydatas)(data)
			} else {
				keydata = d3.stack().keys(ydatas)(data.map(function(d){ if(formData == "GeoJSON" || formData == "SHP"){
																												return d.properties;
																											} else {
																												return d;
																											}}));
			}
			
			var legend = g.append("g")
				.attr("class", "legend")
				.attr("font-family", "sans-serif")
		      	.attr("font-size", 10)
		      	.attr("text-anchor", "end")
		      	.selectAll("g").data(ydatas).enter().append("g")
      			.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

		

			  legend.append("rect")
			      .attr("x", width - 19)
			      .attr("width", 19)
			      .attr("height", 19)
			      .attr("fill", function(d) { return color(d); });

			  legend.append("text")
			      .attr("x", width - 24)
			      .attr("y", 9.5)
			      .attr("dy", "0.32em")
			      .text(function(d) { return labelize(d); });


      		exportSVG();
			g.selectAll(".legend").remove();
      		
		
	});
}

function createPieChart(){
	

	svg = d3.select("svg.chart"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2;
    svg.html("");
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


	/*var pie = d3.pie()
	    .sort(null)
	    .value(function(d) { return d.population; });*/

	path = d3.arc()
	    .outerRadius(radius - 20)
	    .innerRadius(radius - radius/2);

	/*label = d3.arc()
	    .outerRadius(radius - 60)
	    .innerRadius(radius - 60);*/

	var today = new Date();
	svg.append("text")      // text label for the x axis
        .attr("x", width / 2 + 40 )
        .attr("y",  10 )
        .style("text-anchor", "middle")
        .attr("font-family","'Helvetica Neue',Helvetica,Arial,sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .text($('#datasetTitle').text());

	svg.append("text")      // text label bottom of chart
        .attr("x", width / 2 + 40 )
        .attr("y", height )
        .style("text-anchor", "middle")
        .attr("font-family","'Helvetica Neue',Helvetica,Arial,sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .text("Source : " + $('.well ul:first li:nth-child(2)').text() + " - Date : " + today.getDate() + "/"+ (today.getMonth()+1) + "/"+ today.getFullYear());
	
	tooltip = d3.select("body").append("div").attr("class", "toolTip");
}


function renderPieChart(type, xdata, ytype, ydata){
	var data;
	var total;

	getFirstKey = function(d){
		if(formData == "GeoJSON" || formData == "SHP"){
			return Object.keys(d.properties)[0];
		} else {
			return Object.keys(d)[0];
		}
	}

	renderTooltip = function(d, display){
		if(display == "none"){
			tooltip.style("display", "none");
			return ;
		}
		if(type == "repartition"){
			var res;
			if(ytype == "count"){
				var c = getCount(xxx, d); 
				res = labelize(d) + "<br>" + c + "<br>(" + (c/total*100).toFixed(2) + "%)";
			} else {
				var c = +getSum(xxx, d, yyy); 
				res =  labelize(d) + "<br>" + c + "<br>(" + (c/total*100).toFixed(2) + "%)";
			}
		} else {
			var c = +(getData(d, yyy).toString().replace(",",".")); 
			res =  labelize(getData(d,getFirstKey(d))) + "<br>" + c + "<br>(" + (c/total*100).toFixed(2) + "%)";
		}
		if(display == "print"){
			tooltip.style("display", "none");
			return res.replace(/<br>/g, " - ");
		} else {
			tooltip
	              .style("left", d3.event.pageX - 50 + "px")
	              .style("top", d3.event.pageY - 120 + "px")
	              .style("display", "inline-block")
	              .html(function(){ return res;});
		}
	}

	renderColor = function(d){
		if(type == "repartition"){
			if(ytype == "count"){
				return color(properties[xdata].indexOf(d));
			} else {
				return color(properties[xdata].indexOf(d));
			}
		} else {
			return color(allProperties[ydata].indexOf(getData(d, ydata)));
		}
	}

	Number.prototype.mod = function(n) {
		var m = (this - ( this % n))/n + 1;
		return m ;
	};

    
	xxx = xdata;
	yyy = ydata;
	if(type == "repartition"){
		if(xdata == null) return;
		//var data = featuresArray;
		

		if(ytype == "count"){
			data = properties[xdata];
			total = d3.sum(data.map(function(d){return getCount(xdata, d);}));

			var pie = d3.pie()
			    .sort(null)
			    .value(function(d) { return getCount(xdata, d); });
			
			var arc = g.selectAll(".arc").data(pie(data));
			arc.exit()
				.transition()
				  .duration(300)
				.style('fill-opacity', 1e-6)
				.remove();

			arc.enter().append("path")
			      .attr("class", "arc")
			      .attr("d", path).each(function(d) { this._current = d; })
			      .attr("fill", function(d) { return renderColor(d.data); })
			  	
			  	.on("mousemove", function(d){
		            renderTooltip(d.data, "display");
		        })
    			.on("mouseout", function(d){ renderTooltip(d.data, "none");});

			arc.transition().duration(300)
				.attrTween("d", arcTween);

			function arcTween(a) {
				var i = d3.interpolate(this._current, a);
				this._current = i(0);
				return function(t) {
					return path(i(t));
				};
			}
			

 			
			
		} else {
			if(ydata == null) return;

			data = properties[xdata];


			var pie = d3.pie()
			    .sort(null)
			    .value(function(d) { return getSum(xdata, d, ydata); });
			
			var arc = g.selectAll(".arc").data(pie(data));
			arc.exit()
				.transition()
				  .duration(300)
				.style('fill-opacity', 1e-6)
				.remove();

			arc.enter().append("path")
			      .attr("class", "arc")
			      .attr("d", path).each(function(d) { this._current = d; })
			      .attr("fill", function(d) { return renderColor(d.data); })
			  	
			  	.on("mousemove", function(d){
		            renderTooltip(d.data, "display");
		        })
    			.on("mouseout", function(d){ renderTooltip(d.data, "none");});

			arc.transition().duration(300)
				.attrTween("d", arcTween);

			function arcTween(a) {
				var i = d3.interpolate(this._current, a);
				this._current = i(0);
				return function(t) {
					return path(i(t));
				};
			}
			total = d3.sum(data.map(function(d){return getSum(xdata, d, ydata);}));
		}
	} else {
		if(ydata == null) return;

		data = featuresArray.slice(0,20);

		var pie = d3.pie()
			    .sort(null)
			    .value(function(d) { var res = getData(d, ydata); 
		    	if(res != null) { return +(getData(d, ydata).toString().replace(",",".")); }
		    	else { return 0;}});
			
			var arc = g.selectAll(".arc").data(pie(data));
			arc.exit()
				.transition()
				  .duration(300)
				.style('fill-opacity', 1e-6)
				.remove();

			arc.enter().append("path")
			      .attr("class", "arc")
			      .attr("d", path).each(function(d) { this._current = d; })
			      
			  	
			  	.on("mousemove", function(d){
		            renderTooltip(d.data, "display");
		        })
    			.on("mouseout", function(d){ renderTooltip(d.data, "none");});

			arc.transition().duration(300)
				.attrTween("d", arcTween).attr("fill", function(d) { return renderColor(d.data); });

			function arcTween(a) {
				var i = d3.interpolate(this._current, a);
				this._current = i(0);
				return function(t) {
					return path(i(t));
				};
			}
			total = d3.sum(data.map(function(d){var res = getData(d, ydata); 
		    	if(res != null) { return +(getData(d, ydata).toString().replace(",",".")); }
		    	else { return 0;}}));
	}

	d3.select('#saveButton').on('click', function(){
		
			var legendRectSize = 18;
			var legendSpacing = 4;
			var count = pie(data).length;
			legendRectSize = legendRectSize / parseInt(count).mod(7);
			legendSpacing = legendSpacing - (parseInt(count).mod(7)-1) ;


			var legend = g.selectAll(".legend").data(pie(data)).enter().append("g")
			.attr("class", "legend")
      		.attr('transform', function(d, i) {
			    var height = legendRectSize + legendSpacing;
			    var offset =  height * count / 2;
			    var horz = -90;
			    var vert = i * height - offset;
			    return 'translate(' + horz + ',' + vert + ')';
			  });


			legend.append('rect')
			  .attr('width', legendRectSize)
			  .attr('height', legendRectSize)
			 
			  .style('fill', function(d) { return renderColor(d.data); });

			legend.append('text')
			  .attr('x', legendRectSize + legendSpacing)
			  .attr('y', legendRectSize - legendSpacing)
			  .style('font-size', "11px")
			  .attr("fill", "#888")
			  .text(function(d) { return renderTooltip(d.data, "print"); });


      		exportSVG();
			g.selectAll(".legend").remove();
      		
		
	});
	/*setTimeout(function(){ g.select('.axis--x').selectAll(".tick text")
      .call(wrap, x.bandwidth());
  }, 200);*/
}

function createTreeMapChart(){
	

	svg = d3.select("svg.chart"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

	var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
    color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
    format = d3.format(",d");

    var treemap = d3.treemap()
    .tile(d3.treemapResquarify)
    .size([width, height])
    .round(true)
    .paddingInner(1);
	
	
	tooltip = d3.select("body").append("div").attr("class", "toolTip");
}

function renderTreeMapChart(quantifier){
	

	var root = d3.hierarchy(data)
      .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
      .sum(sumBySize)
      .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

  treemap(root);

  var cell = svg.selectAll("g")
    .data(root.leaves())
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

  cell.append("rect")
      .attr("id", function(d) { return d.data.id; })
      .attr("width", function(d) { return d.x1 - d.x0; })
      .attr("height", function(d) { return d.y1 - d.y0; })
      .attr("fill", function(d) { return color(d.parent.data.id); });

  cell.append("clipPath")
      .attr("id", function(d) { return "clip-" + d.data.id; })
    .append("use")
      .attr("xlink:href", function(d) { return "#" + d.data.id; });

  cell.append("text")
      .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
    .selectAll("tspan")
      .data(function(d) { return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
    .enter().append("tspan")
      .attr("x", 4)
      .attr("y", function(d, i) { return 13 + i * 10; })
      .text(function(d) { return d; });

  cell.append("title")
      .text(function(d) { return d.data.id + "\n" + format(d.value); });

  d3.selectAll("input")
      .data([sumBySize, sumByCount], function(d) { return d ? d.name : this.value; })
      .on("change", changed);

  var timeout = d3.timeout(function() {
    d3.select("input[value=\"sumByCount\"]")
        .property("checked", true)
        .dispatch("change");
  }, 2000);

  function changed(sum) {
    timeout.stop();

    treemap(root.sum(sum));

    cell.transition()
        .duration(750)
        .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
      .select("rect")
        .attr("width", function(d) { return d.x1 - d.x0; })
        .attr("height", function(d) { return d.y1 - d.y0; });
  }
}

function createLineChart(){
	svg = d3.select("svg.chart"),
    margin = {top: 20, right: 20, bottom: 40, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
 
	x = d3.scaleLinear().rangeRound([0, width]),
	y = d3.scaleLinear().rangeRound([height, 0]);

	svg.html("");
	g = svg.append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	g.append("g")
			  .attr("class", "axis axis--x")
			  .attr("transform", "translate(0," + height + ")")
			  .append("text")
				.attr("y", -20)
				.attr("x", width)
				.attr("dy", "0.71em")
				.attr("text-anchor", "end")
				.attr("fill", "#000")
				.attr("font-size", "15px")
				.attr("class", "axis--x xlabel");

	g.append("g")
	.attr("class", "axis axis--y")
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", "0.71em")
	.attr("text-anchor", "end")
	.attr("fill", "#000")
	.attr("font-size", "15px")
	.attr("class", "axis--y ylabel");


	g.append("path")
		.attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 2)
	  	.on("mouseover", function(d){
	  			
	             renderTooltip(x.invert(d3.mouse(this)[0]), true);
	             d3.select(this).style("stroke-width",'4');
	        })
		.on("mouseout", function(d){ 
			d3.select(this).style("stroke-width",'2');
			renderTooltip(d, false);});

	var today = new Date();
	svg.append("text")      // text label for the x axis
        .attr("x", width / 2 + 40 )
        .attr("y",  10 )
        .style("text-anchor", "middle")
        .attr("font-family","'Helvetica Neue',Helvetica,Arial,sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .text($('#datasetTitle').text());

	svg.append("text")      // text label bottom of chart
        .attr("x", width / 2 + 40 )
        .attr("y", height + 55 )
        .style("text-anchor", "middle")
        .attr("font-family","'Helvetica Neue',Helvetica,Arial,sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .text("Source : " + $('.well ul:first li:nth-child(2)').text() + " - Date : " + today.getDate() + "/"+ (today.getMonth()+1) + "/"+ today.getFullYear());


	tooltip = d3.select("body").append("div").attr("class", "toolTip");
}

function renderLineChart(xdata, ydata){
	
	renderTooltip = function(d, display){
		if(!display){
			tooltip.style("display", "none");
			return;
		}
		var  res, x0, y0, x1, y1;
		var i = bisectDate(data, d, 1),
          d0 = data[i - 1],
          d1 = data[i];
        if(i >= data.length){
        	res = +(getData(d0, ydata).toString().replace(",","."));
        } else {
        	x0 = +getData(d0, xdata);
        	x1 = +getData(d1, xdata);
        	y0 = +(getData(d0, ydata).toString().replace(",","."));
        	y1 = +(getData(d1, ydata).toString().replace(",","."));

        	res = d - x0 > x1 - d ? y1 : y0;
        }
        
        
		tooltip
          .style("left", d3.event.pageX - 50 + "px")
          .style("top", d3.event.pageY - 100 + "px")
          .style("display", "inline-block")
          .html(function(){ return res ;});
		
	}

	if(ydata == null) return;

	var line = d3.line()
    .x(function(d) { return x(+(getData(d, xdata).toString().replace(",","."))); })
    .y(function(d) { return y(+(getData(d, ydata).toString().replace(",","."))); });

    var bisectDate = d3.bisector(function(d) { return +(getData(d, xdata).toString().replace(",",".")); }).left;

	var data = featuresArray.slice(0,100);
	var _data = data.map(function(d){return d;});
	_data.sort(function(a, b) { return +(getData(b, xdata).toString().replace(",",".")) - +(getData(a, xdata).toString().replace(",",".")); });


  	x.domain(d3.extent(data, function(d) { return +(getData(d, xdata).toString().replace(",",".")) }));
  	y.domain(d3.extent(data, function(d) { var res = getData(d, ydata); 
	     	if(res != null) { return +(res.toString().replace(",",".")); }
	     	else { return 0;} }));

	g.select('.axis--x').transition().duration(300).call(d3.axisBottom(x));
	g.select('.axis--x .xlabel').transition().duration(300).text(xdata);

	g.select(".axis--y").transition().duration(300).call(d3.axisLeft(y).ticks(5, "s"));
	g.select('.axis--y .ylabel').transition().duration(300).text(ydata);

	svg.select(".line").transition().duration(300)
      .attr("d", line(_data));
	  	

      d3.select('#saveButton').on('click', function(){
		
      		exportSVG();
		
	});
}


function exportSVG(){
	var svgString = getSVGString(svg.node());
	svgString2Image( svgString, 2*width, 2*height, 'png', save ); // passes Blob and filesize String to the callback

	function save( dataBlob, filesize ){
		var date = new Date();

		saveAs( dataBlob, 'bfc_chart_'+ date.getFullYear() +''+(date.getMonth()+1)+'' +date.getDate() +'.png' ); // FileSaver.js function
	}
}


// Below are the functions that handle actual exporting:
// getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
function getSVGString( svgNode ) {
	svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
	var cssStyleText = getCSSStyles( svgNode );
	appendCSS( cssStyleText, svgNode );

	var serializer = new XMLSerializer();
	var svgString = serializer.serializeToString(svgNode);
	svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
	svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

	return svgString;

	function getCSSStyles( parentElement ) {
		var selectorTextArr = [];

		// Add Parent element Id and Classes to the list
		selectorTextArr.push( '#'+parentElement.id );
		for (var c = 0; c < parentElement.classList.length; c++)
				if ( !contains('.'+parentElement.classList[c], selectorTextArr) )
					selectorTextArr.push( '.'+parentElement.classList[c] );

		// Add Children element Ids and Classes to the list
		var nodes = parentElement.getElementsByTagName("*");
		for (var i = 0; i < nodes.length; i++) {
			var id = nodes[i].id;
			if ( !contains('#'+id, selectorTextArr) )
				selectorTextArr.push( '#'+id );

			var classes = nodes[i].classList;
			for (var c = 0; c < classes.length; c++)
				if ( !contains('.'+classes[c], selectorTextArr) )
					selectorTextArr.push( '.'+classes[c] );
		}

		// Extract CSS Rules
		var extractedCSSText = "";
		for (var i = 0; i < document.styleSheets.length; i++) {
			var s = document.styleSheets[i];
			
			try {
			    if(!s.cssRules) continue;
			} catch( e ) {
		    		if(e.name !== 'SecurityError') throw e; // for Firefox
		    		continue;
		    	}

			var cssRules = s.cssRules;
			for (var r = 0; r < cssRules.length; r++) {
				if ( contains( cssRules[r].selectorText, selectorTextArr ) )
					extractedCSSText += cssRules[r].cssText;
			}
		}
		

		return extractedCSSText;

		function contains(str,arr) {
			return arr.indexOf( str ) === -1 ? false : true;
		}

	}

	function appendCSS( cssText, element ) {
		var styleElement = document.createElement("style");
		styleElement.setAttribute("type","text/css"); 
		styleElement.innerHTML = cssText;
		var refNode = element.hasChildNodes() ? element.children[0] : null;
		element.insertBefore( styleElement, refNode );
	}
}


function svgString2Image( svgString, width, height, format, callback ) {
	var format = format ? format : 'png';

	var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svgString ) ) ); // Convert SVG string to data URL

	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");

	canvas.width = width;
	canvas.height = height;

	var image = new Image();
	image.onload = function() {
		context.clearRect ( 0, 0, width, height );
		context.drawImage(image, 0, 0, width, height);

		canvas.toBlob( function(blob) {
			var filesize = Math.round( blob.length/1024 ) + ' KB';
			if ( callback ) callback( blob, filesize );
		});

		
	};

	image.src = imgsrc;
}