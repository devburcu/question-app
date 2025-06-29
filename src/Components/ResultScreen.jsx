import { motion } from "framer-motion"; // Framer Motion kütüphanesinden animasyonlu öğeler oluşturmak için kullanılır.
import Confetti from "react-confetti"; // Kutlama için kullanılan konfeti efektidir.
import { useEffect, useState } from "react"; // Gerekli kütüphaneleri içe aktarıyoruz

function ResultScreen({ totalQuestions, score, answers, onRestart, onReview }) {
    const maxScore = totalQuestions * 10; // Toplam puan hesaplaması
    const [showConfetti, setShowConfetti] = useState(false); // Konfeti gösterilsin mi? false olarak başlar

    // Konfeti Efekti için useEffect
    useEffect(() => {
        if (score === totalQuestions) { // Eğer tüm sorular doğruysa, konfeti gösterilir.
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 5000); // 5 saniye sonra konfeti durur
            return () => clearTimeout(timer);
        }
    }, [score, totalQuestions]);

    // Doğru cevap sayısına göre kullanıcıya Gösterilecek Mesajlar
    let message = "";
    if (score === 10) {
        message = "Mükemmel! Tüm soruları doğru cevapladın!";
    } else if (score >= 8) {
        message = "Harika bir sonuç!";
    } else if (score >= 6) {
        message = "İyi iş çıkardın, biraz daha dikkat yeterli!";
    } else if (score >= 4) {
        message = "Daha iyisini yapabilirsin, denemeye devam!";
    } else {
        message = "Bu sadece bir başlangıç! Tekrar dene!";
    }

    const validAnswers = answers || []; // Eğer cevap yoksa, boş bir dizi kullanılır.
    const emptyCount = validAnswers.filter(a => a === null).length; // emptyCount; null olanlar cevaplanmamış sorular
    const wrongCount = totalQuestions - (score + emptyCount); // Yanlışlar, toplam sorulardan doğru ve boşlar çıkarılarak hesaplanır.
    return (
        <>
            {showConfetti && ( // Konfetinin;
                <Confetti
                    numberOfPieces={700}       // Parça sayısı
                    gravity={0.2}              // Düşüş hızı
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}            // Tek seferlik
                    tweenDuration={1000}       // Yavaşça kaybolması için
                />
            )}
            <motion.div // Framer Motion ile giriş animasyonu: önce küçültülmüş ve saydam başlar, sonra büyür ve görünür hale gelir.
                className="result-screen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}>
                {/* Sonuç Bilgileri ve Butonlar */}
                <div className='result-card'>
                    <h2>Testi Tamamladınız!</h2>
                    <p>✅ Doğru: {score}</p>
                    <p>❌ Yanlış: {wrongCount}</p>
                    <p>⏳ Boş: {emptyCount}</p>
                    <p className="score-text">Toplam Puan: {score * 10} / {maxScore}</p>
                    <p className="result-message">{message}</p>
                    <div className="buttons">
                        <button className="show-answer-btn" onClick={onReview}>Cevapları Gör</button> {/* Kullanıcı cevapları incelemek isterse onReview fonksiyonu çalışır  */}
                        <button className="restart-btn" onClick={onRestart}>Tekrar Başla</button>    {/* Quiz’i baştan başlatır, onRestart tetiklenir. */}
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default ResultScreen;