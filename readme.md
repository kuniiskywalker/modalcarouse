# モーダルカルーセル

## 事前読み込みファイル

```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<link rel="stylesheet" href="js/modalcarousel/style.css">

<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="js/modalcarousel/jquery.modalcarousel.js"></script>
```

## 実装方法

```
<p><a href="#" class="link1" rel="gallery1">リンク1</a></p>

<script>
(function($){
	$('.link1').modalcarousel({
		'thumb_urls': [
			{'url': 'http://ppplugins.com/demo/ppgallery/images/l_01.jpg'},
			{'url': 'http://ppplugins.com/demo/ppgallery/images/l_02.jpg', 'title': 'ウルトラマン'},
			{'url': 'http://ppplugins.com/demo/ppgallery/images/l_01.jpg'},
			{'url': 'http://ppplugins.com/demo/ppgallery/images/l_02.jpg'},
			{'url': 'http://ppplugins.com/demo/ppgallery/images/l_01.jpg'},
			{'url': 'http://ppplugins.com/demo/ppgallery/images/l_02.jpg'},
			{'url': 'http://ppplugins.com/demo/ppgallery/images/l_01.jpg'},
			{'url': 'http://ppplugins.com/demo/ppgallery/images/l_02.jpg'},
			{'url': 'http://ppplugins.com/demo/ppgallery/images/l_01.jpg'},
			{'url': 'http://ppplugins.com/demo/ppgallery/images/l_02.jpg'},
			{'url': 'http://ppplugins.com/demo/ppgallery/images/l_03.jpg'}
		]
	});
	
})(jQuery);
</script>
```

