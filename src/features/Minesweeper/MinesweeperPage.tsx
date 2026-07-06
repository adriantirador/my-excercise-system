import { useEffect, useState } from "react";
import styles from "./MinesweeperPage.module.scss";

type Box = {
  isBomb: boolean;
  revealed: boolean;
};

export default function MineweeperPage() {
  const levelBox = [20, 25, 30];
  const bombPerLevel = [5, 10, 15];
  const levels = [
    { level: "Level One", value: 0 },
    { level: "Level Two", value: 1 },
    { level: "Level Three", value: 2 },
  ];

  const [boxes, setBoxes] = useState<Box[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [showScare, setShowScare] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [ip, setIp] = useState("");

  const handleClick = async (idx: number) => {
    setBoxes((prev) => {
      const newBoxes = [...prev];
      newBoxes[idx] = { ...newBoxes[idx], revealed: true };
      return newBoxes;
    });

    if (boxes[idx]?.isBomb) {
      //   try {
      //     const res = await fetch("https://api.ipify.org?format=json");
      //     const data = await res.json();
      //     setIp(data.ip);
      //   } catch {
      //     setIp("unknown");
      //   }
      setCountdown(10);
      setShowScare(true);
    }
  };

  const createBoxList = () => {
    const boxCount = levelBox[selectedLevel];
    const bombCount = bombPerLevel[selectedLevel];

    const newBoxes: Box[] = Array.from({ length: boxCount }, () => ({
      isBomb: false,
      revealed: false,
    }));

    const bombIndices = new Set<number>();

    while (bombIndices.size < bombCount) {
      bombIndices.add(Math.floor(Math.random() * boxCount));
    }

    bombIndices.forEach((i) => {
      newBoxes[i].isBomb = true;
    });

    setBoxes(newBoxes);
  };

  useEffect(() => {
    createBoxList();
  }, [selectedLevel]);

  useEffect(() => {
    if (!showScare) return;
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [showScare, countdown]);

  return (
    <section className={styles.minesweeper} aria-label="Minesweeper Page">
      <div className={styles.toolbar}>
        <label className={styles.levelControl}>
          <span>Level</span>
          <select value={selectedLevel} onChange={(e) => setSelectedLevel(Number(e?.target?.value))}>
            {levels.map((item) => (
              <option key={item.value} value={item.value}>
                {item.level}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className={styles.board}>
        {boxes.map((item, idx) => (
          <button
            key={`box-${idx}`}
            className={`${styles.tile} ${item.revealed ? styles.revealed : ""}`}
            onClick={() => handleClick(idx)}
          >
            {item.isBomb ? "💣" : "😂"}
          </button>
        ))}
      </section>

      <section className={styles.actions}>
        <button className={styles.resetButton} onClick={createBoxList}>
          Try Again
        </button>
      </section>

      {showScare && (
        <div className={styles.scareOverlay}>
          <p className={styles.warning}>⚠️⚠️⚠️ SYSTEM ALERT ⚠️⚠️⚠️</p>
          {/* <p className={styles.ipBig}>{ip}</p> */}
          <p className={styles.ipBig}> ⚠️⚠️⚠️ WARNING ⚠️⚠️⚠️</p>
          <p className={styles.virusText}>
            {countdown <= 0 ? "😂 JUST KIDDING! You got pranked 😂" : "Installing a virus... 😈😈😈"}
          </p>
          {countdown > 0 && <p className={styles.countdown}>{countdown}</p>}
          {countdown < 1 && <button onClick={() => setShowScare(false)}>Close</button>}

          <iframe
            width="0"
            height="0"
            src="https://www.youtube.com/embed/PDJLvF1dUek?autoplay=1&loop=1&playlist=PDJLvF1dUek"
            title="Background Music"
            allow="autoplay"
            style={{ display: "none" }}
          />
        </div>
      )}

    </section>

  );
}
