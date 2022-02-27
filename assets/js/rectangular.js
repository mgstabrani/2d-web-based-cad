function setSquare() {
    isLine = false
    isSquare = true
    isPolygon = false
    isRectangle = false
}

function setRectangle() {
    isLine = false
    isSquare = false
    isPolygon = false
    isRectangle = true
}

function drawSquare(x, y, s=0.25) {
    vertices = getVertices(x, y, s, 'square')
    
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

function getVertices(x, y, s, type) {
    if (type === 'square') {
        var x1 = x - s
        var y1 = y + s
        var x2 = x1 + s*1.1
        var y2 = y1 - s*1.6
        
        return [
            x1, y1, rgb[0]/255, rgb[1]/255, rgb[2]/255,
            x2, y1, rgb[0]/255, rgb[1]/255, rgb[2]/255,
            x2, y2, rgb[0]/255, rgb[1]/255, rgb[2]/255,
            x1, y2, rgb[0]/255, rgb[1]/255, rgb[2]/255
        ]
    }
    else if (type === 'rectangle') {
        var x1 = x - s
        var y1 = y + s
        
        return [
            x, y, rgb[0]/255, rgb[1]/255, rgb[2]/255,
            x1, y, rgb[0]/255, rgb[1]/255, rgb[2]/255,
            x1, y1, rgb[0]/255, rgb[1]/255, rgb[2]/255,
            x, y1, rgb[0]/255, rgb[1]/255, rgb[2]/255
        ]
    }
}
