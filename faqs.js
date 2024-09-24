const toggleButton = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");

function toggleSidebar() {
  sidebar.classList.toggle("close");
  toggleButton.classList.toggle("rotate");

  closeAllSubMenus();
}

function toggleSubMenu(button) {
  if (!button.nextElementSibling.classList.contains("show")) {
    closeAllSubMenus();
  }

  button.nextElementSibling.classList.toggle("show");
  button.classList.toggle("rotate");

  if (sidebar.classList.contains("close")) {
    sidebar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");
  }
}

function closeAllSubMenus() {
  Array.from(sidebar.getElementsByClassName("show")).forEach((ul) => {
    ul.classList.remove("show");
    ul.previousElementSibling.classList.remove("rotate");
  });
}

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  loader.classList.add("loader-hidden"); // Add class to hide the loader

  loader.addEventListener("transitionend", () => {
    // Check if the loader is still a child of document.body before removing it
    if (loader && loader.parentNode) {
      document.body.removeChild(loader);
    }
  });
});

// Accordion functionality
const accordionContent = document.querySelectorAll(".accordion-content");

accordionContent.forEach((item, index) => {
  let header = item.querySelector("header");

  header.addEventListener("click", () => {
    item.classList.toggle("open");

    let description = item.querySelector(".description");
    if (item.classList.contains("open")) {
      description.style.maxHeight = description.scrollHeight + "px"; // Smooth expand
      item.querySelector("i").classList.replace("fa-plus", "fa-minus");
    } else {
      description.style.maxHeight = "0"; // Collapse
      item.querySelector("i").classList.replace("fa-minus", "fa-plus");
    }

    closeOthers(index);
  });
});

function closeOthers(index) {
  accordionContent.forEach((item, idx) => {
    if (index !== idx) {
      item.classList.remove("open");
      let description = item.querySelector(".description");
      description.style.maxHeight = "0";
      item.querySelector("i").classList.replace("fa-minus", "fa-plus");
    }
  });
}
