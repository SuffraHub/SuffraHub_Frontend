<?php
require_once 'dompdf/autoload.inc.php';
require_once("default/config.php");
require_once("default/connect_to_db.php");
header('Content-type: application/pdf');
header('Content-Disposition: inline; filename="document.pdf"');
use Dompdf\Dompdf;
use Dompdf\Options;

// Funkcja do generowania unikalnego 6-cyfrowego kodu
function generateNumericCode() {
    return str_pad(mt_rand(0, 999999), 6, '0', STR_PAD_LEFT);
}

// Funkcja do formatowania kodu: 123456 -> 123 456
function formatCode($code) {
    return substr($code, 0, 3) . ' ' . substr($code, 3, 3);
}

// Ustawienia
$number_of_codes = $_POST['code_count'];
$poll_id = 1; // <- Stała wartość poll_id (na razie na sztywno)
$poll_name = "Testowe głosowanie nr. 1 z dnia 7 czerwca 2025";
$generated = [];


$dbh = connect_to_db();

while (count($generated) < $number_of_codes) {
    $to_generate = $number_of_codes - count($generated);
    $batch = [];

    // Wygeneruj partię unikalnych kodów (w RAM)
    while (count($batch) < $to_generate) {
        $code = generateNumericCode();
        if (!in_array($code, $generated) && !in_array($code, $batch)) {
            $batch[] = $code;
        }
    }

    // Sprawdź, które z kodów już istnieją w bazie danych
    $placeholders = rtrim(str_repeat('?,', count($batch)), ',');
    $stmt = $dbh->prepare("SELECT token FROM vote_tokens WHERE token IN ($placeholders)");
    $stmt->execute($batch);
    $existing_codes = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

    // Zostaw tylko kody, które nie istnieją w bazie
    $new_codes = array_diff($batch, $existing_codes);

    // Dodaj unikalne kody do końcowego zbioru
    $generated = array_merge($generated, $new_codes);
}

// === ZAPISZ KODY DO BAZY JEDNYM ZAPYTANIEM ===
$values = [];
$placeholders = [];

foreach ($generated as $code) {
    $placeholders[] = "(?, ?)";
    $values[] = $code;
    $values[] = $poll_id;
}

$sql = "INSERT INTO vote_tokens (token, poll_id) VALUES " . implode(", ", $placeholders);
$stmt = $dbh->prepare($sql);
$stmt->execute($values);



// Przygotowanie HTML-a
$html = '<html><head><style>
    body { font-family: DejaVu Sans, sans-serif; }
    h2 { text-align: center; }
    ul { font-size: 18px; line-height: 1.6; list-style-type: none; padding: 0; }
    li:nth-child(1) {
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #888;
    border-top: 1px dashed #888; }
    li { margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #888; }
    small { color: #888;}
    span {margin-right: 30px;}
    sub { color: #999;}
</style></head><body>';
$html .= "<h2>$poll_name</h2><ul>";
$i = 0;
foreach ($generated as $code) {
    $i++;
    $html .= '<li><span>' . $poll_name . '</span><small>{</small> <b>' . formatCode($code) . '</b> <small>}</small> <sub>'. $i . '</sub></li>';
}

$html .= '</ul></body></html>';

// Konfiguracja PDF
$options = new Options();
$options->set('isRemoteEnabled', true);
$dompdf = new Dompdf($options);
$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait');
$dompdf->render();



// Wyślij PDF do przeglądarki
$dompdf->stream("kody_glosowania.pdf", ["Attachment" => false]);


//header("Location: /admin_tokens.php");
exit;
?>
