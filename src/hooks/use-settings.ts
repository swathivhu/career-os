"use client";

import { useState, useEffect } from "react";

export interface UserSettings {
  keywords: string;
  location: string;
  mode: string;
  experience: string;
}

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("job_tracker_settings");
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    localStorage.setItem("job_tracker_settings", JSON.stringify(newSettings));
  };

  const hasPreferences = !!(settings?.keywords || settings?.location || settings?.mode || settings?.experience);

  return { settings, saveSettings, isLoaded, hasPreferences };
}
