<?php
    //The require_once statement is identical to require except PHP will 
   //check if the file has already nbeen included, and if so, not include (require) it again
	require_once(__DIR__ . "/../model/config.php");			

	//creating a new table to store blod users
	$query = $_SESSION["connection"]->query("CREATE TABLE users("
		. "id int(11) NOT NULL AUTO_INCREMENT,"
		. "username varchar(30) NOT NULL," 
		. "email varchar(50) NOT NULL,"
		. "password char(128) NOT NULL," 
		. "salt char(128) NOT NULL,"
		. "exp int(40), "
		. "exp1 int(40), "
		. "exp2 int(40), "
		. "exp3 int(40), "
		. "exp4 int(40), "
		. "PRIMARY KEY (id))");

	