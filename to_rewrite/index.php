<!DOCTYPE html>
<html lang="pl" data-bs-theme="auto">
	<head>
<?php 
	require_once("default/config.php");
	require_once("default/connect_to_db.php");
	require_once("default/head.php");


    if(isset($_POST['vote_token'])) {
		    $secretKey = '0x4AAAAAABhPRGUqgSTWuSt15fgJ-EKIC1g'; // z Cloudflare

    $turnstile_response = $_POST['cf-turnstile-response'] ?? '';
    $remoteIp = $_SERVER['REMOTE_ADDR'];

		$pdo = connect_to_db();

		try {
			$stmt = $pdo->query("SELECT vote_tokens.token, used FROM vote_tokens");
			$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
		} catch (PDOException $e) {
			$_SESSION['status_message'] = "Błąd zapytania: " . $e->getMessage();
		}

		if (empty($turnstile_response)) {
        $_SESSION['status_message'] = '<span class="text-danger">Weryfikacja robota (CAPTCHA) nie została wykonana.</span>';
    } else {
        // Weryfikacja Turnstile
        $verify = file_get_contents("https://challenges.cloudflare.com/turnstile/v0/siteverify", false, stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-type: application/x-www-form-urlencoded\r\n",
                'content' => http_build_query([
                    'secret' => $secretKey,
                    'response' => $turnstile_response,
                    'remoteip' => $remoteIp
                ])
            ]
        ]));

        $result = json_decode($verify, true);

        if ($result['success']) {
            // CAPTCHA przeszła — kontynuuj przetwarzanie tokena
            if (!empty($_POST['vote_token'])) {
                $submitted_token = $_POST['vote_token'];

                try {
                    $stmt_check = $pdo->prepare("SELECT * FROM vote_tokens WHERE token = :token AND used = 0");
                    $stmt_check->execute(['token' => $submitted_token]);
                    $token_row = $stmt_check->fetch(PDO::FETCH_ASSOC);

                    if ($token_row) {
                        $stmt_update = $pdo->prepare("UPDATE vote_tokens SET used = 1, used_at = NOW() WHERE token = :token");
                        $stmt_update->execute(['token' => $submitted_token]);

                        $_SESSION['vote_token'] = $submitted_token;
                        $_SESSION['status_message'] = "Pomyślnie zalogowano token.";
                        header("Location: /vote.php");
                        exit;
                    } else {
                        $_SESSION['status_message'] = '<span class="text-danger">Nieprawidłowy lub już użyty token.</span>';
                    }
                } catch (PDOException $e) {
                    $_SESSION['status_message'] = "Błąd przetwarzania tokena: " . $e->getMessage();
                }
            }
        } else {
            $_SESSION['status_message'] = '<span class="text-danger">Nieudana weryfikacja Turnstile. Spróbuj ponownie.</span>';
        }
    }

    }

?>
		<meta name="description" content="">
		<title>Vote@maventplan - Strona główna</title>
		<link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/jumbotrons/">
<style>
		.bd-placeholder-img{font-size:1.125rem;text-anchor:middle;-webkit-user-select:none;-moz-user-select:none;user-select:none}@media (min-width: 768px){.bd-placeholder-img-lg{font-size:3.5rem}}.b-example-divider{width:100%;height:3rem;background-color:#0000001a;border:solid rgba(0,0,0,.15);border-width:1px 0;box-shadow:inset 0 .5em 1.5em #0000001a,inset 0 .125em .5em #00000026}.b-example-vr{flex-shrink:0;width:1.5rem;height:100vh}.bi{vertical-align:-.125em;fill:currentColor}.nav-scroller{position:relative;z-index:2;height:2.75rem;overflow-y:hidden}.nav-scroller .nav{display:flex;flex-wrap:nowrap;padding-bottom:1rem;margin-top:-1px;overflow-x:auto;text-align:center;white-space:nowrap;-webkit-overflow-scrolling:touch}.btn-bd-primary{--bd-violet-bg: #712cf9;--bd-violet-rgb: 112.520718, 44.062154, 249.437846;--bs-btn-font-weight: 600;--bs-btn-color: var(--bs-white);--bs-btn-bg: var(--bd-violet-bg);--bs-btn-border-color: var(--bd-violet-bg);--bs-btn-hover-color: var(--bs-white);--bs-btn-hover-bg: #6528e0;--bs-btn-hover-border-color: #6528e0;--bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);--bs-btn-active-color: var(--bs-btn-hover-color);--bs-btn-active-bg: #5a23c8;--bs-btn-active-border-color: #5a23c8}.bd-mode-toggle{z-index:1500}.bd-mode-toggle .bi{width:1em;height:1em}.bd-mode-toggle .dropdown-menu .active .bi{display:block!important}
		#container_index, body {
			height: 100%;
		}
body {
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
height: 100%;
}
</style>
	</head>
	<body>
		<div class="my-4 mx-4 d-flex align-self-center" id="container_index">
			<div class="d-block p-5 text-center bg-body-tertiary rounded-3">
				<svg class="bi mt-4 mb-3" style="color: blue;" width="100" height="100" aria-hidden="true">
					<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
</svg>				</svg>
				<h1 class="text-body-emphasis"><b>Vote</b>@maventplan</h1>
				<p class="col-lg-8 mx-auto fs-5 text-muted">
					System anonimowego głosowania z użyciem kodów. Nie wymaga logowania, wykonuje różnego rodzaju zestawienia.				</p>
				<div class="gap-2 mb-5 align-items-baseline">
                    <form class="mb-3" method="post">
                        <div class="input-group input-group-lg">
                          <div class="form-floating flex-grow-1">
                            <input type="text" class="form-control fw-bold" id="vote_token" placeholder="123456" name="vote_token" inputmode="numeric" pattern="[0-9]*">
                            <label for="vote_token">Kod głosowania</label>
                          </div>
                          <button class="btn btn-outline-primary" type="submit">Głosuj</button>
                        </div>
						  <div class="cf-turnstile mt-3" data-sitekey="0x4AAAAAABhPRId8qpQGga-A" data-theme="light"></div>
                      </form>
                                      
					<a class="btn btn-outline-secondary btn-lg px-4 rounded-pill" href="/login.php">
					<b>Stwórz</b><br>
					<span class="fs-6">głosowanie</span>
					</a> 
				</div>
			</div>
		</div>
		<div class="b-example-divider"></div>
		<!--<div class="container my-5">
			<div class="position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5">
				<button type="button" class="position-absolute top-0 end-0 p-3 m-3 btn-close bg-secondary bg-opacity-10 rounded-pill" aria-label="Close"></button> 
				<svg class="bi mt-5 mb-3" width="48" height="48" aria-hidden="true">
					<use xlink:href="#check2-circle"></use>
				</svg>
				<h1 class="text-body-emphasis">Placeholder jumbotron</h1>
				<p class="col-lg-6 mx-auto mb-4">
					This faded back jumbotron is useful for placeholder content. It's also a great way to add a bit of context to a page or section when no content is available and to encourage visitors to take a specific action.
				</p>
				<button class="btn btn-primary px-5 mb-5" type="button">
				Call to action
				</button> 
			</div>
		</div>
		<div class="b-example-divider"></div>
		<div class="my-5">
			<div class="p-5 text-center bg-body-tertiary">
				<div class="container py-5">
					<h1 class="text-body-emphasis">Full-width jumbotron</h1>
					<p class="col-lg-8 mx-auto lead">
						This takes the basic jumbotron above and makes its background edge-to-edge with a <code>.container</code> inside to align content. Similar to above, it's been recreated with built-in grid and utility classes.
					</p>
				</div>
			</div>
		</div>
		<div class="b-example-divider"></div>-->
		<div class="container my-5">
			<div class="p-5 text-center bg-body-tertiary rounded-3">
				<h1 class="text-body-emphasis"><b>Głosowania</b><br>publiczne</h1>
<div class="list-group">
				<a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16" color="blue">
  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>					<div class="d-flex gap-2 w-100 justify-content-between">
						<div>
							<h6 class="mb-0 text-start">List group item heading</h6>
							<p class="mb-0 opacity-75 text-start">Some placeholder content in a paragraph.</p>
						</div>
						<small class="opacity-50 text-nowrap">User1</small> 
					</div>
				</a>
				<a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16" color="blue">
  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>					<div class="d-flex gap-2 w-100 justify-content-between">
						<div>
							<h6 class="mb-0 text-start">Another title here</h6>
							<p class="mb-0 opacity-75 text-start">Some placeholder content in a paragraph that goes a little longer so it wraps to a new line.</p>
						</div>
						<small class="opacity-50 text-nowrap">Manager</small> 
					</div>
				</a>
				<a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16" color="blue">
  <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
  <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>					<div class="d-flex gap-2 w-100 justify-content-between">
						<div>
							<h6 class="mb-0 text-start">Third heading</h6>
							<p class="mb-0 opacity-75 text-start">Some placeholder content in a paragraph.</p>
						</div>
						<small class="opacity-50 text-nowrap">-</small> 
					</div>
				</a>
			</div>
			</div>
		</div>
        <script>
  const input = document.getElementById('vote_token');

  input.addEventListener('input', function () {
    // Usuń wszystkie znaki, które nie są cyframi i ogranicz do 6 znaków
    this.value = this.value.replace(/\D/g, '').slice(0, 6);
  });
</script>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
    <?php	require_once("default/footer.php"); ?>
</body>
</html>
