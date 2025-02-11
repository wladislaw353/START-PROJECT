<?php
# =========== CONFIG ==========================================================================

$lang_input_names = array(
    'fname' => 'Name',
    'phone' => 'Phone',
    'email' => 'E-mail',
    'comment' => 'Comment',
    'target' => 'Target',
);

$title_text = 'Website Form Submission';

# E-mail for errors
$dev_mail = '@gmail.com';

#-🔸-reCAPTCHA -------------------------------------------------------------------------------
$use_recaptcha = false;
$recaptcha_secret = '';
$recaptcha_min_score = 0.7;

#-🔸-E-mail ----------------------------------------------------------------------------------
$to_email = true;
$send_to_mail = '';

# SMTP Configuration (optional)
$use_smtp = false;
$smtp_config = [
    'host' => 'smtp.example.com',
    'port' => 587,
    'username' => '',
    'password' => '',
    'from_email' => '',
    'secure' => 'ssl' // ssl/tls
];

#-🔸-Telegram --------------------------------------------------------------------------------
$to_telegram = false;
$tg_token = '';
$tg_chatID = '';
$tg_ip = false;

#-🔸-LP CRM ----------------------------------------------------------------------------------
$to_lp = false;
$lp_api_key = '';
$lp_domain = '';
$lp_office = 1;
$lp_delivery = 1;
$lp_payment = 4;

#-🔸-Key CRM ----------------------------------------------------------------------------------
$to_keycrm = false;
$keycrm_token = '';
$keycrm_sid = 1;
$keycrm_mid = 1;
$keycrm_pid = 1;

# ==================================================================================================

//    require_once 'vendor/autoload.php';
//    use PHPMailer\PHPMailer\PHPMailer;
//    use PHPMailer\PHPMailer\Exception;

# ==== YOU DON'T NEED TO EDIT CODE BELOW ===========================================================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

if ($use_recaptcha && !empty($recaptcha_secret)) {
    $recaptcha_token = $_POST['recaptcha_token'] ?? '';
    if (empty($recaptcha_token)) {
        http_response_code(400);
        exit(json_encode(['success' => false, 'error' => 'No reCAPTCHA token provided']));
    }

    $recaptcha_verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptcha_secret}&response={$recaptcha_token}");
    $recaptcha_verify = json_decode($recaptcha_verify);

    if (!$recaptcha_verify->success) {
        sendErrorToDev('reCAPTCHA verification failed: ' . json_encode($recaptcha_verify));
        http_response_code(400);
        exit(json_encode(['success' => false, 'error' => 'reCAPTCHA verification failed']));
    }

    if ($recaptcha_verify->score < $recaptcha_min_score) {
        sendErrorToDev("reCAPTCHA score too low: {$recaptcha_verify->score}");
        http_response_code(400);
        exit(json_encode(['success' => false, 'error' => 'reCAPTCHA score too low']));
    }
}

$data = [];
foreach ($_POST as $name => $value) {
    if (!empty($value)) {
        $data[$name] = trim(strip_tags($value));
    }
}

session_start();
$utm = [
    'utm_source' => $_SESSION['utm_source'] ?? '',
    'utm_medium' => $_SESSION['utm_medium'] ?? '',
    'utm_campaign' => $_SESSION['utm_campaign'] ?? '',
    'utm_content' => $_SESSION['utm_content'] ?? '',
    'utm_term' => $_SESSION['utm_term'] ?? ''
];

$user_info = [
    'ip' => $_SERVER['REMOTE_ADDR'],
    'user_agent' => $_SERVER['HTTP_USER_AGENT']
];

$user_info_html = "<br><br><p>IP: {$user_info['ip']}</p>";
$user_info_text = "\n\nIP: {$user_info['ip']}";

$uploaded_files = [];
if (!empty($_FILES)) {
    foreach ($_FILES as $field => $file) {
        if (isset($file['error']) && $file['error'] === UPLOAD_ERR_OK) {
            $uploaded_files[] = $file;
        }
        elseif (is_array($file['error'])) {
            for ($i = 0; $i < count($file['error']); $i++) {
                if ($file['error'][$i] === UPLOAD_ERR_OK) {
                    $uploaded_files[] = [
                        'name'     => $file['name'][$i],
                        'type'     => $file['type'][$i],
                        'tmp_name' => $file['tmp_name'][$i],
                        'error'    => $file['error'][$i],
                        'size'     => $file['size'][$i],
                    ];
                }
            }
        }
    }
}

function sendErrorToDev($error_msg)
{
    global $dev_mail;
    mail(
        $dev_mail,
        'Form Submission Error',
        $error_msg,
        "From: site@{$_SERVER['SERVER_NAME']}\r\nContent-type: text/html; charset=utf-8"
    );
}

if ($to_email) {
    $msg = '<table>';
    foreach ($data as $key => $value) {
        if (isset($lang_input_names[$key])) {
            if ($key == 'email') {
                $value = "<a href='mailto:$value'>$value</a>";
            }
            if ($key == 'phone') {
                $value = "<a href='tel:$value'>$value</a>";
            }
            $msg .= "<tr><td><strong>{$lang_input_names[$key]}:&nbsp;&nbsp;</strong></td><td>$value</td></tr>";
        }
    }

    $msg .= '<tr><td><br></td><td><br></td></tr>';
    foreach ($utm as $key => $value) {
        if ($value) {
            $msg .= "<tr><td><strong>$key:&nbsp;&nbsp;</strong></td><td>$value</td></tr>";
        }
    }
    $msg .= '</table>' . $user_info_html;

    if ($use_smtp && class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        try {
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = $smtp_config['host'];
            $mail->SMTPAuth = true;
            $mail->Username = $smtp_config['username'];
            $mail->Password = $smtp_config['password'];
            $mail->SMTPSecure = $smtp_config['secure'];
            $mail->Port = $smtp_config['port'];
            $mail->CharSet = 'UTF-8';
            $mail->setFrom($smtp_config['from_email'], $_SERVER['SERVER_NAME']);
            $mail->addAddress($send_to_mail);
            $mail->isHTML(true);
            $mail->Subject = $title_text;
            $mail->Body = $msg;

            foreach ($uploaded_files as $file) {
                $mail->addAttachment($file['tmp_name'], $file['name']);
            }

            if (!$mail->send()) {
                sendErrorToDev("SMTP sending error: {$mail->ErrorInfo}");
            }
        } catch (Exception $e) {
            sendErrorToDev("SMTP error: {$e->getMessage()}");
        }
    }
    elseif (!empty($uploaded_files)) {
        $from = 'order' . rand(1000, 10000) . '@' . $_SERVER['SERVER_NAME'];
        $boundary = md5(time());
        $headers = "From: $from\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        $body = "--$boundary\r\n";
        $body .= "Content-Type: text/html; charset=utf-8\r\n";
        $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $body .= $msg . "\r\n";

        foreach ($uploaded_files as $file) {
            $file_content = file_get_contents($file['tmp_name']);
            $file_content = chunk_split(base64_encode($file_content));
            $body .= "--$boundary\r\n";
            $body .= 'Content-Type: ' . $file['type'] . "; name=\"" . $file['name'] . "\"\r\n";
            $body .= "Content-Transfer-Encoding: base64\r\n";
            $body .= "Content-Disposition: attachment; filename=\"" . $file['name'] . "\"\r\n\r\n";
            $body .= $file_content . "\r\n";
        }
        $body .= "--$boundary--";

        if (!mail($send_to_mail, $title_text, $body, $headers)) {
            sendErrorToDev("Regular mail sending error to: $send_to_mail");
        }
    }
    else {
        $from = 'order' . rand(1000, 10000) . '@' . $_SERVER['SERVER_NAME'];
        $headers = "From: $from\r\nContent-type: text/html; charset=utf-8";
        if (!mail($send_to_mail, $title_text, $msg, $headers)) {
            sendErrorToDev("Regular mail sending error to: $send_to_mail");
        }
    }
}

if ($to_telegram && !empty($tg_token) && !empty($tg_chatID)) {
    $tg_msg = "\n";
    foreach ($data as $key => $value) {
        if (isset($lang_input_names[$key])) {
            $tg_msg .= "<strong>{$lang_input_names[$key]}: </strong>$value\n";
        }
    }

    foreach ($utm as $key => $value) {
        if ($value) {
            $tg_msg .= "\n$key: $value";
        }
    }
    if ($tg_ip) {
        $tg_msg .= $user_info_text;
    }

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => "https://api.telegram.org/bot$tg_token/sendMessage",
        CURLOPT_POST           => 1,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_POSTFIELDS     => [
            'chat_id'    => $tg_chatID,
            'text'       => $tg_msg,
            'parse_mode' => 'html'
        ]
    ]);

    if (!curl_exec($ch)) {
        sendErrorToDev('Telegram sending error: ' . curl_error($ch));
    }
    curl_close($ch);

    if (!empty($uploaded_files)) {
        foreach ($uploaded_files as $file) {
            $ch = curl_init();
            $post_fields = [
                'chat_id'  => $tg_chatID,
                'document' => new CURLFile($file['tmp_name'], $file['type'], $file['name']),
                'caption'  => 'File attachment: ' . $file['name']
            ];
            curl_setopt_array($ch, [
                CURLOPT_URL            => "https://api.telegram.org/bot$tg_token/sendDocument",
                CURLOPT_POST           => 1,
                CURLOPT_RETURNTRANSFER => 1,
                CURLOPT_TIMEOUT        => 10,
                CURLOPT_POSTFIELDS     => $post_fields
            ]);
            if (!curl_exec($ch)) {
                sendErrorToDev('Telegram document sending error: ' . curl_error($ch));
            }
            curl_close($ch);
        }
    }
}

if ($to_lp && !empty($lp_api_key) && !empty($lp_domain)) {
    $products = isset($data['products_ids']) ? explode(', ', $data['products_ids']) : [];
    $lp_products = [];

    foreach ($products as $product) {
        $lp_products[] = [
            'product_id' => $product,
            'count' => 1
        ];
    }

    $lp_data = [
        'key' => $lp_api_key,
        'order_id' => number_format(round(microtime(true) * 10), 0, '.', ''),
        'country' => 'UA',
        'office' => $lp_office,
        'products' => urlencode(serialize($lp_products)),
        'bayer_name' => $data['fname'] ?? '',
        'phone' => $data['phone'] ?? '',
        'email' => $data['email'] ?? '',
        'comment' => $data['comment'] ?? '',
        'site' => $_SERVER['SERVER_NAME'],
        'ip' => $user_info['ip'],
        'delivery' => $lp_delivery,
        'delivery_adress' => $data['city'] ?? '',
        'payment' => $lp_payment
    ];

    foreach ($utm as $key => $value) {
        $lp_data[$key] = $value;
    }

    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "http://$lp_domain.lp-crm.biz/api/addNewOrder.html",
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => $lp_data
    ]);

    if (!curl_exec($curl)) {
        sendErrorToDev('LP CRM sending error: ' . curl_error($curl));
    }
    curl_close($curl);
}

if ($to_keycrm && !empty($keycrm_token)) {
    $keyCrmData = [
        'title' => $title_text . ' ' . ($data['target'] ?? ''),
        'source_id' => $keycrm_sid,
        'manager_comment' => $data['comment'] ?? '',
        'manager_id' => $keycrm_mid,
        'pipeline_id' => $keycrm_pid,
        'contact' => [
            'full_name' => ($data['fname'] ?? '') . ' ' . ($data['lname'] ?? ''),
            'email' => $data['email'] ?? '',
            'phone' => $data['phone'] ?? ''
        ]
    ];

    foreach ($utm as $key => $value) {
        $keyCrmData[$key] = $value;
    }

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => 'https://openapi.keycrm.app/v1/leads',
        CURLOPT_POST => 1,
        CURLOPT_POSTFIELDS => json_encode($keyCrmData),
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_HTTPHEADER => [
            'Content-type: application/json',
            'Accept: application/json',
            'Cache-Control: no-cache',
            'Pragma: no-cache',
            "Authorization: Bearer $keycrm_token"
        ]
    ]);

    if (!curl_exec($ch)) {
        sendErrorToDev('Key CRM sending error: ' . curl_error($ch));
    }
    curl_close($ch);
}

header('Content-Type: application/json');
echo json_encode(['success' => true]);