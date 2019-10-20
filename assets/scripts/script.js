var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = 300 + "px";
    } 
  });
}

if (window.innerWidth < 1024) {
	let infoHelp = document.querySelectorAll('.info-help');

	infoHelp.forEach( (el) => {
		el.innerHTML = 'Tap on image <br> to see the project';
	});	
}




let mobile_desc = document.querySelectorAll('.mobile_desc');
let project_info = document.querySelectorAll('.project-info');

console.log(mobile_desc);
console.log(project_info);

mobile_desc.forEach( (el, index) => {

	el.addEventListener('touchstart', (event) => {

		if (project_info[index].className === 'project-info mobile_visible') {
			project_info[index].classList.remove('mobile_visible');
		} else 
			project_info[index].classList.add('mobile_visible');
	});	
});









let items = document.querySelectorAll('.carousel .item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.control.left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.control.right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});


const swipedetect = (el) => {
  
	let surface = el;
	let startX = 0;
	let startY = 0;
	let distX = 0;
	let distY = 0;
	let startTime = 0;
	let elapsedTime = 0;

	let threshold = 150;
	let restraint = 100;
	let allowedTime = 300;

	surface.addEventListener('mousedown', function(e){
		startX = e.pageX;
		startY = e.pageY;
		startTime = new Date().getTime();
		e.preventDefault();
	}, false);

	surface.addEventListener('mouseup', function(e){
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (isEnabled) {
						previousItem(currentItem);
					}
				} else {
					if (isEnabled) {
						nextItem(currentItem);
					}
				}
			}
		}
		e.preventDefault();
	}, false);

	surface.addEventListener('touchstart', function(e){
		if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
			if (e.target.classList.contains('left')) {
				if (isEnabled) {
					previousItem(currentItem);
				}
			} else {
				if (isEnabled) {
					nextItem(currentItem);
				}
			}
		}
			var touchobj = e.changedTouches[0];
			startX = touchobj.pageX;
			startY = touchobj.pageY;
			startTime = new Date().getTime();
			e.preventDefault();
	}, false);

	surface.addEventListener('touchmove', function(e){
			e.preventDefault();
	}, false);

	surface.addEventListener('touchend', function(e){
			var touchobj = e.changedTouches[0];
			distX = touchobj.pageX - startX;
			distY = touchobj.pageY - startY;

			//console.log(distX, distY);
			//console.log(touchobj.pageY);

			// если пользователь нажимает не на картинку, но на нашу карусель
			if (touchobj.pageY < 1240 || touchobj.pageY > 1680) return;

			if (distX === 0 && distY === 0) {
				if (currentItem === 0) 
					window.location.href = 'projects/RepairDesignProject/test.html';
				else if (currentItem === 1) 
				window.location.href = 'projects/THEYALOW/test2.html';
			}

			elapsedTime = new Date().getTime() - startTime;
			if (elapsedTime <= allowedTime){
				if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
					if ((distX > 0)) {
						if (isEnabled) {
							previousItem(currentItem);
						}
					} else {
						if (isEnabled) {
							nextItem(currentItem);
						}
					}
				}
			}
			e.preventDefault();
	}, false);
}

var el = document.querySelector('.carousel');
swipedetect(el);


