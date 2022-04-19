<html>

    <head>
    <link rel="stylesheet" href="signUp.css">
    </head>

    <body>
        <div id="page">

        <?php
            $a = new mysqli('127.0.0.1', 'casino', 'SamTerry95.', 'users');
            if (isset($_POST['user']) && isset($_POST['email']) && isset($_POST['password'])){
                $b = $_POST['user'];
                $c = $_POST['email'];
                $d = $_POST['password'];
                if (!empty($b) && !empty($c) && !empty($d)) {
                    if (strlen($b)>35 || strlen($c)>35 || strlen($d)>35) {
                        echo 'maximun length should be smaller than 35';
                    } else {
                        if (filter_var($c, FILTER_VALIDATE_EMAIL)) {
                            echo 'invalid email';
                        } else {
                    $e = "SELECT * FROM users WHERE name='$b' OR Email='$c'";
                    $f = $a->query($e);
                if ($f->num_rows==0) {

                } else {
                    echo 'this username or email already exists';
                }
                }
                }
                } else {
                    echo 'fill in the boxes';
                }
            }
            
        ?>

            <form id="form" action="" method="POST">
                <div id="title"><h1>Sign Up</h1></div>
                <div id="boxes">
                    <input class="text" type="text" name="user" placeholder="Username" value='<?php if(isset($b)) {echo $b;} ?>'>
                    <input class="text" type="email" name="email" placeholder="Email" value='<?php if(isset($c)) {echo $c;} ?>'>
                    <input class="text" type="password" name="password" placeholder="Password">
                </div>
                <div id="term_div"><input id="terms" type="checkbox" checked="checked">I agree with the terms and conditions</div>
                <div id="button"><input id="sub" type="submit" name="submit" value="signUp"></div>

            </form>
        </div>

    </body>

</html>