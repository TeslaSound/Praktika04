let c = document.querySelector('canvas'),
    $ = c.getContext('2d');
document.querySelector('.generate').onclick = generateCanvas;

function generateCanvas(){
    let shapeForm = document.querySelector('select').value
// ширина (только целые числа)
let shapeWidth = parseInt(document.querySelector('.shapeWidth').value)
// количество по горизонтали (только целые числа)
let shapeNumber = parseInt(document.querySelector('.shapeNumber').value)
// общее количество (удваиваем количество по горизонтали)
let shapeAmount = Math.pow(shapeNumber, 2)
// цвет фона
let backColor = document.querySelector('.backColor').value

let W = H = shapeWidth * shapeNumber
c.setAttribute('width', W)
c.setAttribute('height', H) 
    let border = 1
// цвет границ
let borderColor = 'rgba(0,0,0,.4)'
// по умолчанию номера фигур не отображаются
let isShown = false

// проверяем соблюдение диапазона значений
// и числового формата данных
// отображаем холст
// и в зависимости от формы фигуры запускаем соответствующую функцию
if (shapeWidth < 10 || shapeWidth > 50 || shapeNumber < 10 || shapeNumber > 50 || isNaN(shapeWidth) || isNaN(shapeNumber)) {
    throw new Error(alert('wrong number'))
} else if (shapeForm == 'squares') {
    c.style.display = 'block'
    squares()
} else {
    c.style.display = 'block'
    circles()
}
    function squares() {
    // определяем начальные координаты
    let x = y = 0

    // массив фигур
    let squares = []

    // ширина и высота фигуры (квадрата)
    let w = h = shapeWidth

    // формируем необходимое количество фигур
    addSquares()

    // функция-конструктор
    function Square(x, y) {
        // координата х 
        this.x = x
        // координата y 
        this.y = y
        // цвет фигуры = цвет фона
        this.color = backColor
        // по умолчанию фигура не выбрана
        this.isSelected = false
    }

    // функция добавления фигур
    function addSquares() {
        // цикл по общему количеству фигур
        for (let i = 0; i < shapeAmount; i++) {
            // используем конструктор
            let square = new Square(x, y)

            // определяем координаты каждой фигуры
            // для этого к значению х прибавляем ширину фигуры
            x += w

            // когда значение х становится равным ширине холста
            // увеличиваем значение y на высоту фигуры
            // так осуществляется переход к следующей строке
            // сбрасываем значение х
            if (x == W) {
                y += h
                x = 0
            }

            // добавляем фигуру в массив
            squares.push(square)
        }
        // рисуем фигуры на холсте
        drawSquares()
    }

    // функция рисования фигур
    function drawSquares() {
        // очищаем холст
        $.clearRect(0, 0, W, H)

        // цикл по количеству фигур
        for (let i = 0; i < squares.length; i++) {
            // берем фигуру из массива
            let square = squares[i]
            // начинаем рисовать
            $.beginPath()
            // рисуем квадрат, используя координаты фигуры
            $.rect(square.x, square.y, w, h)
            // цвет фигуры
            $.fillStyle = square.color
            // ширина границ
            $.lineWidth = border
            // цвет границ
            $.strokeStyle = borderColor
            // заливаем фигуру
            $.fill()
            // обводим фигуру
            $.stroke()

            // если нажата кнопка для отображения номеров фигур
            if (isShown) {
                $.beginPath()
                // параметры шрифта
                $.font = '8pt Calibri'
                // цвет текста
                $.fillStyle = 'rgba(0,0,0,.6)'
                // рисуем номер, опираясь на его координаты
                $.fillText(i + 1, square.x, (square.y + 8))
            }
        }
    }

    // вешаем на холст обработчик события "клик"
    c.onclick = select
    // функция обработки клика
    function select(e) {
        // определяем координаты курсора
        let clickX = e.pageX - c.offsetLeft,
            clickY = e.pageY - c.offsetTop

        // цикл по количеству фигур
        for (let i = 0; i < squares.length; i++) {
            let square = squares[i]

            // определяем фигуру, по которой кликнули
            // пришлось повозиться
            // возможно, существует более изящное решение
            if (clickX > square.x && clickX < (square.x + w) && clickY > square.y && clickY < (square.y + h)) {
                // раскрашиваем фигуру, по которой кликнули, заданным цветом
                // при повторном клике возвращаем фигуре первоначальный цвет (цвет фона)
                if (square.isSelected == false) {
                    square.isSelected = true
                    square.color = document.querySelector('.shapeColor').value
                } else {
                    square.isSelected = false
                    square.color = backColor
                }
                // перерисовываем фигуры
                // в принципе, можно реализовать перерисовку только фигуры, по которой кликнули
                // но решение, по крайней мере у меня, получилось громоздким
                // решил, что игра не стоит свеч 
                drawSquares()
            }
        }
    }

    // находим кнопку для отображения номеров фигур и вешаем на нее обработчик события "клик"
    document.querySelector('.show').onclick = showNumbers
    // функция отображения номеров фигур
    function showNumbers() {
        if (!isShown) {
            isShown = true
            // цикл по количеству фигур 
            for (let i = 0; i < squares.length; i++) {
                let square = squares[i]
                $.beginPath()
                // параметры шрифта 
                $.font = '8pt Calibri'
                // цвет шрифта 
                $.fillStyle = 'rgba(0,0,0,.6)'
                // рисуем номер, опираясь на его координаты
                $.fillText(i + 1, square.x, (square.y + 8))
            }
        } else {
            isShown = false
        }
        // перерисовываем фигуры
        drawSquares()
    }
}
    
    function circles() {
    // радиус круга
    let r = shapeWidth / 2

    let x = y = r

    let circles = []

    addCircles()

    function Circle(x, y) {
        this.x = x
        this.y = y
        this.color = backColor
        this.isSelected = false
    }

    function addCircles() {
        for (let i = 0; i < shapeAmount; i++) {
            let circle = new Circle(x, y)
            // к значению х прибавляется ширина фигуры
            x += shapeWidth
            // когда значение х становится равным сумме ширины холста и радиуса фигуры
            // увеличиваем значение у на ширину фигуры
            // сбрасываем значение х до значения радиуса
            if (x == W + r) {
                y += shapeWidth
                x = r
            }
            circles.push(circle)
        }
        drawCircles()
    }

    function drawCircles() {
        $.clearRect(0, 0, W, H)

        for (let i = 0; i < circles.length; i++) {
            let circle = circles[i]
            $.beginPath()
            // рисуем круг
            $.arc(circle.x, circle.y, r, 0, Math.PI * 2)
            $.fillStyle = circle.color
            $.strokeStyle = borderColor
            $.lineWidth = border
            $.fill()
            $.stroke()
            if (isShown) {
                $.beginPath()
                $.font = '8pt Calibri'
                $.fillStyle = 'rgba(0,0,0,.6)'
                $.fillText(i + 1, (circle.x - 8), circle.y)
            }
        }
    }

    c.onclick = select
    function select(e) {
        let clickX = e.pageX - c.offsetLeft,
            clickY = e.pageY - c.offsetTop

        for (let i = 0; i < circles.length; i++) {
            let circle = circles[i]

            // определяем круг, по которому кликнули
            let distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2))

            if (distanceFromCenter <= r) {
                if (circle.isSelected == false) {
                    circle.isSelected = true
                    circle.color = document.querySelector('.shapeColor').value
                } else {
                    circle.isSelected = false
                    circle.color = backColor
                }
                drawCircles()
            }
        }
    }

    document.querySelector('.show').onclick = showNumbers
    function showNumbers() {
        if (!isShown) {
            isShown = true
            for (let i = 0; i < circles.length; i++) {
                let circle = circles[i]
                $.beginPath()
                $.font = '8pt Calibri'
                $.fillStyle = 'rgba(0,0,0,.6)'
                $.fillText(i + 1, (circle.x - 8), circle.y)
            }
        } else {
            isShown = false
        }
        drawCircles()
    }
}
    
document.querySelector('.save').onclick = () => {
    // ищем изображение
    let img = document.querySelector('img')

    // если не находим, создаем
    // если находим, удаляем
    img == null ? document.body.appendChild(document.createElement('img')).src = c.toDataURL() : document.body.removeChild(img)
}
document.querySelector('.clear').onclick = () => {
    // очищаем и перерисовываем холст
    $.clearRect(0, 0, W, H)
    generateCanvas()
}
document.querySelector('.delete').onclick = () => {
    $.clearRect(0, 0, W, H)
    c.style.display = 'none'
}
}


