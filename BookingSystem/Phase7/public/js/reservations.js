// reservations.js
import { initAuthUI, requireAuthOrBlockPage } from "./auth-ui.js";

// =====================
// AUTHENTICATION
// =====================
initAuthUI();
if (!requireAuthOrBlockPage()) throw new Error("Not authenticated");

// =====================
// ELEMENTS
// =====================
const form = document.getElementById("reservationForm");
const messageBox = document.getElementById("message");
const resourceSelect = document.getElementById("resourceId");

// Create Update & Delete buttons
let updateBtn = document.getElementById("updateBtn");
let deleteBtn = document.getElementById("deleteBtn");

if (!updateBtn) {
  updateBtn = document.createElement("button");
  updateBtn.type = "button";
  updateBtn.id = "updateBtn";
  updateBtn.textContent = "Update Reservation";
  updateBtn.className = "w-full rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out bg-brand-primary text-white hover:bg-brand-dark/80 shadow-soft";
  updateBtn.disabled = true;
  form.appendChild(updateBtn);
}

updateBtn.addEventListener("click", () => {
  form.requestSubmit();
});


if (!deleteBtn) {
  deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.id = "deleteBtn";
  deleteBtn.textContent = "Delete Reservation";
  deleteBtn.className = "w-full rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-200 ease-out bg-brand-primary text-white hover:bg-brand-dark/80 shadow-soft";
  deleteBtn.disabled = true;
  form.appendChild(deleteBtn);
}

// =====================
// MESSAGE UTILS
// =====================
function showMessage(msg, type = "info") {
  const styles = {
    success: "border-green-300 bg-green-100 text-green-800",
    error: "border-red-300 bg-red-100 text-red-800",
    info: "border-blue-300 bg-blue-100 text-blue-800",
  };
  messageBox.className = `mt-4 rounded-xl border px-4 py-3 text-sm ${styles[type] || styles.info}`;
  messageBox.textContent = msg;
  messageBox.classList.remove("hidden");
}

function clearMessage() {
  messageBox.className = "hidden mt-4 rounded-xl border px-4 py-3 text-sm";
  messageBox.textContent = "";
}

// =====================
// FORM BUTTON STATE
// =====================
function enableFormButtons() {
  updateBtn.disabled = false;
  deleteBtn.disabled = false;
}

function disableFormButtons() {
  updateBtn.disabled = true;
  deleteBtn.disabled = true;
}


// =====================
// LOAD RESOURCES DROPDOWN
// =====================
async function loadResources() {
  try {
    const res = await fetch("/api/resources", {
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    });
    const result = await res.json();
    resourceSelect.innerHTML = "<option value=''>Select a resource</option>";
    result.data.forEach(r => {
      const option = document.createElement("option");
      option.value = r.id;
      option.textContent = r.name;
      resourceSelect.appendChild(option);
    });
  } catch (err) {
    console.error("Failed to load resources:", err);
    showMessage("Failed to load resources", "error");
  }
}

// =====================
// LOAD RESERVATIONS LIST
// =====================
async function loadReservations() {
  try {
    const res = await fetch("/api/reservations", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    const result = await res.json();
    renderReservations(result.data || []);
  } catch (err) {
    console.error("Failed to load reservations:", err);
    showMessage("Failed to load reservations", "error");
  }
}

function renderReservations(reservations) {
  const container = document.getElementById("reservationList");
  container.innerHTML = "";
  reservations.forEach(r => {
    const div = document.createElement("div");
    div.className = "p-4 border rounded-xl cursor-pointer hover:bg-black/5";
    div.innerHTML = `
      <div class="text-sm font-semibold">${r.resource_name}</div>
      <div class="text-xs text-black/60">
        ${new Date(r.start_time).toLocaleString()} → 
        ${new Date(r.end_time).toLocaleString()}
      </div>
      <div class="text-xs text-black/50">${r.status}</div>
    `;
    div.addEventListener("click", () => loadIntoForm(r));
    container.appendChild(div);
  });
}

// =====================
// LOAD RESERVATION INTO FORM
// =====================
function loadIntoForm(r) {
  resourceSelect.value = r.resource_id;
  document.getElementById("startTime").value = r.start_time.slice(0, 16);
  document.getElementById("endTime").value = r.end_time.slice(0, 16);
  document.getElementById("note").value = r.note || "";
  document.getElementById("status").value = r.status;
  form.dataset.id = r.id;
  enableFormButtons();
}

// =====================
// CREATE / UPDATE RESERVATION
// =====================
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearMessage();

  const data = {
    resourceId: Number(resourceSelect.value),
    startTime: new Date(document.getElementById("startTime").value).toISOString(),
    endTime: new Date(document.getElementById("endTime").value).toISOString(),
    note: document.getElementById("note").value,
    status: document.getElementById("status").value,
  };

  const id = form.dataset.id;
  const method = id ? "PUT" : "POST";
  const endpoint = id ? `/api/reservations/${id}` : "/api/reservations";

  try {
    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    const body = await res.json();
    console.log("UPDATE RESPONSE:", res.status, body);

    if ((res.status === 201 && !id) || (res.status === 200 && id)) {
      showMessage(id ? "Reservation updated successfully!" : "Reservation created successfully!", "success");
      form.reset();
      delete form.dataset.id;
      disableFormButtons();
      loadReservations();
    } else {
      showMessage(body.error || "Failed to save reservation", "error");
    }
  } catch (err) {
    console.error(err);
    showMessage("Error occurred while saving reservation", "error");
  }
});

// =====================
// DELETE RESERVATION
// =====================
deleteBtn.addEventListener("click", async () => {
  const id = form.dataset.id;
  if (!id) return;
  if (!confirm("Are you sure you want to delete this reservation?")) return;

  try {
    const res = await fetch(`/api/reservations/${id}`, {
      method: "DELETE",
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    });

    if (res.status === 204) {
      showMessage("Reservation deleted successfully!", "success");
      form.reset();
      delete form.dataset.id;
      disableFormButtons();
      loadReservations();
    } else {
      const body = await res.json();
      showMessage(body?.error || "Failed to delete reservation", "error");
    }
  } catch (err) {
    console.error(err);
    showMessage("Error occurred while deleting reservation", "error");
  }
});

// =====================
// INITIAL PAGE LOAD
// =====================
document.addEventListener("DOMContentLoaded", async () => {
  await loadResources();
  await loadReservations();
  disableFormButtons();
});