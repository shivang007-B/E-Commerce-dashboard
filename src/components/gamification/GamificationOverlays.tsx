"use client";

import { useEffect } from "react";
import LevelUpModal from "@/components/gamification/LevelUpModal";
import RewardToast from "@/components/gamification/RewardToast";
import DailyCheckinPopup from "@/components/gamification/DailyCheckinPopup";
import { useGamificationStore } from "@/store/useGamificationStore";

export default function GamificationOverlays() {
    const { checkAndShowCheckin, refreshMissions } = useGamificationStore();

    useEffect(() => {
        // Show daily check-in popup on page load (after short delay)
        const timer = setTimeout(() => {
            checkAndShowCheckin();
            refreshMissions();
        }, 1500);

        return () => clearTimeout(timer);
    }, [checkAndShowCheckin, refreshMissions]);

    return (
        <>
            <LevelUpModal />
            <RewardToast />
            <DailyCheckinPopup />
        </>
    );
}
