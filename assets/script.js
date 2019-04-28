'use strict'

//pegando o canvas
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//eventos do canvas
canvas.addEventListener('mousemove', drawToCurrentMousePosition);
canvas.addEventListener('click', click);
canvas.addEventListener('keydown', stopDrawing);

//cor de preenchimento
ctx.fillStyle = "#000";

//array de posições
let pos = [];

//controlando o estado de desenhar
let draw = true;

//para de desenhar
function stopDrawing(e){
	if (e.key === 'Escape')
		draw = false;
}

//imprime posição do mouse
function drawToCurrentMousePosition(e){
	clearCanvas(ctx, canvas);
	redraw();

	if (draw){
		let l = pos.length;
	
		if (l > 0){
			ctx.moveTo(pos[l-1][0], pos[l-1][1]);
			ctx.lineTo(e.clientX, e.clientY);
			ctx.stroke();
		}
	}
}

//clique do mouse
function click(e){
	draw = true;

	ctx.beginPath();
	ctx.arc(e.clientX, e.clientY, 5, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
	pos.push([e.clientX, e.clientY]);

	redraw();
}

//limpa o canvas
function clearCanvas(ctx, canvas){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
}

//redesenha os pontos 
function redraw(){
	pos.forEach((p) => {
		ctx.beginPath();
		ctx.arc(p[0], p[1], 5, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	});

	for (let i = 0; i < (pos.length - 1); i++){
		ctx.moveTo(pos[i][0], pos[i][1]);
		ctx.lineTo(pos[i + 1][0], pos[i + 1][1]);
		ctx.stroke();
	}
}


function drawLine(t){
	if (t === 1){

	}
}