<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function sendMail($host, $port, $protocol, $smtpmail, $smtppass, $smtpname, $email, $body, $subject, $name){
	$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
	try {
		//Server settings
		$mail->CharSet = 'UTF-8';
		$mail->SMTPDebug = 3;                                 // Enable verbose debug output
		$mail->isSMTP();                                      // Set mailer to use SMTP
		$mail->Host = $host;  // Specify main and backup SMTP servers
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = $smtpmail;                 // SMTP username
		$mail->Password = $smtppass;                           // SMTP password
		$mail->SMTPSecure = $protocol;                            // Enable TLS encryption, `ssl` also accepted
		$mail->Port = $port;                                    // TCP port to connect to

		//Recipients
		$mail->setFrom('admin@karpus.com.ua', $name);
		$mail->addAddress($smtpmail, 'Form Karpus');     // Add a recipient
		$mail->addCC('balyura@gmail.com');

		//Content
		$mail->isHTML(true);                                  // Set email format to HTML
		$mail->Subject = $subject;
		$mail->Body    = $body;

		$mail->send();
		return true;
	} catch (Exception $e) {
		//echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
		return false;
	}
}
