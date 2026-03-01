export type Category = 'cs' | 'me';

export interface ProjectLink {
  github?: string;
  demo?: string;
  video?: string;
}

export interface Project {
  id: string;
  category: Category;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  bullets: string[];
  tech: string[];
  date?: string;
  images: string[];
  links?: ProjectLink;
}

// ---------------------------------------------------------------------------
// Placeholder image helper — swap these out with real assets when ready.
// Using placehold.co (a standard developer placeholder service).
// ---------------------------------------------------------------------------
const ph = (w: number, h: number, label: string, bg = '1e293b', fg = 'e2e8f0') =>
  `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(label)}&font=inter`;

// ---------------------------------------------------------------------------
// Project data
// ---------------------------------------------------------------------------
export const projects: Project[] = [
  // ── Computer Science ──────────────────────────────────────────────────────
  {
    id: 'steno-keyboard',
    category: 'cs',
    slug: 'stenography-keyboard',
    title: 'Stenography Keyboard',
    shortDescription:
      'Custom USB HID keyboard with nRF52840 firmware, hand-routed KiCad PCB, and 3D-printed enclosure.',
    longDescription:
      'A fully custom stenography keyboard designed from the ground up — from schematic capture and PCB fabrication to firmware development and physical assembly. The goal was to achieve professional-grade HID latency in a compact, self-contained device.',
    bullets: [
      'Designed a multi-layer PCB in KiCad: schematic capture, component placement, hand-routed traces, and DRC/ERC sign-off before sending to fab.',
      'Sourced and soldered all SMD and through-hole components; validated signal integrity with an oscilloscope and logic analyzer.',
      'Wrote nRF52840 firmware in C: event-driven key-matrix scanning with diode isolation to support full n-key rollover without ghosting.',
      'Optimized USB HID report loop to achieve ~3 ms end-to-end latency vs. ~20 ms on a serial-over-USB baseline, benchmarked over 200+ keystroke samples.',
      'Designed and 3D-printed a two-piece enclosure prototype with snap-fit tolerancing; iterated twice based on fitment and cable routing.',
      'Implemented non-blocking firmware architecture (no busy-waits) to keep the main loop deterministic and real-time safe.',
    ],
    tech: ['nRF52840', 'C', 'KiCad', 'USB HID', 'SolidWorks', '3D Printing', 'Oscilloscope', 'Logic Analyzer'],
    date: '2024',
    images: [
      ph(800, 500, 'PCB Layout — KiCad'),
      ph(800, 500, 'Assembled Board'),
      ph(800, 500, '3D Printed Enclosure'),
    ],
    links: {
      github: 'https://github.com/michaeltranfield',
    },
  },
  {
    id: 'esp32-messaging',
    category: 'cs',
    slug: 'esp32-remote-messaging',
    title: 'ESP32 Remote Messaging System',
    shortDescription:
      'WiFi-connected ESP32 device that receives server-routed messages and displays them on a 16×2 LCD with scrolling text.',
    longDescription:
      'An end-to-end IoT messaging pipeline: a web front-end posts text to an AWS-hosted server, which filters and routes messages to registered ESP32 devices. The device persists messages in EEPROM and lets the user cycle through them on a character LCD.',
    bullets: [
      'Provisioned an AWS EC2 instance and wrote a lightweight Node.js message-broker that receives POST requests from the web UI and routes them to registered device IDs.',
      'Built a React-based web textbox UI for composing and sending messages; deployed to S3 with CloudFront distribution.',
      'Implemented WiFi provisioning and HTTP polling on the ESP32 using the Arduino framework; device reconnects automatically on drop.',
      'Stored up to 16 messages in EEPROM with a circular-buffer layout to survive power cycles without an RTC or SD card.',
      'Wrote a smooth scrolling-text renderer for the 16×2 character LCD, driven by a non-blocking timer ISR.',
      'Added a hardware debounced push-button that cycles the display to the next queued message.',
    ],
    tech: ['ESP32', 'C++', 'Arduino', 'AWS EC2', 'Node.js', 'React', 'EEPROM', 'LCD', 'WiFi', 'HTTP'],
    date: '2023',
    images: [
      ph(800, 500, 'System Architecture'),
      ph(800, 500, 'ESP32 Hardware Setup'),
      ph(800, 500, 'Web UI'),
    ],
    links: {
      github: 'https://github.com/michaeltranfield',
    },
  },

  // ── Mechanical Engineering ────────────────────────────────────────────────
  {
    id: 'ninja-h2r',
    category: 'me',
    slug: 'kawasaki-ninja-h2r-cad',
    title: 'Kawasaki Ninja H2R — Full CAD Assembly',
    shortDescription:
      'High-fidelity parametric SolidWorks assembly of the Kawasaki Ninja H2R, including complex aerodynamic surface geometry.',
    longDescription:
      'A from-scratch SolidWorks recreation of the Kawasaki Ninja H2R supercharged motorcycle. The project focused on advanced surface modeling for the aerodynamic bodywork and correct assembly constraints across a multi-part hierarchy. Every major sub-assembly (frame, fairings, engine block silhouette, swingarm) was modeled as an independent part file and mated into a top-level assembly.',
    bullets: [
      'Broke the motorcycle into logical sub-assemblies (chassis, aerodynamic fairings, powertrain silhouette, suspension linkages) to keep the feature tree manageable.',
      'Used SolidWorks Surface tools (lofted surfaces, boundary surfaces, filled surfaces) to recreate the compound-curved fairings and the distinctive aerodynamic winglets.',
      'Applied parametric dimensions and design tables so key geometry (wheelbase, fairing height, wing chord) can be modified globally without rebuilding.',
      'Defined assembly mates (coincident, concentric, distance) to ensure correct DOF constraints; ran interference detection to verify no part overlaps.',
      'Referenced manufacturer drawings, press photos, and scaled 3-view blueprints to validate overall proportions against real-world dimensions.',
      'Rendered final assembly in SolidWorks Visualize for presentation-quality output.',
    ],
    tech: ['SolidWorks', 'Surface Modeling', 'Parametric Design', 'Assembly Mates', 'SolidWorks Visualize', 'Technical Drawing'],
    date: '2024',
    images: [
      ph(800, 500, 'Full Assembly — Isometric'),
      ph(800, 500, 'Fairing Surface Detail'),
      ph(800, 500, 'Frame Sub-Assembly'),
    ],
    links: {},
  },
  {
    id: 'me-placeholder',
    category: 'me',
    slug: 'mechanical-systems-coursework',
    title: 'Mechanical Systems Coursework Project (Placeholder)',
    shortDescription:
      'Placeholder — detailed project content coming soon. Covers stress analysis, material selection, and manufacturing review.',
    longDescription:
      'This entry is a placeholder for an upcoming mechanical systems project. It will include FEA results, a material selection rationale, and a manufacturing process review. Content will be updated when the project writeup is complete.',
    bullets: [
      'Performed static and dynamic stress analysis using FEA software.',
      'Evaluated material candidates against cost, weight, and fatigue life criteria.',
      'Prepared engineering drawings to ASME Y14.5 GD&T standards.',
      'Conducted manufacturing feasibility review for CNC machining and sheet-metal forming.',
    ],
    tech: ['ANSYS', 'SolidWorks', 'GD&T', 'FEA', 'Material Science'],
    date: '2024',
    images: [ph(800, 500, 'Placeholder — Coming Soon')],
    links: {},
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export const getProjectsByCategory = (cat: Category): Project[] =>
  projects.filter((p) => p.category === cat);

export const getProjectBySlug = (cat: Category, slug: string): Project | undefined =>
  projects.find((p) => p.category === cat && p.slug === slug);
