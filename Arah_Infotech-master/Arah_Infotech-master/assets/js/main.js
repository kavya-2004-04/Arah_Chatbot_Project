/**
* Template Name: Company
* Template URL: https://bootstrapmade.com/company-free-html-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

// import { db } from "./firebase-config.js";
// import { collection, getDocs } from "...";


(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  function toggleDescription(btn) {
      const jobListing = btn.closest('.job-listing');
      const desc = jobListing.querySelector('.job-desc');
      desc.style.display = desc.style.display === 'block' ? 'none' : 'block';
    }

    function showApplyForm(btn) {
      const jobListing = btn.closest('.job-listing');
      const form = jobListing.querySelector('.apply-form');
      form.style.display = form.style.display === 'block' ? 'none' : 'block';
    }

    function submitApplication(button) {
      const notification = button.nextElementSibling;
      notification.style.display = 'block';
      setTimeout(() => {
        notification.style.display = 'none';
        const form = button.closest('.apply-form');
        form.style.display = 'none';
        form.querySelectorAll('input').forEach(input => input.value = '');
      }, 2500);
    }

    function deleteJob(button) {
      const job = button.closest('.job-listing');
      job.remove();
    }

    function filterJobs() {
      const filter = document.getElementById('filterInput').value.toLowerCase();
      const jobListings = document.querySelectorAll('.job-listing');
      jobListings.forEach(job => {
        const title = job.querySelector('.job-title').textContent.toLowerCase();
        job.style.display = title.includes(filter) ? '' : 'none';
      });
    }

  /**Career Page */
 document.addEventListener("DOMContentLoaded", () => {
  let currentFormContainer = null;

  window.toggleForm = function(button, jobTitle) {
    const form = document.getElementById("applyForm");
    const jobCard = button.parentElement;

    if (currentFormContainer === jobCard && !form.classList.contains('hidden')) {
      form.classList.add('hidden');
      currentFormContainer = null;
      return;
    }

    jobCard.insertAdjacentElement("beforeend", form);
    form.classList.remove("hidden");
    document.getElementById("jobTitleField").value = jobTitle;
    currentFormContainer = jobCard;
  };

  window.filterJobs = function() {
    const input = document.getElementById("jobSearch").value.toLowerCase();
    const jobs = document.querySelectorAll(".job-card");

    jobs.forEach(job => {
      const title = job.getAttribute("data-title").toLowerCase();
      job.style.display = title.includes(input) ? "block" : "none";
    });
  };
});

// Form Apply

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('jobForm');
  
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const fileInput = document.getElementById('resume');
      const file = fileInput?.files?.[0];
      
      if (!file) {
        alert("Please select a file before submitting.");
        return;
      }

      const reader = new FileReader();

      reader.onload = async function () {
        const base64 = reader.result.split(',')[1]; // Remove data prefix

        const formData = new URLSearchParams();
        formData.append("fullName", form.querySelector('input[name="fullName"]').value);
        formData.append("contact", form.querySelector('input[name="contact"]').value);
        formData.append("email", form.querySelector('input[name="email"]').value);
        formData.append("jobTitle", form.querySelector('input[name="jobTitle"]').value);
        formData.append("currentCTC", form.querySelector('input[name="currentCTC"]').value);
        formData.append("expectedCTC", form.querySelector('input[name="expectedCTC"]').value);
        formData.append("experience", form.querySelector('input[name="experience"]').value);
        formData.append("notice", form.querySelector('input[name="notice"]').value);
        formData.append("resumeFile", base64);
        formData.append("mimeType", file.type);
        formData.append("fileName", file.name);

        try {
          const submitBtn = document.getElementById("submitBtn");
          const submittingMsg = document.getElementById("submittingMessage");

  // ✅ Show "Submitting..." message and disable button
          submitBtn.disabled = true;
          submittingMsg.classList.remove("hidden");

          const response = await fetch("https://script.google.com/macros/s/AKfycbyEeZKn2r9zmNqTIg3g8VAg5QmaOH80q7jC5EcxIKmiD1xeUpXZ5GM15GZt17_3sfkvmA/exec", {
            method: "POST",
            body: formData,
          });

          const result = await response.text();
          // alert(result);
          // form.reset();
          document.getElementById("successMessage").classList.remove("hidden");
          form.reset();

          setTimeout(() => {
            document.getElementById("successMessage").classList.add("hidden");
          }, 10000);

        } catch (err) {
          console.error("Submission failed", err);
          alert("Submission failed. Please try again.");
        } finally {
          const submitBtn = document.getElementById("submitBtn");
          const submittingMsg = document.getElementById("submittingMessage");

  // ✅ Always re-enable button and hide "Submitting..."
          submitBtn.disabled = false;
          submittingMsg.classList.add("hidden");
        }
      };

      reader.readAsDataURL(file);
    });
  } else {
    console.warn('jobForm not found in DOM');
  }
});



/* Slider Js*/

document.addEventListener('DOMContentLoaded', function () {
    let items = document.querySelectorAll('.slider .list .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    let thumbnails = document.querySelectorAll('.thumbnail .item');

    let countItem = items.length;
    let itemActive = 0;

    if (next && prev) { // safe guard to prevent null access
        next.onclick = function () {
            itemActive = itemActive + 1;
            if (itemActive >= countItem) {
                itemActive = 0;
            }
            showSlider();
        }

        prev.onclick = function () {
            itemActive = itemActive - 1;
            if (itemActive < 0) {
                itemActive = countItem - 1;
            }
            showSlider();
        }
    }

    function showSlider() {
        items.forEach((item, index) => {
            item.classList.remove('active');
            if (index === itemActive) {
                item.classList.add('active');
            }
        });

        thumbnails.forEach((thumb, index) => {
            thumb.classList.remove('active');
            if (index === itemActive) {
                thumb.classList.add('active');
            }
        });
    }
});

// auto run slider
const next = document.querySelector('#next');
if (next) {
  let refreshInterval = setInterval(() => {
    next.click();
  }, 5000);
} else {
  console.warn('Next button not found!');
}
function showSlider(){
    // remove item active old
    let itemActiveOld = document.querySelector('.slider .list .item.active');
    let thumbnailActiveOld = document.querySelector('.thumbnail .item.active');
    itemActiveOld.classList.remove('active');
    thumbnailActiveOld.classList.remove('active');

    // active new item
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000)
}
function setPositionThumbnail () {
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    let rect = thumbnailActive.getBoundingClientRect();
    if (rect.left < 0 || rect.right > window.innerWidth) {
        thumbnailActive.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
    }
}



  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

})();

// Newsletter 
document.getElementById("emailForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    await fetch("https://script.google.com/macros/s/AKfycbydE5sbfroBIE8QO2r5zCCksRQlWAqrL4xOZitlqemzoZbLy3WtZagOepZm79_UVuMpIg/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "email=" + encodeURIComponent(email),
    });

    alert("Your email has been subscribed successfully");
    e.target.reset();
  });


//Carrer Job List
  function openForm(jobTitle) {
      document.getElementById("applyForm").style.display = "block";
      document.getElementById("jobTitleField").value = jobTitle;
    }
    function closeForm() {
      document.getElementById("applyForm").style.display = "none";
    }

    //Contact Form
    document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent normal form submission

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert("Thank you! Your message has been sent.");
        form.reset(); // Optional: reset form after success
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error submitting the form. Check your internet connection.");
    }
  });

