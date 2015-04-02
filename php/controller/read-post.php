<?php
	require_once(__DIR__ . "/../model/config.php");

	$query = "SELECT * FROM posts";
	$result = $_SESSION["connection"]->query($query);

	if($result){
		while ($row = mysqli_fetch_array($result)) {
			echo "<div class='row'>";
			echo "<h2>" . $row['title'] . "</h2>"; 
			echo "<br />";
			echo "<h4>" . $row['post'] . "</h4>";			
			echo "<br />";
			echo "<h5>Posted on:" . $row['DateTime'] . "</h5>";
			echo "</div";
		}
	}