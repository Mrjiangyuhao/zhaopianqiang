window.onload = function () {
    var Document = document;
    var img = Document.querySelectorAll("img");
    var leg = img.length;
    var arr = [];
    var Imax = null;
    var max1 = null;
    max1 = img[0].style.zIndex;
    for (var i = 0; i < leg; i++) {
        //利用二维数组储存
        arr.push([img[i].offsetLeft, img[i].offsetTop]);
        (function () {
            var tem = i;      //采用闭包方式使新创建的变量留存在内存当中，重新申明多个tem ，不同的tem里面存储着不同的值       
            img[i].onmousedown = function (ev) {
                posiT(img, arr)
                ev = ev || window.event;
                var x = ev.clientX - img[tem].offsetLeft;
                var y = ev.clientY - img[tem].offsetTop;
                var This = this;
                //可以不单独写函数获取最大值 ，采用Imax++累加 
                Imax = Max(1)
                if (Imax == "") {
                    img[tem].style.zIndex += 1;

                }
                if (Imax >= img[tem].style.zIndex) {
                    img[tem].style.zIndex = parseInt(Imax) + 1;
                }
                //注意：如果是直接拖拽图片，会触发浏览器的默认行为,会对onmouseup事件产生影响
                ev.preventDefault();
                Document.onmousemove = function (ev) {
                    ev = ev || window.event;
                    img[tem].style.left = ev.clientX - x + "px";
                    img[tem].style.top = ev.clientY - y + "px";
                    for (var i = 0; i < leg; i++) {
                        img[i].style.border = "";
                    }
                    var a = dista(This,img)
                    if( a ){
                        a.style.border = "1px solid red";
                    }
                    
                }
                Document.onmouseup = function () {
                    posiT(img, arr)
                    for (var i = 0; i < leg; i++) {
                        img[i].style.border = "";
                    }
                    Document.onmousemove = Document.onmouseup = null;

                }
            }

        })()
    }

    // 递归找出最大值
    function Max(i) {
        var leng = img.length;
        if (i == leng) {
            return max1
        }
        if (max1 < parseInt(img[i].style.zIndex)) {
            max1 = parseInt(img[i].style.zIndex);

        }
        return Max(i + 1)
    }

}
//动态实现定位
function posiT(obj, ar) {
    for (var i = 0; i < obj.length; i++) {
        obj[i].style.position = "absolute";
        obj[i].style.left = ar[i][0] + "px";
        obj[i].style.top = ar[i][1] + "px";
    }
}
//检测碰撞
function coll(obj1, obj2) {
    var R1left = obj1.offsetLeft;    //左面
    var R1top = obj1.offsetTop;      //上面
    var R1right = obj1.offsetLeft + obj1.offsetWidth;  //右边面
    var R1bottom = obj1.offsetTop + obj1.offsetHeight;   //底部面

    var R2left = obj2.offsetLeft;
    var R2top = obj2.offsetTop;
    var R2right = obj2.offsetLeft + obj2.offsetWidth;
    var R2bottom = obj2.offsetTop + obj2.offsetHeight;

    if (R1left > R2right || R1right < R2left || R1top > R2bottom || R1bottom < R2top) {
        return false
    } else {
        return true
    }

}
function dista(obj1, obj2) {
    var value = 9999;
    var index = null;

    for (var i = 0; i < obj2.length; i++) {
        if (coll(obj1, obj2[i]) && obj1 != obj2[i]) {
            var c = gg(obj1,obj2[i])
            //找出C面值后，在找出这个值对应的位置
            if( c < value ){
                value = c;
                index = i;
            }
        } 
    }
    if(index != -1){
        return obj2[index]
    }else{
        return false
    }
}
//找出两个边的距离后用勾股定理找出C边
function gg(obj1, obj2){
    var objLeft =  obj1.offsetLeft -  obj2.offsetLeft;
    var objtop = obj1.offsetTop -  obj2.offsetTop;

    return  Math.sqrt(objLeft*objLeft + objtop*objtop)
}
//找出最大值
// function Max(obj) {
//     var leng = obj.length;
//     var t = 0;
//     for (var i = 0; i < leng; i++) {
//         if (t < obj[i].style.zIndex) {
//             t = obj[i].style.zIndex;   // 注意返回的是字符串，因为zIndex是字符串类型赋值过去所以导致String
//         }
//     }

//     return t
// }