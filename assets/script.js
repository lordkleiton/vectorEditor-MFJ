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

//inciando com grid
drawGrid();

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
			ctx.lineTo(Math.trunc(e.clientX / 50) * 50, Math.trunc(e.clientY / 50) * 50);
			ctx.stroke();
		}
	}
}

//clique do mouse
function click(e){
	draw = true;

	ctx.beginPath();
	ctx.arc(Math.trunc(e.clientX / 50) * 50, Math.trunc(e.clientY / 50) * 50, 5, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
	pos.push([Math.trunc(e.clientX / 50) * 50, Math.trunc(e.clientY / 50) * 50]);

	redraw();
}

//limpa o canvas
function clearCanvas(ctx, canvas){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
}

//redesenha os pontos 
function redraw(){
	drawGrid();

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

	ctx.strokeStyle = "red";

	if (pos.length > 2){
		ctx.moveTo(pos[0][0], pos[0][1]);
		ctx.lineTo(pos[pos.length - 1][0], pos[pos.length - 1][1]);
		ctx.stroke();
	}

	ctx.strokeStyle = "#000";
}

//limpa tudo
function reset(){
	pos = [];
	clearCanvas(ctx, canvas);
	drawGrid();
}

function drawGrid(){
	ctx.strokeStyle = "#ccc";

	for (let i = 0; i < canvas.width / 50; i++){
		ctx.moveTo(i * 50, 0);
		ctx.lineTo(i * 50, canvas.height);
		ctx.stroke();
	}
	for (let i = 0; i < canvas.height / 50; i++){
		ctx.moveTo(0, i * 50, 0);
		ctx.lineTo(canvas.width, i * 50);
		ctx.stroke();
	}

	ctx.fill();

	ctx.strokeStyle = "#000";
}

/* 

modulo = Math.sqrt( Math.pow(Xb - Xa, 2) + Math.pow(Yb - Ya, 2) )

*/