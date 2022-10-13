var ul = document.querySelector('#ul');
var tabs = document.querySelector('.main').children;
for (var i = 0; i < ul.children.length; i++) {
    ul.children[i].setAttribute('date-index', i);
}
ul.addEventListener('click', function (e) {
    if (e.target.nodeName == "A") {
        var dateIndex = e.target.parentNode.getAttribute('date-index');
        for (var i = 0; i < ul.children.length; i++) {
            ul.children[i].children[0].className = '';
            tabs[i].style.display = 'none';
        }
        e.target.className = 'a_current';
        for (var i = 0; i < tabs.length; i++) {
            if (dateIndex == i) {
                console.log(dateIndex);
                tabs[i].style.display = 'flex';
                console.log(tabs[i]);
                break;
            }
        }
    }
})