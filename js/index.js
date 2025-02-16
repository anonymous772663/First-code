document.addEventListener("DOMContentLoaded", () => {
	/*==================== MENU SHOW Y HIDDEN ====================*/
	const navMenu = document.getElementById("nav-menu");
	const navToggle = document.getElementById("nav-toggle");
	const navClose = document.getElementById("nav-close");
	const header = document.getElementById("header");
	var mediaQuery = window.matchMedia("(max-width: 769px)");
	var mediaQuery2 = window.matchMedia("(min-width: 769px)");

	/*===== MENU SHOW =====*/
	function bodyMenuOpen() {
		body.style.overflow = "hidden";
		body.style.userSelect = "none";
	}
	function bodyMenuClose() {
		body.style.overflow = "auto";
		body.style.userSelect = "auto";
	}
	/* Validate if constant exists */
	if (navToggle) {
		navToggle.addEventListener("click", () => {
			navMenu.classList.add("show-menu");
			bodyMenuOpen();
		});
	}

	/*===== MENU HIDDEN =====*/
	/* Validate if constant exists */
	if (navClose) {
		navClose.addEventListener("click", () => {
			navMenu.classList.remove("show-menu");
			bodyMenuClose();
		});
	}

	/*==================== REMOVE MENU MOBILE ====================*/
	const navLink = document.querySelectorAll(".nav_link");

	function linkAction() {
		navMenu.classList.remove("show-menu");
		bodyMenuClose();
	}
	navLink.forEach((n) => n.addEventListener("click", linkAction));

	/*==================== ANCHOR TAG HYPERLINK ====================*/
	document.querySelectorAll("[data-href]").forEach((elem) => {
		elem.style.cursor = "pointer";
		elem.style.userSelect = "none";
		elem.addEventListener("click", () => {
			if (elem.getAttribute("data-href") == "#") {
				return;
			}
			window.location.href = elem.getAttribute("data-href");
		});
	});

	/*==================== NAVBAR LINE OUT AFTER ANIMATION ====================*/
	function LineOut() {
		var links = document.querySelectorAll(".nav_link_hover:not(.active-link)");
		links.forEach((link) => {
			link.addEventListener("mouseenter", () => {
				if (!link.classList.contains("active-link")) {
					link.classList.remove("unhovered");
					link.classList.add("hovered");
				}
			});

			link.addEventListener("mouseout", () => {
				link.classList.remove("hovered");
				link.classList.add("unhovered");
			});
		});
	}
	header.addEventListener("mousemove", LineOut);

	/*==================== HEADER COLOUR TOGGLE FOR ALL DEVICES ====================*/
	var lastScrollTop = 0;
	var viewportHeight = window.innerHeight;
	function toggleHeaderColor(color, bgcolor, boxShadow) {
		var navElements = document.querySelectorAll(
			".nav_link, .nav_toggle, .change-theme"
		);

		header.style.backgroundColor = bgcolor;
		header.style.boxShadow = boxShadow;

		navElements.forEach(function (element) {
			element.style.color = color;
		});

		if (mediaQuery.matches) {
			document.getElementById("nav-menu").style.backgroundColor = bgcolor;
		}
	}
	document.addEventListener("scroll", function () {
		if (mediaQuery.matches) {
			var scrollTop = window.scrollY + viewportHeight - 20;
		} else {
			var scrollTop = window.scrollY + 70;
		}

		if (header) {
			if (scrollTop > viewportHeight) {
				toggleHeaderColor(
					"var(--title-color)",
					"var(--body-color)",
					"var(--header-shadow)"
				);
			} else {
				toggleHeaderColor(
					"var(--title-color-light)",
					"var(--nav-black)",
					"0 0 0 rgba(0, 0, 0, 0)"
				);
			}
		}
		lastScrollTop = scrollTop;
	});

	/*==================== RESUME SCROLL ====================*/
	const pages = document.querySelectorAll(".page");

	function resumeActive() {
		if (mediaQuery2.matches) {
			const scrollY = window.scrollY;

			pages.forEach((page) => {
				const sectionHeight = page.offsetHeight;
				const sectionTop = page.offsetTop - 130;

				let sectionId = page.getAttribute("id");
				if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
					document.querySelectorAll(".resume_tabs a").forEach((link) => {
						link.classList.remove("current");
					});
					document
						.querySelector(`.resume_tabs a[data-href*=${sectionId}]`)
						.classList.add("current");
				}
			});
		}
	}
	resumeActive();
	window.addEventListener("scroll", resumeActive);

	/*==================== DARK LIGHT THEME ====================*/
	const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
	const themeButton = document.getElementById("theme-button");
	const body = document.body;

	function isLocalStorageSupported() {
		try {
			return "localStorage" in window && window["localStorage"] !== null;
		} catch (e) {
			return false;
		}
	}

	function browserHeader() {
		setTimeout(() => {
			var backgroundColor = window.getComputedStyle(
				document.body
			).backgroundColor;
			document
				.querySelector('meta[name="theme-color"]')
				.setAttribute("content", backgroundColor);
		}, 300);
	}

	function darkMode(mode) {
		body.setAttribute("data-theme", mode);
		browserHeader();

		if (isLocalStorageSupported() === true) {
			localStorage.setItem("data-theme", mode);
		}
	}

	themeButton.addEventListener("click", () => {
		if (body.getAttribute("data-theme") === "light") {
			darkMode("dark");
		} else {
			darkMode("light");
		}
	});

	if (isLocalStorageSupported() === true) {
		const storedTheme = localStorage.getItem("data-theme");
		const storedColor = localStorage.getItem("color");
		if (storedTheme) {
			darkMode(storedTheme);
		}
		if (storedColor) {
			document.documentElement.style.setProperty("--hue-color", storedColor);
		}
	}

	if (prefersDarkMode.matches && !localStorage.getItem("data-theme")) {
		darkMode("dark");
	}

	window.addEventListener("keyup", (e) => {
		if (e.code === "Backquote" && e.key === "~" && e.shiftKey === true) {
			themeButton.click();
		}
	});

	/*==================== COLOURFUL THEME ====================*/
	const themeSetting = document.getElementById("theme-setting");
	const colorPicker = document.getElementById("color-picker");
	themeSetting.addEventListener("click", () => {
		colorPicker.style.display = "flex";
	});
	function colorPickerDisplay() {
		colorPicker.style.display = "none";
	}
	document
		.querySelectorAll("input[name='hue_color_picker']")
		.forEach((input) => {
			input.style.backgroundColor = `hsl(${input.value} ,69%, 61%)`;
			input.checked = false;
			if (localStorage.getItem("color") !== null) {
				if (input.value == localStorage.getItem("color")) {
					input.checked = true;
				}
			} else {
				document.querySelector(
					"input[name='hue_color_picker'][value='220']"
				).checked = true;
			}
			input.style.cursor = "pointer";
			input.addEventListener("click", () => {
				var colorValue = input.value;
				localStorage.setItem("color", colorValue);
				document.documentElement.style.setProperty("--hue-color", colorValue);
				browserHeader();
				colorPickerDisplay();
			});
		});

	["scroll", "click", "contextmenu", "touchstart"].forEach((evt) => {
		document.addEventListener(evt, (e) => {
			if (!themeSetting.contains(e.target) && !colorPicker.contains(e.target)) {
				colorPickerDisplay();
			}
		});
	});

	/*==================== BUTTONS ====================*/
	const buttons = document.querySelectorAll(".button");

	buttons.forEach((button) => {
		["mouseenter", "mouseleave", "mousemove"].forEach((evt) => {
			button.addEventListener(evt, (e) => {
				const parentOffset = button.getBoundingClientRect();
				const relX = e.clientX - parentOffset.left;
				const relY = e.clientY - parentOffset.top;

				const span = button.querySelector("span");

				if (span) {
					span.style.top = relY + "px";
					span.style.left = relX + "px";
				}
			});
		});
	});

	/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
	const sections = document.querySelectorAll("section[id]");

	const scrollActive = () => {
		const scrollY = window.scrollY;

		sections.forEach((current) => {
			const scrollHeight = current.offsetHeight;
			const sectionTop = current.offsetTop - 50;
			const sectionId = current.getAttribute("id");
			const navLink = document.querySelector(
				`.nav_link[data-href="#${sectionId}"]`
			);

			if (scrollY > sectionTop && scrollY <= sectionTop + scrollHeight) {
				document.querySelectorAll(".nav_link_hover").forEach((each) => {
					each.classList.remove("active-link");
				});
				navLink.querySelector(".nav_link_hover").classList.add("active-link");
			}
		});
	};
	window.addEventListener("scroll", scrollActive);
	window.addEventListener("click", scrollActive);

	/*==================== CONTACT FORM ERROR HANDLE ====================*/
	const inputs = document.querySelectorAll(".contact_input");
	const inputErrors = document.querySelectorAll(".contact_error");

	inputs.forEach((input, index) => {
		input.addEventListener("input", function () {
			const pattern = new RegExp(input.pattern);
			const value = input.value;
			const errorSpan = inputErrors[index];

			if (value === "") {
				errorSpan.textContent = "";
			} else if (!pattern.test(value)) {
				errorSpan.textContent = input.getAttribute("data-error");
			} else {
				errorSpan.textContent = "";
			}
		});
	});

	/*==================== TYPED JS ANIMATION ====================*/
	const typed = new Typed("#typed-js", {
		strings: [
			"",
			"Pramod Adhikari.",
			"a Junior Developer.",
			"basic UI/UX Designer.",
		],
		typeSpeed: 70,
		backSpeed: 45,
		startDelay: 0,
		loop: true,
		showCursor: true,
		cursorChar: "|",
	});
});
