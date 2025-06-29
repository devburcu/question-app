function StartScreen({ onStart }) { // onStart propu, "Teste Başla" butonuna tıklandığında çalışacak fonksiyondur.
    return (
        <div className="start-screen">
            <h1 className="start-screen-title">10 Soruda Mini Test</h1>
            <button className="start-btn" onClick={onStart}>Teste Başla</button> {/* Bu butona tıklanırsa, dışarıdan gelen onStart fonksiyonu çalışır. */}
            <p className="info-text">Toplamda 10 sorudan oluşan bu testte her doğru cevap 10 puan. Her soru için 20 saniyeniz var. Süre dolmadan yanıt verin ve toplam puanınızı test sonunda görün!</p>
        </div>
    )
}

export default StartScreen;