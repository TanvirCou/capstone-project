(function () {
  "use strict";

  const STORAGE_KEY = "userSettings";

  const VALIDATION_MESSAGES = {
    nameRequired: "Full name is required.",
    emailRequired: "Email is required.",
    emailInvalid: "Please enter a valid email address.",
    themeRequired: "Please select a theme.",
  };

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const elements = {
    form: document.getElementById("settings-form"),
    fullName: document.getElementById("full-name"),
    email: document.getElementById("email"),
    notifications: document.getElementById("notifications"),
    saveBtn: document.getElementById("save-btn"),
    formStatus: document.getElementById("form-status"),
    themeGroup: document.getElementById("theme-group"),
    themeLight: document.getElementById("theme-light"),
    fullNameError: document.getElementById("full-name-error"),
    emailError: document.getElementById("email-error"),
    themeError: document.getElementById("theme-error"),
    themeRadios: document.querySelectorAll('input[name="theme"]'),
  };

  function getSelectedTheme() {
    const selected = document.querySelector('input[name="theme"]:checked');
    return selected ? selected.value : "";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  function loadSettings() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const settings = JSON.parse(stored);
      elements.fullName.value = settings.fullName ?? "";
      elements.email.value = settings.email ?? "";
      elements.notifications.checked = Boolean(settings.notifications);

      if (settings.theme) {
        const radio = document.querySelector(
          `input[name="theme"][value="${settings.theme}"]`
        );
        if (radio) radio.checked = true;
        applyTheme(settings.theme);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function setFieldError(input, errorEl, message) {
    const hasError = Boolean(message);
    input.setAttribute("aria-invalid", hasError ? "true" : "false");
    errorEl.textContent = message;
  }

  function validateFullName() {
    const value = elements.fullName.value.trim();
    const message = value ? "" : VALIDATION_MESSAGES.nameRequired;
    setFieldError(elements.fullName, elements.fullNameError, message);
    return !message;
  }

  function validateEmail() {
    const value = elements.email.value.trim();
    let message = "";

    if (!value) {
      message = VALIDATION_MESSAGES.emailRequired;
    } else if (!EMAIL_PATTERN.test(value)) {
      message = VALIDATION_MESSAGES.emailInvalid;
    }

    setFieldError(elements.email, elements.emailError, message);
    return !message;
  }

  function setThemeError(message) {
    const hasError = Boolean(message);
    elements.themeGroup.setAttribute("aria-invalid", hasError ? "true" : "false");
    elements.themeError.textContent = message;
  }

  function validateTheme() {
    const theme = getSelectedTheme();
    const message = theme ? "" : VALIDATION_MESSAGES.themeRequired;
    setThemeError(message);
    return !message;
  }

  function focusFirstInvalidField() {
    if (elements.fullName.getAttribute("aria-invalid") === "true") {
      elements.fullName.focus();
      return;
    }

    if (elements.email.getAttribute("aria-invalid") === "true") {
      elements.email.focus();
      return;
    }

    if (elements.themeGroup.getAttribute("aria-invalid") === "true") {
      elements.themeLight.focus();
    }
  }

  function validateForm() {
    const results = [validateFullName(), validateEmail(), validateTheme()];
    return results.every(Boolean);
  }

  function clearFormStatus() {
    elements.formStatus.hidden = true;
    elements.formStatus.textContent = "";
    elements.formStatus.className = "form-status";
  }

  function showFormStatus(message, type) {
    elements.formStatus.hidden = false;
    elements.formStatus.textContent = message;
    elements.formStatus.className = `form-status form-status--${type}`;
  }

  function getFormData() {
    return {
      fullName: elements.fullName.value.trim(),
      email: elements.email.value.trim(),
      theme: getSelectedTheme(),
      notifications: elements.notifications.checked,
    };
  }

  function saveSettings(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    applyTheme(data.theme);
  }

  function simulateSave(data) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 800);
    });
  }

  function setSaveButtonState(isProcessing) {
    elements.saveBtn.disabled = isProcessing;
    elements.saveBtn.textContent = isProcessing ? "Saving…" : "Save Settings";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    clearFormStatus();

    if (!validateForm()) {
      focusFirstInvalidField();
      return;
    }

    setSaveButtonState(true);

    try {
      const data = getFormData();
      await simulateSave(data);
      saveSettings(data);
      showFormStatus("Settings saved successfully.", "success");
    } catch {
      showFormStatus("Something went wrong. Please try again.", "error");
    } finally {
      setSaveButtonState(false);
    }
  }

  function handleThemeChange(event) {
    if (event.target.name === "theme") {
      applyTheme(event.target.value);
      validateTheme();
    }
  }

  function bindEvents() {
    elements.form.addEventListener("submit", handleSubmit);

    elements.fullName.addEventListener("blur", validateFullName);
    elements.fullName.addEventListener("input", () => {
      if (elements.fullName.getAttribute("aria-invalid") === "true") {
        validateFullName();
      }
    });

    elements.email.addEventListener("blur", validateEmail);
    elements.email.addEventListener("input", () => {
      if (elements.email.getAttribute("aria-invalid") === "true") {
        validateEmail();
      }
    });

    elements.themeRadios.forEach((radio) => {
      radio.addEventListener("change", handleThemeChange);
    });
  }

  function init() {
    if (!elements.form || !elements.themeGroup) return;

    loadSettings();
    bindEvents();
  }

  init();
})();
