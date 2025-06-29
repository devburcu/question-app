import { useEffect, useState } from 'react'; // Gerekli kütüphaneleri içe aktarıyoruz

function QuestionCard({ questionData, onAnswer, questionNumber, total, showQuestion, showOptions }) {
    const [imageVisible, setImageVisible] = useState(false); // Görselin animasyonla yavaşça görünmesini sağlamak için bir state tanımlanıyor. İlk başta false, yani görsel gizli

    useEffect(() => {
        setImageVisible(false); // Yeni soru geldiğinde görsel önce görünmesin
        const timer = setTimeout(() => {
            setImageVisible(true); // 100ms sonra görünmeye başlasın
        }, 100);
        return () => clearTimeout(timer); // Önceki timer’ı temizle
    }, [questionData.media]); // Her yeni bir görsel geldiğinde

    return (
        <div className="question-card">
            <h3>{`Soru ${questionNumber} / ${total}`}</h3> {/* Dinamik olarak gelen questionNumber ve total bilgisine göre değişir. Soru 3 / 10 gibi yazar.*/}
            <div className='foto-wrapper'>{questionData.media &&  // Eğer questionData.media varsa <img> gösterilir.
                <img
                    className={`question-image ${imageVisible ? 'visible' : ''}`} // imageVisible true olduğunda CSS'ten gelen .visible sınıfı da eklenir, animasyon başlatılır.
                    src={questionData.media}
                    alt={`Soru ${questionNumber} görseli`} />}</div>

            {showQuestion && ( // Eğer showQuestion === true ise, yani animasyon tamamlandıysa soru görünür.
                <>
                    <p className="fade-in-question">{questionData.question}</p> {/* Soru yazısı questionData.question içinden gelir. */}
                    {showOptions && ( // showOptions === true ise seçenekler görünür olur.
                        <div className={`options ${showOptions ? 'show' : ''}`}>
                            {questionData.options.map((opt, idx) => (
                                // Her seçenek için bir <button> oluşturulur.
                                <button
                                    key={idx} // Her elemanı benzersiz tanıtmak adına kullanılır
                                    onClick={() => onAnswer(opt)}> {/* Kullanıcı butona tıklarsa onAnswer(opt) fonksiyonu çalışır */}
                                    {opt} {/* tıklanan seçenek */}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
export default QuestionCard;  