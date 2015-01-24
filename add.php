<?php

header("Content-type: application/json;charset=utf-8");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
    $path=$request->path;
    $name=$request->name;
    $type=$request->type;


if (isset($name)&&isset($path)&&isset($type) ) {
      include_once './db_connect.php';
        // connecting to database
    $db = new DB_Connect();
    $db->connect();
    $query = 'insert into document values (null,"'.$name.'","'.mysql_real_escape_string($path).'",now(),"'.$type.'")';

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


