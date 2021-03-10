<?php
include_once './config/database.php';
require "vendor/autoload.php";

$table_name = 'users';

$data = json_decode(file_get_contents("php://input"));

$first_name = $data->first_name;
$last_name = $data->last_name;
$telephone = $data->telephone;
$email = $data->email;
$password = $data->password;
$password_hash = password_hash($password, PASSWORD_BCRYPT);

$query = "INSERT INTO ".$table_name." (first_name,last_name,email,telephone,password)
                VALUES ('$first_name','$last_name', '$email', '$telephone', '$password_hash') ";

$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();
$stmt = $conn->prepare($query);
$l=$stmt->execute();

$conn=null;

if($l){
    http_response_code(200);
    echo json_encode(array("message" => "User was successfully created", "status"=>200));
}
else {
    echo json_encode(array("message" => "Unable to create the user", "status"=>400));
}

?>