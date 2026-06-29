"use client";

import type { CSSProperties } from "react";
import { useMemo, useState, useEffect } from "react";
import styles from "./ClockPage.module.scss";

type ClockStyle = CSSProperties & {
  "--hour-angle": string;
  "--minute-angle": string;
  "--second-angle": string;
};

const parseTime = (value: string) => {
  const [hours = "0", minutes = "0", seconds = "0"] = value.split(":");

  return {
    hours: Number(hours) || 0,
    minutes: Number(minutes) || 0,
    seconds: Number(seconds) || 0,
  };
};

const formatDisplayTime = (value: string) => {
  const { hours, minutes, seconds } = parseTime(value);
  const hourText = String(hours).padStart(2, "0");
  const minuteText = String(minutes).padStart(2, "0");
  const secondText = String(seconds).padStart(2, "0");

  return `${hourText}:${minuteText}:${secondText}`;
};

export default function ClockPage() {
  const [timeValue, setTimeValue] = useState("");

  const clockStyle = useMemo<ClockStyle>(() => {
    const { hours, minutes, seconds } = parseTime(timeValue);
    const hourAngle = (hours % 12) * 30 + minutes * 0.5 + seconds / 120;
    const minuteAngle = minutes * 6 + seconds * 0.1;
    const secondAngle = seconds * 6;

    return {
      "--hour-angle": `${hourAngle}deg`,
      "--minute-angle": `${minuteAngle}deg`,
      "--second-angle": `${secondAngle}deg`,
    };
  }, [timeValue]);

  const messageValue: Record<string, string> = {
    "00:00:00": "Matulog ka na, bukas ka na maging productive. 😴",
    "01:00:00": "1 AM na, 'last scroll' pa rin? 📱",
    "02:00:00": "Ito na ang oras ng mga overthinker. 🤔",
    "03:00:00": "3 AM thoughts: 'Magbabago na talaga ako bukas.' 😂",
    "04:00:00": "May gising pa ba? O ikaw lang at ang multo? 👻",
    "05:00:00": "Good morning sa mga hindi pa natutulog. ☀️",
    "06:00:00": "Bangon! Hindi ka yayaman sa higaan. 💸",
    "07:00:00": "Traffic na naman, kahit nasa bahay ka lang. 🚗",
    "08:00:00": "Work mode... kunwari. 💻",
    "09:00:00": "Meeting na walang katapusan. 📅",
    "10:00:00": "Kape ulit? Pang-ilan na 'yan? ☕",
    "11:00:00": "Malapit na lunch, konting tiis. 🍽️",
    "12:00:00": "Lunch time! Diet starts tomorrow. 🍗",
    "13:00:00": "Busog na? Antok na rin. 😪",
    "14:00:00": "Productivity left the group chat. 📉",
    "15:00:00": "3 PM = merienda o resign? 😂",
    "16:00:00": "Malapit na uwian... sana. ⏰",
    "17:00:00": "Rush hour na, pati utak mo traffic. 🚦",
    "18:00:00": "Dinner na! Sana libre. 🍕",
    "19:00:00": "Workout? O Netflix? Alam na. 📺",
    "20:00:00": "Sasabihin mong maaga matutulog... sure. 😏",
    "21:00:00": "One more episode lang. 🎬",
    "22:00:00": "Nagre-review... ng memes. 🤣",
    "23:00:00": "Matulog ka na, may bills ka pang babayaran bukas. 💸"
  };

  useEffect(() => {
    const message = messageValue[timeValue];

    if (message) {
      alert(message)
    }
  }, [timeValue])

  return (
    <section className={styles.clockPage} aria-label="Clock page">
      <section className={styles.clockPanel}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Clock</p>
          <h2>Move the hands</h2>
        </div>

        <div className={styles.clockFace} style={clockStyle} aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={index}
              className={styles.tick}
              style={{ "--tick-index": index } as CSSProperties}
            />
          ))}
          <div className={`${styles.hand} ${styles.hourHand}`} />
          <div className={`${styles.hand} ${styles.minuteHand}`} />
          <div className={`${styles.hand} ${styles.secondHand}`} />
          <div className={styles.pin} />
        </div>

        <div className={styles.clockControls}>
          <label>
            <span>Type time</span>
            <input
              type="time"
              step="1"
              value={timeValue}
              onChange={(event) => setTimeValue(event.target.value || "12:00:00")}
            />
          </label>

          <output className={styles.digitalTime} aria-live="polite">
            {formatDisplayTime(timeValue)}
          </output>
        </div>
      </section>
    </section>
  );
}
