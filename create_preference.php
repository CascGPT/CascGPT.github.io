<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// -------------------------------
// CONFIGURACIÓN
// -------------------------------
// ⚠ Reemplaza por tu Access Token real
$ACCESS_TOKEN = "TEST-CHANGE-ME";

$POST = json_decode(file_get_contents("php://input"), true);

// Validar request
if (!$POST || !isset($POST["items"])) {
    echo json_encode(["error" => "Invalid request"]);
    exit;
}

// -------------------------------
// CREAR PREFERENCIA
// -------------------------------

$preferenceData = [
    "items" => $POST["items"],
    "payer" => [
        "email" => "cliente@example.com"
    ],
    "payment_methods" => [
        "excluded_payment_types" => [],
        "installments" => 12,           // Máximo de mensualidades
        "default_payment_method_id" => null
    ],
    "back_urls" => [
        "success" => "https://tusitio.com/success",
        "failure" => "https://tusitio.com/failure",
        "pending" => "https://tusitio.com/pending"
    ],
    "auto_return" => "approved",
];

// Llamada a Mercado Pago
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://api.mercadopago.com/checkout/preferences");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $ACCESS_TOKEN",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($preferenceData));

$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

// -------------------------------
// RESPUESTA
// -------------------------------

if ($status >= 200 && $status < 300) {
    echo $response;
} else {
    echo json_encode([
        "error" => "Error en Mercado Pago",
        "status" => $status,
        "response" => $response
    ]);
}
?>
