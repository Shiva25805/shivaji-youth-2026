
const MEMBER_KEY = "shivajiMembers";

function getRegisteredMembers() {
    try {
        const members = JSON.parse(
            localStorage.getItem(MEMBER_KEY) || "[]"
        );

        return Array.isArray(members) ? members : [];
    } catch (error) {
        return [];
    }
}

function registerMember(name, email, phone, password) {
    name = name.trim();
    email = email.trim().toLowerCase();
    phone = phone.trim();

    if (!name || !email || !phone || !password) {
        return "Please fill in all required fields.";
    }

    const members = getRegisteredMembers();

    if (members.some(member =>
        member.email &&
        member.email.toLowerCase() === email
    )) {
        return "This email is already registered.";
    }

    members.push({
        id: Date.now().toString(),
        name: name,
        email: email,
        phone: phone,
        password: password,
        address: "",
        role: "Member",
        status: "Active",
        joinDate: new Date().toISOString().slice(0, 10)
    });

    try {
        localStorage.setItem(MEMBER_KEY, JSON.stringify(members));
        return "Registration successful!";
    } catch (error) {
        return "Could not save your registration.";
    }
}

function loginMember(email, password) {
    email = email.trim().toLowerCase();

    const members = getRegisteredMembers();

    const member = members.find(item =>
        item.email &&
        item.email.toLowerCase() === email &&
        item.password === password &&
        item.status !== "Inactive"
    );

    if (!member) {
        return {
            success: false,
            message: "Invalid email or password."
        };
    }

    localStorage.setItem("memberName", member.name);
    localStorage.setItem("memberEmail", member.email);
    localStorage.setItem("memberPhone", member.phone);

    localStorage.setItem(
        "shivajiMemberProfile",
        JSON.stringify({
            name: member.name,
            email: member.email,
            phone: member.phone,
            address: member.address || ""
        })
    );

    return {
        success: true,
        message: "Login successful!"
    };
}

function logoutMember() {
    localStorage.removeItem("memberName");
    localStorage.removeItem("memberEmail");
    localStorage.removeItem("memberPhone");
    localStorage.removeItem("shivajiMemberProfile");
    window.location.href = "user-login.html";
}