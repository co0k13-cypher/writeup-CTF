# GET aHEAD

## Description
Find the flag being held on this server to get ahead of the competition http://mercury.picoctf.net:15931/

## Points
20 points

## Hint
Maybe you have more than 2 choices
Check out tools like Burpsuite to modify your requests and look at the responses

## Solution

Ta di v�o ph�n t�ch code html :

```
<!doctype html>
<html>
<head>
    <title>Red</title>
    <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<style>body {background-color: red;}</style>
</head>
	<body>
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<div class="panel panel-primary" style="margin-top:50px">
						<div class="panel-heading">
							<h3 class="panel-title" style="color:red">Red</h3>
						</div>
						<div class="panel-body">
							<form action="index.php" method="GET">
								<input type="submit" value="Choose Red"/>
							</form>
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="panel panel-primary" style="margin-top:50px">
						<div class="panel-heading">
							<h3 class="panel-title" style="color:blue">Blue</h3>
						</div>
						<div class="panel-body">
							<form action="index.php" method="POST">
								<input type="submit" value="Choose Blue"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
```

Ch�ng ta c� th? th?y web c� 2 l?a ch?n d� l� **Red** di v?i **GET** v� **Blue** th� di v?i **POST** . K?t h?p v?i hint ta di d?n k?t lu?n l� s? g?i di request v?i m?t phuong th?c kh�c GET V� POST .
�? � v�o ti�u d? *Get aHead* t�i c� th? bi?t m�nh c?n g?i request d� v?i phuong th?c HEAD l�n server d? get flag .
�?u ti�n ta s? b?t request v?i Burp Suite sau d� l� g?i v�o repeat v� s?a GET > HEAD g?i l?i request v� c� flag .

![IMG](/image/getahead.png) 

## Flag 

picoCTF{r3j3ct_th3_du4l1ty_6ef27873}

