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
    $_SESSION['status_message'] = "Błąd zagłosowania: " . $e->getMessage();
}


//print_r($_POST); // DO WYWALENIA

if(isset($_POST['poll_id'])) {
$stmt_poll = $pdo->prepare("SELECT polls.id, polls.name, polls.description, polls.is_active, polls.valid_to, users.username, users.imie, users.nazwisko FROM polls JOIN users ON users.id = polls.owner_id WHERE polls.id = ?");
$stmt_poll->execute([$_POST['poll_id']]);
$result_poll = $stmt_poll->fetch(PDO::FETCH_ASSOC);
//print_r($result_poll);
} else {
    header("Location: /admin_polls.php");
}


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['new_poll'])) {
    // Sprawdź, czy wszystkie wymagane dane są przesłane
    if (isset($_POST['poll_id'], $_POST['new_poll'], $_POST['new_poll_description'])) {

        // Pobranie i oczyszczenie danych
        $poll_id = (int)$_POST['poll_id'];
        $poll = trim($_POST['new_poll']);
        $description = trim($_POST['new_poll_description']);
        $is_active = isset($_POST['is_active']) ? 1 : 0; // checkbox
        $valid_to = trim($_POST['poll_valid_to']);

        // Przygotowanie zapytania
        $stmt_update = $pdo->prepare("
            UPDATE polls 
            SET name = :poll, 
                description = :description, 
                is_active = :is_active,
                valid_to = :valid_to 
            WHERE id = :id
        ");

        // Wykonanie zapyatnia
        $stmt_update->execute([
            ':poll' => $poll,
            ':description' => $description,
            ':is_active' => $is_active,
            ':valid_to' => $valid_to,
            ':id' => $poll_id
        ]);

        $_SESSION['poll_edited'] = "Głosowanie <b>$poll</b> zostało zaktualizowane.";
        header("Location: /admin_polls.php");
    } else {
        $_SESSION['status_message'] = "Nieudana edycja głosowania.";
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
	<li class="breadcrumb-item "><a href="/admin_tenant.php">Dzierżawa</a></li>
    <li class="breadcrumb-item active">Głosowania</a></li>
    
	<li class="breadcrumb-item active" aria-current="page">Edycja głosowania</li>
  </ol></h1>
						<div class="btn-toolbar mb-2 mb-md-0">
							<div class="btn-group me-2 "> <button type="button" class="btn btn-sm btn-outline-secondary">Share</button> <button type="button" class="btn btn-sm btn-outline-secondary">Export</button> </div>
							<button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
								<svg class="bi" aria-is_active="true">
									<use xlink:href="#calendar3"></use>
								</svg>
								This week
							</button>
						</div>
					</div>
					<div class="card shadow-sm p-4 my-4">

    <h5>Głosowania</h5>
    <!-- Formularz tworzenia nowej dzierżawy -->
    <h4 class="card-title mb-3">Edycja głosowania</h4>
    <form class="mb-4" action="" method="post">
        <div class="card-body">
            <input type="hidden" name="poll_id" value="<?php echo htmlspecialchars($result_poll['id']); ?>">
            <div class="form-floating mb-2">
              <input type="text" class="form-control" id="poll_name" name="new_poll" placeholder="głosowanie" value="<?php echo htmlspecialchars($result_poll['name']); ?>">
              <label for="poll_name">głosowanie</label>
            </div>
            <div class="form-floating mb-3">
              <textarea class="form-control" placeholder="Opis" id="poll_description" name="new_poll_description"><?php echo htmlspecialchars($result_poll['description']); ?></textarea>
              <label for="poll_description">Opis</label>
            </div>
            <div class="form-floating mb-3">
              <input type="datetime-local" class="form-control" placeholder="Opis" id="poll_valid_to" name="poll_valid_to" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true" data-bs-title="Jeśli chcesz, aby głosowanie nie wygasało, ustaw datę wygaśniecia na <b>00-00-0000</b>" value="<?php echo htmlspecialchars($result_poll['valid_to']); ?>">
              <label for="poll_valid_to" >Data ważności <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="ms-1 bi bi-info-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg></label>
            </div>
            <input 
  class="form-check-input" 
  type="checkbox" 
  name="is_active" 
  id="is_active" 
  value="1" 
  <?php if (!empty($result_poll['is_active'])) echo 'checked'; ?>
>
<label class="form-check-label" for="is_active">
  Aktywne
</label>

<div class="form-floating mb-2">
              <input type="text" readonly class="form-control-plaintext" id="created_at" name="created_by" placeholder="Utworzono przez" value="<?php echo htmlspecialchars($result_poll['imie'] . " " . $result_poll['nazwisko'] . " (" . $result_poll['username'] . ")"); ?>">
              <label for="created_by">Utworzone przez</label>
            </div>
        </div>
        <button type="submit" class="btn btn-success">Zapisz zmiany</button>
    </form>

</div>

					
				</main>
			</div>
		</div>

<script src="scripts/dashboard.js"></script>

    <?php	require_once("default/footer.php"); ?>
</body>
</html>