import { useParticlesReference } from "../utils/canvas/canvas";

const generateParticles = (width, height) => {
	let temp_particles = [];
	for(let i = 0; i < 200; i++) {
		let radius = Math.random() * 3;
		let x = Math.random() * (width - radius * 2) + radius;
		let y = Math.random() * (height - radius * 2) + radius;
		let dx = (Math.random() - 0.9);
		let dy = (Math.random() - 0.9);
		temp_particles.push({x, y, dx, dy, radius});
	}

	return temp_particles;
}


const Particles = () => {
	const {context, width, height } = useParticlesReference();
	let particles = generateParticles(width, height);

	const render = () => {
		context.clearRect(0, 0, width, height);
		drawMoon(context);
		for(let i = 0; i < particles.length; i++) {
			update(particles[i], context, width, height);
		}
		requestAnimationFrame(render);
	}

	if(context) render();

	return null;
}

const drawMoon = (context) => {
	context.beginPath();
    context.arc(280, 100, 50, Math.PI * 2, 0, false);
    context.fillStyle = "#B0BEC5";
    context.fill();

    context.beginPath();
    context.arc(300, 80, 50, Math.PI * 2, 0, false);
    context.fillStyle="#212121";
    context.fill();
}

const draw = (x, y, radius, context) => {
	context.beginPath();
	context.arc(x, y, radius, Math.PI * 2, false);
	context.fill();
	context.fillStyle = "#455A64";
	context.closePath();
}

const update = (particle, context, width, height) => {
	if(particle.x + particle.radius > width || particle.x - particle.radius < 0) {
		particle.dx = -particle.dx;
	}
	if(particle.y + particle.radius > height || particle.y - particle.radius < 0) {
		particle.dy = -particle.dy;
	}

	particle.x += particle.dx;
	particle.y += particle.dy;
	draw(particle.x, particle.y, particle.radius, context);
}

export default Particles;