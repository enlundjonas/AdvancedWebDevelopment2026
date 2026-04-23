let updateButton = null;
let deleteButton = null;
let selectedCustomerId = null;

const form = document.getElementById("customerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const birth_date = document.getElementById("birth_date").value;

  try {
    const res = await fetch("http://localhost:3000/api/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ first_name, last_name, email, phone, birth_date })
    });

    const data = await res.json();
    console.log(data);

    loadCustomers();

  } catch (err) {
    console.error(err);
  }

});

updateButton = document.querySelector(".updateButton");

updateButton.addEventListener("click", async () => {

  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const birth_date = document.getElementById("birth_date").value;

  try {
    await fetch(`http://localhost:3000/api/persons/${selectedCustomerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ first_name, last_name, email, phone, birth_date })
    });

    loadCustomers();
    form.reset();
    updateButton.disabled = true;
    deleteButton.disabled = true;
    selectedCustomerId = null;

  } catch (err) {
    console.error(err);
  }

});


deleteButton = document.querySelector(".deleteButton");

deleteButton.addEventListener("click", async () => {
  try {
    await fetch(`http://localhost:3000/api/persons/${selectedCustomerId}`, {
      method: "DELETE"
    });

    loadCustomers();
    form.reset();
    updateButton.disabled = true;
    deleteButton.disabled = true;
    selectedCustomerId = null;

  } catch (err) {
    console.error(err);
  }

});




async function loadCustomers() {
  const container = document.getElementById("customer-list");

  try {
    const res = await fetch("/api/persons");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    // Clear placeholder
    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<p>No customers found.</p>";
      return;
    }

    // Create simple list
    data.forEach(person => {
      const div = document.createElement("div");
      div.className = "customer-card";

      div.innerHTML = `
        <strong>${person.first_name} ${person.last_name}</strong><br>
        Email: ${person.email}<br>
        Phone: ${person.phone || "-"}
      `;

      div.addEventListener("click", () => {
        selectedCustomerId = person.id;

        document.getElementById("first_name").value = person.first_name;
        document.getElementById("last_name").value = person.last_name;
        document.getElementById("email").value = person.email;
        document.getElementById("phone").value = person.phone || "";
        document.getElementById("birth_date").value = person.birth_date || "";

        updateButton.disabled = false;
        deleteButton.disabled = false;
      });

      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p style='color:red;'>Error loading data</p>";
  }
}

// Run on page load
loadCustomers();