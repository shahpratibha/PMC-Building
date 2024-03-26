<?php
require('config.php');
header('Content-Type: application/json');


try {
    // Establish a connection to the database (assuming $pdo is defined in config.php)
    if (!isset($pdo)) {
        throw new Exception("PDO connection not found. Please check your configuration.");
    }



        $data = json_decode(file_get_contents('php://input'), true);
        $selectedValues = $data['selectedValues'];
        echo $selectedValues;


echo json_encode($data);
} catch (Exception $e) {
    // Handle any exceptions
    echo json_encode(array('error' => $e->getMessage()));
}



?>