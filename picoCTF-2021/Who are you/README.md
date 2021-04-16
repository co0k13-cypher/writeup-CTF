# Who are you?

## Description

Let me in. Let me iiiiiiinnnnnnnnnnnnnnnnnnnn http://mercury.picoctf.net:52362/

## Hint

It ain't much, but it's an RFC https://tools.ietf.org/html/rfc2616

## Point
 
100 points

## Solution 

B1 : Only people who use the official PicoBrowser are allowed on this site!

Ta thay đổi ```User-Agent:PicoBrowser```

B2 : I don't trust users visiting from another site.

Điều này có nghĩa là bạn phải truy cập site từ trang hiện tại hay nói cách khác ta sẽ thay đổi ```Referer :http://mercury.picoctf.net:52362/```

B3 : Sorry, this site only worked in 2018.

Site làm việc vào năm 2018 tức là bạn chỉ có thể dùng nó vào năm 2018 theo mk hiểu . Điều này dẫn đến ta phải thay đổi ```Date:Wed, 21 Oct 2018 07:28:00 GMT```

B4 : I don't trust users who can be tracked.

Không tin người dùng có thể bị theo dõi . Trong http-header có thuộc tính ```DNT``` một thuộc tính tùy chỉnh liệu người dùng có cho phép trang theo dõi mình hay ko (1:no, 0-yes, null). Vì vậy ta có thể thêm ```DNT:1```  vào header.

B5 : This website is only for people from Sweden.

Website chỉ dành cho người Sweden ! Vậy lên bạn phải làm cách nào đó để truy cập site từ Sweden , một website nhận biết từng truy cập dựa trên ip vậy nên điều cần làm là thay đổi ip thành một ip đến từ Sweden ```X-Forwarded-For:31.44.224.0```   

B6 : You're in Sweden but you don't speak Swedish?

Tất cả những gì cần làm là thay đổi ngôn ngữ thành tiếng Sweden  ```Accept-Language:sv```

Để tổng hợp lại mk có [code_python](script.py) để get flag với task này có khá nhiều cách để làm như curl , brup suite, ..
Done ! What can I say except, you are welcome

## Flag

picoCTF{http_h34d3rs_v3ry_c0Ol_much_w0w_0c0db339}





