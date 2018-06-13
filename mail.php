<?php

  $mail = json_decode($_POST['mail'], true);

  $to = "contact@fournieralexis.fr";
  $subject = "$mail[3]";
  $txt = "De : $mail[0] $mail[1]. $mail[4]";
  $headers = "From:$mail[2]";

  $return = mail($to,$subject,$txt,$headers);

  echo $return;
