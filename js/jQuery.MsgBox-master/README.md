# jQuery MsgBox

0.8.1 BETA

## What is it?

Firefox style simplist dialog form.


## How to install?

before install, you must have [jQuery](http://jquery.com/download/) >= 1.5.0, I strongly recommand you have a lastest version.

That's very simple. just download below lastest version,

 - [Minified (for production)](https://raw.github.com/composite/jQuery.MsgBox/master/jquery.msgbox.min.js)
 - [Unminified (for development)](https://raw.github.com/composite/jQuery.MsgBox/master/jquery.msgbox.js)

If you have bower? just type in your console.

```
bower install msgbox
```

Still not easy? OH PLZ...

## How to use this?

It's quiet simple.

```html
<script src="jquery.lastest.js"></script>
<script src="jquery.msgbox.min.js"></script>
```

    alert("i'm alert");
    -> $.alert("i'm alert");

    confirm("Are you sure?");
    -> $.confirm("Are you sure?");

    prompt("please text me.");
    -> $.prompt("please text me.");

## Wait! YOU MUST SEE BEFORE USE THIS PLUGIN,
this plugin is can't replace as javascript standard function (alert, etc.)
because, this plugin cannot wait user action while showing dialog.
If you want get user's action, put a callback function in next of message param.
when user clicked in a dialog button, such as OK or cancel, msgbox will call your defined function.

Please don't..
```js
form.submit=function(){
    //All MsgBox function returns MsgBox Container Object. so it'll return always true.
    if($.confirm('Are you sure to save it?')){
        return true;//Page will changed without your confirm.
    }
    return false;
}
```
**So, what can I do?**

```js
form.submit=function(){
    if(!form.confirm){//Use variables or DOM objects or whatever you want.
        $.confirm('Are you sure to save it?',function(answer){
            form.confirm=answer;
            if(answer) form.submit();//submit again to verify confirm value.
        });
        return false;//You should use this line to prevent page changes.
    }else return true;
}
```
* You can use another solution to solve this.

## OK. so, How to use with callback function?

jQuery.MsgBox can add your callback function for provide next action after user clicked.
It's Very simple.

```js
$.alert("click me.",function(){
    $.alert('you are clicked!');
});
```
```js
$.confirm("press OK or Cancel.",function(bool){
    $.alert('you are clicked '+(bool?'OK':'cancel'));
});
```
```js
$.prompt("what's your name?",function(string){
    $.alert('your name is '+string);
});
```

## I want view live example.

Sure. [here's an example](http://jsfiddle.net/preFy/ "live example"). 

## What browser can run with this plugin?

first, jQuery 1.5 or later needed.
and, You can run with most popular major browser,
Internet Explorer 8 or above, Firefox 3 or above, Safari 4 or above, Chrome 10 or above, Opera 9 or above.
NOTE : Old school browser, such as IE 7 or lower is have a problem with CSS issue.
that's all. this plugin have NO images or other resources.

## I want use as own style, is it possible?

Yes. check out [Wiki](https://github.com/composite/jQuery.MsgBox/wiki) for detailed usage.

## Wow! It's simple and cool! can I join with you for make better this plugin?

Sure. contributes are welcome! just fork this plugin and get involved to make a better place for you and for me.

## Hey, I'm using IE version under 9, Msgbox flicking when showing MsgBox. What's happening?

Sorry. that is prevent changing width dynamically after center align on IE. I don't know it is bug, but I'll figure out it.

## Goals

 - More Simplify and Optimization.
 - Less Size and Unresolved Issues.
 - **All Methods will returns Deferred Object instead of DOM Container** ??? Well, I'll think about it.

## What's new?

### 0.8.1

 - Some code optimization.
 - Use UglifyJS for minification, instead of YUI compressor.

### 0.8.0

 - Major UI changes: more compatibility to view, Wrapped more a div to centering layer using only CSS (but still vertical centering using JS).
 - NEW property: onopen event property and $.msgbox.onopen static property; Fires after msgbox opened.
 - NEW property: onclose event property and $.msgbox.onclose static property; Fires before msgbox closing.
 - 2 new property for your own CSS or JS animation effect. onclose event also support jQuery Deferred Object. See [Wiki](https://github.com/composite/jQuery.MsgBox/wiki) for details.

### 0.7.5

 - console.log() for test will not fired in production mode.

### 0.7.4

 - Container add for prompt bug fixed.
 - fixed prompt UI.

### 0.7.3 (internal)

 - onresize event callback changed; this keyword will point to msgbox container. plain DOM, not jQuery.

### 0.7.2 (internal)

 - remove static property **customStyle**. just add style ```<link class="msgbox-style"/>``` or ```<style class="msgbox-style"/>``` instead.
 - Fixed minor UI bugs.

### 0.7.1 (Internal)

 - Fixed some bug.
 - console.log() for test is will not fired in production mode.

### 0.7.0 (Internal)

 - Replaced inline style to inline CSS for more performance.
 - Removed css property in $.msgbox() use $.msgbox.css or own standard CSS instead.
 - input property of $.msgbox changed. You can set any human-view type (string, number, etc). if not want prompt, just set false or undefined or null.
 - Fixed ENTER or ESC press event bug in input box
 - new property: onresize; available on $.msgbox() or $.msgbox.onresize static property. You can prepare when window size changes. see wiki for details.
 - new static property: customStyle; You want set own style instead of default style, just add your code : ```$.msgbox.customStyle = true;```

### 0.6.1

 - Fixed forced true callback after press ENTER key. focused button will fired event if you press ENTER key.

### 0.6.0

 - Auto resizing added. Msgbox will show full size when window size less than alert size, If not, revert to original size.

### 0.5.0

 - Use &lt;div&gt; with white-space: pre; instead of &lt;pre&gt; for more better view of MsgBox with CSS Framework such as Bootstrap.
 - Remove Browser compatibility for position:fixed is buggy under IE 7, so this will support jQuery over 1.8! I'll never test freaking old browsers.
 - Remove jQuery in my repository, Use any available jQuery CDN in demo instead.

## License

(The MIT License)

Copyright (c) 2011-2012 Ukjin 'composite' Yang <ukjinplant@msn.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
