import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Flame, Activity, Layers, ArrowRight, Phone, Mail, MapPin,
  MessageCircle, Menu, X, ChevronRight, BookOpen, Building2, Clock3,
  ExternalLink, ClipboardCheck, Wrench, FileText, Headphones
} from 'lucide-react';
import './styles.css';

const phone = '+919432223543';
const phone2 = '+919434362537';
const email = 'fsssindia@gmail.com';
const wa = 'https://wa.me/919432223543';
const address = '27, Nityananda Nagar, P.O. D.S. Lane, Howrah - 711109';

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
  { icon: Flame, title: 'Detection Systems', text: 'Conventional, addressable, addressable analogue and intelligent addressable analogue systems, plus CO2 and FM-200 solutions.' },
  { icon: Activity, title: 'Protection Systems', text: 'Hydrant, automatic sprinkler, high & medium velocity water sprinkler and water-mist systems.' },
  { icon: Layers, title: 'Passive Fire Protection', text: 'Mechanical smoke control, sealing materials, fire-check doors, AHU tripping and staircase pressurization.' }
];

const systems = [
  'Fire Detection & Alarm', 'Hydrant Systems', 'Automatic Sprinkler', 'Water Mist',
  'CO2 Flooding', 'FM-200 Flooding', 'Smoke Control', 'Fire Check Doors',
  'Sealing Materials', 'Staircase Pressurization'
];

const resources = [
  ['Detection 101', 'Understand conventional, addressable and intelligent detection systems.'],
  ['AMC Field Checklist', 'A practical starting point for maintenance conversations.'],
  ['Protection Systems', 'Hydrant, sprinkler, water mist and clean-agent system basics.'],
  ['Audit Readiness', 'Organize service history, reports and maintenance records.']
];

function Logo() {
  return <Link to='/' className='brand' aria-label='Safety & Security Solutions home'>
    <span className='mark'><span>S</span><span>S</span></span>
    <span><b>SAFETY &amp; SECURITY</b><small>SOLUTIONS</small></span>
  </Link>;
}

function Header() {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const links = [['Services', '/services'], ['Systems', '/systems'], ['Clients', '/clients'], ['Resources', '/resources'], ['About', '/about'], ['Contact', '/contact']];
  return <>
    <div className='topbar'>
      <div><Clock3 size={14}/> Emergency / 24/7 Support</div>
      <div><a href={'tel:' + phone}>{phone}</a><span> | </span><a href={'mailto:' + email}>{email}</a></div>
    </div>
    <header className='nav'>
      <Logo/>
      <button className='menu' aria-label='Toggle navigation' onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
      <nav className={menu ? 'open' : ''}>
        {links.map(([label, href]) => <Link key={href} className={location.pathname === href ? 'active' : ''} to={href} onClick={() => setMenu(false)}>{label}</Link>)}
        <Link className='navcta' to='/quote' onClick={() => setMenu(false)}>Request a Quote <ArrowRight size={15}/></Link>
      </nav>
    </header>
  </>;
}

function FloatingTools() {
  const [chat, setChat] = useState(false);
  return <>
    <div className='floating'>
      <a className='float wa' href={wa} target='_blank' rel='noreferrer'><MessageCircle/><span>WhatsApp</span></a>
      <button className='float chat-btn' onClick={() => setChat(!chat)} aria-label='Open live chat'><MessageCircle/><span>Live chat</span></button>
    </div>
    {chat && <div className='chat'>
      <div className='chat-head'><div><b>SSS Assistant</b><small>Company information and enquiry help</small></div><button onClick={() => setChat(false)}><X size={17}/></button></div>
      <div className='chat-body'><div className='bubble'>Hi. I can help you understand our services, systems, quotation process and contact details.</div>
        <div className='quick'><Link to='/services' onClick={() => setChat(false)}>Services</Link><Link to='/systems' onClick={() => setChat(false)}>Systems</Link><Link to='/quote' onClick={() => setChat(false)}>Get a quote</Link><Link to='/contact' onClick={() => setChat(false)}>Contact</Link></div>
      </div>
    </div>}
  </>;
}

function Layout({ children }) {
  return <div><Header/>{children}<Footer/><FloatingTools/></div>;
}

function PageHero({ eyebrow, title, text }) {
  return <section className='page-hero'>
    <div><div className='eyebrow'><span/> {eyebrow}</div><h1>{title}</h1><p>{text}</p></div>
    <div className='page-hero-art'><div className='grid'/><div className='page-art-card'><ShieldCheck size={42}/><small>SAFETY &amp; SECURITY</small><strong>Engineered around the risk.</strong></div></div>
  </section>;
}

function Home() {
  return <main>
    <section className='hero'>
      <div className='hero-copy'><div className='eyebrow'><span/>FIRE SAFETY - SECURITY - ENGINEERING</div>
        <h1>Protection engineered for what matters most.</h1>
        <p>Integrated fire detection, protection and passive fire-safety solutions, backed by technical support and customized engineering for facilities across India.</p>
        <div className='actions'><Link className='primary' to='/quote'>Talk to an Expert <ArrowRight size={17}/></Link><a className='secondary' href={'tel:' + phone}><Phone size={16}/>24/7 Support</a></div>
        <div className='hero-note'><ShieldCheck size={18}/>Incorporated in 2015 - Serving clients across India</div>
      </div>
      <div className='hero-art'><div className='grid'/><div className='art-card main'><div className='pulse'><span/></div><small>PROTECTION STACK</small><strong>Detect - Protect - Preserve</strong><p>Systems engineered around the risk, facility and response requirement.</p></div><div className='art-card mini one'>24/7<br/><b>Support</b></div><div className='art-card mini two'>10+<br/><b>System types</b></div></div>
    </section>
    <div className='trust'><span>ENGINEERED FOR FACILITIES</span><i/><span>FIRE - LIFE - ASSET PROTECTION</span><i/><span>TECHNICAL SUPPORT</span></div>
    <section className='section'><div className='section-head'><div><div className='eyebrow dark'>01 - SERVICES DIRECTORY</div><h2>A complete fire-safety stack.</h2></div><p>From early detection to active protection and passive containment, the service architecture is built to keep critical spaces safer.</p></div><div className='service-grid'>{services.map((s,i)=><article className='service' key={s.title}><div className='icon'><s.icon/></div><span>0{i+1}</span><h3>{s.title}</h3><p>{s.text}</p><Link to='/quote'>Discuss this system <ArrowRight size={15}/></Link></article>)}</div></section>
    <section className='section dark-section'><div className='section-head'><div><div className='eyebrow'>02 - EQUIPMENT / SYSTEMS</div><h2>Specify the right system for the risk.</h2></div><p>Explore the solution families covered by the company profile. Product-level specifications can be added as the catalog is finalized.</p></div><div className='system-list'>{systems.map((s,i)=><Link to='/systems' className='system' key={s}><span>{String(i+1).padStart(2,'0')}</span><b>{s}</b><ChevronRight size={17}/></Link>)}</div></section>
    <section className='quote-band'><div><div className='eyebrow'>SAFETY PHILOSOPHY</div><blockquote>The safety of the people shall be the highest law.</blockquote><small>- Marcus Tullius Cicero, commonly translated</small></div><ShieldCheck size={72}/></section>
    <section className='section'><div className='section-head'><div><div className='eyebrow dark'>03 - SAFETY RESOURCES</div><h2>Useful knowledge for facility teams.</h2></div><p>Educational content can turn routine maintenance into a stronger safety practice.</p></div><div className='resource-grid'>{resources.map(([t,p],i)=><article className='resource' key={t}><div className='resource-no'>0{i+1}</div><BookOpen size={21}/><h3>{t}</h3><p>{p}</p><Link to='/resources'>Explore resource <ArrowRight size={15}/></Link></article>)}</div></section>
    <section className='section cta-section'><div><div className='eyebrow dark'>READY WHEN YOU ARE</div><h2>Turn your requirement into a clear scope.</h2><p>Share your facility need and route it directly to the company for a consultation.</p></div><Link className='primary' to='/quote'>Request a Quote <ArrowRight size={17}/></Link></section>
  </main>;
}

function Services() {
  return <main><PageHero eyebrow='01 - SERVICES DIRECTORY' title='A complete fire-safety stack.' text='From early detection to active protection and passive containment, the service architecture is built to keep critical spaces safer.'/>
    <section className='section'><div className='service-grid service-grid-large'>{services.map((s,i)=><article className='service' key={s.title}><div className='icon'><s.icon/></div><span>0{i+1}</span><h3>{s.title}</h3><p>{s.text}</p><Link to='/quote'>Discuss this system <ArrowRight size={15}/></Link></article>)}</div></section>
    <section className='section dark-section'><div className='section-head'><div><div className='eyebrow'>ENGINEERING APPROACH</div><h2>Built around the facility, not a template.</h2></div><p>Requirements can be discussed around detection, protection, passive fire safety, AMC support and site-specific consultation.</p></div><div className='feature-grid'><Feature icon={ClipboardCheck} title='Assessment' text='Understand the facility, risk profile and operational requirements.'/><Feature icon={Wrench} title='System planning' text='Translate the requirement into a practical system scope.'/><Feature icon={Headphones} title='Technical support' text='Maintain a direct route for service and support conversations.'/></div></section>
    <section className='section'><CTA/></section>
  </main>;
}

function Systems() {
  return <main><PageHero eyebrow='02 - EQUIPMENT / SYSTEMS' title='Specify the right system for the risk.' text='Explore the solution families covered by the supplied company profile. Product-level specifications can be added as the catalog is finalized.'/>
    <section className='section dark-section'><div className='system-list system-list-large'>{systems.map((s,i)=><Link className='system' to='/quote' key={s}><span>{String(i+1).padStart(2,'0')}</span><b>{s}</b><ChevronRight size={17}/></Link>)}</div></section>
    <section className='section'><div className='section-head'><div><div className='eyebrow dark'>CATALOG DIRECTION</div><h2>System families first. Product specifications next.</h2></div><p>The current profile establishes solution categories. Detailed product-level specifications should be added from the finalized product catalog rather than assumed.</p></div><CTA/></section>
  </main>;
}

function Clients() {
  return <main><PageHero eyebrow='03 - CLIENT PORTFOLIO' title='Trusted across varied facilities.' text='Client names reproduced from the supplied company profile. Logos are omitted where they have not been verified.'/>
    <section className='section'><div className='client-grid client-grid-large'>{clients.map((c,i)=><div className='client' key={c}><span>{String(i+1).padStart(2,'0')}</span><b>{c}</b></div>)}</div></section>
    <section className='quote-band'><div><div className='eyebrow'>SAFETY PHILOSOPHY</div><blockquote>The safety of the people shall be the highest law.</blockquote><small>- Marcus Tullius Cicero, commonly translated</small></div><ShieldCheck size={72}/></section>
  </main>;
}

function Resources() {
  return <main><PageHero eyebrow='04 - SAFETY RESOURCES' title='Useful knowledge for facility teams.' text='Educational content can turn routine maintenance into a stronger safety practice.'/>
    <section className='section'><div className='resource-grid resource-grid-large'>{resources.map(([t,p],i)=><article className='resource' key={t}><div className='resource-no'>0{i+1}</div><BookOpen size={21}/><h3>{t}</h3><p>{p}</p><Link to='/contact'>Discuss this topic <ArrowRight size={15}/></Link></article>)}</div></section>
    <section className='section dark-section'><div className='feature-grid'><Feature icon={FileText} title='Maintenance records' text='A future-ready client area for maintenance logs and service history.'/><Feature icon={ClipboardCheck} title='Audit reports' text='A structured destination for reports and facility documentation.'/><Feature icon={ShieldCheck} title='Safety practice' text='Turn recurring service conversations into a stronger safety routine.'/></div></section>
  </main>;
}

function About() {
  return <main><PageHero eyebrow='05 - COMPANY PROFILE' title='Engineering experience, backed by practical support.' text='Incorporated in 2015, the supplied company profile emphasizes innovation, latest technology, quality products, technical support, cost-effective customization and well-trained professionals.'/>
    <section className='section about'><div className='about-grid'><div><div className='eyebrow dark'>COMPANY PROFILE</div><h2>Focused on fire, life and asset protection.</h2><p>Incorporated in 2015, the supplied profile describes a company built around innovation, technology, quality products, technical support, customization and trained professionals.</p><div className='pill-row'><span>Innovation</span><span>Technology</span><span>Technical Support</span><span>Customization</span></div></div><div className='about-card'><Building2 size={26}/><b>India-wide service reach</b><p>Head office:</p><span>{address}</span><Link to='/contact'>Get directions <ArrowRight size={15}/></Link></div></div></section>
    <section className='section'><div className='section-head'><div><div className='eyebrow dark'>CLIENT PORTAL</div><h2>Maintenance records, organized.</h2></div><p>A future-ready client area for maintenance logs, service history and audit reports.</p></div><div className='portal'><div><b>Portal access can be scoped around client requirements.</b><p>Use the contact route to discuss how records and reports should be handled.</p></div><Link className='outline' to='/contact'>Ask about portal access <ArrowRight size={16}/></Link></div></section>
  </main>;
}

function Quote() {
  const [sent,setSent]=useState(false);
  const [f,setF]=useState({name:'',company:'',phone:'',email:'',need:'AMC support',message:''});
  const update=e=>setF({...f,[e.target.name]:e.target.value});
  const submit=e=>{e.preventDefault();setSent(true);const t=`Hello Safety & Security Solutions, I need a quotation.\nName: ${f.name}\nCompany: ${f.company}\nPhone: ${f.phone}\nEmail: ${f.email}\nRequirement: ${f.need}\nDetails: ${f.message}`;window.open(`${wa}?text=${encodeURIComponent(t)}`,'_blank');};
  const mail=`mailto:${email}?subject=Safety%20%26%20Security%20Solutions%20Consultation`;
  return <main><PageHero eyebrow='06 - REQUEST A QUOTE / CONSULTATION' title='Tell us what your facility needs.' text='Choose the requirement, add a few details and send the enquiry directly to the company on WhatsApp or by email.'/>
    <section className='section quote-section'><div className='quote-panel'><div className='quote-copy'><div className='eyebrow dark'>FAST ROUTE TO SUPPORT</div><h2>One clear brief is enough to start.</h2><p>Share your facility need, scope or maintenance requirement. The enquiry is prepared for direct WhatsApp delivery.</p><div className='contact-box'><span>CONTACT</span><a href={'tel:' + phone}>{phone}</a><a href={'tel:' + phone2}>{phone2}</a><a href={'mailto:' + email}>{email}</a></div></div>
      <form onSubmit={submit} className='quote-form'><div className='form-grid'>{['name','company','phone','email'].map((n,i)=><label key={n}>{['Name','Company / facility','Phone / WhatsApp','Email'][i]}<input required={n==='name'||n==='phone'} type={n==='email'?'email':'text'} name={n} value={f[n]} onChange={update} placeholder={n==='name'?'Your name':n==='company'?'Company name':n==='phone'?'+91...':'you@company.com'}/></label>)}</div><label>Requirement<select name='need' value={f.need} onChange={update}>{['AMC support','Detection Systems','Protection Systems','Passive Fire Protection','Site consultation','Other'].map(x=><option key={x}>{x}</option>)}</select></label><label>Details<textarea name='message' value={f.message} onChange={update} placeholder='Tell us about the facility, scope or requirement...'/></label><div className='form-actions'><button className='primary' type='submit'><MessageCircle size={17}/>Send to WhatsApp</button><a className='outline' href={mail}><Mail size={17}/>Send by email</a></div>{sent&&<div className='success'>Your enquiry has been prepared for WhatsApp.</div>}</form></div></section>
  </main>;
}

function Contact() {
  return <main><PageHero eyebrow='07 - CONTACT & REACH' title='One conversation, a clear route to support.' text='Emergency contact, email and location details from the supplied company information.'/>
    <section className='section contact'><div className='contact-grid'><div className='contact-card'><Phone/><span>EMERGENCY / 24/7</span><a href={'tel:' + phone}>{phone}</a><a href={'tel:' + phone2}>{phone2}</a></div><div className='contact-card'><Mail/><span>EMAIL</span><a href={'mailto:' + email}>{email}</a></div><div className='contact-card'><MapPin/><span>OFFICE</span><p>{address}</p><a href='https://www.google.com/maps/search/?api=1&query=27%20Nityananda%20Nagar%20Howrah%2071109' target='_blank' rel='noreferrer'>Open map <ExternalLink size={14}/></a></div></div><div className='map'><iframe title='Howrah office map' src='https://www.openstreetmap.org/export/embed.html?bbox=88.29%2C22.56%2C88.38%2C22.64&layer=mapnik&marker=22.595%2C88.34' loading='lazy'/></div></section>
    <section className='section'><CTA/></section>
  </main>;
}

function Feature({icon: Icon,title,text}){return <article className='feature'><div className='icon'><Icon/></div><h3>{title}</h3><p>{text}</p></article>}
function CTA(){return <div className='cta-section'><div><div className='eyebrow dark'>NEXT STEP</div><h2>Discuss the requirement.</h2><p>Route a service, system or maintenance request directly to the company.</p></div><Link className='primary' to='/quote'>Request a Quote <ArrowRight size={17}/></Link></div>}
function Footer(){return <footer><Logo/><div className='footer-links'><Link to='/services'>Services</Link><Link to='/systems'>Systems</Link><Link to='/clients'>Clients</Link><Link to='/resources'>Resources</Link><Link to='/about'>About</Link><Link to='/contact'>Contact</Link></div><div className='footer-bottom'><span>Copyright {new Date().getFullYear()} Safety &amp; Security Solutions</span><span>{address}</span></div></footer>}

function App(){return <BrowserRouter><Layout><Routes><Route path='/' element={<Home/>}/><Route path='/services' element={<Services/>}/><Route path='/systems' element={<Systems/>}/><Route path='/clients' element={<Clients/>}/><Route path='/resources' element={<Resources/>}/><Route path='/about' element={<About/>}/><Route path='/quote' element={<Quote/>}/><Route path='/contact' element={<Contact/>}/><Route path='*' element={<Home/>}/></Routes></Layout></BrowserRouter>}

createRoot(document.getElementById('root')).render(<App/>);
