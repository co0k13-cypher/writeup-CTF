import requests,re
from bs4 import BeautifulSoup

url = 'http://mercury.picoctf.net:52362/'
header = {'User-Agent':'PicoBrowser', 'Referer':'http://mercury.picoctf.net:52362/', 'Date':'Wed, 21 Oct 2018 07:28:00 GMT','DNT':'1','X-Forwarded-For':'31.44.224.0','Accept-Language':'sv'}

req = requests.get(url, headers=header)
soup = BeautifulSoup(req.text, "lxml")
flag = re.findall('picoCTF{.*}', req.text)
print(soup.h3)
print(flag)