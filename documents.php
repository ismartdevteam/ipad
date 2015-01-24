<?php
header("Content-type: application/json;charset=utf-8");

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$inputdate=$request->d;
    $inputhour=$request->h;

if(isset($inputdate))
{
      include_once './db_connect.php';
        // connecting to database
     $db = new DB_Connect();
       $db->connect();


if($inputhour == '0')
{
	$inputhour = date('H:i:', strtotime('00:00:00'));
}
if($inputdate != 0)
{

	$inputdate = $inputdate." ".$inputhour;
	$inputdate = date('Y-m-d H:i:s', strtotime($inputdate));
	$wheredate = "WHERE created_date >'".$inputdate."'";
}
else
{
	$wheredate = "";
}

$query = "SELECT * FROM document $wheredate order by id DESC";

$rslt = mysql_query($query);
$count = mysql_num_rows($rslt);
$arr = array();
while($event = mysql_fetch_assoc($rslt))
{	

	$arr[] = $event;
}

$tstqry = mysql_query("select MAX(created_date) as last from document");
$ttt = mysql_fetch_object($tstqry);
$updated = date("Y-m-d H:i:s", strtotime($ttt->last));
    
echo '{"count":"'.$count.'",
    "last_updated": "'.$updated.'",
"document":
'.json_encode($arr).'}';


}
else
{
	die(json_encode("error"));
}
?>