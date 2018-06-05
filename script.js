var wInnerWidth = window.innerWidth;
var wInnerHeight = window.innerHeight;

// Scene init
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);
scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

// Camera init
var camera = new THREE.PerspectiveCamera(75, wInnerWidth / wInnerHeight, 1, 1000);
camera.position.z = 50;

// Renderer init
var renderer = new THREE.WebGLRenderer();
renderer.setSize(wInnerWidth, wInnerHeight);
document.body.appendChild(renderer.domElement);

// Controls init
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 10;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI / 2;

// Light init
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1);
scene.add(light);
var light2 = new THREE.DirectionalLight(0x002288);
light.position.set(- 1, - 1, - 1);
scene.add(light2);
var light3 = new THREE.AmbientLight(0x222222);
scene.add(light3);

// Animation loop
var animate = function () {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
};
animate();

document.getElementById('create-btn').addEventListener('click', createChoosenShape);

function createChoosenShape() {
	var shape = document.getElementById('shape-select').value;
	var size = document.getElementById('size-select').value;
	var geometry;

	switch (shape) {
		case 'sphere':
			geometry = new THREE.SphereGeometry(size);
			break;
		case 'pyramid':
			geometry = new THREE.CylinderGeometry(0, size, size, 4, false);
			break;
		case 'cube':
		default:
			geometry = new THREE.BoxGeometry(size, size, size);
			break;
	}

	var material = new THREE.MeshPhongMaterial({color: 0xffffff, flatShading: true});
	var figure = new THREE.Mesh(geometry, material);
	figure.position.set(getRandomIntInclusive(-30, 30), getRandomIntInclusive(-30, 30), getRandomIntInclusive(-30, 30));
	scene.add(figure);

	var createdFigureRef = document.createElement('LI');
	var figureDescription = document.createTextNode('Figure: ' + shape.toUpperCase() + ' | Size: ' + size);
	var deleteFigureBtn = document.createElement('BUTTON');
	deleteFigureBtn.appendChild(document.createTextNode('Delete'));

	deleteFigureBtn.addEventListener('click', function() {
		scene.remove(figure);
		figure.geometry.dispose();
		figure.material.dispose();
		figure = undefined;
		this.parentNode.parentNode.removeChild(this.parentNode);
	});
	createdFigureRef.appendChild(figureDescription);
	createdFigureRef.appendChild(deleteFigureBtn);
	document.getElementById('created-shapes').appendChild(createdFigureRef);
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}