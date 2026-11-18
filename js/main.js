// Interactive features for the Travel to Japan site:
// 1. Build the destination cards from the data in destinations.js
// 2. Search box that filters the cards as you type
// 3. Gallery lightbox: click a photo to see it full size
// 4. Login and Booking forms in pop-up dialogs, with validation

// ---------- 1. Destination cards ----------

// Returns star icons for a rating like 4.6 (full, half, and empty stars).
function buildStars(rating) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    if (rating !== null && rating >= i) {
      html += '<i class="fa-solid fa-star"></i>';
    } else if (rating !== null && rating >= i - 0.5) {
      html += '<i class="fa-solid fa-star-half-stroke"></i>';
    } else {
      html += '<i class="fa-regular fa-star"></i>';
    }
  }
  if (rating !== null) {
    html += ' <span class="rating-number">' + rating + "</span>";
  }
  return html;
}

// Creates one card element for a destination object.
function createCard(place) {
  const column = document.createElement("div");
  column.className = "col-md-4 destination";

  // The pin links to Google Maps when we have a map URL.
  const pin = place.mapUrl
    ? '<a href="' + place.mapUrl + '" target="_blank" rel="noopener" aria-label="Open map"><i class="fa-solid fa-location-dot"></i></a>'
    : '<i class="fa-solid fa-location-dot"></i>';

  // The data comes from our own destinations.js file (not from users),
  // so it is safe to insert it as HTML here.
  column.innerHTML =
    '<div class="feature-box">' +
    '  <div class="feature-img">' +
    '    <img src="' + place.image + '" alt="' + place.alt + '">' +
    '    <div class="price"><p>' + place.price + "</p></div>" +
    '    <div class="rating">' + buildStars(place.rating) + "</div>" +
    "  </div>" +
    '  <div class="feature-details">' +
    "    <h4>" + place.name + "</h4>" +
    "    <h5>" + place.region + "</h5>" +
    "    <p>" + place.description + "</p>" +
    "    <div>" +
    "      <span>" + pin + " " + place.address + "</span>" +
    '      <span><i class="fa-solid fa-sun"></i> ' + place.days + " Days</span>" +
    '      <span><i class="fa-solid fa-moon"></i> ' + place.nights + " Nights</span>" +
    "    </div>" +
    "  </div>" +
    "</div>";

  return column;
}

// Clears the list and draws a card for every destination passed in.
function renderDestinations(list) {
  const container = document.getElementById("destination-list");
  container.innerHTML = "";
  list.forEach(function (place) {
    container.appendChild(createCard(place));
  });

  // Show a message when the search finds nothing.
  document.getElementById("no-results").hidden = list.length > 0;
}

// ---------- 2. Search ----------

// Removes HTML tags so links in descriptions don't affect matching.
function plainText(html) {
  return html.replace(/<[^>]*>/g, "");
}

// Keeps only destinations whose name, region, address or description
// contains the search text (ignoring upper/lower case).
function filterDestinations(query) {
  const text = query.trim().toLowerCase();
  if (text === "") {
    return destinations;
  }
  return destinations.filter(function (place) {
    const searchable = [place.name, place.region, place.address, plainText(place.description)]
      .join(" ")
      .toLowerCase();
    return searchable.includes(text);
  });
}

function setUpSearch() {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");

  // Filter while typing.
  input.addEventListener("input", function () {
    renderDestinations(filterDestinations(input.value));
  });

  // Pressing Enter or the Search button scrolls down to the results.
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading
    renderDestinations(filterDestinations(input.value));
    document.getElementById("destinations").scrollIntoView({ behavior: "smooth" });
  });
}

// ---------- 3. Gallery lightbox ----------

function setUpLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");

  document.querySelectorAll(".gallery-box img").forEach(function (img) {
    img.addEventListener("click", function () {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      // Use the caption under the photo (for example "Tokyo, Japan").
      lightboxCaption.textContent = img.nextElementSibling ? img.nextElementSibling.textContent : "";
      lightbox.showModal();
    });
  });

  // Close when clicking the dark background or the close button.
  // (The Escape key closes a <dialog> automatically.)
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox || event.target.closest(".dialog-close")) {
      lightbox.close();
    }
  });
}

// ---------- 4. Login and Booking forms ----------

// Shows an error message under a field, or clears it when message is "".
function setError(input, message) {
  const errorElement = document.getElementById(input.id + "-error");
  errorElement.textContent = message;
  input.classList.toggle("is-invalid", message !== "");
}

function isValidEmail(email) {
  // Simple check: something@something.something
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Returns true when every field passes; shows errors on the ones that fail.
function validateLogin(form) {
  const email = form.elements["login-email"];
  const password = form.elements["login-password"];
  let valid = true;

  if (!isValidEmail(email.value.trim())) {
    setError(email, "Enter a valid email address.");
    valid = false;
  } else {
    setError(email, "");
  }

  if (password.value.length < 8) {
    setError(password, "Password must be at least 8 characters.");
    valid = false;
  } else {
    setError(password, "");
  }

  return valid;
}

function validateBooking(form) {
  const name = form.elements["booking-name"];
  const email = form.elements["booking-email"];
  const destination = form.elements["booking-destination"];
  const date = form.elements["booking-date"];
  const travelers = form.elements["booking-travelers"];
  let valid = true;

  if (name.value.trim().length < 2) {
    setError(name, "Enter your full name.");
    valid = false;
  } else {
    setError(name, "");
  }

  if (!isValidEmail(email.value.trim())) {
    setError(email, "Enter a valid email address.");
    valid = false;
  } else {
    setError(email, "");
  }

  if (destination.value === "") {
    setError(destination, "Choose a destination.");
    valid = false;
  } else {
    setError(destination, "");
  }

  // The trip date can't be in the past.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const chosen = new Date(date.value + "T00:00:00");
  if (date.value === "" || chosen < today) {
    setError(date, "Choose today or a future date.");
    valid = false;
  } else {
    setError(date, "");
  }

  const count = Number(travelers.value);
  if (!Number.isInteger(count) || count < 1 || count > 10) {
    setError(travelers, "Enter between 1 and 10 travelers.");
    valid = false;
  } else {
    setError(travelers, "");
  }

  return valid;
}

// Connects a button to its dialog and the dialog's form to its validator.
function setUpFormDialog(buttonId, dialogId, validate, successMessage) {
  const dialog = document.getElementById(dialogId);
  const form = dialog.querySelector("form");
  const status = dialog.querySelector(".form-status");

  document.getElementById(buttonId).addEventListener("click", function () {
    form.reset();
    form.querySelectorAll(".field-error").forEach(function (el) { el.textContent = ""; });
    form.querySelectorAll(".is-invalid").forEach(function (el) { el.classList.remove("is-invalid"); });
    status.textContent = "";
    dialog.showModal();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validate(form)) {
      // This site has no server yet, so nothing is actually sent.
      status.textContent = successMessage;
    } else {
      status.textContent = "";
    }
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog || event.target.closest(".dialog-close")) {
      dialog.close();
    }
  });
}

// Fills the Booking form's destination dropdown from the same data list.
function fillDestinationOptions() {
  const select = document.getElementById("booking-destination");
  destinations.forEach(function (place) {
    const option = document.createElement("option");
    option.value = place.name;
    option.textContent = place.name.replace(/"/g, "");
    select.appendChild(option);
  });
}

// ---------- Start everything once the page has loaded ----------

document.addEventListener("DOMContentLoaded", function () {
  renderDestinations(destinations);
  setUpSearch();
  setUpLightbox();
  fillDestinationOptions();
  setUpFormDialog("login-btn", "login-dialog", validateLogin,
    "Demo only: login details look valid, but this site has no accounts yet.");
  setUpFormDialog("booking-btn", "booking-dialog", validateBooking,
    "Demo only: your request looks complete, but bookings aren't sent anywhere yet.");
});
