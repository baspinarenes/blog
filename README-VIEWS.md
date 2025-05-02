# Blog Görüntüleme Sayacı Yapılandırması

Bu belge, blog entryleri için TR ve EN dil bazlı görüntüleme sayacını Supabase kullanarak nasıl yapılandıracağınızı açıklar.

## Adımlar

### 1. Supabase Projesi Oluşturma

1. [Supabase](https://supabase.com/) hesabınızı oluşturun veya mevcut hesabınıza giriş yapın.
2. Yeni bir proje oluşturun.
3. `supabase_schema.sql` dosyasındaki SQL kodunu Supabase SQL editöründe çalıştırarak veritabanı şemasını oluşturun.

### 2. Çevre Değişkenlerini Ayarlama

1. Supabase projenizden URL ve API anahtarını alın. 
2. Bu bilgileri `.env` dosyanıza aşağıdaki şekilde ekleyin:

```
SUPABASE_URL=https://your-project-url.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 3. Kod Değişiklikleri

Bu entegrasyon için aşağıdaki dosyalar oluşturuldu veya değiştirildi:

1. `src/lib/supabase.ts`: Supabase client'ı ve görüntüleme sayısı işlevleri
2. `src/utils/views.ts`: Client-side görüntüleme sayacı yardımcı işlevleri
3. `src/pages/api/increment-view.ts`: Görüntüleme sayısını artırmak için API endpoint'i
4. `src/pages/api/get-views.ts`: Görüntüleme sayılarını almak için API endpoint'i
5. `src/pages/[lang]/index.astro`: Ana sayfada görüntüleme sayılarını göstermek için düzenlemeler
6. `src/pages/[lang]/[category]/[entry]/index.astro`: Entry detay sayfasında görüntüleme sayacı ve artırma işlevleri

### 4. Nasıl Çalışır?

1. Kullanıcı bir entry sayfasını ziyaret ettiğinde, client-side bir script sayaç API'sini çağırarak görüntüleme sayısını artırır.
2. Anasayfada, her entry için görüntüleme sayıları API'den toplu olarak alınır ve tabloda gösterilir.
3. Veriler Supabase'de saklanır ve her dil (TR/EN) için ayrı görüntüleme sayıları tutulur.

### 5. Veritabanı Şeması

`entry_views` tablosu aşağıdaki alanları içerir:

- `id`: Otomatik artan birincil anahtar
- `entry_id`: Entry'nin benzersiz ID'si
- `locale`: Dil kodu (tr/en)
- `views`: Görüntüleme sayısı
- `created_at`: Kaydın oluşturulma tarihi
- `updated_at`: Kaydın son güncellenme tarihi

Her entry_id ve locale kombinasyonu için benzersiz bir kayıt tutulur.

### 6. Test Etme

1. Geliştirme sunucusunu başlatın: `yarn dev`
2. Bir entry sayfasını ziyaret edin.
3. Sayfayı yenileyin ve görüntüleme sayacının artıp artmadığını kontrol edin.
4. Anasayfayı ziyaret ederek tabloların görüntüleme sayılarını gösterip göstermediğini kontrol edin.

### Sorun Giderme

- Supabase bağlantı hatası alırsanız, `.env` dosyasındaki URL ve API anahtarını kontrol edin.
- API çağrıları başarısız olursa, konsol hata mesajlarını kontrol edin. 