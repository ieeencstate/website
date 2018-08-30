<?php session_start();

if(!$_POST) exit;

///////////////////////////////////////////////////////////////////////////

	// Simple Configuration Options
	
	// Enter the email address that you want to emails to be sent to.
	// Example $address = "joe.doe@yourdomain.com";
		 
    $address = "ncsu.ieee@gmail.com";

	// Twitter Direct Message notification control.
	// Set $twitter_active to 0 to disable Twitter Notification
	
	$twitter_active	= 0;
	$twitter_user	= "";
	$twitter_pass	= "";
	
	// END OF Simple Configuration Options

///////////////////////////////////////////////////////////////////////////

// Only edit below this line if either instructed to do so by the author or have extensive PHP knowledge.
// Please Note, we cannot support this file package if modifications have been made below this line.
 
	$name     = $_POST['name'];
    $email    = $_POST['email'];
    $subject  = $_POST['subject'];
    $comments = $_POST['comments'];
		
    $verify   = $_POST['verify'];
    $verify   = md5($verify);
	
	// Important Variables
	$session = $_SESSION['verify'];
	$error = '';

		if(trim($name) == '') {
        	$error .= '<li>Your name is required.</li>';
		}
        
		if(trim($email) == '') {
        	$error .= '<li>Your e-mail address is required.</li>';
	    } elseif(!isEmail($email)) {
        	$error .= '<li>You have entered an invalid e-mail address.</li>';
        }
		
		if(trim($comments) == '') {
        	$error .= '<li>You must enter a message to send.</li>';
        }
		
		if($session != $verify) {
	    	$error .= '<li>The verification code you entered is incorrect.</li>';
	    }
		
		if($error != '') { 
			echo '<div class="error_message">Attention! Please correct the errors below and try again.';
			echo '<ul class="error_messages">' . $error . '</ul>';
			echo '</div>';
		
		} else {
        
		if(get_magic_quotes_gpc()) { $comments = stripslashes($comments); }

         // Advanced Configuration Option.
         // i.e. The standard subject will appear as, "You've been contacted by John Doe."
		 
         $e_subject = 'You\'ve been contacted by ' . $name . '.';

         // Advanced Configuration Option.
		 // You can change this if you feel that you need to.
		 // Developers, you may wish to add more fields to the form, in which case you must be sure to add them here.
					
		 $msg  = "You have been contacted by $name with regards to $subject, they passed verification and their message is as follows.\r\n\n";
		 $msg .= "$comments\r\n\n";
		 $msg .= "You can contact $name via email $email.\r\n\n";
		 $msg .= "-------------------------------------------------------------------------------------------\r\n";
		 $msg .= "This message was sent to you via the Lennon template Contact Form";
							 		
		if($twitter_active == 1) { 
		
			$twitter_msg = $name . " - " . $comments . ". You can contact " . $name . " via email, " . $email ." or via phone " . $phone . ".";
			twittermessage($twitter_user,$twitter_pass,$twitter_msg);
		
		}

		if(mail($address, $e_subject, $msg, "From: $email\r\nReturn-Path: $email\r\n")) {
		
		 echo "<fieldset>";			
		 echo "<div id='success_page'>";
		 echo "<h3>Email Sent Successfully!</h3>";
		 echo "<p>Thank you <strong>$name</strong>, your message has been submitted to us.</p>";
		 echo "</div>";
		 echo "</fieldset>";
		 		 
		 } else {
		 
		 echo 'ERROR!'; // Dont Edit.
		 
		 }
                      
	}
	
function twittermessage($user,$pass,$comments) { // Twitter Direct Message CURL function, do not edit.
	$url = "http://twitter.com/direct_messages/new.xml";
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
	curl_setopt($ch, CURLOPT_USERPWD, "$user:$pass");
	curl_setopt($ch, CURLOPT_URL,$url);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS,"user=$user&text=$comments");
	$results = curl_exec ($ch);
	curl_close ($ch);
}	

function isEmail($email) { // Email address verification, do not edit.

return(preg_match("/^[-_.[:alnum:]]+@((([[:alnum:]]|[[:alnum:]][[:alnum:]-]*[[:alnum:]])\.)+(ad|ae|aero|af|ag|ai|al|am|an|ao|aq|ar|arpa|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|biz|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|com|coop|cr|cs|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|in|info|int|io|iq|ir|is|it|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mil|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|name|nc|ne|net|nf|ng|ni|nl|no|np|nr|nt|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pro|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)$|(([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\.){3}([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))$/i",$email));
		
}
?>
