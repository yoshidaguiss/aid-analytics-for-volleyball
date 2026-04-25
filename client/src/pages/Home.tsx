import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import {
  Sparkles,
  Trophy,
  ChevronRight,
  Users,
  Settings,
  BookOpen,
  History,
  Play,
  BarChart2,
  Cpu,
  Layers,
} from "lucide-react";

/* ─── tiny mock score card shown in hero ─────────────────────── */
function ScoreCard() {
  return (
    <div className="w-full max-w-xs mx-auto bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm select-none">
      {/* live badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LIVE · 第3セット
        </span>
        <span className="text-xs text-white/40">Set 2-0</span>
      </div>
      {/* teams */}
      <div className="space-y-3 mb-5">
        {[
          { name: "○○高校", score: 18, pct: 72, color: "bg-orange-500" },
          { name: "△△高校", score: 14, pct: 56, color: "bg-blue-500" },
        ].map((t) => (
          <div key={t.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white/80 font-medium">{t.name}</span>
              <span className="font-black text-white tabular-nums">{t.score}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className={`h-full ${t.color} rounded-full transition-all`} style={{ width: `${t.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      {/* stats row */}
      <div className="grid grid-cols-3 gap-2 text-center border-t border-white/10 pt-4">
        {[
          { label: "攻撃決定率", value: "61%" },
          { label: "サーブ効果", value: "34%" },
          { label: "ブロック", value: "4本" },
        ].map((s) => (
          <div key={s.label}>
            <div className="text-xs text-white/40 mb-0.5">{s.label}</div>
            <div className="text-sm font-bold text-white">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
    <div className="min-h-screen font-sans">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative bg-[#0d0d0d] text-white overflow-hidden min-h-[92vh] flex items-center">

        {/* faint dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* orange radial */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-orange-600/15 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-500/8 blur-[80px] pointer-events-none" />

        <div className="relative w-full container max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold mb-8 tracking-wide">
                <Sparkles className="w-3 h-3" />
                Gemini 2.5 Flash · AI分析
              </div>

              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">
                <span className="text-white">勝利へ導く</span>
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #fb923c 0%, #fbbf24 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  バレーボール
                </span>
                <br />
                <span className="text-white">分析プラットフォーム</span>
              </h1>

              <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-md">
                試合中の全プレーを3秒で記録。AIがリアルタイムで戦況を解析し、
                コーチングに必要な洞察を即座に提供します。
              </p>

              {/* primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link href="/setup">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-7 py-6 text-base rounded-xl shadow-xl shadow-orange-500/25 hover:shadow-orange-400/35 transition-all duration-200"
                  >
                    <Play className="w-4 h-4 mr-2 fill-current" />
                    試合を開始する
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/matches">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-white/8 px-7 py-6 text-base rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    <History className="w-4 h-4 mr-2" />
                    試合履歴
                  </Button>
                </Link>
              </div>

              {/* match code join */}
              <div className="flex gap-2">
                <Input
                  className="w-44 bg-white/8 border-white/15 text-white placeholder:text-white/30 text-center font-mono text-sm rounded-xl focus:border-orange-500/50 focus:bg-white/12"
                  placeholder="試合コード（8桁）"
                  value={matchCode}
                  onChange={(e) => setMatchCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => e.key === "Enter" && handleJoinMatch()}
                  maxLength={8}
                />
                <Button
                  variant="outline"
                  className="border-white/15 text-white/70 hover:text-white hover:bg-white/10 bg-transparent rounded-xl"
                  disabled={!matchCode || getByCodeQuery.isFetching}
                  onClick={handleJoinMatch}
                >
                  {getByCodeQuery.isFetching ? "..." : "参加"}
                </Button>
              </div>
            </div>

            {/* Right: mock score card */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative">
                {/* glow behind card */}
                <div className="absolute inset-0 rounded-3xl bg-orange-500/20 blur-3xl scale-110" />
                <div className="relative">
                  <ScoreCard />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section className="bg-[#0d0d0d] pb-20">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
            {[
              { step: "01", icon: Users, title: "チームを登録", desc: "選手情報を登録して試合を作成。相手チームも選択可能。" },
              { step: "02", icon: Play, title: "タップで記録", desc: "1プレー3秒。コート図タップで着弾点まで即座に入力。" },
              { step: "03", icon: Cpu, title: "AI が分析", desc: "Gemini 2.5 Flashがリアルタイムで戦術提案を生成。" },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="bg-[#141414] px-8 py-8">
                <div className="text-orange-500/60 text-xs font-black tracking-[0.2em] mb-4">{step}</div>
                <Icon className="w-6 h-6 text-orange-400 mb-3" />
                <div className="text-white font-bold text-lg mb-2">{title}</div>
                <div className="text-white/40 text-sm leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURES ═══════════════════ */}
      <section className="bg-white py-20 md:py-28">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
              勝利に必要なすべてが、ここに
            </h2>
            <p className="text-gray-500 text-lg max-w-lg mx-auto">
              入力から分析・AI提案まで、一つのプラットフォームで完結します
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BarChart2,
                accent: "from-orange-500 to-amber-400",
                title: "リアルタイム点数推移",
                desc: "ラリーごとのスコア変化をグラフで可視化。ターニングポイントを即座に把握できます。",
              },
              {
                icon: Layers,
                accent: "from-purple-500 to-violet-400",
                title: "9種類の分析ビュー",
                desc: "概要・選手・比較・ヒートマップ・戦術・セット別など多角的に分析。",
              },
              {
                icon: Sparkles,
                accent: "from-amber-500 to-yellow-400",
                title: "AI戦術提案",
                desc: "試合状況をAIが解析。タイムアウト・セット間に実行可能な戦術を日本語で提示。",
              },
              {
                icon: Users,
                accent: "from-green-500 to-emerald-400",
                title: "選手別パフォーマンス",
                desc: "アタック・サーブ・レシーブ・ブロックを選手ごとに集計。調子の可視化も対応。",
              },
              {
                icon: Play,
                accent: "from-blue-500 to-cyan-400",
                title: "着弾点ヒートマップ",
                desc: "攻撃・サーブの着弾点をコート図にマッピング。アウト・ブロックアウトも記録可能。",
              },
              {
                icon: History,
                accent: "from-rose-500 to-pink-400",
                title: "試合履歴管理",
                desc: "過去の試合データを一覧管理。検索・フィルタ・削除に対応。",
              },
            ].map(({ icon: Icon, accent, title, desc }) => (
              <div
                key={title}
                className="group relative p-6 rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-xl hover:shadow-gray-900/5 transition-all duration-300"
              >
                <div className={`inline-flex w-10 h-10 rounded-xl bg-gradient-to-br ${accent} items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ BOTTOM CTA ═══════════════════ */}
      <section className="bg-[#0d0d0d]">
        <div className="container max-w-6xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-black text-white mb-2">今すぐ始める</h2>
              <p className="text-white/40 text-sm">チーム登録から分析まで、無料でお使いいただけます</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/teams">
                <Button variant="outline" className="border-white/15 text-white/70 hover:text-white hover:bg-white/10 bg-transparent rounded-xl">
                  <Users className="w-4 h-4 mr-2" />
                  チーム管理
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="outline" className="border-white/15 text-white/70 hover:text-white hover:bg-white/10 bg-transparent rounded-xl">
                  <Settings className="w-4 h-4 mr-2" />
                  設定
                </Button>
              </Link>
              <Link href="/guide">
                <Button variant="outline" className="border-white/15 text-white/70 hover:text-white hover:bg-white/10 bg-transparent rounded-xl">
                  <BookOpen className="w-4 h-4 mr-2" />
                  使い方ガイド
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
