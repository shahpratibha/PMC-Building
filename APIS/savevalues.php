<?php
require('config.php');

header('Content-Type: application/json');


try {
    if (!isset($pdo)) {
        throw new Exception("PDO connection not found. Please check your configuration.");
    }

    $rawData = json_decode(file_get_contents('php://input'), true);
    $villageName = $rawData['village_name'] ?? null;
    $gutNo = $rawData['gut_num'] ?? null;
    $geometry = $rawData['coordinates'] ?? null;

    
    if ($geometry === null) {
        throw new Exception("Geometry (coordinates) data is missing.");
    }

    $geoJSON = [
        'type' => 'Polygon',
        'coordinates' => [$geometry], 
    ];
    $geometryJSON = json_encode($geoJSON);

    $query = "INSERT INTO PlotBoundary (village_name, gut_no, geometry) VALUES (:villageName, :gutNo, ST_GeomFromGeoJSON(:geometry))";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':villageName', $villageName);
    $statement->bindParam(':gutNo', $gutNo);
    $statement->bindParam(':geometry', $geometryJSON);

    if ($statement->execute()) {
        
        echo json_encode(['success' => true, 'message' => 'Coordinates saved successfully']);
    } else {
        throw new Exception("Failed to insert data into the database.");
    }

} catch (Exception $e) {
    echo json_encode(['error' => true, 'message' => $e->getMessage()]);
}
?>
