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
      entries.forEach((entry) => {
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
  mobileLinks.forEach((link) => {
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
            behavior: "smooth",
          });
        }
      }, 400);
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !hamburger.contains(e.target) &&
      !mobileMenu.contains(e.target) &&
      mobileMenu.classList.contains("active")
    ) {
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


                   
const pricing = {
  banner: {
      sizes: {
          small: { price: 50, desc: "300x250" },
          medium: { price: 80, desc: "728x90" },
          large: { price: 120, desc: "970x250" }
      },
      localities: {
          standard: { price: 1, desc: "Regular locations" },
          premium: { price: 1.5, desc: "High traffic areas" },
          elite: { price: 2, desc: "Prime city centers" }
      },
      duration: {
          week: { price: 1, desc: "7 days" },
          fortnight: { price: 1.8, desc: "14 days" },
          month: { price: 3, desc: "30 days" }
      }
  },
  video: {
      lengths: {
          short: { price: 100, desc: "15 seconds" },
          medium: { price: 180, desc: "30 seconds" },
          long: { price: 250, desc: "60 seconds" }
      },
      platforms: {
          youtube: { price: 1, desc: "YouTube" },
          ott: { price: 1.5, desc: "OTT Platforms" },
          both: { price: 2, desc: "YouTube + OTT" }
      },
      impressions: {
          low: { price: 1000, desc: "10,000 views" },
          medium: { price: 2500, desc: "50,000 views" },
          high: { price: 4500, desc: "100,000 views" }
      }
  },
  social: {
      platforms: {
          facebook: { price: 0.05, desc: "Facebook" },
          instagram: { price: 0.08, desc: "Instagram" },
          both: { price: 0.1, desc: "Both platforms" }
      },
      reach: {
          small: { price: 1000, desc: "10,000 people" },
          medium: { price: 2500, desc: "50,000 people" },
          large: { price: 5000, desc: "100,000 people" }
      },
      duration: {
          week: { price: 1, desc: "7 days" },
          fortnight: { price: 1.5, desc: "14 days" },
          month: { price: 2.5, desc: "30 days" }
      }
  },
  native: {
      placements: {
          article: { price: 70, desc: "Article content" },
          feed: { price: 60, desc: "News feed" },
          recommendation: { price: 80, desc: "Recommended section" }
      },
      ctr: {
          low: { price: 1, desc: "Standard CTR" },
          medium: { price: 1.3, desc: "Guaranteed 1.5% CTR" },
          high: { price: 1.7, desc: "Guaranteed 3% CTR" }
      },
      duration: {
          week: { price: 1, desc: "7 days" },
          fortnight: { price: 1.8, desc: "14 days" },
          month: { price: 3, desc: "30 days" }
      }
  }
};

function updateAdOptions() {
  const adType = document.getElementById('adType').value;
  const container = document.getElementById('adOptionsContainer');
  const budgetResult = document.getElementById('budgetResult');
  
  // Hide containers if no ad type selected
  if (!adType) {
      container.style.display = 'none';
      budgetResult.style.display = 'none';
      return;
  }
  
  // Generate HTML based on ad type
  let html = '';
  
  switch(adType) {
      case 'banner':
          html = `
              <div class="form-group">
                  <label>Banner Size</label>
                  <select id="bannerSize" onchange="calculateBudget()">
                      ${generateOptions(pricing.banner.sizes)}
                  </select>
              </div>
              <div class="form-group">
                  <label>Locality Type</label>
                  <select id="locality" onchange="calculateBudget()">
                      ${generateOptions(pricing.banner.localities)}
                  </select>
              </div>
              <div class="form-group">
                  <label>Duration</label>
                  <select id="duration" onchange="calculateBudget()">
                      ${generateOptions(pricing.banner.duration)}
                  </select>
              </div>
          `;
          break;
          
      case 'video':
          html = `
              <div class="form-group">
                  <label>Video Length</label>
                  <select id="videoLength" onchange="calculateBudget()">
                      ${generateOptions(pricing.video.lengths)}
                  </select>
              </div>
              <div class="form-group">
                  <label>Platform</label>
                  <select id="platform" onchange="calculateBudget()">
                      ${generateOptions(pricing.video.platforms)}
                  </select>
              </div>
              <div class="form-group">
                  <label>Impressions</label>
                  <select id="impressions" onchange="calculateBudget()">
                      ${generateOptions(pricing.video.impressions)}
                  </select>
              </div>
          `;
          break;
          
      case 'social':
          html = `
              <div class="form-group">
                  <label>Platform</label>
                  <select id="socialPlatform" onchange="calculateBudget()">
                      ${generateOptions(pricing.social.platforms)}
                  </select>
              </div>
              <div class="form-group">
                  <label>Target Reach</label>
                  <select id="reach" onchange="calculateBudget()">
                      ${generateOptions(pricing.social.reach)}
                  </select>
              </div>
              <div class="form-group">
                  <label>Campaign Duration</label>
                  <select id="socialDuration" onchange="calculateBudget()">
                      ${generateOptions(pricing.social.duration)}
                  </select>
              </div>
          `;
          break;
          
      case 'native':
          html = `
              <div class="form-group">
                  <label>Ad Placement</label>
                  <select id="placement" onchange="calculateBudget()">
                      ${generateOptions(pricing.native.placements)}
                  </select>
              </div>
              <div class="form-group">
                  <label>CTR Guarantee</label>
                  <select id="ctr" onchange="calculateBudget()">
                      ${generateOptions(pricing.native.ctr)}
                  </select>
              </div>
              <div class="form-group">
                  <label>Duration</label>
                  <select id="nativeDuration" onchange="calculateBudget()">
                      ${generateOptions(pricing.native.duration)}
                  </select>
              </div>
          `;
          break;
  }
  
  container.innerHTML = html;
  container.style.display = 'block';
  budgetResult.style.display = 'none';
}

function generateOptions(options) {
  let html = '';
  for (const [key, value] of Object.entries(options)) {
      html += `<option value="${key}">${value.desc} ($${value.price}${key === 'small' || key === 'medium' || key === 'large' ? '' : key === 'low' || key === 'medium' || key === 'high' ? '' : '/day'})</option>`;
  }
  return html;
}

function calculateBudget() {
  const adType = document.getElementById('adType').value;
  const budgetResult = document.getElementById('budgetResult');
  const budgetInput = document.getElementById('budget');
  const breakdown = document.getElementById('budgetBreakdown');
  
  if (!adType) return;
  
  let budget = 0;
  let breakdownText = '';
  
  switch(adType) {
      case 'banner':
          const size = pricing.banner.sizes[document.getElementById('bannerSize').value].price;
          const locality = pricing.banner.localities[document.getElementById('locality').value].price;
          const duration = pricing.banner.duration[document.getElementById('duration').value].price;
          budget = size * locality * duration;
          
          breakdownText = `Calculation: $${size} (size) × ${locality}× (locality multiplier) × ${duration} (${document.getElementById('duration').value} duration)`;
          break;
          
      case 'video':
          const length = pricing.video.lengths[document.getElementById('videoLength').value].price;
          const platform = pricing.video.platforms[document.getElementById('platform').value].price;
          const impressions = pricing.video.impressions[document.getElementById('impressions').value].price;
          budget = length * platform + impressions;
          
          breakdownText = `Calculation: $${length} (production) × ${platform}× (platform multiplier) + $${impressions} (impressions)`;
          break;
          
      case 'social':
          const socialPlatform = pricing.social.platforms[document.getElementById('socialPlatform').value].price;
          const reach = pricing.social.reach[document.getElementById('reach').value].price;
          const socialDuration = pricing.social.duration[document.getElementById('socialDuration').value].price;
          budget = reach * socialPlatform * socialDuration;
          
          breakdownText = `Calculation: ${reach} people × $${socialPlatform}/person × ${socialDuration} (duration multiplier)`;
          break;
          
      case 'native':
          const placement = pricing.native.placements[document.getElementById('placement').value].price;
          const ctr = pricing.native.ctr[document.getElementById('ctr').value].price;
          const nativeDuration = pricing.native.duration[document.getElementById('nativeDuration').value].price;
          budget = placement * ctr * nativeDuration;
          
          breakdownText = `Calculation: $${placement} (placement) × ${ctr}× (CTR multiplier) × ${nativeDuration} (duration multiplier)`;
          break;
  }
  
  // Round to 2 decimal places
  budget = Math.round(budget * 100) / 100;
  
  // Update UI
  budgetInput.value = budget;
  breakdown.innerHTML = breakdownText;
  budgetResult.style.display = 'block';
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

const slider = document.getElementById("videoSlider");
const slides = slider.querySelectorAll(".slide");
let currentSlide = 0;

function playVideoAndMove(index) {
  const current = slides[index];
  const video = current.querySelector("video");

  // Reset all videos
  slides.forEach((slide) => {
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

// Price configurations
console.log("entered  fbfbb");
 