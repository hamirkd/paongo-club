<?php
include_once './config/database.php';
require "vendor/autoload.php";

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$firstName = $data->firstName;
$lastName = $data->lastName;
$telephone = $data->telephone;
$password = $data->password;


$table_name = 'users';
$query = "INSERT INTO " . $table_name . "
                SET email = :email,
                    last_name = :lastname,
                    first_name = :firstname,
                    telephone = :telephone,
                    password = :password";
                    
$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();
$stmt = $conn->prepare($query);
$stmt->bindParam(':firstname', $firstName);
$stmt->bindParam(':lastname', $lastName);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':telephone', $telephone);
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



?>