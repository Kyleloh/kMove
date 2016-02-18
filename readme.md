##拖拽插件

####CSS
```css
    <style type="text/css">
        *{margin: 0; padding: 0;}
        .bigBox{width: 800px; height: 3500px; margin: 100px auto 0; position: relative; background: #eee;}
        .item{width: 100px; height: 100px; position: absolute; background: blue; cursor: pointer; }
    </style>
```
####引入库
```html
    <script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="js/jquery.kmove_v2.js"></script>
```
####JS
```javascript
    $(document).kMove({
        obj : ".item",
        way : "both",   //horizontal, vertical 默认:both
        limit : true    //true, false 默认true 不能移出父元素
    });
```