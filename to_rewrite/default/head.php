<?php
	session_start();
	$_SESSION['status_message'] = "";
	error_reporting(E_ALL);
ini_set('display_errors', 1);
if (!isset($_SESSION['username']) && isset($_COOKIE['uid_token'])) {
    $dbh = connect_to_db();
    $query = $dbh->prepare("SELECT users.username, users.permissions, users.company_id FROM user_tokens JOIN users ON user_tokens.user_id = users.id WHERE token = ? AND expires_at > NOW()");
    $query->execute([$_COOKIE['uid_token']]);
    $user = $query->fetch(PDO::FETCH_ASSOC);
    if ($user) {
        $_SESSION['username'] = $user['username']; // Automatyczne logowanie
        $_SESSION['permissions'] = $user['permissions'];
		$_SESSION['company_id'] = $user['company_id'];
        $update_login_time = $dbh->prepare("UPDATE users SET last_login = NOW() WHERE username = ?");
$update_login_time->execute([$_SESSION['username']]);
    } else {
        // Jeśli token wygasł lub nie istnieje, usuwamy ciasteczko
        setcookie("uid_token", "", time() - 3600, "/");
    }
}
?>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">		
<meta name="author" content="Stanisław Maik">
<script src="https://szybkiszofer.maventplan.pl/scripts/jquery/jquery-3.7.1.min.js"></script>
<link href="https://szybkiszofer.maventplan.pl/scripts/bootstrap-5.3.3-dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://szybkiszofer.maventplan.pl/scripts/bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js"></script>
<link rel="manifest" href="default/manifest.json">
<link rel="shortcut icon" href="img/icon_144.png" type="image/png">

<!-- Styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.min.css" />
<!-- Or for RTL support -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.rtl.min.css" />

<!-- Scripts -->
<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.0/dist/jquery.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>