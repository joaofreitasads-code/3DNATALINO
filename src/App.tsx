import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  Clock, 
  Lock, 
  Download, 
  Zap, 
  ArrowRight,
  X
} from 'lucide-react';

const CHECKOUT_LINKS = {
  basic: "https://checkout.wiven.com.br/checkout/cmud275ad00m801pvjxfzvvlf?offer=HTAVAGY",
  basicDiscountPopup: "https://checkout.wiven.com.br/checkout/cmud275ad00m801pvjxfzvvlf?offer=DERG2F9",
  complete: "https://checkout.wiven.com.br/checkout/cmud275ad00m801pvjxfzvvlf?offer=7TX9PX1",
  completeCatholicBundle: "https://checkout.wiven.com.br/checkout/cmud275ad00m801pvjxfzvvlf?offer=9579FNK"
};

const getCheckoutUrl = (url: string) => {
  if (typeof window === 'undefined') return url;
  const search = window.location.search;
  if (!search) return url;
  const cleanSearch = search.startsWith('?') ? search.slice(1) : search;
  return url.includes('?') ? `${url}&${cleanSearch}` : `${url}?${cleanSearch}`;
};

const trackPixelCheckout = (planName: string, value: number) => {
  if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
    (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'InitiateCheckout', {
      content_name: planName,
      value: value,
      currency: 'BRL'
    });
  }
};

const CDN_BASE = "https://www.natal3d.online/optimized";

// Testimonial cards data
const TESTIMONIALS = [
  { id: 1, name: "Marcos Silva", img: `${CDN_BASE}/ijmmgtl_177202f014.webp` },
  { id: 2, name: "Camila Souza", img: `${CDN_BASE}/jnrifap_87f027f4d5.webp` },
  { id: 3, name: "Camila Ferreira", img: `${CDN_BASE}/eddqnng_3677549f26.webp` },
  { id: 4, name: "Camila Santos", img: `${CDN_BASE}/119aamn_c9769aab8a.webp` },
  { id: 5, name: "João Victor", img: `${CDN_BASE}/cgcqmle_91bff2b49c.webp` }
];

// FAQ items
const FAQS = [
  {
    id: "faq-1",
    question: "Como recebo o material?",
    answer: "Assim que o pagamento for aprovado, você receberá imediatamente no seu e-mail cadastrado o link de acesso à área de membros para baixar todos os +200 arquivos STL e os bônus exclusivos."
  },
  {
    id: "faq-2",
    question: "O material é físico ou digital?",
    answer: "O material é 100% digital. São arquivos no formato .STL prontos para serem importados no seu software fatiador favorito (Cura, PrusaSlicer, Bambu Studio, OrcaSlicer, etc.) e impressos diretamente em sua impressora 3D (FDM ou Resina)."
  },
  {
    id: "faq-3",
    question: "Quais formas de pagamento posso usar?",
    answer: "Você pode pagar via PIX com liberação imediata em segundos, ou no Cartão de Crédito em até 12x. Pagamentos via PIX e cartão têm aprovação instantânea."
  },
  {
    id: "faq-4",
    question: "Terei suporte se precisar de ajuda?",
    answer: "Com certeza! Disponibilizamos suporte dedicado via WhatsApp e e-mail para auxiliar você com qualquer dúvida sobre download e acesso aos arquivos."
  },
  {
    id: "faq-5",
    question: "Tem garantia?",
    answer: "Sim! Oferecemos 7 dias de garantia incondicional no plano básico e 15 dias de garantia no plano completo. Se não gostar dos arquivos por qualquer razão, devolvemos 100% do seu dinheiro sem burocracia."
  },
  {
    id: "faq-6",
    question: "O pagamento é seguro?",
    answer: "Sim, totalmente seguro! O pagamento é intermediado por uma das maiores e mais seguras plataformas de pagamentos do Brasil, com criptografia bancária SSL de ponta a ponta."
  }
];

// Image arrays for marquee
const ROW_1_IMAGES = [
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_c91a7a2c2.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_e35b396e6.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_109d3b735.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_ba136b83c.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_a056ad514.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_d0e5861d4.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_32a8f0522.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_aa2645e64.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_08e893dd2.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_090709a8d.webp`
];

const ROW_2_IMAGES = [
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_090709a8d.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_08e893dd2.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_aa2645e64.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_32a8f0522.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_d0e5861d4.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_a056ad514.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_ba136b83c.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_109d3b735.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_e35b396e6.webp`,
  `${CDN_BASE}/chatgpt-image-9-de-set_-d_c91a7a2c2.webp`
];

const ROW_3_IMAGES = [
  `${CDN_BASE}/mu72ycj_8ed6157a10.webp`,
  `${CDN_BASE}/jq9xak3_70227271e0.webp`,
  `${CDN_BASE}/kwcxeky_f20a8370ac.webp`,
  `${CDN_BASE}/y0c7wi4_18fa41725a.webp`,
  `${CDN_BASE}/t9g9blo_ea9456c765.webp`,
  `${CDN_BASE}/qmrnv7y_85ea80cf6b.webp`,
  `${CDN_BASE}/b5wyxzv_96fb69de9a.webp`,
  `${CDN_BASE}/unq2be8_83ef7f2389.webp`,
  `${CDN_BASE}/7qyqevd_57a6bacb53.webp`,
  `${CDN_BASE}/kdn9c2s_ac37963304.webp`,
  `${CDN_BASE}/l3hnuez_21b5b8321d.webp`
];

const ROW_4_IMAGES = [
  `${CDN_BASE}/tx4ab8q_4e9bccc893.webp`,
  `${CDN_BASE}/hsfmjki_75df406777.webp`,
  `${CDN_BASE}/tcqtztc_509b5657c3.webp`,
  `${CDN_BASE}/unbaw7q_ad1911d83c.webp`,
  `${CDN_BASE}/vs1wpdy_c74880e033.webp`,
  `${CDN_BASE}/unbgqv2_f4adbfc004.webp`,
  `${CDN_BASE}/ulahxgr_b623cd6d10.webp`,
  `${CDN_BASE}/1jjbsyz_4575288d26.webp`,
  `${CDN_BASE}/cd141mo_88e41ad547.webp`
];

const ACCESS_GALLERY_ROW_1 = [
  `${CDN_BASE}/sbbnw8b_8180313a02.webp`,
  `${CDN_BASE}/poqudmo_1556352eef.webp`,
  `${CDN_BASE}/nqobtje_48b594d0a4.webp`,
  `${CDN_BASE}/t2uvg3j_faa29028e2.webp`,
  `${CDN_BASE}/bukti7u_7be92e621a.webp`,
  `${CDN_BASE}/qoxkd21_0cd122dde0.webp`,
  `${CDN_BASE}/zudezy4_e21d6e1012.webp`,
  `${CDN_BASE}/9orprhy_6f7a064b0e.webp`
];

const CATHOLIC_SLIDER_IMAGES = [
  `${CDN_BASE}/xdzcgfo_4944d10926.webp`,
  `${CDN_BASE}/1hf0i9p_f80ed931a3.webp`,
  `${CDN_BASE}/5cra14v_a8c418313d.webp`,
  `${CDN_BASE}/a2ygins_1b5ad8fd16.webp`,
  `${CDN_BASE}/qjpfa0j_4e1373b692.webp`,
  `${CDN_BASE}/v9lzqrk_8d3a22fd9c.webp`,
  `${CDN_BASE}/q2mksrp_cf39d76d6b.webp`,
  `${CDN_BASE}/ra2kvkv_0a4ccb74c7.webp`,
  `${CDN_BASE}/v2knd7l_4ec189eae4.webp`
];

export default function App() {
  const [activeFaq, setActiveFaq] = useState<string | null>("faq-1");
  const [currentTestimonial, setCurrentTestimonial] = useState(3); // Start on 4th as in screenshot
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(false);
  const [heroVideoMuted, setHeroVideoMuted] = useState(true);
  const [heroProgress, setHeroProgress] = useState(0);
  const [previewVideoPlaying, setPreviewVideoPlaying] = useState(false);
  const [previewVideoMuted, setPreviewVideoMuted] = useState(true);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showFloatingBar, setShowFloatingBar] = useState(false);
  const [showCatholicModal, setShowCatholicModal] = useState(false);
  const [catholicTimer, setCatholicTimer] = useState(479); // 07:59
  const [catholicSlide, setCatholicSlide] = useState(0);
  const [isHoveredCatholic, setIsHoveredCatholic] = useState(false);

  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);

  // Meta Pixel PageView tracking on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
      (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'PageView');
    }
  }, []);

  // Compute tomorrow date in Brazilian Portuguese format (DD/MM/YYYY)
  const [tomorrowFormatted, setTomorrowFormatted] = useState("12/10/2026");
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const day = String(tomorrow.getDate()).padStart(2, '0');
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const year = tomorrow.getFullYear();
    setTomorrowFormatted(`${day}/${month}/${year}`);
  }, []);

  // Track scroll for floating bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowFloatingBar(true);
      } else {
        setShowFloatingBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exit intent detection (when mouse moves towards top of viewport)
  useEffect(() => {
    let triggered = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !triggered) {
        triggered = true;
        setShowExitModal(true);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // Catholic bundle countdown timer effect
  useEffect(() => {
    if (!showCatholicModal) return;
    const interval = setInterval(() => {
      setCatholicTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [showCatholicModal]);

  // Catholic bundle auto-slide
  useEffect(() => {
    if (!showCatholicModal || isHoveredCatholic) return;
    const interval = setInterval(() => {
      setCatholicSlide((prev) => (prev + 1) % CATHOLIC_SLIDER_IMAGES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [showCatholicModal, isHoveredCatholic]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Video playback helper
  const handleToggleHeroVideo = () => {
    if (!heroVideoRef.current) return;
    if (heroVideoPlaying) {
      heroVideoRef.current.pause();
      setHeroVideoPlaying(false);
    } else {
      heroVideoRef.current.muted = false;
      setHeroVideoMuted(false);
      heroVideoRef.current.play().then(() => {
        setHeroVideoPlaying(true);
      }).catch(() => {
        // Fallback with mute if browser autoplay policy blocks unmuted play
        if (heroVideoRef.current) {
          heroVideoRef.current.muted = true;
          setHeroVideoMuted(true);
          heroVideoRef.current.play();
          setHeroVideoPlaying(true);
        }
      });
    }
  };

  const handleHeroTimeUpdate = () => {
    if (heroVideoRef.current && heroVideoRef.current.duration) {
      const progress = (heroVideoRef.current.currentTime / heroVideoRef.current.duration) * 100;
      setHeroProgress(progress);
    }
  };

  const handleTogglePreviewVideo = () => {
    if (!previewVideoRef.current) return;
    if (previewVideoPlaying) {
      previewVideoRef.current.pause();
      setPreviewVideoPlaying(false);
    } else {
      previewVideoRef.current.muted = false;
      setPreviewVideoMuted(false);
      previewVideoRef.current.play().then(() => {
        setPreviewVideoPlaying(true);
      }).catch(() => {
        if (previewVideoRef.current) {
          previewVideoRef.current.muted = true;
          setPreviewVideoMuted(true);
          previewVideoRef.current.play();
          setPreviewVideoPlaying(true);
        }
      });
    }
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="min-h-screen w-full bg-white text-[#0F172A] flex flex-col font-sans antialiased overflow-x-hidden selection:bg-red-600 selection:text-white">
      
      {/* ===================== HERO SECTION ===================== */}
      <section 
        id="hero" 
        className="relative w-full text-white text-center overflow-hidden pt-10 pb-16 px-4 md:pt-14 md:pb-24 md:px-6 flex flex-col items-center"
        style={{
          background: 'radial-gradient(at 50% 10%, rgba(254, 202, 202, 0.15) 0%, rgba(220, 38, 38, 0.45) 25%, rgba(153, 27, 27, 0.96) 60%, rgb(95, 11, 19) 100%), linear-gradient(rgb(136, 19, 31) 0%, rgb(88, 10, 17) 100%)'
        }}
      >
        {/* Subtle patterned dots background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.25) 1.2px, transparent 0px)',
            backgroundSize: '32px 32px'
          }}
        />
        
        {/* Ambient warm glow */}
        <div 
          className="absolute top-[26%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[620px] h-[280px] md:h-[450px] pointer-events-none blur-[70px]"
          style={{
            background: 'radial-gradient(circle, rgba(254, 240, 138, 0.22) 0%, rgba(239, 68, 68, 0.3) 50%, transparent 75%)'
          }}
        />

        {/* Festive badge */}
        <a 
          href="#carrossel-stl" 
          className="relative z-10 inline-flex items-center gap-2.5 bg-white/20 hover:bg-white/30 border border-white/60 backdrop-blur-md px-5 py-2 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase text-white mb-5 shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
          title="Ver modelos da Coleção de Natal 2026"
        >
          <span className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_#FDE047] animate-pulse" />
          <span>🎄 Coleção de Natal 2026</span>
        </a>

        {/* Main Title */}
        <h1 className="relative z-10 font-cinzel text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black max-w-6xl mx-auto leading-[1.12] md:leading-[1.1] tracking-tight text-white drop-shadow-md mb-4 sm:mb-6">
          Transforme sua impressora 3D em uma{' '}
          <span className="text-amber-300 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent font-black drop-shadow-[0_4px_20px_rgba(245,158,11,0.45)]">
            máquina de vendas neste Natal
          </span>
        </h1>

        {/* Subtitle */}
        <p className="relative z-10 text-lg sm:text-2xl md:text-3xl lg:text-[1.95rem] font-bold text-amber-100/95 max-w-5xl mx-auto leading-snug mb-8 sm:mb-10 drop-shadow-md px-2">
          Acesse arquivos STL natalinos prontos para{' '}
          <span className="text-amber-300 font-extrabold underline decoration-amber-400/60 decoration-2 underline-offset-4">
            imprimir, divulgar e vender
          </span>{' '}
          ainda este fim de ano.
        </p>

        {/* Video Presentation Card */}
        <div id="video-apresentacao" className="relative z-10 w-full max-w-[360px] mx-auto mb-6 flex flex-col items-center px-2">
          <div className="flex items-center gap-2 font-bold text-amber-300 text-sm md:text-base mb-3 drop-shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-blink-dot" />
            Assista para conhecer 👇
          </div>

          <div className="w-full max-w-[340px] sm:max-w-[360px] mx-auto">
            <div 
              onClick={handleToggleHeroVideo}
              className="relative w-full aspect-[9/16] bg-black rounded-[23px] overflow-hidden cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.65)] border-2 border-amber-400/40 group select-none transition-transform hover:scale-[1.01]"
            >
              <video 
                ref={heroVideoRef}
                playsInline
                preload={heroVideoPlaying ? "auto" : "none"}
                poster={`${CDN_BASE}/thumbnail_83a52e5a5d.webp`}
                width="360"
                height="640"
                className="w-full h-full object-cover"
                src="https://www.natal3d.online/optimized/preview_video.mp4"
                onTimeUpdate={handleHeroTimeUpdate}
                onEnded={() => setHeroVideoPlaying(false)}
              />

              {/* Overlay with play & sound action */}
              {!heroVideoPlaying && (
                <div className="absolute inset-0 bg-black/35 hover:bg-black/25 flex flex-col items-center justify-center p-4 z-20 backdrop-blur-[0.5px] transition-all duration-300">
                  <div className="relative group/btn flex flex-col items-center cursor-pointer">
                    <div className="absolute inset-0 bg-red-600/30 rounded-[28px] blur-xl animate-pulse pointer-events-none" />
                    <div className="relative transform transition-all duration-300 group-hover/btn:scale-110 active:scale-95">
                      <svg 
                        className="w-20 h-14 sm:w-24 sm:h-17 drop-shadow-[0_12px_30px_rgba(255,0,0,0.7)]" 
                        viewBox="0 0 68 48" 
                        aria-label="Assistir no YouTube com som"
                      >
                        <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#FF0000" />
                        <polygon points="26,14 45,24 26,34" fill="#FFFFFF" />
                      </svg>
                    </div>
                    <div className="mt-4 bg-[#4c090f]/95 border border-white/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs sm:text-sm font-extrabold shadow-xl flex items-center gap-2 animate-bounce">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <span className="text-amber-300 uppercase tracking-wide">Clique para ouvir</span>
                      <span className="text-base">🔊</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Floating Mute/Unmute control when playing */}
              {heroVideoPlaying && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (heroVideoRef.current) {
                      heroVideoRef.current.muted = !heroVideoRef.current.muted;
                      setHeroVideoMuted(heroVideoRef.current.muted);
                    }
                  }}
                  className="absolute top-3 right-3 z-30 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full border border-white/40 shadow-lg cursor-pointer"
                  aria-label={heroVideoMuted ? "Ativar som" : "Desativar som"}
                >
                  {heroVideoMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
              )}

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[6px] bg-black/40 z-30">
                <div 
                  className="h-full bg-[#FF0000] transition-all duration-300 relative" 
                  style={{ width: `${heroProgress}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Testados e prontos badge */}
          <div className="mt-3.5 bg-[#4c090f]/95 border border-white/40 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 text-white text-xs sm:text-sm font-semibold shadow-xl">
            <svg className="w-4 h-4 text-amber-300 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Arquivos 100% Testados e Prontos para Fatiamento
          </div>
        </div>

        {/* Narrative lead */}
        <div className="relative z-10 max-w-3xl mx-auto mb-7 px-3">
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-100 font-normal">
            Acesse <strong className="font-bold text-amber-300">+200 modelos STL Natalinos</strong> prontos para imprimir e vender. Crie <strong className="font-bold text-amber-300">peças decorativas</strong>, lembrancinhas e enfeites com <strong className="font-bold text-amber-300">alto potencial de venda</strong> neste fim de ano, sem modelar nada do zero.
          </p>
        </div>

        {/* Neon CTA Button */}
        <div className="relative z-10 w-full flex flex-col items-center">
          <a 
            href="#sim" 
            className="animate-pulse-neon inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#00E676] via-[#00FF66] to-[#05DF72] hover:from-[#00FF66] hover:to-[#00E676] text-slate-950 font-black text-sm sm:text-base py-3.5 sm:py-4 px-6 sm:px-8 rounded-full uppercase tracking-wider shadow-[0_0_30px_rgba(0,255,102,0.65),0_10px_25px_rgba(0,0,0,0.5)] border-2 border-white transition-all transform hover:-translate-y-1 hover:scale-[1.03] active:scale-98 max-w-md w-full cursor-pointer"
          >
            <span>QUERO GARANTIR OS MODELOS AGORA!</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3] shrink-0" />
          </a>

          {/* Reassurance pills */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap mt-5 text-xs sm:text-sm text-slate-200">
            <span className="inline-flex items-center gap-1.5 font-medium text-white">
              <Check className="w-4 h-4 text-amber-300 stroke-[2.5]" />
              Acesso Imediato
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-white">
              <Check className="w-4 h-4 text-amber-300 stroke-[2.5]" />
              Download Vitalício
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-white">
              <Check className="w-4 h-4 text-amber-300 stroke-[2.5]" />
              Pagamento 100% Seguro
            </span>
          </div>
        </div>
      </section>

      {/* ===================== OPORTUNIDADE NATAL ===================== */}
      <section id="oportunidade-natal" className="relative w-full bg-white py-16 md:py-24 px-4 text-center overflow-hidden border-b border-red-100/60">
        <div 
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-[340px] md:w-[650px] h-[220px] pointer-events-none" 
          style={{
            background: 'radial-gradient(rgba(220, 38, 38, 0.08) 0%, rgba(245, 158, 11, 0.05) 45%, transparent 75%)'
          }}
        />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-8 md:mb-11 leading-tight tracking-tight">
            O Natal cria uma das melhores oportunidades do ano para{' '}
            <span className="text-red-600 bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              vender com impressão 3D
            </span> 🎄
          </h2>

          <div className="w-full max-w-xl mx-auto mb-9 flex justify-center">
            <div className="p-1 rounded-[26px] bg-gradient-to-br from-red-500 via-amber-300 to-rose-600 shadow-[0_20px_45px_-12px_rgba(220,38,38,0.2)] hover:-translate-y-1 transition-all duration-300">
              <div className="bg-white rounded-[22px] overflow-hidden">
                <img 
                  alt="Oportunidade de Vendas de Modelos STL no Natal" 
                  className="w-full h-auto object-cover rounded-[22px] block" 
                  loading="eager" 
                  decoding="async"
                  fetchPriority="high"
                  width="576" 
                  height="576" 
                  src={`${CDN_BASE}/0vvwgex_6c03c807ec.webp`} 
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-700 font-normal leading-relaxed">
            <p>
              Quem se antecipa aproveita a alta procura por presentes e decoração natalina para transformar sua impressora 3D em uma máquina de vendas lucrativa no fim do ano.
            </p>
            <p>
              Você recebe os arquivos 100% prontos para fatiar, imprimir e comercializar, preparando seu catálogo com antecedência e lucrando alto na melhor temporada do mercado.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== PREVIEW MODELOS ===================== */}
      <section 
        id="preview-modelos" 
        className="relative w-full text-white py-16 md:py-24 px-4 text-center overflow-hidden" 
        style={{
          background: 'radial-gradient(at 50% 15%, rgba(254, 202, 202, 0.15) 0%, rgba(220, 38, 38, 0.45) 25%, rgba(153, 27, 27, 0.96) 60%, rgb(95, 11, 19) 100%), linear-gradient(rgb(136, 19, 31) 0%, rgb(88, 10, 17) 100%)'
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none opacity-40" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.25) 1.2px, transparent 0px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase mb-4 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
              <span>🎥 VÍDEO DEMONSTRATIVO DAS PEÇAS</span>
            </div>
            
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              Veja o que você pode começar a{' '}
              <span className="relative text-amber-300 inline-block font-black bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                imprimir hoje:
                <span className="absolute -bottom-1 left-0 w-full h-1 md:h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-red-500" />
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-slate-100 font-normal max-w-3xl mx-auto leading-relaxed mt-4">
              Modelos STL Natalinos prontos para produzir e vender, ideais para montar seu catálogo de fim de ano com peças criativas e de altíssimo valor percebido.
            </p>
          </div>

          {/* Video Demonstration Player */}
          <div className="relative max-w-3xl mx-auto select-none">
            <div className="relative p-[3px] sm:p-1.5 rounded-[26px] bg-gradient-to-br from-amber-300 via-rose-500 to-red-600 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_35px_rgba(220,38,38,0.35)]">
              <div 
                onClick={handleTogglePreviewVideo}
                className="bg-black rounded-[22px] overflow-hidden aspect-video flex items-center justify-center relative cursor-pointer group"
              >
                <video 
                  ref={previewVideoRef}
                  playsInline
                  preload={previewVideoPlaying ? "auto" : "none"}
                  poster={`${CDN_BASE}/preview_video_poster.webp`}
                  src={`${CDN_BASE}/preview_video.mp4`}
                  width="854"
                  height="468"
                  className="w-full h-full object-cover block"
                  onEnded={() => setPreviewVideoPlaying(false)}
                />

                {!previewVideoPlaying && (
                  <div className="absolute inset-0 bg-transparent hover:bg-black/10 flex flex-col items-center justify-center p-4 z-20 transition-all duration-300 cursor-pointer">
                    <div className="relative group/btn flex flex-col items-center">
                      <div className="absolute inset-0 bg-red-600/35 rounded-full blur-xl animate-pulse pointer-events-none" />
                      <div className="relative transform transition-all duration-300 group-hover/btn:scale-110 active:scale-95">
                        <div className="w-16 h-11 sm:w-20 sm:h-14 bg-[#FF0000] rounded-2xl flex items-center justify-center shadow-[0_10px_30px_rgba(255,0,0,0.6)] border border-white/20">
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-current ml-1" />
                        </div>
                      </div>
                      <div className="mt-3.5 bg-[#4c090f]/95 border border-white/50 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs sm:text-sm font-extrabold shadow-xl flex items-center gap-2 animate-bounce">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span className="text-amber-300 uppercase tracking-wide">Clique para ver o vídeo com som</span>
                        <span className="text-sm">🔊</span>
                      </div>
                    </div>
                  </div>
                )}

                {previewVideoPlaying && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (previewVideoRef.current) {
                        previewVideoRef.current.muted = !previewVideoRef.current.muted;
                        setPreviewVideoMuted(previewVideoRef.current.muted);
                      }
                    }}
                    className="absolute top-4 right-4 z-30 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full border border-white/40 shadow-lg cursor-pointer"
                    aria-label={previewVideoMuted ? "Ativar som" : "Desativar som"}
                  >
                    {previewVideoMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnails preview strip */}
          <div className="mt-8 pt-6 border-t border-white/10 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-wider text-amber-300 font-bold mb-3">
              ✨ Alguns dos +200 modelos disponíveis para você imprimir:
            </p>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {[
                `${CDN_BASE}/chatgpt-image-9-de-set_-d_32a8f0522.webp`,
                `${CDN_BASE}/chatgpt-image-9-de-set_-d_e35b396e6.webp`,
                `${CDN_BASE}/chatgpt-image-9-de-set_-d_a056ad514.webp`,
                `${CDN_BASE}/chatgpt-image-9-de-set_-d_ba136b83c.webp`,
                `${CDN_BASE}/chatgpt-image-9-de-set_-d_090709a8d.webp`
              ].map((src, i) => (
                <div 
                  key={i} 
                  className="relative rounded-xl overflow-hidden aspect-square p-0.5 bg-gradient-to-b from-white/20 to-black/40 border border-white/20 shadow-md group/thumb"
                  title={`Modelo STL Natalino ${i + 1}`}
                >
                  <img 
                    alt={`Modelo STL ${i + 1}`} 
                    className="w-full h-full object-cover rounded-[9px] group-hover/thumb:scale-105 transition-transform duration-300" 
                    loading="lazy" 
                    width="120" 
                    height="120" 
                    src={src} 
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a 
              href="#sim" 
              className="animate-pulse-neon inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#00E676] via-[#00FF66] to-[#05DF72] hover:from-[#00FF66] hover:to-[#00E676] text-slate-950 font-black text-xs sm:text-sm py-3 px-6 sm:px-8 rounded-full uppercase tracking-wider shadow-[0_0_25px_rgba(0,255,102,0.65),0_10px_25px_rgba(0,0,0,0.5)] border-2 border-white transition-all transform hover:-translate-y-0.5 hover:scale-[1.03] active:scale-98 cursor-pointer"
            >
              <span>QUERO ESSES MODELOS PARA IMPRIMIR</span>
              <ArrowRight className="w-4 h-4 stroke-[3] shrink-0" />
            </a>
          </div>
        </div>
      </section>

      {/* ===================== ACERVO NATAL ===================== */}
      <section id="acervo-natal" className="relative w-full bg-white py-16 md:py-24 px-4 text-center overflow-hidden border-b border-red-100/60 content-auto">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-5 tracking-tight leading-tight max-w-4xl mx-auto">
            Um acervo completo para você{' '}
            <span className="relative text-red-600 inline-block">
              aproveitar a temporada antes que ela passe
              <span className="absolute -bottom-1 left-0 w-full h-1 md:h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-red-600" />
            </span>
          </h2>

          <div className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
            <p>
              Tenha acesso a uma coleção com +200 modelos STL Natalinos para imprimir, produzir e colocar à venda enquanto a procura de fim de ano está no pico mais aquecido.
            </p>
            <p className="mt-4 font-bold text-red-700">No acervo você encontra modelos como:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 max-w-5xl mx-auto mb-11">
            {/* Card 1 */}
            <div className="bg-white border border-slate-200/80 rounded-[24px] p-7 md:p-8 flex flex-col items-center text-center shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(220,38,38,0.08)] hover:border-red-500/40 transition-all duration-300 group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-red-50 border border-red-200/60 flex items-center justify-center text-red-700 mb-5 shadow-xs group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-red-800 group-hover:text-white transition-all duration-300">
                <span className="text-3xl">🎅</span>
              </div>
              <h3 className="font-cinzel text-lg md:text-xl font-bold text-[#0F172A] mb-3 leading-snug">
                🎅 Papais Noéis e Personagens Natalinos
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Peças clássicas e chamativas para presentes, decoração e encomendas de alto valor no fim de ano.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-200/80 rounded-[24px] p-7 md:p-8 flex flex-col items-center text-center shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(15,23,42,0.08)] hover:border-amber-500/40 transition-all duration-300 group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 mb-5 shadow-xs group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-700 group-hover:text-white transition-all duration-300">
                <span className="text-3xl">🎄</span>
              </div>
              <h3 className="font-cinzel text-lg md:text-xl font-bold text-[#0F172A] mb-3 leading-snug">
                🎄 Enfeites e Decorações de Natal
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Modelos para árvores, mesas e ambientes residenciais e comerciais, perfeitos para kits decorativos.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-200/80 rounded-[24px] p-7 md:p-8 flex flex-col items-center text-center shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(220,38,38,0.08)] hover:border-red-500/40 transition-all duration-300 group">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-red-50 border border-red-200/60 flex items-center justify-center text-red-700 mb-5 shadow-xs group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-red-800 group-hover:text-white transition-all duration-300">
                <span className="text-3xl">🎁</span>
              </div>
              <h3 className="font-cinzel text-lg md:text-xl font-bold text-[#0F172A] mb-3 leading-snug">
                🎁 Presentes e Peças Temáticas
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Itens criativos para lembrancinhas, encomendas e presentes sazonais com forte apelo de compra por impulso.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4">
            <p className="text-base sm:text-lg md:text-xl font-medium text-slate-800 leading-relaxed">
              E isso é apenas parte do acervo. Você recebe modelos prontos para imprimir, anunciar e lucrar enquanto essa grande oportunidade anual está em alta.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== COMO ESSE PACK AJUDA VOCÊ A VENDER MAIS ===================== */}
      <section className="relative w-full bg-white py-16 md:py-24 px-4 text-center overflow-hidden border-b border-red-100/60 content-auto">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-12 tracking-tight leading-tight max-w-4xl mx-auto">
            Veja como esse pack pode ajudar você a{' '}
            <span className="relative text-red-600 inline-block">
              vender mais durante a temporada de Natal
              <span className="absolute -bottom-1 left-0 w-full h-1 md:h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-red-600" />
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Benefit 1 */}
            <div className="bg-white border border-slate-200/80 rounded-[24px] p-7 md:p-8 flex flex-col items-center text-center shadow-[0_8px_25px_rgba(15,23,42,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(220,38,38,0.08)] hover:border-red-500/40 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200/60 flex items-center justify-center text-red-600 mb-5 shadow-xs group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-red-800 group-hover:text-white transition-all duration-300">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-[#0F172A] mb-3 leading-snug">
                Saia na frente antes da alta procura
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Enquanto muitos esperam dezembro chegar para pensar no que produzir, você já começa a preparar e divulgar suas peças com antecedência.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white border border-slate-200/80 rounded-[24px] p-7 md:p-8 flex flex-col items-center text-center shadow-[0_8px_25px_rgba(15,23,42,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(220,38,38,0.08)] hover:border-red-500/40 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200/60 flex items-center justify-center text-red-600 mb-5 shadow-xs group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-red-800 group-hover:text-white transition-all duration-300">
                <Download className="w-8 h-8" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-[#0F172A] mb-3 leading-snug">
                Amplie seu catálogo sem modelar do zero
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Economize horas e dias de trabalho técnico tendo acesso a uma coleção pronta para fatiar, imprimir e colocar à venda.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white border border-slate-200/80 rounded-[24px] p-7 md:p-8 flex flex-col items-center text-center shadow-[0_8px_25px_rgba(15,23,42,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(220,38,38,0.08)] hover:border-red-500/40 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200/60 flex items-center justify-center text-red-600 mb-5 shadow-xs group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-red-800 group-hover:text-white transition-all duration-300">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-[#0F172A] mb-3 leading-snug">
                Aproveite o forte apelo do Natal
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Produtos natalinos têm apelo emocional e apelo visual elevado, facilitando a decisão de compra para presentes e decorações.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white border border-slate-200/80 rounded-[24px] p-7 md:p-8 flex flex-col items-center text-center shadow-[0_8px_25px_rgba(15,23,42,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(220,38,38,0.08)] hover:border-red-500/40 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200/60 flex items-center justify-center text-red-600 mb-5 shadow-xs group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-red-800 group-hover:text-white transition-all duration-300">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-[#0F172A] mb-3 leading-snug">
                Crie novas oportunidades de faturamento
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Aumente suas chances de vendas oferecendo opções variadas para clientes finais, feiras, lojas e encomendas temáticas.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="bg-white border border-slate-200/80 rounded-[24px] p-7 md:p-8 flex flex-col items-center text-center shadow-[0_8px_25px_rgba(15,23,42,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(220,38,38,0.08)] hover:border-red-500/40 transition-all duration-300 group md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200/60 flex items-center justify-center text-red-600 mb-5 shadow-xs group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-red-800 group-hover:text-white transition-all duration-300">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-[#0F172A] mb-3 leading-snug">
                Destaque-se antes dos seus concorrentes
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Quem começa a produzir e divulgar primeiro capta a atenção do público antes do mercado ficar saturado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== O QUE VOCÊ RECEBE ===================== */}
      <section id="o-que-voce-recebe" className="relative w-full bg-white py-14 md:py-20 px-4 overflow-hidden border-b border-red-100/60 content-auto">
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-red-700 text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase mb-7 shadow-md border border-red-500/40">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>TUDO O QUE VOCÊ VAI RECEBER</span>
          </div>

          <div className="w-full bg-white border border-red-100/80 rounded-[30px] p-6 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(220,38,38,0.06)] relative">
            <div className="inline-flex items-center gap-1.5 bg-amber-100/80 text-amber-900 border border-amber-300/80 font-bold text-xs px-3.5 py-1.5 rounded-full uppercase mb-4 tracking-wide">
              ⚡ ACESSO IMEDIATO
            </div>
            
            <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-8 leading-snug">
              ✦ VEJA TUDO O QUE VOCÊ VAI RECEBER:
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-center">
              {/* Product Visual Box */}
              <div className="lg:col-span-5 flex flex-col items-center w-full max-w-[380px] mx-auto">
                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-red-900/30 bg-gradient-to-b from-[#88131f] to-[#500a12] p-5 text-center">
                  <div className="relative w-full flex justify-center items-center py-2">
                    <img 
                      alt="+200 Modelos STL Natalinos - Pacote Completo" 
                      className="w-full h-auto max-h-[340px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] select-none pointer-events-none" 
                      loading="eager" 
                      width="380" 
                      height="280" 
                      src={`${CDN_BASE}/M4QGwBZ.webp`} 
                    />
                  </div>

                  <div className="mt-2 bg-white/10 border border-amber-400/40 backdrop-blur-md px-3.5 py-1.5 rounded-full inline-flex items-center gap-2 text-amber-300 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    +200 Modelos Testados e Prontos
                  </div>

                  <p className="text-slate-100 text-xs mt-3 leading-relaxed font-medium">
                    Acesso imediato à pasta organizada com arquivos .STL em alta resolução para fatiamento em qualquer impressora 3D.
                  </p>

                  <a 
                    href="#video-apresentacao" 
                    className="mt-4 inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-bold transition-all hover:scale-105"
                  >
                    <span>▲ Rever vídeo de apresentação no topo</span>
                  </a>
                </div>
              </div>

              {/* Checklist list */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <ul className="flex flex-col gap-3.5 text-left">
                  {[
                    "+200 arquivos STL Natalinos prontos para imprimir e vender",
                    "Modelos variados de Papai Noel, enfeites, decorações, presentes e peças temáticas",
                    "Arquivos criativos, chamativos e com forte apelo para vendas de fim de ano",
                    "Tudo pronto para uso, sem precisar modelar ou criar arquivos do zero",
                    "Prepare seu catálogo com antecedência e aproveite melhor a temporada de Natal",
                    "Peças ideais para vendas online, encomendas, feiras, lojas e produção sob demanda",
                    "Modelos pensados para criar produtos atrativos, decorativos e fáceis de anunciar",
                    "Perfeito para vender como presentes, lembranças, enfeites e itens de decoração natalina",
                    "Compatível com impressoras 3D e disponível para acesso imediato",
                    "Ideal para quem quer aproveitar o Natal para criar uma nova oportunidade de renda extra"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="font-cinzel font-bold text-red-700 text-base mt-6 text-center lg:text-left tracking-wide">
                  ✦ E MUITO MAIS...
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200 flex flex-col items-center">
              <a 
                href="#sim" 
                className="animate-pulse-neon inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#00E676] via-[#00FF66] to-[#05DF72] hover:from-[#00FF66] hover:to-[#00E676] text-slate-950 font-black text-xs sm:text-sm md:text-base py-3 sm:py-3.5 px-6 sm:px-8 rounded-full uppercase tracking-wider shadow-[0_0_25px_rgba(0,255,102,0.65),0_10px_25px_rgba(0,0,0,0.5)] border-2 border-white transition-all transform hover:-translate-y-1 hover:scale-[1.03] active:scale-98 max-w-md w-full text-center cursor-pointer"
              >
                <span>SIM, QUERO GARANTIR O MATERIAL</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3] shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CARROSSEL STL MARQUEE ===================== */}
      <section 
        id="carrossel-stl" 
        className="relative w-full text-white py-16 md:py-24 overflow-hidden content-auto" 
        style={{
          background: 'radial-gradient(at 50% 15%, rgba(254, 202, 202, 0.15) 0%, rgba(220, 38, 38, 0.45) 25%, rgba(153, 27, 27, 0.96) 60%, rgb(95, 11, 19) 100%), linear-gradient(rgb(136, 19, 31) 0%, rgb(88, 10, 17) 100%)'
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none opacity-40" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.25) 1.2px, transparent 0px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="relative z-10 text-center mb-10 px-4">
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3">
            Modelos Que Encantam e Vendem no Natal
          </h2>
          <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto font-normal">
            Veja em detalhes os modelos STL prontos para imprimir e lucrar neste fim de ano
          </p>
        </div>

        {/* 4 Multi-direction infinite marquee rows */}
        <div className="relative w-full overflow-hidden marquee-container flex flex-col gap-4 md:gap-6 select-none">
          {/* Gradient edges for seamless look */}
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#5f0b13] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#5f0b13] to-transparent z-20 pointer-events-none" />

          {/* Row 1: Right */}
          <div className="flex w-max marquee-to-right select-none">
            {[...ROW_1_IMAGES, ...ROW_1_IMAGES].map((src, i) => (
              <div key={i} className="px-2 sm:px-2.5 shrink-0">
                <div className="w-[180px] sm:w-[210px] md:w-[240px] aspect-square rounded-[18px] sm:rounded-[20px] overflow-hidden relative group shadow-[0_8px_20px_rgba(0,0,0,0.6)] border border-amber-400/50">
                  <img 
                    alt={`Modelo STL ${i + 1}`} 
                    width="240" 
                    height="240" 
                    className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-300" 
                    loading="lazy" 
                    src={src} 
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/80 border border-amber-400/60 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full backdrop-blur-sm shadow-md">
                    ✨ STL
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2: Left */}
          <div className="flex w-max marquee-to-left select-none">
            {[...ROW_2_IMAGES, ...ROW_2_IMAGES].map((src, i) => (
              <div key={i} className="px-2 sm:px-2.5 shrink-0">
                <div className="w-[180px] sm:w-[210px] md:w-[240px] aspect-square rounded-[18px] sm:rounded-[20px] overflow-hidden relative group shadow-[0_8px_20px_rgba(0,0,0,0.6)] border border-amber-400/50">
                  <img 
                    alt={`Modelo STL ${i + 1}`} 
                    width="240" 
                    height="240" 
                    className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-300" 
                    loading="lazy" 
                    src={src} 
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/80 border border-amber-400/60 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full backdrop-blur-sm shadow-md">
                    ✨ STL
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: Right */}
          <div className="flex w-max marquee-to-right select-none">
            {[...ROW_3_IMAGES, ...ROW_3_IMAGES].map((src, i) => (
              <div key={i} className="px-2 sm:px-2.5 shrink-0">
                <div className="w-[180px] sm:w-[210px] md:w-[240px] aspect-square rounded-[18px] sm:rounded-[20px] overflow-hidden relative group shadow-[0_8px_20px_rgba(0,0,0,0.6)] border border-amber-400/50">
                  <img 
                    alt={`Modelo STL ${i + 1}`} 
                    width="240" 
                    height="240" 
                    className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-300" 
                    loading="lazy" 
                    src={src} 
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/80 border border-amber-400/60 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full backdrop-blur-sm shadow-md">
                    ✨ STL
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 4: Left */}
          <div className="flex w-max marquee-to-left select-none">
            {[...ROW_4_IMAGES, ...ROW_4_IMAGES].map((src, i) => (
              <div key={i} className="px-2 sm:px-2.5 shrink-0">
                <div className="w-[180px] sm:w-[210px] md:w-[240px] aspect-square rounded-[18px] sm:rounded-[20px] overflow-hidden relative group shadow-[0_8px_20px_rgba(0,0,0,0.6)] border border-amber-400/50">
                  <img 
                    alt={`Modelo STL ${i + 1}`} 
                    width="240" 
                    height="240" 
                    className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-300" 
                    loading="lazy" 
                    src={src} 
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/80 border border-amber-400/60 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full backdrop-blur-sm shadow-md">
                    ✨ STL
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== DEPOIMENTOS ===================== */}
      <section id="depoimentos" className="relative w-full bg-white py-16 md:py-24 px-4 overflow-hidden border-b border-red-100/60 content-auto">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 text-2xl mb-3 drop-shadow-xs">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-3 tracking-tight leading-tight">
            Resultados reais dos{' '}
            <span className="relative text-red-600 inline-block font-black">
              nossos Clientes!
              <span className="absolute -bottom-1 left-0 w-full h-1 md:h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-red-600" />
            </span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-xl mx-auto mb-8">
            Veja o que quem já está imprimindo e vendendo os modelos tem a dizer sobre os resultados:
          </p>

          <div className="relative max-w-md sm:max-w-lg mx-auto select-none">
            <div className="relative">
              <div className="rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.12)] border-2 bg-white border-slate-200 flex flex-col font-sans text-left">
                <div className="relative w-full overflow-hidden bg-white">
                  <div 
                    className="flex transition-transform duration-300 ease-out will-change-transform" 
                    style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                  >
                    {TESTIMONIALS.map((t) => (
                      <div key={t.id} className="w-full shrink-0 flex items-center justify-center bg-white">
                        <img 
                          alt={`Depoimento de ${t.name}`} 
                          className="w-full h-auto object-contain block bg-white" 
                          loading="eager" 
                          width="480" 
                          height="640" 
                          src={t.img} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prev Button */}
              <button 
                type="button" 
                onClick={prevTestimonial}
                className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-red-700 hover:bg-red-600 text-white border-2 border-white flex items-center justify-center shadow-xl transition-all transform hover:scale-110 active:scale-95 cursor-pointer z-20" 
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="w-5 h-5 stroke-[3]" />
              </button>

              {/* Next Button */}
              <button 
                type="button" 
                onClick={nextTestimonial}
                className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-red-700 hover:bg-red-600 text-white border-2 border-white flex items-center justify-center shadow-xl transition-all transform hover:scale-110 active:scale-95 cursor-pointer z-20" 
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="w-5 h-5 stroke-[3]" />
              </button>
            </div>

            {/* Pagination dots */}
            <div className="flex items-center justify-center gap-2.5 mt-7">
              {TESTIMONIALS.map((_, idx) => (
                <button 
                  key={idx}
                  type="button" 
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentTestimonial === idx 
                      ? 'w-8 h-2.5 bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.4)]' 
                      : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Ir para depoimento ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 3 BÔNUS EXCLUSIVOS ===================== */}
      <section id="bonus" className="relative w-full bg-white py-16 md:py-24 px-4 overflow-hidden border-b border-red-100/60 content-auto">
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 bg-red-700 text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase mb-5 shadow-md border border-red-500/40">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>🎁 3 BÔNUS EXCLUSIVOS</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-3 tracking-tight leading-tight">
            E NÃO PARA POR AÍ... TEM MAIS!
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-12">
            Além dos +200 arquivos STL Natalinos, você também vai receber...
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 w-full mb-8">
            {/* Bonus 1 */}
            <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 flex flex-col items-center text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(220,38,38,0.1)] hover:border-red-500/40 transition-all duration-300 group">
              <div className="bg-red-700 text-white font-cinzel font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-5 shadow-xs border border-red-400/40">
                BÔNUS 01
              </div>
              <div className="w-full max-w-[240px] aspect-square p-1 rounded-[22px] bg-gradient-to-br from-red-500 via-amber-300 to-rose-600 mb-5 shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="bg-white rounded-[19px] w-full h-full overflow-hidden">
                  <img 
                    alt="Calendário de Vendas para o Natal 3D" 
                    className="w-full h-full object-cover rounded-[19px]" 
                    loading="lazy" 
                    width="240" 
                    height="240" 
                    src={`${CDN_BASE}/chatgpt-image-9-de-set_-d_660206dd6.webp`} 
                  />
                </div>
              </div>
              <h3 className="font-cinzel text-lg md:text-xl font-bold text-[#0F172A] mb-3 leading-snug">
                Calendário de Vendas para o Natal 3D
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Saiba quando começar a imprimir, divulgar e intensificar suas ofertas para aproveitar melhor a procura de fim de ano.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                Um guia simples para você se organizar, antecipar a produção e não deixar as melhores oportunidades para a última hora.
              </p>
              <div className="mt-auto w-full pt-4 border-t border-slate-100 flex flex-col items-center">
                <span className="text-sm text-slate-400 line-through font-semibold mb-1">De R$ 47,00</span>
                <span className="font-black text-xs sm:text-sm text-red-700 bg-red-50 border border-red-300/70 px-4 py-1 rounded-full uppercase tracking-wider">
                  HOJE: GRÁTIS
                </span>
              </div>
            </div>

            {/* Bonus 2 */}
            <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 flex flex-col items-center text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(220,38,38,0.1)] hover:border-red-500/40 transition-all duration-300 group">
              <div className="bg-red-700 text-white font-cinzel font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-5 shadow-xs border border-red-400/40">
                BÔNUS 02
              </div>
              <div className="w-full max-w-[240px] aspect-square p-1 rounded-[22px] bg-gradient-to-br from-red-500 via-amber-300 to-rose-600 mb-5 shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="bg-white rounded-[19px] w-full h-full overflow-hidden">
                  <img 
                    alt="Kit de Anúncios Prontos para Vender no Natal" 
                    className="w-full h-full object-cover rounded-[19px]" 
                    loading="lazy" 
                    width="240" 
                    height="240" 
                    src={`${CDN_BASE}/chatgpt-image-9-de-set_-d_142a38643.webp`} 
                  />
                </div>
              </div>
              <h3 className="font-cinzel text-lg md:text-xl font-bold text-[#0F172A] mb-3 leading-snug">
                Kit de Anúncios Prontos para Vender no Natal
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Receba modelos de headlines, textos e descrições de venda para divulgar suas peças natalinas no Instagram, Facebook, WhatsApp, Marketplace e outros canais.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                Economize tempo na divulgação e tenha ideias prontas para apresentar seus produtos com mais apelo durante a temporada.
              </p>
              <div className="mt-auto w-full pt-4 border-t border-slate-100 flex flex-col items-center">
                <span className="text-sm text-slate-400 line-through font-semibold mb-1">De R$ 67,00</span>
                <span className="font-black text-xs sm:text-sm text-red-700 bg-red-50 border border-red-300/70 px-4 py-1 rounded-full uppercase tracking-wider">
                  HOJE: GRÁTIS
                </span>
              </div>
            </div>

            {/* Bonus 3 */}
            <div className="bg-white border border-slate-200/90 rounded-[28px] p-6 flex flex-col items-center text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)] hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(220,38,38,0.1)] hover:border-red-500/40 transition-all duration-300 group">
              <div className="bg-red-700 text-white font-cinzel font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-5 shadow-xs border border-red-400/40">
                BÔNUS 03
              </div>
              <div className="w-full max-w-[240px] aspect-square p-1 rounded-[22px] bg-gradient-to-br from-red-500 via-amber-300 to-rose-600 mb-5 shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="bg-white rounded-[19px] w-full h-full overflow-hidden">
                  <img 
                    alt="Guia de Kits e Combos Natalinos Lucrativos" 
                    className="w-full h-full object-cover rounded-[19px]" 
                    loading="lazy" 
                    width="240" 
                    height="240" 
                    src={`${CDN_BASE}/chatgpt-image-9-de-set_-d_366279a96.webp`} 
                  />
                </div>
              </div>
              <h3 className="font-cinzel text-lg md:text-xl font-bold text-[#0F172A] mb-3 leading-snug">
                Guia de Kits e Combos Natalinos Lucrativos
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Descubra formas simples de combinar diferentes peças do pack para criar kits de presentes, decoração e lembranças com maior valor percebido.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                Use os mesmos arquivos para montar ofertas mais completas, aumentar seu ticket e criar novas oportunidades de faturamento no Natal.
              </p>
              <div className="mt-auto w-full pt-4 border-t border-slate-100 flex flex-col items-center">
                <span className="text-sm text-slate-400 line-through font-semibold mb-1">De R$ 57,00</span>
                <span className="font-black text-xs sm:text-sm text-red-700 bg-red-50 border border-red-300/70 px-4 py-1 rounded-full uppercase tracking-wider">
                  HOJE: GRÁTIS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== GALERIA ACESSO ===================== */}
      <section id="galeria-acesso" className="relative w-full py-14 md:py-20 overflow-hidden bg-[#45080e] border-t border-red-900/40 content-auto">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/25 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 left-1/4 w-[400px] h-[250px] bg-amber-500/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 mb-8 md:mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-700/90 border border-white/40 text-white px-5 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase mb-3 shadow-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>✨ MODELOS PRONTOS PARA VOCÊ IMPRIMIR</span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
            Mais Peças Exclusivas Que Você Vai Imprimir
          </h2>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto">
            Veja abaixo outros modelos de alto valor percebido incluídos no seu acesso.
          </p>
        </div>

        {/* Gallery Marquee Row 1 */}
        <div className="relative w-full overflow-hidden marquee-container flex flex-col gap-4 md:gap-5 select-none">
          <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#45080e] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#45080e] to-transparent z-20 pointer-events-none" />

          <div className="flex w-max marquee-to-right select-none">
            {[...ACCESS_GALLERY_ROW_1, ...ACCESS_GALLERY_ROW_1].map((src, i) => (
              <div key={i} className="px-2 sm:px-2.5 shrink-0">
                <div className="w-[180px] sm:w-[210px] md:w-[240px] aspect-square rounded-[18px] sm:rounded-[20px] overflow-hidden relative group shadow-[0_8px_20px_rgba(0,0,0,0.6)] border border-red-400/50">
                  <img 
                    alt={`Modelo Natalino 3D ${i + 1}`} 
                    width="240" 
                    height="240" 
                    className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-300" 
                    loading="lazy" 
                    src={src} 
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/80 border border-amber-400/60 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full backdrop-blur-sm shadow-md">
                    ✨ STL
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex w-max marquee-to-left select-none">
            {[...ACCESS_GALLERY_ROW_1.slice().reverse(), ...ACCESS_GALLERY_ROW_1.slice().reverse()].map((src, i) => (
              <div key={i} className="px-2 sm:px-2.5 shrink-0">
                <div className="w-[180px] sm:w-[210px] md:w-[240px] aspect-square rounded-[18px] sm:rounded-[20px] overflow-hidden relative group shadow-[0_8px_20px_rgba(0,0,0,0.6)] border border-red-400/50">
                  <img 
                    alt={`Modelo Natalino 3D ${i + 1}`} 
                    width="240" 
                    height="240" 
                    className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-300" 
                    loading="lazy" 
                    src={src} 
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/80 border border-amber-400/60 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full backdrop-blur-sm shadow-md">
                    ✨ STL
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== ESCOLHA SEU ACESSO (PRICING) ===================== */}
      <section 
        id="sim" 
        className="relative w-full py-16 md:py-28 px-4 overflow-hidden content-auto" 
        style={{
          background: 'radial-gradient(at 50% 18%, rgba(254, 202, 202, 0.15) 0%, rgba(220, 38, 38, 0.45) 25%, rgba(153, 27, 27, 0.96) 60%, rgb(95, 11, 19) 100%), linear-gradient(rgb(136, 19, 31) 0%, rgb(88, 10, 17) 100%)'
        }}
      >
        <div 
          className="absolute inset-0 pointer-events-none opacity-50" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.25) 1.2px, transparent 0px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-white text-center mb-2 tracking-tight uppercase">
            ESCOLHA SEU ACESSO
          </h2>
          <p className="text-sm sm:text-base text-slate-100 text-center mb-10 md:mb-14 max-w-xl font-normal">
            Inicie sua produção e vendas de modelos 3D natalinos agora mesmo.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-4xl items-stretch">
            {/* Basic Plan */}
            <div className="lg:col-span-5 bg-black/45 border border-white/20 rounded-[22px] p-6 sm:p-8 flex flex-col justify-between text-left shadow-xl backdrop-blur-md relative transition-all duration-300 hover:border-white/30">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-slate-300 font-extrabold mb-3">
                  PLANO BÁSICO
                </h3>
                <div className="mb-8">
                  <span className="font-cinzel text-3xl sm:text-4xl font-black text-white tracking-tight">
                    R$ 10,90
                  </span>
                  <span className="block text-[11px] text-slate-300 uppercase tracking-wider font-semibold mt-1">
                    PAGAMENTO ÚNICO
                  </span>
                </div>

                <ul className="flex flex-col gap-4 text-xs sm:text-sm text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 font-bold shrink-0">✓</span>
                    <span>Pack com +200 arquivos STL</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-slate-400">
                    <span className="text-slate-500 font-bold shrink-0">✕</span>
                    <span>Sem os Bônus inclusos</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 font-bold shrink-0">✓</span>
                    <span>6 meses de acesso</span>
                  </li>
                </ul>
              </div>

              <div className="pt-10">
                <a 
                  href={getCheckoutUrl(CHECKOUT_LINKS.basic)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackPixelCheckout('Plano Básico', 10.90)}
                  className="block w-full py-3.5 px-4 rounded-xl border border-white/40 hover:border-white bg-transparent hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 text-center cursor-pointer active:scale-98"
                >
                  COMEÇAR PELO BÁSICO
                </a>
              </div>
            </div>

            {/* Complete Viral Pack (Featured) */}
            <div className="lg:col-span-7 relative p-1 rounded-[26px] bg-gradient-to-br from-amber-300 via-rose-500 to-red-600 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_45px_rgba(220,38,38,0.45)]">
              {/* Badge top */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 text-white font-black text-[11px] sm:text-xs px-5 py-1.5 rounded-full uppercase tracking-wider shadow-lg whitespace-nowrap z-20 flex items-center gap-1.5 border border-white/90">
                <span>🏆</span>
                <span>MAIS ESCOLHIDO</span>
              </div>

              <div className="bg-white rounded-[22px] p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-950 tracking-wide uppercase mt-1 mb-2">
                  PACK VIRAL NATALINO™ COMPLETO
                </h3>

                <div className="w-full max-w-[340px] sm:max-w-[400px] my-2 mx-auto flex items-center justify-center">
                  <img 
                    alt="Pack 3D Natalino Completo" 
                    className="w-full h-auto max-h-[260px] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)] block" 
                    loading="lazy" 
                    width="500" 
                    height="350" 
                    src={`${CDN_BASE}/VpoLfuU.webp`} 
                  />
                </div>

                <div className="flex flex-col items-center mt-2 mb-6 w-full">
                  <span className="text-xs sm:text-sm text-slate-400 line-through font-bold">DE R$ 67,00</span>
                  <span className="text-[11px] sm:text-xs font-black text-red-600 uppercase tracking-wider mt-0.5">PAGAMENTO ÚNICO</span>
                  <div className="font-cinzel text-5xl sm:text-6xl font-black text-slate-950 my-1 tracking-tight">
                    R$ 29,90
                  </div>
                  <span className="text-[11px] sm:text-xs font-black text-red-600 uppercase tracking-wider">OU EM ATÉ 4X NO CARTÃO</span>
                </div>

                <div className="w-full text-left flex flex-col gap-2.5 mb-7 text-xs sm:text-sm border-t border-slate-100 pt-5">
                  {[
                    "+200 modelos 3D de Natal organizados e testados",
                    "Bônus 1: Calendário de Vendas para o Natal 3D",
                    "Bônus 2: Kit de Anúncios Prontos para Vender no Natal",
                    "Bônus 3: Guia de Kits e Combos Natalinos Lucrativos",
                    "Comunidade Exclusiva no WhatsApp",
                    "Download e envio imediato",
                    "Acesso vitalício ao material",
                    "Garantia incondicional de 15 dias"
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-900 font-semibold">
                      <span className="text-red-600 font-black text-base leading-none">✓</span>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <button 
                  type="button"
                  onClick={() => setShowCatholicModal(true)}
                  className="animate-pulse-neon w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#00E676] via-[#00FF66] to-[#05DF72] hover:from-[#00FF66] hover:to-[#00E676] text-slate-950 font-black text-sm sm:text-base md:text-lg uppercase tracking-wider shadow-[0_0_30px_rgba(0,255,102,0.65),0_10px_25px_rgba(0,0,0,0.4)] border-2 border-white transition-all transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-98 text-center cursor-pointer block"
                >
                  QUERO O PLANO COMPLETO
                </button>

                <p className="text-[11px] text-slate-500 font-medium mt-3 flex items-center gap-1.5">
                  <span>🔒</span>
                  <span>Compra 100% Segura • Acesso Vitalício Imediato</span>
                </p>
              </div>
            </div>
          </div>

          {/* Urgency warning banner */}
          <div className="mt-10 w-full max-w-xl bg-black/40 border border-amber-400/30 rounded-2xl p-4 text-center">
            <p className="text-white text-xs sm:text-sm font-semibold mb-1">
              Último dia com desconto do Material Completo
            </p>
            <p className="text-xs sm:text-sm text-slate-200">
              A partir de{' '}
              <span className="animate-pisca font-extrabold text-amber-300 tracking-wide">
                AMANHÃ ({tomorrowFormatted})
              </span>
              , o preço será ajustado.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== GARANTIA ===================== */}
      <section id="garantia" className="relative w-full bg-white py-16 md:py-24 px-4 overflow-hidden border-b border-red-100/60 content-auto">
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="w-36 sm:w-44 md:w-52 aspect-square mb-6 drop-shadow-xl hover:scale-105 transition-transform duration-300">
            <img 
              alt="Selo de Garantia Incondicional" 
              className="w-full h-full object-contain" 
              loading="lazy" 
              width="208" 
              height="208" 
              src={`${CDN_BASE}/HKbI3yl.webp`} 
            />
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 tracking-tight">
            Sua compra é 100% segura e sem risco
          </h2>

          <div className="flex flex-col gap-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            <p>
              Você tem <strong className="font-bold text-red-700">7 dias de garantia incondicional</strong> para avaliar todo o material.
            </p>
            <p>
              Acesse os <strong className="font-bold text-[#0F172A]">+200 arquivos STL Natalinos</strong> hoje. Se por qualquer motivo você achar que os modelos não são perfeitos para o seu negócio, basta solicitar o reembolso e <strong className="font-bold text-red-700">devolvemos 100% do seu dinheiro.</strong>
            </p>
            <p>
              Sem letras miúdas e sem burocracia. <strong className="font-bold text-[#0F172A]">O risco é todo nosso.</strong>
            </p>
            <p className="font-bold text-red-700 text-lg">
              Ou você fatura, ou não paga nada. 👇
            </p>
          </div>

          <a 
            href="#sim" 
            className="animate-pulse-neon inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#00E676] via-[#00FF66] to-[#05DF72] hover:from-[#00FF66] hover:to-[#00E676] text-slate-950 font-black text-xs sm:text-sm md:text-base py-3.5 px-6 sm:px-8 rounded-full uppercase tracking-wider shadow-[0_0_25px_rgba(0,255,102,0.65),0_10px_25px_rgba(0,0,0,0.5)] border-2 border-white transition-all transform hover:-translate-y-1 hover:scale-[1.03] active:scale-98 max-w-md w-full mb-8 text-center cursor-pointer"
          >
            <span>QUERO GARANTIR MEU ACESSO SEGURO</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3] shrink-0" />
          </a>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 font-medium border-t border-slate-200 pt-6 w-full">
            <div className="flex items-center gap-2">
              <span className="text-red-700">🛡️</span>
              <span>Satisfação Garantida</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-700">🔒</span>
              <span>Checkout 100% Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-700">♾️</span>
              <span>Acesso Vitalício</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-4">
            Acesso enviado imediatamente por e-mail após a compra
          </p>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section id="faq" className="relative w-full bg-white py-16 md:py-24 px-4 overflow-hidden border-b border-red-100/60 content-auto">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] text-center mb-12 tracking-tight">
            Perguntas{' '}
            <span className="relative text-red-600 inline-block">
              Frequentes:
              <span className="absolute -bottom-1 left-0 w-full h-1 md:h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-red-600" />
            </span>
          </h2>

          <div className="flex flex-col gap-4">
            {FAQS.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className={`border rounded-[22px] overflow-hidden transition-all duration-200 ${
                    isOpen 
                      ? 'border-red-400/50 bg-red-50/30 shadow-[0_4px_20px_rgba(220,38,38,0.06)]' 
                      : 'border-slate-200/90 bg-white hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <button 
                    type="button" 
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full text-left py-5 px-6 flex items-center justify-between gap-4 font-cinzel font-bold text-base sm:text-lg text-[#0F172A] transition-colors cursor-pointer" 
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen 
                          ? 'rotate-180 bg-red-700 text-white shadow-xs' 
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-200/60 font-normal animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="relative w-full bg-[#3b060a] text-white py-16 md:py-24 px-4 text-center border-t border-red-500/30 overflow-hidden content-auto">
        <div 
          className="absolute inset-0 pointer-events-none opacity-40" 
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.2) 1.2px, transparent 0px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <div className="mb-12 w-full flex flex-col items-center">
            <a 
              href="#sim" 
              className="animate-pulse-neon inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#00E676] via-[#00FF66] to-[#05DF72] hover:from-[#00FF66] hover:to-[#00E676] text-slate-950 font-black text-base sm:text-lg md:text-xl py-4.5 px-8 sm:px-12 rounded-full uppercase tracking-wider shadow-[0_0_35px_rgba(0,255,102,0.7),0_12px_35px_rgba(0,0,0,0.5)] border-2 border-white transition-all transform hover:-translate-y-1 hover:scale-[1.03] active:scale-98 max-w-lg w-full text-center cursor-pointer"
            >
              <span>QUERO GARANTIR O MATERIAL AGORA!</span>
              <ArrowRight className="w-5 h-5 stroke-[3] shrink-0" />
            </a>
          </div>

          <div className="bg-red-950/50 border border-red-500/30 rounded-2xl p-6 max-w-3xl mb-8 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <p className="mb-2">
              Os arquivos <strong className="text-white">Pack Viral STL Natalino</strong> são protegidos pela Lei de Direitos Autorais (Lei nº 9.610/98). O compartilhamento, rateio, revenda ou distribuição não autorizada dos arquivos digitais STL é expressamente proibido e passível de sanções civis e criminais.
            </p>
            <p className="text-amber-300 font-bold">
              Pirataria é crime. Valorize o trabalho de criação e modelagem 3D.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-xs text-slate-400">
            <p>© 2026 Pack Viral STL Natalino – stlviral.site. Todos os direitos reservados.</p>
            <p>Este site não é afiliado ao Facebook, Instagram ou Meta Platforms, Inc.</p>
          </div>
        </div>
      </footer>

      {/* ===================== FLOATING STICKY CTA ===================== */}
      {showFloatingBar && (
        <div className="fixed bottom-3 left-4 right-4 z-40 max-w-md mx-auto animate-fadeIn">
          <a
            href="#sim"
            className="w-full flex items-center justify-between gap-3 bg-gradient-to-r from-[#00E676] via-[#00FF66] to-[#05DF72] text-slate-950 font-black text-xs sm:text-sm py-3 px-5 rounded-full shadow-[0_10px_30px_rgba(0,255,102,0.6)] border-2 border-white uppercase tracking-wider transform hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span className="flex items-center gap-1.5 font-bold">
              <span>🎁</span>
              <span>Garantir Pack (+200 STL)</span>
            </span>
            <span className="bg-slate-950 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase">
              R$ 29,90
            </span>
          </a>
        </div>
      )}

      {/* ===================== EXIT INTENT DISCOUNT MODAL ===================== */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 md:p-8 text-center shadow-2xl border-4 border-amber-400">
            <button
              type="button"
              onClick={() => setShowExitModal(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full p-1.5 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-3xl mb-2 block">🎅 Espera! Oferta Relâmpago</span>
            <h3 className="font-cinzel text-xl md:text-2xl font-black text-[#0F172A] mb-2 leading-tight">
              Não saia sem garantir o seu pack!
            </h3>
            
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
              Liberamos uma oportunidade exclusiva para você não perder as vendas do Natal:
            </p>

            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 mb-5">
              <span className="text-xs uppercase font-extrabold text-amber-800 tracking-wider block mb-1">
                Desconto Especial de Saída
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-slate-400 line-through text-sm">De R$ 67,00</span>
                <span className="font-cinzel text-3xl font-black text-red-600">Por R$ 18,90</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Acesso aos arquivos + 3 Bônus inclusos</p>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={getCheckoutUrl(CHECKOUT_LINKS.basicDiscountPopup)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackPixelCheckout('Plano Completo Desconto Popup', 18.90);
                  setShowExitModal(false);
                }}
                className="animate-pulse-neon w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00E676] via-[#00FF66] to-[#05DF72] text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg border border-white text-center cursor-pointer block"
              >
                QUERO APROVEITAR O DESCONTO AGORA
              </a>
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="text-xs text-slate-400 hover:text-slate-600 py-1 transition-colors cursor-pointer"
              >
                Não, prefiro perder essa oportunidade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== CATHOLIC PACK UPSELL MODAL (R$ 36,90) ===================== */}
      {showCatholicModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto animate-fadeIn"
          onClick={() => setShowCatholicModal(false)}
        >
          <div 
            className="relative w-full max-w-sm sm:max-w-md my-auto p-0.5 sm:p-1 rounded-[22px] bg-gradient-to-br from-amber-300 via-rose-500 to-red-600 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(220,38,38,0.4)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#4c090f] rounded-[20px] p-3 sm:p-4 md:p-5 flex flex-col items-center text-center relative max-h-[95vh] overflow-y-auto">
              <button 
                type="button" 
                onClick={() => setShowCatholicModal(false)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors text-sm font-bold cursor-pointer z-30" 
                aria-label="Fechar janela"
              >
                ✕
              </button>

              <div className="inline-flex items-center gap-1 bg-red-600 text-white text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1 shadow animate-pulse border border-red-400/40">
                <span>⏳</span>
                <span>OFERTA ÚNICA: {formatTimer(catholicTimer)}</span>
              </div>

              <h2 className="font-cinzel text-base sm:text-xl font-black text-white leading-tight mb-0.5">
                Leve Também o <span className="text-amber-400">Pack +500 STLs Católicos</span>!
              </h2>

              <p className="text-[11px] sm:text-xs text-amber-200 leading-tight mb-2 font-medium px-1">
                Pague <strong className="text-amber-300 font-extrabold underline">só a diferença de +R$ 7</strong> sobre o Completo e leve os 2 packs por <strong className="text-white font-black">R$ 36,90</strong>!
              </p>

              {/* Slider of Catholic STLs */}
              <div 
                className="w-full max-w-[280px] sm:max-w-[320px] mx-auto my-1 select-none relative"
                onMouseEnter={() => setIsHoveredCatholic(true)}
                onMouseLeave={() => setIsHoveredCatholic(false)}
              >
                <div className="relative h-28 sm:h-36 w-full rounded-xl overflow-hidden shadow-lg bg-black/60 border border-amber-400/40">
                  <div 
                    className="flex w-full h-full transition-transform duration-300 ease-out will-change-transform"
                    style={{ transform: `translateX(-${catholicSlide * 100}%)` }}
                  >
                    {CATHOLIC_SLIDER_IMAGES.map((imgSrc, p) => (
                      <div key={p} className="w-full h-full shrink-0 flex items-center justify-center p-1">
                        <img 
                          src={imgSrc} 
                          alt={`Modelo STL Católico ${p + 1}`} 
                          className="w-full h-full object-contain"
                          loading="eager"
                          width={320}
                          height={144}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="absolute top-1.5 left-1.5 bg-[#4c090f]/90 border border-amber-400/60 text-amber-300 text-[9px] font-extrabold px-2 py-0.5 rounded-full backdrop-blur-xs">
                    ✨ +500 STLs
                  </div>

                  <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white/20">
                    {catholicSlide + 1}/{CATHOLIC_SLIDER_IMAGES.length}
                  </span>

                  <button 
                    type="button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCatholicSlide((prev) => (prev - 1 + CATHOLIC_SLIDER_IMAGES.length) % CATHOLIC_SLIDER_IMAGES.length);
                    }}
                    className="absolute left-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center text-xs font-bold border border-white/20 transition-all cursor-pointer"
                    aria-label="Anterior"
                  >
                    ◀
                  </button>

                  <button 
                    type="button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setCatholicSlide((prev) => (prev + 1) % CATHOLIC_SLIDER_IMAGES.length);
                    }}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/75 hover:bg-black text-white flex items-center justify-center text-xs font-bold border border-white/20 transition-all cursor-pointer"
                    aria-label="Próximo"
                  >
                    ▶
                  </button>
                </div>

                <div className="flex items-center justify-center gap-1 mt-1">
                  {CATHOLIC_SLIDER_IMAGES.map((_, p) => (
                    <button 
                      key={p} 
                      type="button" 
                      onClick={() => setCatholicSlide(p)}
                      className={`transition-all rounded-full cursor-pointer ${
                        p === catholicSlide ? "w-3.5 h-1 bg-[#25D366]" : "w-1 h-1 bg-white/30 hover:bg-white/60"
                      }`}
                      aria-label={`Slide ${p + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="w-full bg-white/5 border border-white/10 rounded-lg py-1 px-2 text-center my-1 text-[10px] sm:text-[11px] text-white/95">
                <span>✓ <strong>Plano Completo Natalino</strong> + ✓ <strong>500 STLs Católicos</strong> • Vitalício</span>
              </div>

              <div className="flex items-center justify-center gap-2 my-1.5">
                <span className="text-white/50 line-through text-[11px] font-semibold">De R$ 127</span>
                <span className="text-[10px] uppercase tracking-wider text-[#F7D070] font-bold">POR APENAS:</span>
                <span className="font-cinzel text-2xl sm:text-3xl font-black text-[#25D366] leading-none">R$ 36,90</span>
              </div>

              <div className="w-full flex flex-col gap-1.5 mt-1">
                <a 
                  href={getCheckoutUrl(CHECKOUT_LINKS.completeCatholicBundle)}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackPixelCheckout('Combo Completo Natalino + 500 Católicos', 36.90);
                    setShowCatholicModal(false);
                  }}
                  className="animate-pulse-neon w-full py-2.5 sm:py-3 px-3 rounded-xl bg-gradient-to-r from-[#00E676] via-[#00FF66] to-[#05DF72] hover:from-[#00FF66] hover:to-[#00E676] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wide shadow-lg border border-white transition-all transform hover:scale-[1.02] active:scale-98 cursor-pointer flex flex-col items-center justify-center leading-tight gap-0.5"
                >
                  <div className="flex items-center gap-1">
                    <span>✅</span>
                    <span>SIM! QUERO OS 2 PACKS POR R$ 36,90</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-slate-900 font-bold normal-case">
                    Pague só a diferença de R$ 7 no checkout
                  </span>
                </a>

                <a 
                  href={getCheckoutUrl(CHECKOUT_LINKS.complete)}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackPixelCheckout('Pack Viral Natalino Completo', 29.90);
                    setShowCatholicModal(false);
                  }}
                  className="w-full py-1.5 sm:py-2 px-3 rounded-xl bg-gradient-to-r from-[#B91C1C] via-[#DC2626] to-[#991B1B] hover:from-[#DC2626] hover:to-[#7F1D1D] text-white/90 hover:text-white font-bold text-[10px] sm:text-[11px] uppercase tracking-wide border border-white/25 transition-all transform hover:scale-[1.01] active:scale-98 cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>❌</span>
                  <span>NÃO, QUERO APENAS O COMPLETO (R$ 29,90)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
