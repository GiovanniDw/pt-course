(function () {
    enableJS();

    function enableJS() {
        document.body.classList.replace('no-js', 'js-enabled');
    }
})();

for (var i = 0; i < document.links.length; i++) {
    if (document.links[i].href == document.URL) {
        document.links[i].className = 'active';
    }
}

var remove = document.getElementById('js-remove');

if (remove) {
    remove.addEventListener('click', onremove)
}

function onremove(ev) {
    var node = ev.target
    var id = node.dataset.id
    var res = new XMLHttpRequest()

    res.open('DELETE', '/profile' + id)
    res.onload = onload
    res.send()

    function onload() {
        if (res.status !== 200) {
            throw new Error('Could not delete!')
        }
        window.location = '/profile'
    }
    fetch('/' + id, {
            method: 'delete'
        })
        .then(onresponse)
        .then(onload, onfail)
    function onresponse(res) {
        return res.json()
    }
    function onfail() {
        throw new Error('Could not delete!')
    }

}

// const search = document.querySelector('[type=search]');
// const code = document.querySelector('pre');

// search.addEventListener('keyup', function () {
//     var xhr = new XMLHttpRequest;
//     xhr.open('GET', '/search/' + search.value, true);
//     xhr.onreadystatechange = function () {
//         if (4 == xhr.readyState) {
//             code.textContent = xhr.responseText;
//         }
//     };
//     xhr.send();
// }, false);

const nextFieldButton = document.querySelector("a.next");
const prevFieldButton = document.querySelector("a.back");
const activeField = document.querySelector('fieldset.active');
const fields = document.querySelectorAll('fieldset');

nextFieldButton.onclick = function nextFieldset() {
    let i
    for (i = 0; i < fields.length; i++) {
        console.log(fields[i]);
        
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
        console.log(fields[i]);

        if (fields[i].classList.contains('active')) {
            fields[i].previousElementSibling.classList.add('active');
            fields[i].classList.remove('active');
            break;
        }
    }
}

// const activeField = document.querySelectorAll('fieldset.active');
// activeField.removeClass('active').nextField('fieldset').addClass('active');





// parentNode
// childNodes[nodenumber]
// firstChild
// lastChild
// nextSibling
// previousSibling

