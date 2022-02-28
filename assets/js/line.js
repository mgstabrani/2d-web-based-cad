let n_after = 0
let points = []

function setLine() {
    isLine = true
    isSquare = false
    isPolygon = false
    isRectangle = false
    isSelect = false
}

function drawLine(x, y) {
    if (n_after < 2) {
        vertices.push(x)
        vertices.push(y)
        vertices.push(rgb[0]/255)
        vertices.push(rgb[1]/255)
        vertices.push(rgb[2]/255)
        n_after++

        renderAll()
        if (n_after < 2) {
            main(vertices, n_after, gl.LINES)
        } else {
            renderObject(vertices, n_after, gl.LINES)
        }
    }

    if (n_after == 2) {
        arrObjects.push({
            vert: vertices,
            meth: gl.LINES,
            n: n_after,
            p: points,
            type: "line"
        })
        vertices = []
        n_after = 0
        isLine = false
        points = []
    }
}
