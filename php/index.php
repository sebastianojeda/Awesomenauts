<?php
	require_once(__DIR__ . "/controller/login-varify.php");
	require_once(__DIR__ . "/view/header.php");
	if (authentication()) {

	require_once(__DIR__ . "/view/navigation.php");
	}
	    
	require_once(__DIR__ . "/view/body.php");	
	require_once(__DIR__ . "/view/footer.php");

?>