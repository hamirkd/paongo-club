<?php
include_once './config/database.php';
//require_once 'protected.php';


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");



$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();



$email = $_GET['email'];



$query = "SELECT id, nomprenom, telephone, emailadresse, plan, montant, moyenpaiement, adressepaiement, montantcrypto, montantcrypto_recu, transaction_code, transaction_hash, etat_paiement, date_paiement, date_creation, date_miseajour, etat_investissement
FROM investissement_plan WHERE emailadresse = ?";

$stmt = $conn->prepare( $query );
$stmt->bindParam(1, $email);
$stmt->execute();
$num = $stmt->rowCount();

if($num > 0){
    $i = 0;
  
  while ($row = $stmt->fetch()){
      $policies[$i]['id']    = $row['id'];
    $policies[$i]['plan'] = $row['plan'];
    $policies[$i]['montant'] = $row['montant'];
    $policies[$i]['moyenpaiement'] = $row['moyenpaiement'];
    $policies[$i]['etat_paiement'] = $row['etat_paiement'];
    $policies[$i]['etat_investissement'] = $row['etat_investissement'];
    $policies[$i]['date_miseajour'] = $row['date_miseajour'];
      $i++;
  }
    http_response_code(200);

  echo json_encode($policies);
}
else{
    http_response_code(401);
    echo json_encode(array("message" => "Impossible de recuperer une liste,","error"=>$stmt->errorInfo));
}
$conn=null;

?>