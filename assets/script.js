'use strict'

//pegando o canvas
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//configurando o canvas
let draw = true;										//controlando o estado de desenhar
let colors = ['800ecb', 'b331b2', 'a4bc13', 'e05886', '0a1e55', '1498e1', '1e2ee2', '60e2dc', '40b40e', 'df5b0b'];

//eventos do canvas
canvas.addEventListener('click', click);
canvas.addEventListener('keydown', stopDrawing);
canvas.addEventListener('mousemove', drawToCurrentMousePosition);

//outras configurações
let pos = [];											//array de posições
let div = 50;											//divisor / multiplicador
let size = 15;											//tamanho da cabeça de seta

//pegando os botões
let btnReset = document.getElementById('btn-reset');
let btnShuffle = document.getElementById('btn-shuffle');

//iniciando definindo a cor padrão, com grid e escondendo os botões
ctx.fillStyle = "black";								//cor de preenchimento
drawGrid();									
hideButtons();

function clearCanvas(){									//limpa o canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
}

function click(e){										//clique do mouse
	draw = (pos.length < 10) ? true : false;

	if (draw){
		let x = Math.trunc(e.clientX / div) * div;
		let y = Math.trunc(e.clientY / div) * div;
	
		ctx.beginPath();
		ctx.arc(x, y, 5, 0, 2 * Math.PI);
		ctx.fill();
		pos.push([x, y]);
	
		refresh();
	}
}

function drawArrowTip(fromX, fromY, toX, toY, size){	//https://stackoverflow.com/a/6333775
	let angle = Math.atan2(toY - fromY, toX - fromX);

	ctx.lineTo(toX - size * Math.cos(angle - Math.PI / 6), toY - size * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(toX, toY);
	ctx.lineTo(toX - size * Math.cos(angle + Math.PI / 6), toY - size * Math.sin(angle + Math.PI / 6));
}

function drawGrid(){									//desenha o grid
	ctx.strokeStyle = "#ccc";

	for (let i = 0; i < canvas.width / div; i++){
		//vertical
		ctx.moveTo(i * div, 0);
		ctx.lineTo(i * div, canvas.height);
		ctx.stroke();

		//horizontal
		ctx.moveTo(0, i * div, 0);
		ctx.lineTo(canvas.width, i * div);
		ctx.stroke();
	}

	ctx.strokeStyle = "black";
}

function drawResultLine(){								//desenha a linha da soma vetorial
	ctx.strokeStyle = "red";

	ctx.beginPath();
	ctx.moveTo(pos[0][0], pos[0][1]);
	ctx.lineTo(pos[pos.length - 1][0], pos[pos.length - 1][1]);

	drawArrowTip(pos[0][0], pos[0][1], pos[pos.length - 1][0], pos[pos.length - 1][1], size);

	ctx.stroke();
}

function drawToCurrentMousePosition(e){					//imprime posição do mouse
	refresh();

	

	if (draw){
		let l = pos.length;
	
		if (l > 0){
			let x = Math.trunc(e.clientX / div) * div;
			let y = Math.trunc(e.clientY / div) * div;

			ctx.beginPath();
			ctx.moveTo(pos[l-1][0], pos[l-1][1]);
			ctx.lineTo(x, y);
			ctx.stroke();
		}
	}
}

function hideButtons(){									//escondendo os botões
	btnReset.style.display = pos.length ? 'inline-block' : 'none'
	btnShuffle.style.display = (pos.length > 2) ? 'inline-block' : 'none'
}

function random(min, max) {								//valor inteiro aleatorio incluindo o menor e excluindo o maior
	return Math.floor(Math.random() * (max - min)) + min
}

function refresh(){										//atualiza a tela
	clearCanvas();
	drawGrid();
	redraw();
	hideButtons();
}

function stopDrawing(e){								//para de desenhar
	if (e.key === 'Escape') draw = false;
}

function redraw(){										//redesenha os pontos 
	for (let i = 0; i < (pos.length - 1); i++){
		ctx.strokeStyle = `#${colors[i]}`;
		ctx.beginPath();
		ctx.moveTo(pos[i][0], pos[i][1]);
		ctx.lineTo(pos[i + 1][0], pos[i + 1][1]);
		drawArrowTip(pos[i][0], pos[i][1], pos[i + 1][0], pos[i + 1][1], size);
		ctx.stroke();
	}

	pos.forEach((p) => {
		ctx.beginPath();
		ctx.arc(p[0], p[1], 5, 0, 2 * Math.PI);
		ctx.fill();
	});

	if (pos.length > 2) drawResultLine();

	ctx.strokeStyle = "black";
}

function reset(){										//limpa tudo
	pos = [];
	clearCanvas();
	drawGrid();
}

function shuffle(){										//aleatoriza vetores
	for (let i = 1; i < pos.length - 1; i++){
		pos[i][0] = random(0, 11) * div;
		pos[i][1] = random(0, 11) * div;
	}

	refresh();
}

/* 

modulo = Math.sqrt( Math.pow(Xb - Xa, 2) + Math.pow(Yb - Ya, 2) )

*/