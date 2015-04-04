<?php
require_once(__DIR__ . "/../modle/config.php");

 // these five lines of code are variables from my game that are being passed into this php
//code to update our users table
$exp = filter_input(INPUT_POST, "exp", FILTER_SANITIZE_STRING);
$exp1 = filter_input(INPUT_POST, "exp1", FILTER_SANITIZE_STRING);
$exp2 = filter_input(INPUT_POST, "exp2", FILTER_SANITIZE_STRING);
$exp3 = filter_input(INPUT_POST, "exp3", FILTER_SANITIZE_STRING);
$exp4 = filter_input(INPUT_POST, "exp4", FILTER_SANITIZE_STRING);


$query = $_SESSION["connection"]->query("UPDATE users SET "
	. "exp = $exp, "
	. "exp1 = $exp1, "
	. "exp2 = $exp2, "
	. "exp3 = $exp3, "
    . "exp4 = $exp4 WHERE username = \"" . $_SESSION["name"]. "\"");

if($query){
	// tells us if the query is true
	echo "true";
}else{
	// tells us if we have an error 
	echo "<p>" . $_SESSION["connection"]->error . "<p>";
}
