<?php
error_reporting(0);
$a = new mysqli('127.0.0.1', 'casino', 'SamTerry95.', 'users');
if ($a->connect_errno){
    die('connection error');
} else {
   $b = 'SELECT * FROM users';
   $c = $a->query($b);
   print_r($c);
   if($c->num_rows>0) {
       $d = $c->fetch_assoc();
       print_r($d);
   }
}

?>