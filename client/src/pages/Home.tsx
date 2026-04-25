import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import {
  Trophy, ChevronRight, History,
  Users, Settings, BookOpen,
  Zap, TrendingUp, Sparkles,
} from "lucide-react";

export default function Home() {
  const [matchCode, setMatchCode] = useState("");
  const [, setLocation] = useLocation();

  const getByCodeQuery = trpc.matches.getByCode.useQuery(
    { matchCode: matchCode.toUpperCase() },
    { enabled: false }
  );

  const handleJoinMatch = async () => {
    if (!matchCode || matchCode.length !== 8) {
      toast.error("8桁の試合コードを入力してください");
      return;
    }
    try {
      const result = await getByCodeQuery.refetch();
      if (result.data) {
        setLocation(`/coach/${result.data.id}`);
      } else {
        toast.error("試合が見つかりません。コードを確認してください。");
      }
    } catch {
      toast.error("エラーが発生しました");
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden">

        {/* subtle orange blob top-right */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
        />

        {/* subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative max-w-4xl">
          {/* label */}
          <p className="text-xs font-bold tracking-[0.25em] text-orange-500 uppercase mb-6">
            AI Volleyball Analytics Platform
          </p>

          {/* headline — the whole point */}
          <h1 className="font-black leading-[0.95] tracking-tight mb-8">
            <span className="block text-[clamp(3.5rem,10vw,7rem)] text-gray-950">
              AID ANALYTICS
            </span>
            <span
              className="block text-[clamp(2.5rem,7vw,5rem)]"
              style={{
                background: "linear-gradient(90deg,#f97316 0%,#fbbf24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              for Volleyball
            </span>
          </h1>

          {/* description */}
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
            全プレーを3秒で記録し、Gemini AIが戦況をリアルタイム解析。
            タイムアウト時に具体的な戦術提案を届けます。
          </p>

          {/* primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link href="/setup">
              <Button
                size="lg"
                className="bg-gray-950 hover:bg-gray-800 text-white font-bold px-8 py-6 text-base rounded-xl transition-colors"
              >
                <Trophy className="w-4 h-4 mr-2" />
                試合を開始する
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/matches">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-200 text-gray-600 hover:bg-gray-50 px-8 py-6 text-base rounded-xl transition-colors"
              >
                <History className="w-4 h-4 mr-2" />
                試合履歴
              </Button>
            </Link>
          </div>

          {/* match code */}
          <div className="flex gap-2 items-center">
            <Input
              className="w-44 border-gray-200 text-center font-mono text-sm rounded-xl placeholder:text-gray-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400"
              placeholder="試合コード（8桁）"
              value={matchCode}
              onChange={(e) => setMatchCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleJoinMatch()}
              maxLength={8}
            />
            <Button
              variant="ghost"
              className="text-gray-500 hover:text-gray-900"
              disabled={!matchCode || getByCodeQuery.isFetching}
              onClick={handleJoinMatch}
            >
              {getByCodeQuery.isFetching ? "…" : "参加する →"}
            </Button>
          </div>
        </div>

        {/* bottom-right decorative stat */}
        <div className="absolute bottom-12 right-8 md:right-16 hidden md:block text-right">
          <p className="text-[clamp(4rem,8vw,6rem)] font-black text-gray-100 leading-none select-none">
            3sec
          </p>
          <p className="text-sm text-gray-400 -mt-2">per play</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURES  ー  borderless, no cards
      ══════════════════════════════════════════════════ */}
      <section className="border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto">
          {[
            {
              icon: Zap,
              label: "01",
              title: "高速タップ入力",
              desc: "1プレー3〜4タップで完結。コート図タップで着弾点・アウト・ブロックアウトも記録可能。試合中でも止まらず入力できます。",
            },
            {
              icon: TrendingUp,
              label: "02",
              title: "リアルタイム分析",
              desc: "点数推移グラフ・選手別成功率・ヒートマップ・チーム比較など9種類のビューを試合コードで複数端末から同時閲覧。",
            },
            {
              icon: Sparkles,
              label: "03",
              title: "AI 戦術提案",
              desc: "Gemini 2.5 Flashが試合データを解析し、タイムアウト・セット間に具体的で実行可能な戦術を日本語で提示します。",
            },
          ].map(({ icon: Icon, label, title, desc }, i) => (
            <div
              key={label}
              className={`grid md:grid-cols-[1fr_2fr] gap-6 px-8 md:px-16 py-12 ${i > 0 ? "border-t border-gray-100" : ""}`}
            >
              <div className="flex items-start gap-4">
                <span className="text-xs font-bold text-gray-300 tracking-widest mt-1">{label}</span>
                <div>
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-black text-gray-950">{title}</h3>
                </div>
              </div>
              <p className="text-gray-500 leading-relaxed md:pt-12">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════════ */}
      <section className="border-t border-gray-100 bg-gray-950 text-white px-6 md:px-16 py-16">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-orange-500 uppercase mb-2">
              AID ANALYTICS for Volleyball
            </p>
            <p className="text-2xl md:text-3xl font-black">今すぐ始める</p>
            <p className="text-gray-500 text-sm mt-1">チーム登録から分析まですべて無料</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/teams", icon: Users, label: "チーム管理" },
              { href: "/settings", icon: Settings, label: "設定" },
              { href: "/guide", icon: BookOpen, label: "使い方ガイド" },
            ].map(({ href, icon: Icon, label }) => (
              <Link key={href} href={href}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/15 text-white/70 hover:text-white hover:bg-white/8 bg-transparent rounded-lg"
                >
                  <Icon className="w-3.5 h-3.5 mr-1.5" />
                  {label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
