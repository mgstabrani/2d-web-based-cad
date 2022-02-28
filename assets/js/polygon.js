

function setPolygon() {
    isLine = false
    isSquare = false
    isPolygon = true
    isRectangle = false
    poly_stat = "unfinished"
    num_polygon = 99999
}

function drawPolygon(x, y) {
    if (n_after < num_polygon) {
        vertices.push(x)
        vertices.push(y)
        vertices.push(rgb[0]/255)
        vertices.push(rgb[1]/255)
        vertices.push(rgb[2]/255)
        n_after++
        renderAll()
        if (n_after < num_polygon) {
            main(vertices, n_after, gl.TRIANGLE_FAN)
        } else {
            renderObject(vertices, n_after, gl.TRIANGLE_FAN)
        }
    }

    if (n_after == num_polygon) {
        console.log("masuk sini")
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
