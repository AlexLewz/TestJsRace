// const score = document.querySelector('.score');
// const start = document.querySelector('.start');
// const paper = document.querySelector('.paper');
// const lines = document.querySelector('.lines');
const MAX_LEVEL = 5;
const MAX_LINES = 12;

const keys = {
	ArrowUp:	false,	w: false,
	ArrowDown:	false,	s: false,
	ArrowRight:	false,	d: false,
	ArrowLeft:	false,	a: false

};

const settings = {
	isStarted: false,
	score: 0,
	speed: 5,
	level: 1
};

start.addEventListener('click', startGame);

document.addEventListener('keyup', stopMove);
document.addEventListener('keydown', startMove);

function startGame() {
	init();
	requestAnimationFrame(playGame);
}

function playGame() {
	if(settings.isStarted) {
		movePersonCar();
		moveLines();
		moveCars();
		requestAnimationFrame(playGame);
	}
}

function startMove(e) {
	if(e.key == 'F5' || e.key == 'F12') return;
	e.preventDefault();
	keys[e.key] = true;
}

function stopMove(e) {
	e.preventDefault();
	keys[e.key] = false;
}

function init() {
	start.classList.add('hide');

	createPersonCar();
	createLines();
	createCars();

	settings.isStarted = true;
}

function createPersonCar() {
	let car = document.createElement('div');
	car.id = 'person_car';
	car.classList.add('person_car');
	paper.appendChild(car);

	settings.x = person_car.offsetLeft;
	settings.y = person_car.offsetTop;
	settings.w = person_car.offsetWidth;
	settings.h = person_car.offsetHeight;
}

function movePersonCar() {
		if((keys.ArrowLeft || keys.a) && settings.x > 1) {
			settings.x -= settings.speed;
		}
		if((keys.ArrowRight || keys.d) && settings.x < (paper.offsetWidth-settings.w-1)) {
			settings.x += settings.speed;
		}
		if((keys.ArrowDown || keys.s) && settings.y < (paper.offsetHeight-settings.h-1)) {
			settings.y += settings.speed;
		}
		if((keys.ArrowUp || keys.w) && settings.y > 1) {
			settings.y -= settings.speed;
		}

		person_car.style.left = settings.x + 'px';
		person_car.style.top = settings.y + 'px';
}

function createLines() {
	for (var i = 0; i < MAX_LINES ; i++) {
		const line = document.createElement('div');
		line.classList.add('line');
		lines.appendChild(line);
	}

	lines.y = -(lines.offsetHeight-paper.offsetHeight);
	lines.style.top = lines.y + 'px';

	settings.lineHeight = lines.querySelector('.line').offsetHeight;
}

function moveLines() {

	if( lines.y + paper.offsetHeight >= paper.offsetHeight) {
		//if(settings.level < MAX_LEVEL) { settings.level++; }
		lines.y = -(lines.offsetHeight-paper.offsetHeight) + settings.lineHeight + settings.speed;
	}

	lines.y += settings.speed;
	lines.style.top = lines.y + 'px';
}

function createCars() {
	const offsetRoad = (paper.offsetWidth / 3)*2;
	const centerRoad = (paper.offsetWidth / 2) - (settings.w / 2);

	let carOffset = 0;
	for (var i = 0; i < 50 ; i++) {
		const car = document.createElement('div');
		car.classList.add('car');
		car.y = -settings.h*3*(i+1);
		car.style.top = car.y + 'px';
		if( Math.round(Math.random()) ) {
			if( Math.round(Math.random()) ) {
				car.style.left = offsetRoad + 'px';
			} else {
				car.style.left = centerRoad + 'px';
			}
		} else {
			if( Math.round(Math.random()) ) {
				car.style.right = offsetRoad + 'px';
			} else {
				car.style.left = centerRoad + 'px';
			}
		}
		paper.appendChild(car);

		carOffset = car.offsetHeight;

	}

	settings.carWidth = paper.querySelector('.car').offsetWidth;
	settings.carHeight = paper.querySelector('.car').offsetHeight;
}

function moveCars() {
	paper.querySelectorAll('.car').forEach(function(car) {
		//console.log(car);
		car.y += settings.speed;
		car.style.top = car.y + 'px';
	});
}

function getHeightQuantity(elementHeight) {
	return Math.floor(paper.offsetHeight / elementHeight);
}