# "N"ot "G"am"I"ng a"N"ymore in "X"mas

## Description

Can you login as admin? http://no-gaming-anymore-in-xmas.ctf2021.hackpack.club

## Point 

50 points

## Solution

Ta có một form nhập passwd đơn giản tuy nhiên khi thử với một pass bất kì thì không có điều gì xảy ra .

![IMG](image/img2.png)

Sau khi view source code html thì ta thấy trong form có một thẻ input debug=0 được hidden.

![IMG](image/img1.png)

Ta có thể đổi 0 thành 1 và submit một pass bất kì , web trả về kết quả debug.

![IMG](image/img3.png)

Nhận thấy có một thư mục là /maybehereimportantstuff , sau khi truy caapjvaof thư mục này thì flag hiện ra .

## Flag

flag{ng1nx_m1sconf1g_c4n_b3_h4rmful}
