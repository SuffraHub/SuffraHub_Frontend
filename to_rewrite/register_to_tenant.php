<!DOCTYPE html>
<html lang="pl" data-bs-theme="auto">
<head>
<?php 
	require_once("default/config.php");
	require_once("default/connect_to_db.php");
	require_once("default/head.php");

?>
<?php



// Funkcja łącząca się z bazą danych


// Obsługa rejestracji
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $register_username = trim($_POST['username'] ?? '');
    $register_password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';
    $register_email = trim($_POST['email'] ?? '');
    $confirm_email = trim($_POST['confirm_email'] ?? '');

    if (empty($register_username) || empty($register_password) || empty($register_email)) {
        $_SESSION['status_message'] = "Wszystkie pola są wymagane.";
    }
    // Sprawdzenie zgodności e-maili
    elseif ($register_email !== $confirm_email) {
        $_SESSION['status_message'] = "Adresy e-mail się nie zgadzają.";
    }
    // Sprawdzenie zgodności haseł
    elseif ($register_password !== $confirm_password) {
        $_SESSION['status_message'] = "Hasła się nie zgadzają.";
    }
}
        $dbh = connect_to_db();
try {
        $stmt = $dbh->prepare("SELECT companies.id, name, description FROM companies JOIN users ON users.company_id = companies.id WHERE users.username = ?");
        $stmt->execute([$_SESSION['username']]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
			$company_info['id'] = $result['id'];
            $company_info['name'] = $result['name'];
            $company_info['description'] = $result['description'];
        }

} catch (PDOException $e) {
    $_SESSION['status_message'] = "Błąd zapytania: " . $e->getMessage();
}
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['email']) && !empty($_POST['imie']) && !empty($_POST['nazwisko'])) {

    $register_username = trim($_POST['username']);
    $register_password = $_POST['password'];
    $register_email = trim($_POST['email']);

    // Walidacja długości loginu (pozostała część znajduje się wewnątrz bloku else powyżej)
    if (strlen($register_username) < 3 || strlen($register_username) > 30) {
        $_SESSION['status_message'] = "Nazwa użytkownika musi mieć od 3 do 30 znaków.";
    }

    // Walidacja adresu e-mail (również wewnątrz bloku else)
    elseif (!filter_var($register_email, FILTER_VALIDATE_EMAIL)) {
        $_SESSION['status_message'] = "Nieprawidłowy format adresu e-mail.";
    }
    // Walidacja hasła (również wewnątrz bloku else)
    elseif (
        strlen($register_password) < 8 ||
        !preg_match('/[A-Z]/', $register_password) ||
        !preg_match('/[a-z]/', $register_password) ||
        !preg_match('/\d/', $register_password) ||
        !preg_match('/[\W_]/', $register_password) // znak specjalny
    ) {
        $_SESSION['status_message'] = "Hasło musi mieć co najmniej 8 znaków, zawierać wielką i małą literę, cyfrę oraz znak specjalny.";
    } else {
        $hashedpassword = hash('sha256', $register_password);


        // Sprawdzenie, czy użytkownik o danej nazwie już istnieje
        $query_check_user = $dbh->prepare("SELECT * FROM users WHERE username = ?");
        $query_check_user->execute([$register_username]);
        $existing_user = $query_check_user->fetch(PDO::FETCH_ASSOC);

        if ($existing_user) {
            $_SESSION['status_message'] = "Użytkownik o tej nazwie już istnieje. Wybierz inną nazwę.";
        } else {
            // Dodawanie nowego użytkownika do bazy danych
            $query_add_user = $dbh->prepare("INSERT INTO users (username, password, email, company_id) VALUES (?, ?, ?, ?)");
            $query_add_user->execute([$register_username, $hashedpassword, $register_email, $company_info['id']]);

            $_SESSION['status_message'] = "Rejestracja udana. Możesz się teraz zalogować.";
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
   $_SESSION['status_message'] = "Wszystkie pola muszą być wypełnione"; 
}

?>
    <title>Rejestracja do dzierżawy</title>
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
				<h1 class="h3 mb-3 fw-normal">Rejestracja do dzierżawy</h1>
                <form method="post">
				<div class="form-floating mb-3"> <input type="text" class="form-control" id="username" placeholder="Nazwa użytkownika" name="username"> <label for="username">Nazwa użytkownika</label> </div>
                
                <div class="form-floating mb-1"> <input type="text" class="form-control" id="imie" placeholder="Imię" name="imie"> <label for="imie">Imię</label> </div>
                <div class="form-floating mb-3"> <input type="text" class="form-control" id="nazwisko" placeholder="Nazwisko" name="nazwisko"> <label for="nazwisko">Nazwisko</label> </div>

				<div class="form-floating mb-1"> <input type="email" class="form-control" id="email" placeholder="E-mail" name="email"> <label for="email">Email</label> </div>
				<div class="form-floating mb-3"> <input type="email" class="form-control" id="email_check" placeholder="Powtórz E-mail" name="confirm_email"> <label for="email_check">Powtórz E-mail</label> </div>


				<div class="form-floating"> <input type="password" class="form-control" id="password" placeholder="Hasło" name="password"> <label for="password">Hasło</label> </div>
				<div class="form-floating"> <input type="password" class="form-control" id="password_check" placeholder="Potwierdź hasło" name="confirm_password"> <label for="password_check">Potwierdź hasło</label> </div>
                <?php
try {
    $stmt = $dbh->prepare("SELECT permissions, description FROM permissions_dictionary WHERE permissions <= 4");
    $stmt->execute();
    $permissions_list = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    $_SESSION['status_message'] = "Błąd zapytania: " . $e->getMessage();
}
?>

<!-- HTML SELECT -->
 <label for="permissions">Uprawnienia</label>
<select class="form-select mb-2" name="permissions" id="permissions">
    <?php foreach ($permissions_list as $row): ?>
        <option value="<?= htmlspecialchars($row['permissions']) ?>">
            <?= htmlspecialchars($row['description']) ?>
        </option>
    <?php endforeach; ?>
</select>


				<button class="btn btn-primary w-100 py-2" type="submit">Zarejestruj użytkownika do dzierżawy</button>
				<h3 class="fw-bold mt-4"><?php echo $_SESSION['status_message']; ?></h3>
    </form>
				<span class="pt-2"><a href="admin_tenant.php">Powrót</a></span>
				<p class="mt-5 mb-3 text-body-secondary">&copy; mrstahuu - maventplan</p>

		</main>

    <?php	require_once("default/footer.php"); ?>
</body>
</html>