# Scavenger Hunt

## Description

There is some interesting information hidden around this site http://mercury.picoctf.net:27393/. Can you find it?

## Points

50 points

## Hint

You should have enough hints to find the files, don't run a brute forcer.

## Solution

Web cho ta một giao diện nhưng nó chẳng có tác dụng gì , thử xem code html thì ta thấy một phần của flag , dự là bài này sẽ chia flag thành nhiều phần và nhiệm vụ của ta là phải đi tìm nó .

Code html :
```
<!doctype html>
<html>
  <head>
    <title>Scavenger Hunt</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="mycss.css">
    <script type="application/javascript" src="myjs.js"></script>
  </head>

  <body>
    <div class="container">
      <header>
		<h1>Just some boring HTML</h1>
      </header>

      <button class="tablink" onclick="openTab('tabintro', this, '#222')" id="defaultOpen">How</button>
      <button class="tablink" onclick="openTab('tababout', this, '#222')">What</button>

      <div id="tabintro" class="tabcontent">
		<h3>How</h3>
		<p>How do you like my website?</p>
      </div>

      <div id="tababout" class="tabcontent">
		<h3>What</h3>
		<p>I used these to make this site: <br/>
		  HTML <br/>
		  CSS <br/>
		  JS (JavaScript)
		</p>
	<!-- Here's the first part of the flag: picoCTF{t -->
      </div>

    </div>

  </body>
</html>
``` 
> picoCTF{t

Code CSS:

```
div.container {
    width: 100%;
}

header {
    background-color: black;
    padding: 1em;
    color: white;
    clear: left;
    text-align: center;
}

body {
    font-family: Roboto;
}

h1 {
    color: white;
}

p {
    font-family: "Open Sans";
}

.tablink {
    background-color: #555;
    color: white;
    float: left;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 14px 16px;
    font-size: 17px;
    width: 50%;
}

.tablink:hover {
    background-color: #777;
}

.tabcontent {
    color: #111;
    display: none;
    padding: 50px;
    text-align: center;
}

#tabintro { background-color: #ccc; }
#tababout { background-color: #ccc; }

/* CSS makes the page look nice, and yes, it also has part of the flag. Here's part 2: h4ts_4_l0 */
```
> picoCTF{th4ts_4_10

Code js :

```
function openTab(tabName,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
	tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
	tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(tabName).style.display = "block";
    if(elmnt.style != null) {
	elmnt.style.backgroundColor = color;
    }
}

window.onload = function() {
    openTab('tabintro', this, '#222');
}

/* How can I keep Google from indexing my website? */
```

How can I keep Google from indexing my wedsite ? Sau một hồi google search thì mình cũng đã tìm được để web site biết chỉ mục nào được thu thập chỉ mục nào không ta cần đến file [robots.txt](https://stackoverflow.com/questions/390368/stop-google-from-indexing) . Ok, ta sẽ truy cập vào file robots.txt của web :

```
User-agent: *
Disallow: /index.html
# Part 3: t_0f_pl4c
# I think this is an apache server... can you Access the next flag?
```
> picoCTF{th4ts_4_10t_0f_pl4c

Có thêm một gợi ý mới đó là server chạy bằng apache , thì apache có một file là [.htaccess](https://httpd.apache.org/docs/2.4/howto/htaccess.html) dùng để quản lí các request trên server apache và kết quả :

```
# Part 4: 3s_2_lO0k
# I love making websites on my Mac, I can Store a lot of information there.
```
> picoCTF{th4ts_4_10t_0f_pl4c3s_2_1O0k

Trên MAC có một tệp gọi là [.DS_Store](https://en.wikipedia.org/wiki/.DS_Store) mà bạn có thể lưu trữ các thuộc tính của thư mục chứa nó .

```
Congrats! You completed the scavenger hunt. Part 5: _d375c750}
```
> picoCTF{th4ts_4_10t_0f_pl4c3s_2_1O0k_d375c750}

## Flag
picoCTF{th4ts_4_10t_0f_pl4c3s_2_1O0k_d375c750}





