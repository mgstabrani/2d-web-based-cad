function openFile() {
    let file = document.getElementById("open-file").files[0]
    let reader = new FileReader();

    reader.onload = function(e){
        arrObjects = JSON.parse(e.target.result);

        renderAll()
    }
    
    reader.readAsText(file);
    if (!file) {
        alert('File is blank')
    }
}