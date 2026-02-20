# Review & Improvement Criteria

Bu dosya, proje incelemeleri sırasında her seferinde kontrol edilecek kriterleri ve eklenmesi gereken özellikleri içerir.

## 🌍 Multilingual Infrastructure (Çok Dilli Yapı)

- [ ] **Altyapı Kurulumu:** Sayfa yapısının çok dilli desteğe (i18n) uygun hale getirilmesi.
- [ ] **Routing:** Dil parametresinin URL yapısına entegre edilmesi (örn: `/tr/about`, `/en/about`).
- [ ] **İçerik Ayrımı:** Hardcoded metinlerin belirlenip çeviri dosyalarına taşınmaya hazır hale getirilmesi.

## 🎨 Poyraz UI & Styling Kuralları

- [ ] **Saf Component Kullanımı:** `Poyraz UI` bileşenlerine (özellikle `Typography`) ekstra Tailwind sınıfları (font-size, font-weight vb.) **eklenmemeli**.
  - _Hatalı:_ `<Typography className="text-xl font-bold">`
  - _Doğru:_ `<Typography variant="h3">`
- [ ] **Tutarlılık:** Stil rehberine (`.agent/rules/style-guide.md`) tam uyum sağlanmalı. Renkler ve fontlar `globals.css` değişkenlerinden gelmeli.

## 🔗 Linkler, Butonlar ve İçerik Doğrulama

- [ ] **Hatalı Yönlendirmeler:** `SiteFooter.tsx`, `BlogSection.tsx` gibi bileşenlerdeki "Browse Store" gibi alakasız veya çalışmayan linkler düzeltilmeli.
  - _Örnek:_ "Browse Store" -> "Browse Projects" veya "View Github".
- [ ] **Gereksiz Butonlar:** İşlevsiz veya projede karşılığı olmayan butonlar kaldırılmalı.
- [ ] **Navigasyon Kontrolü:** Tüm linklerin `/components/layout/SiteNavbar.tsx` ile uyumlu çalıştığı doğrulanmalı.

## 🧹 Genel Kod Kalitesi

- [ ] **Temizlik:** Kullanılmayan importlar ve değişkenler temizlenmeli.
- [ ] **Tip Güvenliği:** TypeScript hataları giderilmeli.
