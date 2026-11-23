// preloader

const loader = document.getElementById("loader");
window.addEventListener("load", () => {
  loader.classList.add("#loader");
  document.body.style.overflow="hidden";
  setTimeout(()=>{
    loader.classList.add("hide-loader");
      document.body.style.overflow="auto";
  }, 3000)

})


const body = document.body;

const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");


// DARK AND LIGHT MODE

// Restore saved theme
const savedTheme = localStorage.getItem("joetech-theme");

if (savedTheme === "light") {
  body.classList.add("light");
}

updateThemeButton();

themeToggle.addEventListener("click", () => {

  body.classList.toggle("light");

  localStorage.setItem(
    "joetech-theme",
    body.classList.contains("light") ? "light" : "dark"
  );

  updateThemeButton();

});

function updateThemeButton() {

  const isLight = body.classList.contains("light");

  themeToggle.innerHTML = isLight
    ? '<i class="fa-regular fa-moon"></i><span class="theme-label">Dark</span>'
    : '<i class="fa-regular fa-sun"></i><span class="theme-label">Light</span>';

  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark mode" : "Switch to light mode"
  );

}

// Writing text


const words = ["Front-End Developer", " Problem Solver", " Creative Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typed-word');
function type() {


  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 100 : 150;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 500;
  }

  setTimeout(type, speed);
}

type();

// ==============================
// MOBILE NAVIGATION
// ==============================

menuToggle.addEventListener("click", () => {

  // const opened = navMenu.classList.toggle("open");
  // console.log(opened);
  
  if(!document.querySelector("nav").classList.contains("open")){
    document.querySelector("nav").classList.add("open")
  }
  else{
     document.querySelector("nav").classList.remove("open")
  }
  menuToggle.setAttribute(
    "aria-expanded",
    String(opened)
  );

  menuToggle.setAttribute(
    "aria-label",
    opened ? "Close navigation menu" : "Open navigation menu"
  );

});


// Close mobile menu when a link is clicked

navMenu.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    navMenu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

  });

});


// SCROLL REVEAL ANIMATION

const revealObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("visible");

      revealObserver.unobserve(entry.target);

    }

  });

}, {
  threshold: 0.12
});


document.querySelectorAll(".reveal").forEach(element => {

  revealObserver.observe(element);

});


// ACTIVE NAVIGATION LINK

const sectionIds = [
  "home",
  "about",
  "skills",
  "services",
  "projects",
  "contact"
];

const sections = sectionIds
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navLinks = [
  ...document.querySelectorAll(".nav-link")
];


const sectionObserver = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      navLinks.forEach(link => {

        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );

      });

    }

  });

}, {
  rootMargin: "-35% 0px -55% 0px"
});


sections.forEach(section => {

  sectionObserver.observe(section);

});


// // Skill Section

// // Skill Loading Animation

document.addEventListener('DOMContentLoaded', () => {

    const skillSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress > span');
    const percentages = document.querySelectorAll('.percentage');

    const animateBars = () => {

        progressBars.forEach((bar, i) => {

            const targetNum = parseInt(percentages[i].dataset.target);

            // Reset bar and percentage
            bar.style.width = "0%";
            percentages[i].textContent = "0%";

            // Start animation
            setTimeout(() => {
                bar.style.width = targetNum + "%";
            }, 100);

            let count = 0;
            const speed = 1500 / targetNum;

            const counter = setInterval(() => {
                count++;
                percentages[i].textContent = count + "%";

                if (count >= targetNum) {
                    clearInterval(counter);
                }

            }, speed);

        });

    };

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateBars();

            } else {

                progressBars.forEach(bar => {
                    bar.style.width = "0%";
                });

                percentages.forEach(percent => {
                    percent.textContent = "0%";
                });

            }

        });

    }, {
        threshold: 0.2
    });

    observer.observe(skillSection);

});

// AUTOMATIC COPYRIGHT YEAR



// CONTACT FORM

emailjs.init({
  publicKey: "kY7Zl4PuXDWT0CKqm",
});

const submit = document.querySelector(".form-button")
console.log(submit);

submit.addEventListener("click", (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const valemail = email.value;
  const text = document.getElementById("message");
  const status = document.getElementById("formStatus");
  const subject = document.getElementById("subject")
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (fullName.value.trim() === "" || fullName.value.length < 3) {
    fullName.classList.add("error")
    fullName.focus()
    status.style.display = "block"
    status.style.color = "red"
    status.textContent = "Your name must be more than three characters"
    fullName.addEventListener("input", () => {
      fullName.classList.remove("error")
      status.style.display = "none"
    })

  }

  else if (!emailRegex.test(valemail)) {
    email.classList.add("error")
    email.focus()
    status.style.display = "block"
    status.style.color = "red"
    status.textContent = "Please Enter a valid email address"
    email.addEventListener("input", () => {
      email.classList.remove("error")
      status.style.display = "none"
    })
  }
else if (subject.value === "") {
    subject.classList.add("error");
    subject.focus();

    status.style.display = "block";
    status.style.color = "red";
    status.textContent = "Please choose a subject";

    subject.addEventListener("change", () => {
        subject.classList.remove("error");
        status.style.display = "none";
    });
}

  else if (text.value.trim() === "" || text.value.length < 10) {
    text.classList.add("error")
    text.focus()
    status.style.display = "block"
    status.style.color = "red"
    status.textContent = "Message Must be atleast 5 words"
    text.addEventListener("input", () => {
      text.classList.remove("error")
      status.style.display = "none"
    })
  }

  else {

    const templateParams = {
      full_name: fullName.value,
      email: email.value,
      message: text.value,
    };

    const loader = document.querySelector(".loader");
    const btnText = document.querySelector(".btn-text");

    loader.classList.add("show-loader");
    btnText.classList.add("hide-text");
    submit.disabled = true;

    emailjs.send(
      "service_p6opglb",
      "template_tdm6pbv",
      templateParams
    )
      .then(() => {

        loader.classList.add("show-loader");
        btnText.classList.add("hide-text");
        btnText.classList.add("progress")
        submit.disabled = false;

        setTimeout(() => {
          loader.classList.remove("show-loader");
          btnText.classList.remove("hide-text");
          fullName.value = "";
          email.value = "";
          text.value = "";
          subject.value = ""
          msg.style.display = "none";
        }, 3000);

        btnText.classList.remove("progress")
        btnText.innerHTML = `<i class="fas fa-check"></i> Message Sent`

      })

      .catch((error) => {
        loader.classList.remove("show-loader");
        btnText.classList.remove("hide-text");
        submit.disabled = false;
        btnText.textContent = "Failed to send message. Retry";
        btnText.style.fontSize = "0.9rem";
        btnText.style.cursor = "pointer";
        console.error();
      });

  }
});
