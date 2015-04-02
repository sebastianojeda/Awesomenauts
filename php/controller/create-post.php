<?php
	require_once(__DIR__ . "/../model/config.php");

	$title = filter_input(INPUT_POST, "title", FILTER_SANITIZE_STRING);
	//This post means it is receiving data called title and filtering it
	$post = filter_input(INPUT_POST, "post", FILTER_SANITIZE_STRING);
	//this post means it is receiving data called post and is filtering it

	$date = new DateTime('today');
	$time = new DateTime('America/Los_Angeles'); 
	echo "<p>Title: $title</p>";
	//this is just to echo out title
	echo "<p>Post: $post</p>";
	//this is just to echo out post

	$query = $_SESSION["connection"]->query("INSERT INTO posts SET title = '$title', post = '$post'");
	//this connection goes into query and inserts into posts and sets the title and than posts it.

	if($query) {
		echo "<p>Successfully inserted post: $title</p>";
		echo "Posted on: " . $date->format("M/D/Y") . " at " . $time->format("g:i");
	}
	//if there is nothing wrong, it will say that the post went through.
	else {
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}
	//if the connection isn't going through, it will say it has an error.
	

