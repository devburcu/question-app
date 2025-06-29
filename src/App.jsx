import { useState, useEffect } from 'react'
import StartScreen from './Components/StartScreen';
import QuestionCard from './Components/QuestionCard';
import ProgressBar from './Components/ProgressBar';
import ResultScreen from './Components/ResultScreen';
import TimerAlert from './Components/TimerAlert';
import ReviewScreen from './Components/ReviewScreen';
import questions from './data/testData';
import { AnimatePresence, motion } from "framer-motion";

import './App.css'
import './Css/StartScreen.css'
import './Css/QuestionCard.css'
import './Css/ProgressBar.css';
import './Css/ResultScreen.css'
import './Css/TimerAlert.css'
import './Css/ReviewScreen.css';
import './Css/MediaQuery.css'

function App() {

  const [step, setStep] = useState(0); // Şu anda kaçıncı soruda olduğumuzu tutar. 0 ise test başlamamıştır.
  const [answers, setAnswers] = useState([]); // Kullanıcının verdiği cevaplar burada tutulur.
  const [score, setScore] = useState(0); // Doğru cevap sayısını saklar.
  const [timer, setTimer] = useState(20); // Her soruya 20 saniyelik süre tanımlanır.
  const [showQuestion, setShowQuestion] = useState(false); // Soruyu gecikmeli göstermek için.
  const [showOptions, setShowOptions] = useState(false); // Şıkları gecikmeli göstermek için.
  const [showTimeoutAlert, setShowTimeoutAlert] = useState(false); // Süre bittiğinde çıkan uyarı için.
  const [isReviewing, setIsReviewing] = useState(false); // Test bittiğinde, kullanıcı cevaplarını inceleme moduna geçti mi? Cevapları Gör butonuna tıklarsa bu true olur. Böylece arayüzde <ReviewScreen /> ekranı gösterilir. isReviewing === true; Kullanıcı şu anda cevaplarını gözden geçiriyor. isReviewing === false; Testi yapıyor ya da sonuç/başlangıç ekranında.

  const totalQuestions = questions.length; // totalQuestions toplam kaç soru varsa onu saklar.

  useEffect(() => {
    if (step === 0 || step > totalQuestions) return; // Test başlamadıysa ya da bittiğinde bu useEffect çalışmaz.

    setShowQuestion(false); // Yeni soruya geçildiğinde soruyu gizli başlatıyoruz.
    setShowOptions(false); // Yeni soruya geçildiğinde şıkları gizli başlatıyoruz.

    const questionTimer = setTimeout(() => {
      setShowQuestion(true); // 1 saniye sonra sadece soru metni görünür hale gelir.

      const optionsTimer = setTimeout(() => {
        setShowOptions(true);
      }, 3000); // Sonra şıklar 3 saniye sonra görünür. Amaç: Kullanıcı önce soruyu okusun.

      return () => clearTimeout(optionsTimer); // Komponent değiştiğinde optionsTimer temizlenir. 
    }, 1000); // Sorunun 1 saniyesinden sonra şıkların 3 saniyesi başlar ve şıklar 4 saniye sonra görünmüş olur.

    let isHandled = false; // Zaman bittiğinde yapılacak işlemin (uyarı gösterme ve otomatik geçme) sadece bir kere yapılmasını sağlar. Eğer bu yapılmazsa, setInterval çalıştığı sürece prev 0'a düşerse her saniyede tekrar tekrar uyarı verip handleAnswer çağırır.

    const interval = setInterval(() => { // Burada amaç her saniye timer'ı azaltmak
      setTimer((prev) => {
        if (prev <= 1 && !isHandled) {
          isHandled = true;
          setShowTimeoutAlert(true); // Süre bittiğinde kullanıcıya bir uyarı gösterilir.
          clearInterval(interval); // Süre bittiğinde artık geri sayımın çalışmasına gerek kalmaz. Bu yüzden interval durdurulur

          setTimeout(() => {
            setShowTimeoutAlert(false);
            handleAnswer(null); // Kullanıcı herhangi bir cevap vermedi anlamına gelir. Doğru/yanlış kontrolü yapılmadan bir sonraki soruya geçilir.
          }, 2000); // Uyarıdan 2 saniye sonra cevapsız kabul edilip bir sonraki soruya geçilir.

          return 20;
        }
        return prev - 1; // Her saniye sayacı 1 azaltır.
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(questionTimer);   // Yeni soruya geçildiğinde eski zamanlayıcılar temizlenir.
    };
  }, [step]);

  const startTest = () => {   // Testi başlat.
    setStep(1); // Kullanıcıyı ilk soruya gönder
    setTimer(20); // Süreyi 20 saniye ile başlat
    setShowQuestion(false); // Soru önce görünmesin
    setShowOptions(false); // Seçenekler de görünmesin
  };

  const handleAnswer = (selected) => {  // Şık seçilince 
    setShowQuestion(false); // Sorular gizleniyor.
    setShowOptions(false); // Şıklar gizleniyor.
    const current = questions[step - 1];

    if (selected === current.answer) {
      setScore((prev) => prev + 1);  // Eğer doğruysa skor artırılıyor.
    }

    setAnswers((prev) => [...prev, selected ?? null]); // Cevap diziye ekleniyor.
    setStep((prev) => prev + 1); // Bir sonraki soruya geçiliyor.
    setTimer(20);
  };

  const restart = () => {  // Testi sıfırla.
    setStep(0); // Kullanıcıyı başlangıç ekranına geri al
    setAnswers([]); // Önceki cevapları temizle
    setScore(0); // Skoru sıfırla
    setTimer(20); // Yeni testte ilk sorunun süresi 20
  };

  const handleReview = () => { setIsReviewing(true); }; // Cevapları Gör butonuna tıkladığında bu fonksiyon çalışır. Kullanıcı cevaplarını görmek istiyor. Review moduna gir.

  const currentQuestion = questions[step - 1]; // Şu an ekranda gösterilecek aktif soruyu temsil eder. questions dizisi 0'dan başlar. step - 1 ile doğru indeks bulunmuş olur.


  return (
    /* <AnimatePresence /> Framer Motion’un bileşenlerin animasyonlu şekilde mount ve unmount olmasını sağlar. */
    /* mode="wait" Yeni bileşen render edilmeden önce, eski bileşenin çıkış animasyonunun tamamlanmasını bekler. */
    <AnimatePresence mode="wait">
      {isReviewing && ( // isReviewing true olduğunda bu blok çalışır.
        <motion.div
          key="review"
          initial={{ opacity: 0, y: 20 }}  // Y ekseninde aşağıdan ve opaklığı 0'dan başlar.
          animate={{ opacity: 1, y: 0 }} // Y ekseninde yukarıya doğru 0 pozisyonuna ve tam görünürlük.
          exit={{ opacity: 0, y: -20 }} // Ekrandan çıkarken yukarıya doğru kayar ve kaybolur.
          transition={{ duration: 0.4 }} // Geçiş süresi 0.4 saniyedir.
        >
          <ReviewScreen
            questions={questions}
            answers={answers}
            onBack={() => setIsReviewing(false)}
          />
        </motion.div>
      )}

      {!isReviewing && step === 0 && ( // Bu ekran test başlamadan önce gösterilir 
        <motion.div
          key="start"
          initial={{ opacity: 0, scale: 0.95 }} // hafif küçük ve şeffaf başlar
          animate={{ opacity: 1, scale: 1 }} // büyüyerek gelir
          exit={{ opacity: 0, scale: 0.95 }} // Çıkarken tekrar küçülerek kaybolur
          transition={{ duration: 0.4 }} // Geçiş süresi 0.4 saniyedir.
        >
          {/* Butona basılınca startTest() çalışır ve step = 1 olur, soru ekranına geçilir. */}
          <StartScreen onStart={startTest} />
        </motion.div>
      )}

      {!isReviewing && step > totalQuestions && ( // step > totalQuestions olduğunda test bitmiş demektir sonuç ekranı gösterilir.
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          {/* Kaç doğru cevap verdiğini gösterir */}
          <ResultScreen
            totalQuestions={totalQuestions}
            score={score}
            answers={answers}
            onRestart={restart} // Tekrar başla
            onReview={handleReview} // Cevapları gör
          />
        </motion.div>
      )}
      {/* aktif olarak bir soru gösteriliyorsa yani kullanıcı testin ortasındaysa soru kartının animasyonlu bir şekilde ekranda görünmesini sağlar */}
      {!isReviewing && step > 0 && step <= totalQuestions && ( // !isReviewing: Şu anda cevapları inceleme (review) modu aktif değilse, step > 0: Test başlamışsa ve step <= totalQuestions: Hala test bitmemişse, yani sorular devam ediyorsa bu blokta yer alan soru ekranı render edilir.
        <motion.div
          key={`quiz-${step}`}
          className="quiz-container"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          {/* Kaç soru cevapladığını gösterir */}
          <ProgressBar current={step - 1} total={totalQuestions} />
          {/* Süre uyarısı ekranda gösterilir */}
          <TimerAlert showTimeoutAlert={showTimeoutAlert} timer={timer} />
          {/* Soru metni ve şıklar */}
          <QuestionCard
            questionData={currentQuestion}
            onAnswer={handleAnswer}
            questionNumber={step}
            total={totalQuestions}
            showQuestion={showQuestion}
            showOptions={showOptions}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
