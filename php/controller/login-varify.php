<?php
	require_once(__DIR__ . "/../model/config.php");
		//This function is verifying if the user has signed in
	function authentication(){
		if(!isset($_SESSION["authenticated"])){
			return false;
		}
		else{
			if($_SESSION["authenticated"] != true){
				return false;
			}
			else{
				return true;
			}
		}
	}
