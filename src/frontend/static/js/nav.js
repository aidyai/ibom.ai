const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdown = document.querySelectorAll(".dropdown");
const hamburgerBtn = document.getElementById("hamburger");
const navMenu = document.querySelector(".menu");
const links = document.querySelectorAll(".dropdown a");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const modalContainer = document.getElementById("modalContainer");

function setAriaExpandedFalse() {
  dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function closeDropdownMenu() {
  dropdown.forEach((drop) => {
    drop.classList.remove("active");
    drop.addEventListener("click", (e) => e.stopPropagation());
  });
}

function toggleHamburger() {
  navMenu.classList.toggle("show");
  if (navMenu.classList.contains("show")) {
    // If hamburger menu is opened, append login and signup buttons
    navMenu.appendChild(loginBtn);
    navMenu.appendChild(signupBtn);
  } else {
    // If hamburger menu is closed, move login and signup buttons back to their original position
    document.querySelector('.right-container').appendChild(loginBtn);
    document.querySelector('.right-container').appendChild(signupBtn);
  }
}

function hideNavLinks() {
  navMenu.classList.remove("show");
}

// Add event listeners to the login and signup buttons
loginBtn.addEventListener('click', hideNavLinks);
signupBtn.addEventListener('click', hideNavLinks);

// Toggle hamburger menu
hamburgerBtn.addEventListener("click", toggleHamburger);

function hideNavLinks() {
  navMenu.classList.remove("show");
}

// Add event listeners to the login and signup buttons
loginBtn.addEventListener('click', hideNavLinks);
signupBtn.addEventListener('click', hideNavLinks);

dropdownBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const dropdownIndex = e.currentTarget.dataset.dropdown;
    const dropdownElement = document.getElementById(dropdownIndex);

    dropdownElement.classList.toggle("active");
    dropdown.forEach((drop) => {
      if (drop.id !== btn.dataset["dropdown"]) {
        drop.classList.remove("active");
      }
    });
    e.stopPropagation();
    btn.setAttribute(
      "aria-expanded",
      btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
    );
  });
});

// Close dropdown menu when the dropdown links are clicked
links.forEach((link) =>
  link.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
    toggleHamburger();
  })
);

// Close dropdown menu when you click on the document body
document.documentElement.addEventListener("click", () => {
  closeDropdownMenu();
  setAriaExpandedFalse();
});

// Close dropdown when the escape key is pressed
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDropdownMenu();
    setAriaExpandedFalse();
  }
});




