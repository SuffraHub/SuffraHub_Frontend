		<?php
$stmt_role = $pdo->prepare("SELECT permissions_dictionary.description FROM users JOIN permissions_dictionary ON users.permissions = permissions_dictionary.permissions WHERE users.username = ?");
        $stmt_role->execute([$_SESSION['username']]);
        $result_role = $stmt_role->fetch(PDO::FETCH_ASSOC);
		?>
		<header class="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
		
			<a class="navbar-brand col-md-5 col-lg-2 me-0 px-3 fs-6 text-white text-wrap" href="/admin.php">Dzierżawa:<br> <b><?php echo $company_info['name']; ?></b></a> 
			<a class="btn btn-outline-light text-wrap ms-2 me-4 mb-2 mt-2" href="/admin_account.php"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg> Rola: <b><?php echo $result_role['description'] ?? "nieznana"; ?></b></a>
			<ul class="navbar-nav flex-row d-md-none">
				<li class="nav-item text-nowrap">
					<button class="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="white" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>
					</button>
				</li>
			</ul>
			<div id="navbarSearch" class="navbar-search w-100 collapse"> <input class="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search"> </div>
		</header>