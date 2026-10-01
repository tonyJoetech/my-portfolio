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


// mode toggle

const darkmode = document.querySelector(".dark-mode");
const lightmode = document.querySelector(".light-mode");
const modechanger = document.querySelector(".mode-wrapper");

modechanger.addEventListener("click", (mode) => {

  document.body.classList.toggle("change-background");

  const isDark = document.body.classList.contains("change-background");

  if (isDark) {
    darkmode.style.display = "none";
    lightmode.style.display = "block";
  } else {
    darkmode.style.display = "block";
    lightmode.style.display = "none";
  }

});



function handleContactBtn() {
  const resContact = document.getElementById("contact-btn");
  if (!resContact) return;

  if (window.innerWidth < 900) {
    resContact.innerHTML = '<i class="bi bi-telephone"></i>';
    resContact.classList.add("respnsive-btn");
  } else {
    resContact.textContent = "Hire Me";
    resContact.classList.remove("respnsive-btn");
  }
};
window.addEventListener('load', handleContactBtn);
window.addEventListener('resize', handleContactBtn);



const hamburger = document.querySelector('.menu');
const navLinks = document.querySelector('.nav');
const scrollLinks = document.querySelectorAll('.scroll-link');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show-nav');
});

scrollLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const id1 = e.currentTarget.getAttribute('href');
    const target = document.querySelector(id1);
    document.body.style.overflow = "visible";
    const section = document.querySelector(id1);

    scrollLinks.forEach(item => item.classList.remove("active"));

    link.classList.add("active")
    
     section.scrollIntoView({
      behavior: "smooth"
    });

    navLinks.classList.remove('show-nav');
    contactSection.classList.remove("drop-contact");
    if (target) {
      target.classList.add("active")
      document.body.classList.add("contact-open")
      setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  });
}); 

const allsections = document.querySelectorAll("section");

const newobserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      const currentId = entry.target.getAttribute("id");

      scrollLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });

    }

  });

}, {
  threshold: 0.5
});

allsections.forEach(section => {
  newobserver.observe(section);
});


const sections = document.querySelectorAll(".section");

const firstobserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-section");
      }
      else {
        entry.target.classList.remove("show-section")
      }
    });
  },
  {
    threshold: 0.2,
  }
);

sections.forEach((section) => {
  firstobserver.observe(section);
});

// bottom right arrow

const header = document.querySelector("header")
const topLink = document.querySelector(".top-link");
window.addEventListener("scroll", function () {

  const navHeight = header.getBoundingClientRect().height;
  const scrollHeight = window.pageYOffset;


  if (scrollHeight > 500) {
    topLink.style.display = "block"
  }

  else {
    topLink.style.display = "none"
  }
});







// Hero Section

// Writing text

const words = [" Creative", " Skilled", " Smart"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing-text');

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

// About Section


// About Experince Nav

const about = document.querySelector(".about-section");
const btns = document.querySelectorAll(".about-btn");
const articles = document.querySelectorAll(".content");

about.addEventListener("click", (e) => {
  const id = e.target.dataset.id;

  if (id) {
    btns.forEach(function (btn) {
      btn.classList.remove("active");
      e.target.classList.add("active")

    });
    articles.forEach((article) => {
      article.classList.remove("active");

    });
    const element = document.getElementById(id);
    element.classList.add("active")

  };

});


// Number Counter



const counters = document.querySelectorAll('.number');

function animateCount(el) {

  const target = parseInt(el.getAttribute('data-target'));

  const duration = 800;
  const stepTime = 20;
  const totalSteps = duration / stepTime;
  const increment = target / totalSteps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + "+";
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + "+";
    }
  }, stepTime);
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
    } else {
      entry.target.textContent = "0+";
      entry.target.dataset.animating = "false";
    }
  });
}, {
  threshold: 0.3
});

counters.forEach(counter => {
  observer.observe(counter);
});



// Skill Section

// Skill Loading Animation

document.addEventListener('DOMContentLoaded', () => {

  const skillSection = document.getElementById('skill');
  const progressBars = document.querySelectorAll('.progress-bar-wrapper > div');
  const percentages = document.querySelectorAll('.percentage');

  const animateBars = () => {
    progressBars.forEach((bar, i) => {
    const targetNum = parseInt(percentages[i].dataset.target);

      bar.style.width = targetNum + "%";

      let count = 0;
      const speed = 1500 / targetNum;
      const counter = setInterval(() => {
        count++;
        percentages[i].textContent = count + '%';
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

        progressBars.forEach((bar) => {
          bar.style.width = "0%";
        });
        percentages.forEach((percent) => {
          percent.textContent = "0%";
        });
      }
    });
  }, { threshold: 0.4 });

  observer.observe(skillSection);

});



// Contant Section

const submit = document.querySelector(".send-msg-btn");
const arrow = document.querySelector(".arrow");

submit.addEventListener("mouseover", () => {

  if (!arrow.classList.contains("show-arrow")) {
    arrow.classList.add("show-arrow")
    submit.classList.add("send-msg-btn-hover");
  };
});

submit.addEventListener("mouseout", () => {
  if (arrow.classList.contains("show-arrow")) {
    arrow.classList.remove("show-arrow");
    submit.classList.remove("send-msg-btn-hover");
  };
});


const contactSection = document.querySelector(".contact-section");

const contactBtn = document.querySelectorAll(".show-contact");


document.querySelector(".remove-contact").addEventListener("click", () => {
  contactSection.classList.remove("drop-contact");
  document.body.style.overflow = "visible";
     
});

contactBtn.forEach(function (allbtn) {
  allbtn.addEventListener("click", () => {


    if (!contactSection.classList.contains("drop-contact")) {
      contactSection.classList.add("drop-contact");
       document.body.classList.add("contact-open");
       document.body.style.overflow = "hidden";
     
    } else {
      contactSection.classList.add("drop-contact");
       document.body.classList.add("contact-open");
       document.body.style.overflow = "visible";
    };
  });


});

// contact form validation


emailjs.init({
  publicKey: "kY7Zl4PuXDWT0CKqm",
});

submit.addEventListener("click", (e) => {
  e.preventDefault();

  const fullName = document.getElementById("FullName");
  const email = document.getElementById("email");
  const valemail = email.value;
  const text = document.getElementById("text");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (fullName.value.trim() === "") {
    fullName.classList.add("error")
    setTimeout(function () {
      fullName.classList.remove("error")
    }, 4000)

  }

  else if (!emailRegex.test(valemail)) {
    email.classList.add("error")
    setTimeout(function () {
      email.classList.remove("error")
    }, 4000)
  }


  else if (text.value.trim() === "") {
    text.classList.add("error")
    setTimeout(function () {
      text.classList.remove("error")
    }, 4000)
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
        submit.disabled = false;
        btnText.classList.add("progress")

        setTimeout(() => {
          loader.classList.remove("show-loader");
          btnText.classList.remove("hide-text");
          fullName.value = "";
          email.value = "";
          text.value = "";
          msg.style.display = "none";
          btnText.classList.remove("progress")
        }, 3000);

        btnText.innerHTML = `<i class="fas fa-check"></i> Message Sent`

      })

      .catch((error) => {
        loader.classList.remove("show-loader");
        btnText.classList.remove("hide-text");
        submit.disabled = false;
        btnText.textContent = "Failed to send message. Retry";
        btnText.style.fontSize="0.9rem";
        btnText.style.cursor ="pointer";
        console.error();
      });

  }
});

