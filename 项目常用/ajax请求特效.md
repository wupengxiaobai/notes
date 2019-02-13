# $.ajax 常用特效

##### 全局 Loading

```css
/* loading CSS */
#loading_message {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    /* background: rgba(255, 255, 255, .3); */
    background: transparent;
    z-index: 9999;
}
#loading_message>.loading {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0)
}
.loading {
    width: 150px;
    height: 15px;
    margin: 0 auto;
    margin-top: 100px;
}
.loading span {
    display: inline-block;
    width: 15px;
    height: 100%;
    margin-right: 5px;
    background: #52a58d;
    -webkit-transform-origin: right bottom;
    -webkit-animation: load 1s ease infinite;
}
.loading span:last-child {
    margin-right: 0px;
}
@-webkit-keyframes load {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        -webkit-transform: rotate(90deg);
    }
}
.loading span:nth-child(1) {
    -webkit-animation-delay: 0.13s;
}
.loading span:nth-child(2) {
    -webkit-animation-delay: 0.26s;
}
.loading span:nth-child(3) {
    -webkit-animation-delay: 0.39s;
}
.loading span:nth-child(4) {
    -webkit-animation-delay: 0.52s;
}
.loading span:nth-child(5) {
    -webkit-animation-delay: 0.65s;
}
```

```html
<!-- loading HTML-->
<div id="loading_message">
    <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>
```

```js
//	loading JS
(function () {
    $(document).bind("ajaxSend", function () {
        $("#loading_message").show();
    }).bind("ajaxComplete", function () {
        $("#loading_message").hide();
    });
})();
```



