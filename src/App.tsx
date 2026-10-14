import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

// 1. Sayfa adları için tip tanımı (Adım 13 formatı: "add")
type PageName = "home" | "events" | "add" | "detail" | "update";

// Menü elemanları
const NAV_ITEMS: { key: PageName; label: string }[] = [
  { key: "home", label: "Ana Sayfa" },
  { key: "events", label: "Etkinlikler" },
  { key: "add", label: "Etkinlik Ekle" },
];

function formatDate(dateStr: string) {
  return dateStr;
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Arama metni ve kategori filtreleme state'leri
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Seçili etkinliği hesapla
  const selected = selectedId
    ? findEventById(events, selectedId)
    : undefined;

  // Sekme başlığı belirleme
  let tabTitle = "Ana Sayfa";
  if (page === "events") {
    tabTitle = "Etkinlikler";
  } else if (page === "add") {
    tabTitle = "Etkinlik Ekle";
  } else if (page === "detail") {
    tabTitle = selected ? selected.title : "Detay";
  } else if (page === "update") {
    tabTitle = "Etkinlik Güncelle";
  }

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${tabTitle}`;
  }, [tabTitle]);

  // Yaklaşan 2 etkinlik
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  // Kategori seçenekleri
  const categories = [...new Set(events.map((e) => e.category))];

  // Filtrelenmiş liste
  const filtered = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );

  // Kart render fonksiyonu
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart event-card" key={event.id}>
        {event.image && (
          <img src={event.image} alt={event.title} className="event-image" />
        )}
        <div className="event-content">
          <span className="event-category">{event.category}</span>
          <h3>{event.title}</h3>
          <p className="event-desc">{event.description}</p>
          <div className="event-meta">
            <span>📅 {formatDate(event.date)} - {event.time}</span>
            <span>📍 {event.location}</span>
            <span>👥 Kontenjan: {event.capacity}</span>
          </div>
          <button
            type="button"
            className="btn-detail"
            onClick={() => go("detail", event.id)}
          >
            Detayları Gör
          </button>
        </div>
      </article>
    );
  }

  return (
    <>
      {/* HEADER */}
      <header className="site-header">
        <div className="container">
          <h1>Kampüs Etkinlikleri</h1>
        </div>
      </header>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container nav-container">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              aria-current={page === item.key ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.key);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ANA İÇERİK */}
      <main className="container">
        {page === "home" && (
          <section>
            <h2>Yaklaşan Etkinlikler</h2>
            <div className="etkinlik-listesi events">
              {upcoming.map(renderCard)}
            </div>
          </section>
        )}

        {page === "events" && (
          <section>
            <h2>Tüm Etkinlikler</h2>

            <div className="filters-container" style={{ margin: "1rem 0", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <input
                type="search"
                placeholder="Etkinlik ara (başlık veya açıklama)..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ padding: "0.5rem", minWidth: "250px" }}
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category | "")}
                style={{ padding: "0.5rem" }}
              >
                <option value="">Tüm Kategoriler</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <p style={{ margin: "0.5rem 0", fontStyle: "italic" }}>
              {filtered.length === 0
                ? "Aradığınız kriterlere uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <div className="etkinlik-listesi events">
              {filtered.map(renderCard)}
            </div>
          </section>
        )}

        {/* DETAY SAYFASI BLOĞU */}
        {page === "detail" && (
          <section>
            {!selected && (
              <div className="error-box">
                <p>Etkinlik bulunamadı veya silinmiş olabilir.</p>
                <button type="button" onClick={() => go("events")}>
                  Listeye dön
                </button>
              </div>
            )}

            {selected && (
              <article className="detay">
                <h2>{selected.title}</h2>

                <div className="detay-icerik">
                  {selected.image && (
                    <figure className="detay-afis">
                      <img src={selected.image} alt={selected.title} />
                    </figure>
                  )}

                  <div className="kunye">
                    <p><strong>Kategori:</strong> {selected.category}</p>
                    <p><strong>Tarih:</strong> {selected.date}</p>
                    <p><strong>Saat:</strong> {selected.time}</p>
                    <p><strong>Yer:</strong> {selected.location}</p>
                    <p><strong>Kontenjan:</strong> {selected.capacity}</p>
                  </div>
                </div>

                <div className="detay-aciklama">
                  <p>{selected.description}</p>
                </div>

                <div className="detay-aksiyonlar" style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
                  <button
                    type="button"
                    onClick={() => go("update", selected.id)}
                  >
                    Bu etkinliği güncelle
                  </button>

                  <button
                    type="button"
                    onClick={() => go("events")}
                  >
                    Listeye dön
                  </button>
                </div>
              </article>
            )}
          </section>
        )}

        {/* ADIM 13: EKLE VE GÜNCELLEME FORMU BLOĞU */}
        {(page === "add" || page === "update") && (
          <section>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>

            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="title">Etkinlik Adı:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  maxLength={80}
                  required
                  style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="category">Kategori:</label>
                <select
                  id="category"
                  name="category"
                  required
                  style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
                >
                  <option value="">Kategori Seçin</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="date">Tarih:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="time">Saat:</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  required
                  style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="location">Yer:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="capacity">Kontenjan:</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  min={1}
                  required
                  style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label htmlFor="description">Açıklama:</label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  required
                  style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
                />
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button type="submit">
                  {page === "add" ? "Etkinlik Ekle" : "Güncellemeyi Kaydet"}
                </button>
                <button
                  type="button"
                  onClick={() => go(page === "update" && selectedId ? "detail" : "events", selectedId)}
                >
                  İptal
                </button>
              </div>
            </form>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <p>
            Ad Soyad: Utku Burak Sevimli
            <br />
            Okul No: 2416501090
            <br />
            2026
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;