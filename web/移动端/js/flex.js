if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
window.addEventListener('load', function () {
    var ul = document.querySelector('.picture');
    var circle = document.querySelector('.circle');
    var str = [];
    var timer = 0;
    var num = 0;   //num图片索引
    var width = ul.parentNode.offsetWidth;
    // 创建圆点
    for (var i = 0; i < ul.children.length; i++) {
        str.push('<li date-index=' + i + '></li>\n');
    }
    circle.innerHTML = str.join('');
    circle.children[0].className = 'current';

    //第一张图片克隆克隆到最后、最后一张克隆到开头
    var li = ul.children[0].cloneNode(true);
    ul.appendChild(li);
    var li = ul.children[ul.children.length - 2].cloneNode(true);
    ul.insertBefore(li, ul.children[0]);
    // console.log(ul);
    //位置变动
    function move(length) {
        translateX = length ? -num * width + length : -num * width;
        ul.style.transform = 'translateX(' + translateX + 'px)';
    }
    //定时器
    function setTime() {
        timer = setInterval(function () {
            num++;
            ul.style.transition = 'all .3s';
            move();
        }, 2000);
    }
    setTime();

    // 回来到当前页面，清除残留定时器的影响，执行定时器
    window.onfocus = function () {
        clearInterval(timer);
        setTime();
    }
    // 离开当前页面清除定时器，避免定时器生成堆积
    window.onblur = function () {
        clearInterval(timer);
    }
    var date = Date.now();
    console.log(date);
    window.addEventListener('scroll', function () {
        var banner = this.document.querySelector('.banner');
        // console.log(banner.offsetTop);
        var returnTop = document.querySelector('.returnTop');

        if (window.pageYOffset >= banner.offsetTop) {
            returnTop.style.display = 'block';
        } else {
            returnTop.style.display = 'none';
        }
    })
    document.querySelector('.returnTop').addEventListener('click', function () {
        window.scroll(0, 0);
    })
    //transitionend切换浏览器其他页面一段时间再回来有点小bug
    ul.addEventListener('transitionend', function () {
        ul.style.transition = 'none';
        if (num >= ul.children.length - 2) {
            num = 0;
        } else if (num < 0) {
            num = 2;
        }
        move();
        circle.querySelector('.current').classList.remove('current');
        circle.children[num].className = 'current';
    })

    var moveX = 0;
    var initX = 0;
    ul.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        initX = e.targetTouches[0].pageX;
    })
    ul.addEventListener('touchmove', function (e) {
        e.preventDefault();
        moveX = e.targetTouches[0].pageX - initX;
        // ul.style.transition = 'none';  //写不写都可以
        move(moveX);
    })
    ul.addEventListener('touchend', function () {
        if (Math.abs(moveX) > 60) {
            if (moveX > 0) {
                num--;
            }
            else if (moveX < 0) {
                num++;
            }
        }
        ul.style.transition = 'all .3s';
        move();
        setTime();
    })
})