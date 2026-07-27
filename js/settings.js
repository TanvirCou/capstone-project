const STORAGE_KEY = "capstone-settings";

const DEFAULTS = {
    displayName: "",
    email: "",
    theme: "light",
    language: "en",
    emailNotifications: true,
    pushNotifications: false,
};

const form = document.getElementById("settings-form");
const toast = document.getElementById("toast");

function loadSettings() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? { ...DEFAULTS, ...JSON.parse(stored) } : { ...DEFAULTS };
    } catch {
        return { ...DEFAULTS };
    }
}

function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function applyTheme(theme) {
    const resolved =
        theme === "system"
            ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
            : theme;

    document.documentElement.setAttribute("data-theme", resolved);
}

function populateForm(settings) {
    form.displayName.value = settings.displayName;
    form.email.value = settings.email;
    form.theme.value = settings.theme;
    form.language.value = settings.language;
    form.emailNotifications.checked = settings.emailNotifications;
    form.pushNotifications.checked = settings.pushNotifications;
    applyTheme(settings.theme);
}

function collectFormData() {
    return {
        displayName: form.displayName.value.trim(),
        email: form.email.value.trim(),
        theme: form.theme.value,
        language: form.language.value,
        emailNotifications: form.emailNotifications.checked,
        pushNotifications: form.pushNotifications.checked,
    };
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("toast--visible");

    setTimeout(() => {
        toast.classList.remove("toast--visible");
    }, 3000);
}

function validatePasswordFields() {
    const current = form.currentPassword.value;
    const newPass = form.newPassword.value;
    const confirm = form.confirmPassword.value;

    if (!newPass && !confirm && !current) return true;

    if (!current) {
        showToast("Enter your current password to change it.");
        return false;
    }

    if (newPass.length < 8) {
        showToast("New password must be at least 8 characters.");
        return false;
    }

    if (newPass !== confirm) {
        showToast("New passwords do not match.");
        return false;
    }

    return true;
}

function initSettingsPage() {
    if (!form) return;

    const settings = loadSettings();
    populateForm(settings);

    form.theme.addEventListener("change", () => {
        applyTheme(form.theme.value);
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!validatePasswordFields()) return;

        const updated = collectFormData();
        saveSettings(updated);
        applyTheme(updated.theme);

        form.currentPassword.value = "";
        form.newPassword.value = "";
        form.confirmPassword.value = "";

        showToast("Settings saved successfully.");
    });

    document.getElementById("cancel-btn").addEventListener("click", () => {
        populateForm(loadSettings());
        form.currentPassword.value = "";
        form.newPassword.value = "";
        form.confirmPassword.value = "";
        showToast("Changes discarded.");
    });

    document.getElementById("reset-settings").addEventListener("click", () => {
        if (!confirm("Reset all settings to defaults? This cannot be undone.")) return;

        localStorage.removeItem(STORAGE_KEY);
        populateForm(DEFAULTS);
        form.currentPassword.value = "";
        form.newPassword.value = "";
        form.confirmPassword.value = "";
        showToast("Settings reset to defaults.");
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        const current = loadSettings();
        if (current.theme === "system") {
            applyTheme("system");
        }
    });
}

function initGlobalTheme() {
    const settings = loadSettings();
    applyTheme(settings.theme);
}

initGlobalTheme();
initSettingsPage();
