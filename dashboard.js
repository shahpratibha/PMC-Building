
var map, geojson;
const API_URL = "http://localhost/PMC/autodcr/";
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
    .wms("https://portal.geopulsea.com/geoserver/AutoDCR/wms", {
        layers: "plotboundary",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    }).addTo(map);


var Revenue_Layer = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
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
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "Revenue_1",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });

var PLU_Layer = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "PLU_Ward",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });

var DPRoad_Layer = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "DP_Ward_Road",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });

var Boundary_Layer = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
        layers: "PMC_Boundary",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    }).addTo(map);

var Village_Boundary = L.tileLayer
    .wms("https://iwmsgis.pmc.gov.in/geoserver/AutoDCR/wms", {
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
  

var control = new L.control.layers(baseLayers, WMSlayers).addTo(map);
control.setPosition('topright');

// Remove the default zoom control
map.zoomControl.remove();

L.control.zoom({
    position: 'bottomright'
}).addTo(map);




$(document).ready(function () {
    refreshWMSLayer();

    var lastInsertedId = localStorage.getItem('lastInsertedPlotBoundaryId');
    var coordinatesString  = localStorage.getItem('coordinates')
    var boundss = localStorage.getItem('bounds')
    // console.log('bounds',bounds);
    // console.log(lastInsertedId,"lastInsertedId", coordinatesString )
    
    var coordinatesArray = boundss.split(",").map(Number);

    // var coordinatesArray = coordinatesString.split(",").map(String);//Changed Number to String PH

    console.log(coordinatesArray ,"okkkkkkk");

    // const coordsArray = coordinatesString.split(',').map(Number);

    // Extract individual coordinates
    // const coordinates = [
    //   [coordsArray[1], coordsArray[0]], // (18.521047, 73.859429)
    //   [coordsArray[3], coordsArray[2]]  // (18.521378, 73.85974)
    // ];
    

    var coords = [];
    while (coordinatesArray.length > 0) {
    coords.push(coordinatesArray.splice(0, 2).reverse());
   }
  console.log(coords,"hhhhhhhhh",bounds,"bounds");

  var bounds = L.latLngBounds(coords);
  console.log('bounds1111',bounds);
 map.fitBounds(bounds);

 })





// map.whenReady(function () {
   
//     refreshWMSLayer(); 
    
//     var lastInsertedId = localStorage.getItem('lastInsertedPlotBoundaryId');
//     var coordinatesString = localStorage.getItem('coordinates');
//     console.log(lastInsertedId, "lastInsertedId", coordinatesString);
    
//     var coordinatesArray = coordinatesString.split(",").map(Number);
//     console.log(coordinatesArray, "Coordinates Array");
    
//     var coords = [];
//     while (coordinatesArray.length > 0) {
//         coords.push(coordinatesArray.splice(0, 2).reverse());
//     }
//     console.log(coords, "Processed Coordinates");
//     var bounds = L.latLngBounds(coords);
//     map.fitBounds(bounds); 
// });


