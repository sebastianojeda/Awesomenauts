<?php
	require_once(__DIR__ . "/../model/config.php");
	//this require once checks for the file within the model folder

	require_once(__DIR__ . "/../controller/login-varify.php");

	if(!authentication()){
		//this header is sending the non loged in users 
		//back to index.php
		header("location: " . $path . "index.php");
		die();
	}
?>
<nav>
	<ul>
		<li><a href="<?php echo $path . "post.php" ?>">Blog post form</a></li>
	</ul>
</nav>
<!-- Echos the variable path inside of post.  -->