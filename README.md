# Single Page To-Do Uygulaması (SPA)

## Proje Açıklaması: 
Bu proje, Vue 3 ve Composition API kullanılarak geliştirilmiş bir görev yönetim (Todo) tek sayfa uygulamasıdır (SPA). Görev ekleme, düzenleme, silme, tamamlama durumunu değiştirme ve sürükle-bırak (drag & drop) ile sıralama işlemlerini destekler. Veriler ve tema tercihi Local Storage üzerinde kalıcı olarak tutulmaktadır.

## Kullanılan Teknolojiler: 
* Vue 3 (Composition API, `<script setup>`)
* Pinia (State Management)
* Tailwind CSS (Stil ve Dark Mode yönetimi)
* Lucide Vue Next (İkon seti)
* Vite: (Geliştirme ve derleme aracı)

## Kurulum Adımları
Projeyi yerel ortamınıza klonlayıp bağımlılıkları yüklemek için terminalde aşağıdaki adımları uygulayın:

```bash 
# Projeyi klonlayın
git clone [REPO_URL](https://github.com/mehmettgokk/SPA.git)

# Proje klasörüne girin
cd SPA

# Gerekli paketleri yükleyin
npm install 

```
>
## Çalıştırma Komutları 

Geliştirme sunucusunu başlatmak için:

```bash
npm run dev
```

Komut çalıştıktan sonra tarayıcınızdan http://localhost:5173 adresine giderek projeyi görüntüleyebilirsiniz.

## Build Alma Adımları
Projeyi canlı ortama hazır hale getirmek ve optimize edilmiş üretim derlemesini oluşturmak için:

```bash
npm run build
```

## Proje Klasör Yapısı

```text
src/
├── components/     # UI bileşenleri (Header, TodoList, Modallar vb.)
├── composables/    # useToast, useTheme, useDragAndDrop fonksiyonları
├── stores/         # Pinia todoStore dosyası
├── views/          # HomeView sayfa görünümü
├── App.vue         # Ana kök bileşen
├── main.js         # Proje giriş noktası
└── style.css       # Tailwind CSS stilleri
```



