const teamMembers = [
    { id: 1, name: "Alice", sentAt: null },
    { id: 2, name: "Bob", sentAt: "2025-03-20" },
    { id: 3, name: "Charlie", sentAt: null },
];

const renderTable = () => {
    const tbody = document.getElementById("teamTable");
    tbody.innerHTML = teamMembers
        .map(
            (member) => `
        <tr>
            <td><input type="checkbox" class="memberCheckbox" data-id="${member.id}" /></td>
            <td>${member.name}</td>
            <td>${member.sentAt ? `Sent on ${new Date(member.sentAt).toLocaleDateString()}` : "Not Sent"}</td>
        </tr>
    `
        )
        .join("");
};

// Select/Deselect all checkboxes
const toggleSelectAll = () => {
    const checkboxes = document.querySelectorAll(".memberCheckbox");
    const selectAll = document.getElementById("selectAll").checked;
    checkboxes.forEach((cb) => (cb.checked = selectAll));
};

// Send certificates in bulk
const sendCertificates = () => {
    const selectedIds = Array.from(document.querySelectorAll(".memberCheckbox:checked")).map(
        (cb) => parseInt(cb.dataset.id)
    );

    if (selectedIds.length === 0) {
        alert("No team members selected.");
        return;
    }

    // Simulate sending process (You'd call your API here)
    selectedIds.forEach((id) => {
        const member = teamMembers.find((m) => m.id === id);
        if (member) member.sentAt = new Date().toISOString();
    });

    renderTable(); // Refresh table after sending
};

// Initialize table
document.addEventListener("DOMContentLoaded", renderTable);

