"use client";

import { useMemo, useState } from "react";
import styles from "./ReminderPage.module.scss";

type ReminderNote = {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
};

const emptyForm: ReminderNote = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
};

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

const formatDate = (value?: string) => {
  if (!value) return "No date";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
};

export default function ReminderPage() {
  const [reminderList, setReminderList] = useState<ReminderNote[]>([]);
  const [formData, setFormData] = useState<ReminderNote>(emptyForm);

  const hasMissingFields = useMemo(
    () =>
      !formData.title ||
      !formData.description ||
      !formData.startDate ||
      !formData.endDate,
    [formData],
  );

  const handleClear = () => {
    setFormData(emptyForm);
  };

  const handleInsert = () => {
    if (hasMissingFields) return;

    setReminderList((prev) => [
      {
        ...formData,
        title: formData.title?.trim(),
        description: formData.description?.trim(),
      },
      ...prev,
    ]);

    handleClear();
  };

  return (
    <section className={styles.reminderPage} aria-label="Note reminder page">
      <form
        className={styles.composerPanel}
        onSubmit={(event) => {
          event.preventDefault();
          handleInsert();
        }}
      >
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>New note</p>
          <h2>Plan the next thing</h2>
        </div>

        <label>
          <span>Title</span>
          <input
            type="text"
            placeholder="Morning mobility"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </label>

        <label>
          <span>Description</span>
          <textarea
            placeholder="Add sets, cues, reminders, or context..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </label>

        <div className={styles.dateGrid}>
          <label>
            <span>Start date</span>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />
          </label>

          <label>
            <span>End date</span>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
            />
          </label>
        </div>

        <div className={styles.toolbar}>
          <button type="button" className={styles.secondaryButton} onClick={handleClear}>
            Clear
          </button>
          <button type="submit" className={styles.primaryButton} disabled={hasMissingFields}>
            Insert
          </button>
        </div>
      </form>

      <section className={styles.listPanel}>
        <div className={cx(styles.sectionHeading, styles.listHeading)}>
          <div>
            <p className={styles.eyebrow}>Reminder board</p>
            <h2>{reminderList.length} active notes</h2>
          </div>
        </div>

        {reminderList.length === 0 ? (
          <div className={styles.emptyState}>
            <span aria-hidden="true">+</span>
            <h3>No reminders yet</h3>
            <p>Add your first note and it will appear here as a clean timeline card.</p>
          </div>
        ) : (
          <div className={styles.noteList}>
            {reminderList.map((item, idx) => (
              <article key={`${item.title}-${idx}`} className={styles.noteCard}>
                <div className={styles.noteCardHeader}>
                  <p>{formatDate(item.startDate)}</p>
                  <span>{formatDate(item.endDate)}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
