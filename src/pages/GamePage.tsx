import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// 游戏已迁到工作室站 play.mucolumbae.com（接 Cloudflare R2 biav-demo 桶，发版即更新，公开可玩、无暗号门）。
// 个人站旧 /game 路由整页跳转过去，不再托管暗号门 / iframe / changelog / Discord。
const PLAY_URL = "https://play.mucolumbae.com/";

export default function GamePage() {
  useEffect(() => {
    trackEvent("game_redirect");
    window.location.replace(PLAY_URL);
  }, []);

  // JS 关闭 / 跳转慢时的兜底链接。
  return (
    <section className="mx-auto max-w-md px-5 py-24 text-center">
      <p className="text-[14px] text-fg-2">
        Redirecting to{" "}
        <a href={PLAY_URL} className="underline hover:text-fg">
          play.mucolumbae.com
        </a>
        …
      </p>
    </section>
  );
}
