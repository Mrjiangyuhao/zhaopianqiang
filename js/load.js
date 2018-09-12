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
                ev = ev || window.event;
                var x = ev.clientX - img[tem].offsetLeft;
                var y = ev.clientY - img[tem].offsetTop;

                Imax = Max(img, 1)
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

                }
                Document.onmouseup = function () {
                    Document.onmousemove = Document.onmouseup = null;

                }
            }

        })()
    }
    //动态实现定位
    for (var i = 0; i < leg; i++) {
        img[i].style.position = "absolute";
        img[i].style.left = arr[i][0] + "px";
        img[i].style.top = arr[i][1] + "px";
    }
    // 递归找出最大值
    function Max(obj, i) {
        var leng = obj.length;
        console.log(leng);
        if (i == leng) {
            console.log(max1);
            return max1

        }
        if (max1 < parseInt(obj[i].style.zIndex)) {
            max1 = parseInt(obj[i].style.zIndex);

        }
        return Max(obj, i + 1)
    }

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