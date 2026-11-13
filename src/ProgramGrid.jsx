import QualityImage from './QualityImage.jsx';
import { ACADEMY_PROGRAMS } from './programs-data.js';
import SiteIcon from './SiteIcon.jsx';
import { whatsappUrl } from './booking.js';

const ORDER = ['red-ball', 'green-dot', 'intermediate', 'junior-pro', 'adults', 'women', 'beginner'];
const DISPLAY_PROGRAMS = ORDER.map(id => ACADEMY_PROGRAMS.find(program => program.id === id));

export default function ProgramGrid({ detailed = false }) {
  return <div className="program-grid">{DISPLAY_PROGRAMS.map(program => {
    const headingId = `${detailed ? 'program' : 'preview'}-${program.id}-heading`;
    const Heading = detailed ? 'h2' : 'h3';
    const summary = <><div className="program-card-photo program-photo-frame"><QualityImage src={program.image} alt={program.alt} width="900" height="675" loading="lazy" style={{ objectPosition: program.position || (program.id === 'red-ball' ? '50% 28%' : '50% 45%') }} /></div><div className="program-card-copy"><Heading id={headingId}>{program.name}</Heading><p className="program-card-audience">{program.audience}</p></div></>;
    return <article className="program-card" key={program.id} id={detailed ? program.id : undefined} tabIndex={detailed ? -1 : undefined} aria-labelledby={headingId}>
      {detailed ? summary : <a className="program-card-link" href={`/programs.html#${program.id}`}>{summary}</a>}
      {detailed && <details className="program-card-details"><summary>Program details<SiteIcon name="down" size={16} /></summary><div><p>{program.description}</p><ul>{program.focus.map(item => <li key={item}>{item}</li>)}</ul><a className="text-link" href={whatsappUrl(`Hello ATB Tennis Academy! I would like to know more about the ${program.name}. Please share current batches and fees.`)} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp<SiteIcon size={17} /></a></div></details>}
    </article>;
  })}</div>;
}
