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

if(isset($_POST['question_id'])) {
$stmt_question = $pdo->prepare("SELECT questions.id, questions.question, questions.description, questions.hidden, questions.created_at, users.username, users.imie, users.nazwisko FROM questions JOIN users ON users.id = questions.user_id WHERE questions.id = ?");
$stmt_question->execute([$_POST['question_id']]);
$result_question = $stmt_question->fetch(PDO::FETCH_ASSOC);
} else {
    header("Location: /admin_questions.php");
}


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['new_question'])) {
    // Sprawdź, czy wszystkie wymagane dane są przesłane
    if (isset($_POST['question_id'], $_POST['new_question'], $_POST['new_question_description'])) {

        // Pobranie i oczyszczenie danych
        $question_id = (int)$_POST['question_id'];
        $question = trim($_POST['new_question']);
        $description = trim($_POST['new_question_description']);
        $hidden = isset($_POST['hidden']) ? 1 : 0; // checkbox

        // Przygotowanie zapytania
        $stmt_update = $pdo->prepare("
            UPDATE questions 
            SET question = :question, 
                description = :description, 
                hidden = :hidden 
            WHERE id = :id
        ");

        // Wykonanie zapytania
        $stmt_update->execute([
            ':question' => $question,
            ':description' => $description,
            ':hidden' => $hidden,
            ':id' => $question_id
        ]);

        header("Location: /admin_questions.php");
    } else {
        $_SESSION['status_message'] = "Nieudana edycja pytania.";
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
    <li class="breadcrumb-item "><a href="/admin_questions.php">Baza pytań</a></li>
	<li class="breadcrumb-item active" aria-current="page">Edycja pytania</li>
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

    <h5>Pytania</h5>
    <!-- Formularz tworzenia nowej dzierżawy -->
    <h4 class="card-title mb-3">Edycja pytania</h4>
    <form class="mb-4" action="" method="post">
        <div class="card-body">
            <input type="hidden" name="question_id" value="<?php echo htmlspecialchars($result_question['id']); ?>">
            <div class="form-floating mb-2">
              <input type="text" class="form-control" id="question_name" name="new_question" placeholder="Pytanie" value="<?php echo htmlspecialchars($result_question['question']); ?>">
              <label for="question_name">Pytanie</label>
            </div>
            <div class="form-floating mb-3">
              <textarea class="form-control" placeholder="Opis" id="question_description" name="new_question_description"><?php echo htmlspecialchars($result_question['description']); ?></textarea>
              <label for="question_description">Opis</label>
            </div>
            <input 
  class="form-check-input" 
  type="checkbox" 
  name="hidden" 
  id="hidden" 
  value="1" 
  <?php if (!empty($result_question['hidden'])) echo 'checked'; ?>
>
<label class="form-check-label" for="hidden">
  Ukryte
</label>
<div class="form-floating mb-2">
              <input type="text" readonly class="form-control-plaintext" id="created_at" name="created_at" placeholder="Utworzono" value="<?php echo htmlspecialchars($result_question['created_at']); ?>">
              <label for="created_at">Data utworzenia</label>
            </div>
<div class="form-floating mb-2">
              <input type="text" readonly class="form-control-plaintext" id="created_at" name="created_by" placeholder="Utworzono przez" value="<?php echo htmlspecialchars($result_question['imie'] . " " . $result_question['nazwisko'] . " (" . $result_question['username'] . ")"); ?>">
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