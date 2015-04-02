<!--This require_once is conecting my config.php to my form.php-->
<?php
	require_once(__DIR__ . "/../model/config.php");
	require_once(__DIR__ . "/../controller/login-varify.php");

	if(!authentication()){
		//this header is sending the non loged in users 
		//back to index.php
		header("location: " . $path . "index.php");
		die();
	}
?>


<h1>Create Blog Post</h1>
                            <!--This php code is taking me to my create-post.php 
                            file so that when i submit something on my blog that 
                            submition is stored in my create-post.php file-->
<form class="content" method="post" action="<?php echo $path . "controller/create-post.php";?>">
	<div>
		<label for="title">Title:</label>
		<input	type="" name="title"/>
	</div>
	<div>
		<label for="post">Post:</label>
		<textarea name="post"></textarea>
	</div>
     <!--This line of code allows us to submit code-->
	<div>
		<button type="submit">Submit</button>
	</div>
</form>