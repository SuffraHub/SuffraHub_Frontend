<script src="scripts/ServiceWorker.min.js"></script>
		<div class="container">
			<footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
				<p class="col-md-4 mb-0 text-body-secondary">&copy; 2025 mrstahuuu - maventplan<br>
            <span class="fw-bold">Vote v.0.1</span></p>
				<a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none" aria-label="Bootstrap">
					<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" color="blue" class="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
</svg>
				</a>
				<ul class="nav col-md-4 justify-content-end">
					<li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Home</a></li>
					<li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Features</a></li>
					<li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">Pricing</a></li>
					<li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">FAQs</a></li>
					<li class="nav-item"><a href="#" class="nav-link px-2 text-body-secondary">About</a></li>
				</ul>
			</footer>
</div>
<?php

if (isset($_SESSION['poll_edited']) || isset($_SESSION['status_message'])): ?>
<div class="toast-container position-fixed bottom-0 end-0 p-3 d-flex flex-column gap-2">
  <?php if (isset($_SESSION['poll_edited'])): ?>
    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
      <div class="toast-header">
        <img src="/img/icon.png" width="16px" height="16px" class="rounded me-2" alt="...">
        <strong class="me-auto">Informacja</strong>
        <small>Teraz</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Zamknij"></button>
      </div>
      <div class="toast-body">
        <?php 
          echo $_SESSION['poll_edited']; 
          unset($_SESSION['poll_edited']); 
        ?>
      </div>
    </div>
  <?php endif; ?>

  <?php if (isset($_SESSION['status_message']) && !empty($_SESSION['status_message'])): ?>
    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
      <div class="toast-header">
        <img src="/img/icon.png" width="16px" height="16px" class="rounded me-2" alt="...">
        <strong class="me-auto">Informacja</strong>
        <small>Teraz</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Zamknij"></button>
      </div>
      <div class="toast-body">
        <?php 
          echo $_SESSION['status_message']; 
          unset($_SESSION['status_message']); 
        ?>
      </div>
    </div>
  <?php endif; ?>
</div>
<?php endif; ?>

<!-- Bootstrap JS i Toast show script -->
<script>
  const toastElList = document.querySelectorAll('.toast');
  toastElList.forEach((toastEl) => {
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  });
</script>