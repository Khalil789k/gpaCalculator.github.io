<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    // Process and send email here
    $to = "your@example.com"; // Your email address
    $subject = "Contact Us Form Submission";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    $mail_body = "Name: $name\n";
    $mail_body .= "Email: $email\n\n";
    $mail_body .= "Message:\n$message";

    if (mail($to, $subject, $mail_body, $headers)) {
        // Email sent successfully
        echo "Your message has been sent. We will get back to you soon.";
    } else {
        // Email sending failed
        echo "There was an error sending your message. Please try again later.";
    }
}
?>
