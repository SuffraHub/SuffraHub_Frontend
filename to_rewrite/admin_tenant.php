<!DOCTYPE html>
<html lang="pl" data-bs-theme="auto">
<head>
<?php 
	require_once("default/config.php");
	require_once("default/connect_to_db.php");
	require_once("default/head.php");
if(isset($_SESSION) && $_SESSION['permissions'] < 3) {
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

if (isset($_POST['tenant_name'])) {
    $tenant_name_changed = trim($_POST['tenant_name']);
    $tenant_description_changed = trim($_POST['tenant_description'] ?? "");

    $stmt = $pdo->prepare("UPDATE companies SET name = ?, description = ? WHERE id = ?");
    $success = $stmt->execute([$tenant_name_changed, $tenant_description_changed, $company_info['id']]);

    if ($success) {
        header("Location: /admin_tenant.php");
        exit; // zawsze po header
    } else {
        // Tu możesz np. zalogować błąd lub wyświetlić komunikat
       $_SESSION['status_message'] = "Błąd podczas aktualizacji danych dzierżawy.";
    }
}
if(isset($company_info['id'])) {
$stmt_tenant_users = $pdo->prepare("SELECT users.id, users.imie, users.nazwisko, users.email, permissions_dictionary.description, users.last_login, users.registration_date FROM users JOIN permissions_dictionary ON permissions_dictionary.permissions = users.permissions WHERE users.company_id = ?");
$stmt_tenant_users->execute([$company_info['id']]);
$result_tenant_users = $stmt_tenant_users->fetchAll(PDO::FETCH_ASSOC);
}

if (isset($_POST['new_tenant_name']) && !isset($company_info['id'])) {
    $new_tenant_name = trim($_POST['new_tenant_name']);
    $new_tenant_description = trim($_POST['new_tenant_description'] ?? "");

    $stmt = $pdo->prepare("INSERT INTO companies (name, description) VALUES (?, ?)");
    $success = $stmt->execute([$new_tenant_name, $new_tenant_description]);

    if (!$success) {
        // Tu możesz np. zalogować błąd lub wyświetlić komunikat
       $_SESSION['status_message'] = "Błąd podczas tworzenia dzierżawy.";
    }
	$stmt = $pdo->prepare("UPDATE users SET company_id = (SELECT id FROM companies WHERE name = ?) WHERE username = ?");
    $success = $stmt->execute([$new_tenant_name, $_SESSION['username']]);
if ($success) {
        header("Location: /admin_tenant.php");
        exit; // zawsze po header
    } else {
        // Tu możesz np. zalogować błąd lub wyświetlić komunikat
       $_SESSION['status_message'] += "Błąd podczas tworzenia dzierżawy - nie przypisano cię do nowej dzierżawy.";
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
	<li class="breadcrumb-item active" aria-current="page">Dzierżawa</li>
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
<?php 

if (isset($company_info['id'])): ?>
    <h4 class="card-title mb-3">Twoja dzierżawa</h4>
    <h5 class="fst-italic fw-bold"><?php echo htmlspecialchars($company_info['name']); ?></h5>
    <form class="mb-4" action="" method="post">
        <div class="card-body">
            <div class="form-floating mb-2">
              <input type="text" class="form-control" id="tenant_name" name="tenant_name" placeholder="Nazwa dzierżawy" value="<?php echo htmlspecialchars($company_info['name']); ?>">
              <label for="tenant_name">Nazwa dzierżawy</label>
            </div>
            <div class="form-floating mb-3">
              <textarea class="form-control" placeholder="Opis dzierżawy" id="tenant_description" name="tenant_description"><?php echo htmlspecialchars($company_info['description']); ?></textarea>
              <label for="tenant_description">Opis dzierżawy</label>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Zatwierdź zmiany</button>
    </form>

    <h5>Członkowie dzierżawy</h5>
    <div class="card-body">
        <div class="overflow-x-auto" style="max-width: 100%;">
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Imię i Nazwisko</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Uprawnienia</th>
                    <th scope="col">Ostatnie logowanie</th>
                    <th scope="col">Data rejestracji</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $counter = 1;
                foreach ($result_tenant_users as $user) {
                    echo "<tr>";
                    echo "<td>" . $counter++ . "</td>";
                    echo "<td>" . htmlspecialchars(($user['imie'] ?? '') . ' ' . ($user['nazwisko'] ?? '')) . "</td>";
                    echo "<td>" . htmlspecialchars($user['email'] ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($user['description'] ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($user['last_login'] ?? '') . "</td>";
                    echo "<td>" . htmlspecialchars($user['registration_date'] ?? '') . "</td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table>
        </div>
		<a class="btn btn-success" href="/register_to_tenant.php">Dodaj użytkownika do dzierżawy</a>
    </div>
<?php else: ?>
    <!-- Formularz tworzenia nowej dzierżawy -->
    <h4 class="card-title mb-3">Utwórz nową dzierżawę</h4>
    <form class="mb-4" action="" method="post">
        <div class="card-body">
            <div class="form-floating mb-2">
              <input type="text" class="form-control" id="tenant_name" name="new_tenant_name" placeholder="Nazwa dzierżawy">
              <label for="tenant_name">Nazwa dzierżawy</label>
            </div>
            <div class="form-floating mb-3">
              <textarea class="form-control" placeholder="Opis dzierżawy" id="tenant_description" name="new_tenant_description"></textarea>
              <label for="tenant_description">Opis dzierżawy</label>
            </div>
        </div>
        <button type="submit" class="btn btn-success">Utwórz dzierżawę</button>
    </form>
<?php endif; ?>

</div>
				</main>
			</div>
		</div>

    <?php	require_once("default/footer.php"); ?>
</body>
</html>