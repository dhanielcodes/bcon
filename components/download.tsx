// components/InstallButton.tsx
"use client";
import { usePWAInstall } from "../hooks/usePWAInstall";

const InstallButton = () => {
  const { isInstallable, promptInstall } = usePWAInstall();

  if (!isInstallable) return null;

  return (
    <button onClick={promptInstall} style={styles.button}>
      Install App
    </button>
  );
};

const styles = {
  button: {
    padding: "10px 16px",
    borderRadius: "8px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default InstallButton;
