<?php
# =========== КОНФИГ ===============================================================================

    # Идентификация полей
    $lang_input_names = array(
        'fname'   => 'Name',
        'phone'   => 'Phone',
        'email'   => 'E-mail',
        'comment' => 'Comment',
        'target'  => 'Target',
    );

    # Заголовок письма
    $title_text = 'Заявка с сайта';

    # E-mail for errors
    $dev_mail = '@gmail.com';

    #-🔸-Почта -------------------------------------------------------------------------------------
        $to_email     = true;
        $send_to_mail = '';

    #-🔸-Telegram ----------------------------------------------------------------------------------
        $to_telegram = false;
        $tg_token  = "5455439721:AAGB33vAZ7aLHarSA8C8QES-lDCFYNVrZXk"; // токен телеграм бота, создать в @BotFather
        $tg_chatID = ""; // узнать id чата: https://api.telegram.org/bot5455439721:AAGB33vAZ7aLHarSA8C8QES-lDCFYNVrZXk/getUpdates
        $tg_ip = false; // Присылать IP и UserAgent

    #-🔸-LP CRM ----------------------------------------------------------------------------------
        $to_lp       = false;
        $lp_api_key  = ''; // Cекретный токенutm
        $lp_domain   = ''; // Поддомен CRM
        $lp_office   = 1;  // id отдела
        $lp_delivery = 1;  // id метода доставки
        $lp_payment  = 4;  // id метода оплаты

    #-🔸-Key CRM ----------------------------------------------------------------------------------
        $to_keycrm    = false;
        $keycrm_token = ''; // токен
        $keycrm_sid   = 1;  // идентификатор источника
        $keycrm_mid   = 1;  // идентификатор ответственного менеджера
        $keycrm_pid   = 1;  // идентификатор воронки (при отсутствии параметра будет использована первая воронка в списке)

# ==================================================================================================

if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') { $data=[]; $user_info_br = "<br><br><p>IP: " . $_SERVER['REMOTE_ADDR'] . "<br>UserAgent: " . $_SERVER['HTTP_USER_AGENT'] . "</p>"; $user_info_n = "\n\nIP: " . $_SERVER['REMOTE_ADDR'] . "\nUserAgent: " . $_SERVER['HTTP_USER_AGENT']; foreach (json_decode($_POST['msg']) as $input) { if (!empty($input->value)) $data[$input->name] = trim(addslashes(htmlspecialchars($input->value))); } if($utm_session){$utm=[]; foreach (json_decode($_POST['utm']) as $key => $input) { if ($input) $utm[$key] = trim(addslashes(htmlspecialchars($input))); }}else{session_start();$utm='';$utm.='utm_source: '.$_SESSION['utm_source'];$utm.="\nutm_medium: ".$_SESSION['utm_medium'];$utm.="\nutm_campaign: ".$_SESSION['utm_campaign'];$utm.="\nutm_content: ".$_SESSION['utm_content'];$utm.="\nutm_term: ".$_SESSION['utm_term'];} $title = $title_text; if ($to_email) { $from = "order" . rand(1000, 10000) . "@" . $_SERVER['SERVER_NAME']; $headers = "From: $from \r\n"; $headers .= "Content-type: text/html; charset=utf-8"; $msg = "<table>"; foreach ($data as $key => $value) { if ($key == 'email' and isset($value)) $value = "<a href='mailto:$value'>$value</a>"; if ($key == 'phone' and isset($value)) $value = "<a href='tel:$value'>$value</a>"; $msg .= "<tr><td><strong>" . $lang_input_names[$key] . ":&nbsp;&nbsp;</strong></td><td>$value<br></td></tr>"; $val = ''; } $msg .= "<tr><td><br></td><td><br></td></tr>"; if ($utm) { foreach ($utm as $key => $value) { $msg .= "<tr><td><strong>$key:&nbsp;&nbsp;</strong></td><td>$value<br></td></tr>"; } } $msg .= "</table>$user_info_br"; $sended = mail($send_to_mail, $title, $msg, $headers); if (!$sended) mail($dev_mail, 'Ошибка отправки на почту', $result['error_description'], "From: site@" . $_SERVER['SERVER_NAME'] . "\r\nContent-type: text/html; charset=utf-8"); } if ($to_telegram && $key2) { $msg = "\n"; foreach ($data as $key => $value) { $msg .= "<strong>" . $lang_input_names[$key] . ": </strong>$value\n"; } $msg .= "\n$utm"; if($tg_ip) $msg.="\n$user_info_n"; $ch = curl_init(); curl_setopt_array($ch, array(CURLOPT_URL => "https://api.telegram.org/bot$tg_token/sendMessage", CURLOPT_POST => 1, CURLOPT_RETURNTRANSFER => 1, CURLOPT_TIMEOUT => 10, CURLOPT_POSTFIELDS => array('chat_id' => $tg_chatID, 'text' => $msg, 'parse_mode' => 'html'),)); curl_exec($ch); } if ($to_lp && $key5) { $products = explode(', ', $data['products_ids']); $lp_products = []; foreach ($products as $key => $product) { $lp_products[] = array( 'product_id' => $product, 'count' => 1 ); } $lp_data = [ 'key' => $lp_api_key, 'order_id' => number_format(round(microtime(true)*10),0,'.',''), 'country' => 'UA', 'office' => $lp_office, 'products' => urlencode(serialize($lp_products)), 'bayer_name' => $data['fname'], 'phone' => $data['phone'], 'email' => $data['email'], 'comment' => $data['comment'], 'site' => $_SERVER['SERVER_NAME'], 'ip' => $_SERVER['REMOTE_ADDR'], 'delivery' => $delivery, 'delivery_adress' => $data['city'], 'payment' => $lp_payment, 'utm_source' => $utm['utm_source'], 'utm_medium' => $utm['utm_medium'], 'utm_term' => $utm['utm_term'], 'utm_content' => $utm['utm_content'], 'utm_campaign' => $utm['utm_campaign'] ]; $curl = curl_init(); curl_setopt($curl, CURLOPT_URL, "http://$lp_domain.lp-crm.biz/api/addNewOrder.html"); curl_setopt($curl, CURLOPT_POST, true); curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); curl_setopt($curl, CURLOPT_POSTFIELDS, $lp_data); $out = curl_exec($curl); curl_close($curl);}if($to_keycrm){ $keyCrmData=[ "title"=> $title_text.' '.$data['target'], "source_id"=> $keycrm_sid, "manager_comment"=> $data['comment'], "manager_id"=> $keycrm_mid, "pipeline_id"=> $keycrm_pid, "contact"=> [ "full_name"=> $data['fname'].' '.$data['lname'], "email"=> $data['email'], "phone"=> $data['phone'] ], "utm_source"=> $utm['utm_source'], "utm_medium"=> $utm['utm_medium'], "utm_campaign"=> $utm['utm_campaign'], "utm_term"=> $utm['utm_term'], "utm_content"=> $utm['utm_content'], ]; $keyCrmData = json_encode($keyCrmData);$ch = curl_init();curl_setopt($ch, CURLOPT_URL, "https://openapi.keycrm.app/v1/leads");curl_setopt($ch, CURLOPT_POST, 1);curl_setopt($ch, CURLOPT_POSTFIELDS,$keyCrmData);curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type: application/json","Accept: application/json","Cache-Control: no-cache","Pragmno-cache",'Authorization:  Bearer ' . $keycrm_token));$out = curl_exec($ch);curl_close($ch); }}