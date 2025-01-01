// Snackbar mesajını gösteren fonksiyon
// Parametre olarak gösterilecek mesajı alır ve ekranda 3 saniye boyunca gösterir
function showSnackbar(message) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.classList.add('show');
    setTimeout(() => {
        snackbar.classList.remove('show');
    }, 3000);
}

// Ana VKİ hesaplama fonksiyonu
// Kullanıcının girdiği kilo, boy, yaş ve cinsiyet bilgilerini alarak VKİ hesaplar
// Sonuçları ekranda gösterir ve kişiye özel tavsiyeleri günceller
function calculateBMI() {
    // Form verilerini al ve sayısal değerlere dönüştür
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;

    // Boş alan kontrolü
    if (!weight || !height || !age) {
        showSnackbar('Lütfen tüm alanları doldurun!');
        return;
    }

    // Kilo değeri kontrolü (maksimum 3 haneli)
    if (weight > 999 || weight < 1) {
        showSnackbar('Kilo 1 ile 999 kg arasında olmalıdır!');
        return;
    }

    // Boy değeri kontrolü (maksimum 300 cm)
    if (height > 300 || height < 10) {
        showSnackbar('Boy 10 ile 300 cm arasında olmalıdır!');
        return;
    }

    // Yaş değeri kontrolü (maksimum 200)
    if (age > 200 || age < 1) {
        showSnackbar('Yaş 1 ile 200 arasında olmalıdır!');
        return;
    }

    // Sonuç ve tavsiye bölümlerini görünür yap
    document.getElementById('result').style.display = 'block';
    document.getElementById('recommendations').style.display = 'block';

    // VKİ hesaplama (kg/m²)
    const bmi = weight / ((height / 100) * (height / 100));
    const bmiValue = document.getElementById('bmi-value');
    const bmiStatus = document.getElementById('bmi-status');
    const idealWeight = document.getElementById('ideal-weight');

    // Tüm VKİ kategorilerinden aktif sınıfını kaldır
    document.querySelectorAll('.info-item').forEach(item => {
        item.classList.remove('active');
    });

    // VKİ değerini göster (999.9'dan büyükse '>999.9' olarak göster)
    const bmiFixed = bmi > 999.9 ? '999.9>' : bmi.toFixed(1);
    bmiValue.innerHTML = `<span class="bmi-integer">${bmiFixed}</span>`;
    
    // VKİ kategorisini belirle ve ilgili kategoriyi vurgula
    let status = '';
    let activeIndex = 0;

    if (bmi < 18.5) {
        status = 'Zayıf';
        activeIndex = 0;
    } else if (bmi < 25) {
        status = 'Normal';
        activeIndex = 1;
    } else if (bmi < 30) {
        status = 'Fazla Kilolu';
        activeIndex = 2;
    } else if (bmi < 35) {
        status = 'Obez (1)';
        activeIndex = 3;
    } else if (bmi < 40) {
        status = 'Obez (2)';
        activeIndex = 4;
    } else {
        status = 'Morbid Obez';
        activeIndex = 5;
    }

    // Durum bilgisini güncelle
    bmiStatus.textContent = status;

    // İlgili VKİ kategorisini vurgula
    const infoItems = document.querySelectorAll('.info-item');
    infoItems[activeIndex].classList.add('active');

    // İdeal kilo aralığını hesapla ve göster (Boy için minimum ve maksimum VKİ değerlerine göre)
    const minIdealWeight = (18.5 * (height * height / 10000)).toFixed(1);
    const maxIdealWeight = (24.9 * (height * height / 10000)).toFixed(1);
    idealWeight.textContent = `${minIdealWeight} kg - ${maxIdealWeight} kg`;

    // Kişiye özel tavsiyeleri güncelle
    updateRecommendations(age, bmi, gender, status);
}

// Kişiye özel tavsiyeleri güncelleyen fonksiyon
// Yaş, VKİ, cinsiyet ve durum bilgilerine göre özel tavsiyeler oluşturur
function updateRecommendations(age, bmi, gender, status) {
    // Yaşa özel tavsiyeler
    let ageAdvice = '';
    if (age < 30) {
        ageAdvice = `
• Genç yaşta metabolizmanız hızlıdır, bunu avantaja çevirin
• Haftada en az 3-4 kez 45-60 dakikalık kardiyovasküler egzersizler yapın
• Protein ihtiyacınız günlük vücut ağırlığınızın 1.6-2.0 gramı kadardır
• Kemik yoğunluğunuzu artırmak için ağırlık çalışmaları yapın
• B12, D vitamini ve demir seviyelerinizi düzenli kontrol ettirin
• Uyku düzeninizi oturtun, gece 23:00-07:00 arası uyumaya özen gösterin
• Sosyal medya ve ekran kullanımınızı günde 2 saatle sınırlayın
• Haftada en az 2 kez HIIT (Yüksek Yoğunluklu İnterval Antrenman) yapın
• Alkol tüketimini minimize edin, sigara kullanmayın
• Günlük 15 dakika güneş ışığı alın`;
    } else if (age < 50) {
        ageAdvice = `
• Metabolizma yavaşlamaya başladığı için kalori alımınızı %10-15 azaltın
• Kas kaybını önlemek için haftada 3 kez kuvvet antrenmanı yapın
• Eklem sağlığı için glukozamin ve kondroitin takviyesi düşünün
• Günlük protein ihtiyacınız vücut ağırlığınızın 1.4-1.8 gramı kadardır
• Omega-3 takviyesi için doktorunuza danışın
• Stres yönetimi için yoga veya pilates yapın
• Kolesterol ve tansiyon kontrollerinizi yılda 2 kez yaptırın
• Günde 30 dakika tempolu yürüyüş yapın
• Akşam 8'den sonra yemek yemeyin
• Magnezyum ve çinko takviyesi için doktorunuza danışın
• Her 3 saatte bir ara öğün yapın
• Kafein tüketimini günde 2 fincanla sınırlayın`;
    } else {
        ageAdvice = `
• Kemik erimesini önlemek için kalsiyum ve D3 vitamini takviyesi alın
• Eklem dostu sporlar yapın: yüzme, pilates, tai chi
• Günde 20-30 dakika güneş ışığı alın
• Protein ihtiyacınız günlük vücut ağırlığınızın 1.2-1.6 gramı kadardır
• Düşme riskini azaltmak için denge egzersizleri yapın
• Kognitif fonksiyonlar için bulmaca çözün, yeni hobiler edinin
• Kan şekeri kontrolünüzü sık sık yaptırın
• Her gün 20 dakika hafif stretching yapın
• Probiyotik takviyesi için doktorunuza danışın
• Düzenli göz ve işitme kontrolleri yaptırın
• Günlük tuz alımınızı 5 gramla sınırlayın
• Her öğünde protein tüketin
• Merdiven çıkma gibi günlük aktiviteleri artırın`;
    }

    // VKİ'ye özel tavsiyeler
    let bmiAdvice = '';
    if (bmi < 18.5) {
        bmiAdvice = `
• Sağlıklı kilo almak için günlük 500 kalori fazladan alın
• Yüksek kalorili sağlıklı besinler tüketin: kuruyemişler, avokado, zeytinyağı
• Protein ağırlıklı beslenin: yumurta, et, balık, baklagiller
• Günde en az 3 ana, 3 ara öğün yapın
• Yatmadan önce protein shake için
• Compound egzersizler yapın: squat, deadlift, bench press
• Metabolizmayı hızlandırmak için BCAA takviyesi alın
• Sindirimi kolaylaştırmak için probiyotik tüketin
• Smoothie ve shake'lerle kalori alımını artırın
• Stres seviyenizi düşük tutun, kortizol yüksekliği kilo almayı zorlaştırır
• Kreatin takviyesi için doktorunuza danışın
• Her öğünde kompleks karbonhidrat tüketin`;
    } else if (bmi < 25) {
        bmiAdvice = `
• Mevcut sağlıklı kilonuzu korumak için günlük kalori ihtiyacınızı hesaplayın
• Haftada 150 dakika orta şiddetli veya 75 dakika yüksek şiddetli egzersiz yapın
• Öğün porsiyonlarınızı tabağın dörtte birlik bölümlerine göre ayarlayın
• Protein, karbonhidrat ve yağ dengenizi 30-40-30 oranında tutun
• Su tüketiminizi kilonuzun 30'da biri kadar (ml) yapın
• Ara öğünlerde meyve ve yağlı tohum kombinasyonları tercih edin
• Haftada en az 2 kez balık tüketin
• Probiyotik yoğurt ve kefir tüketin
• Farklı renklerde sebze ve meyveleri günlük diyetinize ekleyin
• Glisemik indeksi düşük karbonhidratları tercih edin
• Yemekleri yavaş yiyin ve iyi çiğneyin
• Düzenli uyku düzenini koruyun`;
    } else if (bmi < 30) {
        bmiAdvice = `
• Günlük 500-750 kalori açığı oluşturun
• Her ana öğünde protein tüketin (yumurta, tavuk, balık, baklagiller)
• Şeker ve işlenmiş gıdaları tamamen hayatınızdan çıkarın
• Günde en az 12.000 adım hedefleyin
• Her sabah aç karnına 30 dakika yürüyüş yapın
• Öğle yemeğinden sonra 10 dakika yürüyün
• Ara öğünlerde protein barı veya yoğurt tercih edin
• Akşam 7'den sonra yemek yemeyin
• Haftada 3 kez HIIT kardiyosu yapın
• Yemeklerden 30 dakika önce 1 bardak su için
• Lifli gıdaları artırın: yulaf, kinoa, chia tohumu
• Porsiyon kontrolü için küçük tabaklar kullanın
• Stres yönetimi için meditasyon yapın
• Uykusuzluk kilo vermeyi zorlaştırır, 7-8 saat uyuyun`;
    } else {
        bmiAdvice = `
• Mutlaka bir beslenme uzmanı ve endokrinolog ile çalışın
• Günlük kalori alımınızı 1500-1800 arasında tutun
• Her 2-3 saatte bir öğün yapın, kan şekerini dengede tutun
• Metabolik sendrom riski için düzenli kan tahlili yaptırın
• Eklem sağlığı için su içi egzersizleri yapın
• Günde 3 kez 20 dakika tempolu yürüyüş yapın
• Her sabah 10 dakika germe egzersizleri yapın
• Şeker, beyaz un ve işlenmiş gıdaları tamamen bırakın
• Öğünlerde tabağın yarısını sebze ile doldurun
• Her öğünde protein tüketin
• Yemek yerken ekran karşısında olmayın
• Uykuya dalma sorununuz varsa melatonin takviyesi için doktorunuza danışın
• Stres yemesine karşı psikolojik destek alın
• Bel çevresi ölçümünüzü haftalık takip edin
• Tansiyon ve kolesterol değerlerinizi düzenli kontrol ettirin`;
    }

    // Cinsiyete özel tavsiyeler
    let genderAdvice = '';
    if (gender === 'male') {
        genderAdvice = `
Erkeklere Özel Tavsiyeler:
• Prostat sağlığı için domates ve domates ürünleri tüketin
• Testosteron seviyenizi düzenli kontrol ettirin
• Günlük çinko alımınıza dikkat edin
• Kırmızı et tüketimini haftada 2-3 porsiyonla sınırlayın
• Düzenli prostat kontrolü yaptırın
• Kas kütlesi için protein alımını artırın
• Egzersiz sonrası recovery sürecine önem verin
• Kalp sağlığı için balık yağı takviyesi düşünün
• Stres yönetimi için düzenli egzersiz yapın`;
    } else {
        genderAdvice = `
Kadınlara Özel Tavsiyeler:
• Demir eksikliği için koyu yeşil yapraklı sebzeler tüketin
• Kemik sağlığı için kalsiyum açısından zengin besinler alın
• Düzenli meme kontrolü yaptırın
• Menopoz öncesi ve sonrası için hormon kontrolü yaptırın
• Folat açısından zengin besinler tüketin
• PMS döneminde magnezyum takviyesi için doktorunuza danışın
• Pelvik taban egzersizleri yapın
• Östrojen dengeniz için soya ürünlerinden kaçının
• Meme sağlığı için alkol tüketimini sınırlayın`;
    }

    // Genel sağlık tavsiyeleri
    const generalAdvice = `
Günlük Alışkanlıklar:
• Günde en az 2-2.5 litre su için
• Her sabah güne 1 bardak ılık limonlu su ile başlayın
• Kahvaltıyı asla atlamayın
• Öğünler arasında en az 3-4 saat olsun
• Yemekleri iyi çiğneyin, her lokma için 20-30 kez
• Akşam yemeğini yatmadan 3 saat önce bitirin
• Günde 5 porsiyon sebze ve meyve tüketin
• Probiyotik besinler tüketin (kefir, turşu, yoğurt)

Beslenme Önerileri:
• Rafine şeker yerine doğal tatlandırıcılar kullanın
• Trans yağlardan tamamen kaçının
• Omega-3 için haftada 2-3 kez balık tüketin
• Antioksidan için renkli sebze ve meyveler seçin
• Glutensiz tahılları diyetinize ekleyin
• Fermente besinler tüketin
• Bakliyatları haftada 2-3 kez tüketin
• Yağlı tohumları (badem, ceviz, chia) günlük tüketin

Egzersiz ve Aktivite:
• Günde minimum 30 dakika hareket edin
• Haftada 2-3 kez kuvvet antrenmanı yapın
• Her saat başı 5 dakika hareket edin
• Asansör yerine merdiven kullanın
• Esneme hareketleri ile güne başlayın
• Masa başı çalışıyorsanız duruş egzersizleri yapın
• Nefes egzersizleri ile stresi yönetin

Yaşam Tarzı Önerileri:
• Düzenli uyku-uyanma saatleri belirleyin
• Yatak odanızı tamamen karanlık yapın
• Elektronik cihazları yatmadan 1 saat önce bırakın
• Düzenli sosyal aktivitelere katılın
• Hobiler edinin
• Günlük 10-15 dakika meditasyon yapın
• Düzenli check-up yaptırın
• Stresi yönetmek için profesyonel destek alın

Takip ve Kontrol:
• Haftalık kilo ve ölçü takibi yapın
• Tansiyonunuzu düzenli ölçün
• Uyku kalitenizi takip edin
• Su tüketiminizi not alın
• Besin günlüğü tutun
• Egzersiz programınızı kaydedin
• Ruh halinizi günlük not edin`;

    // Tavsiyeleri HTML'e yerleştir
    document.getElementById('age-specific-advice').textContent = ageAdvice;
    document.getElementById('bmi-specific-advice').textContent = bmiAdvice;
    document.getElementById('general-advice').textContent = genderAdvice + '\n\n' + generalAdvice;
}

// Enter tuşuna basıldığında hesaplama yapılmasını sağlayan olay dinleyici
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calculateBMI();
    }
});

// Sayfa yüklendiğinde sonuç ve tavsiye bölümlerini gizleyen olay dinleyici
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('result').style.display = 'none';
    document.getElementById('recommendations').style.display = 'none';
}); 