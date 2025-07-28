<?php
require_once 'default/config.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

function connecttodatabase() {
    global $db_host, $db_name, $db_user, $db_password;
    try {
        $pdo = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("Błąd połączenia z bazą danych: " . $e->getMessage());
    }
}

if (isset($_COOKIE['uid_token'])) {
    $dbh = connecttodatabase();
    
    // Usunięcie tokena tylko dla bieżącego urządzenia
    $query = $dbh->prepare("DELETE FROM user_tokens WHERE token = ?");
    $query->execute([$_COOKIE['uid_token']]);

    // Usunięcie ciasteczka
    setcookie('uid_token', '', time() - 3600, "/", "", true, true);
}

// Zniszcz sesję
session_unset();
session_destroy();

// Przekieruj użytkownika na stronę logowania
header("Location: index.php");
exit();
?>
