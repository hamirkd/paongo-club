<?php
include_once './config/database.php';

require "vendor/autoload.php";
use \Firebase\JWT\JWT;


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$id = '';

$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();


$id = $_GET['id'];

$table_name = 'users';

$query = "SELECT id, first_name, last_name, email, telephone, occupation, physical_address, town, country, postal_code,
s_first_name, s_last_name, s_town, s_country, s_postal_code, s_telephone, description FROM users WHERE id = ? LIMIT 0,1";

$stmt = $conn->prepare( $query );
$stmt->bindParam(1, $id);
$stmt->execute();

$num = $stmt->rowCount();

if($num > 0){
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $id = $row['id'];
    $first_name = $row['first_name'];
    $last_name = $row['last_name'];
    $email = $row['email'];
    $telephone = $row['telephone'];
    $occupation = $row['occupation'];
    $physical_address = $row['physical_address'];
    $town = $row['town'];
    $country = $row['country'];
    $postal_code = $row['postal_code'];
    $s_first_name = $row['s_first_name'];
    $s_last_name = $row['s_last_name'];
    $s_town = $row['s_town'];
    $s_country = $row['s_country'];
    $s_postal_code = $row['s_postal_code'];
    $s_telephone = $row['s_telephone'];
    $description = $row['description'];

        http_response_code(200);
        echo json_encode(
            array(
                'id' => $id,
                'first_name' => $first_name,
                'last_name' => $last_name,
                'telephone' => $telephone,
                'email' => $email,
                'occupation' => $occupation,
                'physical_address' => $physical_address,
                'town' => $town,
                'country' => $country,
                'postal_code' => $postal_code,
                's_first_name' => $s_first_name,
                's_last_name' => $s_last_name,
                's_town' => $s_town,
                's_country' => $s_country,
                's_postal_code' => $s_postal_code,
                's_telephone' => $s_telephone,
                'description' => $description
            ));
    }
    else{

        http_response_code(401);
        echo json_encode(array("message" => "Impossible de retrouver cet utilisateur"));
    }
$conn=null;
    


?>