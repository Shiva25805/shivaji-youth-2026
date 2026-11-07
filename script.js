
function openLogin(role) {
    const message = document.getElementById("message");

    if (role === "admin") {
        message.textContent =
            "Admin portal selected. We will build the secure admin login next.";
    } else {
        message.textContent =
            "Member portal selected. We will build the user login and registration next.";
    }

    message.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

const adminForm = document.getElementById("adminLoginForm");

if (adminForm) {
    adminForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("adminEmail").value;
        const password = document.getElementById("adminPassword").value;
        const adminMessage = document.getElementById("adminMessage");

        // Demo credentials
        if (email === "admin@gmail.com" && password === "admin123") {
            sessionStorage.setItem("shivajiAdminLoggedIn", "true");
            window.location.href = "admin-dashboard.html";
        } else {
            adminMessage.textContent = "Invalid email or password.";
        }
    });
}

const userForm = document.getElementById("userLoginForm");

if (userForm) {
    userForm.addEventListener("submit", function(event) {
        event.preventDefault();
        

        document.getElementById("userMessage").textContent =
            "Login interface ready. Secure backend authentication is not connected yet.";
    });
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("registerMessage");

        if (password !== confirmPassword) {
            message.textContent = "Passwords do not match.";
            return;
        }

        message.textContent =
            "Form validation successful. Account creation requires the backend.";
    });
}

const profileForm = document.getElementById("profileForm");

if (profileForm) {
    profileForm.addEventListener("submit", function(event) {
        event.preventDefault();

        document.getElementById("profileMessage").textContent =
            "Profile form validated. Connect the backend to save your changes.";
    });
}
