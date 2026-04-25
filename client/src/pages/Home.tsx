import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import {
  Sparkles, Trophy, ChevronRight, Users,
  Settings, BookOpen, History, BarChart2,
  TrendingUp, Zap,
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
    <div className="min-h-screen bg-white antialiased">

      {/* ══ HERO ═══════════════════════════════════════ */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 md:pt-32 md:pb-28">

        {/* badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-xs font-semibold mb-10 tracking-wide">
          <Sparkles className="w-3.5 h-3.5" />
          Gemini 2.5 Flash 搭載
        </div>

        {/* product name */}
        <h1 className="font-black tracking-tight leading-none mb-3">
          <span className="block text-5xl sm:text-6xl md:text-7xl text-gray-950">
            AID ANALYTICS
          </span>
          <span className="block text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent mt-1">
            for Volleyball
          </span>
        </h1>

        {/* tagline */}
        <p className="mt-8 text-lg md:text-xl text-gray-500 max-w-lg leading-relaxed">
          全プレーを3秒で記録。AIがリアルタイムで分析し、
          <br className="hidden md:block" />
          タイムアウト時に戦術提案を届けます。
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center">
          <Link href="/setup">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-6 text-base rounded-xl shadow-lg shadow-orange-500/25 transition-all"
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
              className="border-gray-200 text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 px-8 py-6 text-base rounded-xl transition-all"
            >
              <History className="w-4 h-4 mr-2" />
              試合履歴
            </Button>
          </Link>
        </div>

        {/* match code */}
        <div className="mt-5 flex gap-2">
          <Input
            className="w-44 border-gray-200 text-center font-mono text-sm rounded-xl placeholder:text-gray-300 focus:border-orange-400"
            placeholder="試合コード（8桁）"
            value={matchCode}
            onChange={(e) => setMatchCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleJoinMatch()}
            maxLength={8}
          />
          <Button
            variant="outline"
            className="border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50"
            disabled={!matchCode || getByCodeQuery.isFetching}
            onClick={handleJoinMatch}
          >
            {getByCodeQuery.isFetching ? "…" : "参加"}
          </Button>
        </div>
      </section>

      {/* ══ DIVIDER ════════════════════════════════════ */}
      <div className="border-t border-gray-100" />

      {/* ══ STATS ══════════════════════════════════════ */}
      <section className="py-10 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[
            { value: "3秒", label: "平均記録時間 / プレー" },
            { value: "9", label: "分析ビューの種類" },
            { value: "AI", label: "Gemini 2.5 Flash" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl md:text-4xl font-black text-gray-950">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ DIVIDER ════════════════════════════════════ */}
      <div className="border-t border-gray-100" />

      {/* ══ FEATURES ═══════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-gray-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-950 tracking-tight">
              勝利に必要な機能が、すべて揃っています
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                color: "text-orange-500 bg-orange-50",
                title: "高速タップ入力",
                desc: "1プレー3〜4タップで完結。コート図タップで着弾点・アウト・ブロックアウトも即記録できます。",
              },
              {
                icon: TrendingUp,
                color: "text-blue-500 bg-blue-50",
                title: "点数推移グラフ",
                desc: "ラリーごとのスコア変化をリアルタイムでライングラフ表示。ターニングポイントを即座に把握。",
              },
              {
                icon: Sparkles,
                color: "text-amber-500 bg-amber-50",
                title: "AI 戦術提案",
                desc: "Gemini 2.5 Flashが試合状況を解析。タイムアウト・セット間に実行可能な戦術を日本語で提示。",
              },
              {
                icon: BarChart2,
                color: "text-purple-500 bg-purple-50",
                title: "9種類の分析ビュー",
                desc: "概要・選手別・チーム比較・ヒートマップ・ポジション・戦術・セット分析を網羅。",
              },
              {
                icon: Users,
                color: "text-green-500 bg-green-50",
                title: "チーム・選手管理",
                desc: "選手情報・スタメン設定・相手チーム登録に対応。試合ごとのメンバー設定も簡単。",
              },
              {
                icon: History,
                color: "text-rose-500 bg-rose-50",
                title: "試合履歴管理",
                desc: "過去の全試合をリスト管理。検索・フィルタ・削除に対応。コードで参加も可能。",
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200">
                <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DIVIDER ════════════════════════════════════ */}
      <div className="border-t border-gray-100" />

      {/* ══ BOTTOM NAV ═════════════════════════════════ */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-black text-gray-950 text-lg">AID ANALYTICS <span className="text-orange-500">for Volleyball</span></p>
            <p className="text-sm text-gray-400 mt-0.5">チームを登録して最初の試合を始めましょう</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/teams">
              <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600 rounded-lg">
                <Users className="w-3.5 h-3.5 mr-1.5" />チーム管理
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600 rounded-lg">
                <Settings className="w-3.5 h-3.5 mr-1.5" />設定
              </Button>
            </Link>
            <Link href="/guide">
              <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600 rounded-lg">
                <BookOpen className="w-3.5 h-3.5 mr-1.5" />使い方ガイド
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
