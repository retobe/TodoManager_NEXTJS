import React, { useState, useEffect } from "react";

const EnableAlerts = () => {
  const [alerts, setAlerts] = useState(false);

  useEffect(() => {
    const storedAlerts = localStorage.getItem("alerts");
    const initialAlertsState = storedAlerts === "true" || storedAlerts === null;
    setAlerts(initialAlertsState);
  }, []); // Run this effect only once on component mount

  const handleSettings = () => {
    const alertCheckboxElement = document.querySelector(
      "#alertsCheckbox"
    ) as HTMLInputElement | null;

    if (alertCheckboxElement) {
      setAlerts(!alerts);
      localStorage.setItem("alerts", (!alerts).toString());
    }
  };

  return (
    <div>
      <label htmlFor="alerts">Enable Alerts: </label>
      <input
        onChange={handleSettings}
        type="checkbox"
        name="alerts"
        id="alertsCheckbox"
        checked={alerts}
      />
    </div>
  );
};

export default EnableAlerts;