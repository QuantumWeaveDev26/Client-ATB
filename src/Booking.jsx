import { useRef, useState } from 'react';
import SiteIcon from './SiteIcon.jsx';
import { addDays, buildRequestMessage, formatDate, indiaDate, validateRequest, whatsappUrl } from './booking.js';

function FieldError({ name, errors }) { return errors[name] ? <span className="field-error" id={`error-${name}`}>{errors[name]}</span> : null; }

export default function Booking({ request, setRequest, headingRef }) {
  const [errors, setErrors] = useState({});
  const [draft, setDraft] = useState('');
  const formRef = useRef(null);
  const today = indiaDate();
  const days = Array.from({ length: 7 }, (_, index) => addDays(today, index));
  const update = (name, value) => {
    setRequest(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: undefined }));
    setDraft('');
  };
  const submit = event => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const submitted = Object.fromEntries(fields.entries());
    const issues = validateRequest(submitted);
    setErrors(issues);
    if (Object.keys(issues).length) {
      requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus());
      return;
    }
    const url = whatsappUrl(buildRequestMessage(submitted));
    // Open within the submit gesture so no asynchronous work can block the draft.
    window.open(url, '_blank', 'noopener,noreferrer');
    setRequest(submitted); setDraft(url);

  };
  return <section id="booking" className="booking-section" aria-labelledby="booking-heading">
    <div className="section-wrap booking-layout"><div className="booking-intro"><h2 ref={headingRef} tabIndex="-1" id="booking-heading">Make time<br />for a<br /><span>good game.</span></h2><p>Pick a day.<br />Bring your people.</p><div className="booking-explainer"><SiteIcon name="calendar" size={24} /><p>Share your preferred date and player count. The academy will discuss availability and confirm the booking details with you on WhatsApp.</p></div></div>
      <div className="booking-form-area"><form ref={formRef} onSubmit={submit} noValidate>
        <h3>Request your slot</h3>
        <label className="field booking-date-field" htmlFor="booking-date">Preferred date<input id="booking-date" type="date" name="date" min={today} value={request.date} aria-invalid={!!errors.date} aria-describedby={errors.date ? 'error-date' : undefined} onChange={event => update('date', event.target.value)} required /><FieldError name="date" errors={errors} /></label>
        <div className="day-picker" role="group" aria-label="Quick date selection">{days.map((day, index) => { const d = new Date(`${day}T12:00:00Z`); return <button key={day} type="button" aria-pressed={request.date === day} aria-label={`${index === 0 ? 'Today, ' : ''}${formatDate(day)}`} onClick={() => update('date', day)}><span>{index === 0 ? 'Today' : new Intl.DateTimeFormat('en-IN', { weekday: 'short', timeZone: 'Asia/Kolkata' }).format(d)}</span><strong>{d.getUTCDate()}</strong></button>; })}</div>
        <div className="form-row"><label className="field" htmlFor="booking-name">Your name<input id="booking-name" name="name" autoComplete="name" placeholder="First and last name" value={request.name} maxLength="80" onChange={event => update('name', event.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'error-name' : undefined} required /><FieldError name="name" errors={errors} /></label><label className="field" htmlFor="booking-players">Players<select id="booking-players" name="players" value={request.players} onChange={event => update('players', event.target.value)} aria-invalid={!!errors.players} aria-describedby={errors.players ? 'error-players' : undefined}>{['1', '2', '3', '4'].map(value => <option key={value} value={value}>{value} {value === '1' ? 'player' : 'players'}</option>)}</select><FieldError name="players" errors={errors} /></label></div>
        <label className="field note-field" htmlFor="booking-notes">Anything we should know? <span>(optional)</span><textarea id="booking-notes" name="notes" placeholder="Share any extra details for your visit…" value={request.notes} maxLength="500" rows="3" onChange={event => update('notes', event.target.value)} aria-invalid={!!errors.notes} aria-describedby={errors.notes ? 'error-notes' : undefined} /><FieldError name="notes" errors={errors} /></label>
        {Object.keys(errors).some(key => errors[key]) && <p className="error-summary" role="alert">Please check the highlighted fields.</p>}
        <button type="submit" className="button button-green review-button">Send the Request<SiteIcon size={20} /></button><p className="form-privacy">Opens WhatsApp with your details filled in. Tap Send there to contact ATB. Your slot is confirmed by the academy.</p>
        {draft && <div className="booking-draft-status" role="status"><p>Continue in WhatsApp to send your request.</p><a className="text-link" href={draft} target="_blank" rel="noopener noreferrer">Open WhatsApp again<SiteIcon size={17} /></a></div>}
      </form></div>
    </div>
  </section>;
}
