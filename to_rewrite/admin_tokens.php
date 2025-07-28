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
$pdo = connect_to_db();

$company_info = [
    'name' => 'nieprzypisana',
    'description' => ''
];

try {
        $stmt = $pdo->prepare("SELECT name, description FROM companies JOIN users ON users.company_id = companies.id WHERE users.username = ?");
        $stmt->execute([$_SESSION['username']]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $company_info['name'] = $result['name'];
            $company_info['description'] = $result['description'];
        }

} catch (PDOException $e) {
    $_SESSION['status_message'] = "Błąd zapytania: " . $e->getMessage();
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
	<li class="breadcrumb-item active" aria-current="page">Kody głosowania</li>
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
    <h5 class="card-title mb-3">Generowanie kodów głosowania</h5>
    <form action="generate_codes.php" method="post" target="pdfFrame">
        <div class="mb-3">
            <label for="code_count" class="form-label">Liczba kodów do wygenerowania</label>
            <input type="number" class="form-control" id="code_count" name="code_count" min="1" max="1000" value="10" required>
        </div>
        <button type="submit" class="btn btn-primary">Wygeneruj PDF</button>
    </form>
</div>
<iframe id="pdfFrame" name="pdfFrame" style="width: 100%; height: 100vh; border: none;"></iframe>

					<h2>Section title</h2>
					<div class="table-responsive small">
						<table class="table table-striped table-sm">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Header</th>
									<th scope="col">Header</th>
									<th scope="col">Header</th>
									<th scope="col">Header</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1,001</td>
									<td>random</td>
									<td>data</td>
									<td>placeholder</td>
									<td>text</td>
								</tr>
								<tr>
									<td>1,002</td>
									<td>placeholder</td>
									<td>irrelevant</td>
									<td>visual</td>
									<td>layout</td>
								</tr>
								<tr>
									<td>1,003</td>
									<td>data</td>
									<td>rich</td>
									<td>dashboard</td>
									<td>tabular</td>
								</tr>
								<tr>
									<td>1,003</td>
									<td>information</td>
									<td>placeholder</td>
									<td>illustrative</td>
									<td>data</td>
								</tr>
								<tr>
									<td>1,004</td>
									<td>text</td>
									<td>random</td>
									<td>layout</td>
									<td>dashboard</td>
								</tr>
								<tr>
									<td>1,005</td>
									<td>dashboard</td>
									<td>irrelevant</td>
									<td>text</td>
									<td>placeholder</td>
								</tr>
								<tr>
									<td>1,006</td>
									<td>dashboard</td>
									<td>illustrative</td>
									<td>rich</td>
									<td>data</td>
								</tr>
								<tr>
									<td>1,007</td>
									<td>placeholder</td>
									<td>tabular</td>
									<td>information</td>
									<td>irrelevant</td>
								</tr>
								<tr>
									<td>1,008</td>
									<td>random</td>
									<td>data</td>
									<td>placeholder</td>
									<td>text</td>
								</tr>
								<tr>
									<td>1,009</td>
									<td>placeholder</td>
									<td>irrelevant</td>
									<td>visual</td>
									<td>layout</td>
								</tr>
								<tr>
									<td>1,010</td>
									<td>data</td>
									<td>rich</td>
									<td>dashboard</td>
									<td>tabular</td>
								</tr>
								<tr>
									<td>1,011</td>
									<td>information</td>
									<td>placeholder</td>
									<td>illustrative</td>
									<td>data</td>
								</tr>
								<tr>
									<td>1,012</td>
									<td>text</td>
									<td>placeholder</td>
									<td>layout</td>
									<td>dashboard</td>
								</tr>
								<tr>
									<td>1,013</td>
									<td>dashboard</td>
									<td>irrelevant</td>
									<td>text</td>
									<td>visual</td>
								</tr>
								<tr>
									<td>1,014</td>
									<td>dashboard</td>
									<td>illustrative</td>
									<td>rich</td>
									<td>data</td>
								</tr>
								<tr>
									<td>1,015</td>
									<td>random</td>
									<td>tabular</td>
									<td>information</td>
									<td>text</td>
								</tr>
							</tbody>
						</table>
					</div>
				</main>
			</div>
		</div>

<script src="scripts/dashboard.js"></script>
    <?php	require_once("default/footer.php"); ?>
</body>
</html>