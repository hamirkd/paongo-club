<?php
include_once './config/database.php';
require "vendor/autoload.php";
$id = $_GET['id'];


$table_name = 'users';

$data = json_decode(file_get_contents("php://input"));

$first_name = $data->first_name;
$last_name = $data->last_name;
$occupation = $data->occupation;
$telephone = $data->telephone;
$physical_address = $data->physical_address;
$town = $data->town;
$country = $data->country;
$postal_code = $data->postal_code;
$s_first_name = $data->s_first_name;
$s_last_name = $data->s_last_name;
$s_town = $data->s_town;
$s_country = $data->s_country;
$s_postal_code = $data->s_postal_code;
$s_telephone = $data->s_telephone;
$description = $data->description;

$query = "UPDATE " . $table_name . "
                SET 
                first_name = :first_name,
                last_name = :last_name,
                occupation = :occupation,
                telephone = :telephone,
                physical_address = :physical_address,
                town = :town,
                country = :country,
                postal_code = :postal_code,
                s_first_name = :s_first_name,
                s_last_name = :s_last_name,
                s_town = :s_town,
                s_country = :s_country,
                s_postal_code = :s_postal_code,
                s_telephone = :s_telephone,
                description = :description WHERE id=:id";

$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();
$stmt = $conn->prepare($query);
$stmt->bindParam(':id' , $id);
$stmt->bindParam(':first_name' , $first_name);
$stmt->bindParam(':telephone' , $telephone);
$stmt->bindParam(':last_name' , $last_name);
$stmt->bindParam(':occupation' , $occupation);
$stmt->bindParam(':physical_address' , $physical_address);
$stmt->bindParam(':town' , $town);
$stmt->bindParam(':country' , $country);
$stmt->bindParam(':postal_code' , $postal_code);
$stmt->bindParam(':s_first_name' , $s_first_name);
$stmt->bindParam(':s_last_name' , $s_last_name);
$stmt->bindParam(':s_town' , $s_town);
$stmt->bindParam(':s_country' , $s_country);
$stmt->bindParam(':s_postal_code' , $s_postal_code);
$stmt->bindParam(':s_telephone' , $s_telephone);
$stmt->bindParam(':description' , $description);

if($stmt->execute()){

    http_response_code(200);
    echo json_encode(array("message" => "User was successfully updated.","status"=>200));
}
else{
    http_response_code(400);

    echo json_encode(array("message" => "Unable to update the user.","status"=>400));
}
$conn=null;
?>