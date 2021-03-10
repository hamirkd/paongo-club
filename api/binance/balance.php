<?php
require '../vendor/autoload.php';
// 1. config in home directory
// $api = new Binance\API();
// 2. config in specified file
// $api = new Binance\API( "somefile.json" );
// 3. config by specifying api key and secret
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$plan = $_GET['plan'];

if($plan == 'Argent'){
    argent();
}
    function argent(){
        $api = new Binance\API("89ffa4c3393fe44e36d1ee674ce6c00fb4e62c89239f1115a5c566e49b7fec09",
        "6e8b8649de96ca18cafdd4bba878abd22ede84dc2b78c14ff85faa9b5ab62f45");
        // $api = new Binance\API("pOyLqIz8FdGeH1ikheBFgTBob6Ch6bjWPQXMOwVJKxuEgHmeTxqhJMXjFkBnWYQL",
        // "ykg8cFMDkpaMhtUARfqvFWOuYIWU0UHILkgzyFeYsfxhUQnGGz6PIHGClkgK25VX");

        $ticker = $api->prices(); // Make sure you have an updated ticker object for this to work
        $balances = $api->balances($ticker);
        // print_r($balances);
        // echo "BTC owned: ".$balances['BTC']['available'].PHP_EOL;
        // echo "ETH owned: ".$balances['ETH']['available'].PHP_EOL;
        // echo "Estimated Value: ".$api->btc_value." BTC".PHP_EOL;
        echo json_encode(array(""=>$balances['BTC']['available'].PHP_EOL));
    }


?>