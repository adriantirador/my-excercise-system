import { useState } from "react";
import styles from "./CatchMePage.module.scss";

type Position = {
    top: number | undefined;
    left: number | undefined;
};

const BUTTON_SIZE = 128;

export default function CatchMePage() {
    const [answer, setAnswer] = useState("");
    const [isError, setIsError] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({
        top: undefined,
        left: undefined,
    });

    const moveButton = () => {
        if (answer.trim().toLowerCase() === "strong") return;

        setIsError(true);
        setPosition({
            top: Math.random() * Math.max(window.innerHeight - BUTTON_SIZE, 0),
            left: Math.random() * Math.max(window.innerWidth - BUTTON_SIZE, 0),
        });
    };

    return (
        <section className={styles.catchMePage}>
            <div className={styles.panel}>
                <div className={styles.copy}>
                    <h2>Input Strong Password</h2>
                    <p>The submit button will stay still after you type in the box.</p>
                </div>

                <label className={styles.inputGroup}>
                    <input
                        type="text"
                        value={answer}
                        onChange={(event) => setAnswer(event.target.value)}
                        placeholder="Type anything here"
                    />
                </label>
                {isError && <span>⚠️ Your password is weak like you.</span>}

                {showPopup && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <button
                                className={styles.closeButton}
                                onClick={() => setShowPopup(false)}
                            >
                                ✕
                            </button>

                            <iframe
                                src="https://www.youtube.com/embed/PDJLvF1dUek?autoplay=1"
                                title="Congratulations"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}

                <div className={styles.playArea}>
                    <button
                        type="button"
                        className={`${styles.submitButton} ${answer.trim().toLowerCase() === "strong" ? styles.readyButton : styles.runawayButton}`}
                        onMouseEnter={moveButton}
                        style={answer.trim().toLowerCase() === "strong" ? undefined : { top: position.top, left: position.left }}
                        onClick={() => {
                            if (answer.trim().toLowerCase() === "strong") {
                                setShowPopup(true)
                            }
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </section>
    );
}
