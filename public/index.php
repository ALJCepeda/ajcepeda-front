<?php

//Does all preprocessing such as providing dependencies, constants and refreshes session
include filter_input(INPUT_SERVER, 'DOCUMENT_ROOT') . '/startsession.php';

//Attempts to resolve request path or redirects to 404
//Provides $parameters for page
include ROOT . '/resources/routerequest.php';
 
//Location dependant javascript files
$javascripts = '';
if(isset($parameters['js'])){
	foreach ($parameters['js'] as $script) {
		$javascripts .= "<script src='$script'></script>\n";
	} 
}

$coverSheet = CONTENT_PROVIDER . '/bootstrap/dist/css/cover.css';

?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="icon" href="/assets/images/icons/favicon.ico">

	<title>Main Page</title>

	<link href= "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
	<link href= <?=$coverSheet?> rel='stylesheet'>

	<script src= "https://code.jquery.com/jquery-2.1.4.min.js" ></script>
	<script src= "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js" ></script>

	<?=$javascripts?>
</head>

<body>
	<div class="site-wrapper">
		<div class="site-wrapper-inner">
			<div class="cover-container">
				<?php 
					echo "\n\n\n\n<!-- Navbar Start -->\n\n";
					require 'views/navbar.php';
					echo "\n\n<!-- Navbar End -->\n\n";

					echo "\n\n<!-- Main Start -->\n\n";
					require $parameters['script'];
					echo "\n\n<!-- Main End -->\n\n\n\n";
				?>
			</div>
		</div>
	</div>
</body>

</html>