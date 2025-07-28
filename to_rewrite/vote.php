<!DOCTYPE html>
<html lang="pl" data-bs-theme="auto">
<head>
<?php 
	require_once("default/config.php");
	require_once("default/connect_to_db.php");
	require_once("default/head.php");

?>
    <title>Administracja</title>
</head>
<body>
    <?php 

print_r($_SESSION);
?>

    <?php	require_once("default/footer.php"); ?>
</body>
</html>