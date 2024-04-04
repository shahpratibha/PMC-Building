<?php
require('config.php');

header('Content-Type: application/json');

try {
    if (!isset($pdo)) {
        throw new Exception("PDO connection not found. Please check your configuration.");
    }

    $rawData = file_get_contents('php://input');
    // $coordinates = json_decode($rawData, true);
    // print_r($rawData); 

    // foreach ($coordinates as $coordinate) {
        // Extract values from each coordinate
        $villageName = isset($rawData['village_name']) ? $rawData['village_name'] : null;
        print_r($villageName);
        $gutNo = isset($rawData['gut_num']) ? $rawData['gut_num'] : null;
        $geometry = isset($rawData['coordinates']) ? $rawData['coordinates'] : null;

        // Prepare and execute the SQL query
        $query = "INSERT INTO PlotBoundary (village_name, gut_no, geometry) VALUES (:villageName, :gutNo, ST_GeomFromGeoJSON(:geometry))";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':villageName', $villageName);
        $statement->bindParam(':gutNo', $gutNo);
        $statement->bindParam(':geometry', $geometry);
        $result = $statement->execute();
        print_r($result);

        try {
            // $stmt->execute();
            $statement->execute();
            // $lastInsertId = $pdo->lastInsertId();
            //  echo json_encode(["message" => "Data successfully saved to the database", "lastInsertId" => $lastInsertId]);
        } catch (PDOException $e) {
            echo json_encode(["error" => $e->getMessage()]);
            exit;
        }





        if (!$result) {
            throw new Exception("Failed to insert data into the database.");
        }
    // }

    echo json_encode(['success' => true, 'message' => 'Coordinates saved successfully']);

} catch (Exception $e) {
    echo json_encode(['error' => true, 'message' => $e->getMessage()]);
}
?>
