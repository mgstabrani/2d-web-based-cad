

function setPolygon() {
    isLine = false
    isSquare = false
    isPolygon = true
    isRectangle = false
    poly_stat = "unfinished"
    isSelect = false
}

function drawPolygon(x, y) {
    if (poly_stat === "unfinished") {
        vertices.push(x)
        vertices.push(y)
        vertices.push(rgb[0]/255)
        vertices.push(rgb[1]/255)
        vertices.push(rgb[2]/255)
        n_after++
        renderAll()
        main(vertices, n_after, gl.TRIANGLE_FAN)
    }

    else if (poly_stat === "finished") {
        arrObjects.push({
            vert: vertices,
            meth: gl.TRIANGLE_FAN,
            n: n_after,
            p: points,
            type: "polygon"
        })
        vertices = []
        n_after = 0
        isPolygon = false
        points = []
    }
}