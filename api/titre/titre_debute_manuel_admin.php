<?php
include_once '../config/database.php';
//require_once 'protected.php';


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$conn = null;
$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();



$data = json_decode(file_get_contents("php://input"));
$id = $data->id;

$query = "UPDATE investissement_plan SET etat_investissement='DEBUTE',date_miseajour=now() WHERE id=$id AND etat_investissement<>'DEBUTE'";

if($conn->exec($query)>0){
  
    http_response_code(200);
    echo json_encode(array("message" => "Le titre a été débuté","status"=>200));

}
else{
    http_response_code(401);
    echo json_encode(array("message" => "Impossible de débuter le titre","error"=>$stmt->errorInfo,"status"=>400));
}
$conn = null;

?>