// Initialize AOS (Animation on Scroll)
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
  });
}
const slider = document.getElementById("videoSlider");
        const slides = slider.querySelectorAll(".slide");
        let currentSlide = 0;
    
        function playVideoAndMove(index) {
            const current = slides[index];
            const video = current.querySelector("video");
    
            // Reset all videos
            slides.forEach(slide => {
                const vid = slide.querySelector("video");
                vid.pause();
                vid.currentTime = 0;
            });
    
            // Slide transition
            slider.style.transform = `translateX(-${index * 100}%)`;
    
            // Play current video
            video.play();
    
            // After video ends, go to next
            video.onended = () => {
                currentSlide = (index + 1) % slides.length;
                playVideoAndMove(currentSlide);
            };
        }
    
        // Start autoplay
        window.addEventListener("DOMContentLoaded", () => {
            playVideoAndMove(currentSlide);
        });


document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startTypewriter();
            observer.disconnect(); // only play once
          }
        });
      },
      { threshold: 0.5 }
    );
  
    const hero = document.getElementById("heroContent");
    if (hero) observer.observe(hero);
  });
  document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const hero = document.querySelector(".hero");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");
    const body = document.body;

    // Toggle menu with slide-down animation
    hamburger.addEventListener("click", () => {
        const isOpening = !mobileMenu.classList.contains("active");
        
        if (isOpening) {
            // Opening animation (slide down)
            mobileMenu.style.transform = "translateY(-100%)";
            mobileMenu.classList.add("active");
            body.style.overflow = "hidden";
            hamburger.textContent = "✕";
            
            // Trigger the slide down animation
            setTimeout(() => {
                mobileMenu.style.transform = "translateY(0)";
                mobileMenu.style.transition = "transform 0.4s ease-out";
            }, 10);
            
            // Adjust hero padding
            hero.style.paddingTop = "400px";
        } else {
            // Closing animation (slide up)
            mobileMenu.style.transform = "translateY(-100%)";
            mobileMenu.style.transition = "transform 0.4s ease-out";
            
            setTimeout(() => {
                mobileMenu.classList.remove("active");
                mobileMenu.style.transform = "";
                mobileMenu.style.transition = "";
                body.style.overflow = "";
                hamburger.textContent = "☰";
                hero.style.paddingTop = "0px";
            }, 400);
        }
    });

    // Close menu when clicking on links
    mobileLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            // Slide up animation when closing
            mobileMenu.style.transform = "translateY(-100%)";
            mobileMenu.style.transition = "transform 0.4s ease-out";
            
            setTimeout(() => {
                mobileMenu.classList.remove("active");
                mobileMenu.style.transform = "";
                mobileMenu.style.transition = "";
                body.style.overflow = "";
                hamburger.textContent = "☰";
                hero.style.paddingTop = "0px";
                
                // Handle navigation
                const target = link.getAttribute("href");
                if (target.startsWith("#")) {
                    e.preventDefault();
                    document.querySelector(target).scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }, 400);
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target) && mobileMenu.classList.contains("active")) {
            // Slide up animation when closing
            mobileMenu.style.transform = "translateY(-100%)";
            mobileMenu.style.transition = "transform 0.4s ease-out";
            
            setTimeout(() => {
                mobileMenu.classList.remove("active");
                mobileMenu.style.transform = "";
                mobileMenu.style.transition = "";
                body.style.overflow = "";
                hamburger.textContent = "☰";
                hero.style.paddingTop = "0px";
            }, 400);
        }
    });
});

  
  function startTypewriter() {
    const text = "Transform Your Brand with Digital Excellence";
    const element = document.getElementById("typewriter");
    let i = 0;
  
    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 45);
  }
  

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial-card");

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.remove("active");
  });
  testimonials[index].classList.add("active");
}

setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 3000);




// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Auth Form Handling (Login & Signup)
document.querySelectorAll(".auth-form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formId = form.id;

    if (formId === "loginForm") {
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;
      // Add real login logic here
      localStorage.setItem("isLoggedIn", "true");
      alert("Login successful! Redirecting...");
      window.location.href = "dashboard.html";
    }

    if (formId === "signupForm") {
      const name = document.getElementById("signupName").value;
      const email = document.getElementById("signupEmail").value;
      const password = document.getElementById("signupPassword").value;
      // Add real signup logic here
      alert("Account created successfully! Please login.");
      window.location.href = "login.html";
    }

    form.reset();
  });
});

// On Page Load Checks & Dashboard Features
document.addEventListener("DOMContentLoaded", function () {
  // Logout functionality
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      window.location.href = "index.html";
    });
  }

  // File Upload Logic
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("adCreative");

  if (uploadArea && fileInput) {
    uploadArea.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", function () {
      if (this.files.length) {
        const fileName = this.files[0].name;
        uploadArea.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>${fileName}</p>
            <small>Click to change</small>
          `;
        uploadArea.style.borderColor = "#10b981";
      }
    });
  }

  // Audience Tag Selection
  const tags = document.querySelectorAll(".tag");
  const audienceInput = document.getElementById("selectedAudience");

  if (tags.length && audienceInput) {
    tags.forEach((tag) => {
      tag.addEventListener("click", function () {
        this.classList.toggle("active");
        updateSelectedAudience();
      });
    });

    function updateSelectedAudience() {
      const selected = Array.from(document.querySelectorAll(".tag.active")).map(
        (tag) => tag.getAttribute("data-value")
      );
      audienceInput.value = selected.join(",");
    }
  }

  // Dashboard Activity Feed
  const activityList = document.querySelector(".activity-list");
  if (activityList) {
    const campaigns = JSON.parse(localStorage.getItem("campaigns")) || [];
    activityList.innerHTML = campaigns.length
      ? campaigns
          .slice()
          .reverse()
          .map(
            (campaign) => `
          <div class="activity-item" data-aos="fade-up">
            <h4>${campaign.campaignName} - ${campaign.adType}</h4>
            <p>Budget: $${campaign.budget} | Status: ${campaign.status}</p>
            <span>${new Date(campaign.createdAt).toLocaleString()}</span>
          </div>
        `
          )
          .join("")
      : "<p>No recent activities.</p>";
  }

  // Monitor Ads Page
  const campaignList = document.querySelector(".campaign-list");
  if (campaignList) {
    const campaigns = JSON.parse(localStorage.getItem("campaigns")) || [];
    campaignList.innerHTML = campaigns.length
      ? campaigns
          .map(
            (campaign) => `
          <div class="campaign-item" data-aos="fade-up">
            <div class="campaign-info">
              <h3>${campaign.campaignName}</h3>
              <p>${campaign.adType} • ${campaign.status} • $${campaign.budget} budget</p>
            </div>
            <div class="campaign-actions">
              <button class="action-btn view"><i class="fas fa-chart-bar"></i> View Stats</button>
              <button class="action-btn edit"><i class="fas fa-edit"></i> Edit</button>
              <button class="action-btn pause"><i class="fas fa-pause"></i> Pause</button>
            </div>
          </div>
        `
          )
          .join("")
      : "<p>No campaigns found.</p>";
  }
});

// Campaign Form Submission
const adForm = document.getElementById("adForm");
if (adForm) {
  adForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const campaignName = document.getElementById("campaignName").value;
    const adType = document.getElementById("adType").value;
    const budget = document.getElementById("budget").value;
    const audience =
      document.getElementById("selectedAudience").value || "Not Specified";

    const campaign = {
      campaignName,
      adType,
      budget,
      audience,
      status: "Active",
      createdAt: new Date().toISOString(),
    };

    let campaigns = JSON.parse(localStorage.getItem("campaigns")) || [];
    campaigns.push(campaign);
    localStorage.setItem("campaigns", JSON.stringify(campaigns));

    // In your create-ad form submission handler
    alert("Campaign created successfully!");
    window.location.href = `billing.html?budget=${encodeURIComponent(budget)}`; // Add URL encoding
  });
}

// Mock payment handler
// In your mock payment handler
setTimeout(() => {
  window.location.href = `payment-success.html?amount=${encodeURIComponent(
    amount
  )}`;
}, 2000);
function handlePayment(e) {
  e.preventDefault();

  // Get amount from URL
  const urlParams = new URLSearchParams(window.location.search);
  const amount = urlParams.get("budget") || "50.00";

    document.querySelector(".payment-card").classList.add("payment-success");

    // Redirect after delay
    setTimeout(() => {
      window.location.href = "payment-success.html?amount=" + amount;
    }, 2000);
  }


// Load billing amount from URL
function loadBillingAmount() {
  const urlParams = new URLSearchParams(window.location.search);
  const amount = urlParams.get("budget") || "50.00";
  document.getElementById("amountDue").textContent = amount;
}

// Initialize billing page
if (window.location.pathname.endsWith("billing.html")) {
  loadBillingAmount();

  // Add input formatting
  document.querySelectorAll('input[type="text"]').forEach((input) => {
    input.addEventListener("input", function (e) {
      if (this.placeholder.includes("4242")) {
        this.value = this.value
          .replace(/\W/gi, "")
          .replace(/(.{4})/g, "$1 ")
          .trim();
      }
    });
  });
}
