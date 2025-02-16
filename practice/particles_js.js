document.addEventListener("DOMContentLoaded", function () {
	let particles = [];
	const maxParticles = 250;
	const container = document.getElementById("welcome_page");
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	// Setting canvas size
	canvas.width = document.documentElement.clientWidth;
	canvas.height = window.innerHeight;
	container.appendChild(canvas);

	// Particle class
	class Particle {
		constructor() {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
			this.radius = Math.random() * 3;
			this.color = ["#e217d8", "#9B0127", "#ece935", "#3CFBFF"][
				Math.floor(Math.random() * 4)
			];
			this.speed = Math.random() * 2;
			this.angle = Math.random() * 2 * Math.PI;
		}

		move() {
			this.x += Math.cos(this.angle) * this.speed;
			this.y += Math.sin(this.angle) * this.speed;

			if (
				this.x < 0 ||
				this.x > canvas.width ||
				this.y < 0 ||
				this.y > canvas.height
			) {
				this.x = Math.random() * canvas.width;
				this.y = Math.random() * canvas.height;
			}
		}

		draw() {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	}

	// Populating particles
	function populateParticles() {
		for (let i = 0; i < maxParticles; i++) {
			particles.push(new Particle());
		}
	}

	// Updatating canvas
	function update() {
		ctx.fillStyle = "#180341";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		for (let particle of particles) {
			particle.move();
			particle.draw();
		}

		requestAnimationFrame(update);
	}

	populateParticles();
	update();
});
