# The Matrix Revolutions

## Description

The robots are done with your tricks. They're sick of hiding in plain site. Now they're going to hide in the shadows so no one, not even you can find them. You'll have to find how their site works. I have a feeling there's more to it than what we can see.

curl http://chals5.umdctf.io:4002

## Solution

Về cơ bản task này có giao diện giống với task The Matrix trước đó , tuy nhiên sau một hồi fuzz với header bằng curl không có kết quả , tôi chuyển sang scan web với dirsearch. 

```
[03:14:06] 200 -    1B  - /0                                                
[03:14:07] 200 -    1B  - /1                
[03:14:07] 200 -    1B  - /10                    
[03:14:08] 200 -    1B  - /12                         
[03:14:08] 200 -    1B  - /11
[03:14:08] 200 -    1B  - /14             
[03:14:08] 200 -    1B  - /16
[03:14:08] 200 -    1B  - /13                 
[03:14:08] 200 -    1B  - /17
[03:14:08] 200 -    1B  - /18
[03:14:08] 200 -    1B  - /19
[03:14:08] 200 -    1B  - /15
[03:14:09] 200 -    1B  - /2                 
[03:14:09] 200 -    1B  - /20               
[03:14:12] 200 -    1B  - /3                       
[03:14:13] 200 -    1B  - /4                       
[03:14:14] 200 -    1B  - /5                   
[03:14:14] 200 -    1B  - /6             
[03:14:15] 200 -    1B  - /7                
[03:14:15] 200 -    1B  - /8                
[03:14:16] 200 -    1B  - /9                   
[03:15:03] 200 -   18KB - /about 
```
Ta có thể thấy có một loạt các thư mục được đánh số từ 0 - 20, thử vào các thư mục trên thì kết quả trả về là một kí tự của flag.
```
curl -i http://chals5.umdctf.io:4002/0   
HTTP/1.0 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 1
Server: Werkzeug/1.0.1 Python/3.5.2
Date: Mon, 19 Apr 2021 07:19:25 GMT

U                 
```
Để đỡ mất thời gian tôi đã code một đoạn script nhỏ để lấy cờ :
```
import requests

flag = ''
for i in range(0,21):

	url = 'http://chals5.umdctf.io:4002/{}'.format(i)

	req = requests.get(url)

	flag += req.text

print(flag)
```

## Flag
UMDCTF-{r0b0t5_43v3r}