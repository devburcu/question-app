import { motion } from "framer-motion"; // Animasyon için kullanıyoruz

const TimerAlert = ({ showTimeoutAlert, timer }) => { // showTimeoutAlert: Boolean (true/false). Süre dolduysa bu değer true olur ve uyarı mesajı gösterilir. timer: Geri sayım süresini tutan sayı. 20’den başlar ve 0’a doğru iner.
    return (
        <>
            {showTimeoutAlert && ( // Eğer showTimeoutAlert === true ise, aşağıdaki motion.div bloğu render edilir. Aksi halde hiç gösterilmez.
                <motion.div
                    className="fullscreen-overlay"
                    initial={{ opacity: 0 }} // Başlangıçta görünmez.
                    animate={{ opacity: 1 }} // Sonra tamamen görünür olur.
                    exit={{ opacity: 0 }}    // Kapanırken tekrar görünmez olur.
                    transition={{ duration: 0.4 }} // Geçiş süresi 0.4 saniyedir.
                >
                    ⏰ Süre doldu! <br /> Sıradaki soruya geçiliyor...
                </motion.div>
            )}
            <p className={`timer ${timer <= 5 ? 'warning' : ''}`}> {/* timer <= 5 olduğunda warning class’ı da eklenir. Bu sayede zaman sonuna 5 saniye kaldığında yazı kırmızıya döner ve yanıp söner */}
                <i className="fa-solid fa-hourglass"></i>
                {timer} saniye</p>
        </>
    );
};

export default TimerAlert;
