function Scroll(obj, target,callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var step = (target - obj.pageYOffset) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.pageYOffset == target) {
            clearInterval(obj.timer);
                callback && callback();
        }else {
            window.scroll(0,obj.pageYOffset + step);
        }
    }, 5);
}