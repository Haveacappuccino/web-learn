window.addEventListener('DonContentLoaded', function () {
    var BigImg = document.querySelector('.bigimg');
    var ul = BigImg.querySelector('ul');
    var ol = BigImg.querySelector('#ol');
    var previous = BigImg.querySelector('#previous');
    var next = BigImg.querySelector('#next');
    var imgWidth = BigImg.offsetWidth;
    var timer = '';
    var num = 0; //图片轮播
    var num1 = 0; //圆圈轮播
    var flag = true;
    // animate(obj, target,callback) 执行元素，目的位置，回调函数
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        li.setAttribute('date-index', i);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var date_index = this.getAttribute('date-index');
            // console.log(date_index);
            //点击图片num，num1必须变过来
            num = date_index;
            num1 = date_index;
            ul.style.left = -date_index * imgWidth + 'px';
        })
    }
    ol.children[0].className = 'current';
    //克隆第一张图片添加到最后面
    var firstImg = ul.children[0].cloneNode(true);
    ul.appendChild(firstImg);

    function setTimer() {
        timer = setInterval(function () {
            next.click();
            // ul.style.left = ulLeft + 'px';
        }, 2000)
    }
    setTimer();
    BigImg.addEventListener('mouseover', function () {
        clearInterval(timer);
        previous.style.display = 'block';
        next.style.display = 'block';
    })
    BigImg.addEventListener('mouseout', function () {
        previous.style.display = 'none';
        next.style.display = 'none';
        setTimer();
    })

    function changeCircle() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        for (var i = 0; i < ol.children.length; i++) {
            if (ol.children[i].getAttribute('date-index') == num1) {
                ol.children[i].className = 'current';
                break;
            }
        }
    }
    next.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                num = 0;
                ul.style.left = 0;
            }
            num++;
            animate(ul, -num * imgWidth, function () {
                flag = true;
            });
            num1++;
            (num1 == ol.children.length) && (num1 = 0);//A && B; A为真执行B
            changeCircle();
            // console.log(ul.offsetLeft);
        }
    })
    previous.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * imgWidth + 'px';
            }
            num--;
            animate(ul, -num * imgWidth, function () {
                flag = true;
            });
            num1--;
            if (num1 < 0) {
                num1 = ol.children.length - 1;
            }
            changeCircle();
            // console.log(ul.offsetLeft);
        }
    })
})