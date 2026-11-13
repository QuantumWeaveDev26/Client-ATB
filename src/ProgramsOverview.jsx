import SiteIcon from './SiteIcon.jsx';
import ProgramGrid from './ProgramGrid.jsx';

export default function ProgramsOverview() {
  return <section id="coaching" className="coaching programs-overview section-wrap" aria-labelledby="coaching-heading">
    <div className="section-heading"><h2 id="coaching-heading">Our programs.</h2><div><p>From your first rally to your next competition.<br className="desktop-break" /> Find your place on court.</p><a className="text-link" href="/programs.html">Explore all programs<SiteIcon size={19} /></a></div></div>
    <ProgramGrid />
    
  </section>;
}
