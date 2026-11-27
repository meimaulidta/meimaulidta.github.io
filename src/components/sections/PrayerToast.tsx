import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function PrayerToast() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        className="footer__prayer-trigger"
        type="button"
        aria-label={open ? "Tutup doa pilihan" : "Buka doa pilihan"}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="footer-prayer-panel"
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />
          <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
        </svg>
      </button>

      {createPortal(
        <section
          className="footer__prayer-panel"
          id="footer-prayer-panel"
          role="dialog"
          aria-labelledby="footer-prayer-title"
          hidden={!open}
        >
          <div className="footer__prayer-heading">
            <div>
              <p className="footer__prayer-eyebrow">A quiet moment</p>
              <h2 id="footer-prayer-title">Doa pilihan</h2>
            </div>
            <button
              ref={closeRef}
              className="footer__prayer-close"
              type="button"
              aria-label="Tutup doa pilihan"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <article className="footer__prayer-verse">
            <div className="footer__prayer-verse-heading">
              <h3>Ayat Kursi</h3>
              <span>Al-Baqarah · 2:255</span>
            </div>
            <p className="footer__prayer-arabic" lang="ar" dir="rtl">
              اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا
              تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا
              فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا
              بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ
              وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ
              وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ
              حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ
            </p>
            <p className="footer__prayer-translation">
              Allah, tidak ada tuhan selain Dia. Yang Mahahidup, Yang terus
              menerus mengurus (makhluk-Nya), tidak mengantuk dan tidak tidur.
              Milik-Nya apa yang ada di langit dan apa yang ada di bumi. Tidak
              ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia
              mengetahui apa yang dihadapan mereka dan apa yang di belakang
              mereka, dan mereka tidak mengetahui sesuatu apa pun tentang
              ilmu-Nya melainkan apa yang Dia kehendaki. Kursi-Nya meliputi
              langit dan bumi. Dia tidak merasa berat memelihara keduanya, dan
              Dia Mahatinggi, Mahabesar.
            </p>
          </article>

          <article className="footer__prayer-verse">
            <div className="footer__prayer-verse-heading">
              <h3>Doa Nabi Yunus</h3>
              <span>Al-Anbiya · 21:87</span>
            </div>
            <p className="footer__prayer-arabic" lang="ar" dir="rtl">
              لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ
              الظَّالِمِينَ
            </p>
            <p className="footer__prayer-translation">
              “Tidak ada tuhan selain Engkau, Mahasuci Engkau. Sungguh, aku
              termasuk orang-orang yang zalim.”
            </p>
          </article>

          <article className="footer__prayer-verse">
            <div className="footer__prayer-verse-heading">
              <h3>Doa Nabi Musa AS</h3>
              <span>Taha · 20:25–28</span>
            </div>
            <p className="footer__prayer-arabic" lang="ar" dir="rtl">
              رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ
              عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي
            </p>
            <p className="footer__prayer-translation">
              “Ya Tuhanku, lapangkanlah dadaku, mudahkanlah urusanku, dan
              lepaskan kekakuan dari lidahku agar mereka memahami perkataanku.”
            </p>
          </article>

          <article className="footer__prayer-verse">
            <div className="footer__prayer-verse-heading">
              <h3>Doa dari Surat Al-Kahfi</h3>
              <span>Al-Kahf · 18:10</span>
            </div>
            <p className="footer__prayer-arabic" lang="ar" dir="rtl">
              رَبَّنَا ءَاتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ
              أَمْرِنَا رَشَدًا
            </p>
            <p className="footer__prayer-translation">
              “Wahai Tuhan kami, berikanlah rahmat kepada kami dari sisi-Mu dan
              sempurnakanlah petunjuk yang lurus dalam urusan kami.”
            </p>
          </article>

          <article className="footer__prayer-verse">
            <div className="footer__prayer-verse-heading">
              <h3>Doa Memohon Pertolongan</h3>
              <span>HR. Tirmidzi</span>
            </div>
            <p className="footer__prayer-arabic" lang="ar" dir="rtl">
              يَا حَيُّ يَا قَيُّوْمُ بِرَحْمَتِكَ أَسْتَغِيْثُ، أَصْلِحْ
              لِيْ شَأْنِيْ كُلَّهُ وَلاَ تَكِلْنِيْ إِلَى نَفْسِيْ طَرْفَةَ
              عَيْنٍ
            </p>
            <p className="footer__prayer-translation">
              “Wahai Tuhan Yang Maha Hidup, dengan rahmat-Mu aku memohon pertolongan;
              perbaikilah seluruh urusanku dan jangan biarkan aku bergantung
              pada diriku sendiri walau sekejap mata.”
            </p>
          </article>

          <article className="footer__prayer-verse">
            <div className="footer__prayer-verse-heading">
              <h3>Doa Sapu Jagat</h3>
              <span>Al-Baqarah · 2:201</span>
            </div>
            <p className="footer__prayer-arabic" lang="ar" dir="rtl">
              رَبَّنَاۤ اٰتِنَا فِى الدُّنْيَا حَسَنَةً وَّفِى الْاٰخِرَةِ
              حَسَنَةً وَّقِنَا عَذَابَ النَّارِ
            </p>
            <p className="footer__prayer-translation">
              “Ya Tuhan kami, berilah kami kebaikan di dunia dan di akhirat,
              serta lindungilah kami dari azab neraka.”
            </p>
          </article>

          <p className="footer__prayer-source">
            Rujukan:{" "}
            <a
              href="https://quran.com/2/255?translations=33"
              target="_blank"
              rel="noopener noreferrer"
            >
              Al-Baqarah 2:255
            </a>{" "}
            ·{" "}
            <a
              href="https://quran.com/21/87?translations=33"
              target="_blank"
              rel="noopener noreferrer"
            >
              Al-Anbiya 21:87
            </a>{" "}
            ·{" "}
            <a
              href="https://quran.com/20/25-28?translations=33"
              target="_blank"
              rel="noopener noreferrer"
            >
              Taha 20:25–28
            </a>{" "}
            ·{" "}
            <a
              href="https://quran.com/18/10?translations=33"
              target="_blank"
              rel="noopener noreferrer"
            >
              Al-Kahf 18:10
            </a>{" "}
            ·{" "}
            <a
              href="https://quran.com/2/201?translations=33"
              target="_blank"
              rel="noopener noreferrer"
            >
              Al-Baqarah 2:201
            </a>{" "}
            ·{" "}
            <a
              href="https://www.detik.com/hikmah/doa-dan-hadits/d-8724596/7-doa-dimudahkan-segala-urusan-lengkap-arab-latin-dan-artinya"
              target="_blank"
              rel="noopener noreferrer"
            >
              detikHikmah
            </a>{" "}
            ·{" "}
            <a
              href="https://mozaik.inilah.com/ibadah/doa-agar-dimudahkan-segala-urusan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Inilah.com
            </a>
          </p>
        </section>,
        document.body,
      )}
    </>
  );
}
