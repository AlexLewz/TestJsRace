// const score = document.querySelector('.score');
// const start = document.querySelector('.start');
// const paper = document.querySelector('.paper');

const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft: false
};

const settings = {
	isStarted: false,
	score: 0,
	speed: 3
};

start.addEventListener('click', startGame);

document.addEventListener('keyup', stopMove);
document.addEventListener('keydown', startMove);

function startGame() {
	start.classList.add('hide');
	init();
	settings.isStarted = true;
	requestAnimationFrame(playGame);
}

function playGame() {
	console.log('Play game!');
	if(settings.isStarted) {
		requestAnimationFrame(playGame);
	}
}

function stopMove(e) {
	e.preventDefault();
	keys[e.key] = true;
//	console.log(e.key);
//	console.log('stop');
}

function startMove(e) {
	if(e.key == 'F5' || e.key == 'F12') return;
	e.preventDefault();
	keys[e.key] = false;
//	console.log(e.key);
//	console.log('start');
}

function init() {
	let car = document.createElement('div');
	car.id = 'person_car';
	car.classList.add('person_car');
	paper.appendChild(car);
}