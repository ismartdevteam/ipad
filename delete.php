<?php

header("Content-type: application/json;charset=utf-8");


if (isset($_GET["id"])) {
    $id =$_GET["id"];
       include_once './db_connect.php';
        // connecting to database
     $db = new DB_Connect();
       $db->connect();

    $query = 'delete from document where id="'.$id.'%"  ';
    $dbData=mysql_query($query);
    if ($dbData) {
        $result = 1;
    } else {
        $result = 2;
    }
}
else
{
   $result = 0;
}
echo json_encode($result);


