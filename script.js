// Initialize AOS (Animation on Scroll)
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
  });
}

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




// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });
}

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

  // Show confirmation
  if (confirm(`Confirm payment of $${amount}?`)) {
    // Show success animation
    document.querySelector(".payment-card").classList.add("payment-success");

    // Redirect after delay
    setTimeout(() => {
      window.location.href = "payment-success.html?amount=" + amount;
    }, 2000);
  }
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
