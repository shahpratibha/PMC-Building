
var map, geojson;
const API_URL = "http://localhost/autodcr/";
// const API_URL = "http://localhost/PMC-Project/";

// Add Basemap
var map = L.map("map", {
        center:[18.52, 73.89],
        zoom: 11,
        minZoom: 10,
        maxZoom: 18,
        boxZoom: true,
        trackResize: true,
        wheelPxPerZoomLevel: 40,
        zoomAnimation: true,
        
});


// var map = L.map("map", {}).setView([18.52, 73.895], 12, L.CRS.EPSG4326);

var googleSat = L.tileLayer(
    "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }
);

var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    // attribution:
    //   '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var Esri_WorldImagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        // attribution:
        //   "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    }
);
var baseLayers = {};

var PlotBoundary_Layer = L.tileLayer
    .wms("https://pmc.geopulsea.com/geoserver/AutoDCR/wms", {
        layers: "plotboundary",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    }).addTo(map);


var Revenue_Layer = L.tileLayer
    .wms("https://portal.geopulsea.com/geoserver/AutoDCR/wms", {
        layers: "Revenue_1",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });

// .addTo(map);


// for only gut showing
var Revenue_Layer1 = L.tileLayer
    .wms("https://portal.geopulsea.com/geoserver/AutoDCR/wms", {
        layers: "Revenue_1",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });

var PLU_Layer = L.tileLayer
    .wms("https://portal.geopulsea.com/geoserver/AutoDCR/wms", {
        layers: "PLU_Ward",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });

var DPRoad_Layer = L.tileLayer
    .wms("https://portal.geopulsea.com/geoserver/AutoDCR/wms", {
        layers: "DP_Ward_Road",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });

var Boundary_Layer = L.tileLayer
    .wms("https://portal.geopulsea.com/geoserver/AutoDCR/wms", {
        layers: "PMC_Boundary",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    }).addTo(map);

var Village_Boundary = L.tileLayer
    .wms("https://portal.geopulsea.com/geoserver/AutoDCR/wms", {
        layers: "Village_Boundary",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });


var WMSlayers = {
    "OSM": osm,
    "Esri": Esri_WorldImagery,
    "Satellite": googleSat,
     
    Plot:PlotBoundary_Layer,
    Revenue: Revenue_Layer,
    PLU: PLU_Layer,
    DPRoad: DPRoad_Layer,
    Boundary: Boundary_Layer,
    Village: Village_Boundary


};

function refreshWMSLayer() {
    // Remove the layer from the map
    map.removeLayer(PlotBoundary_Layer);
    // Add the layer again
    PlotBoundary_Layer.addTo(map);
  }
  
  refreshWMSLayer();


var control = new L.control.layers(baseLayers, WMSlayers).addTo(map);
control.setPosition('topright');

// Remove the default zoom control
map.zoomControl.remove();

L.control.zoom({
    position: 'bottomright' // Set position to bottom right
}).addTo(map);


// var drawnItems = new L.FeatureGroup().addTo(map);
// map.addLayer(drawnItems);

// var drawControl = new L.Control.Draw({
//     edit: {
//         featureGroup: drawnItems
//     },
//     draw: {
//         polygon: {
//             shapeOptions: {
//                 color: "red", // set the color for the polygon border
//             },
//             icon: new L.DivIcon({
//                 iconSize: new L.Point(6, 6), // set the size of the icon
//                 className: "leaflet-div-icon", // specify the icon class
//             }),
//         },


//         polyline: false,
//         rectangle: false,
//         circle: false,
//         marker: false,
//         // circlemarker:false,   
//     }
// });
// map.addControl(drawControl);




// save polygons into database variable

// var drawnPolygons = {};

// map.on('draw:created', function (e) {
//     var layer = e.layer;
//     drawnItems.addLayer(layer);

//     // var bounds = layer.getBounds().toBBoxString();
//     var drawnPolygon = layer.toGeoJSON();
//     console.log(drawnPolygon.geometry.type)

//     // Ensure the drawn polygon is a valid Polygon
//     if (drawnPolygon.geometry.type === 'Polygon') {
//         var polygonId = 'polygon_draw'

//         drawnPolygons[polygonId] = layer.toGeoJSON().geometry.coordinates;
//         console.log(drawnPolygons, "drawnPolygons", "polygonCounter")
//         // IntersectAreaWithPolygon(drawnPolygon, layers, url, propertyName, bounds, outputFormat);
//     } else {
//         console.log('Drawn geometry is not a valid Polygon.');
//     }
// });



// $(document).ready(function () {
//     trials();

//     function trials() {
//         var geoServerURL = "https://portal.geopulsea.com//geoserver/AutoDCR/wms?service=WFS&version=1.1.0&request=GetFeature&typeName=Revenue_1&propertyName=village_name&outputFormat=application/json";

//         $.getJSON(geoServerURL)
//             .done(function (data) {
//                 var villageSet = new Set();
//                 data.features.forEach(function (feature) {
//                     villageSet.add(feature.properties.village_name);
//                 });

//                 var select = document.getElementById("search_type");
//                 villageSet.forEach(function (village) {
//                     var option = document.createElement("option");
//                     option.text = village;
//                     option.value = village;
//                     select.appendChild(option);
//                 });
//             })
//             .fail(function (jqxhr, textStatus, error) {
//                 var err = textStatus + ", " + error;
//                 console.log("Request Failed: " + err);
//             });
//     }
// });
// // autocompleteSuggestions

// $("#search_type").change(function () {
//     var selectedValueVillage = $(this).val();
//     var Village_name = 'village_name'
//     let filters = `${Village_name} = '${selectedValueVillage}'`;

//     // Update Revenue_Layer with new CQL_FILTER

//     FitbouCustomiseRevenue(filters)
//     Revenue_Layer.setParams({
//         CQL_FILTER: filters,
//         maxZoom: 19.5,
//         styles: "Highlight_polygon"
//     }).addTo(map);

//     function getvalues(callback) {
//         var geoServerURL =
//             "https://portal.geopulsea.com//geoserver/AutoDCR/wms?service=WFS&version=1.1.0&request=GetFeature&typeName=Revenue_1&propertyName=Gut_No&outputFormat=application/json";

//         if (filters) {
//             geoServerURL += "&CQL_FILTER=" + encodeURIComponent(filters);
//         }

//         $.getJSON(geoServerURL, function (data) {
//             var gutvalues = new Set();

//             // Populate the Set with gut numbers
//             $.each(data.features, function (index, feature) {
//                 var gutss = feature.properties.Gut_No;
//                 gutvalues.add(gutss);
//             });

//             // Convert the Set to an array
//             var Uniqueguts = Array.from(gutvalues);
//             console.log(Uniqueguts, "Uniqueguts");

//             // Call the callback function if it's provided
//             if (callback && typeof callback === "function") {
//                 callback(Uniqueguts);
//             }
//         });
//     }

//     // Call getvalues function and pass a callback function to handle Uniqueguts
//     getvalues(function (Uniqueguts) {
//         console.log(Uniqueguts, "Uniqueguts");

//         var stateList = $('#stateList');
//         stateList.empty();
//         // console.log(stateList,"stateList")
//         _.each(Uniqueguts, function (state) {
//             var listItem = $('<li><input name="' + state + '" type="checkbox"><label for="' + state + '">' + state + '</label></li>');
//             stateList.append(listItem);
//         });

//         // Events
//         $('.dropdown-container')
//             .on('click', '.dropdown-button', function () {
//                 $(this).siblings('.dropdown-list').toggle();
//             })
//             .on('input', '.dropdown-search', function () {
//                 var target = $(this);
//                 var dropdownList = target.closest('.dropdown-list');
//                 var search = target.val().toLowerCase();

//                 if (!search) {
//                     dropdownList.find('li').show();
//                     return false;
//                 }

//                 dropdownList.find('li').each(function () {
//                     var text = $(this).text().toLowerCase();
//                     var match = text.indexOf(search) > -1;
//                     $(this).toggle(match);
//                 });
//             })
//             .on('change', '[type="checkbox"]', function () {
//                 var container = $(this).closest('.dropdown-container');
//                 var numChecked = container.find('[type="checkbox"]:checked').length;
//                 container.find('.quantity').text(numChecked || 'Any');
//             });


//     });


//     $(document).on('change', '#stateList input[type="checkbox"]', function () {
//         var cqlFilter = getSelectedValues();
//         console.log(cqlFilter, "Selected filters");

//         // Update the map with the new filter
//         FitbouCustomiseRevenue(cqlFilter);
//         Revenue_Layer1.setParams({
//             CQL_FILTER: cqlFilter,
//             maxZoom: 23,
//             styles: "Highlight_polygon1"
//         }).addTo(map).bringToFront();
//     });

//     // Function to get the selected checkbox values and construct the CQL filter

//     function getSelectedValues() {
//         var selectedValues = [];
//         $('input[type="checkbox"]:checked').each(function () {
//             var name = $(this).attr('name');
//             if (name !== undefined) {
//                 selectedValues.push("'" + name + "'");
//             }
//         });
//         var cqlFilterGut = ""
//         if (selectedValues.length > 0) {
//             cqlFilterGut = "Gut_No IN (" + selectedValues.join(",") + ")";
//         } else {
//             cqlFilterGut = ""
//         }
//         console.log(cqlFilterGut, "cqlFilterGut")

//         var cqlFilter = "";
//         if (cqlFilterGut && filters) {
//             cqlFilter = "(" + cqlFilterGut + ") AND (" + filters + ")";
//         } else {
//             cqlFilter = cqlFilterGut || filters;
//         }
//         localStorage.setItem('cqlFilter', cqlFilter);

//         return cqlFilter;
//     }

//     var initialCqlFilter = getSelectedValues();




// })

// // Create a button element
// // var button = L.control({ position: 'bottomright' });

// // button.onAdd = function (map) {
// //     var div = L.DomUtil.create('div', 'custom-button');
// //     div.innerHTML = '<button onclick="savevalues()" >Next  <i class="fa-regular fa-circle-right"></i></button>';
// //     return div;
// // };

// // button.addTo(map);



// function FitbouCustomiseRevenue(filter) {
//     layers = ["AutoDCR:Revenue_1"];
//     layers.forEach(function (layerName) {
//         var urlm =
//             "https://portal.geopulsea.com//geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" +
//             layerName +
//             "&CQL_FILTER=" +
//             filter +
//             "&outputFormat=application/json";
//         $.getJSON(urlm, function (data) {
//             geojson = L.geoJson(data, {});
//             map.fitBounds(geojson.getBounds());
//         });
//     });
// }


