# React Quiz Uygulaması

Bu proje, kullanıcıların çoktan seçmeli soruları cevapladığı, zaman sınırlı ve animasyon destekli bir **React quiz uygulamasıdır**. Modern tasarım öğeleri ve kullanıcı deneyimini artıran animasyonlarla desteklenmiştir.

---

## 🚀 Kullanılan Teknolojiler

- **React**
- **Framer Motion** 
- **CSS** 
- **JavaScript** 

---

## 🎯 Özellikler

- Her soru için 20 saniyelik zaman sınırı
- Süre bitince otomatik olarak bir sonraki soruya geçiş
- Süre bittiğinde uyarı animasyonu
- Doğru/yanlış/boş sayısına göre skor hesaplama
- İlerleme çubuğu (Progress Bar)
- Testi yeniden başlatma özelliği
- Kullanıcının verdiği cevapları inceleyebileceği **Review** ekranı
- Sayfa geçişlerinde **Framer Motion** ile geçiş animasyonları
- Responsive tasarım

---

## 📁 Klasör Yapısı

```plaintext
 question-app/
├── Components/                    
│   ├── ProgressBar.jsx       
│   ├── QuestionCard.jsx       
│   ├── ResultScreen.jsx      
│   ├── ReviewScreen.jsx       
│   ├── StartScreen.jsx       
│   └── TimerAlert.jsx     
├── Css/
│   ├── MediaQuery.css       
│   ├── ProgressBar.css
│   ├── QuestionCard.css    
│   ├── ResultScreen.css   
│   ├── ReviewScreen.css    
│   ├── StartScreen.css   
│   └── TimerAlert.css
├── data/
│   └── testData.js
├── App.css
├── App.jsx
└── main.jsx
```

---

## ⚙️ Kullanım Talimatları

1. Projeyi indirin veya klonlayın:

```
git clone https://github.com/devburcu/question-app.git
```

2. Proje klasörüne girin:
```
cd question-app
```

3. Gerekli paketleri yükleyin:
```
npm install
```

4. Geliştirme sunucusunu başlatın:
```
npm run dev
```

---

## 💡 Geliştirici Notları

- Her soru önce 1 saniye sonra görünür, ardından şıklar 3 saniye gecikmeli gelir. Toplamda şıklar, 20 saniye başladıktan 4 saniye sonra görünür.

- Kullanıcı cevap vermezse süre sonunda otomatik olarak "boş cevap" sayılır ve sonraki soruya geçilir.

- Review mode, kullanıcı testi tamamlandıktan sonra cevaplarını gözden geçirmesine olanak sağlar.