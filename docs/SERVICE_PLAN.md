# poyrazavsever.com - Header & Client Portal Architecture

Bu doküman, poyrazavsever.com ana sitesindeki global navigasyon yapısını ve müşteri kazanım hunisini (Client Portal) detaylandırmaktadır.

---

## 2. Client Portal (Dropdown) Kurgusu ve Sayfa Mantıkları

"Client Portal" menüsü, potansiyel bir müşterinin hizmetleri incelemesinden, portal detaylarına ve mantığını kavramasından ve anlaşma sağlanıp projeye başlanmasına kadar olan "Satış ve Onboarding Hunisi" (Sales Funnel) olarak kurgulanmıştır.

### 2.1. Client Login ↗
* **URL:** `portal.poyrazavsever.com/login`
* **Açıklama:** Sadece anlaşma sağlanan ve onboarding süreci tamamlanan aktif müşterilerin kullanımına açıktır.
* **Mantık:** Müşteri buraya tıkladığında ana siteden ayrılır ve senin geliştirdiğin özel SaaS workspace platformuna giriş yapar. Proje takibi, faturalandırma ve revizyon süreçlerinin tamamı kapalı devre bu sistemden yürütülür.

### 2.2. My Services
* **Açıklama:** "Full-Stack Development, UI/UX Design" alt başlığına sahip hizmet tanıtım sayfası.
* **Mantık:** Senin hangi sorunları çözdüğünü net bir şekilde anlatan sayfa. Next.js, Node.js ve React Native yetkinliklerin ile baştan uca ürün geliştirme kapasiteni, aynı zamanda Figma üzerindeki tasarım yeteneklerini vitrine çıkardığın alandır. Teknolojiden çok "Çözüm ve Değer" odaklı bir anlatım içerir.

### 2.3. Workflow & Process
* **Açıklama:** "How I take a project from zero to production" (Bir projeyi sıfırdan canlıya nasıl alıyorum?) alt başlığına sahip süreç sayfası.
* **Mantık:** Müşteriye güven veren en önemli sayfa. Keşif (Discovery), Tasarım (UI/UX), Geliştirme (Development Sprints) ve Canlıya Alma (Launch) süreçlerinin adım adım nasıl işlediğini şeffafça gösterir. Müşteri, projeye başladığında neyle karşılaşacağını bu sayfadan öğrenir.

### 2.4. Pricing & Retainers
* **Açıklama:** "Transparent pricing policy and packages" alt başlığına sahip fiyatlandırma sayfası.
* **Mantık:** Bütçesi düşük olan veya senin çalışma standartlarına uymayan projeleri daha görüşme aşamasına geçmeden filtreleme aracıdır. Proje bazlı minimum bütçeler, tasarım sprint ücretleri ve proje sonrasındaki aylık bakım/sunucu (Retainer) paketleri burada şeffafça sergilenir.

### 2.5. Book a Discovery Call
* **Açıklama:** "Schedule a meeting via Calendly" alt başlığına sahip toplantı sayfası.
* **Mantık:** Müşterinin bütçesi ve vizyonu uygunsa, ilk tanışma ve proje brief'i alma adımıdır. Doğrudan Calendly entegrasyonu ile senin müsait olduğun zaman dilimlerinde (Örn: Sadece salı ve perşembe öğleden sonraları) 15-30 dakikalık Google Meet görüşmeleri ayarlanmasını sağlar.

### 2.6. Project Inquiry Form
* **Açıklama:** "Submit your brief for a custom proposal" alt başlığına sahip detaylı form sayfası.
* **Mantık:** Toplantı yapmak istemeyen veya toplantı öncesi tüm teknik/bütçesel detayları yazılı iletmek isteyen müşteriler içindir. İçerisinde proje hedefleri, bütçe aralığı, istenen platformlar (Web, Mobil) ve tahmini teslim süresi gibi filtreleyici sorular barındıran kapsamlı bir formdur.

---

## 3. Akış Özeti (User Flow)
1.  **Ziyaretçi** `My Services` ve `Workflow` sayfalarını inceler.
2.  Çalışma prensiplerini ve `Pricing` kısmındaki bütçe aralıklarını kabul eder.
3.  Eğer müsaitlik durumun (Availability) açıksa, `Book a Discovery Call` veya `Project Inquiry Form` üzerinden sana ulaşır.
4.  Görüşme olumlu geçer ve anlaşma sağlanırsa, ona özel açılan hesap ile `Client Login` üzerinden portal sistemine dahil olur.


---

# Workflow & Process: Sıfırdan Canlıya Proje Yönetimi

Bir projenin başarılı olması, yazılan kodun kalitesi kadar sürecin nasıl yönetildiğine de bağlıdır. E-posta zincirlerinde kaybolan revizyonlar veya belirsiz teslim tarihlerini ortadan kaldırmak için, tüm süreci kendi ekosistemim üzerinden uçtan uca yönetiyorum. 

İşte fikrinizi canlı bir ürüne dönüştürme yolculuğumuz:

### 1. Tanışalım (Discovery & Alignment)
Her harika proje, doğru bir iletişimle başlar. Sizin vizyonunuzu ve benim teknik altyapımın uyumunu test ettiğimiz ilk aşamadır.
* **Aksiyon:** `Project Inquiry Form` üzerinden projenizin detaylarını iletirsiniz veya doğrudan 15-30 dakikalık bir `Discovery Call` (tanışma toplantısı) ayarlarsınız.
* **Çıktı:** Projenin hedefleri, tahmini bütçe aralığı ve teknoloji yığınımız (Web, Mobil, Sistem Mimarisi) hakkında ortak bir karara varılır.

### 2. Sipariş Oluştur (Proposal & Agreement)
Beklentilerin netleştiği ve profesyonel çerçevenin çizildiği adımdır. Sürpriz maliyetlere veya uzayan takvimlere yer bırakmıyoruz.
* **Aksiyon:** Toplantı sonrası size özel, detaylı bir proje teklifi (Proposal) sunulur. Bu teklifte zaman çizelgesi, kullanılacak teknolojiler ve ödeme takvimi şeffafça yer alır.
* **Çıktı:** Teklif onaylanır, başlangıç ödemesi (deposit) yapılır ve geliştirme takvimi kilitlenir.

### 3. Portala Giriş Yap (The Onboarding)
İşte bu aşamada standart bir "freelancer" deneyiminden ayrılıyoruz. Tüm projenin komuta merkezine adım atıyorsunuz.
* **Aksiyon:** Anlaşma sağlandığı an, size özel `portal.poyrazavsever.com` üzerinden bir müşteri hesabı (Client Login) oluşturulur.
* **Çıktı:** Artık tüm sözleşmeleriniz, faturalarınız, toplantı notlarınız ve proje ilerleyişiniz tek bir güvenli panel üzerinden erişilebilir hale gelir.

### 4. Brief Gönder & Tasarım (Requirements & UI/UX)
Kodlamaya geçmeden önce, ne inşa edeceğimizin kusursuz bir planını çiziyoruz.
* **Aksiyon:** Portal içerisindeki sistem üzerinden elinizdeki marka materyallerini (logo, metinler, renk paleti) ve detaylı brief'i iletirsiniz.
* **Çıktı:** İhtiyaca göre Figma üzerinden yüksek sadakatli (high-fidelity) ekran tasarımları ve prototipler hazırlanır. Kod yazılmadan önce projenin bitmiş halini görür ve onaylarsınız.

### 5. Teslim Al (Development, QA & Launch)
Tasarımın hayata geçtiği ve projenin canlıya alındığı final aşaması.
* **Aksiyon:** Geliştirme sprintleri başlar. Portal üzerinden hangi görevlerin tamamlandığını şeffaf bir şekilde takip edebilirsiniz. Proje, test sunucularına yüklenir ve birlikte son kalite kontrol (QA) testlerini yaparız.
* **Çıktı:** Tüm testler geçildikten sonra proje ana sunucuda (Production) canlıya alınır. Kaynak kodlar ve sistem dokümantasyonu size teslim edilir. (İsteğe bağlı olarak aylık bakım/Retainer sürecine geçiş yapılır).