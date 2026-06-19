import { supabase } from "./supabase";

/**
 * 试玩数据看板的数据访问层。
 * 全部走 Supabase 的 security-definer RPC（只返回聚合数字，不暴露原始事件/反馈），
 * 所以即便匿名 key 也只能拿到汇总。原始反馈仍只你能在 Supabase 后台看。
 * 需要先在 Supabase 跑一次建函数 SQL（见 supabase-dashboard.sql）。
 */

export interface Overview {
  players: number;
  sessions: number;
  runs: number;
  events: number;
}
export interface Battle {
  chapter: number;
  result: string;
  n: number;
}
export interface NameCount {
  cause?: string;
  card?: string;
  n: number;
}
export interface FunnelStep {
  step: string;
  n: number;
}

async function rpc<T>(fn: string): Promise<T> {
  if (!supabase) throw new Error("Supabase 未配置（本地缺 env）");
  const { data, error } = await supabase.rpc(fn);
  if (error) throw error;
  return data as T;
}

export const getOverview = () => rpc<Overview>("biav_overview");
export const getBattles = () => rpc<Battle[]>("biav_battles");
export const getDeaths = () => rpc<NameCount[]>("biav_deaths");
export const getCards = () => rpc<NameCount[]>("biav_cards");
export const getFunnel = () => rpc<FunnelStep[]>("biav_funnel");
