# ATB Tennis Academy

<!-- impeccable:product-schema 1 -->

## Platform
web

## Stack
React with Vite, explicitly selected by the user on 6 November 2026. Design directly in code, then visually refine; the workflow preference is stored in `.impeccable/config.json`.

## Users
Parents exploring tennis coaching for school-age children, junior and competitive players, and adults seeking coaching or a court session in Yelahanka, Bengaluru.

## Product Purpose
A standalone landing page presenting the academy, coaching, real venue photographs, dated achievements, location and contacts. Visitors can explore coaching and choose a preferred date/time for a court-slot request.

## Operating Context
ATB Tennis Academy uses About The Best Tennis Academy on the supplied social profiles. Physical outdoor clay-court facility at 4J83+GJ, BSF Campus, Yelahanka, Bengaluru, Karnataka 560064. Existing KheloMore venue listing supports court hire. Real-time inventory and authorised booking integration have not been supplied.

## Capabilities and Constraints
Build the landing page locally; no deployment requested. Include responsive navigation, coaching details, photography, achievements and slot selection. Do not claim a slot is available or confirmed without a connected booking system. Let visitors review a request and explicitly open a prefilled WhatsApp enquiry; no message is sent automatically. Provide the existing booking-provider link. Current prices, court counts, duration, opening hours, cancellation terms, staff titles and inventory synchronisation are unresolved. No online course is requested.

## Brand Commitments
Preserve ATB / About The Best Tennis Academy identity and association with Yelahanka. Observed logo colors: black, yellow-green and orange/red. No original logo artwork or official font specification supplied. The user explicitly requested Impeccable design guidance and approved React/Vite with a code-first build.

## Evidence on Hand
`research/ATB-academy-research.md`, `research/source-register.json`, `research/asset-reference-inventory.json`, and the 165-post index. Academy posts substantiate all-age personalised coaching, technical drills, fitness, competitive results and hosted tournaments. Latest retrieved coaching phone: +91 9187308508. Published email: atbtennisacademy@gmail.com. No invented testimonials, player statistics, prices or outcome guarantees.

## Product Principles
- Make coaching and court-session actions easy to distinguish.
- Use real academy imagery and dated, attributed achievements.
- Keep slot requests honest about confirmation and price.
- Work clearly on a parent's or player's phone as well as a desktop.
- Keep internal research caveats in developer documentation except where a visitor needs them to make a decision.

## Gallery and founder extension

The user requested the ATB Academy display wordmark, larger authentic logo, a founder section directly below the hero, a four-photo homepage preview and a separate full gallery page. Founder identity/biography/portraits remain unconfirmed and use honest placeholders until supplied. Tournaments and achievements are grouped within the gallery page. The gallery is a real static HTML entry for Netlify Drop and uses the same source-grounded academy imagery.


## Founder and programs release — 7 November 2026

This release supersedes the earlier placeholder and two-page delivery notes. The user has now confirmed founder Mohit Mayur Jayaprakash and supplied two photographs plus his professional profile PDF. The homepage founder section contains the supplied biography facts, historical career rankings and both WebP photos in an opacity crossfade with manual controls, pause, offscreen/hidden suspension and reduced-motion handling. The source PDF stays outside the public build.

The website now has three static entries: index.html, gallery.html and programs.html. Programs preserves the existing paper/forest courtside identity and six supplied program names/audiences, with an index and alternating image/text sections that stack on mobile. Each program links to a preselected coaching enquiry on the homepage. Batch times, fees and actual availability require team confirmation. Tournaments remain in the gallery. This is an ordinary content extension; existing tokens, typography, brand and motion authority remain in force.


## Seven programs and WhatsApp-only requests — 7 November 2026

Supersedes the earlier three generic coaching tabs, six-program count, session/time choices and program-to-booking selections. The homepage now names all seven programs with short audiences and individual links to programs.html anchors. Beginner is a separate program with no invented age range. The full program page includes relevant player/training images; empty-court program images have been replaced. Red Ball, Adults and Women’s use original source photographs matching the supplied reference (native originals 8192×5464, 4032×3024 and 4032×3024), optimized to 2000px-wide WebP. They are labelled illustrative, with public photo credits; the other four are academy training photographs.

Slot booking now asks only for preferred date, name, 1–4 players and optional notes. No session-type selector, program selector, fixed times or review step. Send the Request validates the form and synchronously opens a correctly URL-encoded WhatsApp draft for +91 91873 08508. The visitor sends the message in WhatsApp; the academy confirms availability. An on-page reopen link handles a blocked or closed WhatsApp tab. Program enquiries are separate prefilled WhatsApp links containing the program name.

The user explicitly deferred Excel/sheet integration during this turn. No capture endpoint, Netlify Forms, database, workbook connection or background submission remains in the final build. There is no claim that a request or WhatsApp message was sent automatically. Existing founder slideshow, gallery/tournaments, videos and scroll motion are retained.


## Indian-context imagery correction — 7 November 2026

Supersedes the earlier overseas reference-image choices. Red Ball now uses a sourced Bengaluru junior red-ball stroke photo; Intermediate uses a different player performing a two-handed backhand, distinct from Green Dot’s ATB girl practising on clay. Adults and Women’s now use two original, separate AI-generated Indian recreational coaching illustrations, clearly captioned as such. These depict no identified real person and make no ATB staff/student/premises claim. Image prompts and exact source origins are in research/india-program-images.json and public photo-credits.html. The three overseas program files have been removed from public assets. The homepage preview also uses the new Indian Red Ball photo. All seven programs have unique image files. Layout, WhatsApp-only booking, founder section and animations are preserved.


## Arrival actions — 7 November 2026

The homepage hero now has Book a Trial and Explore Programs immediately below its introductory copy. Book a Trial opens a prefilled WhatsApp trial enquiry to the existing academy number; it makes no free-trial or confirmed-reservation claim. Explore Programs opens /programs.html. The buttons share the existing hero entrance animation and stack into two equal columns on mobile. The date planner and WhatsApp-only slot form remain available.


## Reference program grid — 7 November 2026

The user pinned the supplied two-column photo/name/audience reference. This supersedes the homepage’s single-photo/text directory and the Programs page’s alternating long sections. Both surfaces now share ProgramGrid.jsx: two equal columns at desktop and phone widths, 4:3 photos above bold names and short audiences, no enclosing panel boxes. Reference order is Red Ball, Green Dot, Intermediate, Junior Pro, Adults and Women’s, followed by Beginner in the last left cell.

Homepage cells link to each Programs-page anchor. Full-page cells keep long descriptions, focus lists and WhatsApp enquiry links in native expandable Program details, preserving the compact default view. Existing Indian-context imagery, explicit illustration captions and credits are retained. The photo entrance now measures each grid image independently; reduced-motion cleanup preserves visible content. Hero Book a Trial / Explore Programs, founder, gallery, videos and WhatsApp-only slot form remain as previously approved.


## Green Dot content and custom video controls — 7 November 2026

User explicitly removed visitor-facing image credits, program illustration notes and per-image captions. Both program grids now show only photo, name and audience; public/photo-credits.html is removed. Asset prompts/source provenance remain in research and metadata rather than in the client-facing interface.

Green Dot content now follows ITF Play and Stay Green Stage 1: full-court development with balls approximately 25% slower than standard yellow balls. The representative image shows a yellow ball with a visible green dot and a junior learner on a full-size court. It makes no new ATB age/schedule/price claim. See research/green-dot-program-research.md and research/program-media-update.json. Intermediate now shows a young adult practising a backhand, replacing the small-child image. Both replacements are distinct Indian-context generated program scenes, with provenance retained privately.

Each practice video now has one centered play/pause button over the frame. Native controls, playback/download menus and the direct-file fallback link are removed from the interface; this is not DRM or a claim that the underlying public MP4 cannot be obtained. The custom button supports click, touch and keyboard, updates from media events, provides loading/error feedback, restarts ended clips, pauses offscreen/hidden and pauses other clips when one starts. Playback remains user-initiated and silent. CSS transitions respect reduced motion.


## Viewport alignment and enhanced assets — 7 November 2026

Section navigation now uses zero offsets and zero anchor margins. Shared viewport-sections.css uses 100dvh with a 100vh fallback as the minimum content-safe section size, accounting for the header on each arrival screen. Short sections fill the screen; long founder biographies, program grids, galleries, mobile forms and expanded disclosures keep natural document height. This follows the user’s explicit priority to preserve content and the visual design over a rigid height. No overflow-y clipping or nested section scrollers are introduced. The existing long rally runway and reversible tennis motion remain; on short windows the sticky stage can scroll to its lower edge so its controls stay reachable. Near-boundary settling works with Lenis wheel scrolling and native touch/keyboard without trapping a gesture leaving a section. Form editing, dialogs, anchor actions, resized windows and reduced-motion handling retain control.

All 24 currently used photo assets (including generated program illustrations, equipment fallback and three video posters) have separate AI-enhanced exports under public/images/enhanced. The user explicitly selected AI reconstruction for extra detail. Original public/images files remain byte-for-byte unchanged; exports preserve exact dimensions, filenames, extensions and aspect ratios. This is reconstruction rather than a claim of pixel-identical details. The brand logo and MP4 video content were not changed. See research/image-enhancements/inventory.json, exports.json and enhancement-brief.md for hashes, provenance and the enhancement prompt policy. The website’s three entries consume the enhanced derivatives.


## Curated client photo gallery — 11 November 2026

Supersedes the earlier gallery’s plain albums and combined achievements/tournaments section. All 39 newly supplied photographs from the two ZIP archives and standalone attachment are included, alongside three preserved historical photos: 42 photographs total. Academy Pictures has26, Achievements11, Tournaments5. Counts derive from the data. New captions describe visible scenes without inventing identities, event names, dates or results. Existing sourced player/tournament notes remain in an expandable archive panel.

The gallery keeps the forest/ivory/lime palette, Bricolage/Manrope type and shared Russo wordmark/header. Its split photo-led arrival leads to sticky category buttons and a varied three-column desktop/two-column phone collection. Landscape images span two columns, without CSS dense placement or changed DOM order. This collection uses natural section heights and native document scrolling; gallery-only overrides remove unsuitable screen-height minimums. The homepage’s four-photo preview now uses supplied pictures and category links. Other pages’ viewport behavior, tennis/ball motion, programs, founder slideshow, custom video controls and WhatsApp-only booking are unchanged.

The native full-screen viewer keeps complete uncropped images and provides previous/next navigation, keyboard arrows, Escape, mobile swipe handling, count, focus return, scroll locking, safe-area padding and loading/retry feedback. Category links support the old academy-photos/training-photos/champions anchors. Reduced motion disables new entrance transitions.

Uploads are not AI-reconstructed. Original bytes remain unchanged in research/gallery-2026-11-11/originals; 960px thumbnail and up-to2000px full-view WebP exports use orientation-aware resizing/compression only, with source provenance embedded. See inventory.json and verification.json in that research directory.

## Client-confirmed mentor and result captions — 11 November 2026

The client changed Mohit Mayur Jayaprakash’s displayed role from Founder to Mentor. Shared navigation and slideshow accessibility labels now say mentor; existing fragment IDs remain stable. Five supplied WhatsApp screenshots identify nine achievement photographs (atb-30 through atb-38). Their names and results now replace generic scene titles, with result text beneath each photograph, in the full-screen viewer and in the relevant homepage preview. Supplied spellings Sehej Singh, Eshita Sriyala, Ruhi Singh, Hari, Oges Theyjo Jayprakash and Lakshya are retained. Tennis terminology is normalized to singles/doubles, U10/U14/U16/U18, J60/J100 and ₹1 lakh; no additional dates or achievements are inferred. Historical archive claims remain separate.

## Photo polish and gallery consolidation — 11 November 2026

The user moved all five tournament photographs into Academy Pictures and removed the separate tournament category. Counts are now All Pictures42, Academy Pictures31, Achievements11. The old #tournaments URL still opens Academy Pictures; no photo or supplied caption is removed. The Adults Tennis Program now uses supplied photograph atb-13, a player preparing a shot on ATB’s clay courts, with a lower crop position so the player stays visible. Women’s retains its distinct existing coaching image.

This pass explicitly prohibits generative reconstruction. All66 photographic/poster asset variants (39 supplied gallery photos,24 existing enhanced website assets,3 archive photos) receive conservative local Pillow lighting/contrast/color/sharpening and Lanczos resampling only. No new picture, invented detail, face/object/scene edit or crop is produced. Full views have a minimum3840px long edge, preserving larger originals; this is a 4K-sized export, not recovered native detail from low-resolution sources. Preview assets remain lighter. Responsive srcsets let the browser choose preview or full resolution. Video poster previews are enhanced; videos and logo remain unchanged. Original source photos remain untouched, with pre-edit website files backed up under research/photo-polish-2026-11-11/before. Input hashes, exact operations, dimensions, exports and provenance are recorded there. A separate66-image full-view ZIP accompanies the Netlify archive.

## Academy community image and clay program edits — 11 November 2026

The academy introduction now displays the exact group scene selected by the user (existing source atb-17, identified against the uploaded frame), using its higher-resolution original-derived preview/full candidates. It leads the section above the unchanged heading, two paragraphs and Find your starting point link. Desktop framing keeps the group visible; phones show the complete16:9 photograph. A short GSAP photo reveal and supporting-copy entrance are restricted to no-preference motion; static content stays visible. Existing section sizing, viewport settling and tennis motion are preserved.

The user subsequently and explicitly requested creating clay-ground versions of Red Ball and Green Dot program images. This is a scoped exception to the preceding non-generative enhancement request: only these two program scenes were edited with the built-in image_gen tool, replacing hard-court paint with orange-brown clay using actual ATB clay photograph atb-13 as material reference. Red/yellow and green-dot ball cues, players and composition remain recognizable. These are edited program illustrations, not newly asserted documentary photographs of ATB students. New versioned assets program-red-ball-clay.webp and program-green-dot-clay.webp replace the corresponding program sources on both pages. Earlier hard-court derivatives are retained privately under research/clay-program-update-2026-11-11/previous; raw originals remain untouched. Native generated sources, exact prompts, input references and exports are recorded there. Other images retain the preceding non-generative processing. The66-entry responsive manifest and full-photo ZIP now include the two clay versions instead of the old versions.

## Client-selected Adults group photograph — 11 November 2026

The client replaced the Adults program action shot with the newly supplied photograph of five adult members on the clay court. Both program grids share program-adults-group.webp with50%90% object positioning, retaining all five people within the existing landscape frame. Program text, links and layout remain unchanged. No generation or retouching was applied; original source bytes are retained under research/adults-group-2026-11-11, with preview/native4032px long-edge exports and provenance. The responsive manifest/full-photo archive now contains67 assets. The earlier action photograph remains in the academy gallery.

## Exposure and content-height spacing correction — 11 November 2026

The latest request supersedes the earlier full-screen-section preference for ordinary content. Main sections on all three pages now use content height, rather than a100vh/100dvh minimum; the Programs heading leads directly into the first photo row. Automatic section-boundary settling is removed from Home and Programs, so scrolling does not jump past compact sections. Lenis smooth scrolling, anchor destinations, hero framing and the intentional 3D tennis runway are preserved. Major short homepage sections/guidance use64px desktop/40px phone padding; the community-photo introduction retains its tighter48px/32px padding with no artificial vertical centering. Gallery sections retain their existing natural-height behavior.

The two specifically identified gallery photographs are atb-04 (shaded courts/net/balls) and atb-10 (court with resting dog). Their original photographs receive targeted luminance/shadow exposure, saturation and restrained contrast/edge correction, with the same framing, aspect and source dimensions. No generation or scene edits are used. Source hashes stay unchanged and pre-edit derivatives remain under research/exposure-spacing-2026-11-11/before. Both thumbnails and full views are updated; exact curves, image dimensions and a before/after comparison are recorded there. Existing67 responsive image entries, gallery counts and supplied result captions remain.
## Current fixed navigation refinement — 11 November 2026

The shared navbar stays fixed on Home, Programs and Gallery, with a slightly translucent paper background and solid logo/text. Its original arrival space is preserved. Section anchors, gallery filters, booking sidebar and tennis stage account for the responsive header clearance; mobile navigation remains scrollable within the available viewport. Existing content, photos, program layout and WhatsApp-only flow are unchanged. This supersedes earlier zero CSS anchor margins while keeping Lenis JavaScript offsets at zero.

## Current scroll-aware navigation — 11 November 2026

Supersedes the always-visible translucent header: the navbar hides during downward page scrolling and returns on a small upward reversal. Header and phone menu now use an entirely solid paper background. It stays visible at the top, while the phone menu is open and during keyboard navigation. Gallery filters move up into the freed space. All content and existing functionality remain.

## Current gallery layout/caption correction — 11 November 2026

Gallery uses complete justified photo rows instead of a mixed-span grid. Each row fills its width while preserving image proportions and source order; smaller widths use fewer photos per row. All42 photos and31 Academy/11 Achievement categories remain. Archive Eshita photo now names Eshita Sriyala and shows AITA National Series U14 girls’ singles champion · Coimbatore beneath the image and in its viewer. The banner is Under-14, not Under-19. No photos are regenerated or edited.

## Current FAQ/contact consolidation — 12 November 2026

The standalone visit/photo section is removed. Existing court photograph, address, directions, phone and email now belong to the FAQ section's left panel, with the photograph as its background. Six FAQ questions/answers remain on the right and stack below on mobile. #visit remains valid on the combined panel. No other pages or assets changed.

