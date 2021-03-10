<?php
// used to get mysql database connection

class DatabaseService{
    
    private $db_host = "185.98.131.149";
    private $db_name = "paong1521537";
    private $db_user = "paong1521537";
    private $db_password = "1zoboq0oo2";
    private $connection;

    public function getConnection(){

        $this->connection = null;

        try{
            $this->connection = new PDO("mysql:host=" . $this->db_host . ";dbname=" . $this->db_name, $this->db_user, $this->db_password);
        }catch(PDOException $exception){
            echo "Connection failed: " . $exception->getMessage();
        }

        return $this->connection;
    }
}
?>