"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import CalculatorPage from "@/src/features/Calculator/CalculatorPage";
import ClockPage from "@/src/features/Clock/ClockPage";
import ReminderPage from "@/src/features/Reminder/ReminderPage";
import TicTacToe from "../TicTacToe/TicTacToePage";
import MinesweeperPage from "../Minesweeper/MinesweeperPage";
import styles from "./AppShell.module.scss";

type Theme = "light" | "dark";
type ActivePage = "reminder" | "calculator" | "clock" | "tictactoe" | "minesweeper";

const getThemeSnapshot = (): Theme => {
  const storedTheme = window.localStorage.getItem("exercise-system-theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const subscribeToTheme = (onStoreChange: () => void) => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleStorage = (event: StorageEvent) => {
    if (event.key === "exercise-system-theme") onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener("exercise-system-theme-change", onStoreChange);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("exercise-system-theme-change", onStoreChange);
    mediaQuery.removeEventListener("change", onStoreChange);
  };
};

const setThemePreference = (nextTheme: Theme) => {
  window.localStorage.setItem("exercise-system-theme", nextTheme);
  window.dispatchEvent(new Event("exercise-system-theme-change"));
};

const pageContent = {
  reminder: {
    title: "Note Reminder",
    copy: "Create exercise reminders and keep each note organized by date.",
  },
  calculator: {
    title: "Calculator",
    copy: "Run quick calculations without leaving your workspace.",
  },
  clock: {
    title: "Clock",
    copy: "Type a time and watch the clock hands move with your input.",
  },
  tictactoe: {
    title: "Tic Tac Toe",
    copy: "A timeless battle of strategy. Think ahead, block your opponent, and be the first to complete three in a row.",
  },
  minesweeper: {
    title: "Minesweeper",
    copy: "Reveal safe tiles, read the nearby mine counts, and clear the board.",
  },
};

export default function AppShell() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, () => "light");
  const [activePage, setActivePage] = useState<ActivePage>("reminder");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const selectPage = (page: ActivePage) => {
    setActivePage(page);
    setIsSidebarOpen(false);
  };

  return (
    <main className={styles.appShell}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={() => setIsSidebarOpen((current) => !current)}
        aria-expanded={isSidebarOpen}
        aria-controls="app-sidebar"
        aria-label="Toggle sidebar"
      >
        <span />
        <span />
        <span />
      </button>

      {isSidebarOpen ? (
        <button
          type="button"
          className={styles.backdrop}
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      ) : null}

      <aside
        id="app-sidebar"
        className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ""}`}
        aria-label="Main navigation"
      >
        <div>
          <p className={styles.sidebarKicker}>Exercise system</p>
          <h1>My Features</h1>
        </div>

        <nav className={styles.sidebarNav} aria-label="Pages">
          <button
            type="button"
            className={activePage === "reminder" ? styles.active : ""}
            onClick={() => selectPage("reminder")}
            aria-current={activePage === "reminder" ? "page" : undefined}
          >
            Note Reminder
          </button>
          <button
            type="button"
            className={activePage === "calculator" ? styles.active : ""}
            onClick={() => selectPage("calculator")}
            aria-current={activePage === "calculator" ? "page" : undefined}
          >
            Calculator
          </button>
          <button
            type="button"
            className={activePage === "clock" ? styles.active : ""}
            onClick={() => selectPage("clock")}
            aria-current={activePage === "clock" ? "page" : undefined}
          >
            Clock
          </button>
          <button
            type="button"
            className={activePage === "tictactoe" ? styles.active : ""}
            onClick={() => selectPage("tictactoe")}
            aria-current={activePage === "tictactoe" ? "page" : undefined}
          >
            Tic Tac Toe
          </button>
          <button
            type="button"
            className={activePage === "minesweeper" ? styles.active : ""}
            onClick={() => selectPage("minesweeper")}
            aria-current={activePage === "minesweeper" ? "page" : undefined}
          >
            Minesweeper
          </button>
        </nav>

        <div className={styles.themeCard}>
          <p>Theme</p>
          <div className={styles.themeSwitch} aria-label="Theme">
            <button
              type="button"
              className={theme === "light" ? styles.active : ""}
              onClick={() => setThemePreference("light")}
              aria-pressed={theme === "light"}
            >
              Light
            </button>
            <button
              type="button"
              className={theme === "dark" ? styles.active : ""}
              onClick={() => setThemePreference("dark")}
              aria-pressed={theme === "dark"}
            >
              Dark
            </button>
          </div>
        </div>
      </aside>

      <div className={styles.contentShell}>
        <section className={styles.pageHero}>
          <h2>{pageContent[activePage].title}</h2>
          <p>{pageContent[activePage].copy}</p>
        </section>

        {activePage === "reminder" ? <ReminderPage /> : null}
        {activePage === "calculator" ? <CalculatorPage /> : null}
        {activePage === "clock" ? <ClockPage /> : null}
        {activePage === "tictactoe" ? <TicTacToe /> : null}
        {activePage === "minesweeper" ? <MinesweeperPage /> : null}
      </div>
    </main>
  );
}
