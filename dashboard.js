
const API_URL = "http://localhost:8080/api/members";

async function loadDashboard() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load members");
        }

        const members = await response.json();

        const activeMembers = members.filter(
            member => String(member.status).toLowerCase() === "active"
        );

        const inactiveMembers = members.filter(
            member => String(member.status).toLowerCase() === "inactive"
        );

        const leadershipRoles = members.filter(member =>
            ["president", "vice president", "secretary", "treasurer"]
                .includes(String(member.role).toLowerCase())
        );

        document.getElementById("totalMembers").textContent = members.length;
        document.getElementById("activeMembers").textContent = activeMembers.length;
        document.getElementById("inactiveMembers").textContent = inactiveMembers.length;
        document.getElementById("leadershipRoles").textContent = leadershipRoles.length;

        // Update membership status chart
        document.getElementById("chartTotal").textContent = members.length;
        document.getElementById("chartActive").textContent = activeMembers.length;
        document.getElementById("chartInactive").textContent = inactiveMembers.length;

        const activePercent = members.length
            ? (activeMembers.length / members.length) * 100
            : 0;

        const inactivePercent = members.length
            ? (inactiveMembers.length / members.length) * 100
            : 0;

        const activeDegrees = activePercent * 3.6;
        const inactiveDegrees = inactivePercent * 3.6;

        document.getElementById("statusDonut").style.background =
            `conic-gradient(
                #22d3ee 0deg ${activeDegrees}deg,
                #475569 ${activeDegrees}deg ${activeDegrees + inactiveDegrees}deg
            )`;

        // Update members by role chart
        const roleCounts = {};

        members.forEach(member => {
            const role = member.role || "Unassigned";
            roleCounts[role] = (roleCounts[role] || 0) + 1;
        });

        const roleChart = document.getElementById("roleChart");
        const roles = Object.entries(roleCounts)
            .sort((a, b) => b[1] - a[1]);

        if (roles.length === 0) {
            roleChart.innerHTML = "<p>No role data available.</p>";
        } else {
            const maxCount = Math.max(...roles.map(role => role[1]));

            roleChart.innerHTML = roles.map(([role, count]) => {
                const width = (count / maxCount) * 100;

                return `
                    <div class="role-chart-row">
                        <span class="role-chart-label">${escapeHTML(role)}</span>
                        <div class="role-chart-track">
                            <div class="role-chart-fill"
                                 style="width: ${width}%"></div>
                        </div>
                        <strong class="role-chart-count">${count}</strong>
                    </div>
                `;
            }).join("");
        }

        // Update recent registrations
        const recentMembers = document.getElementById("recentMembers");

        if (members.length === 0) {
            recentMembers.innerHTML = `
                <tr><td colspan="4">No members registered yet.</td></tr>
            `;
            return;
        }

        const sortedMembers = [...members].sort(
            (a, b) => Number(b.id) - Number(a.id)
        );

        recentMembers.innerHTML = sortedMembers.slice(0, 5).map(member => `
            <tr>
                <td>${escapeHTML(member.id)}</td>
                <td>${escapeHTML(member.name)}</td>
                <td>${escapeHTML(member.role)}</td>
                <td>${escapeHTML(member.status)}</td>
            </tr>
        `).join("");

    } catch (error) {
        console.error("Dashboard loading error:", error);

        document.getElementById("recentMembers").innerHTML = `
            <tr>
                <td colspan="4">Unable to load members. Check the backend.</td>
            </tr>
        `;
    }
}

function escapeHTML(value) {
    return String(value ?? "N/A").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

loadDashboard();

