---
name: ATB Tennis Academy
description: Courtside film, framed by a green clubhouse and an inviting first serve.
colors:
  forest: "#15392e"
  forest-deep: "#102e25"
  lime: "#d8f36a"
  lime-hover: "#e5fc91"
  paper: "#f4f5eb"
  white: "#fff"
  sage: "#e7ebdd"
  muted: "#536456"
  line: "#d2d8c8"
  light-text: "#c8d6c7"
  error: "#a52f25"
typography:
  wordmark:
    fontFamily: "ATBWordmark, Bricolage, sans-serif"
    fontSize: "32px"
    fontWeight: 400
    fontStyle: "normal"
    lineHeight: 0.95
  display:
    fontFamily: "Bricolage, Arial, sans-serif"
    fontSize: "clamp(64px,6.7vw,96px)"
    fontWeight: 650
    lineHeight: 0.99
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage, Arial, sans-serif"
    fontSize: "clamp(40px,4.4vw,64px)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Bricolage, Arial, sans-serif"
    fontSize: "clamp(26px,2.5vw,36px)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 750
    lineHeight: 1.3
rounded:
  control: "6px"
  panel: "12px"
  circle: "50%"
spacing:
  compact: "8px"
  small: "12px"
  regular: "16px"
  medium: "20px"
  inset: "24px"
  group: "28px"
  wide: "32px"
  mobile-section: "64px"
  section: "100px"
  gutter: "clamp(24px,4.4vw,72px)"
components:
  button-lime:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.forest}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
  button-lime-hover:
    backgroundColor: "{colors.lime-hover}"
  button-green:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
  text-link:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    padding: "7px 0"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    rounded: "{rounded.circle}"
    width: "48px"
    height: "48px"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    rounded: "{rounded.control}"
    padding: "13px 14px"
  time-option:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    rounded: "{rounded.control}"
  time-option-selected:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.paper}"
  booking-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.forest}"
    rounded: "{rounded.panel}"
    padding: "34px"
---

# Design System: ATB Tennis Academy

## Overview

**Creative North Star: "Courtside Film"**

The real ATB courts supply the atmosphere: clay, shade trees, outdoor light and players with a connection to the academy. A forest-green clubhouse frame and luminous tennis-green actions give these photographs a coherent home. Broad, closely set Bricolage headlines bring warmth and confidence; Manrope keeps the practical details clear.

Large photographic rectangles and generous section spacing alternate with quiet ruled lists and compact session controls. The result is cinematic in its imagery and direct in its interactions. Preserve the academy identity and the locally hosted, source-recorded imagery when extending this world.

**Key Characteristics:**
- Real court and athlete photography within gently rounded frames.
- Forest-green structure, ivory reading surfaces and selective lime emphasis.
- Broad expressive headlines paired with restrained practical text.
- Flat tonal layers, ruled lists and visible selection states.
- Short state transitions, a gentle photographic arrival, and one scroll-driven tennis sequence.

## Colors

The palette combines a shaded clubhouse green with tennis-green energy and warm, pale reading surfaces; the frontmatter records the source values from `src/styles.css`.

### Primary
- **Clubhouse Forest** (`forest`): primary text, masthead, booking-section ground, filled form actions and selected time options.
- **Deep Clubhouse** (`forest-deep`): footer and the underlying photographic ground.

### Secondary
- **Tennis Lime** (`lime`): main invitation buttons, selected date, short headline emphasis and the achievement note panel.
- **Lifted Lime** (`lime-hover`): the brighter hover state of lime buttons.

### Neutral
- **Court Ivory** (`paper`): page ground, planner, booking panel and text on forest surfaces.
- **Photographic White** (`white`): large text against the darkened hero image.
- **Soft Sage** (`sage`): alternating gallery and visit surfaces; unselected option hover.
- **Quiet Green** (`muted`): supporting copy, field help and inactive option text on pale surfaces.
- **Court Rule** (`line`): quiet dividers between programmes, fields and FAQ rows.
- **Pale Leaf** (`light-text`): supporting copy against forest backgrounds.
- **Clay Error** (`error`): invalid field borders and adjacent explanatory messages.

### Named Rules
**The Clubhouse Frame Rule.** Use forest for structure and readable text; use lime for invitations, selection and brief editorial emphasis.

## Typography

**Display Font:** Bricolage Grotesque, loaded locally under the family name `Bricolage`, with Arial and sans-serif fallbacks.
**Body Font:** Manrope, loaded locally, with Arial and sans-serif fallbacks.

**Character:** Bricolage's broad forms and tight heading tracking make the invitation feel confident and approachable. Manrope carries navigation, body copy and the denser booking controls without changing the visual voice.

### Hierarchy
- **Display:** the frontmatter display role is the desktop hero baseline. At the tablet breakpoint it uses `clamp(64px,7.6vw,85px)`; mobile uses `clamp(54px,11vw,76px)`, line height (1) and tracking (-0.035em), with a narrow-screen size (50px).
- **Headline:** the frontmatter headline role governs section headings. Mobile general headings use (43px); the booking invitation intentionally grows to (61px), then (55px) at the narrow breakpoint.
- **Title:** the frontmatter title role governs component headings, with local editorial sizes for programme, photo-caption and form headings.
- **Body:** the frontmatter body role is the paragraph baseline. Supporting content commonly steps down to (12–15px); the introductory statement steps up to (20px). These are role-specific sizes, not a mathematical modular scale.
- **Label:** the frontmatter label role describes the main buttons. Field labels use (12px), weight (750), and field values use (13px), weight (500). Navigation uses (13px), weight (600). Mobile controls use the smaller sizes already defined in the stylesheet.

### Named Rules
**The Two Voices Rule.** Use Bricolage for headings and the ATB wordmark; use Manrope for actions, explanation and form data.

## Layout

The main content container is centered with a maximum width (1440px) and the fluid gutter recorded in frontmatter. Section separation is generous, usually the section spacing token; mobile generally uses the mobile-section token. Related controls use compact gaps and larger groups use the medium through wide spacing steps.

Wide layouts favor paired image-and-copy columns rather than repeated boxed cards: programme content uses (1.05fr / 1fr), gallery uses (1.8fr / 1fr), booking uses (.85fr / 1.15fr), and the achievement row has three columns (1fr / 1fr / .92fr). Individual column ratios belong to their components rather than a universal grid.

At the tablet breakpoint (1100px maximum), navigation, image heights, panel padding and gaps tighten. At the mobile breakpoint (760px maximum), the main paired sections become one column, navigation becomes a toggled panel, and the planner moves from its anchored photographic position into normal flow. The achievement photographs remain paired while their lime note panel spans the row. Date and time controls retain seven- and three-column grids respectively. At the narrow breakpoint (360px maximum), gutters reduce to (20px). Large-screen adjustments begin at (1600px minimum), including a hero cap (1760px).

**The Readable Frame Rule.** Keep photographic subjects visible with `object-fit: cover`; use dark photographic scrims where light headline text overlays an image.

## Elevation & Depth

The built system has no box shadows. Depth comes from forest, ivory and sage planes, cropped photographs, quiet dividing rules and the dark hero scrim. The planner is visually layered through position and a pale solid surface, not a floating shadow.

The hero photograph arrives once over (1.4s) with easing `cubic-bezier(.16,1,.3,1)`, moving from scale (1.035) and brightness (.88) to its final frame. Buttons and links use short (0.2s) transitions; achievement imagery scales to (1.025) on hover over (0.45s). Reduced-motion preference removes animations and transitions and disables smooth scrolling.

**The Tonal Depth Rule.** Establish hierarchy with surface color, photographic contrast and rules; preserve the implemented shadow-free material.

## Shapes

Photographs and major panels use the panel radius token; standard fields, buttons and selectable date/time controls use the control radius. Circular outline arrows and circular photo links are the small geometric counterpoint. The planner has its own intermediate rounding (10px desktop, 8px mobile); these are component details rather than new global radius steps.

Dividers and control outlines are thin (1px). Programme selection uses a stronger lower rule (3px); service selection uses a lower rule (2px). This is a predominantly rectangular system with gently softened corners, not a collection of pills.

## Components

### Buttons
Confident, compact invitations with room for a stroke-drawn arrow.
- **Shape:** gently rounded controls, using the frontmatter radius and padding; base minimum height (52px), gap (22px).
- **Lime:** forest text on tennis lime; brighter lime on hover.
- **Green:** ivory text on forest; hover fill (`#24503d`).
- **Text action:** transparent, current-color lower rule, horizontal icon gap (16px); hover color (`#59732f`).
- **Circular action:** transparent ground, current-color (1px) outline, dimensions from frontmatter; forest fill and ivory text on hover.
- **States:** button/link arrows translate (2px, -1px) on hover. Keyboard focus uses a visible (3px) green outline (`#658c28`) offset (5px); radio-style options offset it (3px). Disabled buttons use opacity (.5) and a not-allowed cursor.

### Cards / Containers
Photo-led stories sit directly on the page with captions beneath. The booking container is an ivory panel on the forest section, with frontmatter panel shape and padding; padding reduces to (26px) on tablet and (23px 20px) on mobile. The lime achievement note panel uses the same major-panel corner vocabulary. No card shadow is present.

### Inputs / Fields
Quiet outlined fields retain native date, time and select affordances. Fields have transparent fill, a green-gray stroke (`#bfc8b5`), minimum height (48px) and the frontmatter control shape and inset. Hover strengthens the border (`#758567`); focus uses the shared visible outline. Invalid values pair the error border with a nearby text explanation. Textareas resize vertically. Labels and help remain outside the control.

### Selection Controls
Programme tabs are a ruled row with forest selected text and a stronger lower border; their arrows disappear on mobile. Service choices use a related two-column lower-rule treatment. Time choices use bordered rectangular tiles with forest/ivory selected state and sage hover; dates use a seven-column strip and lime selected state. Preserve the visible state together with the implemented `aria-selected`, `aria-pressed` or checked radio state.

### Navigation
An ATB identity group and a horizontal link row sit on the forest masthead (100px high). Link hover uses lime text and a lime lower rule. At mobile widths the masthead is (83px), a circular menu button replaces the row, and the opened forest panel stacks links and a full-width invitation below it. Escape closes the panel and returns focus to its toggle.

### Photographic Planner
The ivory planning strip spans the lower hero image on desktop with three labeled native controls and an action. Subtle rules divide controls. On mobile, it becomes a two-column form with purpose and action spanning the row. The small confirmation note stays next to the action context. Carrying these preferences into the detailed request form is part of this implemented component's behavior.

### FAQ Rows
Native disclosure rows use quiet upper/lower rules, generous click areas (74px minimum), bold Manrope questions and a stroke chevron that rotates (90deg) when open. Answers remain muted and comfortably spaced beneath the question.

## Do's and Don'ts

### Do:
- **Do** use the real, locally hosted academy photographs and preserve their subject through responsive cropping.
- **Do** pair broad Bricolage headings with Manrope controls and explanatory copy.
- **Do** use forest, ivory and sage planes to establish hierarchy, with lime reserved for the implemented emphasis roles.
- **Do** keep focus visible, selection explicit and reduced-motion behavior intact.
- **Do** stack paired content on mobile while keeping the booking controls usable within their compact grids.

### Don't:
- **Don't** add box shadows to the flat containers and photographic frames documented here.
- **Don't** replace the real academy imagery or identity with generic stock representations.
- **Don't** turn thin ruled programme, navigation or FAQ rows into unrelated pill or elevated-card systems.
- **Don't** treat the planner's exact desktop composition as a mandatory layout for every future surface.

## Tennis motion extension

The racquet-and-ball scene extends the courtside world with one focused WebGL sequence. The visitor scrolls through preparation, contact, and follow-through; stage selection, replay, and pause provide explicit control. Keep the sticky section within normal document scrolling. Render only when the pose changes, lazy-load the 3D module, and stop offscreen or hidden-tab rendering. Reduced motion uses discrete static poses. A locally hosted generic equipment still covers loading and unavailable WebGL. Shadows belong to the 3D objects; the page containers remain flat.

The motion heading has an intentionally local fluid size of 42–66px, 49px at intermediate widths, and 40px/35px on phones. Stage headings use 30px/24px; compact interaction labels use 9–13px according to role and viewport. The court-format title uses 29px/26px/24px. These are bounded component treatments, not changes to the primary page headline ramp. Quiet green rules and states use #6a8764, #547047, #6d875c, #3b5b42, #62845a, #28543b, #254e38, #375d38, #c3d6ae, #f0ebc8 and #6a8855 within the existing forest/lime palette.

The enhanced hero derives from the original academy photograph and retains its composition. Coaching programmes use separate academy training images. Gallery photographs are unique to that section. The former repeated side photograph becomes an interactive geometric singles/doubles court diagram, describing formats without implying available courts or inventory. Generated assets retain prompt sidecars; sourced photographs retain their origin register.

## Smooth navigation and transitions

Lenis wheel interpolation uses lerp 0.12 with native touch behavior. Lenis runs on the GSAP ticker and emits ScrollTrigger updates; CSS smooth scrolling is disabled while it owns the page. The native document remains the scroll surface, preserving the existing sticky 3D racquet sequence. No extra pinned regions or scroll locks are introduced.

The hero entrance is coordinated by a GSAP timeline with a 24px maximum text movement and visible starting opacity. The gallery frame opens from a shallow 4% inset to its full image while entering the viewport. The introduction's tennis-ball icon turns through 70 degrees over the section's travel. Tab and gallery selections use 380ms transitions, 12px displacement, and visible starting opacity. Match-media cleanup restores static content for reduced motion; failed scripts retain readable content.

## Client handoff layout and continuous ball

This extension supersedes the earlier isolated racquet replay treatment. The same travelling ball moves from the hero through the introduction, meets the racquet's projected 3D contact point, then continues along the outer gutter through every following section and the footer. The racquet and ball derive poses directly from native scroll position. Upward scrolling reverses the complete sequence, without a timed replay or separate local smoothing. Chapter controls scroll to their corresponding poses. A fixed Pause ball control removes the travelling ball and holds the racquet at contact; reduced-motion preference bypasses the journey. The decorative canvas has no pointer events, sits inside a clipped viewport layer, and cannot expand page width.

Coaching now uses a 176px desktop programme sidebar and paired photo/copy content, with horizontal tabs below 761px. Both horizontal and vertical arrow keys work; aria-orientation follows the breakpoint. The introduction tightens to 64px desktop / 48px mobile. The sage gallery uses an inset 18px frame (12px mobile), a prominent photograph and a compact court-format component. Player results occupy two evidence columns; the lime historical summary spans beneath. Booking copy stays sticky beside the form on desktop and returns to normal flow on phones. Section rhythm alternates 64px and 80px desktop insets and 48px/56px mobile insets. Local type sizes from 10–50px inherit the existing Bricolage/Manrope hierarchy; they are intentional component roles rather than new global tokens. Two quiet green rule tones continue the established palette.

Academy films sit after achievements and before booking. Three portrait practice clips use native controls, local poster frames and no autoplay. The central film is offset 40px on desktop; a horizontally scrollable film strip preserves the native portrait shape on phones. Originals are user-supplied Drive files; local web exports remove audio and retain the full visual clip. Poster frames are extracted from those same originals. Offscreen/hidden-page videos pause, and starting a clip pauses the others.

## Side-to-side bounce correction

The travelling ball now alternates between left and right side waypoints after the racquet, replacing the single-gutter route. Side margins are 56px on ordinary desktop viewports and 30px on phones, clear of the scrollbar. Lateral velocity reflects at each waypoint; a shallow parabolic lift and brief horizontal compression express each collision. Scroll position still determines all poses, so upward scrolling retraces the same bounce path. Racquet projection and pause/reduced-motion behavior are preserved.

Focused browser verification: at scrollY2711.2, ball centerx1097; at3287.2, x510; at3863.2, x418 after crossing the left wall; reversing returned to3287.2 and the identical transform. At the gallery waypoint scrollY3578.4, centerx56 with visible compression. Production build passed. The final screenshot is .impeccable/review/delivery/ball-left-bounce.jpg.

## Stronger editorial transitions

The hero headline now enters in three masked lines, with a 110% vertical travel, slight skew and 130ms stagger. It waits for local fonts and replays when the visitor returns from below. Supporting copy and the preference strip follow in the same timeline. The court photograph opens with a restrained scale push.

Coaching photography opens horizontally from a22% frame inset. Gallery photography opens vertically from16% top/bottom insets while its photograph moves from1.14 scale to1. Achievement photographs have a paired, offset frame reveal; the visit photograph has a short push-in. Gallery captions and programme/photo selection have more visible short transitions.

Academy films enter as a group with70px travel, shallow perspective tilt,0.93 starting scale, visible0.3 starting opacity and130ms stagger. The film introduction has its own masked headline. The tennis section introduces its text, canvas frame, narrative and controls in a coordinated entrance. Its contact geometry is not transformed, preserving ball projection. The geometric singles/doubles court draws its boundary lines as it enters.

All scroll entrances live in the existing GSAP media context, reverse above their entrance threshold and revert under reduced motion. The layout remains static and readable without scripting. Native media controls and the ball journey keep their existing behavior. The section effects do not add pins or autoplay.

## Brand, founder and gallery release

The user-approved display wordmark is now ATB Academy. Preserve the authentic logo image and use the locally hosted Barlow Condensed ExtraBold Italic face under ATBWordmark for this wordmark only. The logo is84px desktop,76px tablet and64px phone (56px narrow). Wordmark lettering scales from60px to43px for ATB and34px to25px for Academy, with a compact Manrope strapline. The masthead collapses navigation below1101px to preserve space. The new typeface is a requested brand addition, resolving the detector's font warning; its SIL Open Font License is bundled.

Founder profiles appear immediately after the hero in a heading/portrait/biography composition. With no confirmed founder assets or claims, an explicitly marked portrait space and forthcoming-profile copy remain. Content lives in src/academy-content.js and accepts multiple profiles. Never substitute an athlete photograph for the founder.

The landing page gallery shows four simultaneous images in a four-column desktop/two-column mobile grid, with View More links to gallery.html. Tournaments and dated player evidence move to the separate gallery page. That page groups five academy photos, four practice photos, an event photo and two player-result images. Native dialog enlargement supports Escape and restores focus to the opening photograph. The gallery page has no homepage ball or booking form mounted; its booking actions point back to the homepage. Both HTML entries build as real static pages for Netlify Drop, without a client router or required fallback rewrite.

New component type sizes6–60px, the gallery display size54–96px, quiet green rule/highlight colors and the dark lightbox scrim are intentional local treatments. All other typography and the forest/ivory/lime world stay consistent with the established direction.

## Compact light navbar refinement

The navbar is now a white, quietly outlined inset frame above the hero, replacing the full-width forest masthead. It uses forest text, soft sage navigation hover/current states and a solid forest booking action. Height100px desktop /92px tablet /84px phone. The ATB wordmark decreases from60px to44px desktop and48px to37px phone; Academy decreases from34px to25px desktop and28px to21px phone. The authentic logo remains prominent at76px desktop /58px phone. At tablet/phone widths the menu opens in a matching white bordered panel; the44px toggle has explicit high-contrast hover styling. Both HTML pages share this header.

## Navbar font replacement

The navbar wordmark now uses locally hosted Russo One (upright, weight400) instead of Barlow Condensed italic. ATB uses32px desktop /28px phone; ACADEMY uses18px desktop /16px phone. Navigation labels use Bricolage. Runtime confirmed the replacement font loaded and computed font-style normal; current screenshot is .impeccable/review/navbar/new-font.jpg. SIL Open Font License bundled.


## Founder and programs release — 7 November 2026

This release supersedes the earlier placeholder and two-page delivery notes. The user has now confirmed founder Mohit Mayur Jayaprakash and supplied two photographs plus his professional profile PDF. The homepage founder section contains the supplied biography facts, historical career rankings and both WebP photos in an opacity crossfade with manual controls, pause, offscreen/hidden suspension and reduced-motion handling. The source PDF stays outside the public build.

The website now has three static entries: index.html, gallery.html and programs.html. Programs preserves the existing paper/forest courtside identity and six supplied program names/audiences, with an index and alternating image/text sections that stack on mobile. Each program links to a preselected coaching enquiry on the homepage. Batch times, fees and actual availability require team confirmation. Tournaments remain in the gallery. This is an ordinary content extension; existing tokens, typography, brand and motion authority remain in force.


## Seven programs and WhatsApp-only requests — 7 November 2026

Supersedes the earlier three generic coaching tabs, six-program count, session/time choices and program-to-booking selections. The homepage now names all seven programs with short audiences and individual links to programs.html anchors. Beginner is a separate program with no invented age range. The full program page includes relevant player/training images; empty-court program images have been replaced. Red Ball, Adults and Women’s use original source photographs matching the supplied reference (native originals 8192×5464, 4032×3024 and 4032×3024), optimized to 2000px-wide WebP. They are labelled illustrative, with public photo credits; the other four are academy training photographs.

Slot booking now asks only for preferred date, name, 1–4 players and optional notes. No session-type selector, program selector, fixed times or review step. Send the Request validates the form and synchronously opens a correctly URL-encoded WhatsApp draft for +91 91873 08508. The visitor sends the message in WhatsApp; the academy confirms availability. An on-page reopen link handles a blocked or closed WhatsApp tab. Program enquiries are separate prefilled WhatsApp links containing the program name.

The user explicitly deferred Excel/sheet integration during this turn. No capture endpoint, Netlify Forms, database, workbook connection or background submission remains in the final build. There is no claim that a request or WhatsApp message was sent automatically. Existing founder slideshow, gallery/tournaments, videos and scroll motion are retained.


## Indian-context imagery correction — 7 November 2026

Supersedes the earlier overseas reference-image choices. Red Ball now uses a sourced Bengaluru junior red-ball stroke photo; Intermediate uses a different player performing a two-handed backhand, distinct from Green Dot’s ATB girl practising on clay. Adults and Women’s now use two original, separate AI-generated Indian recreational coaching illustrations, clearly captioned as such. These depict no identified real person and make no ATB staff/student/premises claim. Image prompts and exact source origins are in research/india-program-images.json and public photo-credits.html. The three overseas program files have been removed from public assets. The homepage preview also uses the new Indian Red Ball photo. All seven programs have unique image files. Layout, WhatsApp-only booking, founder section and animations are preserved.


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


Gallery component typography uses bounded local roles within the existing hierarchy: arrival52–76px desktop and44–60px phone; collection30–42px; invitation38–58px; photo titles20px desktop/16px phone; filters13px desktop/11px phone; captions/counts10–12px; viewer24px desktop/20px phone; archive summary24px desktop/21px phone. Supporting13px/15px copy and the existing12px text-action role are retained. Detector font advisories arise from its narrower frontmatter ramp, not a new font family or a global scale replacement. Gallery olive #587032 is the prior gallery heading tone; #6a8764 is the existing rally control stroke. The component-local #375348 quiet divider separates the forest viewer header/footer without changing the brand palette. These are intentional gallery roles; no unrelated tokens or pre-existing design drift are repaired.

Client result captions use the existing forest text color and supporting13px desktop/12px phone role beneath achievement names. Category labels retain their quieter styling. Mohit’s role/navigation copy is Mentor; composition, imagery and motion are unchanged.

The photo-polish extension retains that composition and typography. Gallery filters are now All Pictures, Academy Pictures and Achievements; the last filter spans the phone dock’s second row. Tournament photographs sit within Academy Pictures. Photographic corrections remain natural and non-generative: gentle shadow exposure and edge-limited sharpening, without grading away the original light or altering people. Responsive photographic sources include 4K-sized full views while the collection uses preview-size candidates. The Adults program’s supplied rally photograph uses70% vertical object positioning, contrasting action with the existing women’s coaching composition.

Academy introduction: a broad community photograph leads above the existing two-column heading/copy arrangement, with32px separation and48px vertical section padding. Desktop image height is clamped280–520px around46dvh with70% vertical object positioning to retain the group; mobile uses the complete16:9 frame,24px groups and32px padding. Existing forest/paper typography stays in place:51px maximum heading,17px leading copy and13px supporting copy; mobile heading30–39px and16px leading copy. The inherited ball icon sits beside the heading. A single clipped photo reveal plus supporting-copy entrance uses expo.out and visible defaults, disabled under reduced motion. No text overlays faces. Red Ball and Green Dot keep their image hierarchy and distinctive ball cues but now show reference-matched earthen clay rather than painted hard court.

Adults card image update: the client-selected five-person photograph uses50%90% object positioning within the same4:3 program frame on both grids. This removes excess sky while retaining the five members. No typography, layout, motion or program copy changes accompany this swap.

Spacing correction: ordinary Home/Programs/Gallery sections follow content height. Remove the earlier uniform screen-height minimum and boundary-settling behavior; only the photographic hero and animated tennis stage retain viewport sizing. Short content is top-aligned with intentional padding, not padded to a full screen. Major homepage/guidance sections use64px desktop/40px phone spacing; community introduction keeps48px/32px. Existing type, palette and photo-grid composition are preserved. Targeted gallery exposure correction for atb-04/atb-10 lifts dark court/foliage detail and restores restrained vibrance without changing scene content.
## Current fixed navbar — 11 November 2026

Shared navigation now remains fixed at16px desktop/12px phone with the established100px/92px/84px responsive heights and unchanged width, border, radius and Russo wordmark. Only its paper background is translucent:86% with14px backdrop blur,94% unsupported fallback, opaque for reduced-transparency preferences. Foreground remains solid. A matching spacer preserves arrival composition. Scroll margins share header clearance; Gallery filters sit below it, the photo dialog remains in the native top layer, and the tennis sticky stage uses the remaining viewport. Ordinary sections retain content height. See .impeccable/surfaces/fixed-navbar.md and its review evidence.

## Current scroll-aware navbar — 11 November 2026

Supersedes the fixed-navbar transparency treatment below. Retain fixed positioning and existing arrival spacing, geometry and branding, but hide the bar by translating it above the frame on downward scroll and reveal it on upward reversal. Header and menu backgrounds are solid paper, with no blur. Use240ms ease-out transform motion and no transition for reduced motion. Keep open menus and keyboard navigation visible; hidden header is inert. Gallery filter dock follows the visibility state at the matching transition speed. See .impeccable/surfaces/smart-navbar.md.

## Current justified gallery rows — 11 November 2026

Supersedes the mixed-span gallery grid. Consecutive photos form complete width-filling rows, with proportional columns based on native aspect ratios and equal photo height within each row. Up to3 photos at wide collection widths and2 at smaller widths; narrow images cause a smaller group. Final rows fill the same edges. Keep DOM/viewer order and natural photographs; no dense packing or regenerated imagery. Row gaps32px desktop/24px phone, column gaps24px/14px. Captions retain existing type/color roles. Archive Eshita caption now uses Eshita Sriyala and the AITA National Series U14 girls’ singles championship in Coimbatore. See .impeccable/surfaces/gallery-layout.md.

## Current combined FAQ and contact panel — 12 November 2026

The FAQ now has a photograph-backed contact panel on the left and the unchanged native disclosures on the right. Reuse courts-clay.jpg as a cover background under a78% forest scrim, with paper text and the established lime directions CTA. Keep address/landmark and exact phone/email destinations. Panel padding32px desktop/28px24px phone; column ratio1:1.1, gap48px desktop/32px phone; mobile stacks naturally. The standalone See you at the courts section is removed. #visit targets this panel. Typography, imagery and site identity remain; this is a local composition change, not a token/system refresh.

