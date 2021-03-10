<?php
include_once './config/database.php';

require "vendor/autoload.php";
use \Firebase\JWT\JWT;

$monfichier = fopen('compteur.txt', 'w+');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$email = '';
$password = '';

$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();

$email = '';
$firstName = '';
$lastName = '';
$telephone = '';
$password = '';

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$firstName = $data->first_name;
$lastName = $data->last_name;
$telephone = $data->telephone;
$password = $data->password;
fputs($monfichier, json_encode($data)); 
fputs($monfichier, file_get_contents("php://input")); 
$table_name = 'users';
$query = "INSERT INTO " . $table_name . "
                SET first_name = :firstname,
                    last_name = :lastname,
                    email = :email,
                    password = :password";
$stmt = $conn->prepare($query);
$stmt->bindParam(':firstname', $firstName);
$stmt->bindParam(':lastname', $lastName);
$stmt->bindParam(':email', $email);
$password_hash = password_hash($password, PASSWORD_BCRYPT);

$stmt->bindParam(':password', $password_hash);

if($stmt->execute()){

    http_response_code(200);
    echo json_encode(array("message" => "User was successfully registered."));
}
else{
    http_response_code(400);

    echo json_encode(array("message" => "Unable to register the user."));
}
$conn=null;  

}
?>