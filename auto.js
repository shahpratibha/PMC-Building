
var map, geojson;
const API_URL = "https://iwmsgis.pmc.gov.in/geopulse/autodcr/";
// const API_URL = "http://localhost/PMC-Project/";

// Add Basemap
var map = L.map("map", {
    center: [18.52, 73.89],
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
    maxZoom: 20,
}).addTo(map);

var Esri_WorldImagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        maxZoom: 20,
      }
);
var baseLayers = {};


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
    }).addTo(map);



var aviation = L.tileLayer
    .wms("https://portal.geopulsea.com/geoserver/AutoDCR/wms", {
        layers: "Aviation_data",
        format: "image/png",
        transparent: true,
        tiled: true,
        version: "1.1.0",
        // attribution: "Revenue",
        opacity: 1,
    });
    // .addTo(map);


var WMSlayers = {
    "OSM": osm,
    "Esri": Esri_WorldImagery,
    "Satellite": googleSat,

    Boundary: Boundary_Layer,
    Aviation:aviation,
    Village: Village_Boundary,
    Revenue: Revenue_Layer,
    PLU: PLU_Layer,
    DPRoad: DPRoad_Layer,
    
    


};


let handshaking_codes = [
    {"name": "Aundh", "code": "ADCR001"},
    {"name": "BALEWADI", "code": "ADCR002"},
    {"name": "BANER", "code": "ADCR003"},
    {"name": "Baner North", "code": "ADCR003a"},
    {"name": "Baner south", "code": "ADCR003b"},
    {"name": "Baner West", "code": "ADCR003c"},
    {"name": "BAWDHAN", "code": "ADCR004"},
    {"name": "Bopodi", "code": "ADCR005"},
    {"name": "Erandwana", "code": "ADCR006"},
    {"name": "Erandwana North", "code": "ADCR006a"},
    {"name": "Erandwana South", "code": "ADCR006b"},
    {"name": "Hingne-budruk", "code": "ADCR007"},
    {"name": "KARVE NAGAR", "code": "ADCR008"},
    {"name": "Khadki Navi", "code": "ADCR009"},
    {"name": "KOTHRUD-NORTH", "code": "ADCR010"},
    {"name": "Kothrud-South", "code": "ADCR011"},
    {"name": "Pashan", "code": "ADCR012"},
    {"name": "Shivaji Nagar", "code": "ADCR013"},
    {"name": "SHIVAJI NAGAR-BHAMBURDA", "code": "ADCR014"},
    {"name": "SHIVANE", "code": "ADCR015"},
    {"name": "Shivane North", "code": "ADCR015a"},
    {"name": "Shivane South", "code": "ADCR015b"},
    {"name": "Warje", "code": "ADCR016"},
    {"name": "Ambegaon Budruk-Ext", "code": "ADCR017"},
    {"name": "Ambegaon Khurd-Ext", "code": "ADCR018"},
    {"name": "AMBEGAON-BUDRUK", "code": "ADCR019"},
    {"name": "AMBEGAON-KHURD", "code": "ADCR020"},
    {"name": "Bhawani Peth", "code": "ADCR021"},
    {"name": "Bibwewadi-Munjeri", "code": "ADCR022"},
    {"name": "BUDHWAR PETH", "code": "ADCR023"},
    {"name": "DHANKWADI", "code": "ADCR024"},
    {"name": "DHANKWADI-EXT", "code": "ADCR025"},
    {"name": "Dhanori", "code": "ADCR026"},
    {"name": "DHANORI-EXT", "code": "ADCR027"},
    {"name": "Dhayri", "code": "ADCR028"},
    {"name": "Dhayri-Ext", "code": "ADCR029"},
    {"name": "Fursungi", "code": "ADCR030"},
    {"name": "Ganesh Peth", "code": "ADCR031"},
    {"name": "GANJ PETH", "code": "ADCR032"},
    {"name": "Ghorpade peth", "code": "ADCR033"},
    {"name": "Ghorpadi", "code": "ADCR034"},
    {"name": "Gultekdi", "code": "ADCR035"},
    {"name": "Gurwar Peth", "code": "ADCR036"},
    {"name": "Hadapsar", "code": "ADCR037"},
    {"name": "HADAPSAR-EXT", "code": "ADCR038"},
    {"name": "HINGANE-KHURD", "code": "ADCR039"},
    {"name": "Kalas", "code": "ADCR040"},
    {"name": "KALAS EXT", "code": "ADCR041"},
    {"name": "KASBA PETH", "code": "ADCR042"},
    {"name": "KATRAJ", "code": "ADCR043"},
    {"name": "Katraj Ext", "code": "ADCR044"},
    {"name": "Kharadi", "code": "ADCR045"},
    {"name": "Kharadi East", "code": "ADCR045a"},
    {"name": "Kharadi West", "code": "ADCR045b"},
    {"name": "Kondhwa-Budruk", "code": "ADCR046"},
    {"name": "Kondhwa-Budruk North", "code": "ADCR046a"},
    {"name": "Kondhwa-Budruk South", "code": "ADCR046b"},
    {"name": "Kondhwa-Khurd", "code": "ADCR047"},
    {"name": "Kondwa khurd -EXT", "code": "ADCR048"},
    {"name": "KOREGAON PARK", "code": "ADCR049"},
    {"name": "KOTHRUD-EXT", "code": "ADCR050"},
    {"name": "Lohagaon", "code": "ADCR051"},
    {"name": "Lohagaon North", "code": "ADCR051a"},
    {"name": "Lohagaon South", "code": "ADCR051b"},
    {"name": "Lohgaon-Ext", "code": "ADCR052"},
    {"name": "Lohgaon-Ext North", "code": "ADCR052a"},
    {"name": "Lohgaon-Ext South", "code": "ADCR052b"},
    {"name": "LULLANAGAR", "code": "ADCR053"},
    {"name": "Mahatma Phule peth", "code": "ADCR054"},
    {"name": "MANGALWAR PETH", "code": "ADCR055"},
    {"name": "Market Yard", "code": "ADCR056"},
    {"name": "Mohammadwadi", "code": "ADCR057"},
    {"name": "Mundhwa", "code": "ADCR058"},
    {"name": "Mundhwa North", "code": "ADCR058a"},
    {"name": "Mundhwa South", "code": "ADCR058b"},
    {"name": "Mundhwa-Keshavnagar", "code": "ADCR059"},
    {"name": "MUNJERI", "code": "ADCR060"},
    {"name": "Nana Peth", "code": "ADCR061"},
    {"name": "NARAYAN PETH", "code": "ADCR062"},
    {"name": "Navipeth", "code": "ADCR063"},
    {"name": "Parvati North", "code": "ADCR064"},
    {"name": "Parvati South", "code": "ADCR065"},
    {"name": "RASTA PETH", "code": "ADCR066"},
    {"name": "RAVIWAR PETH", "code": "ADCR067"},
    {"name": "SADASHIV PETH", "code": "ADCR068"},
    {"name": "Sadesatara  Nali-Hadapsar", "code": "ADCR069"},
    {"name": "SANGANWADI TPS", "code": "ADCR070"},
    {"name": "SHANIWAR PETH", "code": "ADCR071"},
    {"name": "Shivane-Ext", "code": "ADCR072"},
    {"name": "Shivane-Uttamnagar", "code": "ADCR073"},
    {"name": "SHUKRAWAR PETH", "code": "ADCR074"},
    {"name": "SOMWAR PETH", "code": "ADCR075"},
    {"name": "Undri", "code": "ADCR076"},
    {"name": "Undri-Ext", "code": "ADCR077"},
    {"name": "Urali Devachi", "code": "ADCR078"},
    {"name": "VADGAON-BUDRUK", "code": "ADCR079"},
    {"name": "Vadgaon-Khurd", "code": "ADCR080"},
    {"name": "Vadgaon-Sheri", "code": "ADCR081"},
    {"name": "VadgaonSheri-ext", "code": "ADCR082"},
    {"name": "Wanawadi", "code": "ADCR083"},
    {"name": "Yerawada", "code": "ADCR084"},
    {"name": "Yevlewadi", "code": "ADCR085"}
] ;


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

var control = new L.control.layers(baseLayers, WMSlayers).addTo(map);
control.setPosition('topright');

// Remove the default zoom control
map.zoomControl.remove();

L.control.zoom({
    position: 'bottomright' // Set position to bottom right
}).addTo(map);

// draw-----------------------------------------------------
var drawnItems = new L.FeatureGroup().addTo(map);
// map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    },
    draw: {
        polygon: {
            shapeOptions: {
                color: "red", // set the color for the polygon border
            },
            icon: new L.DivIcon({
                iconSize: new L.Point(6, 6), // set the size of the icon
                className: "leaflet-div-icon", // specify the icon class
            }),
        },


        polyline: false,
        rectangle: false,
        circle: false,
        marker: false,
        // circlemarker:false,   
    }
});
map.addControl(drawControl);

// save polygons into database variable

var drawnPolygons = {};

map.on('draw:created', function (e) {
    var layer = e.layer;
    drawnItems.addLayer(layer);

    // var bounds = layer.getBounds().toBBoxString();
    var drawnPolygon = layer.toGeoJSON();

    if (drawnPolygon.geometry.type === 'Polygon') {
        var polygonId = 'polygon_draw'

        drawnPolygons[polygonId] = layer.toGeoJSON().geometry.coordinates;
      
    } else {
        console.log('Drawn geometry is not a valid Polygon.');
    }
});


const handshakingCode = getQueryParam('village_name');
const token = getQueryParam('TOKEN');


$(document).ready(function () {
    trials();

   

    // Get the village_name from the URL
    const villageEntry = handshaking_codes.find(entry => entry.code === handshakingCode);
    const village_name = villageEntry ? villageEntry.name : null;

    console.log(village_name);


    function trials() {
        var geoServerURL = "https://portal.geopulsea.com//geoserver/AutoDCR/wms?service=WFS&version=1.1.0&request=GetFeature&typeName=Revenue_1&propertyName=village_name&outputFormat=application/json";

        $.getJSON(geoServerURL)
            .done(function (data) {
                var villageSet = new Set();
                data.features.forEach(function (feature) {
                    villageSet.add(feature.properties.village_name);
                });

                var select = document.getElementById("search_type");
                villageSet.forEach(function (village) {
                    var option = document.createElement("option");
                    option.text = village?.trim();
                    option.value = village?.trim();
                    //if village_name == option value set it as selected
                    select.appendChild(option);
                });

          
                if (village_name && select) {
                    select.value = village_name;
                    var Village_name = 'village_name'
                    let filters = `${Village_name} = '${village_name}'`;
                
                    FitbouCustomiseRevenue(filters)
                    Revenue_Layer.setParams({
                        CQL_FILTER: filters,
                        maxZoom: 19.5,
                        styles: "Highlight_polygon"
                    }).addTo(map);
                    
                    function getvalues(callback) {
                        var geoServerURL =
                            "https://portal.geopulsea.com//geoserver/AutoDCR/wms?service=WFS&version=1.1.0&request=GetFeature&typeName=Revenue_1&propertyName=Gut_No&outputFormat=application/json";

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
                            var Uniqueguts = Array.from(gutvalues);
                            if (callback && typeof callback === "function") {
                                callback(Uniqueguts);
                            }
                        });
                    }
                
                    getvalues(function (Uniqueguts) {
                    
                        var stateList = $('#stateList');
                        stateList.empty();
                        // console.log(stateList,"stateList")
                        _.each(Uniqueguts, function (state) {
                            var listItem = $('<li><input name="' + state + '" type="checkbox"><label for="' + state + '">' + state + '</label></li>');
                            stateList.append(listItem);
                        });
                
                        // Events
                        $('.dropdown-container')
                            .on('click', '.dropdown-button', function () {
                                $(this).siblings('.dropdown-list').toggle();
                            })
                            .on('input', '.dropdown-search', function () {
                                var target = $(this);
                                var dropdownList = target.closest('.dropdown-list');
                                var search = target.val().toLowerCase();
                
                                if (!search) {
                                    dropdownList.find('li').show();
                                    return false;
                                }
                
                                dropdownList.find('li').each(function () {
                                    var text = $(this).text().toLowerCase();
                                    var match = text.indexOf(search) > -1;
                                    $(this).toggle(match);
                                });
                            })
                            .on('change', '[type="checkbox"]', function () {
                                var container = $(this).closest('.dropdown-container');
                                var numChecked = container.find('[type="checkbox"]:checked').length;
                                container.find('.quantity').text(numChecked || 'Any');
                            });
                
                
                    });
                }
              
            })
            .fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.log("Request Failed: " + err);
            });
    }
});

$("#search_type").change(function () {
    var selectedValueVillage = $(this).val();
    var Village_name = 'village_name'
    let filters = `${Village_name} = '${selectedValueVillage}'`;

    // Update Revenue_Layer with new CQL_FILTER

    FitbouCustomiseRevenue(filters)
    Revenue_Layer.setParams({
        CQL_FILTER: filters,
        maxZoom: 19.5,
        styles: "Highlight_polygon"
    }).addTo(map);

    function getvalues(callback) {
        var geoServerURL =
            "https://portal.geopulsea.com//geoserver/AutoDCR/wms?service=WFS&version=1.1.0&request=GetFeature&typeName=Revenue_1&propertyName=Gut_No&outputFormat=application/json";        if (filters) {
            geoServerURL += "&CQL_FILTER=" + encodeURIComponent(filters);
        }

        $.getJSON(geoServerURL, function (data) {
            var gutvalues = new Set();

            // Populate the Set with gut numbers
            $.each(data.features, function (index, feature) {
                var gutss = feature.properties.Gut_No;
                gutvalues.add(gutss);
            });
            var Uniqueguts = Array.from(gutvalues);
            if (callback && typeof callback === "function") {
                callback(Uniqueguts);
            }
        });
    }

    // Call getvalues function and pass a callback function to handle Uniqueguts
    getvalues(function (Uniqueguts) {
        // console.log(Uniqueguts, "Uniqueguts");

        var stateList = $('#stateList');
        stateList.empty();
        // console.log(stateList,"stateList")
        _.each(Uniqueguts, function (state) {
            var listItem = $('<li><input name="' + state + '" type="checkbox"><label for="' + state + '">' + state + '</label></li>');
            stateList.append(listItem);
        });

        // Events
        $('.dropdown-container')
            .on('click', '.dropdown-button', function () {
                $(this).siblings('.dropdown-list').toggle();
            })
            .on('input', '.dropdown-search', function () {
                var target = $(this);
                var dropdownList = target.closest('.dropdown-list');
                var search = target.val().toLowerCase();

                if (!search) {
                    dropdownList.find('li').show();
                    return false;
                }

                dropdownList.find('li').each(function () {
                    var text = $(this).text().toLowerCase();
                    var match = text.indexOf(search) > -1;
                    $(this).toggle(match);
                });
            })
            .on('change', '[type="checkbox"]', function () {
                var container = $(this).closest('.dropdown-container');
                var numChecked = container.find('[type="checkbox"]:checked').length;
                container.find('.quantity').text(numChecked || 'Any');
            });


    });


    $(document).on('change', '#stateList input[type="checkbox"]', function () {
        var cqlFilter = getSelectedValues();
        // console.log(cqlFilter, "Selected filters");

        // Update the map with the new filter
        FitbouCustomiseRevenue(cqlFilter);
        Revenue_Layer1.setParams({
            CQL_FILTER: cqlFilter,
            maxZoom: 23,
            styles: "Highlight_polygon1"
        }).addTo(map).bringToFront();
    });


    // Function to get the selected checkbox values and construct the CQL filter

    

    var initialCqlFilter = getSelectedValues();




})

function getSelectedValues() {
    var selectedValues = [];
    $('input[type="checkbox"]:checked').each(function () {
        var name = $(this).attr('name');
        if (name !== undefined) {
            selectedValues.push("'" + name + "'");
        }
    });
    var cqlFilterGut = ""
    if (selectedValues.length > 0) {
        cqlFilterGut = "Gut_No IN (" + selectedValues.join(",") + ")";
    } else {
        cqlFilterGut = ""
    }
    // console.log(cqlFilterGut, "cqlFilterGut")

    var cqlFilter = "";
    if (cqlFilterGut && filters) {
        cqlFilter = "(" + cqlFilterGut + ") AND (" + filters + ")";
    } else {
        cqlFilter = cqlFilterGut || filters;
    }
    localStorage.setItem('cqlFilter', cqlFilter);

    return cqlFilter;
}

// Create a button element
var button = L.control({ position: 'bottomright' });

button.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'custom-button');
    div.innerHTML = '<button onclick="savevalues()" >Next  <i class="fa-regular fa-circle-right"></i></button>';
    return div;
};

button.addTo(map);





function FitbouCustomiseRevenue(filter) {
    layers = ["AutoDCR:Revenue_1"];
    layers.forEach(function (layerName) {
        var urlm =
            "https://portal.geopulsea.com//geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" +
            layerName +
            "&CQL_FILTER=" +
            filter +
            "&outputFormat=application/json";
        $.getJSON(urlm, function (data) {
            geojson = L.geoJson(data, {});

            var latitudeDegreesInput = document.querySelector('input[name="latitudeDegrees[]"]');
            var latitudeMinutesInput = document.querySelector('input[name="latitudeMinutes[]"]');
            var longitudeDegreesInput = document.querySelector('input[name="longitudeDegrees[]"]');
            var longitudeMinutesInput = document.querySelector('input[name="longitudeMinutes[]"]');
            

            // Update latitude input field
            latsouth = parseInt(Math.floor(geojson.getBounds()._southWest.lat))
            latnorth = parseInt(Math.floor(geojson.getBounds()._northEast.lat))
            latsouthM = parseInt(Math.floor((geojson.getBounds()._southWest.lat % 1)*60))
            latnorthM = parseInt(Math.floor((geojson.getBounds()._northEast.lat % 1)*60))

           
            // for degree upadates lattitude
            if (latsouth === latnorth) {
                // console.log("heeee");
                // console.log(latsouth, latnorth);
                latitudeDegreesInput.removeAttribute('readonly');
                latitudeDegreesInput.value = latsouth;
                latitudeDegreesInput.setAttribute('readonly', 'readonly');
            } else {
                latitudeDegreesInput.removeAttribute('readonly');
                latitudeDegreesInput.removeAttribute('value');
                latitudeDegreesInput.setAttribute('min', latsouth);
                latitudeDegreesInput.setAttribute('max', latnorth);
            }
            
            // for minutes update only latitude

            if (latsouthM === latnorthM) {
                // console.log("heeee");
                // console.log(latsouthM, latnorthM);
                latitudeMinutesInput.removeAttribute('readonly');
                latitudeMinutesInput.removeAttribute('value');
                latitudeMinutesInput.value = latsouthM;
                latitudeMinutesInput.setAttribute('readonly', 'readonly');
            } else {
                latitudeMinutesInput.removeAttribute('readonly');
                latitudeMinutesInput.removeAttribute('value');
                latitudeMinutesInput.setAttribute('min', latsouthM);
                latitudeMinutesInput.setAttribute('max', latnorthM);
            }

            lngsouth = parseInt(Math.floor(geojson.getBounds()._southWest.lng))
            lngnorth = parseInt(Math.floor(geojson.getBounds()._northEast.lng))
            lngsouthM = parseInt(Math.floor((geojson.getBounds()._southWest.lng % 1)*60))
            lngnorthM = parseInt(Math.floor((geojson.getBounds()._northEast.lng % 1)*60))
            console.log(lngsouth,lngnorth)

            // for longitude degree update
            if(lngsouth === lngnorth){
                // console.log("heeee")
                // console.log(lngsouth,lngnorth)
                longitudeDegreesInput.removeAttribute('value');
                longitudeDegreesInput.value = lngnorth;
                longitudeDegreesInput.setAttribute('readonly', 'readonly');
            }else{

            // Update longitude input field
            // console.log("nooooooooooooooooo")
            longitudeDegreesInput.removeAttribute('readonly');
            longitudeDegreesInput.removeAttribute('value');
            longitudeDegreesInput.setAttribute('min',lngsouth);
            longitudeDegreesInput.setAttribute('max',lngnorth);
            }

            // for munites onlys longitude

            if(lngsouthM === lngnorthM){
                // console.log("heeee")
                // console.log(lngsouth,lngnorth)
                longitudeMinutesInput.removeAttribute('readonly')
                longitudeMinutesInput.removeAttribute('value');
                longitudeMinutesInput.value = lngnorthM;
                longitudeMinutesInput.setAttribute('readonly', 'readonly');
            }else{

            // Update longitude input field
            // console.log("nooooooooooooooooo")
            longitudeMinutesInput.removeAttribute('readonly');
            longitudeMinutesInput.removeAttribute('value');
            longitudeMinutesInput.setAttribute('min',lngsouthM);
            longitudeMinutesInput.setAttribute('max',lngnorthM);
            }

            map.fitBounds(geojson.getBounds());
        });
    });
}




// for uploading kml/kmz file and loading on map 
document.getElementById('fileInput').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        var kmlContent = e.target.result;
        if (file.name.toLowerCase().endsWith('.kmz')) {
            JSZip.loadAsync(file).then(function (zip) {
                var kmlFound = false;
                for (var name in zip.files) {
                    if (name.toLowerCase().endsWith('.kml')) {
                        kmlFound = true;
                        zip.files[name].async('string').then(function (kmlString) {
                            processKML(kmlString);
                        });
                        break;
                    }
                }
                if (!kmlFound) {
                    alert('No valid KML file found in the KMZ archive.');
                }
            });
        } else if (file.name.toLowerCase().endsWith('.kml')) {
            processKML(kmlContent);
        } else if (file.name.toLowerCase().endsWith('.csv')) {

            processCSV(kmlContent)

        } else {
            alert('Invalid file file.');
        }
    };
    reader.readAsText(file);
});

function processKML(kmlString) {
    var layer = omnivore.kml.parse(kmlString);
    if (layer.getBounds().isValid()) {
        layer.addTo(map);
        console.log(layer.toGeoJSON())
        // for saving coordinates
        var polygonId = 'polygon_kml'
        drawnPolygons[polygonId] = layer.toGeoJSON().features[0].geometry.coordinates;
        console.log(drawnPolygons, "drawnPolygons", "polygonCounter");

        map.fitBounds(layer.getBounds());
    } else {
        alert('Invalid KML/KMZ file.');
    }
}

function processCSV(kmlContent) {
    var data = Papa.parse(kmlContent, { header: true, dynamicTyping: true }).data;
    data = data.filter(row => row.latitude !== null && row.longitude !== null);
    var polygon = L.polygon(data.map(coord => [coord.latitude, coord.longitude])).addTo(map);
    if (polygon.getBounds().isValid()) {

        // for saving coordinates
        var polygonId = 'polygon_csv'
        drawnPolygons[polygonId] = polygon.toGeoJSON().geometry.coordinates;
        console.log(drawnPolygons, "drawnPolygons", "polygonCounter");


        map.fitBounds(polygon.getBounds());
    } else {
        alert('Invalid csv file.');
    }
}


// for adding coordinates manulay



document.getElementById('toggleFormBtn').addEventListener('click', function () {
    var selectedVillage = document.getElementById("search_type").value;
    console.log(selectedVillage,"selectedVillage")

    
    var formContainer = document.getElementById('formContainer');
    formContainer.style.display = (formContainer.style.display === 'none') ? 'block' : 'none';
});

document.getElementById('closeFormBtn').addEventListener('click', function () {

    var formContainer = document.getElementById('formContainer');
    formContainer.style.display = 'none';
});
$('#formContainer').draggable();

// Show one row initially
var table = document.getElementById('coordinateTable');
addCoordinateRow(table);

// Event listener for adding more rows
document.getElementById('addRowBtn').addEventListener('click', function () {
    addCoordinateRow(table);
});




function updateFirstRowValues(table) {
    var firstRow = table.rows[1]; // Index 0 is the header row
    var longitudeDegreesInput = firstRow.cells[0].querySelector('input[name="longitudeDegrees[]"]');
    var longitudeMinutesInput = firstRow.cells[1].querySelector('input[name="longitudeMinutes[]"]');
    var latitudeDegreesInput = firstRow.cells[3].querySelector('input[name="latitudeDegrees[]"]');
    var latitudeMinutesInput = firstRow.cells[4].querySelector('input[name="latitudeMinutes[]"]');

    // Update the values and properties in the new row
    var newLongitudeDegreesInput = table.rows[table.rows.length - 1].cells[0].querySelector('input[name="longitudeDegrees[]"]');
    var newLongitudeMinutesInput = table.rows[table.rows.length - 1].cells[1].querySelector('input[name="longitudeMinutes[]"]');
    var newLatitudeDegreesInput = table.rows[table.rows.length - 1].cells[3].querySelector('input[name="latitudeDegrees[]"]');
    var newLatitudeMinutesInput = table.rows[table.rows.length - 1].cells[4].querySelector('input[name="latitudeMinutes[]"]');

    newLongitudeDegreesInput.value = longitudeDegreesInput.value;
    newLongitudeDegreesInput.setAttribute('min', longitudeDegreesInput.getAttribute('min'));
    newLongitudeDegreesInput.setAttribute('max', longitudeDegreesInput.getAttribute('max'));

    newLongitudeMinutesInput.value = longitudeMinutesInput.value;
    newLongitudeMinutesInput.setAttribute('min', longitudeMinutesInput.getAttribute('min'));
    newLongitudeMinutesInput.setAttribute('max', longitudeMinutesInput.getAttribute('max'));

    newLatitudeDegreesInput.value = latitudeDegreesInput.value;
    newLatitudeDegreesInput.setAttribute('min', latitudeDegreesInput.getAttribute('min'));
    newLatitudeDegreesInput.setAttribute('max', latitudeDegreesInput.getAttribute('max'));

    newLatitudeMinutesInput.value = latitudeMinutesInput.value;
    newLatitudeMinutesInput.setAttribute('min', latitudeMinutesInput.getAttribute('min'));
    newLatitudeMinutesInput.setAttribute('max', latitudeMinutesInput.getAttribute('max'));
}





function addCoordinateRow(table) {
    // var selectedVillage = document.getElementById("search_type").value;
    // console.log(selectedVillage,"selectedVillage")
    var row = table.insertRow();
    var longitudeDegreesCell = row.insertCell();
    var longitudeMinutesCell = row.insertCell();
    var longitudeSecondsCell = row.insertCell();
    var latitudeDegreesCell = row.insertCell();
    var latitudeMinutesCell = row.insertCell();
    var latitudeSecondsCell = row.insertCell();
    var actionCell = row.insertCell();
    // degreee-----------------------------------

    var longitudeDegreesInput = document.createElement('input');
    longitudeDegreesInput.setAttribute('type', 'number');
    longitudeDegreesInput.setAttribute('placeholder', '75°');
    longitudeDegreesInput.setAttribute('name', 'longitudeDegrees[]');
    longitudeDegreesInput.setAttribute('readonly', 'readonly');
    longitudeDegreesInput.value = '73';
    longitudeDegreesInput.style.width = '50px';
    longitudeDegreesInput.style.position = 'absolute';
    longitudeDegreesInput.style.left = '5%';
    longitudeDegreesInput.style.borderBottomLeftRadius = '5px';
    longitudeDegreesInput.style.borderTopLeftRadius = '5px';
    longitudeDegreesInput.style.borderTop = '2px solid #3c3cb8';
    longitudeDegreesInput.style.borderLeft = '2px solid #3c3cb8';
    longitudeDegreesInput.style.borderBottom = '2px solid #3c3cb8';
    longitudeDegreesInput.style.borderRight = '2px solid  #3c3cb8';
    


    // minutes--------------------------------------------------
    var longitudeMinutesInput = document.createElement('input');
    longitudeMinutesInput.setAttribute('type', 'number');
    longitudeMinutesInput.setAttribute('placeholder', '51′');
    longitudeMinutesInput.setAttribute('name', 'longitudeMinutes[]');
    longitudeMinutesInput.setAttribute('readonly', 'readonly');
    longitudeMinutesInput.style.width = '50px';
    longitudeMinutesInput.style.position = 'absolute';
    longitudeMinutesInput.style.left = '16%';
    // longitudeMinutesInput.style.marginRight = '5px';
    longitudeMinutesInput.style.borderTop = '2px solid  #3c3cb8';
    longitudeMinutesInput.style.borderBottom = '2px solid  #3c3cb8';
    longitudeMinutesInput.style.borderLeft = '2px solid  #bbb';
    longitudeMinutesInput.style.borderRight = '2px solid  #bbb';


    // second--------------------------------------------------------------
    var longitudeSecondsInput = document.createElement('input');
    longitudeSecondsInput.setAttribute('type', 'number');
    longitudeSecondsInput.setAttribute('placeholder', '24.43″');
    longitudeSecondsInput.setAttribute('name', 'longitudeSeconds[]');
    longitudeSecondsInput.setAttribute('step', 'any');
    longitudeSecondsInput.style.width = '65px';
    longitudeSecondsInput.style.position = 'absolute';
    longitudeSecondsInput.style.left = '28%';
    // longitudeSecondsInput.style.marginRight = '5px'; 
    longitudeSecondsInput.style.borderTop = '2px solid  #3c3cb8';
    longitudeSecondsInput.style.borderBottom = '2px solid #3c3cb8';
    longitudeSecondsInput.style.borderRight = '2px solid #3c3cb8';
    longitudeSecondsInput.style.borderLeft = '2px solid  #bbb';
    longitudeSecondsInput.style.borderTopRightRadius = '5px';
    longitudeSecondsInput.style.borderBottomRightRadius = '5px';


    // latdegree----------------------

    var latitudeDegreesInput = document.createElement('input');
    latitudeDegreesInput.setAttribute('type', 'number');
    latitudeDegreesInput.setAttribute('placeholder', '18°');
    latitudeDegreesInput.setAttribute('name', 'latitudeDegrees[]');
    latitudeDegreesInput.setAttribute('readonly', 'readonly');
    latitudeDegreesInput.value = '18';
    latitudeDegreesInput.style.width = '50px';
    latitudeDegreesInput.style.position = 'absolute';
    latitudeDegreesInput.style.left = '46%';
    // latitudeDegreesInput.style.marginRight = '15px'; 
    latitudeDegreesInput.style.borderBottomLeftRadius = '5px';
    latitudeDegreesInput.style.borderTopLeftRadius = '5px';
    latitudeDegreesInput.style.borderTop = '2px solid #3c3cb8';
    latitudeDegreesInput.style.borderLeft = '2px solid #3c3cb8';
    latitudeDegreesInput.style.borderBottom = '2px solid #3c3cb8';
    latitudeDegreesInput.style.borderRight = '2px solid  #3c3cb8';

    // latMinute----------------------------

    var latitudeMinutesInput = document.createElement('input');
    latitudeMinutesInput.setAttribute('type', 'number');
    latitudeMinutesInput.setAttribute('placeholder', '51′');
    latitudeMinutesInput.setAttribute('name', 'latitudeMinutes[]');
    latitudeMinutesInput.setAttribute('readonly', 'readonly');
    latitudeMinutesInput.style.width = '45px';
    latitudeMinutesInput.style.position = 'absolute';
    latitudeMinutesInput.style.left = '55%';
    latitudeMinutesInput.style.borderTop = '2px solid  #3c3cb8';
    latitudeMinutesInput.style.borderBottom = '2px solid  #3c3cb8';
    latitudeMinutesInput.style.borderLeft = '2px solid  #bbb';
    latitudeMinutesInput.style.borderRight = '2px solid  #3c3cb8';


    // latsecond-----------------------------------------

    var latitudeSecondsInput = document.createElement('input');
    latitudeSecondsInput.setAttribute('type', 'number');
    latitudeSecondsInput.setAttribute('placeholder', '24.43″');
    latitudeSecondsInput.setAttribute('name', 'latitudeSeconds[]');
    latitudeSecondsInput.setAttribute('step', 'any');
    latitudeSecondsInput.style.width = '65px';
    latitudeSecondsInput.style.position = 'absolute';
    latitudeSecondsInput.style.left = '65%';
    latitudeSecondsInput.style.borderTop = '2px solid  #3c3cb8';
    latitudeSecondsInput.style.borderBottom = '2px solid #3c3cb8';
    latitudeSecondsInput.style.borderRight = '2px solid #3c3cb8';
    latitudeSecondsInput.style.borderLeft = '2px solid  #bbb';
    latitudeSecondsInput.style.borderTopRightRadius = '5px';
    latitudeSecondsInput.style.borderBottomRightRadius = '5px';



    // latitudeSecondsInput.style.marginRight = '5px'; 
        longitudeDegreesCell.appendChild(longitudeDegreesInput);
    longitudeMinutesCell.appendChild(longitudeMinutesInput);
    longitudeSecondsCell.appendChild(longitudeSecondsInput);
    latitudeDegreesCell.appendChild(latitudeDegreesInput);
    latitudeMinutesCell.appendChild(latitudeMinutesInput);
    latitudeSecondsCell.appendChild(latitudeSecondsInput);


    updateFirstRowValues(table);

    actionCell.innerHTML = '<button type="button" class="deleteRowBtn"><i class="fa-solid fa-trash-can"></i></button>';
    // Add event istener to delete button
    var deleteBtn = actionCell.querySelector('.deleteRowBtn');

    deleteBtn.addEventListener('click', function () {
        row.remove();
        updateFirstRowValues(table);
    });
}

document.getElementById('coordinateForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    var coordinates = [];
    console.log("Form submitted. Form data:", formData);
    // Process form data here
    formData.getAll('longitudeDegrees[]').forEach(function (longitudeDegrees, index) {
        var longitudeMinutes = formData.getAll('longitudeMinutes[]')[index];
        var longitudeSeconds = formData.getAll('longitudeSeconds[]')[index];
        var latitudeDegrees = formData.getAll('latitudeDegrees[]')[index];
        var latitudeMinutes = formData.getAll('latitudeMinutes[]')[index];
        var latitudeSeconds = formData.getAll('latitudeSeconds[]')[index];

        // Parse DMS strings into decimal degrees
        var parsedLongitude = parseDMS(longitudeDegrees, longitudeMinutes, longitudeSeconds);
        var parsedLatitude = parseDMS(latitudeDegrees, latitudeMinutes, latitudeSeconds);
        coordinates.push([parsedLatitude, parsedLongitude]);
    });


    markershow = [];
    // Add markers to the map
    if (coordinates.length < 4) {
        alert('Please enter at least four coordinates.');
        return;
    } else {
        var polygon = L.polygon(coordinates).addTo(map);
        map.fitBounds(polygon.getBounds());

        var polygonId = 'polygon_coors'
        drawnPolygons[polygonId] = polygon.toGeoJSON().geometry.coordinates;

        console.log(drawnPolygons, "drawnPolygons", "polygonCounter");
    }
});

// Function to parse DMS format to decimal degrees
function parseDMS(degrees, minutes, seconds) {
    return parseFloat(degrees) + parseFloat(minutes) / 60 + parseFloat(seconds) / 3600;
}

function getSelectedValues1() {
    var selectedValues = [];
    $('input[type="checkbox"]:checked').each(function () {
        var name = $(this).attr('name');
        if (name !== undefined) {
            selectedValues.push(name);
        }
    });
    return selectedValues;
}


let filters = '';

$("#search_type").change(function () {
    var selectedValueVillage = $(this).val();
    var Village_name = 'village_name'
    filters = `${Village_name} = '${selectedValueVillage}'`;
});

// Function to return the filters value
function getFilters() {
    return filters;
}


function savevalues() {

    Object.keys(drawnPolygons).forEach(async function (polygonId) {
        var coordinates = drawnPolygons[polygonId];
        // console.log(coordinates,"drawcoordinates")
        var pp = turf.polygon(coordinates);
        L.geoJSON(pp).addTo(map)
        var bounds = L.geoJSON(pp).getBounds();
        map.fitBounds(bounds);
        var layers = ["AutoDCR:Revenue_1"];
        // Aviation_data
        // var layers1 = ["AutoDCR:Aviation_data"];
        var url = "https://portal.geopulsea.com//geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=";
        var propertyName = "village_name,TPS_Name,Gut_No,geom";
        // var propertyName1 = "zone,distance,elevation,geom";
        var outputFormat = "application/json";
        // IntersectwithASLM(pp, layers1, url, propertyName1, bounds.toBBoxString(), outputFormat)
        var values =  await IntersectAreaWithPolygon(pp, layers, url, propertyName, bounds.toBBoxString(), outputFormat)
        // IntersectwithASLM(pp, layers, url, propertyName, bounds.toBBoxString(), outputFormat)
        var cqlFilterget = getSelectedValues()
        const selected_dropdown = JSON.stringify(cqlFilterget)
        const villageName =  JSON.stringify(values);
        const selected_guts = JSON.stringify(getSelectedValues1());
        const selected_village = JSON.stringify(getFilters());
        const coordinates1= coordinates[0].map(coord => [coord[0], coord[1]]);
        // console.log(cqlFilterget,"cqlFilterget",selected_dropdown,"selected_dropdown",villageName,"villageName",selected_guts,"selected_guts",selected_village,"selected_village")

        $.ajax({
            type: "POST",
            url: "APIS/savevalues.php",
            contentType: "application/json",
            data: JSON.stringify({
                coordinates: coordinates1,
                village_name: villageName,
                gut_num: selected_dropdown,
                selectedvillage:selected_village,
                selectedguts:selected_guts

            }),
            success: function (response) {
              
                console.log("Coordinates saved successfully");
                localStorage.setItem('lastInsertedPlotBoundaryId', response.data.id);

                // if(response.data.id != undefined){
                //    window.location.href = 'data.html';
                // }
                
                
            },
            error: function (xhr, status, error) {
                console.error("Failed to save coordinates:", error);
            }
        });

        
   
		$.ajax({
            url: ' http://115.124.100.250/AutoDCR.Integration/GisExim.svc/getPlotGISDetails',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                Token: token,
                Parcel: {
                    Location: [
                        {
                            LocationCode: handshakingCode,
                            SurveyNo: selected_guts,
                            PlotNo: '',
                            CTS: '',
                            Peth: '',
                        },
                    ],
                    //blank
                    LandUseZone: '',
                    PlotGeoJSON: {
                        type: 'Feature',
                        properties: {
                            PolygonKey: '8650',
                            PolygonArea: '493.74',
                            Centroid: [73.941016, 18.508117],
                        },
                        geometry: {
                            type: 'Polygon',
                            coordinates: [coordinates1],
                        },
                    },
                    Buildings: [],
                    NOCDocuments: [],
                },
            }),
            success: function (response) {
                console.log('API response received:', response);
                   if(response.Status){
                   window.location.href = 'data.html';
                }
            },
            error: function (xhr, status, error) {
                console.error('Error calling API:', xhr.responseText);
            },
        });
    
    });
  
}

document.getElementById("getinfo").onclick = function() {
    infovalues()
};
function infovalues() {
    if (Object.keys(drawnPolygons).length === 0) {
        alert("No coordinates drawn on map.");
        return; // Exit the function early
    }

    Object.keys(drawnPolygons).forEach(async function (polygonId) {
        var coordinates = drawnPolygons[polygonId];
        console.log(coordinates,"drawcoordinates")
        var pp = turf.polygon(coordinates);
        L.geoJSON(pp).addTo(map)
        var bounds = L.geoJSON(pp).getBounds();
        map.fitBounds(bounds);
        var layers1 = ["AutoDCR:Aviation_data"];
        var url = "https://portal.geopulsea.com//geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=";
        var propertyName1 = "zone,distance,elevation,geom";
        var outputFormat = "application/json";
        IntersectwithASLM(pp, layers1, url, propertyName1, bounds.toBBoxString(), outputFormat)
        console.log("working")

    })
};

async function IntersectAreaWithPolygon(drawnPolygon, layers, url, propertyName, bounds, outputFormat) {  
    let summaryByVillage = [];
    
    let requests = layers.map(function (layerName) {
        var urlm = url + layerName +
            "&propertyName=" + propertyName + "&bbox=" +
            bounds +
            "&outputFormat=" + outputFormat;
  
       
        return new Promise((resolve, reject) => {
            $.getJSON(urlm, function (data) {
                if (data && data.features && data.features.length > 0) {
                    var intersectedFeatures = [];
                    data.features.forEach(function (feature) {
                        var intersectedFeature = turf.intersect(feature, drawnPolygon);
                        if (intersectedFeature && intersectedFeature.geometry.type !== 'GeometryCollection') {
                            intersectedFeature.properties = feature.properties;
                            intersectedFeatures.push(intersectedFeature);
                        }
                    });
                    var intersectedLayer = L.geoJSON(intersectedFeatures, {
                        style: {
                            color: 'red',
                            weight: 2
                        }
                    });
                    intersectedLayer.addTo(map);
                    intersectedLayer.eachLayer(function (layer) {
                        var properties = layer.feature.properties;
                        var area = turf.area(layer.feature);
                        layer.bindPopup(`Area: ${area.toFixed(2)} sq meters<br>Properties: ${JSON.stringify(properties)}`);
                        
                    });
                                        intersectedFeatures.forEach(function (feature) {
                        var properties = feature.properties;
                        var villageName = properties.village_name;
                        var area = turf.area(feature);
                        properties.area = area;
                        summaryByVillage.push(properties);
                    });
                    resolve(summaryByVillage); 
                } else {
                    console.log('No valid features found in the response.');
                    resolve([]); 
                }
            }).fail(function() {
                console.error("Error fetching data for layer: " + layerName);
                reject(); 
            });
        });
    });
    
    const results = await Promise.all(requests);
    let combinedSummary = [].concat(...results);
    return combinedSummary;
}



 function IntersectwithASLM(drawnPolygon, layers, url, propertyName, bounds, outputFormat) {  
    var distancefromNDA = []
    var distancefromPuneairport = []
    let requests = layers.map(function (layerName) {
        var urlm = url + layerName +
            "&propertyName=" + propertyName + "&bbox=" +
            bounds +
            "&outputFormat=" + outputFormat;
       
        return new Promise((resolve, reject) => {
            $.getJSON(urlm, function (data) {
                if (data && data.features && data.features.length > 0) {
                    var intersectedFeatures = [];
                    data.features.forEach(function (feature) {
                        var intersectedFeature = turf.intersect(feature, drawnPolygon);
                        if (intersectedFeature && intersectedFeature.geometry.type !== 'GeometryCollection') {
                            intersectedFeature.properties = feature.properties;
                            intersectedFeatures.push(intersectedFeature);
                            var nearestPoint = turf.nearestPointOnLine(turf.polygonToLine(intersectedFeature.geometry), turf.point([73.779043, 18.472787]));
                            var distance = turf.distance(turf.point([73.779043, 18.472787]), nearestPoint, { units: 'meters' });
                            distancefromNDA.push(distance)
                            var nearestPoint = turf.nearestPointOnLine(turf.polygonToLine(intersectedFeature.geometry), turf.point([73.917901,  18.582915]));
                            var distance1 = turf.distance(turf.point([73.917901,  18.582915]), nearestPoint, { units: 'meters' });
                            distancefromPuneairport.push(distance1)
                            
                        }
                    });
                    var intersectedLayer = L.geoJSON(intersectedFeatures, {
                        style: {
                            color: 'red',
                            weight: 2
                        }
                    });
                    intersectedLayer.addTo(map);
                    intersectedLayer.eachLayer(function (layer) {
                        var properties = layer.feature.properties;
                        var area = turf.area(layer.feature);
                        layer.bindPopup(`Area: ${area.toFixed(2)} sq meters<br>Zone: ${JSON.stringify(properties.zone)} <br> Distance: ${JSON.stringify(properties.distance)}  <br> Elevation: ${JSON.stringify(properties.elevation)}<br> Distance fromNDA : ${distancefromNDA.map(d => d.toFixed(3))} Meters. <br> Distance fromPune airport : ${distancefromPuneairport.map(d => d.toFixed(3))} Meters.`);
                        layer.openPopup();
                    });
                                        intersectedFeatures.forEach(function (feature) {
                        var properties = feature.properties;
                        var villageName = properties.village_name;
                        var area = turf.area(feature);
                        properties.area = area;
                        // summaryByVillage.push(properties);
                    });
                    // resolve(summaryByVillage); 
                } else {
                    console.log('No valid features found in the response.');
                    resolve([]); 
                }
            }).fail(function() {
                console.error("Error fetching data for layer: " + layerName);
                reject(); 
            });
        });
    });

}
