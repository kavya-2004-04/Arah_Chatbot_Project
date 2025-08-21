<?php
// DB connection setup
$host = "localhost";
$db = "contact_form_db"; // your database name
$user = "root";          // your DB username
$pass = "";              // your DB password

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form values safely
$name = htmlspecialchars($_POST['name']);
$email = htmlspecialchars($_POST['email']);
$subject = htmlspecialchars($_POST['subject']);
$message = htmlspecialchars($_POST['message']);

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $subject, $message);

if ($stmt->execute()) {
    echo "Thank you! Your message has been sent.";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>