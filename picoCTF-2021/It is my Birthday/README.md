# It is my Birthday

## Description

I sent out 2 invitations to all of my friends for my birthday! I'll know if they get stolen because the two invites look similar, and they even have the same md5 hash, but they are slightly different! You wouldn't believe how long it took me to find a collision. Anyway, see if you're invited by submitting 2 PDFs to my website. http://mercury.picoctf.net:20277/

## Points

100 points

## Hint

Look at the category of this problem
How may a PHP site check the rules in the description?

## Solution 

![IMG](image/upload.png)

Bạn có thể thấy ta có một form cho phép upload 2 file lên server và bạn chỉ có thể upload được file **pdf** . Mình đã thử các cách bypass extension nhưng đều không được .

Vì lí do trên bạn khó có thể upload một file shell gì đó để RCE , tuy nhiên hướng đi của bài này khá rõ ràng qua phần miêu tả challenge . Để bypass bạn cần hai file pdf có cùng mã *hash md5* và nội dung phải khác nhau . 

Mk đã nghĩ đến ngay magic hash md5 đó là các chuỗi khác nhau nhưng có cùng mã hash đây là một lỗi xung đột vì md5 là một thuật toán giới hạn tức là sẽ tồn tại các chuỗi có cùng hash với nhau (https://crypto.stackexchange.com/questions/1434/are-there-two-known-strings-which-have-the-same-md5-hash-value ). Vì thế mình đã tạo ra hai file pdf chứa các chuỗi cùng hash md5 và upload nên nhưng fail các bạn ạ . 

Tiếp tục google search thì tìm được bài viết này (https://natmchugh.blogspot.com/2014/10/how-i-made-two-php-files-with-same-md5.html) , trong bài viết có đề cập đến việc tạo ra 2 file php với hành vi khác nhau nhưng cho cùng một mã hash md5 . Vậy là xong bây giờ ta chỉ việc tạo ra hai file pdf với nội dung sau :

> File [a.pdf](a.pdf) 
```
<?php

$space = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
if ('?G.???-)?????+?B?8????A???P?;"??P?ZU?5?$q4F?1c?-ŏC?S
?e?MIM???~?2?:?]b??\??/5???^?gn~3D7' == '?G.???-)?????+?B?8????A???P?;"??P?ZU?5?$q4F?1c?-ŏC?S
?e?MIM???~?2?:?]b??\??/5???^?gn~3D7' ) {
    echo 'Behaviour A',PHP_EOL;
} else {
    echo 'Behaviour B',PHP_EOL;
}
```
>File [b.pdf](b.pdf)

```
<?php

$space = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
if ('?G.???-)??????+?B?8????A???P?;"??Py[U?5?$q4F?1??-ŏC?S
?e?MIM???~?2?:?]b?p?\??/5???^?g?~3D7' == '?G.???-)?????+?B?8????A???P?;"??P?ZU?5?$q4F?1c?-ŏC?S
?e?MIM???~?2?:?]b??\??/5???^?gn~3D7' ) {
    echo 'Behaviour A',PHP_EOL;
} else {
    echo 'Behaviour B',PHP_EOL;
}
```

Sau khi upload web sẽ show ra mã nguồn và tất nhiên rồi cả flag nữa .

```
<?php

if (isset($_POST["submit"])) {
    $type1 = $_FILES["file1"]["type"];
    $type2 = $_FILES["file2"]["type"];
    $size1 = $_FILES["file1"]["size"];
    $size2 = $_FILES["file2"]["size"];
    $SIZE_LIMIT = 18 * 1024;

    if (($size1 < $SIZE_LIMIT) && ($size2 < $SIZE_LIMIT)) {
        if (($type1 == "application/pdf") && ($type2 == "application/pdf")) {
            $contents1 = file_get_contents($_FILES["file1"]["tmp_name"]);
            $contents2 = file_get_contents($_FILES["file2"]["tmp_name"]);

            if ($contents1 != $contents2) {
                if (md5_file($_FILES["file1"]["tmp_name"]) == md5_file($_FILES["file2"]["tmp_name"])) {
                    highlight_file("index.php");
                    die();
                } else {
                    echo "MD5 hashes do not match!";
                    die();
                }
            } else {
                echo "Files are not different!";
                die();
            }
        } else {
            echo "Not a PDF!";
            die();
        }
    } else {
        echo "File too large!";
        die();
    }
}

// FLAG: picoCTF{c0ngr4ts_u_r_1nv1t3d_da36cc1b}
```

## Flag

picoCTF{c0ngr4ts_u_r_1nv1t3d_da36cc1b}


