(function () {
    enableJS();

    function enableJS() {
        document.body.classList.replace('no-js', 'js-enabled');
    }
})();

const nextFieldButton = document.querySelector("a.next");
const prevFieldButton = document.querySelector("a.back");
const fields = document.querySelectorAll('fieldset');

nextFieldButton.onclick = function nextFieldset() {
    let i
    for (i = 0; i < fields.length; i++) {
        if (fields[i].classList.contains('active')) {
            fields[i].nextElementSibling.classList.add('active');
            fields[i].classList.remove('active');
            prevFieldButton.classList.remove('hidden');
            break;
        }
    }
}

prevFieldButton.onclick = function prevFieldset() {
    let i
    for (i = 0; i < fields.length; i++) {
        if (fields[i].classList.contains('active')) {
            fields[i].previousElementSibling.classList.add('active');
            fields[i].classList.remove('active');
            break;
        }
    }
}
