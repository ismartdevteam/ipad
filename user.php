<?php 
header("Content-type: application/json;charset=utf-8");

	$user=json_decode(file_get_contents('php://input'));
	 $username=$user->mail;
	 $password=$user->pass;
$status=0;
	if(isset($username) && isset($password)){
  	include_once './db_connect.php';
        // connecting to database
     $db = new DB_Connect();
       $db->connect();
			   
			    $query='select username from admin where username="'.$username.'" and password="'.$password.'"';
			
			    $dbData=mysql_query($query);
			
			    if($dbData){
			    	  $rowcount=mysql_num_rows($dbData);
			    	  if($rowcount==1){
			    	  		if(!isset($_SESSION)){
    						session_start();
}
							$_SESSION['uid']=uniqid('ang_');
							$status=$_SESSION['uid'];
			    	  }
			    	 echo json_encode($status);
			    }
		
	} 
	
?>