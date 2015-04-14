<?php
	require_once(__DIR__ . "/../model/config.php");

	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

	//$5$ means that im creating a crypt_SHA256 function 
	//and the rounds 5000 means that i want to be able to encrypt
	//5000 words.
	$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";

	//we use the crpyt function to connect our 
	//password & salt variable to bind together 
	//inorder to encrypt our password
	$hashedPassword = crypt($password, $salt);

	$query = $_SESSION["connection"]->query("INSERT INTO users SET "
		
		. "username = '$username',"
		. "password = '$hashedPassword',"
		. "salt = '$salt',"
		. "exp= 0, "
		. "exp1= 0, "
		. "exp2= 0, "
		. "exp3= 0, "
		. "exp4= 0 " );

	$_SESSION["name"] = $username;
			if($query){
				//Need this for Ajax on index.php
				echo "true";
			}else{
				echo "<p>" . $_SESSION["connection"]->error . "</p>";
			}