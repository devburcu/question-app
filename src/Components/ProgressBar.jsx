function ProgressBar({ current, total }) { // current; Şu ana kadar cevaplanan soru sayısı. total; Tüm soru sayısı
    const progress = total > 0 ? (current / total) * 100 : 0; // Eğer total > 0 ise yüzde cinsinden ilerleme hesaplanır. total = 0 ise %0 ilerleme.
    return (
        <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }} />
        </div>
    );
}

export default ProgressBar;