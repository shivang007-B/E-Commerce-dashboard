// ===== ShopNova Gamification Engine =====

// --- Level System ---
export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800, 4800, 6000, 7500, 9500, 12000
];

export const getLevelFromXP = (xp: number): number => {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
};

export const getXPForNextLevel = (level: number): number => {
  return LEVEL_THRESHOLDS[Math.min(level, LEVEL_THRESHOLDS.length - 1)] || 12000;
};

export const getXPProgress = (xp: number) => {
  const level = getLevelFromXP(xp);
  const currentLevelXP = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextLevelXP = LEVEL_THRESHOLDS[Math.min(level, LEVEL_THRESHOLDS.length - 1)] || 12000;
  const progress = xp - currentLevelXP;
  const needed = nextLevelXP - currentLevelXP;
  return { progress, needed, percent: Math.min((progress / needed) * 100, 100) };
};

// --- Tier System ---
export const TIER_NAMES = ["Rookie", "Explorer", "Warrior", "Champion", "Elite"] as const;
export type TierName = typeof TIER_NAMES[number];

export const TIER_COLORS: Record<string, string> = {
  Rookie: "#94A3B8",
  Explorer: "#22C55E",
  Warrior: "#0EA5E9",
  Champion: "#6366F1",
  Elite: "#FACC15",
};

export const getTierFromLevel = (level: number): TierName => {
  if (level <= 3) return "Rookie";
  if (level <= 6) return "Explorer";
  if (level <= 9) return "Warrior";
  if (level <= 12) return "Champion";
  return "Elite";
};

// --- XP & Points ---
export const XP_REWARDS = {
  PURCHASE: 100,
  REVIEW: 30,
  DAILY_CHECKIN: 5,
  SHARE_PRODUCT: 15,
  SHARE: 15,
  REFERRAL: 200,
  FIRST_PURCHASE: 250,
  STREAK_BONUS: 5,
  STREAK_BONUS_7: 50,
  STREAK_BONUS_30: 200,
};

export const POINT_REWARDS = {
  PURCHASE_PERCENT: 0.05,
  PURCHASE_MULTIPLIER: 0.05,
  REVIEW: 20,
  DAILY_CHECKIN: 5,
  SHARE: 10,
  POINTS_TO_CURRENCY: 10,
};

export const getProductXP = (price: number): number => {
  return Math.floor(XP_REWARDS.PURCHASE * (price / 1000));
};

// --- Spin Wheel ---
export interface SpinSegment {
  label: string;
  type: "xp" | "discount" | "points" | "shipping" | "nothing";
  value: number;
  color: string;
}

export const SPIN_SEGMENTS: SpinSegment[] = [
  { label: "+50 XP", type: "xp", value: 50, color: "#6366F1" },
  { label: "10% Off", type: "discount", value: 10, color: "#D946EF" },
  { label: "+100 Pts", type: "points", value: 100, color: "#0EA5E9" },
  { label: "+25 XP", type: "xp", value: 25, color: "#22C55E" },
  { label: "Free Ship", type: "shipping", value: 0, color: "#FACC15" },
  { label: "+200 XP", type: "xp", value: 200, color: "#6366F1" },
  { label: "5% Off", type: "discount", value: 5, color: "#EF4444" },
  { label: "+50 Pts", type: "points", value: 50, color: "#0EA5E9" },
];

export const spinWheel = (): SpinSegment => {
  const idx = Math.floor(Math.random() * SPIN_SEGMENTS.length);
  return SPIN_SEGMENTS[idx];
};

// --- Badges ---
export interface BadgeDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
}

export const BADGE_DEFINITIONS: BadgeDef[] = [
  { id: "first_blood", name: "First Blood", description: "Make your first purchase", icon: "🩸", xpReward: 50 },
  { id: "streak_3", name: "On Fire", description: "3-day login streak", icon: "🔥", xpReward: 30 },
  { id: "streak_7", name: "Streak Master", description: "7-day login streak", icon: "⚡", xpReward: 100 },
  { id: "streak_30", name: "Unstoppable", description: "30-day login streak", icon: "🌟", xpReward: 500 },
  { id: "big_spender", name: "Big Spender", description: "Spend ₹10,000+", icon: "💰", xpReward: 200 },
  { id: "whale", name: "Whale", description: "Spend ₹50,000+", icon: "🐳", xpReward: 1000 },
  { id: "reviewer", name: "Critic", description: "Write 5 reviews", icon: "✍️", xpReward: 75 },
  { id: "top_reviewer", name: "Top Critic", description: "Write 20 reviews", icon: "📝", xpReward: 250 },
  { id: "social_butterfly", name: "Influencer", description: "Share 10 products", icon: "📢", xpReward: 100 },
  { id: "level_5", name: "Rising Star", description: "Reach Level 5", icon: "⭐", xpReward: 150 },
  { id: "level_10", name: "Veteran", description: "Reach Level 10", icon: "🏅", xpReward: 300 },
  { id: "variety", name: "Variety Master", description: "Buy from 5 categories", icon: "🎨", xpReward: 100 },
];

// --- Missions ---
export interface MissionDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: string;
  target: number;
  xpReward: number;
  pointReward: number;
}

export const MISSION_TEMPLATES: MissionDef[] = [
  { id: "m1", title: "Shopping Spree", description: "Make 3 purchases this week", icon: "🛒", type: "purchase", target: 3, xpReward: 150, pointReward: 100 },
  { id: "m2", title: "Voice of the People", description: "Write 2 reviews", icon: "💬", type: "review", target: 2, xpReward: 80, pointReward: 50 },
  { id: "m3", title: "Social Sharer", description: "Share 3 products", icon: "📢", type: "share", target: 3, xpReward: 60, pointReward: 30 },
  { id: "m4", title: "Loyal Player", description: "Check in 5 days in a row", icon: "🔥", type: "checkin", target: 5, xpReward: 100, pointReward: 75 },
  { id: "m5", title: "Big Purchase", description: "Spend ₹5,000 this week", icon: "💎", type: "spend", target: 5000, xpReward: 200, pointReward: 150 },
  { id: "m6", title: "Explorer", description: "Browse 10 products", icon: "🔍", type: "browse", target: 10, xpReward: 40, pointReward: 20 },
];

// --- Leaderboard (mock) ---
export const LEADERBOARD = [
  { rank: 1, name: "NeonBlade_X", level: 15, tier: "Elite", xp: 14500 },
  { rank: 2, name: "CyberPunk92", level: 14, tier: "Elite", xp: 12800 },
  { rank: 3, name: "ShadowFox", level: 13, tier: "Champion", xp: 11200 },
  { rank: 4, name: "PixelHunter", level: 12, tier: "Champion", xp: 9800 },
  { rank: 5, name: "NovaStar", level: 11, tier: "Champion", xp: 8500 },
  { rank: 6, name: "ByteRunner", level: 10, tier: "Warrior", xp: 7200 },
  { rank: 7, name: "GlitchKing", level: 9, tier: "Warrior", xp: 6100 },
  { rank: 8, name: "DataWraith", level: 8, tier: "Warrior", xp: 5300 },
  { rank: 9, name: "ZeroDay", level: 7, tier: "Explorer", xp: 4200 },
  { rank: 10, name: "ArcticWolf", level: 6, tier: "Explorer", xp: 3500 },
];
