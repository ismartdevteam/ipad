<?php



    include_once './db_connect.php';
        // connecting to database
     $db = new DB_Connect();
       $db->connect();




$query = "SELECT * FROM document order by id desc";

$rslt = mysql_query($query);
$count = mysql_num_rows($rslt);
$arr = array();
while($event = mysql_fetch_assoc($rslt))
{	

	$arr[] = $event;
}


    
echo '{
"document":
'.json_encode($arr).'}';
?>