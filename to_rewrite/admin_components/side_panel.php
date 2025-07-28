				<?php


try {
        $stmt_p_inactive = $pdo->prepare("SELECT polls.id, name, description FROM polls JOIN users ON users.id = polls.owner_id WHERE users.username = ? AND polls.is_active = 0");
        $stmt_p_inactive->execute([$_SESSION['username']]);
        $result_p_inactive = $stmt_p_inactive->fetchAll(PDO::FETCH_ASSOC);


} catch (PDOException $e) {
    $_SESSION['status_message'] = "Błąd zapytania: " . $e->getMessage();
}

try {
        $stmt_p_closed = $pdo->prepare("SELECT polls.id, name, description FROM polls JOIN users ON users.id = polls.owner_id WHERE users.username = ? AND polls.valid_to < NOW()");
        $stmt_p_closed->execute([$_SESSION['username']]);
        $result_p_closed = $stmt_p_closed->fetchAll(PDO::FETCH_ASSOC);


} catch (PDOException $e) {
    $_SESSION['status_message'] = "Błąd zapytania: " . $e->getMessage();
}

try {
        $stmt_p_active = $pdo->prepare("SELECT polls.id, name, description FROM polls JOIN users ON users.id = polls.owner_id WHERE users.username = ? AND polls.valid_to > NOW() AND is_active = 1");
        $stmt_p_active->execute([$_SESSION['username']]);
        $result_p_active = $stmt_p_active->fetchAll(PDO::FETCH_ASSOC);


} catch (PDOException $e) {
    $_SESSION['status_message'] = "Błąd zapytania: " . $e->getMessage();
}




				?>
				
				<div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
					<div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
						<div class="offcanvas-header">
							<h5 class="offcanvas-title text-white" id="sidebarMenuLabel">Dzierżawa:<br> <b><?php echo $company_info['name']; ?></b></h5>
							<button type="button" class="btn-close text-white" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button> 
						</div>
						<div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
<ul class="nav flex-column">
								<li class="nav-item">
									<a class="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="/">
										<svg class="bi" aria-hidden="true">
											<use xlink:href="#house-fill"></use>
										</svg>
										Strona główna
									</a>
								</li>
                                <li class="nav-item">
									<a class="nav-link d-flex align-items-center gap-2 active" aria-current="page" href="/admin.php">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color="black" class="bi bi-house-gear-fill" viewBox="0 0 16 16">
  <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708z"/>
  <path d="M11.07 9.047a1.5 1.5 0 0 0-1.742.26l-.02.021a1.5 1.5 0 0 0-.261 1.742 1.5 1.5 0 0 0 0 2.86 1.5 1.5 0 0 0-.12 1.07H3.5A1.5 1.5 0 0 1 2 13.5V9.293l6-6 4.724 4.724a1.5 1.5 0 0 0-1.654 1.03"/>
  <path d="m13.158 9.608-.043-.148c-.181-.613-1.049-.613-1.23 0l-.043.148a.64.64 0 0 1-.921.382l-.136-.074c-.561-.306-1.175.308-.87.869l.075.136a.64.64 0 0 1-.382.92l-.148.045c-.613.18-.613 1.048 0 1.229l.148.043a.64.64 0 0 1 .382.921l-.074.136c-.306.561.308 1.175.869.87l.136-.075a.64.64 0 0 1 .92.382l.045.149c.18.612 1.048.612 1.229 0l.043-.15a.64.64 0 0 1 .921-.38l.136.074c.561.305 1.175-.309.87-.87l-.075-.136a.64.64 0 0 1 .382-.92l.149-.044c.612-.181.612-1.049 0-1.23l-.15-.043a.64.64 0 0 1-.38-.921l.074-.136c.305-.561-.309-1.175-.87-.87l-.136.075a.64.64 0 0 1-.92-.382ZM12.5 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
</svg>
										Panel administracyjny
									</a>
								</li>
								<!--<li class="nav-item">
									<a class="nav-link d-flex align-items-center gap-2" href="/admin_tokens.php">
										<svg class="bi" aria-hidden="true">
											<use xlink:href="#file-earmark"></use>
										</svg>
										Utwórz głosowanie
									</a>
								</li>-->
								<li class="nav-item">
									<a class="nav-link d-flex align-items-center gap-2" href="/admin_questions.php">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color="black" class="bi bi-database" viewBox="0 0 16 16">
  <path d="M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313M13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A5 5 0 0 0 13 5.698M14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A5 5 0 0 0 13 8.698m0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525"/>
</svg>
										Baza pytań
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link d-flex align-items-center gap-2" href="/admin_tenant.php">
										<svg class="bi" aria-hidden="true">
											<use xlink:href="#people"></use>
										</svg>
										Dzierżawa
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link d-flex align-items-center gap-2" href="#">
										<svg class="bi" aria-hidden="true">
											<use xlink:href="#graph-up"></use>
										</svg>
										Raporty
									</a>
								</li>
								<!--<li class="nav-item">
									<a class="nav-link d-flex align-items-center gap-2" href="#">
										<svg class="bi" aria-hidden="true">
											<use xlink:href="#puzzle"></use>
										</svg>
										Integrations
									</a>
								</li>-->
							</ul>
							<h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
								<span>Moje głosowania</span> 
								<a class="link-secondary" href="admin_polls.php" aria-label="Add a new poll">
									<svg class="bi" aria-hidden="true">
										<use xlink:href="#plus-circle"></use>
									</svg>
								</a>
							</h6>
							<ul class="nav flex-column mb-auto">
								<li class="nav-item">
									<a class="nav-link d-flex align-items-center gap-2" data-bs-toggle="collapse" href="#collapseActive" role="button" aria-expanded="true" aria-controls="collapseActive">
										<svg class="bi" aria-hidden="true">
											<use xlink:href="#file-earmark-text"></use>
										</svg>
										Otwarte <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
</svg>
									</a>
									<div class="collapse show" id="collapseActive">
  										
    										<ul class="ms-2">
												<?php
												if ($result_p_active) {
													foreach ($result_p_active as $poll) {
echo '<li id="' . htmlspecialchars($poll['id']) . '">
    <form method="POST" action="poll_edit.php" style="display:inline;">
        <input type="hidden" name="poll_id" value="' . htmlspecialchars($poll['id']) . '">
        <input type="submit" value="' . htmlspecialchars($poll['name']) . '" style="border:none; background:none; color:inherit; cursor:pointer; padding:0; font:inherit;">
    </form>
</li>';
													}
												} else {
													echo "<li class='text-secondary'>brak</li>";
												}

												?>
											</ul>
										
									</div>
								</li>
								<li class="nav-item">
									<a class="nav-link d-flex align-items-center gap-2" data-bs-toggle="collapse" href="#collapseClosed" role="button" aria-expanded="false" aria-controls="collapseClosed">
										<svg class="bi" aria-hidden="true">
											<use xlink:href="#file-earmark-text"></use>
										</svg>
										Zamknięte <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
</svg>
									</a>
									<div class="collapse" id="collapseClosed">
  										
    										<ul class="ms-2">
												<?php
												
												if($result_p_closed) {
													foreach ($result_p_closed as $poll) {
														echo '<li id="' . htmlspecialchars($poll['id']) . '">
    <form method="POST" action="poll_edit.php" style="display:inline;">
        <input type="hidden" name="poll_id" value="' . htmlspecialchars($poll['id']) . '">
        <input type="submit" value="' . htmlspecialchars($poll['name']) . '" style="border:none; background:none; color:inherit; cursor:pointer; padding:0; font:inherit;">
    </form>
</li>';

													}
												} else {
													echo "<li class='text-secondary'>brak</li>";
												}

												?>
											</ul>
										
									</div>
								</li>
								<li class="nav-item">
									<a class="nav-link d-flex align-items-center gap-2" data-bs-toggle="collapse" href="#collapseInactive" role="button" aria-expanded="false" aria-controls="collapseInactive">
										<svg class="bi" aria-hidden="true">
											<use xlink:href="#file-earmark-text"></use>
										</svg>
										Nieaktywne <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
</svg>
									</a>
									<div class="collapse" id="collapseInactive">
  										
    										<ul class="ms-2">
												<?php
												
												if($result_p_inactive) {
													foreach ($result_p_inactive as $poll) {
echo '<li id="' . htmlspecialchars($poll['id']) . '">
    <form method="POST" action="poll_edit.php" style="display:inline;">
        <input type="hidden" name="poll_id" value="' . htmlspecialchars($poll['id']) . '">
        <input type="submit" value="' . htmlspecialchars($poll['name']) . '" style="border:none; background:none; color:inherit; cursor:pointer; padding:0; font:inherit;">
    </form>
</li>';
													}
												} else {
													echo "<li class='text-secondary'>brak</li>";
												}

												?>
											</ul>
										
									</div>
								</li>
								<!--<li class="nav-item">
									<a class="nav-link d-flex align-items-center gap-2" href="#">
										<svg class="bi" aria-hidden="true">
											<use xlink:href="#file-earmark-text"></use>
										</svg>
										Social engagement
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link d-flex align-items-center gap-2" href="#">
										<svg class="bi" aria-hidden="true">
											<use xlink:href="#file-earmark-text"></use>
										</svg>
										Year-end sale
									</a>
								</li>-->
							</ul>
							<hr class="my-3">
							<ul class="nav flex-column mb-auto">
								<li class="nav-item">
									<a class="nav-link d-flex align-items-center gap-2" href="admin_account.php">
										<svg class="bi" aria-hidden="true">
											<use xlink:href="#gear-wide-connected"></use>
										</svg>
										Ustawienia
									</a>
								</li>
								<li class="nav-item">
									<a class="nav-link d-flex align-items-center gap-2" href="logout.php">
										<svg class="bi" aria-hidden="true">
											<use xlink:href="#door-closed"></use>
										</svg>
										Wyloguj
									</a>
								</li>
							</ul>
                            						</div>
					</div>
				</div>