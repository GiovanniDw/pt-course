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


var remove = document.getElementById('js-remove')

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


