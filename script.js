/**
 * Sorridents Aparecida de Goiânia | Interactive Vanilla Script
 */

// Global Clinic Constants
const CLINIC_INFO = {
  telephone: "+55 62 8279-0106",
  telephoneRaw: "556282790106",
  address: "QD 114, LT 20A, Avenida da Igualdade, Aparecida de Goiânia GO, 74930-530, Brasil"
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Interactive Global Sticky Header on Scroll
  const mainHeader = document.getElementById("main-header");
  if (mainHeader) {
    const handleHeaderScroll = () => {
      if (window.scrollY > 20) {
        mainHeader.classList.add("bg-white/95", "backdrop-blur-md", "shadow-md", "py-2.5");
        mainHeader.classList.remove("bg-transparent", "py-4", "sm:py-5");
      } else {
        mainHeader.classList.remove("bg-white/95", "backdrop-blur-md", "shadow-md", "py-2.5");
        mainHeader.classList.add("bg-transparent", "py-4", "sm:py-5");
      }
    };
    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll(); // Trigger initial check
  }

  // 3. Mobile Navigation Hamburger Menu Toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenuContainer = document.getElementById("mobile-menu-container");
  
  if (mobileMenuToggle && mobileMenuContainer) {
    mobileMenuToggle.addEventListener("click", () => {
      const isOpen = !mobileMenuContainer.classList.contains("hidden");
      if (isOpen) {
        mobileMenuContainer.classList.add("hidden");
        // Revert icon to Menu
        mobileMenuToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
      } else {
        mobileMenuContainer.classList.remove("hidden");
        // Change icon to X
        mobileMenuToggle.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
      }
      lucide.createIcons({ attrs: { class: "w-6 h-6" } });
    });
  }

  // Close mobile menu on item clicks
  const mobileLinks = document.querySelectorAll("#mobile-menu-container a");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (mobileMenuContainer) {
        mobileMenuContainer.classList.add("hidden");
      }
      if (mobileMenuToggle) {
        mobileMenuToggle.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
        lucide.createIcons({ attrs: { class: "w-6 h-6" } });
      }
    });
  });

  // 4. Interactive Simulation Slider (Hero Section)
  const sliderInput = document.getElementById("hero-slider-input");
  const sliderAfterLayer = document.getElementById("hero-slider-after-layer");
  const sliderHandle = document.getElementById("hero-slider-handle");
  const beforeImage = document.getElementById("hero-slider-before-image");

  if (sliderInput && sliderAfterLayer && sliderHandle) {
    const updateSliderPosition = (percentage) => {
      sliderAfterLayer.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;
      sliderHandle.style.left = `${percentage}%`;
    };

    sliderInput.addEventListener("input", (e) => {
      updateSliderPosition(e.target.value);
    });

    // Handle Active Tabs for Treatment Simulators
    const heroTabButtons = document.querySelectorAll("[data-hero-tab]");
    heroTabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        // Toggle selected styling
        heroTabButtons.forEach(b => {
          b.classList.remove("bg-[#1b2074]", "text-white", "shadow");
          b.classList.add("text-slate-500", "hover:text-slate-800", "hover:bg-slate-50");
        });
        btn.classList.add("bg-[#1b2074]", "text-white", "shadow");
        btn.classList.remove("text-slate-500", "hover:text-slate-800", "hover:bg-slate-50");

        const tabType = btn.getAttribute("data-hero-tab");
        if (beforeImage) {
          // Adjust image adjustment values for different simulations
          beforeImage.style.filter = "none";
          if (tabType === "clareamento") {
            beforeImage.style.filter = "sepia(0.35) brightness(0.88) saturate(0.85)";
          } else if (tabType === "lentes") {
            beforeImage.style.filter = "contrast(0.9) saturate(0.8) brightness(0.9)";
          } else if (tabType === "invisible") {
            beforeImage.style.filter = "brightness(0.92) contrast(0.95)";
          }
        }
      });
    });
  }

  // 5. Structure Portfolio Grid Filter (Gallery Section)
  const filterButtons = document.querySelectorAll("[data-gallery-filter]");
  const galleryItems = document.querySelectorAll("[data-gallery-item-cat]");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active filter button views
      filterButtons.forEach(b => {
        b.classList.remove("bg-[#1b2074]", "text-white", "shadow-md", "shadow-[#1b2074]/10");
        b.classList.add("bg-slate-50", "text-gray-500", "hover:bg-gray-100", "hover:text-gray-850");
      });
      btn.classList.add("bg-[#1b2074]", "text-white", "shadow-md", "shadow-[#1b2074]/10");
      btn.classList.remove("bg-slate-50", "text-gray-500", "hover:bg-gray-100", "hover:text-gray-850");

      const filterVal = btn.getAttribute("data-gallery-filter");
      
      galleryItems.forEach(item => {
        const itemCat = item.getAttribute("data-gallery-item-cat");
        if (filterVal === "todos" || itemCat === filterVal) {
          item.classList.remove("hidden");
          // Re-trigger scale entry animation
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
            item.style.transition = "all 0.4s ease-out";
          }, 50);
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  // 6. Address Clipboard Copier Functionality (ContactCTA Section)
  const copyAddressBtn = document.getElementById("copy-address-btn");
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(CLINIC_INFO.address).then(() => {
        // Toggle copy state labels
        copyAddressBtn.innerHTML = `
          <i data-lucide="check" class="w-4 h-4 mr-1 text-emerald-500"></i>
          <span>Copiado!</span>
        `;
        lucide.createIcons();
        
        setTimeout(() => {
          copyAddressBtn.innerHTML = `
            <i data-lucide="copy" class="w-4 h-4 mr-1"></i>
            <span>Copiar Endereço</span>
          `;
          lucide.createIcons();
        }, 3000);
      }).catch(err => {
        console.error("Failed copy address:", err);
      });
    });
  }

  // 7. Embed map toggling & Interactive 360 view frame loading (Street View removed, only map is kept)
  const triggerVirtualTourBtn = document.getElementById("trigger-virtual-tour-btn");
  if (triggerVirtualTourBtn) {
    triggerVirtualTourBtn.addEventListener("click", () => {
      const element = document.getElementById("contato");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // 8. FAQ Accordion Collapsible Toggles
  const faqAccordionItems = document.querySelectorAll("[data-faq-item-idx]");
  faqAccordionItems.forEach(item => {
    const btn = item.querySelector("button");
    const container = item.querySelector(".faq-ans-container");
    const plusMinusIcon = item.querySelector(".faq-icon");

    if (btn && container && plusMinusIcon) {
      btn.addEventListener("click", () => {
        const isOpen = !container.classList.contains("hidden");
        
        // Close all other elements first
        faqAccordionItems.forEach(otherItem => {
          const otherContainer = otherItem.querySelector(".faq-ans-container");
          const otherIcon = otherItem.querySelector(".faq-icon");
          const otherBtn = otherItem.querySelector("button");
          
          if (otherContainer && otherItem !== item) {
            otherContainer.classList.add("hidden");
            otherItem.classList.remove("border-slate-300/80", "bg-white", "shadow-lg", "shadow-slate-100");
            otherItem.classList.add("border-slate-150");
            if (otherIcon) {
               otherIcon.innerHTML = `<i data-lucide="plus" class="w-4 h-4"></i>`;
               otherIcon.className = "faq-icon p-1.5 rounded-lg bg-slate-100 text-slate-500 transition-all";
            }
          }
        });

        // Toggle the current element
        if (isOpen) {
          container.classList.add("hidden");
          item.classList.remove("border-slate-300/80", "bg-white", "shadow-lg", "shadow-slate-100");
          item.classList.add("border-slate-150");
          plusMinusIcon.innerHTML = `<i data-lucide="plus" class="w-4 h-4"></i>`;
          plusMinusIcon.className = "faq-icon p-1.5 rounded-lg bg-slate-100 text-slate-500 transition-all";
        } else {
          container.classList.remove("hidden");
          item.classList.add("border-slate-300/80", "bg-white", "shadow-lg", "shadow-slate-100");
          item.classList.remove("border-slate-150");
          plusMinusIcon.innerHTML = `<i data-lucide="minus" class="w-4 h-4"></i>`;
          plusMinusIcon.className = "faq-icon p-1.5 rounded-lg bg-[#1b2074] text-white transition-all";
        }
        lucide.createIcons();
      });
    }
  });

  // 9. Floating Responsive WhatsApp Widget & Bouncing Tooltips
  const floatWhatsappWidget = document.getElementById("float-whatsapp-widget");
  const floatWhatsappTooltip = document.getElementById("float-whatsapp-tooltip");
  const floatTooltipDismiss = document.getElementById("float-tooltip-dismiss");

  if (floatWhatsappWidget) {
    const handleScrollWidget = () => {
      if (window.scrollY > 300) {
        floatWhatsappWidget.classList.remove("hidden", "translate-y-16", "opacity-0");
        floatWhatsappWidget.classList.add("flex", "translate-y-0", "opacity-100");
      } else {
        floatWhatsappWidget.classList.add("hidden");
      }
    };
    
    window.addEventListener("scroll", handleScrollWidget);
    handleScrollWidget(); // Sync initial scrolled position

    // Show hovering tooltip after 6 seconds
    setTimeout(() => {
      if (floatWhatsappTooltip) {
        floatWhatsappTooltip.classList.remove("hidden", "scale-95", "opacity-0");
        floatWhatsappTooltip.classList.add("block", "scale-100", "opacity-100");
      }
    }, 6000);

    // Dismiss floating bubble
    if (floatTooltipDismiss && floatWhatsappTooltip) {
      floatTooltipDismiss.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        floatWhatsappTooltip.style.setProperty("display", "none", "important");
      });
    }
  }

  // 10. High Performance IntersectionObserver Reveal Observer
  const revealElements = document.querySelectorAll(".on-scroll-reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add("visible"));
  }
});
