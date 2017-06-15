var map = L.map('map').setView([25.296637, 51.517686], 9.2);
        mapLink = 
            '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 15,
            minZoom: 9
            }).addTo(map);


function addDataToMap(data, map) {
    var dataLayer = new L.geoJson(data, {style : style, onEachFeature : onEachFeature});
    dataLayer.addTo(map);
    }
    $.getJSON("qat_adm1.geojson", function(data) { addDataToMap(data, map); })


    function getColor(name) {
    return name == "Ad Dawhah" ? '#662506' :
           name == "Al Daayen" ? '#ffffe5' :
           name == "Ar Rayyan" ? '#feb24c' :
           name == "Al Khor"  ? '#cc4c02' :
           name == "Al Wakrah" ? '#fdae61' :
           name == "Umm Salal" ? '#fe9929' :
           name == "Madinat ash Shamal" ? '#fee391' :
                      '#6a6666';
    }


    function style(feature) {
    return {
        fillColor: getColor(feature.properties.NAME_1),
        opacity: 0.9,
        weight: 2,
        color: getColor(feature.properties.NAME_1),
        fillOpacity: 0.7
    };
    }


    function selectFeature(e) {            //function that selects municipality
    var layer = e.target;
    layer.setStyle({
        color: '#000000',
        weight: 2
        });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
        }
        info.update(layer.feature.properties);
    }
    

    function zoomToFeature(e) {                   //to zoom each municipality 
    map.fitBounds(e.target.getBounds());
    }


    function onEachFeature(feature, layer) {

    layer.on({
        mouseover: selectFeature,
        //click: zoomToFeature
        }); 

    layer.on('mouseout', function(e) {                 //on mouseout, goes back to default style
            layer.setStyle({
                color: getColor(feature.properties.NAME_1),
                fillColor: getColor(feature.properties.NAME_1)
            });
        });

    var label = L.marker(layer.getBounds().getCenter(), {          //to get text labels on each municipality
      icon: L.divIcon({
        className: 'label',
        html: feature.properties.NAME_1 + ' (' + feature.properties.NL_NAME_1 + ')',
        iconSize: [40, 70]
      })
     }).addTo(map);

    layer.on('click', function(e) {                                //on click, the zones are shown 
        var mun_name = feature.properties.NAME_1;
        $.getJSON("qatar_zone_population.geojson", function(data1) {
            if (mun_name == "Ar Rayyan")
               {var zone = L.geoJson(data1,{style: myStyle1,filter: addDataToMap1});
                zone.addTo(map);
                $("#div1").load("result_totalpopulation.json", function(data,status){
                    var arr_rayyan_1 = data.split("}");                       
                    var arr_rayyan_2 = arr_rayyan_1[4].toString().split(",");
                    var arr_rayyan_3 = arr_rayyan_2[1].toString().split("{");
                    var arr_rayyan_4 = arr_rayyan_3[1].toString().split(":");
                    var arr_rayyan_5 = [];
                    var arr_rayyan_5_names = [];
                    for(var i=18;i>1;i--)                         //creating arr_rayyan_5 which is an array having only the population data
                    {   var arr_rayyan_6 = arr_rayyan_2[i].toString().split(":");
                        arr_rayyan_5[18-i] = arr_rayyan_6[1];
                        arr_rayyan_5_names[18-i] = arr_rayyan_6[0];
                    }
                    arr_rayyan_5[17] = arr_rayyan_4[1];
                    arr_rayyan_5_names[17] = arr_rayyan_4[0];
                    var arr_rayyan_7 = sorted(arr_rayyan_5);      //creating a sorted array
                    
                   /* var arr=[8768,41641,44515,34807,29741,61532,90148,85940,67053,50291,36063,23255,15831,78001,3758,2008,2560];

        	        var y = k; */
        	        /*var a =0;
        	        var i=0;
        	        while(a<302856)
        	        {
        	        	var arrays = arr_rayyan_7[i];
        	        	a = a + arrays;
        	        	i++;
        	        }
        	        this.innerHTML = arrays; */
                   /* for(var j=0; j<18;j++)  
                    {
                    	if (med_age_group == arr_rayyan_5[j])
                    	{
                    		var age_group = arr_rayyan_5_names[j];
                    		break;
                    	}
                    } */
                    this.innerHTML = "The total population of this municipality is: " + arr_rayyan_7[17] + '<br>' + "The median age group is: ";
                });
               }
            else if (mun_name == "Ad Dawhah")
               {var zone = L.geoJson(data1,{style: myStyle1,filter: addDataToMap2});
                zone.addTo(map);
                $("#div1").load("result_totalpopulation.json", function(data,status){
                    var arr_doha_1 = data.split("}");
                    var arr_doha_2 = arr_doha_1[1].toString().split(",");
                    var arr_doha_3 = arr_doha_2[1].toString().split("{");
                    var arr_doha_4 = arr_doha_3[1].toString().split(":");
                    var arr_doha_5 = [];
                    for(var i=18;i>1;i--)                         //creating arr_doha_5 which is an array having only the population data
                    {   var arr_doha_6 = arr_doha_2[i].toString().split(":");
                        arr_doha_5[18-i] = arr_doha_6[1];
                    }
                    arr_doha_5[17] = arr_doha_4[1];
                    var arr_doha_7 = sorted(arr_doha_5);
                    this.innerHTML = "The total population of this municipality is: " + arr_doha_7;
                });
               }
            else if (mun_name == "Madinat ash Shamal")
               {var zone = L.geoJson(data1,{style: myStyle1,filter: addDataToMap3});
                zone.addTo(map);
                $("#div1").load("result_totalpopulation.json", function(data,status){
                    var arr_shamal_1 = data.split("}");
                    var arr_shamal_2 = arr_shamal_1[5].toString().split(",");
                    var arr_shamal_3 = arr_shamal_2[1].toString().split("{");
                    var arr_shamal_4 = arr_shamal_3[1].toString().split(":");
                    var arr_shamal_5 = [];
                    for(var i=18;i>1;i--)                         
                    {   var arr_shamal_6 = arr_shamal_2[i].toString().split(":");
                        arr_shamal_5[18-i] = arr_shamal_6[1];
                    }
                    arr_shamal_5[17] = arr_shamal_4[1];
                    this.innerHTML = "The total population of this municipality is: " + arr_shamal_5[2];
                });
               }
            else if (mun_name == "Al Wakrah")
               {var zone = L.geoJson(data1,{style: myStyle1,filter: addDataToMap4});
                zone.addTo(map);
                $("#div1").load("result_totalpopulation.json", function(data,status){
                    var arr_wakrah_1 = data.split("}");
                    var arr_wakrah_2 = arr_wakrah_1[7].toString().split(",");
                    var arr_wakrah_3 = arr_wakrah_2[1].toString().split("{");
                    var arr_wakrah_4 = arr_wakrah_3[1].toString().split(":");
                    var arr_wakrah_5 = [];
                    for(var i=18;i>1;i--)                         
                    {   var arr_wakrah_6 = arr_wakrah_2[i].toString().split(":");
                        arr_wakrah_5[18-i] = arr_wakrah_6[1];
                    }
                    arr_wakrah_5[17] = arr_wakrah_4[1];
                    this.innerHTML = "The total population of this municipality is: " + arr_wakrah_5[2];
                });
               }
            else if (mun_name == "Al Khor")
               {var zone = L.geoJson(data1,{style: myStyle1,filter: addDataToMap5});
                zone.addTo(map);
                $("#div1").load("result_totalpopulation.json", function(data,status){
                    var arr_khor_1 = data.split("}");
                    var arr_khor_2 = arr_khor_1[2].toString().split(",");
                    var arr_khor_3 = arr_khor_2[1].toString().split("{");
                    var arr_khor_4 = arr_khor_3[1].toString().split(":");
                    var arr_khor_5 = [];
                    for(var i=18;i>1;i--)                         
                    {   var arr_khor_6 = arr_khor_2[i].toString().split(":");
                        arr_khor_5[18-i] = arr_khor_6[1];
                    }
                    arr_khor_5[17] = arr_khor_4[1];
                    this.innerHTML = "The total population of this municipality is: " + arr_khor_5[2];
                });
               }
            else if (mun_name == "Umm Salal")
               {var zone = L.geoJson(data1,{style: myStyle1,filter: addDataToMap6});
                zone.addTo(map);
                $("#div1").load("result_totalpopulation.json", function(data,status){
                    var arr_salal_1 = data.split("}");
                    var arr_salal_2 = arr_salal_1[8].toString().split(",");
                    var arr_salal_3 = arr_salal_2[1].toString().split("{");
                    var arr_salal_4 = arr_salal_3[1].toString().split(":");
                    var arr_salal_5 = [];
                    for(var i=18;i>1;i--)                         
                    {   var arr_salal_6 = arr_salal_2[i].toString().split(":");
                        arr_salal_5[18-i] = arr_salal_6[1];
                    }
                    arr_salal_5[17] = arr_salal_4[1];
                    this.innerHTML = "The total population of this municipality is: " + arr_salal_5;
                });
               }
            else if (mun_name == "Al Daayen")
               {var zone = L.geoJson(data1,{style: myStyle1,filter: addDataToMap7});
                zone.addTo(map);
                $("#div1").load("result_totalpopulation.json", function(data,status){
                    var arr_daayen_1 = data.split("}");
                    var arr_daayen_2 = arr_daayen_1[0].toString().split(",");
                    var arr_daayen_3 = arr_daayen_2[0].toString().split("{");
                    var arr_daayen_4 = arr_daayen_3[2].toString().split(":");
                    var arr_daayen_5 = [];
                    for(var i=17;i>0;i--)                         
                    {   var arr_daayen_6 = arr_daayen_2[i].toString().split(":");
                        arr_daayen_5[17-i] = arr_daayen_6[1];

                    }
                    arr_daayen_5[17] = arr_daayen_4[1];

                    this.innerHTML = "The total population of this municipality is: " + arr_daayen_5;
                });
               }
        });
          function sorted(array_pass)
          {     var i=0;
          	    var array_final = [];
          		    array_final[i]= array_pass[17];
          	        array_final[i+1]= array_pass[10];
          	        array_final[i+2]= array_pass[11];
          	        array_final[i+3]= array_pass[13];
          	        array_final[i+4]= array_pass[4];
          	        array_final[i+5]= array_pass[1];
          	        array_final[i+6]= array_pass[14];
          	        array_final[i+7]= array_pass[16];
          	        array_final[i+8]= array_pass[15];
          	        array_final[i+9]= array_pass[12];
          	        array_final[i+10]= array_pass[0];
          	        array_final[i+11]= array_pass[9];
          	        array_final[i+12]= array_pass[7];
          	        array_final[i+13]= array_pass[3];
          	        array_final[i+14]= array_pass[5];
          	        array_final[i+15]= array_pass[6];
          	        array_final[i+16]= array_pass[8];
          	        array_final[i+17]= array_pass[2];
          	    return array_final;
          }
        function addDataToMap1(feature)
             {
                return ((feature.properties.ZONE_ID>50 && feature.properties.ZONE_ID<57) ||feature.properties.ZONE_ID==81 || feature.properties.ZONE_ID==83 || feature.properties.ZONE_ID==96 || feature.properties.ZONE_ID==97)
             } 
        function addDataToMap2(feature)
             {
                return ((feature.properties.ZONE_ID>0 && feature.properties.ZONE_ID<8) || (feature.properties.ZONE_ID>9 && feature.properties.ZONE_ID<51) || feature.properties.ZONE_ID==57 || feature.properties.ZONE_ID==58 || (feature.properties.ZONE_ID>59 && feature.properties.ZONE_ID<69))
             }  
        function addDataToMap3(feature)
             {
                return ((feature.properties.ZONE_ID>76 && feature.properties.ZONE_ID<80))
             }
        function addDataToMap4(feature)
             {
                return ((feature.properties.ZONE_ID>89 && feature.properties.ZONE_ID<92))
             }        
        function addDataToMap5(feature)
             {
                return ((feature.properties.ZONE_ID>73 && feature.properties.ZONE_ID<77))
             } 
        function addDataToMap6(feature)
             {
                return (feature.properties.ZONE_ID==71)
             }        
        function addDataToMap7(feature)
             {
                return ((feature.properties.ZONE_ID>68 && feature.properties.ZONE_ID<71))
             }       
        function myStyle1(feature) {
        return {
        color: "black",
        weight: 2
         };
        }                  
    });                 
    //layer.bindLabel(getData(feature.properties.NAME_1))
    //layer.addTo(map);
    }


     

       
