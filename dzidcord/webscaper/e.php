<?php
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));

// Execute the POST request and close cURL session
$response = curl_exec($ch);
curl_close($ch);

?>
