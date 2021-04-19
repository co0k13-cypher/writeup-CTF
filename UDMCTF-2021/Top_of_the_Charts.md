# Top of the Charts

## Description

I found this site which seems to boast about itself too much. It claims to be above everything else but I'm not so sure. I think the success has gone to its head.

curl http://chals5.umdctf.io:4003

## Solution
```
C:\Users\Admin>curl -I http://chals5.umdctf.io:4003
HTTP/1.0 200 OK
Content-Type: text/html; charset=utf-8
flag: UMDCTF-{h3@d1ng_t0w@rd5_th3_l1ght}
Content-Length: 0
Server: Werkzeug/1.0.1 Python/3.5.2
Date: Mon, 19 Apr 2021 06:52:24 GMT 
```
## Flag

UMDCTF-{h3@d1ng_t0w@rd5_th3_l1ght}