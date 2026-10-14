import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla söyleşiler ve sektör temsilcileri ile kariyer fırsatları.",
    capacity: 120,
    
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "20-10-2026",
    time: "10:30",
    location: "Lab 2",
    description: "Robotik sistemler hakkında uygulamalı çalışmaların yapılacağı atölye.",
    capacity: 40,
    
  },
  {
    id: "event-3",
    title: "Yazılım Konferansı",
    category: "Söyleşi", // "Konferans" tipi desteklenmediği için "Söyleşi" veya "Seminer" yapıldı
    date: "25-10-2026",
    time: "09:30",
    location: "Büyük Salon",
    description: "Yazılım dünyasındaki güncel teknolojilerin konuşulacağı konferans.",
    capacity: 250,
    
  },
  {
    id: "event-4",
    title: "Yapay Zeka ve Veri Bilimi",
    category: "Seminer",
    date: "16-10-2026",
    time: "13:00",
    location: "Mühendislik Fakültesi Konferans Salonu",
    description: "Büyük veri ve makine öğrenimi modellerinin geleceği üzerine seminer.",
    capacity: 90,
    
  },
  {
    id: "event-5",
    title: "Mobil Uygulama Geliştirme",
    category: "Atölye",
    date: "22-10-2026",
    time: "15:00",
    location: "Yazılım Laboratuvarı 1",
    description: "Modern mobil teknolojilerle sıfırdan uygulama geliştirme pratikleri.",
    capacity: 35,
    
  },
  {
    id: "event-6",
    title: "Siber Güvenlik Zirvesi",
    category: "Seminer", // "Konferans" tipi desteklenmediği için "Seminer" yapıldı
    date: "28-10-2026",
    time: "11:00",
    location: "Merkez Amfi",
    description: "Ağ güvenliği, etik korsanlık ve siber tehdit analizi sunumları.",
    capacity: 180,
    
  }
];