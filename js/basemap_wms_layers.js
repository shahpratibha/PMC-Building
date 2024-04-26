var map, geojson;
// const API_URL = "https://iwmsgis.pmc.gov.in/geopulse/autodcr/";
const API_URL = "http://localhost/autodcr";

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
    Aviation: aviation,
    Village: Village_Boundary,
    Revenue: Revenue_Layer1,
    PLU: PLU_Layer,
    DPRoad: DPRoad_Layer,

};

// let handshaking_codes = [
//     {"AutoDCR_Name": "Aundh", "code": "ADCR001", "name": "Aundh"},
//     {"AutoDCR_Name": "BALEWADI", "code": "ADCR002", "name": "BALEWADI"},
//     {"AutoDCR_Name": "BANER", "code": "ADCR003", "name": "BANER"},
//     {"AutoDCR_Name": "Baner North", "code": "ADCR003a", "name": "BANER"},
//     {"AutoDCR_Name": "Baner south", "code": "ADCR003b", "name": "BANER"},
//     {"AutoDCR_Name": "Baner West", "code": "ADCR003c", "name": "BANER"},
//     {"AutoDCR_Name": "BAWDHAN", "code": "ADCR004", "name": "BAWDHAN"},
//     {"AutoDCR_Name": "Bopodi", "code": "ADCR005", "name": "Bopodi"},
//     {"AutoDCR_Name": "Erandwana", "code": "ADCR006", "name": "Erandwana"},
//     {"AutoDCR_Name": "Erandwana North", "code": "ADCR006a", "name": "Erandwana"},
//     {"AutoDCR_Name": "Erandwana South", "code": "ADCR006b", "name": "Erandwana"},
//     {"AutoDCR_Name": "Hingne-budruk", "code": "ADCR007", "name": "Hingne-budruk"},
//     {"AutoDCR_Name": "KARVE NAGAR", "code": "ADCR008", "name": "KARVE NAGAR"},
//     {"AutoDCR_Name": "Khadki Navi", "code": "ADCR009", "name": "Khadki Navi"},
//     {"AutoDCR_Name": "KOTHRUD-NORTH", "code": "ADCR010", "name": "KOTHRUD"},
//     {"AutoDCR_Name": "Kothrud-South", "code": "ADCR011", "name": "KOTHRUD"},
//     {"AutoDCR_Name": "Pashan", "code": "ADCR012", "name": "Pashan"},
//     {"AutoDCR_Name": "Shivaji Nagar", "code": "ADCR013", "name": "TPS-I"},
//     {"AutoDCR_Name": "SHIVAJI NAGAR-BHAMBURDA", "code": "ADCR014", "name": "SHIVAJI NAGAR-BHAMBURDA"},
//     {"AutoDCR_Name": "SHIVANE", "code": "ADCR015", "name": "SHIVANE"},
//     {"AutoDCR_Name": "Shivane North", "code": "ADCR015a", "name": "SHIVANE"},
//     {"AutoDCR_Name": "Shivane South", "code": "ADCR015b", "name": "SHIVANE"},
//     {"AutoDCR_Name": "Warje", "code": "ADCR016", "name": "Warje"},
//     {"AutoDCR_Name": "Ambegaon Budruk-Ext", "code": "ADCR017", "name": "Ambegaon Budruk-Ext"},
//     {"AutoDCR_Name": "Ambegaon Khurd-Ext", "code": "ADCR018", "name": "Ambegaon Khurd-Ext"},
//     {"AutoDCR_Name": "AMBEGAON-BUDRUK", "code": "ADCR019", "name": "AMBEGAON-BUDRUK"},
//     {"AutoDCR_Name": "AMBEGAON-KHURD", "code": "ADCR020", "name": "AMBEGAON-KHURD"},
//     {"AutoDCR_Name": "Bhawani Peth", "code": "ADCR021", "name": "Bhawani Peth"},
//     {"AutoDCR_Name": "Bibwewadi-Munjeri", "code": "ADCR022", "name": "Bibwewadi-Munjeri"},
//     {"AutoDCR_Name": "BUDHWAR PETH", "code": "ADCR023", "name": "BUDHWAR PETH"},
//     {"AutoDCR_Name": "DHANKWADI", "code": "ADCR024", "name": "DHANKWADI"},
//     {"AutoDCR_Name": "DHANKWADI-EXT", "code": "ADCR025", "name": "DHANKWADI-EXT"},
//     {"AutoDCR_Name": "Dhanori", "code": "ADCR026", "name": "Dhanori"},
//     {"AutoDCR_Name": "DHANORI-EXT", "code": "ADCR027", "name": "DHANORI-EXT"},
//     {"AutoDCR_Name": "Dhayri", "code": "ADCR028", "name": "Dhayri"},
//     {"AutoDCR_Name": "Dhayri-Ext", "code": "ADCR029", "name": "Dhayri-Ext"},
//     {"AutoDCR_Name": "Fursungi", "code": "ADCR030", "name": "Fursungi"},
//     {"AutoDCR_Name": "Ganesh Peth", "code": "ADCR031", "name": "Ganesh Peth"},
//     {"AutoDCR_Name": "GANJ PETH", "code": "ADCR032", "name": "GANJ PETH"},
//     {"AutoDCR_Name": "Ghorpade peth", "code": "ADCR033", "name": "Ghorpade peth"},
//     {"AutoDCR_Name": "Ghorpadi", "code": "ADCR034", "name": "Ghorpadi"},
//     {"AutoDCR_Name": "Gultekdi", "code": "ADCR035", "name": "Gultekdi"},
//     {"AutoDCR_Name": "Gurwar Peth", "code": "ADCR036", "name": "Gurwar Peth"},
//     {"AutoDCR_Name": "Hadapsar", "code": "ADCR037", "name": "Hadapsar"},
//     {"AutoDCR_Name": "HADAPSAR-EXT", "code": "ADCR038", "name": "HADAPSAR-EXT"},
//     {"AutoDCR_Name": "HINGANE-KHURD", "code": "ADCR039", "name": "HINGANE-KHURD"},
//     {"AutoDCR_Name": "Kalas", "code": "ADCR040", "name": "Kalas"},
//     {"AutoDCR_Name": "KALAS EXT", "code": "ADCR041", "name": "KALAS EXT"},
//     {"AutoDCR_Name": "KASBA PETH", "code": "ADCR042", "name": "KASBA PETH"},
//     {"AutoDCR_Name": "KATRAJ", "code": "ADCR043", "name": "KATRAJ"},
//     {"AutoDCR_Name": "Katraj Ext", "code": "ADCR044", "name": "Katraj Ext"},
//     {"AutoDCR_Name": "Kharadi", "code": "ADCR045", "name": "Kharadi"},
//     {"AutoDCR_Name": "Kharadi East", "code": "ADCR045a", "name": "Kharadi"},
//     {"AutoDCR_Name": "Kharadi West", "code": "ADCR045b", "name": "Kharadi"},
//     {"AutoDCR_Name": "Kondhwa-Budruk", "code": "ADCR046", "name": "Kondhwa-Budruk"},
//     {"AutoDCR_Name": "Kondhwa-Budruk North", "code": "ADCR046a", "name": "Kondhwa-Budruk North"},
//     {"AutoDCR_Name": "Kondhwa-Budruk South", "code": "ADCR046b", "name": "Kondhwa-Budruk South"},
//     {"AutoDCR_Name": "Kondhwa-Khurd", "code": "ADCR047", "name": "Kondhwa-Khurd"},
//     {"AutoDCR_Name": "Kondwa khurd -EXT", "code": "ADCR048", "name": "Kondwa khurd -EXT"},
//     {"AutoDCR_Name": "KOREGAON PARK", "code": "ADCR049", "name": "KOREGAON PARK"},
//     {"AutoDCR_Name": "KOTHRUD-EXT", "code": "ADCR050", "name": "KOTHRUD-EXT"},
//     {"AutoDCR_Name": "Lohagaon", "code": "ADCR051", "name": "Lohagaon"},
//     {"AutoDCR_Name": "Lohagaon North", "code": "ADCR051a", "name": "Lohagaon"},
//     {"AutoDCR_Name": "Lohagaon South", "code": "ADCR051b", "name": "Lohagaon"},
//     {"AutoDCR_Name": "Lohgaon-Ext", "code": "ADCR052", "name": "Lohgaon-Ext"},
//     {"AutoDCR_Name": "Lohgaon-Ext North", "code": "ADCR052a", "name": "Lohgaon-Ext"},
//     {"AutoDCR_Name": "Lohgaon-Ext South", "code": "ADCR052b", "name": "Lohgaon-Ext"},
//     {"AutoDCR_Name": "LULLANAGAR", "code": "ADCR053", "name": "LULLANAGAR"},
//     {"AutoDCR_Name": "Mahatma Phule peth", "code": "ADCR054", "name": "Mahatma Phule peth"},
//     {"AutoDCR_Name": "MANGALWAR PETH", "code": "ADCR055", "name": "MANGALWAR PETH"},
//     {"AutoDCR_Name": "Market Yard", "code": "ADCR056", "name": "Market Yard"},
//     {"AutoDCR_Name": "Mohammadwadi", "code": "ADCR057", "name": "Mohammadwadi"},
//     {"AutoDCR_Name": "Mundhwa", "code": "ADCR058", "name": "Mundhwa"},
//     {"AutoDCR_Name": "Mundhwa North", "code": "ADCR058a", "name": "Mundhwa"},
//     {"AutoDCR_Name": "Mundhwa South", "code": "ADCR058b", "name": "Mundhwa"},
//     {"AutoDCR_Name": "Mundhwa-Keshavnagar", "code": "ADCR059", "name": "Mundhwa-Keshavnagar"},
//     {"AutoDCR_Name": "MUNJERI", "code": "ADCR060", "name": "MUNJERI"},
//     {"AutoDCR_Name": "Nana Peth", "code": "ADCR061", "name": "NANA PETH"},
//     {"AutoDCR_Name": "NARAYAN PETH", "code": "ADCR062", "name": "NARAYAN PETH"},
//     {"AutoDCR_Name": "Navipeth", "code": "ADCR063", "name": "NAVI PETH"},
//     {"AutoDCR_Name": "Parvati North", "code": "ADCR064", "name": "PARVATI"},
//     {"AutoDCR_Name": "Parvati South", "code": "ADCR065", "name": "PARVATI"},
//     {"AutoDCR_Name": "RASTA PETH", "code": "ADCR066", "name": "RASTA PETH"},
//     {"AutoDCR_Name": "RAVIWAR PETH", "code": "ADCR067", "name": "RAVIWAR PETH"},
//     {"AutoDCR_Name": "SADASHIV PETH", "code": "ADCR068", "name": "SADASHIV PETH"},
//     {"AutoDCR_Name": "Sadesatara  Nali-Hadapsar", "code": "ADCR069", "name": "Sadesatara  Nali-Hadapsar"},
//     {"AutoDCR_Name": "SANGANWADI TPS", "code": "ADCR070", "name": "SANGAMWADI TPS"},
//     {"AutoDCR_Name": "SHANIWAR PETH", "code": "ADCR071", "name": "SHANIWAR PETH"},
//     {"AutoDCR_Name": "Shivane-Ext", "code": "ADCR072", "name": "Shivane-Ext"},
//     {"AutoDCR_Name": "Shivane-Uttamnagar", "code": "ADCR073", "name": "SHIVANE"},
//     {"AutoDCR_Name": "SHUKRAWAR PETH", "code": "ADCR074", "name": "SHUKRAWAR PETH"},
//     {"AutoDCR_Name": "SOMWAR PETH", "code": "ADCR075", "name": "SOMWAR PETH"},
//     {"AutoDCR_Name": "Undri", "code": "ADCR076", "name": "Undri"},
//     {"AutoDCR_Name": "Undri-Ext", "code": "ADCR077", "name": "Undri-Ext"},
//     {"AutoDCR_Name": "Urali Devachi", "code": "ADCR078", "name": "Urali Devachi"},
//     {"AutoDCR_Name": "VADGAON-BUDRUK", "code": "ADCR079", "name": "VADGAON-BUDRUK"},
//     {"AutoDCR_Name": "Vadgaon-Khurd", "code": "ADCR080", "name": "Vadgaon-Khurd"},
//     {"AutoDCR_Name": "Vadgaon-Sheri", "code": "ADCR081", "name": "Vadgaon-Sheri"},
//     {"AutoDCR_Name": "VadgaonSheri-ext", "code": "ADCR082", "name": "VadgaonSheri-ext"},
//     {"AutoDCR_Name": "Wanawadi", "code": "ADCR083", "name": "WANAWADI"},
//     {"AutoDCR_Name": "Yerawada", "code": "ADCR084", "name": "YERWADA"},
//     {"AutoDCR_Name": "Yevlewadi", "code": "ADCR085", "name": "Yevlewadi"}
// ] ;


var control = new L.control.layers(baseLayers, WMSlayers).addTo(map);
control.setPosition('topright');



