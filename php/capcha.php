<?php 
    $api_url = 'https://www.google.com/recaptcha/api/siteverify';
    $site_key = '6Lf1s2kUAAAAAKXrwtgHDVyUnkq9W6_8MI9lXfEQ';
    $secret_key = '6Lf1s2kUAAAAAMKfFeKfP1QJ0L4vpVTI2J9vVfvf';

    if(isset($_POST['submit'])) {
        
        // Lấy dữ liệu được post lên
        $site_key_post = $_POST['g-recaptcha-response'];

        //lấy IP của khach
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $remoteip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $remoteip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $remoteip = $_SERVER['REMOTE_ADDR'];
        }

        //tạo link kết nối
        $api_url = $api_url.'?secret='.$secret_key.'&response='.$site_key_post.'&remoteip='.$remoteip;
        //lấy kết quả trả về từ google
        $response = file_get_contents($api_url);
        //dữ liệu trả về dạng json
        $response = json_decode($response);
        if(!isset($response->success))
        {
            echo 'Captcha khong dung';
        }
        if($response->success == true)
        {
            echo 'Captcha dung';
        }else{
            echo 'Captcha khong dung';
        }
     
    }
?>