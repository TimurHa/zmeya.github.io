let p = document.getElementById('score');





const N = 150;
const WIDTH = 15;
let pole = document.createElement('div');
document.body.appendChild(pole);
pole.classList.add('pole');

for (let i = 0; i < N; i++) {
	let exel = document.createElement('div');
	pole.appendChild(exel);
	exel.classList.add('exel');
}

let exel = document.getElementsByClassName('exel');
let x = 1;
let y = 10;

for (let i = 0; i < N; i++) {
	if (x > WIDTH) {
		x = 1;
		y--;
	}
	exel[i].setAttribute('posX', x);
	exel[i].setAttribute('posY', y);
	x++;
}

function genZm() {
	let posX = Math.round(Math.random() * (WIDTH - 3) + 3);
	let posY = Math.round(Math.random() * (10 - 1) + 1);
	return [posX, posY];
}

let coord = genZm();


let zm = [document.querySelector('[posX = "' + coord[0] + '"][posY = "' + coord[1] + '"]'),
	document.querySelector('[posX = "' + (coord[0] - 1) + '"][posY = "' + coord[1] + '"]'),
	document.querySelector('[posX = "' + (coord[0] - 2) + '"][posY = "' + coord[1] + '"]')
];


for (let i = 0; i < zm.length; i++) {
	zm[i].classList.add('telo');
}
zm[0].classList.add('head');

let mouse;

function make_mouse() {
	function genM() {
		let posX = Math.round(Math.random() * (WIDTH - 1) + 1);
		let posY = Math.round(Math.random() * (10 - 1) + 1);
		return [posX, posY];
	}

	let mouse_coord = genM();
	mouse = document.querySelector('[posX = "' + mouse_coord[0] + '"][posY = "' + mouse_coord[1] + '"]');
	while (mouse.classList.contains('telo')) {
		let mouse_coord = genM();
		mouse = document.querySelector('[posX = "' + mouse_coord[0] + '"][posY = "' + mouse_coord[1] + '"]');
	}


	mouse.classList.add('mouse');
}


make_mouse();

let napr = 'right';
let steps = false;


let score = 0;
p.textContent = `Ваши очки: ${score}`;

function move() {
	let zm_coord = [zm[0].getAttribute('posX'), zm[0].getAttribute('posY')];
	zm[0].classList.remove('head');
	zm[zm.length - 1].classList.remove('telo');
	zm.pop();
	if (napr == 'right') {
		if (zm_coord[0] < WIDTH) {
			zm.unshift(document.querySelector('[posX = "' + (+zm_coord[0] + 1) +
				'"][posY = "' + zm_coord[1] + '"]'));
		} else {
			zm.unshift(document.querySelector('[posX = "' + 1 +
				'"][posY = "' + zm_coord[1] + '"]'));
		}
	} else if (napr == 'left') {
		if (zm_coord[0] > 1) {
			zm.unshift(document.querySelector('[posX = "' + (+zm_coord[0] - 1) +
				'"][posY = "' + zm_coord[1] + '"]'));
		} else {
			zm.unshift(document.querySelector('[posX = "' + WIDTH +
				'"][posY = "' + zm_coord[1] + '"]'));
		}
	} else if (napr == 'up') {
		if (zm_coord[1] < 10) {
			zm.unshift(document.querySelector('[posX = "' + zm_coord[0] +
				'"][posY = "' + (+zm_coord[1] + 1) + '"]'));
		} else {
			zm.unshift(document.querySelector('[posX = "' + zm_coord[0] +
				'"][posY = "' + 1 + '"]'));
		}
	} else if (napr == 'down') {
		if (zm_coord[1] > 1) {
			zm.unshift(document.querySelector('[posX = "' + zm_coord[0] +
				'"][posY = "' + (+zm_coord[1] - 1) + '"]'));
		} else {
			zm.unshift(document.querySelector('[posX = "' + zm_coord[0] +
				'"][posY = "' + 10 + '"]'));
		}
	}
	function soundGo() {
		  var audio = new Audio(); // Создаём новый элемент Audio
		  audio.src = 'sound.mp3'; // Указываем путь к звуку "клика"
		  audio.autoplay = true; // Автоматически запускаем
	}
	if (zm[0].getAttribute('posX') == mouse.getAttribute('posX') &&
		zm[0].getAttribute('posY') == mouse.getAttribute('posY')) {

		soundGo();
		
		mouse.classList.remove('mouse');
		let a = zm[zm.length - 1].getAttribute('posX');
		let b = zm[zm.length - 1].getAttribute('posY');

		zm.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
		make_mouse();
		score++;
		p.textContent = `Ваши очки: ${score}`;
	}

	if (zm[0].classList.contains('telo')) {
		setTimeout(() => {
			alert(`Игра окончена! Ваши очки: ${score}`);
		}, 200);

		clearInterval(interval);
		zm[0].style.background = 'black';
	}

	zm[0].classList.add('head');
	for (let i = 0; i < zm.length; i++) {
		zm[i].classList.add('telo');
	}
	steps = true;
}


let interval = setInterval(move, 150);

window.addEventListener('keydown', function(e) {
	if (steps == true) {
		if (e.keyCode == 37 && napr != 'right') {
			napr = 'left';
			steps = false;

		} else if (e.keyCode == 38 && napr != 'down') {
			napr = 'up';
			steps = false;

		} else if (e.keyCode == 39 && napr != 'left') {
			napr = 'right';
			steps = false;

		} else if (e.keyCode == 40 && napr != 'up') {
			napr = 'down';
			steps = false;
		}
	}
});