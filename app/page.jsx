"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, RefreshCcw, Share2, Sparkles, ArrowRight, ExternalLink, Orbit } from "lucide-react";

function Card({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardHeader({ className = "", children }) {
  return <div className={className}>{children}</div>;
}

function CardTitle({ className = "", children }) {
  return <h2 className={className}>{children}</h2>;
}

function Button({ className = "", children, variant, size, ...props }) {
  const base = "inline-flex items-center justify-center font-medium transition";
  const variantClass =
    variant === "outline"
      ? "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
      : "bg-slate-900 text-white hover:bg-slate-800";
  const sizeClass = size === "lg" ? "px-6 py-3" : "px-4 py-2";

  return (
    <button className={`${base} ${variantClass} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Badge({ className = "", children, variant }) {
  const variantClass =
    variant === "secondary"
      ? "bg-slate-100 text-slate-700"
      : "bg-slate-900 text-white";

  return <span className={`inline-flex items-center ${variantClass} ${className}`}>{children}</span>;
}

const FORM_LINK = "https://example.com";

const results = {
  BIGBANG: {
    code: "빅뱅형",
    emoji: "💥",
    title: "시작과 에너지로 우주를 움직이는 빅뱅형",
    subtitle: "강한 추진력으로 새로운 흐름을 만드는 타입",
    color: "from-rose-400 via-orange-400 to-amber-500",
    description:
      "당신은 멈춰 있던 우주를 움직이게 만드는 사람입니다. 가만히 있기보다 직접 시작하고, 새로운 판을 열어 분위기를 바꾸는 힘이 있어요. 아이디어가 떠오르면 빠르게 실행으로 옮기며, 당신의 에너지는 주변에도 큰 영향을 줍니다.",
    keywords: ["추진력", "시작", "에너지", "변화"],
    shareText:
      "나의 별 타입은 빅뱅형 💥 시작과 에너지로 우주를 움직이는 타입! #나의별타입은 #우주테스트 #이벤트",
  },
  POLARIS: {
    code: "북극성형",
    emoji: "⭐",
    title: "흔들리지 않는 기준을 가진 북극성형",
    subtitle: "조용하지만 분명한 방향을 보여주는 타입",
    color: "from-sky-400 via-blue-500 to-indigo-600",
    description:
      "당신은 밤하늘의 기준점 같은 사람입니다. 많은 사람들이 당신을 보며 방향을 찾고, 조용하지만 확실한 신뢰를 줍니다. 한 번 정한 기준을 쉽게 흔들리지 않고 꾸준히 지켜내는 힘이 강합니다.",
    keywords: ["안정감", "기준", "신뢰", "꾸준함"],
    shareText:
      "나의 별 타입은 북극성형 ⭐ 흔들리지 않는 중심을 가진 타입! #나의별타입은 #우주테스트 #이벤트",
  },
  BLACKHOLE: {
    code: "블랙홀형",
    emoji: "🕳️",
    title: "깊은 몰입과 밀도를 지닌 블랙홀형",
    subtitle: "겉보다 내면의 에너지가 더 강한 타입",
    color: "from-slate-700 via-slate-900 to-black",
    description:
      "당신은 쉽게 읽히지 않는 깊은 우주 같은 사람입니다. 조용해 보여도 내면에는 강한 밀도와 집중력이 있고, 한 번 빠지면 누구보다 깊게 몰입합니다. 겉으로 드러나는 것보다 속에 쌓인 생각과 감정이 훨씬 풍부한 편입니다.",
    keywords: ["몰입", "깊이", "집중", "내면"],
    shareText:
      "나의 별 타입은 블랙홀형 🕳️ 조용하지만 깊이가 남다른 타입! #나의별타입은 #우주테스트 #이벤트",
  },
  GALAXY: {
    code: "은하형",
    emoji: "🌌",
    title: "연결과 확장으로 빛나는 은하형",
    subtitle: "사람과 감정을 이어 하나의 세계를 만드는 타입",
    color: "from-violet-400 via-fuchsia-500 to-indigo-500",
    description:
      "당신은 수많은 별을 이어 하나의 세계를 만드는 사람입니다. 사람과 감정을 자연스럽게 연결하고, 함께할 때 더 크게 빛납니다. 관계 속에서 힘을 얻으며 넓은 시야와 공감력으로 분위기를 풍부하게 만듭니다.",
    keywords: ["연결", "공감", "확장", "관계"],
    shareText:
      "나의 별 타입은 은하형 🌌 사람과 감정을 연결하며 빛나는 타입! #나의별타입은 #우주테스트 #이벤트",
  },
};

const questions = [
  {
    id: 1,
    question: "당신이 우주의 창조주가 되어 단 하나의 별을 만든다면, 가장 먼저 채우고 싶은 것은?",
    options: [
      { text: "폭발적으로 타오르는 시작의 에너지", type: "BIGBANG" },
      { text: "흔들리지 않는 빛의 방향과 질서", type: "POLARIS" },
      { text: "겉으로 다 보이지 않는 깊은 밀도", type: "BLACKHOLE" },
      { text: "다양한 존재를 끌어안는 연결의 힘", type: "GALAXY" },
    ],
  },
  {
    id: 2,
    question: "새로운 상황이 시작될 때 나는 보통?",
    options: [
      { text: "일단 먼저 시작하고 분위기를 만든다", type: "BIGBANG" },
      { text: "전체 방향과 기준부터 잡는다", type: "POLARIS" },
      { text: "충분히 생각한 뒤 조용히 움직인다", type: "BLACKHOLE" },
      { text: "사람들과 흐름을 맞추며 넓게 본다", type: "GALAXY" },
    ],
  },
  {
    id: 3,
    question: "사람들이 나를 가장 많이 느끼는 순간은?",
    options: [
      { text: "내가 등장하면 분위기가 확 바뀔 때", type: "BIGBANG" },
      { text: "내가 중심을 잡아주고 있다고 느낄 때", type: "POLARIS" },
      { text: "말수는 적어도 존재감이 깊게 남을 때", type: "BLACKHOLE" },
      { text: "사람들이 자연스럽게 연결되고 있을 때", type: "GALAXY" },
    ],
  },
  {
    id: 4,
    question: "문제가 생기면 나는 어떻게 해결하는 편일까?",
    options: [
      { text: "빠르게 돌파할 방법부터 찾는다", type: "BIGBANG" },
      { text: "기준과 순서를 정리해 해결한다", type: "POLARIS" },
      { text: "원인을 깊게 파고들며 분석한다", type: "BLACKHOLE" },
      { text: "주변과 소통하며 해답을 넓혀 간다", type: "GALAXY" },
    ],
  },
  {
    id: 5,
    question: "내 별이 밤하늘에서 가장 빛나는 방식은?",
    options: [
      { text: "단번에 눈길을 사로잡는 강렬함", type: "BIGBANG" },
      { text: "멀리서도 기준이 되어 주는 선명함", type: "POLARIS" },
      { text: "한 번 빠지면 헤어나오기 힘든 깊이", type: "BLACKHOLE" },
      { text: "수많은 빛과 함께 더 커지는 아름다움", type: "GALAXY" },
    ],
  },
  {
    id: 6,
    question: "나에게 더 중요한 것은?",
    options: [
      { text: "시작할 힘", type: "BIGBANG" },
      { text: "흔들리지 않는 기준", type: "POLARIS" },
      { text: "깊이 있는 몰입", type: "BLACKHOLE" },
      { text: "함께 만드는 관계", type: "GALAXY" },
    ],
  },
  {
    id: 7,
    question: "내가 가장 편안함을 느끼는 역할은?",
    options: [
      { text: "앞에서 판을 여는 사람", type: "BIGBANG" },
      { text: "방향을 잡아주는 사람", type: "POLARIS" },
      { text: "조용히 핵심을 파고드는 사람", type: "BLACKHOLE" },
      { text: "사람들을 잇고 흐름을 넓히는 사람", type: "GALAXY" },
    ],
  },
  {
    id: 8,
    question: "지금의 나를 우주에 비유하면?",
    options: [
      { text: "터질 준비를 마친 새로운 시작", type: "BIGBANG" },
      { text: "길을 잃지 않게 비추는 한 점의 빛", type: "POLARIS" },
      { text: "조용히 모든 걸 끌어당기는 깊은 중심", type: "BLACKHOLE" },
      { text: "수많은 감정과 관계를 품은 넓은 세계", type: "GALAXY" },
    ],
  },
];

function getResult(answers) {
  const score = {
    BIGBANG: 0,
    POLARIS: 0,
    BLACKHOLE: 0,
    GALAXY: 0,
  };

  answers.forEach((type) => {
    score[type] += 1;
  });

  const maxScore = Math.max(...Object.values(score));
  const tiedTypes = Object.keys(score).filter((key) => score[key] === maxScore);

  if (tiedTypes.length === 1) {
    return results[tiedTypes[0]];
  }

  for (let i = answers.length - 1; i >= 0; i -= 1) {
    if (tiedTypes.includes(answers[i])) {
      return results[answers[i]];
    }
  }

  return results.BIGBANG;
}

function ProgressBar({ value }) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-white/60 backdrop-blur">
      <motion.div
        className="h-full rounded-full bg-slate-900"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.35 }}
      />
    </div>
  );
}

export default function StarTypeEventPage() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [copied, setCopied] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = useMemo(() => {
    if (!started) return 0;
    return Math.round((answers.length / questions.length) * 100);
  }, [answers.length, started]);

  const result = answers.length === questions.length ? getResult(answers) : null;

  const handleAnswer = (type) => {
    const nextAnswers = [...answers, type];
    setAnswers(nextAnswers);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentIndex(0);
    setAnswers([]);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = async () => {
    if (!result) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "나의 별 타입은?",
          text: result.shareText,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(`${result.shareText} ${window.location.href}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1e1b4b_0%,_#0f172a_35%,_#020617_100%)] p-4 text-white md:p-8">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-center">
            <Badge className="rounded-full border-0 bg-white px-4 py-1.5 text-sm text-slate-900">우리는 별의 먼지다</Badge>
            <Badge variant="secondary" className="rounded-full px-4 py-1.5 text-sm">우주 성향 테스트</Badge>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur md:p-10">
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <span className="absolute left-[12%] top-[18%] text-sky-200 animate-pulse [animation-duration:2.4s]">✦</span>
              <span className="absolute right-[14%] top-[22%] text-fuchsia-200 animate-ping [animation-duration:2.8s]">✦</span>
              <span className="absolute left-[22%] bottom-[20%] text-white/70 animate-pulse [animation-duration:3.2s]">✦</span>
              <span className="absolute right-[20%] bottom-[18%] text-sky-100 animate-pulse [animation-duration:2s]">✦</span>
            </div>
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-fuchsia-500/20 blur-2xl" />
            <div className="absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-sky-500/20 blur-2xl" />

            <div className="relative text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-lg">
                <Orbit className="h-7 w-7" />
              </div>
              <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.18)] md:text-5xl">
                나의 별 타입은?<br />
                <span className="inline-flex flex-wrap items-center justify-center gap-2">
                  <span>별을 창조 중</span>
                  <span className="inline-flex items-center gap-1 align-middle">
                    <span className="inline-block animate-ping text-sky-300 [animation-duration:1.8s]">✦</span>
                    <span className="inline-block animate-pulse text-fuchsia-300 [animation-duration:1.4s]">✦</span>
                    <span className="inline-block animate-pulse text-white [animation-duration:1.2s]">…</span>
                  </span>
                </span>
              </h1>
              <p className="mt-4 text-base text-slate-200 md:text-lg">
                당신이 우주의 창조주가 되어 단 하나의 별을 만든다면,
                <br className="hidden md:block" />
                어떤 별을 만드시겠습니까?
              </p>
              <p className="mx-auto mt-3 max-w-2xl break-keep text-sm leading-6 text-slate-300 md:text-base">
                몇 가지 질문으로 알아보는 나만의 우주형 성향 테스트.
                <br />
                결과를 공유하면 이벤트 참여까지 완료!
              </p>
            </div>
          </div>
        </motion.div>

        <Card className="overflow-hidden rounded-[32px] border border-white/10 bg-white/90 text-slate-900 shadow-xl backdrop-blur">
          <CardContent className="p-6 md:p-10">
            {!started ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-[28px] bg-slate-900 p-7 text-white md:p-8">
                    <div className="mb-5 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm">
                      결과 타입 미리 보기
                    </div>
                    <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                      당신은 어떤 별을
                      <br />
                      만들게 될까요?
                    </h2>
                    <p className="mt-4 break-keep text-sm leading-6 text-slate-200 md:text-base">
                      총 {questions.length}개의 질문에 답하면
                      <span className="font-semibold text-white"> 빅뱅형 / 북극성형 / 블랙홀형 / 은하형 </span>
                      중 하나의 결과가 나와요.
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {Object.values(results).map((item) => (
                        <div key={item.code} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="text-lg">{item.emoji}</div>
                          <div className="mt-2 font-semibold">{item.code}</div>
                          <div className="mt-1 text-xs text-slate-300">{item.subtitle}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[28px] bg-slate-50 p-7 md:p-8">
                    <div className="mb-4 flex items-center gap-2 text-slate-900">
                      <Sparkles className="h-5 w-5" />
                      <p className="font-semibold">참여 방법</p>
                    </div>

                    <div className="space-y-3">
                      {[
                        "테스트를 진행하고 나의 별 타입을 확인해 주세요.",
                        "결과 화면을 캡처하거나 문구를 복사해 SNS에 공유해 주세요.",
                        "응모 폼에 인증하면 이벤트 참여 완료!",
                      ].map((item, index) => (
                        <div key={item} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                            {index + 1}
                          </div>
                          <p className="break-keep text-sm leading-6 text-slate-600">{item}</p>
                        </div>
                      ))}
                    </div>

                   <Button
  size="lg"
  onClick={() => setStarted(true)}
  className="group mt-6 w-full rounded-2xl bg-gradient-to-r from-sky-400 via-fuchsia-400 to-violet-500 py-6 text-base font-bold text-white shadow-[0_0_30px_rgba(99,102,241,0.35)] transition hover:scale-[1.03] hover:from-sky-300 hover:via-fuchsia-300 hover:to-violet-400"
>
  <span className="relative flex items-center justify-center">
    <span className="mr-2 animate-pulse">✦</span>
    테스트 시작하기
    <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
  </span>
</Button>
                  </div>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div className="mb-5 rounded-[28px] bg-slate-50 p-5 md:p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">테스트 완료</p>
                      <p className="text-lg font-bold text-slate-900">당신의 별 타입을 확인해 보세요</p>
                    </div>
                    <Badge className="rounded-full bg-white px-4 py-1.5 text-slate-700 shadow-sm">결과 화면 캡처 추천</Badge>
                  </div>
                  <ProgressBar value={100} />
                </div>

                <div className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-lg ring-1 ring-slate-200/80 md:p-8">
                  <div className={`rounded-[28px] bg-gradient-to-r ${result.color} p-6 text-white shadow-[0_0_40px_rgba(99,102,241,0.18)] md:p-8`}>
                    <div className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">Star Type Result</div>
                    <div className="mt-3 text-5xl md:text-6xl">{result.emoji}</div>
                    <h2 className="mt-4 text-3xl font-black md:text-4xl">{result.code}</h2>
                    <p className="mt-2 text-base font-semibold text-white/95 md:text-lg">{result.title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/85 md:text-base">{result.subtitle}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {result.keywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="rounded-full px-3 py-1.5 text-sm">
                        #{keyword}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-6 rounded-3xl bg-slate-50 p-5 md:p-6">
                    <p className="break-keep leading-7 text-slate-700">{result.description}</p>
                  </div>

                  <div className="mt-5 rounded-3xl border border-dashed border-slate-200 p-5 md:p-6">
                    <p className="text-sm font-semibold text-slate-700">공유 문구</p>
                    <p className="mt-2 break-keep text-sm leading-6 text-slate-600 md:text-base">{result.shareText}</p>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    <Button onClick={handleCopy} className="rounded-2xl py-6 text-base">
                      <Copy className="mr-2 h-4 w-4" />
                      {copied ? "복사 완료!" : "결과 문구 복사"}
                    </Button>
                    <Button variant="outline" className="rounded-2xl py-6 text-base" onClick={handleShare}>
                      <Share2 className="mr-2 h-4 w-4" />
                      결과 공유하기
                    </Button>
                    <Button variant="outline" className="rounded-2xl py-6 text-base" onClick={handleRestart}>
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      다시 테스트하기
                    </Button>
                  </div>

                  <Button
                    className="mt-3 w-full rounded-2xl py-6 text-base"
                    onClick={() => window.open(FORM_LINK, "_blank", "noopener,noreferrer")}
                  >
                    이벤트 참여하기
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-5 rounded-[28px] bg-slate-50 p-5 md:p-6">
                    <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
                      <span className="font-semibold">
                        QUESTION {currentIndex + 1} / {questions.length}
                      </span>
                      <span>{progress}% 진행 중</span>
                    </div>
                    <ProgressBar value={progress} />
                  </div>

                  <div className="rounded-[28px] bg-white p-2">
                    <CardHeader className="px-3 pb-6 pt-2 md:px-4">
                      <CardTitle className="break-keep text-2xl leading-tight text-slate-900 md:text-3xl">
                        {currentQuestion.question}
                      </CardTitle>
                    </CardHeader>

                    <div className="grid gap-3">
                      {currentQuestion.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(option.type)}
                          className="group rounded-[24px] border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md md:p-6"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <span className="break-keep text-base leading-7 text-slate-700 md:text-lg">
                              {option.text}
                            </span>
                            <span className="mt-1 text-slate-300 transition group-hover:text-slate-700">→</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
