function saveObject() {
    const filename = document.getElementById("file-name").value

    if (!filename) {
        filename = 'object'
    }

    const data = JSON.stringify(arrObjects);
    download(filename + ".json", data);
}

function download(filename, text) {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
}