<?php
include_once '../config/database.php';
//require_once 'protected.php';


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();



$data = json_decode(file_get_contents("php://input"));
$nomprenom = $data->nomprenom;
$email = $data->email;
$telephone = $data->telephone;
$plan = $data->plan;
$montant = $data->montant;
$query = "INSERT INTO investissement_plan SET nomprenom='$nomprenom',emailadresse='$email',telephone='$telephone',plan='$plan',montant='$montant',etat_paiement='NON_PAYEE'";


if($conn->exec( $query )>0){
  
    http_response_code(200);
    echo json_encode(array("message" => "Le titre a été ajouté","status"=>200));

}
else{
    http_response_code(400);
    echo json_encode(array("message" => "Impossible d'ajouter le titre","error"=>$stmt->errorInfo,"status"=>400));
}
$conn=null;

?>