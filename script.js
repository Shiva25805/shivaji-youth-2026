function openLogin(role) {
    const message = document.getElementById("message");

    if (!message) return;

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
    adminForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("adminEmail").value;
        const password = document.getElementById("adminPassword").value;
        const adminMessage = document.getElementById("adminMessage");

            
try {
    const response = await fetch(
        (location.hostname === "localhost" ||
         location.hostname === "127.0.0.1")
            ? "http://127.0.0.1:8080/api/auth/login"
            : "https://shivaji-youth-2026-backend.onrender.com/api/auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    );


            if (response.ok) {
                sessionStorage.setItem("shivajiAdminLoggedIn", "true");
                window.location.href = "admin-dashboard.html";
            } else {
                adminMessage.textContent = "Invalid email or password.";
            }
        } catch (error) {
            console.error("Login error:", error);
            adminMessage.textContent =
                "Cannot connect to the backend. Check that it is running.";
        }
    });
}

    
const userForm = document.getElementById("userLoginForm");

if (userForm) {
    userForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("userEmail").value.trim();
        const password = document.getElementById("userPassword").value;
        const message = document.getElementById("userMessage");
        const submitButton = userForm.querySelector('button[type="submit"]');

        message.textContent = "Logging in...";
        submitButton.disabled = true;

        try {
            const response = await fetch(
                "http://127.0.0.1:8080/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            if (response.ok) {
                window.location.href = "member-dashboard.html";
            } else {
                message.textContent = "Invalid email or password.";
            }
        } catch (error) {
            console.error("Member login error:", error);
            message.textContent =
                "Cannot connect to the backend. Check that it is running.";
        } finally {
            submitButton.disabled = false;
        }
    });
}
