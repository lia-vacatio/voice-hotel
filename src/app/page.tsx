'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Play, Volume2, Zap, Shield, Users, Monitor, CheckCircle, ArrowRight, Star, Sparkles, MousePointer2, Timer, AlertTriangle, GraduationCap, Layers3, Sparkle, User, MessageSquare, Mail, Building, Send } from 'lucide-react';

interface DemoCommand {
  command: string;
  processing: string;
  response: string;
  visual: string;
}

export default function Home() {
  const [lang, setLang] = useState<'en' | 'ko'>('ko');
  const navTexts = {
    demo: lang === 'ko' ? '데모' : 'Demo',
    features: lang === 'ko' ? '특징' : 'Features',
    comparison: lang === 'ko' ? '비교' : 'Comparison',
    company: lang === 'ko' ? '회사' : 'Company',
    contact: lang === 'ko' ? '문의' : 'Contact',
    ko: '한국어',
    en: 'EN',
  } as const;
  const heroTexts = {
    title1: lang === 'ko' ? '화면 없이 운영하세요' : 'Operate without screens',
    title2: lang === 'ko' ? '말하기만 하세요' : 'Just speak',
    subtitle: lang === 'ko' ? '호텔 운영의 미래는 목소리에서 시작됩니다' : 'The future of hospitality starts with your voice',
    click: lang === 'ko' ? '클릭해서 데모를 체험해 보세요' : 'Click to experience interactive demo',
    currentDemo: lang === 'ko' ? '현재 데모' : 'Current demo',
    demoWord: lang === 'ko' ? '데모' : 'Demo',
    ofWord: lang === 'ko' ? ' / ' : 'of',
    tryAnotherExample: lang === 'ko' ? '다른 예시 보기 →' : 'Try another example →',
    step1: lang === 'ko' ? '1단계:' : 'Step 1:',
    step1Label: lang === 'ko' ? '음성 명령' : 'Voice Command',
    step2: lang === 'ko' ? '2단계:' : 'Step 2:',
    step2Label: lang === 'ko' ? 'AI 처리' : 'AI Processing',
    step3: lang === 'ko' ? '3단계:' : 'Step 3:',
    step3Label: lang === 'ko' ? 'AI 응답' : 'AI Response',
    step4: lang === 'ko' ? '데모 완료' : 'Demo Complete',
    step4Desc: lang === 'ko' ? 'PMS가 성공적으로 업데이트되었습니다.' : 'PMS interface updated successfully.',
    replay: lang === 'ko' ? '다시 재생' : 'Replay',
    tryAnother: lang === 'ko' ? '다른 예시 →' : 'Try another →',
    resultShowing: lang === 'ko' ? ' - 결과 표시 중' : ' - Result showing',
    pmsInterface: lang === 'ko' ? 'PMS 인터페이스' : 'PMS Interface',
    step4Label: lang === 'ko' ? '실시간 업데이트' : 'Live Update',
    listening: lang === 'ko' ? '음성을 듣는 중...' : 'Listening for your voice...',
    aiReady: lang === 'ko' ? 'AI 인터페이스 준비됨' : 'AI-powered interface ready',
    ready: lang === 'ko' ? '준비 완료' : 'Ready',
    userRole: lang === 'ko' ? '호텔 매니저' : 'Hotel Manager',
    aiName: 'Finehost AI',
  } as const;
  const solutionTexts = {
    title: lang === 'ko' ? '결국 답은 VUI였습니다' : "Everyone's answer was VUI",
    p1: lang === 'ko' ? '개발팀은 CS에, 운영팀은 PMS에 지쳐 있습니다.' : 'Development teams overwhelmed by CS, operators exhausted by PMS...',
    p2: lang === 'ko' ? '같은 문제가 반복되지 않도록 바꿔볼까요?' : 'Tired of recurring problems?',
    vui1: lang === 'ko' ? 'VUI(Voice User Interface)는 GUI를 대신하는' : 'VUI (Voice User Interface) is a GUI alternative system',
    vui2: lang === 'ko' ? '화면 없이 목소리만으로 쓰는 운영 방식입니다.' : 'that operates with voice alone, without screens.',
    vui3: lang === 'ko' ? '호텔 운영의 반복 업무를 자동화하고' : 'It automates repetitive tasks needed for hospitality operations',
    vui4: lang === 'ko' ? '누구나 직관적으로 사용할 수 있어' : 'and can be used intuitively by anyone,',
    vui5: lang === 'ko' ? '개발 리소스는 줄이고 효율은 높여줍니다.' : 'reducing development resources while increasing operational efficiency.',
  } as const;
  const videoTexts = {
    title: lang === 'ko' ? '인터뷰 영상' : 'Interview Video',
    desc1: lang === 'ko' ? '호텔 운영자와 PMS 개발자가 VUI에서 어떤 가치를 찾았는지 —' : 'Discover how hotel operators and PMS developers found real value in VUI —',
    desc2: lang === 'ko' ? '그들의 실제 이야기로 확인해보세요.' : 'through their own stories and experiences.',
  } as const;
  const comparisonTexts = {
    title: lang === 'ko' ? '이제 손 대신 목소리로 운영하세요.' : 'Now, operate with your voice—not your hands.',
    legacy: lang === 'ko' ? '전통적 GUI' : 'Traditional GUI',
    legacyBadge: lang === 'ko' ? '레거시' : 'LEGACY',
    legacy1: lang === 'ko' ? '복잡한 화면을 여러 번 오가야 함' : 'Navigate through 5+ complex screens',
    legacy2: lang === 'ko' ? '업무당 5분씩 소요' : 'Takes 5 minutes per task',
    legacy3: lang === 'ko' ? '실수 위험 높음' : 'High risk of user errors',
    legacy4: lang === 'ko' ? '사용법 숙달에 시간 소모' : 'Requires extensive training',
    vui: lang === 'ko' ? 'Finehost VUI' : 'Finehost VUI',
    future: lang === 'ko' ? '미래' : 'FUTURE',
    vui1: lang === 'ko' ? '"7월 16일 객실 막아줘" — 끝.' : '"Block room for July 16th" - Done!',
    vui2: lang === 'ko' ? '5초면 완료' : 'Completed in 5 seconds',
    vui3: lang === 'ko' ? 'AI가 실수를 미리 차단' : 'AI-powered error prevention',
    vui4: lang === 'ko' ? '따로 배울 필요 없음' : 'No training required',
  } as const;
  const featuresTexts = {
    title: lang === 'ko' ? '사용자 경험의 새로운 기준' : 'Setting a New Standard for User Experience',
    features: [
      {
        title: lang === 'ko' ? '자연스러운 대화' : 'Natural Conversation',
        description: lang === 'ko' ? '의도를 파악하고 대화하듯 자연스럽게 작동' : 'Voice interface that understands intent and flows like a real conversation'
      },
      {
        title: lang === 'ko' ? '시니어 친화 UX' : 'Elder-Friendly UX',
        description: lang === 'ko' ? '비숙련자도 쉽게 쓰도록 설계' : 'Designed for intuitive use even by non-digital-savvy users'
      },
      {
        title: lang === 'ko' ? '문맥 기반 제안' : 'Context-Aware Suggestions',
        description: lang === 'ko' ? '상황에 맞춰 운영을 최적화하는 AI' : 'AI adapts based on real-time context to optimize operations'
      },
      {
        title: lang === 'ko' ? '일상 업무 자동화' : 'Automated Daily Tasks',
        description: lang === 'ko' ? '요금, 메시징 등 반복 업무를 음성으로 처리' : 'From pricing to messaging, routine tasks handled by voice'
      }
    ]
  } as const;
  const testimonialsTexts = {
    title1: lang === 'ko' ? '예전엔 클릭했지만,' : 'They used to click.',
    title2: lang === 'ko' ? '이제는 말로 끝냅니다' : 'Now, they just speak',
    verified: lang === 'ko' ? '검증된 사용자' : 'Verified User',
    quotes: [
      {
        name: lang === 'ko' ? '김지현' : 'Sarah Kim',
        role: lang === 'ko' ? '호텔 매니저 · 서울' : 'Hotel Manager, Seoul',
        quote: lang === 'ko' ? '프론트 야간 근무 때 가장 힘들었던 건 복잡한 화면이었어요.\n이제는 "예약 날짜 바꿔줘", "객실 차단해줘"라고 말하면 끝이라 실수가 크게 줄었습니다.\n처리 속도도 빨라져서 팀 전체 스트레스가 확 내려갔어요.' : 'I used to worry about making mistakes every time I touched the system.\nNow I just speak — it\'s faster, and I feel way more confident.'
      },
      {
        name: lang === 'ko' ? '박민수' : 'Mike Chen',
        role: lang === 'ko' ? '운영 총괄 · 제주' : 'Operations Director, Tokyo',
        quote: lang === 'ko' ? '성수기엔 체크인 피크타임이 지옥이었죠.\n음성 명령으로 배정, 차단, 요금 조정까지 자동 처리되니 업무가 30%는 줄었습니다.\n신입 교육에 들이던 시간도 크게 줄었고요.' : 'This isn\'t just a new tool.\nIt\'s a completely new way to think about hotel operations.'
      },
      {
        name: lang === 'ko' ? '이수진' : 'Natsumi Ito',
        role: lang === 'ko' ? '오너 매니저 · 부산' : 'Owner-Manager, Kyoto',
        quote: lang === 'ko' ? '소규모 호텔이라 사람이 넉넉하지 않아요.\n청소 스케줄 잡고, 가격 바꾸는 일을 말로 처리하니 손이 정말 가벼워졌습니다.\n직원 교육도 쉬워져서 최근 리뷰 평점이 눈에 띄게 올랐어요.' : 'Technology used to overwhelm me.\nBut with this, I just say what I need and it happens.\nIt feels like having an assistant by my side.'
      },
      {
        name: lang === 'ko' ? '박재훈' : 'Jaehoon Park',
        role: lang === 'ko' ? '게스트하우스 호스트 · 강릉' : 'Guesthouse Host, Jeju',
        quote: lang === 'ko' ? '혼자 운영하다 보니 손님 응대 중엔 화면을 볼 틈이 없었습니다.\n이젠 "주말 요금 올려줘", "301호 막아줘" 한마디면 바로 반영돼요.\n작지만 결정적인 시간이 절약됩니다.' : 'I never imagined I could run a guesthouse without using a screen.\nBut this makes it possible. It\'s like giving a voice to my operations.'
      }
    ]
  } as const;
  const contactTexts = {
    title1: lang === 'ko' ? '지금 합류하세요' : 'It\'s time to join',
    title2: lang === 'ko' ? '수천 명의 호텔리어가 Finehost로 효율을 높이고 있습니다' : 'the thousands of hoteliers using Finehost',
    desc1: lang === 'ko' ? '부티크부터 대형 체인까지,' : 'From boutique hotels to large management companies,',
    desc2: lang === 'ko' ? '여러분의 운영 과제를 함께 풀어드릴게요.' : 'we\'d love to discuss your operational challenges together.',
    name: lang === 'ko' ? '이름 *' : 'Name *',
    email: lang === 'ko' ? '이메일 *' : 'Email *',
    company: lang === 'ko' ? '호텔/회사명' : 'Hotel/Company Name',
    optional: lang === 'ko' ? '(선택)' : '(optional)',
    message: lang === 'ko' ? '메시지 *' : 'Message *',
    namePlaceholder: lang === 'ko' ? '홍길동' : 'Michael Johnson',
    emailPlaceholder: 'contact@yourhotel.com',
    companyPlaceholder: lang === 'ko' ? '그랜드 호텔, 부티크 인, ABC 매니지먼트 등' : 'Grand Hotel, Boutique Inn, ABC Management Co., etc.',
    messagePlaceholder: lang === 'ko' ? '현재 운영, 주요 업무 흐름, 사용 중인 시스템 등을 알려주세요.' : 'Tell us about your current operation and what features you\'re considering. Include details like number of rooms, key workflows, current systems, etc.',
    sending: lang === 'ko' ? '전송 중...' : 'Sending...',
    getInTouch: lang === 'ko' ? '문의하기' : 'Get in Touch',
    thanksTitle: lang === 'ko' ? '문의 감사합니다. 곧 연락드릴게요.' : 'Thanks! We\'ll get back to you soon.',
    thanksDesc: lang === 'ko' ? '그때까지 편하게 목소리로 말하세요.' : 'Until then, keep speaking easy.',
    replyWithin: lang === 'ko' ? '보통 2시간 이내 회신' : 'Usually reply within 2 hours',
    support: 'support@hautrip.com',
    faq: lang === 'ko' ? '궁금한 점이 있으신가요? 언제든 연락 주세요. 모든 문의에 직접 답변합니다.' : 'Have questions? Feel free to reach out anytime. We\'ll personally respond to every inquiry.',
  } as const;
  const [isListening, setIsListening] = useState(false);
  const [demoStep, setDemoStep] = useState(0); // 0: idle, 1: command, 2: processing, 3: response, 4: visual
  const [currentDemo, setCurrentDemo] = useState<DemoCommand | null>(null);
  const [demoCommands] = useState<DemoCommand[]>([
    {
      command: lang === 'ko' ? "이번 주말 점유율이 떨어졌어요. 매출 분석하고 요금 최적화해줘" : "This week's occupancy is low, analyze revenue and apply optimized pricing",
      processing: lang === 'ko' ? "주말 점유율 데이터를 분석하는 중..." : "Analyzing occupancy data for Fri-Sun...",
      response: lang === 'ko' ? "금–일 점유율이 30% 미만입니다. 스마트 요금 적용: ₩148,000 → ₩132,000." : "Occupancy for Fri–Sun is under 30%. Applying smart pricing: ₩148,000 → ₩132,000.",
      visual: "pricing"
    },
    {
      command: lang === 'ko' ? "301호 점검으로 차단해줘" : "Block room 301 for maintenance",
      processing: lang === 'ko' ? "객실 가용 여부 확인 중..." : "Checking room availability...",
      response: lang === 'ko' ? "301호를 점검으로 차단했습니다. 캘린더에 반영했어요." : "Room 301 blocked for maintenance. Status updated in calendar.",
      visual: "calendar"
    },
    {
      command: lang === 'ko' ? "이번 주 리뷰 요약해줘" : "Summarize this week's reviews",
      processing: lang === 'ko' ? "고객 피드백 분석 중..." : "Analyzing customer feedback...",
      response: lang === 'ko' ? "평균 평점 4.8/5. 주요 키워드: 청결, 위치, 직원 친절." : "Average 4.8/5 stars. Top mentions: cleanliness, location, staff friendliness.",
      visual: "reviews"
    },
    {
      command: lang === 'ko' ? "203호 청소 내일 오전 10시로 예약해줘" : "Schedule cleaning for room 203 at 10:00 AM",
      processing: lang === 'ko' ? "하우스키핑과 조율 중..." : "Coordinating with housekeeping...",
      response: lang === 'ko' ? "203호 청소를 내일 오전 10시로 예약했습니다. 팀에 알렸어요." : "Room 203 cleaning scheduled for 10:00 AM tomorrow. Team notified.",
      visual: "cleaning"
    }
  ]);

  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Contact form handlers
  const handleContactChange = (field: string, value: string) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      setContactForm({ name: '', email: '', company: '', message: '' });
    }, 5000);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHero = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  useEffect(() => {
    // Auto-rotation only when not actively using the demo
    if (!isListening && demoStep === 0) {
      const interval = setInterval(() => {
        setCurrentDemoIndex((prev) => (prev + 1) % demoCommands.length);
      }, 8000); // Slower rotation for better UX
      return () => clearInterval(interval);
    }
  }, [demoCommands.length, isListening, demoStep]);

  const startDemo = (demoIndex?: number) => {
    const targetIndex = demoIndex !== undefined ? demoIndex : currentDemoIndex;
    setIsListening(true);
    setCurrentDemo(demoCommands[targetIndex]);
    setDemoStep(1); // Start with command
    
    // Extended timing for better user comprehension
    setTimeout(() => setDemoStep(2), 2000); // Command display: 2 seconds
    setTimeout(() => setDemoStep(3), 4500); // Processing: 2.5 seconds  
    setTimeout(() => setDemoStep(4), 7000); // Response: 2.5 seconds
    setTimeout(() => {
      setIsListening(false);
      // Keep demoStep at 4 and currentDemo to maintain PMS interface
      // Only reset when user clicks "Try another example"
    }, 9500); // Stop recording but keep visual result visible
  };

  const toggleListening = () => {
    if (!isListening && demoStep === 0) {
      startDemo();
    } else if (isListening) {
      // If currently recording, stop the demo
      setIsListening(false);
      setDemoStep(0);
      setCurrentDemo(null);
    } else if (demoStep === 4) {
      // If at step 4 (visual result), restart the same demo
      startDemo(currentDemoIndex);
    }
  };

  const tryAnotherExample = () => {
    const nextIndex = (currentDemoIndex + 1) % demoCommands.length;
    setCurrentDemoIndex(nextIndex);
    
    // Reset current demo state and start new one
    setDemoStep(0);
    setCurrentDemo(null);
    setIsListening(false);
    
    // Start new demo after brief transition
    setTimeout(() => {
      startDemo(nextIndex);
    }, 200);
  };

  const selectDemo = (index: number) => {
    if (index !== currentDemoIndex) {
      setCurrentDemoIndex(index);
      
      // Reset current demo state and start selected one
      setDemoStep(0);
      setCurrentDemo(null);
      setIsListening(false);
      
      // Start selected demo after brief transition
      setTimeout(() => {
        startDemo(index);
      }, 200);
    }
  };



  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900/30 to-black" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-slate-800/10 to-black" />
      
      {/* Subtle Aurora Accent Points */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(34,197,94,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(59,130,246,0.12),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(168,85,247,0.1),transparent_60%)]" />
      
      {/* Gentle Aurora Shimmer - Very Subtle */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent animate-pulse" style={{animationDelay: '0s', animationDuration: '8s'}} />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent via-blue-400/4 to-transparent animate-pulse" style={{animationDelay: '4s', animationDuration: '10s'}} />
      </div>
      
      {/* Space Stars */}
      <div className="absolute inset-0">
        {/* Large stars */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0s'}} />
        <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-200 rounded-full animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/5 right-1/3 w-0.5 h-0.5 bg-indigo-200 rounded-full animate-pulse" style={{animationDelay: '3s'}} />
        <div className="absolute bottom-1/3 right-1/5 w-1 h-1 bg-pink-200 rounded-full animate-pulse" style={{animationDelay: '4s'}} />
        
        {/* Medium stars */}
        <div className="absolute top-2/5 left-1/5 w-0.5 h-0.5 bg-white/80 rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
        <div className="absolute top-3/5 right-2/5 w-0.5 h-0.5 bg-blue-100/70 rounded-full animate-pulse" style={{animationDelay: '1.5s'}} />
        <div className="absolute bottom-2/5 left-2/5 w-0.5 h-0.5 bg-purple-100/60 rounded-full animate-pulse" style={{animationDelay: '2.5s'}} />
        <div className="absolute top-1/6 left-3/5 w-0.5 h-0.5 bg-indigo-100/70 rounded-full animate-pulse" style={{animationDelay: '3.5s'}} />
        
        {/* Small stars */}
        <div className="absolute top-1/2 left-1/6 w-px h-px bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
        <div className="absolute top-3/4 right-1/6 w-px h-px bg-blue-100/50 rounded-full animate-pulse" style={{animationDelay: '1.2s'}} />
        <div className="absolute bottom-1/6 left-1/2 w-px h-px bg-purple-100/40 rounded-full animate-pulse" style={{animationDelay: '2.2s'}} />
        <div className="absolute top-1/8 right-1/2 w-px h-px bg-white/50 rounded-full animate-pulse" style={{animationDelay: '3.2s'}} />
        <div className="absolute bottom-1/2 right-3/4 w-px h-px bg-indigo-100/40 rounded-full animate-pulse" style={{animationDelay: '4.2s'}} />
        <div className="absolute top-5/6 left-3/4 w-px h-px bg-pink-100/30 rounded-full animate-pulse" style={{animationDelay: '5s'}} />
      </div>
      
      {/* Subtle Aurora Accent Streams - Minimal */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-1/4 left-1/8 w-8 h-16 bg-gradient-to-b from-emerald-400/20 to-transparent rounded-full blur-xl transform rotate-12" />
        <div className="absolute bottom-1/3 right-1/8 w-10 h-20 bg-gradient-to-t from-blue-400/15 to-transparent rounded-full blur-2xl transform -rotate-12" />
        <div className="absolute top-2/3 left-3/4 w-6 h-12 bg-gradient-to-br from-purple-400/18 to-transparent rounded-full blur-lg transform rotate-45" />
      </div>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <img src="/finehost_wh.png" alt="Finehost" className="h-16 w-auto" />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={scrollToHero} className="text-white/80 hover:text-white transition-colors font-medium">{navTexts.demo}</button>
              <a href="#features" className="text-white/80 hover:text-white transition-colors font-medium">{navTexts.features}</a>
              <a href="#comparison" className="text-white/80 hover:text-white transition-colors font-medium">{navTexts.comparison}</a>
              <a href="https://www.vacatio.us/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors font-medium">{navTexts.company}</a>
              <button onClick={scrollToContact} className="text-white/80 hover:text-white transition-colors font-medium">{navTexts.contact}</button>
              <div className="flex items-center space-x-2 pl-4">
                <button onClick={() => setLang('ko')} className={`px-2 py-1 rounded text-sm ${lang==='ko'?'bg-white/20 text-white':'text-white/70 hover:text-white hover:bg-white/10'}`}>{navTexts.ko}</button>
                <button onClick={() => setLang('en')} className={`px-2 py-1 rounded text-sm ${lang==='en'?'bg-white/20 text-white':'text-white/70 hover:text-white hover:bg-white/10'}`}>{navTexts.en}</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {heroTexts.title1}
              <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                {heroTexts.title2}
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              {heroTexts.subtitle}
            </motion.p>

            {/* Enhanced Interactive Voice Demo */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-5xl mx-auto mb-12"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Voice Command Interface */}
                <div className="bg-white/5 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl shadow-purple-500/10">
                  <div className="flex items-center justify-center mb-6">
                                            <button
                          onClick={toggleListening}
                          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                            isListening 
                              ? 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 shadow-red-500/50 animate-pulse' 
                              : demoStep === 4
                              ? 'bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 hover:scale-110'
                              : 'bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hover:from-purple-600 hover:via-blue-600 hover:to-green-600 hover:scale-110'
                          }`}
                        >
                          {isListening ? (
                            <MicOff className="w-8 h-8 text-white" />
                          ) : demoStep === 4 ? (
                            <Play className="w-8 h-8 text-white" />
                          ) : (
                            <Mic className="w-8 h-8 text-white" />
                          )}
                        </button>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {demoStep === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                      >
                        <p className="text-white/60 text-base mb-4">{heroTexts.click}</p>
                        <div className="text-xs text-white/40 mb-4">
                          {heroTexts.currentDemo}: &ldquo;{demoCommands[currentDemoIndex].command.substring(0, 30)}...&rdquo;
                        </div>
                        
                        {/* Demo Indicators - Clickable */}
                        <div className="flex items-center justify-center space-x-2 mb-4">
                          {demoCommands.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => selectDemo(index)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                                index === currentDemoIndex 
                                  ? 'bg-purple-400 scale-125' 
                                  : 'bg-white/20 hover:bg-white/40'
                              }`}
                              title={`Demo ${index + 1}: ${demoCommands[index].command.substring(0, 40)}...`}
                            />
                          ))}
                        </div>
                        
                        {/* Step Counter */}
                        <div className="text-xs text-white/50 mb-6">
                          {heroTexts.demoWord} {currentDemoIndex + 1} {heroTexts.ofWord} {demoCommands.length}
                        </div>
                        
                        {/* Try Another Example Button */}
                        <button
                          onClick={tryAnotherExample}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl text-white/70 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105"
                        >
                          {heroTexts.tryAnotherExample}
                        </button>
                      </motion.div>
                    )}

                    {demoStep === 1 && currentDemo && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center"
                      >
                        <div className="bg-blue-500/20 rounded-xl p-4 mb-4 border-l-4 border-blue-400">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-blue-300 text-sm font-medium">{heroTexts.userRole}</span>
                          </div>
                          <p className="text-white/90 text-left italic">&ldquo;{currentDemo.command}&rdquo;</p>
                        </div>
                        
                        {/* Step indicator during demo */}
                        <div className="flex items-center justify-center space-x-2 mt-4">
                          <span className="text-xs text-white/50">{heroTexts.step1}</span>
                          <span className="text-xs text-blue-300 font-medium">{heroTexts.step1Label}</span>
                        </div>
                      </motion.div>
                    )}

                    {demoStep === 2 && currentDemo && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center"
                      >
                        <div className="flex justify-center mb-6">
                          <div className="flex space-x-2">
                            {[...Array(7)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{
                                  height: [30, 45, 30],
                                  opacity: [0.6, 1, 0.6]
                                }}
                                transition={{
                                  duration: 1.2,
                                  repeat: Infinity,
                                  delay: i * 0.15,
                                  ease: "easeInOut"
                                }}
                                className="w-2 h-8 bg-gradient-to-t from-purple-500 to-blue-500 rounded-full"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-purple-300 text-base font-medium mb-4">{currentDemo.processing}</p>
                        
                        {/* Step indicator during demo */}
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-xs text-white/50">{heroTexts.step2}</span>
                          <span className="text-xs text-purple-300 font-medium">{heroTexts.step2Label}</span>
                        </div>
                      </motion.div>
                    )}

                    {demoStep === 3 && currentDemo && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-center"
                      >
                        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-4 border-l-4 border-emerald-400/50 mb-4 shadow-lg shadow-emerald-500/20">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-emerald-300 text-sm font-medium">{heroTexts.aiName}</span>
                          </div>
                          <p className="text-white/90 text-left">{currentDemo.response}</p>
                        </div>
                        
                        {/* Step indicator during demo */}
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-xs text-white/50">{heroTexts.step3}</span>
                          <span className="text-xs text-green-300 font-medium">{heroTexts.step3Label}</span>
                        </div>
                      </motion.div>
                    )}
                    
                    {demoStep === 4 && currentDemo && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-4 border-l-4 border-emerald-400/50 mb-4 shadow-lg shadow-emerald-500/20">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-emerald-300 text-sm font-medium">{heroTexts.step4}</span>
                          </div>
                          <p className="text-white/90 text-left text-sm">
                            {heroTexts.step4Desc}
                          </p>
                        </div>
                        
                        {/* Navigation options */}
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            onClick={() => startDemo(currentDemoIndex)}
                            className="px-3 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-400/20 hover:border-emerald-400/40 rounded-lg text-emerald-300 hover:text-emerald-200 text-xs font-medium transition-all duration-300 shadow-md hover:shadow-lg shadow-emerald-500/20"
                          >
                            <Play className="w-3 h-3 inline mr-1" />
                            {heroTexts.replay}
                          </button>
                          <button
                            onClick={tryAnotherExample}
                            className="px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 hover:border-purple-400/50 rounded-lg text-purple-300 hover:text-purple-200 text-xs font-medium transition-all duration-300"
                          >
                            {heroTexts.tryAnother}
                          </button>
                        </div>
                        
                        {/* Demo indicator - Clickable */}
                        <div className="flex items-center justify-center space-x-2 mt-4">
                          {demoCommands.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => selectDemo(index)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                                index === currentDemoIndex 
                                  ? 'bg-emerald-400 scale-125' 
                                  : 'bg-white/20 hover:bg-white/40'
                              }`}
                              title={`Demo ${index + 1}: ${demoCommands[index].command.substring(0, 40)}...`}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-white/50 mt-2">
                          {heroTexts.demoWord} {currentDemoIndex + 1} {heroTexts.ofWord} {demoCommands.length}{heroTexts.resultShowing}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Visual Result Panel */}
                <div className="mobile-card demo-interface bg-white/5 backdrop-blur-2xl rounded-2xl p-8 border border-white/10 shadow-2xl shadow-emerald-500/10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <Monitor className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-white font-semibold text-lg">{heroTexts.pmsInterface}</h3>
                    </div>
                    
                    {/* Step indicator for visual result */}
                    {demoStep === 4 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-white/50">{heroTexts.step4}</span>
                        <span className="text-xs text-blue-300 font-medium">{heroTexts.step4Label}</span>
                      </div>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {demoStep < 4 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative text-center py-16 overflow-hidden"
                      >
                        {/* Enhanced Aurora Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/8 to-green-500/10 rounded-2xl" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-2xl" />
                        
                        {/* Floating Aurora Particles */}
                        <div className="absolute top-4 left-6 w-2 h-2 bg-purple-400/40 rounded-full animate-pulse" style={{animationDelay: '0s', animationDuration: '3s'}} />
                        <div className="absolute top-12 right-8 w-1 h-1 bg-blue-400/50 rounded-full animate-pulse" style={{animationDelay: '1s', animationDuration: '4s'}} />
                        <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-green-400/45 rounded-full animate-pulse" style={{animationDelay: '2s', animationDuration: '2.5s'}} />
                        <div className="absolute bottom-16 right-6 w-0.5 h-0.5 bg-purple-300/60 rounded-full animate-pulse" style={{animationDelay: '0.5s', animationDuration: '3.5s'}} />
                        
                        {/* Animated Aurora Streams */}
                        <div className="absolute top-0 left-1/4 w-6 h-12 bg-gradient-to-b from-purple-400/20 to-transparent rounded-full blur-sm transform rotate-12 animate-pulse" style={{animationDuration: '6s'}} />
                        <div className="absolute bottom-0 right-1/3 w-8 h-16 bg-gradient-to-t from-blue-400/15 to-transparent rounded-full blur-md transform -rotate-12 animate-pulse" style={{animationDuration: '8s', animationDelay: '2s'}} />
                        
                        <div className="relative z-10">
                          {/* Enhanced AI Waveform Icon */}
                          <div className="relative w-20 h-20 mx-auto mb-6">
                            {/* Glassmorphism Container */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-2xl" />
                            
                            {/* AI Brain/Circuit Icon with Subtle Pulse */}
                            <div className="relative w-full h-full flex items-center justify-center">
                              <motion.div
                                animate={{
                                  opacity: [0.8, 1, 0.8]
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                                className="w-10 h-10 bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 rounded-lg flex items-center justify-center shadow-lg"
                              >
                                <Sparkles className="w-6 h-6 text-white drop-shadow-lg" />
                              </motion.div>
                              
                              {/* Orbiting Particles */}
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0"
                              >
                                <div className="absolute top-2 left-1/2 w-1 h-1 bg-purple-400 rounded-full transform -translate-x-1/2" />
                                <div className="absolute bottom-2 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2" />
                                <div className="absolute left-2 top-1/2 w-1 h-1 bg-green-400 rounded-full transform -translate-y-1/2" />
                                <div className="absolute right-2 top-1/2 w-1 h-1 bg-purple-300 rounded-full transform -translate-y-1/2" />
                              </motion.div>
                            </div>
                            
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 via-blue-400/20 to-green-400/30 rounded-2xl blur-xl opacity-50" />
                          </div>
                          
                          {/* Enhanced Typography with Glow */}
                          <motion.div
                            animate={{
                              opacity: [0.9, 1, 0.9]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="space-y-3"
                          >
                            <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-blue-200 text-lg font-semibold tracking-wide">
                              {heroTexts.listening}
                            </h4>
                            <p className="text-white/50 text-xs font-medium">
                              {heroTexts.aiReady}
                            </p>
                          </motion.div>
                          
                          {/* Animated Voice Wave Visualization */}
                          <div className="flex justify-center items-center space-x-1 mt-6">
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{
                                  height: [10, 14, 10],
                                  opacity: [0.6, 0.9, 0.6]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.3,
                                  ease: "easeInOut"
                                }}
                                className="w-1 h-2 bg-gradient-to-t from-purple-400 to-blue-400 rounded-full"
                              />
                            ))}
                          </div>
                          
                          {/* Subtle Status Indicator */}
                          <div className="flex items-center justify-center space-x-2 mt-4 opacity-60">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-xs text-green-300 font-medium">{heroTexts.ready}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {demoStep === 4 && currentDemo && currentDemo.visual === 'pricing' && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-4"
                      >
                        <div className="bg-slate-800/50 rounded-xl p-4">
                          <h4 className="text-white/80 text-sm font-medium mb-3">Dynamic Pricing Update</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-red-500/20 rounded-lg">
                              <span className="text-white/70 text-sm">Friday Rate</span>
                              <div className="text-right">
                                <span className="text-red-400 line-through text-xs">₩148,000</span>
                                <span className="text-green-400 font-bold ml-2">₩132,000</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-red-500/20 rounded-lg">
                              <span className="text-white/70 text-sm">Saturday Rate</span>
                              <div className="text-right">
                                <span className="text-red-400 line-through text-xs">₩148,000</span>
                                <span className="text-green-400 font-bold ml-2">₩132,000</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-red-500/20 rounded-lg">
                              <span className="text-white/70 text-sm">Sunday Rate</span>
                              <div className="text-right">
                                <span className="text-red-400 line-through text-xs">₩148,000</span>
                                <span className="text-green-400 font-bold ml-2">₩132,000</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 p-2 bg-green-500/20 rounded-lg">
                            <p className="text-green-300 text-xs">✓ Optimized for 30% occupancy increase</p>
                          </div>
                        </div>
                        

                      </motion.div>
                    )}

                    {demoStep === 4 && currentDemo && currentDemo.visual === 'calendar' && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-4"
                      >
                        <div className="bg-slate-800/50 rounded-xl p-4">
                          <h4 className="text-white/80 text-sm font-medium mb-3">{lang==='ko' ? '객실 운영 캘린더' : 'Room Management Calendar'}</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-red-500/20 rounded-lg border border-red-400/30">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                                  <span className="text-white font-bold text-xs">{lang==='ko' ? '301호' : 'Room 301'}</span>
                                </div>
                                <div>
                                  <div className="text-white font-medium text-sm">{lang==='ko' ? '301호' : 'Room 301'}</div>
                                  <div className="text-red-300 text-xs">{lang==='ko' ? '점검으로 차단됨' : 'Blocked for maintenance'}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-red-300 text-xs font-medium">{lang==='ko' ? '차단' : 'BLOCKED'}</div>
                                <div className="text-white/50 text-xs">{lang==='ko' ? '추가 공지 시까지' : 'Until further notice'}</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-400/20 shadow-lg shadow-emerald-500/20">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                                  <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <div className="text-white font-medium text-sm">{lang==='ko' ? '차단 상태' : 'Block Status'}</div>
                                  <div className="text-emerald-300 text-xs">{lang==='ko' ? '성공적으로 적용됨' : 'Successfully applied'}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-emerald-300 text-xs font-medium">{lang==='ko' ? '업데이트됨' : 'UPDATED'}</div>
                                <div className="text-white/50 text-xs">{lang==='ko' ? '방금 전' : 'Just now'}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        

                      </motion.div>
                    )}

                    {demoStep === 4 && currentDemo && currentDemo.visual === 'cleaning' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-4"
                      >
                        <div className="bg-slate-800/50 rounded-xl p-4">
                          <h4 className="text-white/80 text-sm font-medium mb-3">{lang==='ko' ? '하우스키핑 일정' : 'Housekeeping Schedule'}</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-yellow-500/20 rounded-lg border border-yellow-400/30">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                                  <span className="text-white font-bold text-xs">{lang==='ko' ? '203호' : 'Room 203'}</span>
                                </div>
                                <div>
                                  <div className="text-white font-medium text-sm">{lang==='ko' ? '203호' : 'Room 203'}</div>
                                  <div className="text-yellow-300 text-xs">{lang==='ko' ? '대청소 예약됨' : 'Deep cleaning scheduled'}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-yellow-300 text-xs font-medium">10:00 AM</div>
                                <div className="text-white/50 text-xs">{lang==='ko' ? '내일' : 'Tomorrow'}</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                  <Users className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <div className="text-white font-medium text-sm">{lang==='ko' ? '하우스키핑 팀' : 'Housekeeping Team'}</div>
                                  <div className="text-blue-300 text-xs">{lang==='ko' ? 'Maria · 정호 배정' : 'Maria & Jung-ho assigned'}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-blue-300 text-xs font-medium">{lang==='ko' ? '알림 전송' : 'NOTIFIED'}</div>
                                <div className="text-white/50 text-xs">{lang==='ko' ? '방금 전' : 'Just now'}</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-400/20 shadow-lg shadow-emerald-500/20">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                                  <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <div className="text-white font-medium text-sm">{lang==='ko' ? '일정 업데이트' : 'Schedule Updated'}</div>
                                  <div className="text-emerald-300 text-xs">{lang==='ko' ? '작업이 생성되었습니다' : 'Task successfully created'}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-emerald-300 text-xs font-medium">{lang==='ko' ? '확인됨' : 'CONFIRMED'}</div>
                                <div className="text-white/50 text-xs">{lang==='ko' ? '예상 2분' : '2 min estimated'}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        

                      </motion.div>
                    )}

                    {demoStep === 4 && currentDemo && currentDemo.visual === 'reviews' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="space-y-4"
                      >
                        <div className="bg-slate-800/50 rounded-xl p-4">
                          <h4 className="text-white/80 text-sm font-medium mb-3">{lang==='ko' ? '주간 리뷰 요약' : 'Weekly Review Summary'}</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-green-500/20 rounded-lg">
                              <span className="text-white/70 text-sm">{lang==='ko' ? '평균 평점' : 'Average Rating'}</span>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                                <span className="text-green-400 font-bold ml-2">4.8/5</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center p-2 bg-blue-500/20 rounded-lg">
                                <span className="text-white/70 text-xs">{lang==='ko' ? '청결' : 'Cleanliness'}</span>
                                <span className="text-blue-300 text-xs font-medium">{lang==='ko' ? '23회 언급' : 'Mentioned 23 times'}</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-purple-500/20 rounded-lg">
                                <span className="text-white/70 text-xs">{lang==='ko' ? '위치' : 'Location'}</span>
                                <span className="text-purple-300 text-xs font-medium">{lang==='ko' ? '18회 언급' : 'Mentioned 18 times'}</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-green-500/20 rounded-lg">
                                <span className="text-white/70 text-xs">{lang==='ko' ? '직원 친절' : 'Staff Friendliness'}</span>
                                <span className="text-green-300 text-xs font-medium">{lang==='ko' ? '15회 언급' : 'Mentioned 15 times'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        

                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>


          </div>
        </div>
      </section>

      {/* VUI Solution Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Deep Space Background - matching hero section */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-slate-800/10 to-black" />
        
        {/* Aurora Accent Points */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(34,197,94,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(59,130,246,0.12),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(168,85,247,0.1),transparent_60%)]" />
        
        {/* Aurora Shimmer */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-400/5 to-transparent animate-pulse" style={{animationDelay: '0s', animationDuration: '8s'}} />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent via-blue-400/4 to-transparent animate-pulse" style={{animationDelay: '4s', animationDuration: '10s'}} />
        </div>
        
        {/* Space Stars */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '0s'}} />
          <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse" style={{animationDelay: '2s'}} />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-200 rounded-full animate-pulse" style={{animationDelay: '4s'}} />
          <div className="absolute top-1/5 right-1/3 w-0.5 h-0.5 bg-indigo-200 rounded-full animate-pulse" style={{animationDelay: '6s'}} />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Text Content Area - Center Aligned */}
          <div className="text-center mb-24">
            {/* Section Title */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-wide"
            >
              <span className="bg-gradient-to-r from-white via-purple-100 to-emerald-100 bg-clip-text text-transparent">
                {solutionTexts.title}
              </span>
            </motion.h2>
            
            {/* Description Content */}
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="static transform-none">
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-medium static transform-none">
                  {solutionTexts.p1}<br />
                  {solutionTexts.p2}
                </p>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-8 text-lg md:text-xl text-white/80 leading-loose"
              >
                <p className="max-w-3xl mx-auto">
                  <span className="relative inline-block">
                    <span className="relative z-10 px-1">{solutionTexts.vui1}</span>
                    <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-6 bg-gradient-to-r from-yellow-300/20 via-green-300/25 to-yellow-300/20 rounded-sm blur-sm opacity-60"></span>
                    <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-5 bg-gradient-to-r from-yellow-400/15 via-green-400/20 to-yellow-400/15 rounded-sm"></span>
                  </span>
                  <br />
                  <span className="relative inline-block">
                    <span className="relative z-10 px-1">{solutionTexts.vui2}</span>
                    <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-6 bg-gradient-to-r from-yellow-300/20 via-green-300/25 to-yellow-300/20 rounded-sm blur-sm opacity-60"></span>
                    <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-5 bg-gradient-to-r from-yellow-400/15 via-green-400/20 to-yellow-400/15 rounded-sm"></span>
                  </span>
                </p>
                <p className="max-w-3xl mx-auto">
                  {solutionTexts.vui3}<br />
                  {solutionTexts.vui4}<br />
                  {solutionTexts.vui5}
                </p>
              </motion.div>
            </div>
          </div>
          
          {/* Interview Video Card - Clean Separation */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl shadow-black/40 hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02]">
              {/* Enhanced Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-purple-500/5 to-blue-500/5 rounded-3xl opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-3xl" />
              
              <div className="relative z-10">
                {/* Video Title */}
                <h3 className="text-2xl font-bold text-white mb-6 text-center">{videoTexts.title}</h3>
                
                {/* Interview Video */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 bg-black/20 backdrop-blur-sm border border-white/10">
                  <video 
                    key={lang} // Force re-render when language changes
                    className="w-full h-auto max-h-[500px] object-cover"
                    controls
                    preload="metadata"
                    playsInline
                    muted
                    onError={(e) => {
                      console.error('Video loading error:', e);
                      const videoElement = e.target as HTMLVideoElement;
                      videoElement.style.display = 'none';
                      const container = videoElement.parentElement;
                      if (container) {
                        container.innerHTML = `
                          <div class="flex items-center justify-center h-64 bg-slate-800/50 rounded-2xl">
                            <div class="text-center">
                              <div class="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                </svg>
                              </div>
                              <p class="text-white/70 text-sm">Video temporarily unavailable</p>
                              <p class="text-white/50 text-xs mt-2">Please try again later</p>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  >
                    <source src={lang === 'ko' ? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" : "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Video overlay gradient for better integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none rounded-2xl" />
                </div>
                
                {/* Description below video */}
                <p className="text-white/70 text-center max-w-2xl mx-auto leading-relaxed mt-6 text-lg">
                  {videoTexts.desc1}<br />
                  {videoTexts.desc2}
                </p>
              </div>
              
              {/* Subtle Corner Accents */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-1000" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* GUI vs VUI Comparison */}
      <section id="comparison" className="py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {comparisonTexts.title}
            </h2>
          </motion.div>

          <div className="relative">
            {/* Background gradient effects - removed purple background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-green-500/5 rounded-3xl" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative">
              {/* Traditional GUI - Left Side */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-slate-800/40 via-slate-700/30 to-slate-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-slate-600/30 shadow-2xl hover:shadow-slate-500/20 transition-all duration-500 hover:-translate-y-2">
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-600/10 to-slate-800/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-700 rounded-2xl flex items-center justify-center shadow-lg">
                        <Layers3 className="w-6 h-6 text-slate-200" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-200">{comparisonTexts.legacy}</h3>
                      <div className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-400 font-medium">{comparisonTexts.legacyBadge}</div>
                    </div>
                    
                    <div className="space-y-4">
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-700/30 transition-colors"
                      >
                        <MousePointer2 className="w-6 h-6 text-slate-400" />
                        <span className="text-slate-300 text-sm">{comparisonTexts.legacy1}</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-700/30 transition-colors"
                      >
                        <Timer className="w-6 h-6 text-slate-400" />
                        <span className="text-slate-300 text-sm">{comparisonTexts.legacy2}</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-700/30 transition-colors"
                      >
                        <AlertTriangle className="w-6 h-6 text-slate-400" />
                        <span className="text-slate-300 text-sm">{comparisonTexts.legacy3}</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-xl hover:bg-slate-700/30 transition-colors"
                      >
                        <GraduationCap className="w-6 h-6 text-slate-400" />
                        <span className="text-slate-300 text-sm">{comparisonTexts.legacy4}</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* VS Badge in Center */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/25">
                  <span className="text-white font-bold text-lg">VS</span>
                </div>

              </motion.div>

              {/* Finehost VUI - Right Side */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-emerald-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-emerald-400/20 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-400/25 transition-all duration-500 hover:-translate-y-2">
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-emerald-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                        <Sparkle className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{comparisonTexts.vui}</h3>
                      <div className="px-3 py-1 bg-green-500/20 rounded-full text-xs text-green-300 font-medium">{comparisonTexts.future}</div>
                    </div>
                    
                    <div className="space-y-4">
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-green-500/10 rounded-xl hover:bg-green-500/20 transition-colors"
                      >
                        <Mic className="w-6 h-6 text-green-400" />
                        <span className="text-green-100 text-sm font-medium">{comparisonTexts.vui1}</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center space-x-4 p-4 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-colors"
                      >
                        <Zap className="w-6 h-6 text-blue-400" />
                        <span className="text-blue-100 text-sm font-medium">{comparisonTexts.vui2}</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center space-x-4 p-4 bg-purple-500/10 rounded-xl hover:bg-purple-500/20 transition-colors"
                      >
                        <Shield className="w-6 h-6 text-purple-400" />
                        <span className="text-purple-100 text-sm font-medium">{comparisonTexts.vui3}</span>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center space-x-4 p-4 bg-green-500/10 rounded-xl hover:bg-green-500/20 transition-colors"
                      >
                        <Sparkles className="w-6 h-6 text-green-400" />
                        <span className="text-green-100 text-sm font-medium">{comparisonTexts.vui4}</span>
                      </motion.div>
                    </div>


                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Build for Growth */}
      <section id="features" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-green-900/10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center tracking-wide">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                {featuresTexts.title}
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { 
                title: featuresTexts.features[0].title, 
                description: featuresTexts.features[0].description, 
                icon: MessageSquare, 
                gradientBg: "from-purple-500/20 via-pink-500/15 to-purple-600/20",
                iconGradient: "from-purple-400 via-pink-400 to-purple-500",
                glowColor: "purple-400",
                rotation: "rotate-1"
              },
              { 
                title: featuresTexts.features[1].title, 
                description: featuresTexts.features[1].description, 
                icon: Users, 
                gradientBg: "from-blue-500/20 via-cyan-500/15 to-blue-600/20",
                iconGradient: "from-blue-400 via-cyan-400 to-blue-500",
                glowColor: "blue-400",
                rotation: "-rotate-1"
              },
              { 
                title: featuresTexts.features[2].title, 
                description: featuresTexts.features[2].description, 
                icon: Sparkles, 
                gradientBg: "from-green-500/20 via-emerald-500/15 to-green-600/20",
                iconGradient: "from-green-400 via-emerald-400 to-green-500",
                glowColor: "green-400",
                rotation: "rotate-1"
              },
              { 
                title: featuresTexts.features[3].title, 
                description: featuresTexts.features[3].description, 
                icon: Zap, 
                gradientBg: "from-orange-500/20 via-yellow-500/15 to-orange-600/20",
                iconGradient: "from-orange-400 via-yellow-400 to-orange-500",
                glowColor: "orange-400",
                rotation: "-rotate-1"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`group relative ${feature.rotation} hover:rotate-0 transition-all duration-700`}
              >
                {/* Card with enhanced glassmorphism */}
                <div className={`relative bg-gradient-to-br ${feature.gradientBg} backdrop-blur-3xl rounded-[2rem] p-8 border border-white/20 shadow-2xl hover:shadow-${feature.glowColor}/30 transition-all duration-700 hover:scale-105 hover:-translate-y-3 overflow-hidden`}>
                  
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Glow border effect */}
                  <div className={`absolute inset-0 rounded-[2rem] border-2 border-transparent bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 text-center">
                    {/* Enhanced 3D Icon with glow */}
                    <div className={`w-24 h-24 mx-auto mb-8 bg-gradient-to-br ${feature.iconGradient} rounded-[1.5rem] flex items-center justify-center shadow-2xl group-hover:shadow-${feature.glowColor}/50 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12`}>
                      {/* Icon glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.iconGradient} rounded-[1.5rem] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                      <feature.icon className="w-12 h-12 text-white relative z-10 drop-shadow-2xl" />
                    </div>
                    
                    {/* Enhanced Typography */}
                    <h3 className="text-xl font-bold text-white mb-4 tracking-wide leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      {feature.description}
                    </p>
                  </div>

                  {/* Ambient particles effect */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse delay-300" />
                </div>

                {/* Card reflection effect */}
                <div className={`absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              </motion.div>
            ))}
          </div>


        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background spotlight effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-purple-900/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl opacity-40" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-100 to-orange-100 bg-clip-text text-transparent">
                {testimonialsTexts.title1}
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-200 via-white to-purple-100 bg-clip-text text-transparent">
                {testimonialsTexts.title2}
              </span>
            </h2>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Sarah Kim */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group relative hover:rotate-0 transition-all duration-700"
            >
              <div className="relative bg-gradient-to-br from-purple-500/20 via-purple-400/15 to-purple-600/20 backdrop-blur-3xl rounded-[2rem] p-8 lg:p-10 border border-purple-300/20 shadow-2xl hover:shadow-purple-400/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    {/* Profile avatar with glow */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-400/50 transition-all duration-500 transform group-hover:scale-110">
                        <span className="text-white font-bold text-xl">S</span>
                      </div>
                      {/* Verified badge */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{testimonialsTexts.quotes[0].name}</h4>
                      <p className="text-white/70 text-sm">{testimonialsTexts.quotes[0].role}</p>
                      <div className="inline-flex items-center mt-1 px-2 py-1 bg-purple-500/20 rounded-full">
                        <span className="text-purple-300 text-xs font-medium">{testimonialsTexts.verified}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quote with voice wave icon */}
                  <div className="relative">
                    <div className="absolute -left-2 -top-2 text-purple-400/30 text-4xl font-serif">&ldquo;</div>
                    <p className="text-white/90 text-base italic leading-relaxed pl-6 group-hover:text-white transition-colors duration-300">
                      {testimonialsTexts.quotes[0].quote.split('\n').map((line, idx) => (<span key={idx}>{line}<br /></span>))}
                    </p>
                    {/* Voice wave decoration */}
                    <div className="flex items-center mt-4 space-x-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <Volume2 className="w-4 h-4 text-purple-400" />
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-1 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mike Chen */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative hover:rotate-0 transition-all duration-700"
            >
              <div className="relative bg-gradient-to-br from-blue-500/20 via-cyan-400/15 to-blue-600/20 backdrop-blur-3xl rounded-[2rem] p-8 lg:p-10 border border-blue-300/20 shadow-2xl hover:shadow-blue-400/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    {/* Profile avatar with glow */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-400/50 transition-all duration-500 transform group-hover:scale-110">
                        <span className="text-white font-bold text-xl">M</span>
                      </div>
                      {/* Verified badge */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{testimonialsTexts.quotes[1].name}</h4>
                      <p className="text-white/70 text-sm">{testimonialsTexts.quotes[1].role}</p>
                      <div className="inline-flex items-center mt-1 px-2 py-1 bg-blue-500/20 rounded-full">
                        <span className="text-blue-300 text-xs font-medium">{testimonialsTexts.verified}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quote with voice wave icon */}
                  <div className="relative">
                    <div className="absolute -left-2 -top-2 text-blue-400/30 text-4xl font-serif">&ldquo;</div>
                    <p className="text-white/90 text-base italic leading-relaxed pl-6 group-hover:text-white transition-colors duration-300">
                      {testimonialsTexts.quotes[1].quote.split('\n').map((line, idx) => (<span key={idx}>{line}<br /></span>))}
                    </p>
                    {/* Voice wave decoration */}
                    <div className="flex items-center mt-4 space-x-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <Volume2 className="w-4 h-4 text-blue-400" />
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-1 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Natsumi Ito */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0.5 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="group relative hover:rotate-0 transition-all duration-700"
            >
              <div className="relative bg-gradient-to-br from-emerald-500/20 via-teal-400/15 to-emerald-600/20 backdrop-blur-3xl rounded-[2rem] p-8 lg:p-10 border border-emerald-300/10 shadow-2xl hover:shadow-emerald-400/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    {/* Profile avatar with glow */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-400/50 transition-all duration-500 transform group-hover:scale-110">
                        <span className="text-white font-bold text-xl">N</span>
                      </div>
                      {/* Verified badge */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{testimonialsTexts.quotes[2].name}</h4>
                      <p className="text-white/70 text-sm">{testimonialsTexts.quotes[2].role}</p>
                      <div className="inline-flex items-center mt-1 px-2 py-1 bg-emerald-500/20 rounded-full">
                        <span className="text-emerald-300 text-xs font-medium">{testimonialsTexts.verified}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quote with voice wave icon */}
                  <div className="relative">
                    <div className="absolute -left-2 -top-2 text-emerald-400/30 text-4xl font-serif">&ldquo;</div>
                    <p className="text-white/90 text-base italic leading-relaxed pl-6 group-hover:text-white transition-colors duration-300">
                      {testimonialsTexts.quotes[2].quote.split('\n').map((line, idx) => (<span key={idx}>{line}<br /></span>))}
                    </p>
                    {/* Voice wave decoration */}
                    <div className="flex items-center mt-4 space-x-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Jaehoon Park */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: -0.5 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group relative hover:rotate-0 transition-all duration-700"
            >
              <div className="relative bg-gradient-to-br from-orange-500/20 via-yellow-400/15 to-orange-600/20 backdrop-blur-3xl rounded-[2rem] p-8 lg:p-10 border border-orange-300/20 shadow-2xl hover:shadow-orange-400/30 transition-all duration-700 hover:scale-105 hover:-translate-y-2">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    {/* Profile avatar with glow */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-orange-400/50 transition-all duration-500 transform group-hover:scale-110">
                        <span className="text-white font-bold text-xl">J</span>
                      </div>
                      {/* Verified badge */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{testimonialsTexts.quotes[3].name}</h4>
                      <p className="text-white/70 text-sm">{testimonialsTexts.quotes[3].role}</p>
                      <div className="inline-flex items-center mt-1 px-2 py-1 bg-orange-500/20 rounded-full">
                        <span className="text-orange-300 text-xs font-medium">{testimonialsTexts.verified}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quote with voice wave icon */}
                  <div className="relative">
                    <div className="absolute -left-2 -top-2 text-orange-400/30 text-4xl font-serif">&ldquo;</div>
                    <p className="text-white/90 text-base italic leading-relaxed pl-6 group-hover:text-white transition-colors duration-300">
                      {testimonialsTexts.quotes[3].quote.split('\n').map((line, idx) => (<span key={idx}>{line}<br /></span>))}
                    </p>
                    {/* Voice wave decoration */}
                    <div className="flex items-center mt-4 space-x-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      <Volume2 className="w-4 h-4 text-orange-400" />
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-1 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom floating particles */}
          <div className="absolute bottom-10 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-20 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-500" />
          <div className="absolute top-10 right-10 w-1.5 h-1.5 bg-green-400/35 rounded-full animate-pulse delay-1000" />
        </div>
      </section>

      {/* Final CTA Section */}


      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Space background with subtle aurora accents */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-black to-gray-900/15 pointer-events-none" />
        
        {/* Stronger Aurora Accent Points for Contact Section */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/22 rounded-full blur-3xl opacity-45" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-600/18 rounded-full blur-3xl opacity-40" />
        
        {/* Enhanced aurora streams for contact section */}
        <div className="absolute top-0 right-0 w-20 h-40 bg-gradient-to-b from-emerald-400/25 to-transparent rounded-full blur-2xl transform rotate-12" />
        <div className="absolute bottom-0 left-0 w-24 h-48 bg-gradient-to-t from-blue-400/20 to-transparent rounded-full blur-2xl transform -rotate-12" />
        
        {/* Contact section stars with aurora colors */}
        <div className="absolute top-10 right-20 w-1 h-1 bg-emerald-200 rounded-full animate-pulse shadow-emerald-200/50 shadow-sm" style={{animationDelay: '6s'}} />
        <div className="absolute bottom-20 left-20 w-0.5 h-0.5 bg-blue-200 rounded-full animate-pulse shadow-blue-200/50 shadow-sm" style={{animationDelay: '7s'}} />
        <div className="absolute top-1/3 right-1/3 w-px h-px bg-purple-200/80 rounded-full animate-pulse" style={{animationDelay: '8s'}} />
        
        <div className="max-w-4xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-wide">
              {contactTexts.title1}<br />
              {contactTexts.title2}
            </h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {contactTexts.desc1}<br />
              {contactTexts.desc2}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main contact form */}
            <div className="bg-white/5 backdrop-blur-3xl rounded-[2rem] p-8 md:p-12 border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
              
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple-500/5 rounded-[2rem] opacity-50" />
              
              <div className="relative z-10">
                {!isSubmitted ? (
                  <form onSubmit={handleContactSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name field */}
                      <div className="group">
                        <label className="block text-white/80 text-sm font-medium mb-3 flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{contactTexts.name}</span>
                        </label>
                        <input
                          type="text"
                          value={contactForm.name}
                          onChange={(e) => handleContactChange('name', e.target.value)}
                          placeholder={contactTexts.namePlaceholder}
                          required
                          className="w-full bg-white/10 backdrop-blur-xl rounded-xl p-4 text-white placeholder-white/50 border border-white/20 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                        />
                      </div>

                      {/* Email field */}
                      <div className="group">
                        <label className="block text-white/80 text-sm font-medium mb-3 flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <span>{contactTexts.email}</span>
                        </label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => handleContactChange('email', e.target.value)}
                          placeholder={contactTexts.emailPlaceholder}
                          required
                          className="w-full bg-white/10 backdrop-blur-xl rounded-xl p-4 text-white placeholder-white/50 border border-white/20 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                        />
                      </div>
                    </div>

                    {/* Company field */}
                    <div className="group">
                      <label className="block text-white/80 text-sm font-medium mb-3 flex items-center space-x-2">
                        <Building className="w-4 h-4" />
                        <span>{contactTexts.company}</span>
                        <span className="text-white/40 text-xs">{contactTexts.optional}</span>
                      </label>
                      <input
                        type="text"
                        value={contactForm.company}
                        onChange={(e) => handleContactChange('company', e.target.value)}
                        placeholder={contactTexts.companyPlaceholder}
                        className="w-full bg-white/10 backdrop-blur-xl rounded-xl p-4 text-white placeholder-white/50 border border-white/20 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:bg-white/15 focus:bg-white/15"
                      />
                    </div>

                    {/* Message field */}
                    <div className="group">
                      <label className="block text-white/80 text-sm font-medium mb-3 flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>{contactTexts.message}</span>
                      </label>
                      <textarea
                        value={contactForm.message}
                        onChange={(e) => handleContactChange('message', e.target.value)}
                        placeholder={contactTexts.messagePlaceholder}
                        required
                        rows={5}
                        className="w-full bg-white/10 backdrop-blur-xl rounded-xl p-4 text-white placeholder-white/50 border border-white/20 focus:border-purple-400/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:bg-white/15 focus:bg-white/15 resize-none"
                      />
                    </div>

                    {/* Submit button */}
                    <div className="text-center pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting || !contactForm.name || !contactForm.email || !contactForm.message}
                        className="group relative bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 text-white px-12 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                      >
                        <div className="flex items-center space-x-3">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>{contactTexts.sending}</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                              <span>{contactTexts.getInTouch}</span>
                            </>
                          )}
                        </div>
                        
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl" />
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Thank you message */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {contactTexts.thanksTitle}
                    </h3>
                    <p className="text-white/70 text-lg">
                      {contactTexts.thanksDesc}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-12"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/60">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">{contactTexts.replyWithin}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium">{contactTexts.support}</span>
                </div>
              </div>
              
              <p className="text-white/50 text-sm mt-6 max-w-2xl mx-auto leading-relaxed">
                {contactTexts.faq}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-white/20 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center mb-8">
              <img src="/finehost_wh.png" alt="Finehost" className="h-20 w-auto" />
            </div>

          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-white/40 text-lg">
              © 2025 Vacatio Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
