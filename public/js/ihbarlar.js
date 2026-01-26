const container = document.getElementById("complaints-container");

// Backend’den verileri çek
fetch("https://sehir-sesi.koyeb.app/complaints")
  .then(res => res.json())
  .then(data => {
    data.forEach(complaint => {
      const card = document.createElement("div");
      card.className = "col-md-4";

      card.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${complaint.title}</h5>
            <p class="card-text">${complaint.description}</p>
            <p class="text-muted"><strong>Konum:</strong> ${complaint.location}</p>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error("Veri çekilemedi:", err));
