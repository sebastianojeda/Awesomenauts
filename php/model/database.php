<?php

/**
* We use a class to create a new 
*object and store all of our information
*from our create-post and create-db php files.
*This class is a way to keep our code cleaner 
*and more organized.
*/
class Database{
	private $connection;
	private $host;
	private $username;
	private $password;
	private $database;
	public $error;

	// _construct will search for the 
	//old-style constructor function, by the name of the class
	//_construct defines your constructuors 
	//_constructuors allow us to build an object
	public function __construct($host, $username, $password, $database){
		$this->host = $host;
		$this->username = $username;
		$this->password = $password;
		$this->database = $database;

		  //This connectoin varable takes my variables from my 
    	 //database file and connects those files to my create-db file.
	$this->connection = new mysqli($host, $username, $password);

	if ($this->connection->connect_error){
		die("<p>Error: " . $this->connection->connect_error) ."</p>";
	}
		// this exists variable
		// is allowing me to select a specific database
	$exists = $this->connection->select_db($database);

     	// this if statement will tell me if my 
		//database exists or doesn't exists
	if(!$exists) {
		$query = $this->connection->query("CREATE DATABASE $database");

		if($query){
			echo "<p>successfully created database" . $database . "</p>";
		}
	}
		//this else statement is echoing a string
	else{
		echo "<p>database has already been created.</p>";
	}
	}

	public function openConnection(){
	$this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

		if($this->connection->connect_error){
			die("<p>Error: " . $this->connection->connect_error) ."</p>";

		}
	}
		//ISSET checks my code to see if a variable has been set
		//A function is a block of statements that can be used repeatedly in a program
	public function closeConnection(){
		if (isset($this->connection)) {
		
			$this->connection->close();
		}
	}

	public function query($string) {
		$this->openConnection();

		$query = $this->connection->query($string);

		if(!$query){
			$this->error = $this->connection->error;
		}

		$this->closeConnection();

		return $query;
	}
}

