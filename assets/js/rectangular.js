function setSquare() {
    isLine = false
    isSquare = true
    isPolygon = false
    isRectangle = false
    isSelect = false
}

function setRectangle() {
    isLine = false
    isSquare = false
    isPolygon = false
    isRectangle = true
    isSelect = false
}

function drawSquare(x, y, translation=0.25) {
    vertices = getVertices(x, y, translation, 'square')
    
    renderAll()
    renderObject(vertices, 4, gl.TRIANGLE_FAN)

    arrObjects.push({
        vert: vertices,
        meth: gl.TRIANGLE_FAN,
        n: 4,
        p: points,
        type: "square"
    })
    vertices = []
    isSquare = false
    points = []
}

function drawRectangle(x, y) {
    vertices = getVertices(x, y, 0.25, 'rectangle')
    
    renderAll()
    renderObject(vertices, 4, gl.TRIANGLE_FAN)

    arrObjects.push({
        vert: vertices,
        meth: gl.TRIANGLE_FAN,
        n: 4,
        p: points,
        type: "rectangle"
    })
    vertices = []
    isRectangle = false
    points = []
}

function getVertices(x, y, translation, type) {
    if (type === 'square') {
        var x1 = x - translation/2
        var y1 = y + translation/2
        var x2 = x1 + translation
        var y2 = y1 - translation
        
        return [
            x1, y1, rgb[0]/255, rgb[1]/255, rgb[2]/255,
            x1, y2, rgb[0]/255, rgb[1]/255, rgb[2]/255,
            x2, y2, rgb[0]/255, rgb[1]/255, rgb[2]/255,
            x2, y1, rgb[0]/255, rgb[1]/255, rgb[2]/255
        ]
    }
    else if (type === 'rectangle') {
        var x1 = x - translation*0.3
        var y1 = y + translation*0.3
        var x2 = x + translation*0.7
        var y2 = y - translation*0.25
        
        return [
            x1, y1, rgb[0]/255, rgb[1]/255, rgb[2]/255,
            x1, y2, rgb[0]/255, rgb[1]/255, rgb[2]/255,
            x2, y2, rgb[0]/255, rgb[1]/255, rgb[2]/255,
            x2, y1, rgb[0]/255, rgb[1]/255, rgb[2]/255
            
        ]
    }
}

function squareScaling(x, y) {
    console.log(selectedObject.vert)
    var center = [(selectedObject.vert[0] + selectedObject.vert[15])/2, (selectedObject.vert[1] + selectedObject.vert[6])/2]
    console.log(center)
    var xtrans = Math.abs(x - center[0])
    var ytrans = Math.abs(y - center[1])
    var trans = Math.max(xtrans, ytrans) * 2 
    selectedObject.vert = getVertices(center[0], center[1], trans, 'square')
    var newpoints = []
    for (var i=0; i<selectedObject.vert.length; i+=5) {
        var newpoint = getSquarePoint(selectedObject.vert[i], selectedObject.vert[i+1])
        newpoints.push(newpoint)
    }
    selectedObject.p = newpoints
}
