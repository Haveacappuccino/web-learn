function move(element, initX, initY, callback) {
    var x = 0;
    var y = 0;
    var startX = 0;
    var startY = 0;
    element.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        startY = e.targetTouches[0].pageY;
        x = this.offsetLeft;
        y = this.offsetTop;

    })
    element.addEventListener('touchmove', function (e) {
        e.preventDefault();
        this.style.left = x + e.targetTouches[0].pageX - initX - startX + 'px';
        this.style.top = y + e.targetTouches[0].pageY - initY - startY + 'px';
    })
    element.addEventListener('touchend', function () {
        callback && callback();
    })
}