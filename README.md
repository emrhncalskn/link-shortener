## Link Shortener

Kısa link üretme, yönetme, istatistik görüntüleme ve profil yönetimi özelliklerine sahip bir Next.js 15 uygulaması.

## İçerik

1. Özellikler
2. Gereksinimler
3. Kurulum (Yerel Geliştirme)
4. Ortam Değişkenleri (.env.local)
5. Çalıştırma Komutları
6. Build & Production
7. Proje Yapısı
8. Geliştirme Notları

## 1. Özellikler

- Kısa link oluşturma
- Link listesi ("linklerim") ve düzenleme / silme
- Kısa kod güncelleme (çakışma kontrolü backend tarafından beklenir)
- Detay / istatistik sayfası: `/link/detay/:shortCode`
- Profil görüntüleme & güncelleme (kullanıcı adı, opsiyonel şifre) & profil silme
- JWT tabanlı oturum (token + user cookie senkronizasyonu)
- Korunan & herkese açık rotalar (middleware ile)
- React Query ile veri önbellekleme
- TailwindCSS 4 + shadcn tarzı UI bileşenleri

## 2. Gereksinimler

- Node.js >= 18 (Önerilen LTS)
- npm (veya yarn / pnpm) - örnekler npm ile verilmiştir
- Çalışan bir backend API (README sadece frontend kurulumunu kapsar)

## 3. Kurulum (Yerel Geliştirme)

```bash
git clone https://github.com/emrhncalskn/link-shortener.git
cd link-shortener/link-shortener
npm install
cp .env.example .env.local # (Eğer .env.example yoksa aşağıdaki örneği manuel oluşturun)
```

`.env.example` dosyanız yoksa bir sonrakindeki örneği kullanarak `.env.local` oluşturun.

## 4. Ortam Değişkenleri (.env.local)

Uygulama aşağıdaki değişkenleri bekler:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
JWT_SECRET=super-secret-dev-key
```

Açıklama:

- `NEXT_PUBLIC_API_URL`: Frontend'in istek atacağı backend endpoint baz adresi. (Public prefix gerekli.)
- `JWT_SECRET`: Middleware içindeki token doğrulaması ve `utils/jwt.ts` fonksiyonları için paylaşılan gizli anahtar (backend ile aynı olmalı ya da token backend üretip burada sadece doğrulanıyorsa doğrulamada kullanılan secret olmalı).

## 5. Çalıştırma Komutları

Geliştirme sunucusu:

```bash
npm run dev
```

Tarayıcıdan: http://localhost:3000

Lint:

```bash
npm run lint
```

## 6. Build & Production

Production build almak:

```bash
npm run build
```

Çalıştırmak:

```bash
npm start
```

Not: Production ortamında `.env.local` yerine sistem ortam değişkenleri veya `.env` kullanabilirsiniz. `NEXT_PUBLIC_` ile başlayanlar istemci bundle'ına gömülür; gizli kalması gereken değerler için bu prefix'i kullanmayın.

## 7. Proje Yapısı (Özet)

```
src/
	app/               # Next.js (app router) segmentleri
	constants/         # Rota ve sabit tanımları
	features/          # Feature bazlı modüller (link, profile, common ...)
	middleware.ts      # Auth & yönlendirme kontrolü
	utils/             # JWT vb. yardımcılar
```

Önemli Rotalar:

- Korunan: /profil, /olustur, /linklerim, /link/detay/:shortCode
- Public: /giris, /kayit
