<!DOCTYPE html>
<html lang="pl" data-bs-theme="auto">
<head>
<?php 	error_reporting(E_ALL);
ini_set('display_errors', 1);
	require_once("default/config.php");
	require_once("default/connect_to_db.php");
	require_once("default/head.php");


if (isset($_SESSION['username'])) {
    header("Location: /admin.php");
    exit();
}

// Funkcja do połączenia z bazą danych

    
// Obsługa logowania
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['username']) && !empty($_POST['password'])) {

    $username = trim($_POST['username']);
    $password = $_POST['password'];
    $hashedpassword = hash('sha256', $password);

    $dbh = connect_to_db();
    $query = $dbh->prepare("SELECT * FROM users WHERE username = ?");
    $query->execute([$username]);
    $user = $query->fetch(PDO::FETCH_ASSOC);

    if ($user && $hashedpassword === $user['password']) {
        $_SESSION['username'] = $username;
        $_SESSION['status_message'] = "Zalogowano pomyślnie";
        $_SESSION['permissions'] = $user['permissions'];
        $_SESSION['company_id'] = $user['company_id'];
        $update_login_time = $dbh->prepare("UPDATE users SET last_login = NOW() WHERE username = ?");
        $update_login_time->execute([$_SESSION['username']]);

        // Pobranie User-Agent
$user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';

// Pobranie adresu IP użytkownika
$ip_address = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

// Jeśli użytkownik zaznaczył "remember me", generujemy unikalny token i ustawiamy datę wygaśnięcia
if (isset($_POST['remember_me']) && $_POST['remember_me'] == 'on') {
    // Generowanie unikalnego tokena
    $uid_token = bin2hex(random_bytes(32));

    // Obliczenie daty wygaśnięcia (30 dni od teraz)
    $expires_at_timestamp = time() + (30 * 24 * 60 * 60);
    $expires_at = date('Y-m-d H:i:s', $expires_at_timestamp);

    // Wstawienie nowego tokena do tabeli `user_tokens` wraz z User-Agent, IP oraz datą wygaśnięcia
    $insert_query = $dbh->prepare("INSERT INTO user_tokens (user_id, token, created_at, expires_at, user_agent, ip_address) VALUES (?, ?, NOW(), ?, ?, ?)");
    $insert_query->execute([$user['id'], $uid_token, $expires_at, $user_agent, $ip_address]);

    // Ustawienie ciasteczka z tym samym czasem wygaśnięcia
    setcookie("uid_token", $uid_token, $expires_at_timestamp, "/", "", false, true);
} else {
    // Jeśli nie zaznaczone "remember me", zapisujemy tylko User-Agent oraz IP bez tokena
    $insert_query = $dbh->prepare("INSERT INTO user_tokens (user_id, created_at, user_agent, ip_address) VALUES (?, NOW(), ?, ?)");
    $insert_query->execute([$user['id'], $user_agent, $ip_address]);
}

        
        
        
        header("Location: /admin.php");
        exit();
    } else {
        $_SESSION['status_message'] = "<span class='text-danger'>Błędna nazwa użytkownika lub hasło.</span>";
        
    }
}


?>
    <title>Logowanie</title>
    <link rel="stylesheet" href="default/sign-in.css">
    <style>
        body {
            flex-direction: column;
        }
    </style>
</head>
<body class="d-flex align-items-center py-4 bg-body-tertiary">

		<main class="form-signin w-100 m-auto">
			
									<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="currentColor" color="blue" class="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
</svg><b class="fs-2">Vote@maventplan</b>
				<h1 class="h3 mb-3 fw-normal">Zaloguj się</h1>
                <form method="post">
				<div class="form-floating mb-3"> <input type="text" class="form-control" id="username" placeholder="Nazwa użytkownika" name="username"> <label for="username">Nazwa użytkownika</label> </div>


				<div class="form-floating"> <input type="password" class="form-control" id="password" placeholder="Hasło" name="password"> <label for="password">Hasło</label> </div>
<div class="form-check text-start my-3"> <input class="form-check-input" type="checkbox" name="remember_me" value="on" id="checkDefault">
 <label class="form-check-label" for="checkDefault">
					Zapamiętaj mnie
					</label> 
				</div>
				<button class="btn btn-primary w-100 py-2" type="submit">Zaloguj się</button>
				<h3 class="fw-bold mt-4"><?php echo $_SESSION['status_message']; ?></h3>
    </form>
                				<span class="mt-2">Nie masz konta? <a href="register.php">Zarejestruj się!</a></span>
				<p class="mt-5 mb-3 text-body-secondary">&copy; mrstahuu - maventplan</p>
			
		</main>

    <?php	require_once("default/footer.php"); ?>
</body>
</html>				