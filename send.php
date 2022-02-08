<?php
# =========== КОНФИГ ===============================================================================

    # Идентификация полей
    $lang_input_names = array(
        'fname'   => 'Имя',
        'phone'   => 'Телефон',
        'email'   => 'E-mail',
        'comment' => 'Комментарий',
        'target'  => 'Цель',
    );

    # Заголовок письма
    $title_text = 'Заявка с сайта';

    # E-mail для уведомлений об ошибках
    $dev_mail = '@gmail.com';

    #-🔸-Почта -------------------------------------------------------------------------------------
        $to_email     = true;
        $send_to_mail = '@gmail.com';

    #-🔸-Telegram ----------------------------------------------------------------------------------
        $to_telegram = false;
        $token  = ""; // токен телеграм бота, создать в @BotFather
        $chatID = ""; // узнать id чата: https://api.telegram.org/bot{токен}/getUpdates

    #-🔸-Bitrix24 ----------------------------------------------------------------------------------
        $to_bitrix = false;
        $domen24   = '.bitrix24.ua'; // домен

        // Для платного тарифа Bitrix24
        $webhook           = ''; // ключ вебхука из ссылки вебхука
        $user_id_auth      = ''; // id пользовтаеля из ссылки вебхука
        $user24_1          = ''; // id менеджера, указвается в лином кабинете
        $user24_2          = ''; // id второго менеджера, указвается в лином кабинете
        $user24_field_id_2 = ''; // id поля второго менеджера, указвается в лином кабинете
        $user24_3          = ''; // id третьего менеджера, указвается в лином кабинете
        $user24_field_id_3 = ''; // id поля третьего менеджера, указвается в лином кабинете

        // Для бесплатного тарифа Bitrix24
        $tarif_free = false; // если используется бесплатный тариф Bitrix24, поставить true
        $login24    = '';    // если тариф бесплатный, то тут указывается логин
        $password24 = '';    // если тариф бесплатный, то тут указывается пароль

        // Добавить к комментарию в CRM Bitrix24
        $comment2 = ''; // Добавить текст или данные, которых нет в $lang_input_names

    #-🔸-AmoCRM ----------------------------------------------------------------------------------
        $to_amo      = false;
        $pipeline_id = 0; // id воронки
        $user_amo    = 0; // id ответственного
        $amo_api_url = '/amo/amo'; // путь к файлу amo

# ==================================================================================================

if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') { $data = array(); $user_info_br = "<br><br><p>IP: " . $_SERVER['REMOTE_ADDR'] . "<br>UserAgent: " . $_SERVER['HTTP_USER_AGENT'] . "</p>"; $user_info_n = "\n\n<p>IP: " . $_SERVER['REMOTE_ADDR'] . "\nUserAgent: " . $_SERVER['HTTP_USER_AGENT'] . "</p>"; foreach (json_decode($_POST['msg']) as $input) { if (!empty($input->value)) $data[$input->name] = trim(addslashes(htmlspecialchars($input->value))); } $utm = array(); foreach (json_decode($_POST['utm']) as $key => $input) { if ($input) $utm[$key] = trim(addslashes(htmlspecialchars($input))); } $title = $title_text; if ($to_email) { $from = "order" . rand(1000, 10000) . "@" . $_SERVER['SERVER_NAME']; $headers = "From: $from \r\n"; $headers .= "Content-type: text/html; charset=utf-8"; $msg = "<table>"; foreach ($data as $key => $value) { if ($key == 'email' and isset($value)) $value = "<a href='mailto:$value'>$value</a>"; if ($key == 'phone' and isset($value)) $value = "<a href='tel:$value'>$value</a>"; $msg .= "<tr><td><strong>" . $lang_input_names[$key] . ":&nbsp;&nbsp;</strong></td><td>$value<br></td></tr>"; $val = ''; } $msg .= "<tr><td><br></td><td><br></td></tr>"; if ($utm) { foreach ($utm as $key => $value) { $msg .= "<tr><td><strong>$key:&nbsp;&nbsp;</strong></td><td>$value<br></td></tr>"; } } $msg .= "</table>$user_info_br"; $sended = mail($send_to_mail, $title, $msg, $headers); if (!$sended) mail($dev_mail, 'Ошибка отправки на почту', $result['error_description'], "From: site@" . $_SERVER['SERVER_NAME'] . "\r\nContent-type: text/html; charset=utf-8"); } if ($to_telegram && $key2) { $msg = "\n"; foreach ($data as $key => $value) { $msg .= "<strong>" . $lang_input_names[$key] . ": </strong>$value\n"; } $msg .= "\n$user_info_n"; if ($utm) { foreach ($utm as $key => $value) { $msg .= "<strong>$key: </strong>$value\n"; } } $ch = curl_init(); curl_setopt_array($ch, array(CURLOPT_URL => "https://api.telegram.org/bot$token/sendMessage", CURLOPT_POST => 1, CURLOPT_RETURNTRANSFER => 1, CURLOPT_TIMEOUT => 10, CURLOPT_POSTFIELDS => array('chat_id' => $chatID, 'text' => $msg, 'parse_mode' => 'html'),)); curl_exec($ch); } if ($to_bitrix && $key3) { if (!$tarif_free) { $queryUrl = "https://$domen24/rest/$user_id_auth/$webhook/crm.lead.add.json"; $makeQueryData = array('fields' => array('TITLE' => $data['phone'], 'NAME' => $data['fname'], 'EMAIL' => array("n0" => array("VALUE" => $data['email'], "VALUE_TYPE" => "WORK",),), 'PHONE' => array("n0" => array("VALUE" => $data['phone'], "VALUE_TYPE" => "WORK",),), 'COMMENTS' => nl2br($comment) . nl2br($comment2) . $user_info_br, 'UTM_SOURCE' => $utm['utm_source'], 'UTM_MEDIUM' => $utm['utm_medium'], 'UTM_CAMPAIGN' => $utm['utm_campaign'], 'UTM_CONTENT' => $utm['utm_content'], 'UTM_TERM' => $utm['utm_term'], 'ASSIGNED_BY_ID' => $user24_1, "UF_CRM_$user24_field_id_2" => $user24_2, "UF_CRM_$user24_field_id_3" => $user24_3,), 'params' => array("REGISTER_SONET_EVENT" => "Y")); $queryData = http_build_query($makeQueryData); $curl = curl_init(); curl_setopt_array($curl, array(CURLOPT_SSL_VERIFYPEER => 0, CURLOPT_POST => 1, CURLOPT_HEADER => 0, CURLOPT_RETURNTRANSFER => 1, CURLOPT_URL => $queryUrl, CURLOPT_POSTFIELDS => $queryData,)); $result = curl_exec($curl); curl_close($curl); $result = json_decode($result, 1); if (array_key_exists('error', $result)) { mail($dev_mail, 'Ошибка отправки в bitrix24', $result['error_description'], "From: site@" . $_SERVER['SERVER_NAME'] . " \r\nContent-type: text/html; charset=utf-8"); } } else { define('CRM_HOST', $domen24); define('CRM_PORT', '443'); define('CRM_PATH', '/crm/configs/import/lead.php'); define('CRM_LOGIN', $login24); define('CRM_PASSWORD', $password24); if ($_SERVER['REQUEST_METHOD'] == 'POST') { if (!empty($_POST['utm'])) { $utm = '<br><strong>UTM-метки:</strong><br>'; foreach (json_decode($_POST['utm']) as $key => $input) { $utm .= "<p><i>$key:</i> $input</p>"; } } else $utm = ''; $postData = array('TITLE' => $title, 'NAME' => $data['fname'], 'PHONE_MOBILE' => $data['phone'], 'EMAIL_HOME' => $data['email'], 'COMMENTS' => nl2br($data['comment']) . nl2br($comment2) . $utm . $user_info_br,); $postData['LOGIN'] = CRM_LOGIN; $postData['PASSWORD'] = CRM_PASSWORD; $fp = fsockopen("ssl://" . CRM_HOST, CRM_PORT, $errno, $errstr, 30); if ($fp) { $strPostData = ''; foreach ($postData as $key => $value) { $strPostData .= ($strPostData == '' ? '' : '&') . $key . '=' . urlencode($value); } $str = "POST " . CRM_PATH . " HTTP/1.0\r\n"; $str .= "Host: " . CRM_HOST . "\r\n"; $str .= "Content-Type: application/x-www-form-urlencoded\r\n"; $str .= "Content-Length: " . strlen($strPostData) . "\r\n"; $str .= "Connection: close\r\n\r\n"; $str .= $strPostData; fwrite($fp, $str); $result = ''; while (!feof($fp)) { $result .= fgets($fp, 128); } fclose($fp); $response = explode("\r\n\r\n", $result); } else mail($dev_mail, 'Ошибка отправки в bitrix24 (free tarif)', $result['error_description'], "From: site@" . $_SERVER['SERVER_NAME'] . " \r\nContent-type: text/html; charset=utf-8"); } } } if ($to_amo && $key4) { $amo_data = [ 'name' => $data['fname'], 'phone' => $data['phone'], 'email' => $data['email'], 'target' => $data['target'], 'target2' => $data['interesting'], 'age' => $data['age'], 'ip' => $_SERVER['REMOTE_ADDR'], 'domain' => $_SERVER['SERVER_NAME'], 'pipeline_id' => $pipeline_id, 'user_amo' => $user_amo, 'utm_source' => $utm['utm_source'], 'utm_content' => $utm['utm_content'], 'utm_medium' => $utm['utm_medium'], 'utm_campaign' => $utm['utm_campaign'], 'utm_term' => $utm['utm_term'], 'utm_referrer' => $utm['utm_referrer'], ]; $curl = curl_init(); curl_setopt($curl, CURLOPT_URL, 'https://'.$_SERVER['SERVER_NAME'].$amo_api_url); curl_setopt($curl, CURLOPT_POST, 1); curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); curl_setopt($ch, CURLOPT_POST, 1); curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($amo_data)); $out = curl_exec($curl); curl_close($curl); $result = json_decode($out, 1); print_r($out); if (!empty($out)) { mail($dev_mail, 'Ошибка отправки в AmoCRM', $out, "From: site@" . $_SERVER['SERVER_NAME'] . " \r\nContent-type: text/html; charset=utf-8"); } } }
