"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./home.module.css";
import motion from "./motion.module.css";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const registrationUrl = "https://forms.gle/Fkzcgpt6GuJzU9kn9";
const lineUrl = "https://lin.ee/PPUiMQU";
const programUrl = "https://www.tgst.edu.tw/p/412-1001-1255.php?Lang=zh-tw";
const mapUrl = "https://maps.app.goo.gl/HdzgDZ2yx5a7KpdX9";

const dayOne = [
  ["08:30–09:00", "報到", "1F 聯合辦公室"], ["09:00–09:50", "營會介紹、詩歌、相見歡", "禮拜堂"],
  ["10:00–10:50", "神學與音樂｜梁越美老師", "禮拜堂"], ["11:00–11:50", "聲樂體驗課｜周筱倩老師", "禮拜堂"],
  ["12:00–12:30", "音樂事工分享｜高曉菁、劉琬齡學姊", "禮拜堂"], ["12:30–13:30", "午餐", "咖啡屋"],
  ["13:30–14:20", "手鐘體驗課｜鄭麗純老師", "305 教室"], ["14:30–15:20", "管風琴體驗課｜尚傑生老師", "禮拜堂"],
  ["15:30–17:20", "詩班排練、禮拜程序演練與排練技巧｜李建一老師", "禮拜堂"], ["17:30–18:00", "課程迴響、分享與 Q&A", "禮拜堂"],
  ["18:00–19:30", "晚餐與休息", "咖啡屋"], ["19:30–21:00", "音樂特會｜伍炯豪牧師", "禮拜堂"],
];

const dayTwo = [
  ["07:30–08:00", "住宿者早餐", "咖啡屋"], ["08:00–08:50", "神學導論體驗課｜梁越美老師", "207 教室"],
  ["09:00–09:50", "新約導論體驗課｜邱啓榮老師", "402 教室"], ["10:00–10:30", "音樂事工分享｜黃于倩、范敏熙學姊", "禮拜堂"],
  ["10:30–10:50", "彼此分享：音樂的教牧價值", "禮拜堂"], ["11:00–12:00", "全校大禮拜｜請著白上衣、黑下身正式服裝", "禮拜堂"],
  ["12:00–13:00", "午餐", "學校餐廳（面對校門口左側）"],
];

const faculty = [
  { name: "梁越美老師", role: "神學與音樂、神學導論", image: asset("photos/faculty-01.webp"), position: "center 24%", category: "師資" },
  { name: "周筱倩老師", role: "聲樂體驗", image: asset("photos/faculty-02.webp"), position: "center 22%", category: "師資" },
  { name: "鄭麗純老師", role: "手鐘體驗", image: asset("photos/faculty-03.webp"), position: "center 20%", category: "師資" },
  { name: "尚傑生老師", role: "管風琴體驗", image: asset("photos/faculty-04.webp"), position: "center 18%", category: "師資" },
  { name: "李建一老師", role: "詩班排練與禮拜程序", image: asset("photos/faculty-05.webp"), position: "center 20%", category: "師資" },
  { name: "邱啓榮老師", role: "新約導論", image: asset("photos/faculty-06.webp"), position: "center 20%", category: "師資" },
];

const people = [
  ...faculty,
  { name: "伍炯豪牧師", role: "音樂特會", image: asset("photos/speaker.webp"), position: "center 18%", category: "音樂特會講師" },
  { name: "高曉菁學姊", role: "音樂事工分享", image: asset("photos/guide-01.webp"), position: "center 24%", category: "學姊分享" },
  { name: "劉琬齡學姊", role: "音樂事工分享", image: asset("photos/guide-02.webp"), position: "31% center", category: "學姊分享" },
  { name: "黃于倩學姊", role: "音樂事工分享", image: asset("photos/guide-03.webp"), position: "center 24%", category: "學姊分享" },
  { name: "范敏熙學姊", role: "音樂事工分享", image: asset("photos/guide-04.webp"), position: "center 22%", category: "學姊分享" },
];

const faqs = [
  ["沒有音樂科系背景可以參加嗎？", "可以。不限定音樂科系背景；正在參與教會音樂服事，或對教會音樂事工與進修方向有負擔，都歡迎前來體驗。"],
  ["一定要有教會服事經驗嗎？", "不一定。活動也適合正在探索教會音樂、禮拜與未來服事方向的學生及社會青年。"],
  ["可以只參加其中一天嗎？", "活動以完整兩天體驗設計；若有特殊情況，請先透過 LINE 與主辦單位確認。"],
  ["是否提供住宿？", "可於報名時加選住宿，費用另加 NT$ 1,000，並包含 10 月 13 日早餐。若校內住宿空間不足，教會音樂組將安排學校附近的領頭山莊作為住宿地點。"],
  ["費用包含哪些項目？", "基本報名費為 NT$ 2,000，包含課程講義、活動保險、10 月 12 日午餐與晚餐，以及 10 月 13 日午餐。"],
  ["大禮拜需要穿著什麼服裝？", "請預備白色上衣、黑色下身的正式服裝。"],
  ["如何前往台灣神學院？", "活動地點位於台北市士林區仰德大道二段；可使用網站內的 Google 地圖連結查看位置，詳細交通資訊將於行前通知提供。"],
  ["報名完成後如何確認？", "送出表單後，主辦單位將依報名與繳費資料進行確認；如有疑問可透過 LINE 詢問。"],
  ["臨時無法參加，可以退費嗎？", "10 月 1 日前取消，可退還已繳費用的 80%，其餘 20% 作為行政手續費；10 月 1 日後取消，恕不退費。"],
  ["額滿後是否可以候補？", "名額以 40 名為原則；額滿後是否開放候補，將由主辦單位另行公告。"],
];

function ScheduleRows({ items }: { items: string[][] }) { return <div className={styles.scheduleRows}>{items.map(([time, title, place]) => <div className={styles.scheduleRow} key={`${time}-${title}`}><time>{time}</time><strong>{title}</strong><span>{place}</span></div>)}</div>; }
function PhotoFrame({ src, alt, portrait = false, position = "center", className = "" }: { src: string; alt: string; portrait?: boolean; position?: string; className?: string }) { return <div className={`${styles.photoFrame} ${portrait ? styles.portrait : ""} ${className}`}><img src={src} alt={alt} style={{ objectPosition: position }} loading="lazy" /></div>; }
function HandwrittenText({ text, startIndex = 0 }: { text: string; startIndex?: number }) { return <>{Array.from(text).map((char, index) => <span key={`${char}-${index}`} className={styles.handwrittenChar} aria-hidden="true" style={{ "--char-index": startIndex + index } as CSSProperties}>{char === " " ? "\u00A0" : char}</span>)}</>; }

function AnimatedDetails({ className = "", summary, children }: { className?: string; summary: (expanded: boolean) => ReactNode; children: ReactNode }) {
  const [mountedOpen, setMountedOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const toggle = () => {
    window.clearTimeout(timer.current);
    if (mountedOpen) {
      setExpanded(false);
      timer.current = window.setTimeout(() => setMountedOpen(false), 540);
      return;
    }
    setMountedOpen(true);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => setExpanded(true)));
  };
  return <details className={`${className} ${expanded ? motion.expanded : ""}`} open={mountedOpen}><summary onClick={(event) => { event.preventDefault(); toggle(); }} aria-expanded={expanded}>{summary(expanded)}</summary><div className={motion.disclosurePanel}><div>{children}</div></div></details>;
}

function PeopleCarousel() {
  const viewport = useRef<HTMLDivElement>(null);
  const frame = useRef<number | undefined>(undefined);
  const settleTimer = useRef<number | undefined>(undefined);
  const navigationIndex = useRef(people.length);
  const arrowTarget = useRef<number | null>(null);
  const [activeDisplay, setActiveDisplay] = useState(people.length);
  const carouselPeople = [...people, ...people, ...people];
  const centerCard = (displayIndex: number, behavior: ScrollBehavior = "smooth") => {
    const root = viewport.current;
    const card = root?.querySelectorAll<HTMLElement>("[data-person-card]")[displayIndex];
    if (!root || !card) return;
    root.scrollTo({ left: card.offsetLeft - (root.clientWidth - card.offsetWidth) / 2, behavior });
  };
  const syncActive = () => {
    window.cancelAnimationFrame(frame.current ?? 0);
    frame.current = window.requestAnimationFrame(() => {
      const root = viewport.current;
      if (!root) return;
      const center = root.scrollLeft + root.clientWidth / 2;
      let nextDisplay = 0;
      let distance = Number.POSITIVE_INFINITY;
      Array.from(root.querySelectorAll<HTMLElement>("[data-person-card]")).forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const delta = Math.abs(cardCenter - center);
        if (delta < distance) { distance = delta; nextDisplay = index; }
      });
      setActiveDisplay(nextDisplay);
      window.clearTimeout(settleTimer.current);
      settleTimer.current = window.setTimeout(() => {
        navigationIndex.current = nextDisplay;
        arrowTarget.current = null;
      }, 180);
    });
  };
  const go = (direction: -1 | 1) => {
    const currentDisplay = arrowTarget.current ?? navigationIndex.current;
    const nextDisplay = Math.max(0, Math.min(carouselPeople.length - 1, currentDisplay + direction));
    if (nextDisplay === currentDisplay) return;
    window.clearTimeout(settleTimer.current);
    arrowTarget.current = nextDisplay;
    navigationIndex.current = nextDisplay;
    setActiveDisplay(nextDisplay);
    centerCard(nextDisplay);
  };
  useLayoutEffect(() => { centerCard(people.length, "auto"); }, []);
  useEffect(() => () => { window.cancelAnimationFrame(frame.current ?? 0); window.clearTimeout(settleTimer.current); }, []);
  return <div className={motion.personCarousel} aria-label="師資、音樂特會講師與學姊分享者輪播">
    <div className={motion.carouselViewport} ref={viewport} onScroll={syncActive} tabIndex={0}>
      <div className={motion.carouselTrack}>{carouselPeople.map(({ name, role, image, position, category }, displayIndex) => <article className={`${motion.personCard} ${displayIndex === activeDisplay ? motion.active : ""}`} data-person-card="true" key={`${name}-${displayIndex}`} aria-current={displayIndex === activeDisplay ? "true" : undefined}><PhotoFrame src={image} alt={`${name}照片`} portrait position={position} className={motion.personPhoto} /><div className={motion.personInfo}><small>{category}</small><h3>{name}</h3><p>{role}</p></div></article>)}</div>
    </div>
    <button className={`${motion.carouselArrow} ${motion.carouselArrowLeft}`} type="button" onClick={() => go(-1)} disabled={activeDisplay === 0} aria-label="上一位">←</button>
    <button className={`${motion.carouselArrow} ${motion.carouselArrowRight}`} type="button" onClick={() => go(1)} disabled={activeDisplay === carouselPeople.length - 1} aria-label="下一位">→</button>
  </div>;
}

function BrandCopy({ footer = false }: { footer?: boolean }) { return <span className={footer ? motion.footerBrandCopy : motion.brandCopy}><strong>台灣神學院 教會音樂碩士班</strong><small>Taiwan Graduate School of Theology</small><small>M.A. in Church Music</small></span>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copyNotice, setCopyNotice] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    const trackRegistrationClick = (event: MouseEvent) => {
      const target = event.target;
      const link = target instanceof Element ? target.closest<HTMLAnchorElement>(`a[href="${registrationUrl}"]`) : null;
      if (!link) return;
      window.gtag?.("event", "registration_click", {
        link_text: link.textContent?.trim() ?? "",
        link_url: registrationUrl,
      });
    };
    document.addEventListener("click", trackRegistrationClick);
    return () => document.removeEventListener("click", trackRegistrationClick);
  }, []);

  useEffect(() => {
    let active = true;
    const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, 4500));
    const loadFonts = Promise.all([
      document.fonts.load('400 1em "Noto Sans TC"', "台灣神學院"), document.fonts.load('700 1em "Noto Sans TC"', "教會音樂碩士班"),
      document.fonts.load('700 1em "Noto Serif TC"', "回應呼召"), document.fonts.load('400 1em "ChenYuluoyan"', "也許這就是下一步"), document.fonts.load('400 1em "Iansui"', "沉浸式體驗"),
    ]).then(() => document.fonts.ready).then(() => undefined).catch(() => undefined);
    Promise.race([loadFonts, timeout]).then(() => { if (active) setFontsReady(true); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!fontsReady) return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reveal = (element: HTMLElement) => { element.classList.add(styles.isRevealed); element.classList.add(motion.revealed); };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { elements.forEach(reveal); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (!entry.isIntersecting) return; reveal(entry.target as HTMLElement); observer.unobserve(entry.target); }), { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [fontsReady]);

  const shareSite = async () => { const data = { title: "2026 教會音樂碩士班體驗營", text: "兩天走進真實課堂、禮拜與校園生活，分辨你的下一步。", url: window.location.href }; try { if (navigator.share) await navigator.share(data); else await navigator.clipboard.writeText(window.location.href); } catch { /* 使用者取消 */ } };
  const copyRegistrationLink = async () => { window.gtag?.("event", "registration_link_copy", { link_url: registrationUrl }); try { await navigator.clipboard.writeText(registrationUrl); } catch { const field = document.createElement("textarea"); field.value = registrationUrl; field.style.position = "fixed"; field.style.opacity = "0"; document.body.appendChild(field); field.select(); document.execCommand("copy"); field.remove(); } setCopyNotice(true); window.setTimeout(() => setCopyNotice(false), 1000); };

  if (!fontsReady) return <div className={motion.fontGate} role="status" aria-live="polite"><div className={motion.fontGateInner}><span className={motion.fontGateMark} aria-hidden="true" /><p>LOADING TYPOGRAPHY</p></div></div>;

  return <main className={`${styles.site} ${styles.finalSite} ${motion.ready}`}>
    <header className={styles.header}>
      <a className={styles.brand} href="#top" aria-label="回到頁首"><img className={styles.brandLogo} src={asset("church-music-logo.png")} alt="" /><BrandCopy /></a>
      <nav className={styles.desktopNav} aria-label="主要導覽"><a href="#experience">活動特色</a><a href="#schedule">完整日程</a><a href="#faculty">師資</a><a href="#pastors">給牧者</a><a href="#faq">常見問題</a></nav>
      <div className={styles.headerActions}><a className={styles.headerCta} href={registrationUrl} target="_blank" rel="noreferrer">立即報名</a><button className={styles.menuButton} type="button" aria-label={menuOpen ? "關閉導覽選單" : "開啟導覽選單"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button></div>
      {menuOpen && <nav className={styles.mobileNav} aria-label="手機導覽" onClick={() => setMenuOpen(false)}><a href="#experience">活動特色</a><a href="#schedule">完整日程</a><a href="#faculty">師資與分享者</a><a href="#pastors">給牧者</a><a href="#faq">常見問題</a><a href={registrationUrl} target="_blank" rel="noreferrer">立即報名 ↗</a></nav>}
    </header>

    <section className={styles.hero} id="top"><div className={styles.heroImage}><img src={asset("photos/hero-choir.webp")} alt="台灣神學院禮拜堂中的詩班與指揮" /><span className={styles.heroShade} /></div><div className={`${styles.heroCopy} ${styles.revealFromLeft}`} data-reveal="true"><p className={styles.kicker}>2026 · 教會音樂碩士班體驗營</p><h1>從服事負擔，<br />走向<span>裝備與方向</span></h1><p className={styles.heroLead}>「台神音碩體驗營」由台灣神學院教會音樂碩士班舉辦；兩天走進真實課堂、禮拜與校園生活，分辨你的下一步。</p><div className={styles.heroActions}><a className={styles.primaryButton} href={registrationUrl} target="_blank" rel="noreferrer">立即報名 <i>↗</i></a><a className={styles.ghostButton} href="#contact">加入 LINE 詢問 ↓</a></div></div><aside className={`${styles.immersiveBadge} ${styles.revealFromRight}`} data-reveal="true" aria-label="兩天沉浸式體驗，探索你的音樂呼召"><span>兩天</span><strong className={motion.immersiveLabel}>沉浸式體驗</strong><small>探索你的音樂呼召</small></aside><div className={styles.heroMeta}><span><b>DATE <em>營會日期</em></b><strong>10.12–13</strong></span><span><b>PLACE <em>地點</em></b><strong>台灣神學院</strong></span><span><b>LIMIT <em>名額限制</em></b><strong>40 名</strong></span><span><b>DEADLINE <em>報名截止</em></b><strong>10.01</strong></span></div><p className={styles.artNote}>台灣神學院禮拜堂與詩班實景</p></section>

    <section className={styles.handwrittenStatement} data-reveal="true" aria-label="活動核心宣言"><p aria-label="不只是音樂，而是回應呼召的生命。"><span className={styles.handwritingLine}><HandwrittenText text="不只是音樂，" /></span><span className={styles.handwritingLine}><HandwrittenText text="而是回應呼召的生命。" startIndex={7} /></span></p><i aria-hidden="true" /></section>
    <section className={`${styles.section} ${styles.audience}`}><div className={styles.sectionHeading}><p className={styles.eyebrow}>IS THIS FOR YOU?</p><h2 className={styles.audienceTitle}>這個營會<br /><span>適合我嗎？</span></h2></div><div className={styles.audienceList}>{["已經投入教會音樂服事，卻逐漸遇到瓶頸", "想更深入理解音樂、神學與禮拜的關係", "對教會音樂有負擔，但不知道如何進一步裝備", "剛離開大學，正在探索未來與服事方向", "沒有音樂本科背景，擔心自己是否適合"].map((item, i) => <div key={item}><span>0{i + 1}</span><p>{item}</p></div>)}</div><p className={styles.audienceNote}>不限音樂科系背景。歡迎正在參與教會音樂服事，或對教會音樂事工與進修方向有負擔的你。</p></section>
    <section className={`${styles.section} ${styles.experience}`} id="experience"><div className={styles.sectionHeading}><p className={styles.eyebrow}>TWO DAYS · THREE DISCOVERIES</p><h2>兩天體驗，<br />帶你看見<span>未來的可能</span></h2></div><div className={styles.experienceGrid}><article><span>01</span><div><p>走進真實課堂</p><h3>親身感受學習現場</h3><small>感受課堂方式、師生互動與校園學習環境。</small></div></article><article><span>02</span><div><p>看見整合教育</p><h3>連結音樂、神學與禮拜</h3><small>理解音樂專業、神學思考、禮拜實踐與教會服事如何彼此連結。</small></div></article><article><span>03</span><div><p>分辨服事方向</p><h3>更具體思考你的下一步</h3><small>透過課程、禮拜、分享與交流，思考是否需要進一步裝備。</small></div></article></div></section>
    <section className={`${styles.section} ${styles.learning}`}><div className={`${styles.learningVisual} ${styles.revealFromLeft}`} data-reveal="true"><div className={styles.learningPhotoCollage}><img className={styles.learningMainPhoto} src={asset("photos/learning-classroom-graded-v2.webp")} alt="台灣神學院教室中的課堂實景" loading="lazy" /><img className={styles.learningInsetPhoto} src={asset("photos/learning-organ-graded-v2.webp")} alt="尚傑生老師於管風琴前示範" loading="lazy" /><span>真實課堂 × 專業實作</span></div><div className={styles.musicWords}><span>MUSIC</span><span>THEOLOGY</span><span>WORSHIP</span></div></div><div className={styles.revealFromRight} data-reveal="true"><p className={styles.eyebrow}>LEARNING EXPERIENCE</p><h2>不只是學音樂，<br />而是理解<span>如何服事</span></h2><div className={styles.learningList}><div><b>神學思考</b><span>神學與音樂、神學導論、新約導論</span></div><div><b>音樂專業</b><span>聲樂、手鐘、管風琴、詩班排練</span></div><div><b>禮拜實踐</b><span>禮拜程序演練、全校大禮拜</span></div><div><b>服事與分辨</b><span>事工分享、教牧價值、Q&A、音樂特會</span></div></div></div></section>

    <section className={`${styles.section} ${styles.videoStory}`} aria-labelledby="video-story-heading"><div className={styles.videoStoryCopy}><p className={styles.eyebrow}>2025 EXPERIENCE CAMP</p><h2 id="video-story-heading">先看看，一次真實的<br /><span>學習與服事相遇</span></h2><p>從敬拜、課堂到同工相聚，走進上一屆體驗營的真實現場。</p><p className={styles.videoStoryMeta}>2025 台神音樂體驗營紀錄</p></div><div className={styles.videoFrame}><iframe src="https://www.youtube-nocookie.com/embed/vmxjSTo0CaU?rel=0" title="2025 台神音樂體驗營紀錄片" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div></section>

    <section className={`${styles.section} ${styles.schedule}`} id="schedule"><div className={`${styles.sectionHeading} ${styles.scheduleHeading}`}><p className={styles.eyebrow}>SCHEDULE</p><h2>兩日完整日程</h2><p>先看當日重點，再展開完整時程。課程與場地可能依實際安排微調，最新資訊以主辦單位公告為準。</p></div><div className={styles.dayCards}><div className={motion.dropCard} data-reveal="true"><AnimatedDetails summary={(expanded) => <><span className={styles.dayNumber}>01</span><span><small>10 月 12 日（一）</small><b>音樂專業、詩班排練<br />與音樂特會</b></span><em><span>{expanded ? "收回完整時程" : "查看完整時程"}</span><i className={motion.toggleIcon} aria-hidden="true">＋</i></em></>}><ScheduleRows items={dayOne} /></AnimatedDetails></div><div className={motion.dropCard} data-reveal="true"><AnimatedDetails summary={(expanded) => <><span className={styles.dayNumber}>02</span><span><small>10 月 13 日（二）</small><b>神學課程、事工分享<br />與全校禮拜</b></span><em><span>{expanded ? "收回完整時程" : "查看完整時程"}</span><i className={motion.toggleIcon} aria-hidden="true">＋</i></em></>}><ScheduleRows items={dayTwo} /></AnimatedDetails></div></div></section>

    <section className={`${styles.section} ${styles.faculty}`} id="faculty"><div className={`${styles.sectionHeading} ${styles.facultyHeading}`}><p className={styles.eyebrow}>FACULTY &amp; GUIDES</p><h2>陪你走進真實的<br /><span>學習現場</span></h2><p className={styles.facultySubtitle}>從神學、聲樂、手鐘、管風琴到詩班排練，由各領域師資帶你實際走進教會音樂的學習現場。</p></div><PeopleCarousel /></section>
    <section className={`${styles.section} ${styles.program}`}><div className={styles.revealFromLeft} data-reveal="true"><p className={styles.eyebrow}>CHURCH MUSIC MASTER</p><h2>在音樂、神學與教會之間，<br />成為<span>連結的橋樑</span></h2><p>教會音樂的裝備不只關乎演奏與歌唱，也包含禮拜理解、神學思考、溝通協作與教會現場的實踐。</p><a className={styles.inlineLink} href={programUrl} target="_blank" rel="noreferrer">認識碩士班課程 ↗</a></div><div className={`${styles.programPhotoReveal} ${styles.revealFromRight}`} data-reveal="true"><PhotoFrame src={asset("photos/campus-chapel.webp")} alt="台灣神學院禮拜堂與校園景觀" /></div></section>
    <section className={`${styles.section} ${styles.pastor}`} id="pastors"><div className={styles.pastorLabel}><span>FOR</span>給牧者</div><div><p className={styles.eyebrow}>SUPPORT THE NEXT STEP</p><h2>推薦對教會音樂<br className={motion.mobileBreak} />有負擔的同工<br />給他兩天<br className={motion.mobileBreak} /><span>真實探索</span>的機會</h2><p>教會中的音樂服事者，往往同時站在音樂、禮拜、牧者與會眾之間。他們需要的不只是技巧，也需要神學理解、溝通能力與服事方向。</p></div><div className={styles.pastorActions}><h3>牧者可以這樣支持</h3><ul><li>推薦合適的音樂同工參加</li><li>提供兩天服事排班上的彈性</li><li>視教會情況支持報名、交通或住宿費</li><li>陪伴同工為進修與服事方向禱告</li></ul><div><button className={styles.primaryButton} type="button" onClick={copyRegistrationLink}>複製報名連結</button><button className={styles.ghostButton} type="button" onClick={shareSite}>分享網站</button></div></div></section>
    <section className={`${styles.section} ${styles.info}`} id="info"><div className={styles.sectionHeading}><p className={styles.eyebrow}>INFORMATION</p><h2>報名前，<br />你需要知道的事</h2></div><div className={`${styles.infoGrid} ${motion.compactInfoGrid}`}><article><span>01 / DATE　營會日期</span><b>2026.10.12–13</b><p>週一至週二，共兩天</p></article><article><span>02 / PLACE　營會地點</span><b>台灣神學院</b><p>台北市士林區仰德大道二段<br /><a href={mapUrl} target="_blank" rel="noreferrer">開啟 Google 地圖 ↗</a></p></article><article><span>03 / FEE　報名費</span><b>NT$ 2,000</b><p>含講義、活動保險及 10/12午&amp;晚餐、10/13午餐</p></article><article><span>04 / STAY　有住宿需求者</span><b>另加 NT$ 1,000</b><p>自由選擇，含 10/13 早餐；<br />校內空間不足時安排領頭山莊</p></article></div><div className={styles.policyNote}><b>退費辦法</b><p>10 月 1 日前取消，可退還已繳費用的 80%，其餘 20% 作為行政手續費；10 月 1 日後取消，恕不退費。</p></div><div className={styles.paymentPanel}><div><p className={styles.eyebrow}>PAYMENT</p><h3>繳費資訊</h3><p>填寫報名表後，請依下列資訊完成匯款，並保留轉帳紀錄供主辦單位確認。</p></div><dl><div><dt>銀行</dt><dd>玉山銀行（808）新生分行</dd></div><div><dt>帳號</dt><dd>1056-940-010036</dd></div><div><dt>戶名</dt><dd>財團法人台灣神學院</dd></div></dl></div><div className={styles.registrationSteps}><span><b>01</b><em>依表單說明完成繳費</em></span><span><b>02</b><em>填寫 Google 報名表</em></span><span><b>03</b><em>到信箱收報名成功 Email</em></span><span><b>04</b><em>對帳同工確認入帳後，會再寄一封繳費成功 Email</em></span><span><b>05</b><em>完成報名手續，營會見！</em></span><a href={registrationUrl} target="_blank" rel="noreferrer">前往報名表 ↗</a></div></section>

    <section className={`${styles.section} ${styles.faq}`} id="faq"><div className={styles.sectionHeading}><p className={styles.eyebrow}>FAQ</p><h2>常見問題</h2></div><div className={styles.faqList}>{faqs.map(([question, answer]) => <AnimatedDetails className={motion.faqDisclosure} key={question} summary={(expanded) => <>{question}<span className={motion.toggleIcon} aria-hidden="true">＋</span><span className={motion.srOnly}>{expanded ? "收合答案" : "展開答案"}</span></>}><p>{answer}</p></AnimatedDetails>)}</div></section>
    <section className={styles.scripture} aria-labelledby="scripture-reference"><div className={styles.scriptureInner}><span className={styles.scriptureMark} aria-hidden="true">“</span><blockquote className={styles.scriptureQuote}><span>你要專心仰賴耶和華</span><span>不可倚靠自己的聰明</span><span>在你一切所行的事上都要認定祂</span><strong className={styles.scripturePromise}>祂必指引你的路</strong></blockquote><p className={styles.scriptureReference} id="scripture-reference">箴言 3:5–6</p></div></section>
    <section className={styles.finalCta} id="contact" data-reveal="true"><div><p className={styles.eyebrow}>2026 CHURCH MUSIC EXPERIENCE CAMP</p><p className={`${styles.finalHandwriting} ${motion.finalSentence}`} aria-label="也許，這就是你回應呼召的下一步"><HandwrittenText text="也許，這就是你回應呼召的下一步" /></p><h2 className={styles.finalHeadline}>也許你不需要<br className={motion.mobileBreak} />現在就決定未來<br />但可以先走進來<span className={motion.desktopOnlySpace}>&nbsp;</span><br className={motion.mobileBreak} /><span>真實體驗</span></h2><p className={styles.finalMeta}>限額 40 名｜10 月 1 日截止報名</p><div className={styles.finalActions}><a className={styles.primaryButton} href={registrationUrl} target="_blank" rel="noreferrer">立即報名 ↗</a><a className={styles.ghostButton} href={lineUrl} target="_blank" rel="noreferrer">加入 LINE 詢問 ↗</a></div></div></section>
    <footer className={styles.footer}><div className={styles.footerBrand}><img className={styles.footerLogo} src={asset("church-music-logo.png")} alt="台灣神學院教會音樂碩士班 Logo" /><BrandCopy footer /></div><div><b>活動資訊</b><a href="#experience">活動特色</a><a href="#schedule">兩日行程</a><a href="#info">參加資訊</a></div><div><b>快速連結</b><a href={registrationUrl} target="_blank" rel="noreferrer">報名表單</a><a href={lineUrl} target="_blank" rel="noreferrer">LINE@</a><a href={programUrl} target="_blank" rel="noreferrer">碩士班介紹</a><a href={mapUrl} target="_blank" rel="noreferrer">Google 地圖</a><a href="https://www.facebook.com/profile.php?id=61577588704155" target="_blank" rel="noreferrer">Facebook</a></div><div className={styles.footerStatement}><span>MUSIC</span><i>→</i><span>LEADERSHIP</span><i>→</i><span>MINISTRY</span></div></footer>
    <aside className={styles.mobileRegisterBar} aria-label="手機版快速報名"><span><b>10.12–13</b><small>限額 40 名</small></span><a href={registrationUrl} target="_blank" rel="noreferrer">立即報名 ↗</a></aside>{copyNotice && <div className={styles.copyToast} role="status" aria-live="polite">已複製連結</div>}
  </main>;
}
