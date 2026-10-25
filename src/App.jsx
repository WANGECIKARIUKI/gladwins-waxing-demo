import { useState } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowRight, CalendarDays, MessageCircle, Check, Clock3, Flower2, MapPin, Menu, ShieldCheck, Sparkles, Users, Wallet, X } from 'lucide-react';

const services = [
  { name: 'Face waxing', note: 'A considered touch for delicate areas.', time: '15–30 min', type: 'face', price: 'Price confirmed at booking' },
  { name: 'Underarm waxing', note: 'A smooth, fresh-feeling reset.', time: '15 min', type: 'underarm', price: 'Price confirmed at booking' },
  { name: 'Arms & legs', note: 'Thoughtful care from shoulder to toe.', time: '30–60 min', type: 'limbs', price: 'Price confirmed at booking' },
  { name: 'Bikini & Brazilian', note: 'Private, professional and always respectful.', time: '30–45 min', type: 'bikini', price: 'Price confirmed at booking' },
];
const branches = [
  { name: 'CBD Branch', address: 'Nairobi City Centre, 6th Floor, Room 603', short: 'CBD' },
  { name: 'Kilimani Branch', address: '623 Wood Avenue, 7th Floor', short: 'Kilimani' },
];
const sampleBookings = [
  { time: '09:30', name: 'Amina W.', service: 'Face waxing', branch: 'CBD Branch', status: 'Confirmed' },
  { time: '10:15', name: 'Njeri K.', service: 'Underarm waxing', branch: 'Kilimani Branch', status: 'Pending' },
  { time: '11:00', name: 'Zawadi M.', service: 'Arms & legs', branch: 'CBD Branch', status: 'Confirmed' },
  { time: '12:30', name: 'Wanjiku N.', service: 'Bikini & Brazilian', branch: 'Kilimani Branch', status: 'Pending' },
];

const treatmentImages = {
  face: {
    src: "https://images.squarespace-cdn.com/content/v1/69482b68e0afa32c76c11b07/20bc35d5-b866-423d-8d13-b7de0c85ace6/La%2BPerla%2BCosmetic%2BDarmstadt%2BWaxing.jpeg",
    alt: "A professional beautician applying wax to a client's upper lip during a facial waxing treatment"
  },
  underarm: {
    src: "https://purespadirect.com/cdn/shop/articles/female_client_getting_armpit_wax_depilation_in_aesthetic_cosmetology_clinic_15220.jpg?v=1726819436",
    alt: "A client receiving a professional underarm waxing treatment at a salon"
  },
  limbs: {
    src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=85",
    alt: "A woman relaxing during a professional beauty treatment"
  },
  bikini: {
    src: "https://www.ambasadaurody.pl/cache/files/1054179881/163-depilacja-bikini-woskiem-ile-sie-utrzymuje.jpg",
    alt: "A professional therapist applying wax to a client's bikini line during a waxing treatment"
  }
};
function TreatmentArt({ type }) {
  const image = treatmentImages[type];
  return <div className={`treatment-photo treatment-photo-${type}`}>
    <img src={image.src} alt={image.alt} loading="lazy" />
    <span className="photo-number">{['01','02','03','04'][['face','underarm','limbs','bikini'].indexOf(type)]}</span>
  </div>;
}

function BookingForm({ onClose, initialService = '', initialBranch = '' }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ service: initialService, branch: initialBranch, date: '', time: '', name: '', phone: '', email: '', notes: '' });
  const [error, setError] = useState('');
  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.service || !form.branch || !form.date || !form.time || !form.name.trim() || !form.phone.trim()) {
      setError('Please complete all required fields so we can prepare your appointment request.');
      return;
    }
    setError('');
    setSubmitted(true);
  };
  return <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <button className="modal-close" onClick={onClose} aria-label="Close booking form"><X size={20}/></button>
      {!submitted ? <>
        <div className="modal-kicker"><CalendarDays size={16}/> YOUR VISIT, YOUR WAY</div>
        <h2 id="booking-title">Let’s find your time.</h2>
        <p className="modal-intro">Tell us what you’re looking for and where you’d like to visit. This demo form won’t send or save your details.</p>
        <form onSubmit={submit} className="booking-form">
          <label>Treatment <span>*</span>
            <select value={form.service} onChange={e => update('service', e.target.value)} required>
              <option value="">Choose a treatment</option>{services.map(s => <option key={s.name}>{s.name}</option>)}
            </select>
          </label>
          <label>Which branch are you visiting? <span>*</span>
            <select value={form.branch} onChange={e => update('branch', e.target.value)} required>
              <option value="">Choose a branch</option>{branches.map(b => <option key={b.name}>{b.name}</option>)}
            </select>
            {form.branch && <small className="branch-hint"><MapPin size={13}/>{branches.find(b => b.name === form.branch)?.address}</small>}
          </label>
          <div className="form-two">
            <label>Preferred date <span>*</span><input type="date" min={new Date().toISOString().split('T')[0]} value={form.date} onChange={e => update('date', e.target.value)} required /></label>
            <label>Preferred time <span>*</span>
              <select value={form.time} onChange={e => update('time', e.target.value)} required><option value="">Choose time</option>{['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00'].map(t => <option key={t}>{t}</option>)}</select>
            </label>
          </div>
          <div className="form-two">
            <label>Your name <span>*</span><input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Full name" autoComplete="name" required /></label>
            <label>Phone number <span>*</span><input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+254…" autoComplete="tel" required /></label>
          </div>
          <label>Email address <small>(optional)</small><input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" autoComplete="email" /></label>
          <label>Anything we should know? <small>(optional)</small><textarea rows="2" value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="Optional note for the team" /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-dark button-full" type="submit">Review appointment request <ArrowRight size={17}/></button>
          <button className="button whatsapp-button button-full" type="button" onClick={() => { setError("WhatsApp booking is available from the floating button on the website. This demo does not send messages or save bookings."); }}><MessageCircle size={17}/> WhatsApp booking preview</button>
          <p className="privacy-note"><ShieldCheck size={14}/> Demo only — no personal details are transmitted or stored.</p>
        </form>
      </> : <div className="success-state">
        <div className="success-icon"><Check size={28}/></div><div className="modal-kicker">REQUEST PREVIEW</div>
        <h2>That’s looking lovely.</h2><p>Here’s what your appointment request would look like. In the live site, the salon would need to confirm availability.</p>
        <div className="summary-card">
          <div><span>Treatment</span><strong>{form.service}</strong></div><div><span>Branch</span><strong>{form.branch}</strong></div>
          <div><span>Date & time</span><strong>{form.date} · {form.time}</strong></div><div><span>Customer</span><strong>{form.name} · {form.phone}</strong></div>
        </div>
        <p className="demo-warning">This is not a real booking. Your details have not been sent to Lumina Wax Bar.</p>
        <button className="button button-dark button-full" onClick={onClose}>Back to website <ArrowRight size={17}/></button>
        <button className="text-button" onClick={() => setSubmitted(false)}>Edit request</button>
      </div>}
    </section>
  </div>;
}

function PublicSite({ openBooking, openDashboard }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [waService, setWaService] = useState('');
  const [waBranch, setWaBranch] = useState('');
  const [waDate, setWaDate] = useState('');
  const [waTime, setWaTime] = useState('');
  const [waPreview, setWaPreview] = useState(false);
  return <main className="public-site">
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Lumina Wax Bar home"><span className="brand-mark"><Flower2 size={24}/></span><span>LUMINA<small>WAX BAR · NAIROBI</small></span></a>
      <nav className={`desktop-nav ${mobileMenuOpen ? 'mobile-nav-open' : ''}`}>
        <a href="#treatments" onClick={() => setMobileMenuOpen(false)}>Treatments</a>
        <a href="#our-space" onClick={() => setMobileMenuOpen(false)}>Our approach</a>
        <a href="#locations" onClick={() => setMobileMenuOpen(false)}>Find us</a>
        <button className="nav-owner-link" onClick={() => { setMobileMenuOpen(false); openDashboard(); }}>Owner preview <ArrowRight size={14}/></button>
      </nav>
      <div className="header-actions">
        <button className="button button-dark header-book" onClick={openBooking}>Book an appointment <ArrowRight size={16}/></button>
        <button className="mobile-menu-toggle" aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(v => !v)}>{mobileMenuOpen ? <X size={21}/> : <Menu size={21}/>}</button>
      </div>
    </header>
    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="eyebrow"><span></span> A LITTLE SPACE FOR YOU</div>
        <h1>Make time<br/>for <em>feeling good.</em></h1>
        <p>Thoughtful waxing care, a gentle touch, and a moment that’s just for you. Find your kind of smooth at Lumina Wax Bar.</p>
        <div className="hero-actions"><button className="button button-dark" onClick={openBooking}>Book your visit <ArrowRight size={17}/></button><a className="quiet-link" href="#treatments">Explore treatments <ArrowDownRight size={17}/></a></div>
        <div className="hero-footnote"><span className="mini-stars">✳ ✳ ✳</span><span>Care that puts you at ease</span></div>
      </div>
      <div className="hero-visual">
        <div className="hero-art-frame"><div className="hero-image-art"><span className="sun-disc"></span><span className="plant-stem stem-one"></span><span className="plant-stem stem-two"></span><span className="plant-leaf leaf-one"></span><span className="plant-leaf leaf-two"></span><span className="plant-leaf leaf-three"></span><span className="plant-leaf leaf-four"></span><span className="art-caption">A moment to reset</span></div></div>
        <div className="floating-note"><Sparkles size={17}/><span>Soft care.<br/><strong>Beautifully you.</strong></span></div>
        <div className="hero-index">01 / LUMINA EXPERIENCE</div>
      </div>
    </section>
    <div className="values-band"><div><span>01</span> Considered care</div><div><span>02</span> A comfortable space</div><div><span>03</span> Two Nairobi locations</div></div>
    <section className="treatments-section section-wrap" id="treatments">
      <div className="section-heading"><div><div className="eyebrow">THE TREATMENT MENU</div><h2>Your routine,<br/><em>with a softer touch.</em></h2></div><p>Choose the care that suits you. Not sure where to start? Pick your treatment in the appointment form and we’ll take it from there.</p></div>
      <div className="treatment-grid">{services.map((s, i) => <article className="treatment-card" key={s.name}>
        <TreatmentArt type={s.type}/><div className="treatment-card-content"><div className="card-number">TREATMENT {String(i+1).padStart(2,'0')}</div><h3>{s.name}</h3><p>{s.note}</p><div className="treatment-meta"><span><Clock3 size={14}/>{s.time}</span><button aria-label={`Book ${s.name}`} onClick={() => openBooking(s.name)}>Book <ArrowRight size={15}/></button></div></div>
      </article>)}</div>
      <div className="menu-note"><Sparkles size={17}/><p>We’ll confirm service details and pricing with you before your visit.</p></div>
    </section>
    <section className="approach-section" id="our-space">
      <div className="approach-art"><div className="approach-circle circle-a"></div><div className="approach-circle circle-b"></div><div className="approach-line"></div><span className="approach-quote">Your comfort<br/>comes first.</span><span className="approach-number">THE LUMINA WAY</span></div>
      <div className="approach-copy"><div className="eyebrow">A GENTLER KIND OF SELF-CARE</div><h2>Come as you are.<br/><em>Leave feeling lighter.</em></h2><p>We believe personal care should feel personal. Our approach is rooted in respect, comfort, and helping you feel at ease from the moment you arrive.</p><ul><li><span><Check size={15}/></span> A welcoming, respectful experience</li><li><span><Check size={15}/></span> Careful attention to your comfort</li><li><span><Check size={15}/></span> Clear guidance before your treatment</li></ul><button className="button button-outline" onClick={openBooking}>Plan your visit <ArrowRight size={16}/></button></div>
    </section>
    <section className="locations-section section-wrap" id="locations">
      <div className="section-heading location-heading"><div><div className="eyebrow">TWO SPACES, ONE LUMINA</div><h2>Find your <em>nearest</em><br/>little reset.</h2></div><p>Choose the branch that works best for you when you request an appointment.</p></div>
      <div className="location-grid">{branches.map((b) => <article className="location-card" key={b.name}><div className="location-top"><span className="location-tag">{b.short}</span><MapPin size={19}/></div><h3>{b.name}</h3><p>{b.address}</p><div className="location-bottom"><span><Clock3 size={15}/> 9:00 AM – 7:30 PM</span><button className="text-arrow" onClick={() => openBooking('', b.name)}>Book this branch <ArrowRight size={16}/></button></div></article>)}</div>
      <p className="hours-note">Hours shown as provided for this demo. Please confirm opening days and availability directly with the salon.</p>
    </section>
    <section className="final-cta"><div className="cta-flower"><Flower2 size={39}/></div><div><div className="eyebrow">YOUR TIME IS YOURS</div><h2>A little care can<br/><em>go a long way.</em></h2></div><button className="button button-light" onClick={openBooking}>Book an appointment <ArrowRight size={17}/></button></section>
    <footer className="site-footer"><a className="brand footer-brand" href="#top"><span className="brand-mark"><Flower2 size={22}/></span><span>LUMINA<small>WAX BAR · NAIROBI</small></span></a><p>Feel good in your own skin.</p><button className="footer-dashboard" onClick={openDashboard}>Owner preview <ArrowRight size={15}/></button><span className="copyright">© Lumina Wax Bar · Demo concept</span></footer>
    <button className="floating-whatsapp" onClick={() => { setWhatsappOpen(v => !v); setWaPreview(false); }} aria-label="Open WhatsApp booking demo"><MessageCircle size={22}/><span>Book via WhatsApp</span></button>
    {whatsappOpen && <section className="whatsapp-panel" aria-label="WhatsApp booking demo">
      <div className="whatsapp-panel-head"><div><strong>Book via WhatsApp</strong><small>Appointment request preview</small></div><button onClick={() => setWhatsappOpen(false)} aria-label="Close WhatsApp booking"><X size={18}/></button></div>
      {!waPreview ? <div className="whatsapp-panel-body">
        <p>Choose a few details to preview the message you could send to Lumina on WhatsApp.</p>
        <label>Treatment<select value={waService} onChange={e=>setWaService(e.target.value)}><option value="">Choose treatment</option>{services.map(s=><option key={s.name}>{s.name}</option>)}</select></label>
        <label>Branch<select value={waBranch} onChange={e=>setWaBranch(e.target.value)}><option value="">Choose branch</option>{branches.map(b=><option key={b.name}>{b.name}</option>)}</select></label>
        <label>Preferred date<input type="date" min={new Date().toISOString().split('T')[0]} value={waDate} onChange={e=>setWaDate(e.target.value)}/></label>
        <label>Preferred time<select value={waTime} onChange={e=>setWaTime(e.target.value)}><option value="">Choose time</option>{['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00'].map(t=><option key={t}>{t}</option>)}</select></label>
        <button className="button button-dark button-full" disabled={!waService || !waBranch || !waDate || !waTime} onClick={()=>setWaPreview(true)}>Preview WhatsApp message <ArrowRight size={15}/></button>
      </div> : <div className="whatsapp-panel-body"><p className="wa-message-preview">Hello Lumina Wax Bar! I’d like to request an appointment.<br/><br/><strong>Treatment:</strong> {waService}<br/><strong>Branch:</strong> {waBranch}<br/><strong>Preferred date:</strong> {waDate}<br/><strong>Preferred time:</strong> {waTime}<br/><br/>Please let me know if this time is available. Thank you!</p><p className="wa-demo-note">Demo preview only. The salon’s WhatsApp number will be added when the real website is built. This message has not been sent and no appointment has been saved.</p><button className="button button-dark button-full" onClick={()=>setWaPreview(false)}><ArrowLeft size={15}/> Edit details</button></div>}
    </section>}
  </main>;
}

function Dashboard({ onBack }) {
  const [tab, setTab] = useState('Overview');
  const [branch, setBranch] = useState('All branches');
  const [filter, setFilter] = useState('All');
  const filtered = sampleBookings.filter(b => (branch === 'All branches' || b.branch === branch) && (filter === 'All' || b.status === filter));
  return <main className="dashboard-page">
    <aside className="dashboard-sidebar"><a className="brand dashboard-brand" href="#dashboard"><span className="brand-mark"><Flower2 size={22}/></span><span>LUMINA<small>OWNER SPACE</small></span></a><div className="dashboard-label">WORKSPACE</div>{['Overview','Appointments','Customers','Payments'].map((t,i)=><button className={`side-link ${tab===t?'active':''}`} key={t} onClick={()=>setTab(t)}>{[<Sparkles size={17}/>,<CalendarDays size={17}/>,<Users size={17}/>,<Wallet size={17}/>][i]}{t}</button>)}<div className="sidebar-bottom"><div className="demo-pill"><span></span> Demo data</div><p>This is a visual preview. No customer records or payments are connected.</p><button className="back-site" onClick={onBack}><ArrowLeft size={16}/> Back to website</button></div></aside>
    <section className="dashboard-main"><header className="dashboard-topbar"><div><span className="dashboard-breadcrumb">LUMINA / OWNER SPACE</span><h1>{tab}</h1></div><button className="button button-dark" onClick={onBack}><ArrowLeft size={16}/> View website</button></header>
      <div className="dashboard-welcome"><div><div className="eyebrow">SUNDAY, 25 OCTOBER 2026 · SAMPLE VIEW</div><h2>A little overview<br/><em>of your day.</em></h2><p>Here’s a preview of the kind of information the live owner dashboard could show.</p></div><div className="welcome-mark"><Flower2 size={52}/></div></div>
      {tab==='Overview' ? <>
        <div className="metric-grid"><div className="metric-card"><span>Appointments today</span><strong>12</strong><small><CalendarDays size={14}/> Sample figure</small></div><div className="metric-card"><span>Awaiting confirmation</span><strong>3</strong><small><Clock3 size={14}/> Needs attention</small></div><div className="metric-card"><span>Customers this month</span><strong>86</strong><small><Users size={14}/> Sample figure</small></div><div className="metric-card"><span>Payments recorded</span><strong>KSh 48,500</strong><small><Wallet size={14}/> Sample figure</small></div></div>
        <div className="dashboard-panel"><div className="panel-heading"><div><h3>Today’s appointments</h3><p>Example schedule · not live data</p></div><button className="panel-link" onClick={()=>setTab('Appointments')}>View schedule <ArrowRight size={15}/></button></div><AppointmentTable rows={sampleBookings.slice(0,3)}/></div>
        <div className="dashboard-bottom-grid"><div className="dashboard-panel"><h3>Branch snapshot</h3><div className="branch-snapshot"><span className="snapshot-icon"><MapPin size={18}/></span><div><strong>CBD Branch</strong><small>7 sample appointments</small></div><b>7</b></div><div className="branch-snapshot"><span className="snapshot-icon"><MapPin size={18}/></span><div><strong>Kilimani Branch</strong><small>5 sample appointments</small></div><b>5</b></div></div><div className="dashboard-panel"><h3>Owner reminders</h3><div className="reminder"><span className="reminder-dot"></span><p><strong>Confirm pending requests</strong><small>3 sample appointments</small></p></div><div className="reminder"><span className="reminder-dot soft"></span><p><strong>Review branch schedule</strong><small>Check staffing and room availability</small></p></div></div></div>
      </> : <div className="dashboard-panel appointments-panel"><div className="panel-heading"><div><h3>{tab === 'Appointments' ? 'Appointment schedule' : tab === 'Customers' ? 'Customer overview' : 'Payment overview'}</h3><p>All information below is illustrative sample data.</p></div>{tab==='Appointments' && <select className="filter-select" value={branch} onChange={e=>setBranch(e.target.value)}><option>All branches</option>{branches.map(b=><option key={b.name}>{b.name}</option>)}</select>}</div>
        {tab==='Appointments' ? <><div className="filter-row">{['All','Confirmed','Pending'].map(f=><button key={f} className={`filter-chip ${filter===f?'selected':''}`} onClick={()=>setFilter(f)}>{f}</button>)}</div><AppointmentTable rows={filtered}/></> : tab==='Customers' ? <div className="empty-preview"><Users size={30}/><h3>Customer records preview</h3><p>A live version could list customer contact details, visit history, and appointment preferences once a secure backend is connected.</p></div> : <div className="empty-preview"><Wallet size={30}/><h3>Payment records preview</h3><p>A live version could show recorded payments, payment method, outstanding balances, and daily totals. No payments are processed in this demo.</p></div>}
      </div>}
      <p className="dashboard-disclaimer"><ShieldCheck size={15}/> Prototype only · Sample figures and appointments · No backend connected</p>
    </section>
  </main>;
}
function AppointmentTable({ rows }) {
  return <div className="table-scroll"><table className="appointment-table"><thead><tr><th>TIME</th><th>CUSTOMER</th><th>TREATMENT</th><th>BRANCH</th><th>STATUS</th></tr></thead><tbody>{rows.map((b,i)=><tr key={b.time+i}><td>{b.time}</td><td><strong>{b.name}</strong></td><td>{b.service}</td><td>{b.branch}</td><td><span className={`status status-${b.status.toLowerCase()}`}>{b.status}</span></td></tr>)}</tbody></table>{rows.length===0&&<p className="no-results">No sample appointments match these filters.</p>}</div>;
}

export default function App() {
  const [view, setView] = useState('site');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [prefill, setPrefill] = useState({service:'', branch:''});
  const openBooking = (service='', branch='') => { setPrefill({service, branch}); setBookingOpen(true); };
  return <>{view === 'site' ? <PublicSite openBooking={openBooking} openDashboard={()=>setView('dashboard')}/> : <Dashboard onBack={()=>setView('site')}/>}
    {bookingOpen && <BookingForm key={`${prefill.service}-${prefill.branch}`} onClose={()=>setBookingOpen(false)} initialService={prefill.service} initialBranch={prefill.branch}/>}
  </>;
}