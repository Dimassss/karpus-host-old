<?php
require_once("MailSender.php");

class MainController extends Controller{

  public function showLoginPage(){
    if($this->f3->exists("SESSION.username")) $this->f3->reroute("/crm/main");
    $nameTable = $this->f3->get("PARAMS.nameTable");

    $page = new Template;
    echo $page->render("devlogin.htm");
  }

  public function mainPage(){
    $alertMessage = $this->f3->get("SESSION.alertMessage");
    $name = "";
    $telephone = "";
    $email = "";
    $message = "";
    $r = $this->f3->get("SESSION.r");
    if($alertMessage !== "1"){
      $name = $this->f3->get("SESSION.name");
      $telephone = $this->f3->get("SESSION.telephone");
      $email = $this->f3->get("SESSION.email");
      $message = $this->f3->get("SESSION.message");
    }

    $this->f3->set("name", $name);
    $this->f3->set("telephone", $telephone);
    $this->f3->set("email", $email);
    $this->f3->set("message", $message);
    $this->f3->set("alertMessage", $alertMessage);
    $this->f3->set("SESSION.alertMessage","");
    $this->f3->set("r", $r);

    $view = new Template;
    echo $view->render("index.html", "text/html");
  }

  public function sendForm1(){
    if($this->db !== false) $mailTable = new Mail($this->db);
    $alertMessage = "1";
    $name = $this->f3->get("POST.name");
    $telephone = $this->f3->get("POST.telephone");
    $email = $this->f3->get("POST.email");
    $message = $this->f3->get("POST.message");
  	$smtpmail = $this->f3->get('smtpmail');
  	$smtppass = $this->f3->get('smtppass');
  	$smtpname = $this->f3->get('smtpname');

    if(preg_match("/[a-zа-я]/i", $telephone)){
      $alertMessage = "0";
    }

    // Google reCaptcha secret key
    $secretKey  = "6Ld8l2UUAAAAAA6pt6rucB44h1_H-8lTpI4hIlde";

    if($this->f3->exists('POST.g-recaptcha-response')){
        // Get verify response data
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL,
            'https://www.google.com/recaptcha/api/siteverify?secret='.$secretKey.'&response='.$this->f3->get("POST.g-recaptcha-response")
        );
        $verifyResponse = curl_exec($ch);
        //$verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secretKey.'&response='.$this->f3->get("POST.g-recaptcha-response"));
        $responseData = json_decode($verifyResponse);

       $this->f3->set("SESSION.r", /*http_build_query($this->f3->get("POST"))*//*json_encode($responseData)*/"Hi!");

        if(!$responseData->success){
            $alertMessage = "2";
        }
    }else{
        $alertMessage = "2";
    }

    //save data to db, table = orders
    if($alertMessage==="1"){
      if($this->db !== false) $mailTable->create();

	    $body = "\nTelephone of ".$name." is ".$telephone."\nEmail of ".$name." is ".$email."\n\n\n".$message;
	    //sendMail('smtp.gmail.com', 587, 'TLS', $smtpmail, $smtppass, $smtpname, $email, $body, "Filled form from site", $name);
	    sendMail('mail.karpus.com.ua', 587, 'TLS', $smtpmail, $smtppass, $smtpname, $email, $body, "Filled form from site", $name);
    }else{
      $this->f3->set("SESSION.name", $name);
      $this->f3->set("SESSION.telephone", $telephone);
      $this->f3->set("SESSION.email", $email);
      $this->f3->set("SESSION.message", $message);
    }

    //redirect to main page
    $this->f3->set("SESSION.alertMessage", $alertMessage);
    $this->f3->reroute("/#lets_introduce");
  }

}
?>
