<?php

if ( !empty( $_FILES ) ) {

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
   
    $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];

    move_uploaded_file( $tempPath, $uploadPath );
    $name=$_FILES[ 'file' ][ 'name' ];

    $answer = array( 'path' => 'http://customs.gov.mn/ipad/uploads/'.$name,'type'=>explode(".",$name)[1]);
    $json = json_encode( $answer );

    echo $json;

} else {

    echo 'No files';

}

?>