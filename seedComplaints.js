const axios = require("axios");

const complaints = [
  { title: "Bozuk Yol", description: "Ana cadde çok bozuk, araç geçişi zor.", location: "Merkez" },
  { title: "Kaldırım Çöküğü", description: "Kaldırım çökük, yürümek tehlikeli.", location: "Çarşı" },
  { title: "Parkta Çöp Sorunu", description: "Parkta çöpler birikmiş, kötü koku var.", location: "Park Mahallesi" },
  { title: "Drenaj Tıkanması", description: "Yağmur sonrası su birikiyor, kanalizasyon tıkalı.", location: "Sanayi Bölgesi" },
  { title: "Trafik Lambası Arızalı", description: "Kırmızı ışık sürekli yanıyor, trafik sıkışıyor.", location: "Meydan" },
  { title: "Gürültü Kirliliği", description: "Gece inşaat çalışması var, uyumak imkansız.", location: "Yeni Mahalle" },
  { title: "Toplu Taşıma Sorunu", description: "Otobüsler çok geç geliyor.", location: "Merkez" },
  { title: "Cadde Aydınlatması Yok", description: "Gece sokaklar karanlık ve tehlikeli.", location: "Eski Mahalle" },
  { title: "Su Kesintisi", description: "Mahallede sık sık su kesiliyor.", location: "Bahçelievler" },
  { title: "Çocuk Parkı Bakımsız", description: "Oyun alanı bozuk ve tehlikeli.", location: "Gültepe" },
  { title: "Yaya Geçidi Yok", description: "Okul önünde yaya geçidi yok, tehlikeli.", location: "Okul Caddesi" },
  { title: "Halk Otobüsü Gecikmesi", description: "Otobüs hattı düzensiz çalışıyor.", location: "İsmetpaşa" },
  { title: "Park Yeri Sorunu", description: "Otopark yetersiz, araçlar sokakta kalıyor.", location: "Şehir Merkezi" },
  { title: "Kırık Sokak Lambası", description: "Lamba yanmıyor, gece karanlık.", location: "Atatürk Mah." },
  { title: "Çevre Kirliliği", description: "Derenin kenarına çöp atılmış, kötü koku var.", location: "Dereboyu" }
];

async function seed() {
  for (const complaint of complaints) {
    try {
      // seedComplaints.js içindeki linki bu yap:
      const res = await axios.post("https://urgent-abbye-nisaprojects-e8de76ae.koyeb.app/complaints", complaint, {
        headers: { "Content-Type": "application/json" }
      });
      console.log(`Eklendi: ${res.data.id} - ${complaint.title}`);
    } catch (err) {
      console.error(`Hata: ${complaint.title} -> ${err.message}`);
    }
  }
}

seed();

