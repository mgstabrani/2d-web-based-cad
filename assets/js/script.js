let vertexShaderText = 
    `precision mediump float;

    attribute vec2 vertPosition;
    attribute vec3 vertColor;
    varying vec3 fragColor;

    void main() {
        fragColor = vertColor;
        gl_Position = vec4(vertPosition, 0.0, 1.0);
    }`

let fragmentShaderText = 
    `precision mediump float;
    
    varying vec3 fragColor;
    void main() {
        gl_FragColor = vec4(fragColor, 1.0);
    }`

function createShader(type, source) {
    let shader = gl.createShader(type)

    gl.shaderSource(shader, source)

    gl.compileShader(shader)

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('error compiling shader!', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return
    }

    return shader
}

function createProgram(vertexShader, fragmentShader) {
    let program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('error linking program!', gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
        return
    }
    gl.validateProgram(program)
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('error validating program!', gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
        return
    }

    return program
}

function drawObject(program, vertices, method, n) {
    let vertexBufferObject = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	let positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    let colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
		positionAttribLocation,
		2,
		gl.FLOAT,
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT,
		0
	);
	gl.vertexAttribPointer(
		colorAttribLocation,
		3,
		gl.FLOAT,
		gl.FALSE,
		5 * Float32Array.BYTES_PER_ELEMENT, 
		2 * Float32Array.BYTES_PER_ELEMENT
	);

	gl.enableVertexAttribArray(positionAttribLocation)
	gl.enableVertexAttribArray(colorAttribLocation)

	// Main render loop
	gl.useProgram(program)
    gl.drawArrays(method, 0, n)
}

let canvas = document.getElementById('canvas-surface')
let gl = canvas.getContext('webgl')

function load() {
    if (!gl) {
        console.log('webgl not supported')
        gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('your browser does not support WebGL');
	}
}

function main(vertices, n, method) {
    // Create Shaders
    let vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderText)
    let fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderText)

    // Create program
    let program = createProgram(vertexShader, fragmentShader)

    drawObject(program, vertices, method, n)
}

let isPolygon = false
let isLine = false
let isSquare = false
let isRectangle = false
let isSelect = false

function setSelect() {
    isLine = false
    isSquare = false
    isPolygon = false
    isRectangle = false
    isSelect = true
}

let x = 0
let y = 0
let width = document.getElementById('canvas-surface').width
let height = document.getElementById('canvas-surface').height

let selectedObject
let idxPoint
let isDrag = false

canvas.addEventListener("mousedown", function(e) {
    x = getXCursorPosition(canvas, e)
    y = getYCursorPosition(canvas, e)   

    checkSelectedObject(x, y)
    render(x, y)

    if (selectedObject != null) {
        isDrag = true
        canvas.addEventListener("mouseup", (event) => changeObjectPoint(canvas, event))

        if(!isDrag) {
            canvas.removeEventListener("mouseup", (event) => changeObjectPoint(canvas, event))
        }
    }
})

// event = keyup or keydown
document.body.onkeyup = function(e){
    if (isPolygon) {
        if (poly_stat = "unfinished") {
            if (e.keyCode == 32) {
                console.log("spacebar pressed")
                poly_stat = "finished"
                renderObject(vertices, n_after, gl.TRIANGLE_FAN)
                e.keyCode = null
            }   
        }
    }
}

function render(x, y) {
    if (isPolygon) {
        drawPolygon(x, y)
    } else if (isLine) {
       drawLine(x, y)
    } else if (isSquare) {
        drawSquare(x, y)
    } else if (isRectangle) {
        drawRectangle(x, y)
    }
}

function renderObject(vertices, n, method) {
    main(vertices, n, method)
    for (let i=0; i<vertices.length; i+=5) {
        let sq_point = getSquarePoint(vertices[i], vertices[i+1])
        main(sq_point, 4, gl.TRIANGLE_FAN)
        points.push(sq_point)
    }
}

function renderAll() {
    for (let i=0; i<arrObjects.length; i++) {
        main(arrObjects[i].vert, arrObjects[i].n, arrObjects[i].meth)
        // render square points of object
        for (let j=0; j<arrObjects[i].n; j++) {
            main(arrObjects[i].p[j], 4, gl.TRIANGLE_FAN)
        }
    }
}

function getXCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    return (x - width/2)/ (width/2);
}

function getYCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const y = event.clientY - rect.top
    return (y - height/2)/ (height/2) * -1;
}

function checkSelectedObject(x, y) {
    selectedObject = null
    idxPoint = -1

    arrObjects.forEach(function (item) {
        item.p.forEach(function (item2, idx) {
            if (x > item2[0] && y < item2[1] &&
                x < item2[5] && y < item2[6] &&
                x < item2[10] && y > item2[11] &&
                x > item2[15] && y > item2[16]) {
                selectedObject = item
                idxPoint = idx
                }
        })
    })
}


function getSquarePoint(x, y) {
    return [
        x-0.008, y+0.008, 1.0, 1.0, 1.0,
        x+0.008, y+0.008, 1.0, 1.0, 1.0,
        x+0.008, y-0.008, 1.0, 1.0, 1.0,
        x-0.008, y-0.008, 1.0, 1.0, 1.0
    ]
}

function changeObjectPoint(canvas, ev) {
    x = getXCursorPosition(canvas, ev)
    y = getYCursorPosition(canvas, ev)

    if (isSelect) {
        if (selectedObject.type == "line") {
            var xtemp = selectedObject.vert[idxPoint*5]
            var ytemp = selectedObject.vert[idxPoint*5 + 1]
            selectedObject.vert[idxPoint*5] = x
            selectedObject.vert[idxPoint*5 + 1] = y
            selectedObject.p[idxPoint] = getSquarePoint(x, y)
            idxPoint = (idxPoint + 1) % 2
            var xtrans = selectedObject.vert[idxPoint*5] - xtemp
            var ytrans = selectedObject.vert[idxPoint*5 + 1] - ytemp
            xtemp = selectedObject.vert[idxPoint*5]
            ytemp = selectedObject.vert[idxPoint*5 + 1]
            selectedObject.vert[idxPoint*5] = x + xtrans
            selectedObject.vert[idxPoint*5 + 1] = y + ytrans
            selectedObject.p[idxPoint] = getSquarePoint(x + xtrans, y + ytrans)
            renderAll()
            isSelect = false
            isDrag = false
        }
        else if (selectedObject.type == "square" || selectedObject.type == "rectangle") {
            var xtrans, ytrans
            var xtemp = selectedObject.vert[idxPoint*5]
            var ytemp = selectedObject.vert[idxPoint*5 + 1]
            selectedObject.vert[idxPoint*5] = x
            selectedObject.vert[idxPoint*5 + 1] = y
            selectedObject.p[idxPoint] = getSquarePoint(x, y)
            var iter = 1
            while (iter<4) {
                idxPoint = (idxPoint + 1) % 4
                xtrans = selectedObject.vert[idxPoint*5] - xtemp
                ytrans = selectedObject.vert[idxPoint*5 + 1] - ytemp
                xtemp = selectedObject.vert[idxPoint*5]
                ytemp = selectedObject.vert[idxPoint*5 + 1]
                selectedObject.vert[idxPoint*5] = selectedObject.vert[((idxPoint+3)*5)%20] + xtrans
                selectedObject.vert[idxPoint*5 + 1] = selectedObject.vert[((idxPoint+3)*5 + 1)%20] + ytrans
                selectedObject.p[idxPoint] = getSquarePoint(selectedObject.vert[idxPoint*5], selectedObject.vert[idxPoint*5 + 1])
                iter = iter + 1
            }
            console.log(selectedObject.vert)
            renderAll()
            isSelect = false
            isDrag = false
        }
        else if (selectedObject.type == "polygon") {
            console.log("masuk")
            isSelect = false
            isDrag = false
        }
        return
    }
        
    if (isDrag && selectedObject.type != "square") {
        // change vertices point
        selectedObject.vert[idxPoint*5] = x
        selectedObject.vert[idxPoint*5 + 1] = y

        // change square point
        selectedObject.p[idxPoint] = getSquarePoint(x, y)
        renderAll()
        isDrag = false
    } else if (isDrag && selectedObject.type == "square") {
        squareScaling(x, y)
        renderAll()
        isDrag = false
    }
}

let vertices = []
let rgb = [0.0, 0.0, 0.0]

let arrObjects = []

const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
             ,(m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

function getColor() {
    let hex = document.getElementById("color_picker").value
    rgb = hexToRgb(hex)

    if (selectedObject != null) {
        for (let i=2; i<selectedObject.vert.length; i+=5) {
            selectedObject.vert[i] = rgb[0]/255
            selectedObject.vert[i+1] = rgb[1]/255
            selectedObject.vert[i+2] = rgb[2]/255
        }
    }
    renderAll()
}