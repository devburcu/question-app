import React, { useState } from 'react'; // Gerekli kütüphaneleri içe aktarıyoruz
import { motion } from 'framer-motion'; // Animasyon için kullanıyoruz

function ReviewScreen({ questions, answers, onBack }) {

  const [selectedIndex, setSelectedIndex] = useState(0); // Şu anda hangi soru seçiliyse onun indeksini tutar. ilk soru (0) seçili başlar.

  // Her soru kutusunun rengini belirleyen fonksiyon
  const getBoxColor = (index) => {
    const userAnswer = answers[index]; // Kullanıcının verdiği cevap
    const correctAnswer = questions[index].answer; // Doğru cevap

    if (userAnswer === null) return 'gray'; // Cevap verilmemişse gri kutu
    return userAnswer === correctAnswer ? 'green' : 'red'; // Doğruysa yeşil, yanlışsa kırmızı
  };

  const selectedQuestion = selectedIndex !== null ? questions[selectedIndex] : null; // Kullanıcının o an seçtiği sorunun ve verdiği cevabın verisi alınır.
  const selectedAnswer = selectedIndex !== null ? answers[selectedIndex] : null; // Herhangi bir şey seçilmemişse null olur.

  return (
    <div className="review-screen"> {/* tüm içeriklerin bulunduğu div */}
      <h2>Cevaplar</h2>
      <div className="question-boxes"> {/* Her bir soruyu temsil eden kutular. */}
        {questions.map((_, index) => (
          <div
            key={index}
            className={`question-box ${getBoxColor(index)} ${selectedIndex === index ? 'selected' : ''}`} // Rengi getBoxColor fonksiyonuyla belirleniyor. Seçili olan kutuya "selected" class'ı veriliyor 
            onClick={() => setSelectedIndex(index)} // Tıklanırsa setSelectedIndex(index) ile o kutu seçiliyor. 
          >
            Soru {index + 1}
          </div>
        ))}
      </div>

      {/* Eğer bir soru seçildiyse, o sorunun detayları gösteriliyor */}
      {selectedQuestion && (
        <motion.div
          className="question-details"
          key={selectedIndex} // Soru değiştikçe animasyon tetiklenmesi için benzersiz key
          initial={{ opacity: 0, y: 20 }} // Başlangıç animasyon durumu (aşağıdan, görünmez)
          animate={{ opacity: 1, y: 0 }}  // Görünür ve yukarıya çık
          exit={{ opacity: 0, y: -20 }}  // Kapanış animasyonu (yukarı kayarak kaybol)
          transition={{ duration: 0.8 }} // Animasyon süresi
        >
          <h3>Soru: {selectedIndex + 1}</h3>
          <p className="question-text">{selectedQuestion.question}</p> {/* Soru metni gösterlir. */}
          {/* Seçeneklerin listelendiği alan */}
          <ul className="options">
            {selectedQuestion.options.map((option, i) => {
              const isCorrect = option === selectedQuestion.answer; // Bu seçenek doğru cevap mı?
              const isSelected = option === selectedAnswer;  // Kullanıcı bunu mu seçmiş?

              let className = '';
              if (isCorrect) className = 'correct'; // Eğer seçenek doğruysa correct class’ı verilir. (yeşil)
              else if (isSelected) className = 'wrong'; //  yanlışsa wrong class’ı verilir. (kırmızı)

              return (
                <li key={i} className={className}>
                  {option}
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}
      {/* Kullanıcıyı quiz sonuç ekranına geri döndürmek için kullanılır. */}
      <button className="back-button" onClick={onBack}>← Geri Dön</button> 
    </div>
  );
}

export default ReviewScreen;
