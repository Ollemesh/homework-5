let block = document.createElement('div');
block.style.position = 'relative';

let container = document.createElement('div');
container.style.width = '500px';
container.style.height = '500px';
container.style.outline = '1px solid red';
container.classList.add('container');


let button = document.createElement('button');
button.style.zIndex = '1';
button.innerHTML = 'Add block';

button.addEventListener('click', pushBlock);
block.addEventListener('mousedown', startDrag);

var body = document.querySelector('body');
body.appendChild(container);
body.appendChild(button);

function startDrag(e) {
	offset.x = e.clientX - e.target.getBoundingClientRect().left;
	offset.y = e.clientY - e.target.getBoundingClientRect().top;
	e.preventDefault();
	body.addEventListener('mousemove', move);
	body.addEventListener('mouseup', stopDrag);
};

let offset = {};
let borderCoorgs = {
	minLeft: 0,
	minRight: 0
};

function move(e) {
	(e.clientX - offset.x-container.getBoundingClientRect().left) < borderCoorgs.minLeft ? block.style.left = borderCoorgs.minLeft+'px' :
	(e.clientX - offset.x-container.getBoundingClientRect().left) > borderCoorgs.maxLeft ? block.style.left = borderCoorgs.maxLeft+'px' :
	block.style.left = e.clientX - offset.x-container.getBoundingClientRect().left+'px';

	(e.clientY - offset.y-container.getBoundingClientRect().top) < borderCoorgs.minRight ? block.style.top = borderCoorgs.minRight+'px' :
	(e.clientY - offset.y-container.getBoundingClientRect().top) > borderCoorgs.maxRight ? block.style.top = borderCoorgs.maxRight+'px' :
	block.style.top = e.clientY - offset.y-container.getBoundingClientRect().top+'px';
};

function stopDrag(e) {
	body.removeEventListener('mousemove', move);
	body.removeEventListener('mouseup', stopDrag);
}

function pushBlock() {
	block.style.width= '30px';
	block.style.height = '30px';
	block.style.top = getRandomTop()+'px';
	block.style.left = getRandomLeft()+'px';
	block.style.backgroundColor = getRandomColor();
	container.appendChild(block);
	borderCoorgs.maxLeft = container.clientWidth - block.clientWidth;
	borderCoorgs.maxRight = container.clientHeight - block.clientHeight;
};

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

function getRandomTop() {
	return Math.floor((Math.random()* (container.clientHeight - parseInt(block.style.width))));
};

function getRandomLeft() {
	return Math.floor((Math.random()* (container.clientWidth - parseInt(block.style.height))));
};