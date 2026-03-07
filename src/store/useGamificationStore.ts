import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
    getLevelFromXP,
    getTierFromLevel,
    getXPProgress,
    spinWheel,
    BADGE_DEFINITIONS,
    MISSION_TEMPLATES,
    XP_REWARDS,
    POINT_REWARDS,
    type TierName,
    type SpinSegment,
    type MissionDef,
    type BadgeDef,
} from "@/lib/gamification";

export interface ActiveMission extends MissionDef {
    progress: number;
    completed: boolean;
}

interface GamificationState {
    // Core stats
    xp: number;
    level: number;
    points: number;
    tier: TierName;
    totalSpent: number;

    // Badges
    unlockedBadges: string[];

    // Missions
    activeMissions: ActiveMission[];
    missionsLastRefreshed: string;

    // Streaks
    loginStreak: number;
    lastCheckin: string | null;

    // Spin
    spinsAvailable: number;
    lastSpinDate: string | null;
    totalSpinWins: number;

    // UI state
    showLevelUp: boolean;
    newLevel: number;
    showRewardToast: boolean;
    rewardToastMessage: string;
    rewardToastType: "xp" | "points" | "badge" | "discount";
    showCheckinPopup: boolean;

    // Stats
    totalOrders: number;
    totalReviews: number;
    totalShares: number;
    categoriesBought: string[];

    // Actions
    addXP: (amount: number) => void;
    addPoints: (amount: number) => void;
    completeCheckin: () => void;
    useSpin: () => SpinSegment;
    redeemPoints: (amount: number) => boolean;
    recordPurchase: (amount: number, category: string) => void;
    recordReview: () => void;
    recordShare: () => void;
    dismissLevelUp: () => void;
    dismissRewardToast: () => void;
    dismissCheckinPopup: () => void;
    checkAndShowCheckin: () => void;
    refreshMissions: () => void;
    advanceMission: (type: string) => void;
    resetStore: () => void;
}

const getToday = () => new Date().toISOString().split("T")[0];

const initialMissions = (): ActiveMission[] =>
    MISSION_TEMPLATES.slice(0, 4).map((m) => ({ ...m, progress: 0, completed: false }));

export const useGamificationStore = create<GamificationState>()(
    persist(
        (set, get) => ({
            // Core
            xp: 0,
            level: 1,
            points: 0,
            tier: "Rookie" as TierName,
            totalSpent: 0,

            // Badges
            unlockedBadges: [],

            // Missions
            activeMissions: initialMissions(),
            missionsLastRefreshed: getToday(),

            // Streaks
            loginStreak: 0,
            lastCheckin: null,

            // Spin
            spinsAvailable: 1,
            lastSpinDate: null,
            totalSpinWins: 0,

            // UI
            showLevelUp: false,
            newLevel: 1,
            showRewardToast: false,
            rewardToastMessage: "",
            rewardToastType: "xp",
            showCheckinPopup: false,

            // Stats
            totalOrders: 0,
            totalReviews: 0,
            totalShares: 0,
            categoriesBought: [],

            // ---- ACTIONS ----

            addXP: (amount) => {
                const state = get();
                const newXP = state.xp + amount;
                const oldLevel = state.level;
                const newLevel = getLevelFromXP(newXP);
                const newTier = getTierFromLevel(newLevel);

                const leveledUp = newLevel > oldLevel;

                // Check for level badges
                const newBadges = [...state.unlockedBadges];
                if (newLevel >= 5 && !newBadges.includes("level_5")) newBadges.push("level_5");
                if (newLevel >= 10 && !newBadges.includes("level_10")) newBadges.push("level_10");

                set({
                    xp: newXP,
                    level: newLevel,
                    tier: newTier,
                    unlockedBadges: newBadges,
                    ...(leveledUp
                        ? { showLevelUp: true, newLevel }
                        : { showRewardToast: true, rewardToastMessage: `+${amount} XP`, rewardToastType: "xp" as const }),
                });
            },

            addPoints: (amount) => {
                set((s) => ({
                    points: s.points + amount,
                    showRewardToast: true,
                    rewardToastMessage: `+${amount} Points`,
                    rewardToastType: "points" as const,
                }));
            },

            completeCheckin: () => {
                const state = get();
                const today = getToday();
                if (state.lastCheckin === today) return;

                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split("T")[0];

                const newStreak = state.lastCheckin === yesterdayStr ? state.loginStreak + 1 : 1;
                const streakBonus = newStreak * XP_REWARDS.STREAK_BONUS;

                // Unlock streak badges
                const newBadges = [...state.unlockedBadges];
                if (newStreak >= 7 && !newBadges.includes("streak_7")) newBadges.push("streak_7");
                if (newStreak >= 30 && !newBadges.includes("streak_30")) newBadges.push("streak_30");

                set({
                    lastCheckin: today,
                    loginStreak: newStreak,
                    showCheckinPopup: false,
                    unlockedBadges: newBadges,
                });

                // Add XP and points
                get().addXP(XP_REWARDS.DAILY_CHECKIN + streakBonus);
                get().addPoints(POINT_REWARDS.DAILY_CHECKIN);
                get().advanceMission("checkin");
            },

            useSpin: () => {
                const state = get();
                const result = spinWheel();

                let newSpinWins = state.totalSpinWins;

                if (result.type !== "nothing") {
                    newSpinWins++;
                    if (result.type === "xp") {
                        setTimeout(() => get().addXP(result.value as number), 2000);
                    } else if (result.type === "points") {
                        setTimeout(() => get().addPoints(result.value as number), 2000);
                    } else {
                        setTimeout(
                            () =>
                                set({
                                    showRewardToast: true,
                                    rewardToastMessage: `Won: ${result.label}!`,
                                    rewardToastType: "discount",
                                }),
                            2000
                        );
                    }
                }

                // Unlock spinner badge
                const newBadges = [...state.unlockedBadges];
                if (newSpinWins >= 3 && !newBadges.includes("spinner")) newBadges.push("spinner");

                set({
                    spinsAvailable: Math.max(0, state.spinsAvailable - 1),
                    lastSpinDate: getToday(),
                    totalSpinWins: newSpinWins,
                    unlockedBadges: newBadges,
                });

                get().advanceMission("spin");

                return result;
            },

            redeemPoints: (amount) => {
                const state = get();
                if (state.points < amount) return false;
                set({ points: state.points - amount });
                return true;
            },

            recordPurchase: (amount, category) => {
                const state = get();
                const newOrders = state.totalOrders + 1;
                const newTotalSpent = state.totalSpent + amount;
                const newCategories = state.categoriesBought.includes(category)
                    ? state.categoriesBought
                    : [...state.categoriesBought, category];

                // Unlock purchase badges
                const newBadges = [...state.unlockedBadges];
                if (newOrders >= 1 && !newBadges.includes("first_purchase")) newBadges.push("first_purchase");
                if (newOrders >= 5 && !newBadges.includes("five_purchases")) newBadges.push("five_purchases");
                if (newOrders >= 10 && !newBadges.includes("ten_purchases")) newBadges.push("ten_purchases");
                if (newTotalSpent >= 10000 && !newBadges.includes("big_spender")) newBadges.push("big_spender");
                if (newCategories.length >= 3 && !newBadges.includes("variety_master")) newBadges.push("variety_master");

                set({
                    totalOrders: newOrders,
                    totalSpent: newTotalSpent,
                    categoriesBought: newCategories,
                    spinsAvailable: state.spinsAvailable + 1, // earn a spin on purchase
                    unlockedBadges: newBadges,
                });

                // Award XP and points
                const xpAmount = newOrders === 1 ? XP_REWARDS.FIRST_PURCHASE : XP_REWARDS.PURCHASE;
                get().addXP(xpAmount);
                get().addPoints(Math.floor(amount * POINT_REWARDS.PURCHASE_MULTIPLIER));
                get().advanceMission("purchase");
            },

            recordReview: () => {
                const state = get();
                const newReviews = state.totalReviews + 1;
                const newBadges = [...state.unlockedBadges];
                if (newReviews >= 1 && !newBadges.includes("first_review")) newBadges.push("first_review");

                set({ totalReviews: newReviews, unlockedBadges: newBadges });
                get().addXP(XP_REWARDS.REVIEW);
                get().addPoints(POINT_REWARDS.REVIEW);
                get().advanceMission("review");
            },

            recordShare: () => {
                const state = get();
                const newShares = state.totalShares + 1;
                const newBadges = [...state.unlockedBadges];
                if (newShares >= 5 && !newBadges.includes("social_butterfly")) newBadges.push("social_butterfly");

                set({ totalShares: newShares, unlockedBadges: newBadges });
                get().addXP(XP_REWARDS.SHARE_PRODUCT);
                get().addPoints(POINT_REWARDS.SHARE);
                get().advanceMission("share");
            },

            dismissLevelUp: () => set({ showLevelUp: false }),
            dismissRewardToast: () => set({ showRewardToast: false }),
            dismissCheckinPopup: () => set({ showCheckinPopup: false }),

            checkAndShowCheckin: () => {
                const state = get();
                const today = getToday();
                if (state.lastCheckin !== today) {
                    set({ showCheckinPopup: true });
                }
            },

            refreshMissions: () => {
                const today = getToday();
                const state = get();
                if (state.missionsLastRefreshed !== today) {
                    // Shuffle and pick 4 random missions
                    const shuffled = [...MISSION_TEMPLATES].sort(() => Math.random() - 0.5);
                    set({
                        activeMissions: shuffled.slice(0, 4).map((m) => ({ ...m, progress: 0, completed: false })),
                        missionsLastRefreshed: today,
                    });
                }
            },

            advanceMission: (type) => {
                set((s) => ({
                    activeMissions: s.activeMissions.map((m) => {
                        if (m.type === type && !m.completed) {
                            const newProgress = m.progress + 1;
                            const completed = newProgress >= m.target;
                            if (completed) {
                                // Award mission rewards
                                setTimeout(() => {
                                    get().addXP(m.xpReward);
                                    get().addPoints(m.pointReward);
                                }, 500);
                            }
                            return { ...m, progress: newProgress, completed };
                        }
                        return m;
                    }),
                }));
            },

            resetStore: () =>
                set({
                    xp: 0,
                    level: 1,
                    points: 0,
                    tier: "Rookie",
                    totalSpent: 0,
                    unlockedBadges: [],
                    activeMissions: initialMissions(),
                    loginStreak: 0,
                    lastCheckin: null,
                    spinsAvailable: 1,
                    lastSpinDate: null,
                    totalSpinWins: 0,
                    showLevelUp: false,
                    showRewardToast: false,
                    showCheckinPopup: false,
                    totalOrders: 0,
                    totalReviews: 0,
                    totalShares: 0,
                    categoriesBought: [],
                }),
        }),
        {
            name: "shopnova-gamification",
        }
    )
);
