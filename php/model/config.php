<?php 
	require_once(__DIR__ . "/database.php");
	session_start();
	session_regenerate_id(true);
	//this session_regenerate_id 
	//reuses the login id.

	//its gonna start a session for us on our webpage.
	$path = "/Awesomenauts/php/";
	
	$host = "localhost";
	$username = "root";
	$password = "root";
	$database = "awesomenauts_db";
	//stores all of the variables

	if(!isset($_SESSION["connection"])) {
		$connection = new Database($host, $username, $password, $database);
		//a new object and the new object is gonna be of type database.
		$_SESSION["connection"] = $connection;
		//were creating our databse object, were storing it in our connection variable.
		//were gonna use the connection variable and were gonna assign it to our session variable called connection.
	}