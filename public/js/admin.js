const container = document.getElementById("admin-container");
const API_URL = "https://sehir-sesi.koyeb.app";

// --------------------
// İhbarları çek
function fetchComplaints() {
  container.innerHTML = "";

  fetch(`${API_URL}/complaints`)
    .then(res => res.json())
    .then(data => {
      data.forEach(complaint => {
        const card = document.createElement("div");
        card.className = "col-md-4";

        card.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${complaint.title}</h5>
              <p class="card-text">${complaint.description}</p>
              <p class="text-muted"><strong>Konum:</strong> ${complaint.location}</p>
              <p class="text-primary"><strong>Durum:</strong> ${complaint.status}</p>
              <button class="btn btn-success btn-sm me-2" onclick="updateStatus(${complaint.id})">Çözüldü</button>
              <button class="btn btn-danger btn-sm" onclick="deleteComplaint(${complaint.id})">Sil</button>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => console.error("Veri çekilemedi:", err));
}

// --------------------
// Durum güncelle
function updateStatus(id) {
  fetch(`${API_URL}/complaints/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Çözüldü" })
  })
  .then(res => res.json())
  .then(() => fetchComplaints())
  .catch(err => console.error(err));
}

// --------------------
// Sil
function deleteComplaint(id) {
  fetch(`${API_URL}/complaints/${id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(() => fetchComplaints())
  .catch(err => console.error(err));
}

// İlk yükleme
fetchComplaints();

