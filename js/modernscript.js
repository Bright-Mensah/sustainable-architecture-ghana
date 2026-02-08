// Page-specific JavaScript for modern.html
document.addEventListener("DOMContentLoaded", function () {
  // Set current year
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Animate statistics
  animateStatistics();

  // Image Slider
  const slidesContainer = document.getElementById("slidesContainer");
  const slides = document.querySelectorAll(".slide");
  const indicatorsContainer = document.getElementById("slideIndicators");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentSlide = 0;

  // Create indicators
  slides.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    if (index === 0) indicator.classList.add("active");
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  function goToSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update indicators
    document.querySelectorAll(".indicator").forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);
    });
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Auto-slide every 5 seconds
  setInterval(nextSlide, 5000);

  // Energy Calculator
  const calculateBtn = document.getElementById("calculateBtn");
  const resultsPanel = document.getElementById("resultsPanel");

  calculateBtn.addEventListener("click", calculateSavings);

  function calculateSavings() {
    const buildingType = document.getElementById("buildingType").value;
    const buildingSize = parseFloat(
      document.getElementById("buildingSize").value,
    );
    const currentEnergy = parseFloat(
      document.getElementById("currentEnergy").value,
    );
    const measures = Array.from(
      document.getElementById("measures").selectedOptions,
    ).map((opt) => opt.value);

    // Base calculations
    let energyReduction = 0;
    let costSavings = 0;

    // Apply reductions based on measures
    measures.forEach((measure) => {
      switch (measure) {
        case "solar":
          energyReduction += 0.35;
          break;
        case "insulation":
          energyReduction += 0.2;
          break;
        case "ventilation":
          energyReduction += 0.15;
          break;
        case "water":
          // Water doesn't affect energy directly
          break;
      }
    });

    // Cap at 70%
    energyReduction = Math.min(energyReduction, 0.7);

    // Calculate monthly savings (assume ₵0.80 per kWh)
    const monthlySavings = currentEnergy * energyReduction * 0.8;
    const annualEnergySavings = currentEnergy * energyReduction * 12;
    const carbonReduction = annualEnergySavings * 0.85; // kg CO₂ per kWh

    // ROI calculation
    const investmentCost = buildingSize * 200; // Rough estimate
    const annualSavings = monthlySavings * 12;
    const roiYears = investmentCost / annualSavings;

    // Update UI
    document.getElementById("energyPercent").textContent =
      `${Math.round(energyReduction * 100)}%`;
    document.getElementById("costAmount").textContent =
      monthlySavings.toFixed(0);
    document.getElementById("annualEnergy").textContent =
      Math.round(annualEnergySavings);
    document.getElementById("carbonSaved").textContent =
      Math.round(carbonReduction);
    document.getElementById("roiYears").textContent = roiYears.toFixed(1);

    // Animate bars
    setTimeout(() => {
      document.getElementById("energyBar").style.width =
        `${energyReduction * 100}%`;
      document.getElementById("costBar").style.width =
        `${Math.min(energyReduction * 100, 100)}%`;
    }, 100);

    // Show results
    resultsPanel.classList.add("show");
  }

  // Video Modal
  const videoItems = document.querySelectorAll(".video-item");
  const videoModal = document.getElementById("videoModal");
  const closeModal = document.getElementById("closeModal");
  const modalVideoContainer = document.getElementById("modalVideoContainer");

  videoItems.forEach((item) => {
    item.addEventListener("click", () => {
      const videoId = item.getAttribute("data-video-id");
      // In a real implementation, you would load actual YouTube or Vimeo embed
      modalVideoContainer.innerHTML = `
                        <div class="video-wrapper">
                            <iframe src="https://www.youtube.com/embed/${videoId}" 
                                    title="Sustainable Technology Video" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen>
                            </iframe>
                        </div>
                    `;
      videoModal.classList.add("show");
    });
  });

  closeModal.addEventListener("click", () => {
    videoModal.classList.remove("show");
    modalVideoContainer.innerHTML = "";
  });

  // Close modal when clicking outside
  videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      videoModal.classList.remove("show");
      modalVideoContainer.innerHTML = "";
    }
  });

  // Back to Top button
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Animate statistics on scroll
  function animateStatistics() {
    const stats = [
      { id: "energySavings", target: 40 },
      { id: "waterReduction", target: 50 },
      { id: "carbonReduction", target: 60 },
    ];

    stats.forEach((stat) => {
      const element = document.getElementById(stat.id);
      let current = 0;
      const increment = stat.target / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.target) {
          current = stat.target;
          clearInterval(timer);
        }
        element.textContent = Math.round(current) + "%";
      }, 20);
    });
  }

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  }, observerOptions);

  // Observe sections for animation
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
});
