import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck, Flame, Activity, Layers, ArrowRight, Phone, Mail, MapPin,
  MessageCircle, Menu, X, ChevronRight, BookOpen, Building2, Clock3,
  ExternalLink, ClipboardCheck, Wrench, Headphones, FileCheck2, Siren,
  Gauge, Factory, BadgeCheck
} from 'lucide-react';
import ProtectionScene from './ProtectionScene.jsx';
import './styles.css';

const phone = '+919432223543';
const phone2 = '+919434362537';
const email = 'fsssindia@gmail.com';
const wa = 'https://wa.me/919432223543';
const address = '27, Nityananda Nagar, P.O. D.S. Lane, Howrah - 711109';
const googleMapsLocation = 'https://maps.app.goo.gl/RpTEa6ibPw1exdTeA';

const imagery = {
  hero: 'https://kordfire.com/wp-content/uploads/2026/04/fire-protection-systems-for-industrial-facilities_featured.webp',
  detection: 'https://honeywell.scene7.com/is/image/Honeywell65/hbt-Security-P1907343-primaryimage',
  detectionWide: 'https://americanalarm.net/wp-content/uploads/2026/01/understanding-the-critical-differences-commercial-fire-alarm-systems-vs.-residential-alarms-1030x562.jpg',
  sprinkler: 'https://www.fireline.com/wp-content/uploads/2025/03/fireline-designing-fire-protection-systems-industrial-facilities.jpg',
  passive: 'https://images.squarespace-cdn.com/content/v1/55c9748de4b04eba92967c83/1541303155409-IW18K7KK5Q6T44XRGH6X/Fig1-passive-fire-protection.jpg',
  facility: 'https://www.envistaforensics.com/media/15ibn4u4/fire-protection-engineer-analyzing-machinery.jpeg?anchor=center&mode=crop&width=1400&height=850&rnd=132713030943270000&format=webp&quality=82',
  inspection: 'https://www.fireline.com/wp-content/uploads/2025/03/fireline-designing-fire-protection-systems-industrial-facilities.jpg'
};

const quotePortrait = 'https://upload.wikimedia.org/wikipedia/commons/2/25/Franklin-Benjamin-LOC.jpg';

const clientMarks = {
  'Albert David Ltd.': 'https://res.cloudinary.com/devex/image/fetch/ar_1:1,b_transparent,c_pad,f_auto,q_auto,w_320/https://neo-assets.s3.amazonaws.com/assets/0129/4207/ALBERT-DAVID-011.png',
  'Siddha Real Estate': 'https://photos.prnewswire.com/prnfull/20161111/438197LOGO',
  'ETA Engineering Private Limited': 'https://media.licdn.com/dms/image/v2/D560BAQHnxNp437Wbow/company-logo_200_200/B56Zo5I3aWJYAI-/0/1761895217274/etaenggcom_logo?e=2147483647&v=beta&t=_r50S2fTf_f-ih3Oh5csS24Bh9J3oCoXEXTBEhmc8p4',
  'ANJ Turnkey Projects PVT. LTD': 'https://anj.co.in/logos/brand.png',
  'The Future Foundation School': 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100064023454221',
  'GKW Limited': 'https://media.licdn.com/dms/image/v2/C4E0BAQE4fSoqE33Ozw/company-logo_200_200/company-logo_200_200/0/1647712080980?e=2147483647&v=beta&t=--Lryv7_UxVqSC8mzkzpgDEBxUwaXeKpUQWVLZYaxyA',
  'Indian Space Research Organisation': 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_Space_Research_Organisation_Logo.svg',
  'AFCONS': 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/AFCONS_logo.svg/3840px-AFCONS_logo.svg.png',
  'IITD (JV)': 'https://upload.wikimedia.org/wikipedia/en/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg',
  'Dhanuka Dhanseri Foundation, Behala': 'https://give.do/static/img/logos/183O/38b28efc-fb02-4158-8ad1-ca3895b532f6.jpg',
  'Shree Sai Infrastructure Development': 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100083007356943',
  'Shantinath Detergents': 'https://shreemaamultichem.com/wp-content/uploads/2023/12/Shantinath-Detergents-Pvt-Ltd.jpg'
};

const clients = [
  'Albert David Ltd.', 'Siddha Real Estate', 'Dr. S.S. Chatterjee Heart Centre',
  'Indian Space Research Organisation', 'Indira Cinema, Kolkata', 'ETA Engineering Private Limited',
  'AFCONS', 'IITD (JV)', 'Dhanuka Dhanseri Foundation, Behala',
  'Shree Sai Infrastructure Development', 'Sunidhi Enclave Pvt Ltd.', 'ANJ Turnkey Projects PVT. LTD',
  'Jayanti Cinema, Rishra', 'The Future Foundation School', 'Mandeville Garden Court',
  'Grap Facility Management LLP', 'Altamira Projects LLP', 'Sneh Fabrice PVT. LTD.',
  'GKW Limited', 'Shantinath Detergents'
];

const services = [
  { icon: Flame, title: 'Detection Systems', text: 'Conventional, addressable, addressable analogue and intelligent addressable analogue systems, plus CO2 and FM-200 solutions.', image: imagery.detection },
  { icon: Activity, title: 'Protection Systems', text: 'Hydrant, automatic sprinkler, high and medium velocity water sprinkler and water-mist systems.', image: imagery.sprinkler },
  { icon: Layers, title: 'Passive Fire Protection', text: 'Mechanical smoke control, sealing materials, fire-check doors, AHU tripping and staircase pressurization.', image: imagery.passive }
];

const systems = [
  'Fire Detection and Alarm', 'Hydrant Systems', 'Automatic Sprinkler', 'Water Mist',
  'CO2 Flooding', 'FM-200 Flooding', 'Smoke Control', 'Fire Check Doors',
  'Sealing Materials', 'Staircase Pressurization'
];

const resources = [
  ['Detection 101', 'Understand conventional, addressable and intelligent detection systems.', imagery.detection],
  ['AMC Field Checklist', 'A practical starting point for maintenance conversations.', imagery.inspection],
  ['Protection Systems', 'Hydrant, sprinkler, water mist and clean-agent system basics.', imagery.sprinkler],
  ['Audit Readiness', 'Organize service history, reports and maintenance records.', imagery.facility]
];

function Logo() {
  return <Link to='/' className='brand' aria-label='Safety and Security Solutions home'>
    <span className='brand-mark'><span>S</span><span>S</span></span>
    <span className='brand-copy'><b>SAFETY &amp; SECURITY</b><small>SOLUTIONS</small></span>
  </Link>;
}

function Header() {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const links = [['Services', '/services'], ['Systems', '/systems'], ['Clients', '/clients'], ['Resources', '/resources'], ['About', '/about'], ['Contact', '/contact']];
  return <>
    <div className='topbar'><div><Clock3 size={14}/> Emergency / 24/7 Support</div><div><a href={'tel:' + phone}>{phone}</a><span className='top-sep'>|</span><a href={'mailto:' + email}>{email}</a></div></div>
    <header className='nav'><Logo/><button className='menu' aria-label='Toggle navigation' onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button><nav className={menu ? 'open' : ''}>{links.map(([label, href]) => <Link key={href} className={location.pathname === href ? 'active' : ''} to={href} onClick={() => setMenu(false)}>{label}</Link>)}<Link className='navcta' to='/quote' onClick={() => setMenu(false)}>Request a Quote <ArrowRight size={15}/></Link></nav></header>
  </>;
}

function getAssistantReply(text) {
  const q = text.toLowerCase().trim();
  if (!q) return 'Please type your question. I can help with services, systems, quotations, AMC support, contact details and the office location.';
  if (/hello|hi|hey|good morning|good afternoon|good evening/.test(q)) return 'Hello. I can help you understand Safety & Security Solutions, its fire-safety services, system types, support options and quotation process.';
  if (/quote|quotation|estimate|price|cost|consult/.test(q)) return 'For a quotation or consultation, use the Request a Quote page. You can describe your facility, required system, AMC need or project scope and send the enquiry directly to the company via WhatsApp or email.';
  if (/whatsapp|wa|phone|call|contact|number|emergency|24.?7/.test(q)) return `The 24/7 support numbers are ${phone} and ${phone2}. Email: ${email}. You can also use the WhatsApp button on this site.`;
  if (/email|mail/.test(q)) return `The company email is ${email}. Use the Email section on the Contact page to start an enquiry.`;
  if (/address|location|office|map|howrah|direction/.test(q)) return `The supplied office address is ${address}. The Contact page now links directly to the Google Maps location you provided.`;
  if (/detection|alarm|smoke|fire alarm/.test(q)) return 'Detection services include conventional, addressable, addressable analogue and intelligent addressable analogue systems, along with CO2 and FM-200 solutions.';
  if (/protection|sprinkler|hydrant|water mist|suppression/.test(q)) return 'Protection services include hydrant systems, automatic sprinklers, high- and medium-velocity water sprinkler systems and water-mist systems.';
  if (/passive|fire.?check|sealing|smoke control|staircase|ahu/.test(q)) return 'Passive fire protection covers mechanical smoke control, sealing materials, fire-check doors, AHU tripping and staircase pressurization.';
  if (/amc|maintenance|audit|inspection|service support/.test(q)) return 'AMC, maintenance, inspection and audit-related enquiries can be routed through the Request a Quote or Contact pages. The Resources and About sections also describe the planned maintenance-record and audit-report workflow.';
  if (/system|fm.?200|co2|clean agent/.test(q)) return 'The system catalogue covers Fire Detection & Alarm, Hydrant Systems, Automatic Sprinkler, Water Mist, CO2 Flooding, FM-200 Flooding, Smoke Control, Fire Check Doors, Sealing Materials and Staircase Pressurization.';
  if (/client|customer|portfolio/.test(q)) return 'The Clients page contains the client names supplied for the company profile. Logos are shown only where a relevant visual reference was available.';
  if (/about|company|incorporated|india/.test(q)) return 'The supplied company profile states that the business was incorporated in 2015 and provides fire, life and asset protection solutions with technical support and customized engineering across India.';
  return 'I can answer questions about the company, fire detection, protection systems, passive fire protection, AMC support, quotations, contacts, clients and the office location. Try asking: “What detection systems do you provide?”';
}

function FloatingTools() {
  const [chat, setChat] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hello. I can answer questions about our services, systems, quotation process, support contacts and company information.' }]);
  const send = () => {
    const value = input.trim();
    if (!value) return;
    setMessages(prev => [...prev, { role: 'user', text: value }, { role: 'assistant', text: getAssistantReply(value) }]);
    setInput('');
  };
  return <>
    <div className='floating'><a className='float wa' href={wa} target='_blank' rel='noreferrer' aria-label='WhatsApp'><MessageCircle/><span>WhatsApp</span></a><button className='float chat-btn' onClick={() => setChat(!chat)} aria-label='Open live chat'><MessageCircle/><span>Live chat</span></button></div>
    {chat && <div className='chat'><div className='chat-head'><div><b>SSS Assistant</b><small>Company information and enquiry help</small></div><button onClick={() => setChat(false)}><X size={17}/></button></div><div className='chat-body'><div className='chat-messages'>{messages.map((m, i) => <div key={i} className={`chat-message ${m.role === 'user' ? 'user' : ''}`}>{m.text}</div>)}</div><div className='quick'><button type='button' onClick={() => { setInput('What detection systems do you provide?'); }}>Detection</button><button type='button' onClick={() => { setInput('I need a quotation'); }}>Get a quote</button><button type='button' onClick={() => { setInput('What AMC support is available?'); }}>AMC support</button><button type='button' onClick={() => { setInput('What is the office address?'); }}>Office</button></div><div className='chat-compose'><input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') send(); }} placeholder='Ask about the company...' aria-label='Ask the company assistant'/><button type='button' onClick={send} aria-label='Send message'><ArrowRight size={17}/></button></div></div></div>}
  </>;
}

function Motion({ children, className='', delay=0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { node.classList.add('motion-visible'); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.style.setProperty('--motion-delay', `${delay}ms`); node.classList.add('motion-visible'); observer.disconnect(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={`motion-reveal ${className}`}>{children}</div>;
}

function Layout({ children }) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);
  return <div><Header/>{children}<QuoteBand/><Footer/><FloatingTools/></div>;
}

function MediaFrame({ src, alt, className='' }) {
  return <div className={`media-frame ${className}`}><img src={src} alt={alt} loading='lazy' decoding='async' onError={e => { e.currentTarget.style.display = 'none'; }}/></div>;
}

function ImageGallery({ items }) {
  return <div className='image-gallery'>{items.map((item, i) => <MediaFrame key={item.src + i} src={item.src} alt={item.alt} className={`gallery-image gallery-${i + 1}`}/>)}</div>;
}

function PageHero({ eyebrow, title, text, image=imagery.facility, imageAlt='Fire safety engineering at an industrial facility', variant='facility' }) {
  return <section className='page-hero'>
    <div className='page-hero-copy'><div className='eyebrow'><span/>{eyebrow}</div><h1>{title}</h1><p>{text}</p><div className='hero-rule'><span/><span/><span/></div></div>
    <div className='page-hero-art'><ProtectionScene className='page-3d' variant={variant}/><MediaFrame src={image} alt={imageAlt} className='page-hero-photo'/><div className='grid'/><div className='page-art-card'><BadgeCheck size={34}/><small>ENGINEERED PROTECTION</small><strong>Detect. Protect. Preserve.</strong></div></div>
  </section>;
}

function QuoteBand() {
  return <section className='quote-band'><div className='quote-text'><div className='eyebrow'>SAFETY PHILOSOPHY</div><blockquote>An ounce of prevention is worth a pound of cure.</blockquote><small>Benjamin Franklin, 1735 - fire-prevention maxim</small></div><div className='quote-portrait'><img src={quotePortrait} alt='Benjamin Franklin portrait'/><div className='portrait-fade'/></div></section>;
}

function Home() {
  return <main>
    <section className='hero'>
      <div className='hero-copy'><div className='eyebrow'><span/>FIRE SAFETY - SECURITY - ENGINEERING</div><h1>Protection engineered for what matters most.</h1><p>Integrated fire detection, protection and passive fire-safety solutions, backed by technical support and customized engineering for facilities across India.</p><div className='actions'><Link className='primary' to='/quote'>Talk to an Expert <ArrowRight size={17}/></Link><a className='secondary' href={'tel:' + phone}><Phone size={16}/>24/7 Support</a></div><div className='hero-note'><ShieldCheck size={18}/>Incorporated in 2015 - Serving clients across India</div></div>
      <div className='hero-art'><ProtectionScene className='hero-3d' variant='home'/><MediaFrame src={imagery.hero} alt='Industrial fire protection systems' className='hero-photo'/><div className='grid'/><div className='art-card main'><div className='pulse'><span/></div><small>PROTECTION STACK</small><strong>Detect - Protect - Preserve</strong><p>Systems engineered around the risk, facility and response requirement.</p></div><div className='art-card mini one'>24/7<br/><b>Support</b></div><div className='art-card mini two'>10+<br/><b>System types</b></div></div>
    </section>
    <div className='trust'><span>ENGINEERED FOR FACILITIES</span><i/><span>FIRE - LIFE - ASSET PROTECTION</span><i/><span>TECHNICAL SUPPORT</span></div>
    <section className='section'><div className='section-head'><div><div className='eyebrow dark'>01 - SERVICES DIRECTORY</div><h2>A complete fire-safety stack.</h2></div><p>From early detection to active protection and passive containment, the service architecture is built to keep critical spaces safer.</p></div><div className='service-grid'>{services.map((s, i) => <Motion key={s.title} delay={i * 80}><article className='service'><MediaFrame src={s.image} alt={s.title} className='service-photo'/><div className='icon'><s.icon/></div><span>0{i + 1}</span><h3>{s.title}</h3><p>{s.text}</p><Link to='/quote'>Discuss this system <ArrowRight size={15}/></Link></article></Motion>)}</div></section>
    <section className='section dark-section'><div className='section-head'><div><div className='eyebrow'>02 - EQUIPMENT / SYSTEMS</div><h2>Specify the right system for the risk.</h2></div><p>Explore the solution families covered by the company profile. Product-level specifications can be added as the catalog is finalized.</p></div><div className='system-feature'><ProtectionScene className='system-3d' variant='systems'/><MediaFrame src={imagery.sprinkler} alt='Industrial fire sprinkler protection system'/><div><div className='eyebrow'>ENGINEERED PROTECTION</div><h3>Active systems designed around the facility.</h3><p>From detection and alarm through water-based and clean-agent protection, the system choice follows the risk and operational requirement.</p></div></div><div className='system-list'>{systems.map((s, i) => <Link to='/systems' className='system' key={s}><span>{String(i + 1).padStart(2, '0')}</span><b>{s}</b><ChevronRight size={17}/></Link>)}</div></section>
    <section className='section'><div className='section-head'><div><div className='eyebrow dark'>03 - SAFETY RESOURCES</div><h2>Useful knowledge for facility teams.</h2></div><p>Educational content can turn routine maintenance into a stronger safety practice.</p></div><div className='resource-grid'>{resources.map(([t, p, image], i) => <Motion key={t} delay={i * 70}><article className='resource'><MediaFrame src={image} alt={t} className='resource-photo'/><div className='resource-no'>0{i + 1}</div><BookOpen size={21}/><h3>{t}</h3><p>{p}</p><Link to='/resources'>Explore resource <ArrowRight size={15}/></Link></article></Motion>)}</div></section>
    <section className='section cta-section'><div><div className='eyebrow dark'>READY WHEN YOU ARE</div><h2>Turn your requirement into a clear scope.</h2><p>Share your facility need and route it directly to the company for a consultation.</p></div><Link className='primary' to='/quote'>Request a Quote <ArrowRight size={17}/></Link></section>
  </main>;
}

function Services() {
  return <main><PageHero eyebrow='01 - SERVICES DIRECTORY' title='A complete fire-safety stack.' text='From early detection to active protection and passive containment, the service architecture is built to keep critical spaces safer.' image={imagery.detectionWide} imageAlt='Commercial fire alarm and detection system' variant='detection'/>
    <section className='section'><div className='service-grid service-grid-large'>{services.map((s, i) => <Motion key={s.title} delay={i * 90}><article className='service'><MediaFrame src={s.image} alt={s.title} className='service-photo'/><div className='icon'><s.icon/></div><span>0{i + 1}</span><h3>{s.title}</h3><p>{s.text}</p><Link to='/quote'>Discuss this system <ArrowRight size={15}/></Link></article></Motion>)}</div></section>
    <section className='section image-section'><div className='section-head'><div><div className='eyebrow dark'>FIELD WORK</div><h2>Real systems. Real environments.</h2></div><p>Each service is supported by a physical visual reference so the page stays concrete and easy to scan.</p></div><ImageGallery items={[{src: imagery.detectionWide, alt: 'Commercial fire alarm control and detection system'}, {src: imagery.sprinkler, alt: 'Industrial fire sprinkler protection system'}, {src: imagery.passive, alt: 'Passive fire protection installation'}]}/></section>
    <section className='section dark-section'><div className='section-head'><div><div className='eyebrow'>ENGINEERING APPROACH</div><h2>Built around the facility, not a template.</h2></div><p>Requirements can be discussed around detection, protection, passive fire safety, AMC support and site-specific consultation.</p></div><div className='feature-grid'><Feature icon={ClipboardCheck} title='Assessment' text='Understand the facility, risk profile and operational requirements.'/><Feature icon={Wrench} title='System planning' text='Translate the requirement into a practical system scope.'/><Feature icon={Headphones} title='Technical support' text='Maintain a direct route for service and support conversations.'/></div></section>
  </main>;
}

function Systems() {
  return <main><PageHero eyebrow='02 - EQUIPMENT / SYSTEMS' title='Specify the right system for the risk.' text='Explore the solution families covered by the supplied company profile. Product-level specifications can be added as the catalog is finalized.' image={imagery.sprinkler} imageAlt='Industrial fire sprinkler protection system' variant='systems'/>
    <section className='section dark-section'><div className='system-list system-list-large'>{systems.map((s, i) => <Link className='system' to='/quote' key={s}><span>{String(i + 1).padStart(2, '0')}</span><b>{s}</b><ChevronRight size={17}/></Link>)}</div></section>
    <section className='section image-section'><div className='section-head'><div><div className='eyebrow dark'>SYSTEM REFERENCES</div><h2>Visual references for the major system families.</h2></div><p>Use these visuals as context while product-level specifications are finalized.</p></div><ImageGallery items={[{src: imagery.detection, alt: 'Fire detection smoke detector'}, {src: imagery.sprinkler, alt: 'Fire sprinkler and suppression system'}, {src: imagery.passive, alt: 'Passive fire protection and fire stopping'}]}/></section>
    <section className='section'><div className='split-feature'><MediaFrame src={imagery.facility} alt='Fire protection engineering in an industrial facility'/><div><div className='eyebrow dark'>SYSTEM DESIGN</div><h2>Risk first. Equipment second.</h2><p>The supplied company profile establishes system families rather than a fixed product list. Detailed product specifications should be added only from the finalized catalog.</p><Link className='outline' to='/quote'>Discuss your facility <ArrowRight size={16}/></Link></div></div></section>
  </main>;
}

function Clients() {
  return <main><PageHero eyebrow='03 - CLIENT PORTFOLIO' title='Trusted across varied facilities.' text='Client names reproduced from the supplied company profile. Visual marks are shown only where a relevant web result was found.' image={imagery.facility} imageAlt='Fire protection engineering inspection in an industrial facility' variant='clients'/>
    <section className='section'><div className='client-grid'>{clients.map((c, i) => <Motion key={c} delay={(i % 5) * 45}><div className='client'><div className='client-logo-slot'>{clientMarks[c] ? <img src={clientMarks[c]} alt={`${c} logo`} loading='lazy' onError={e => { e.currentTarget.style.display = 'none'; }}/> : null}</div><div className='client-meta'><span>{String(i + 1).padStart(2, '0')}</span><b>{c}</b></div></div></Motion>)}</div></section>
    <section className='section image-section'><div className='section-head'><div><div className='eyebrow dark'>PROJECT ENVIRONMENTS</div><h2>Safety engineering across different facility types.</h2></div><p>The supplied client list spans healthcare, infrastructure, education, industrial and commercial environments.</p></div><ImageGallery items={[{src: imagery.facility, alt: 'Industrial facility fire protection inspection'}, {src: imagery.sprinkler, alt: 'Industrial fire sprinkler installation'}, {src: imagery.inspection, alt: 'Fire safety engineering inspection'}]}/></section>
  </main>;
}

function Resources() {
  return <main><PageHero eyebrow='04 - SAFETY RESOURCES' title='Useful knowledge for facility teams.' text='Educational content can turn routine maintenance into a stronger safety practice.' image={imagery.inspection} imageAlt='Fire safety engineer inspecting an industrial control system' variant='resources'/>
    <section className='section'><div className='resource-grid resource-grid-large'>{resources.map(([t, p, image], i) => <Motion key={t} delay={i * 80}><article className='resource'><MediaFrame src={image} alt={t} className='resource-photo'/><div className='resource-no'>0{i + 1}</div><BookOpen size={21}/><h3>{t}</h3><p>{p}</p><Link to='/contact'>Discuss this topic <ArrowRight size={15}/></Link></article></Motion>)}</div></section>
    <section className='section dark-section'><div className='feature-grid'><Feature icon={FileCheck2} title='Maintenance records' text='A future-ready client area for maintenance logs and service history.'/><Feature icon={ClipboardCheck} title='Audit reports' text='A structured destination for reports and facility documentation.'/><Feature icon={ShieldCheck} title='Safety practice' text='Turn recurring service conversations into a stronger safety routine.'/></div></section>
    <section className='section image-section'><div className='section-head'><div><div className='eyebrow dark'>VISUAL LEARNING</div><h2>See the systems behind the guidance.</h2></div><p>Detection, protection and inspection references keep the resources practical and visual.</p></div><ImageGallery items={[{src: imagery.detectionWide, alt: 'Commercial fire detection system'}, {src: imagery.passive, alt: 'Passive fire protection installation'}, {src: imagery.facility, alt: 'Fire safety engineering at a facility'}]}/></section>
  </main>;
}

function About() {
  return <main><PageHero eyebrow='05 - COMPANY PROFILE' title='Engineering experience, backed by practical support.' text='Incorporated in 2015, the supplied company profile emphasizes innovation, latest technology, quality products, technical support, cost-effective customization and well-trained professionals.' image={imagery.inspection} imageAlt='Fire safety engineer working on industrial protection equipment' variant='about'/>
    <section className='section about'><div className='about-grid'><div><div className='eyebrow dark'>COMPANY PROFILE</div><h2>Focused on fire, life and asset protection.</h2><p>Incorporated in 2015, the supplied profile describes a company built around innovation, technology, quality products, technical support, customization and trained professionals.</p><div className='pill-row'><span>Innovation</span><span>Technology</span><span>Technical Support</span><span>Customization</span></div></div><div className='about-card'><Building2 size={26}/><b>India-wide service reach</b><p>Head office:</p><span>{address}</span><Link to='/contact'>Get directions <ArrowRight size={15}/></Link></div></div></section>
    <section className='section dark-section'><div className='about-image-grid'><MediaFrame src={imagery.facility} alt='Industrial fire protection facility'/><div><div className='eyebrow'>OPERATIONAL SUPPORT</div><h2>Designed for ongoing service, not only installation.</h2><p>AMC support, maintenance conversations, audits and service history can all be routed through the same direct contact path.</p><div className='feature-inline'><Gauge/><span>Maintenance and response remain central to the service journey.</span></div></div></div></section>
    <section className='section'><div className='section-head'><div><div className='eyebrow dark'>CLIENT PORTAL</div><h2>Maintenance records, organized.</h2></div><p>A future-ready client area for maintenance logs, service history and audit reports.</p></div><div className='portal'><div><b>Portal access can be scoped around client requirements.</b><p>Use the contact route to discuss how records and reports should be handled.</p></div><Link className='outline' to='/contact'>Ask about portal access <ArrowRight size={16}/></Link></div></section>
  </main>;
}

function Quote() {
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({name: '', company: '', phone: '', email: '', need: 'AMC support', message: ''});
  const update = e => setF({...f, [e.target.name]: e.target.value});
  const submit = e => { e.preventDefault(); setSent(true); const t = `Hello Safety & Security Solutions, I need a quotation.\nName: ${f.name}\nCompany: ${f.company}\nPhone: ${f.phone}\nEmail: ${f.email}\nRequirement: ${f.need}\nDetails: ${f.message}`; window.open(`${wa}?text=${encodeURIComponent(t)}`, '_blank'); };
  const mail = `mailto:${email}?subject=Safety%20%26%20Security%20Solutions%20Consultation`;
  return <main><PageHero eyebrow='06 - REQUEST A QUOTE / CONSULTATION' title='Tell us what your facility needs.' text='Choose the requirement, add a few details and send the enquiry directly to the company on WhatsApp or by email.' image={imagery.detectionWide} imageAlt='Commercial fire detection system' variant='quote'/>
    <section className='section quote-section'><div className='quote-panel'><div className='quote-copy'><div className='eyebrow dark'>FAST ROUTE TO SUPPORT</div><h2>One clear brief is enough to start.</h2><p>Share your facility need, scope or maintenance requirement. The enquiry is prepared for direct WhatsApp delivery.</p><div className='contact-box'><span>CONTACT</span><a href={'tel:' + phone}>{phone}</a><a href={'tel:' + phone2}>{phone2}</a><a href={'mailto:' + email}>{email}</a></div></div><form onSubmit={submit} className='quote-form'><div className='form-grid'>{['name','company','phone','email'].map((n, i) => <label key={n}>{['Name', 'Company / facility', 'Phone / WhatsApp', 'Email'][i]}<input required={n === 'name' || n === 'phone'} type={n === 'email' ? 'email' : 'text'} name={n} value={f[n]} onChange={update} placeholder={n === 'name' ? 'Your name' : n === 'company' ? 'Company name' : n === 'phone' ? '+91...' : 'you@company.com'}/></label>)}</div><label>Requirement<select name='need' value={f.need} onChange={update}>{['AMC support', 'Detection Systems', 'Protection Systems', 'Passive Fire Protection', 'Site consultation', 'Other'].map(x => <option key={x}>{x}</option>)}</select></label><label>Details<textarea name='message' value={f.message} onChange={update} placeholder='Tell us about the facility, scope or requirement...'/></label><div className='form-actions'><button className='primary' type='submit'><MessageCircle size={17}/>Send to WhatsApp</button><a className='outline' href={mail}><Mail size={17}/>Send by email</a></div>{sent && <div className='success'>Your enquiry has been prepared for WhatsApp.</div>}</form></div></section>
    <section className='section image-section'><div className='section-head'><div><div className='eyebrow dark'>WHAT TO INCLUDE</div><h2>Give the team enough context to respond quickly.</h2></div><p>Facility type, system requirement, AMC scope, site location and any existing system information can all help.</p></div><ImageGallery items={[{src: imagery.detectionWide, alt: 'Fire detection system'}, {src: imagery.sprinkler, alt: 'Fire protection system'}, {src: imagery.facility, alt: 'Industrial facility fire safety'}]}/></section>
  </main>;
}

function Contact() {
  return <main><PageHero eyebrow='07 - CONTACT & REACH' title='One conversation, a clear route to support.' text='Emergency contact, email and location details from the supplied company information.' image={imagery.facility} imageAlt='Industrial facility protected by engineered fire safety systems' variant='contact'/>
    <section className='section contact'><div className='contact-grid'><div className='contact-card'><Phone/><span>EMERGENCY / 24/7</span><a href={'tel:' + phone}>{phone}</a><a href={'tel:' + phone2}>{phone2}</a></div><div className='contact-card'><Mail/><span>EMAIL</span><a href={'mailto:' + email}>{email}</a></div><div className='contact-card'><MapPin/><span>OFFICE</span><p>{address}</p><a href='https://www.google.com/maps/search/?api=1&query=27%20Nityananda%20Nagar%20Howrah%2071109' target='_blank' rel='noreferrer'>Open map <ExternalLink size={14}/></a></div></div><div className='map'><iframe title='Safety and Security Solutions office map' src='https://www.google.com/maps?q=27%20Nityananda%20Nagar%2C%20P.O.%20D.S.%20Lane%2C%20Howrah%2071109&output=embed' loading='lazy' referrerPolicy='no-referrer-when-downgrade'/></div><div className='map-actions'><a className='outline' href={googleMapsLocation} target='_blank' rel='noreferrer'>Open exact Google Maps location <ExternalLink size={15}/></a></div></section>
    <section className='section image-section'><div className='section-head'><div><div className='eyebrow dark'>FIELD SUPPORT</div><h2>Built for facilities that need a direct response.</h2></div><p>From detection to protection and inspection, the support route stays close to the physical systems on site.</p></div><ImageGallery items={[{src: imagery.facility, alt: 'Industrial fire protection facility'}, {src: imagery.detectionWide, alt: 'Fire alarm detection system'}, {src: imagery.inspection, alt: 'Fire safety engineering inspection'}]}/></section><section className='section'><CTA/></section>
  </main>;
}

function Feature({icon: Icon, title, text}) { return <article className='feature'><div className='icon'><Icon/></div><h3>{title}</h3><p>{text}</p></article>; }
function CTA() { return <div className='cta-section'><div><div className='eyebrow dark'>NEXT STEP</div><h2>Discuss the requirement.</h2><p>Route a service, system or maintenance request directly to the company.</p></div><Link className='primary' to='/quote'>Request a Quote <ArrowRight size={17}/></Link></div>; }
function Footer() { return <footer><Logo/><div className='footer-links'><Link to='/services'>Services</Link><Link to='/systems'>Systems</Link><Link to='/clients'>Clients</Link><Link to='/resources'>Resources</Link><Link to='/about'>About</Link><Link to='/contact'>Contact</Link></div><div className='footer-bottom'><span>Copyright {new Date().getFullYear()} Safety &amp; Security Solutions</span><span>{address}</span></div></footer>; }

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.error('Page rendering error:', error);
  }
  render() {
    if (!this.state.hasError) return this.props.children;
    return <main><section className='section' style={{ minHeight: '55vh', display: 'grid', placeItems: 'center', textAlign: 'center' }}><div><div className='eyebrow dark'>TEMPORARY RENDERING ERROR</div><h1 style={{ fontSize: 'clamp(42px, 6vw, 72px)', margin: '20px 0' }}>This page could not be rendered.</h1><p style={{ color: 'var(--muted)', maxWidth: 650, margin: '0 auto 24px' }}>The rest of the site is still available. Reload the page to retry the current route.</p><button className='primary' type='button' onClick={() => window.location.reload()}>Reload page <ArrowRight size={17}/></button></div></section></main>;
  }
}

function App() { return <BrowserRouter><Layout><AppErrorBoundary><Routes><Route path='/' element={<Home/>}/><Route path='/services' element={<Services/>}/><Route path='/systems' element={<Systems/>}/><Route path='/clients' element={<Clients/>}/><Route path='/resources' element={<Resources/>}/><Route path='/about' element={<About/>}/><Route path='/quote' element={<Quote/>}/><Route path='/contact' element={<Contact/>}/><Route path='*' element={<Home/>}/></Routes></AppErrorBoundary></Layout></BrowserRouter>; }
createRoot(document.getElementById('root')).render(<App/>);
