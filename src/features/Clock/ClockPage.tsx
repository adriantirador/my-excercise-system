"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
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
  const [timeValue, setTimeValue] = useState("12:00:00");

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
