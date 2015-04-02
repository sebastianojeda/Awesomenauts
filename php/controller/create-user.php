<?php
	require_once(__DIR__ . "/../model/config.php");

	$email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
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
		. "email = '$email',"
		. "username = '$username',"
		. "password = '$hashedPassword',"
		. "salt = '$salt'");

			if($query){
				echo "It works: $username";
			}else{
				echo "<p>" . $_SESSION["connection"]->error . "</p>";
			}