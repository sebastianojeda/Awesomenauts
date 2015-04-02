<?php
    //The require_once statement is identical to require except PHP will 
   //check if the file has already nbeen included, and if so, not include (require) it again
	require_once(__DIR__ . "/../model/config.php");
    
    //this is a query variable that is creating a table.
	//This table will hold an id, strings, and post text.
	$query = $_SESSION["connection"]->query("CREATE TABLE posts ("
		. "id int(11) NOT NULL AUTO_INCREMENT,"
		. "title varchar(255) NOT NULL,"
		. "post text NOT NULL,"
		. "DateTime datetime NOT NULL, "
		. "PRIMARY KEY (id))");
	
	if($query){
		echo "<p>successful</p>";
	}else{
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}			

	//creating a new table to store blod users
	$query = $_SESSION["connection"]->query("CREATE TABLE users("
		. "id int(11) NOT NULL AUTO_INCREMENT,"
		. "username varchar(30) NOT NULL," 
		. "email varchar(50) NOT NULL,"
		. "password char(128) NOT NULL," 
		. "salt char(128) NOT NULL,"
		. "PRIMARY KEY (id))");

	if($query){
		echo "<p>successfully created table: users</p>";
	}
	else{
		echo "<p>" .$_SESSION["connection"]->error . "</p>";
	}
