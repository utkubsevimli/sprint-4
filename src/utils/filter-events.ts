import type { CampusEvent, Category } from "../types/campus-event";

/**
 * Başlıkta veya açıklamada aranan metni filtreler.
 * Türkçe karakter uyumluluğu için toLocaleLowerCase("tr-TR") kullanır.
 */
export function searchEvents(
  list: CampusEvent[],
  text: string
): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");
  if (!q) return list;

  return list.filter((e) => {
    const titleMatch = e.title.toLocaleLowerCase("tr-TR").includes(q);
    const descMatch = e.description.toLocaleLowerCase("tr-TR").includes(q);
    return titleMatch || descMatch;
  });
}

/**
 * Kategoriye göre filtreler.
 * Kategori boş metin ("") ise tüm listeyi, değilse eşleşenleri döner.
 */
export function filterByCategory(
  list: CampusEvent[],
  category: Category | ""
): CampusEvent[] {
  if (category === "") return list;
  return list.filter((e) => e.category === category);
}

/**
 * Verilen id'ye sahip tek bir etkinliği bulur, yoksa undefined döner.
 */
export function findEventById(
  list: CampusEvent[],
  id: string
): CampusEvent | undefined {
  return list.find((e) => e.id === id);
}