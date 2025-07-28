<!DOCTYPE html>
<html lang="pl" data-bs-theme="auto">
<head>
<?php 
	require_once("default/config.php");
	require_once("default/connect_to_db.php");
	require_once("default/head.php");
if(!isset($_SESSION)) {
						header("Location: /index.php");
						exit;
}
error_reporting(E_ALL);
ini_set('display_errors', 1);
$pdo = connect_to_db();

$company_info = [
    'name' => 'nieprzypisana',
    'description' => ''
];

try {
        $stmt = $pdo->prepare("SELECT companies.id, name, description FROM companies JOIN users ON users.company_id = companies.id WHERE users.username = ?");
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

$username = $_SESSION['username'];

try {
    $stmt = $pdo->prepare("SELECT imie, nazwisko, email FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $account_info = $stmt->fetch(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    $_SESSION['status_message'] = "Błąd pobierania danych: " . $e->getMessage();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $new_imie = $_POST['imie'] ?? '';
    $new_nazwisko = $_POST['nazwisko'] ?? '';
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';

    // Sprawdzenie poprawności
    if (!empty($password) || !empty($confirm_password)) {
        if ($password !== $confirm_password) {
            $_SESSION['status_message'] = "Hasła nie są zgodne.";
        } else {
            $hashedpassword = hash('sha256', $password);
            try {
                $stmt = $pdo->prepare("UPDATE users SET imie = ?, nazwisko = ?, password = ? WHERE username = ?");
                $stmt->execute([$new_imie, $new_nazwisko, $hashedpassword, $username]);
                $_SESSION['status_message'] = "Dane i hasło zostały zaktualizowane.";
            } catch (PDOException $e) {
                $_SESSION['status_message'] = "Błąd aktualizacji: " . $e->getMessage();
            }
        }
    } else {
        // Aktualizacja tylko danych osobowych
        try {
            $stmt = $pdo->prepare("UPDATE users SET imie = ?, nazwisko = ? WHERE username = ?");
            $stmt->execute([$new_imie, $new_nazwisko, $username]);
            $_SESSION['status_message'] = "Dane zostały zaktualizowane.";
        } catch (PDOException $e) {
            $_SESSION['status_message'] = "Błąd aktualizacji: " . $e->getMessage();
        }
    }

    // Odśwież dane po zapisie
    try {
        $stmt = $pdo->prepare("SELECT imie, nazwisko FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $account_info = $stmt->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        $_SESSION['status_message'] = "Błąd odświeżenia danych: " . $e->getMessage();
    }
}




?>
    <title>Administracja</title>
	<link rel="stylesheet" href="scripts/dashboard.css">
</head>
<body>
<?php require_once("admin_components/svg.php");
require_once("admin_components/header.php"); ?>

		<div class="container-fluid">
			<div class="row">

<?php require_once("admin_components/side_panel.php"); ?>

				<main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
					<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
						<h1 class="h3 d-flex"><ol class="breadcrumb align-self-end">
    <li class="breadcrumb-item"><a href="/"><svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
</svg></a></li>
    <li class="breadcrumb-item"><a href="/admin.php">Panel administracyjny</a></li>
	<li class="breadcrumb-item active" aria-current="page">Konto</li>
  </ol></h1>
						<div class="btn-toolbar mb-2 mb-md-0">
							<div class="btn-group me-2 "> <button type="button" class="btn btn-sm btn-outline-secondary">Share</button> <button type="button" class="btn btn-sm btn-outline-secondary">Export</button> </div>
							<button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
								<svg class="bi" aria-hidden="true">
									<use xlink:href="#calendar3"></use>
								</svg>
								This week
							</button>
						</div>
					</div>
					<div class="card shadow-sm p-4 my-4">
    <h4 class="card-title mb-3">Twoje konto</h4>
    <h5 class="fst-italic fw-bold"><?php echo htmlspecialchars($_SESSION['username']); ?></h5>
    <form class="mb-4" action="" method="post">
        <div class="card-body">
            <div class="form-floating mb-1">
              <input type="text" class="form-control" id="imie" name="imie" placeholder="Imię" value="<?php echo htmlspecialchars($account_info['imie']); ?>">
              <label for="imie">Imię</label>
            </div>
			<div class="form-floating mb-4">
              <input type="text" class="form-control" id="nazwisko" name="nazwisko" placeholder="Nazwisko" value="<?php echo htmlspecialchars($account_info['nazwisko']); ?>">
              <label for="nazwisko">Nazwisko</label>
            </div>
			<div class="form-floating mb-4">
              <input type="email" class="form-control" id="email" name="email" placeholder="email" value="<?php echo htmlspecialchars($account_info['email']); ?>">
              <label for="email">E-mail</label>
            </div>
            <div class="form-floating mb-1">
              <input type="password" class="form-control" id="password" name="password" placeholder="Hasło">
              <label for="password">Hasło</label>
            </div>
			<div class="form-floating mb-1">
              <input type="password" class="form-control" id="confirm_password" name="confirm_password" placeholder="Potwierdź hasło">
              <label for="confirm_password">Potwierdź hasło</label>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Zatwierdź zmiany</button>
    </form>

</div>
					
				</main>
			</div>
		</div>

<script src="scripts/dashboard.js"></script>
    <?php	require_once("default/footer.php"); ?>
</body>
</html>