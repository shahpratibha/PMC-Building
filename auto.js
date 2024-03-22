var map, geojson;
const API_URL = "http://localhost/geopulse/autodcr/";
// const API_URL = "http://localhost/PMC-Project/";

//Add Basemap
var map = L.map("map", {}).setView([18.52, 73.895], 12, L.CRS.EPSG4326);

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
 



var Revenue_Layer = L.tileLayer
.wms("https://portal.geopulsea.com/geoserver/pmc/wms", {
    layers: "Revenue",
    format: "image/png",
    transparent: true,
    tiled: true,
    version: "1.1.0",
    // attribution: "Revenue",
    opacity: 1,
}).addTo(map);

 
var WMSlayers = {
  "OSM": osm,
  "Esri": Esri_WorldImagery,
  "Satellite": googleSat,
 
  Revenue: Revenue_Layer,
 
};


var control = new L.control.layers(baseLayers, WMSlayers).addTo(map);
control.setPosition('topright');




function FitbouCustomiseRevenue(filter) {
layers = ["pmc:Revenue"];
layers.forEach(function (layerName) {
    var urlm =
        "https://portal.geopulsea.com//geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" +
        layerName +
        "&CQL_FILTER=" +
        filter +
        "&outputFormat=application/json";

    console.log(urlm, "fittobound url")
    $.getJSON(urlm, function (data) {
        console.log(data)
        geojson = L.geoJson(data, {});
        map.fitBounds(geojson.getBounds());
    });
});
}



$(document).ready(function () {
console.log("Document ready");
trials();

function trials() {
    var geoServerURL = "https://portal.geopulsea.com//geoserver/pmc/wms?service=WFS&version=1.1.0&request=GetFeature&typeName=Revenue&propertyName=Village_Name&outputFormat=application/json";

    $.getJSON(geoServerURL)
        .done(function (data) {
            var villageSet = new Set();
            data.features.forEach(function (feature) {
                villageSet.add(feature.properties.Village_Name);
            });

            var select = document.getElementById("search_type");
            villageSet.forEach(function (village) {
                var option = document.createElement("option");
                option.text = village;
                option.value = village;
                select.appendChild(option);
            });
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log("Request Failed: " + err);
        });
}
});
// autocompleteSuggestions

$("#search_type").change(function () {
var selectedValueVillage = $(this).val();
var Village_name = 'Village_Name'
let filters = `${Village_name} = '${selectedValueVillage}'`;

// Update Revenue_Layer with new CQL_FILTER

FitbouCustomiseRevenue(filters)
Revenue_Layer.setParams({
    CQL_FILTER: filters,
    maxZoom: 19.5,
    styles: "polygon"
});

function getvalues(callback) {
    var geoServerURL =
        "https://portal.geopulsea.com//geoserver/pmc/wms?service=WFS&version=1.1.0&request=GetFeature&typeName=Revenue&propertyName=Gut_No&outputFormat=application/json";

    if (filters) {
        geoServerURL += "&CQL_FILTER=" + encodeURIComponent(filters);
    }

    $.getJSON(geoServerURL, function (data) {
        var gutvalues = new Set();

        // Populate the Set with gut numbers
        $.each(data.features, function (index, feature) {
            var gutss = feature.properties.Gut_No;
            gutvalues.add(gutss);
        });

        // Convert the Set to an array
        var Uniqueguts = Array.from(gutvalues);
        console.log(Uniqueguts, "Uniqueguts");

        // Call the callback function if it's provided
        if (callback && typeof callback === "function") {
            callback(Uniqueguts);
        }
    });
}

// Call getvalues function and pass a callback function to handle Uniqueguts
getvalues(function (Uniqueguts) {
    console.log(Uniqueguts, "Uniqueguts");

    // Add checkboxes for each Uniqueguts value
    var container = document.getElementById("checkboxContainer");
    container.innerHTML = ""; // Clear previous checkboxes

    Uniqueguts.forEach(function (value) {
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "checkbox_" + value.replace(/\s+/g, "_"); // Use a unique ID for each checkbox
        checkbox.value = value;

        var label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = value;

        container.appendChild(checkbox);
        container.appendChild(label);
        container.appendChild(document.createElement("br")); // Add a line break after each checkbox
    });
});




function getSelectedValues() {
    // Reset selectedValues array
    var selectedValues = [];

    // Get all checkboxes
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Iterate over each checkbox
    checkboxes.forEach(function(checkbox) {
        // If checkbox is checked and value is not 'on', add its value to selectedValues array
        if (checkbox.checked && checkbox.value !== 'on') {
            selectedValues.push(checkbox.value);
        }
    });

    var cqlFilterGut = "";
    if (selectedValues.length > 0) {
        cqlFilterGut = "Gut_No IN (" + selectedValues.map(value => "'" + value + "'").join(",") + ")";
    }
    var cqlFilter = "";
    if (cqlFilterGut && filters) {
        cqlFilter = "(" + cqlFilterGut + ") AND (" + filters + ")";
    } else {
        cqlFilter = cqlFilterGut || filters;
    }

    // Log CQL filter string
    console.log(cqlFilter);

    // Log selected values
    console.log(selectedValues);

    return cqlFilter;
}



document.getElementById('checkboxContainer').addEventListener('change', function () {
    var cqlFilter = getSelectedValues();
    // Use cqlFilter as needed, e.g., update the GeoServer layer
    console.log(cqlFilter,"fvfdvddshcdc")
    FitbouCustomiseRevenue(cqlFilter)
    Revenue_Layer.setParams({
        CQL_FILTER: cqlFilter,
        maxZoom: 19.5,
        styles: "polygon"
    });
});

// Initial call to getSelectedValues to log the initially selected values and create the initial CQL filter
var initialCqlFilter = getSelectedValues();


})

// draw tool add

// Initialize the FeatureGroup to store drawn items
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Initialize the Leaflet Draw control
var drawControl = new L.Control.Draw({
    draw: {
      polyline: false,
        polygon: {
            shapeOptions: {
                color: 'red' // Color of the polygon outline
            },
            icon: new L.DivIcon({
            iconSize: new L.Point(4, 4), // reduce the size of the icon
            className: "leaflet-div-icon", // specify the icon class
          }),
        },
        rectangle: false,
        circle: false, // Disable drawing circles
        marker: false // Disable drawing markers
    },
    edit: false // Disable edit mode
});
map.addControl(drawControl);

// ===============================================


