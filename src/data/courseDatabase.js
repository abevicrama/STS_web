/**
 * PST Department — Course Database
 * Sabaragamuwa University of Sri Lanka
 *
 * Code structure: PST [Y][S][C][NN]
 *   Y  = Year (1–4)
 *   S  = Semester (1 or 2)
 *   C  = Credits (single digit)
 *   NN = 2-digit subject number
 *
 * Example: PST 21201 → Year 2, Semester 1, 2 credits, subject 01
 *
 * nonGpa: true → excluded from GPA calculation (English / soft-skill courses)
 *
 * EDIT THIS FILE to add or correct courses from the handbook PDF.
 */

export const COURSE_DB = {
    /* ========== YEAR 1 — SEMESTER 1 ========== */
    'PST 11201': { title: 'Mechanics and Properties of Matter', credits: 2, nonGpa: false },
    'PST 11202': { title: 'Introduction to Electricity and Magnetism', credits: 2, nonGpa: false },
    'PST 11103': { title: 'Physics Laboratory 1-I', credits: 1, nonGpa: false },
    'PST 11204': { title: 'General Chemistry', credits: 2, nonGpa: false },
    'PST 11205': { title: 'Fundamentals of Organic Chemistry', credits: 2, nonGpa: false },
    'PST 11106': { title: 'Inorganic Chemistry Laboratory I', credits: 1, nonGpa: false },
    'PST 11107': { title: 'Structured Programming', credits: 1, nonGpa: false },
    'PST 11208': { title: 'Computer Hardware and Software', credits: 2, nonGpa: false },
    'PST 11109': { title: 'Computer Laboratory 1-I', credits: 1, nonGpa: false },
    'PST 11210': { title: 'Calculus and Differential Equations', credits: 2, nonGpa: false },
    'PST-EGP-1101': { title: 'General English I', credits: 2, nonGpa: true },

    /* ========== YEAR 1 — SEMESTER 2 ========== */
    'PST 12201': { title: 'Physics of Heat and Waves', credits: 2, nonGpa: false },
    'PST 12102': { title: 'Semi-Conductor Physics', credits: 1, nonGpa: false },
    'PST 12103': { title: 'AC Theory & Circuits', credits: 1, nonGpa: false },
    'PST 12104': { title: 'Physics Laboratory 1-II', credits: 1, nonGpa: false },
    'PST 12205': { title: 'Fundamentals of Physical Chemistry', credits: 2, nonGpa: false },
    'PST 12206': { title: 'Fundamentals of Analytical Chemistry', credits: 2, nonGpa: false },
    'PST 12107': { title: 'Organic Chemistry Laboratory I', credits: 1, nonGpa: false },
    'PST 12108': { title: 'Object Oriented Programming', credits: 1, nonGpa: false },
    'PST 12209': { title: 'Fundamentals of Statistics', credits: 2, nonGpa: false },
    'PST 12110': { title: 'Computer Laboratory 1-II', credits: 1, nonGpa: false },
    'PST 12211': { title: 'Database Management Systems', credits: 2, nonGpa: false },
    'PST-EGP-1201': { title: 'General English II', credits: 2, nonGpa: true },

    /* ========== YEAR 2 — SEMESTER 1 ========== */
    'PST 21201': { title: 'Electronics', credits: 2, nonGpa: false },
    'PST 21202': { title: 'Geometrical and Physical Optics', credits: 2, nonGpa: false },
    'PST 21103': { title: 'Physics Laboratory 2-I', credits: 1, nonGpa: false },
    'PST 21204': { title: 'Organic Chemistry', credits: 2, nonGpa: false },
    'PST 21205': { title: 'Industrial Chemistry and Technology I (Organic)', credits: 2, nonGpa: false },
    'PST 21106': { title: 'Organic Chemistry Laboratory II', credits: 1, nonGpa: false },
    'PST 21207': { title: 'Data Structures & Algorithms', credits: 2, nonGpa: false },
    'PST 21208': { title: 'Computer Architecture and Assembly Language', credits: 2, nonGpa: false },
    'PST 21209': { title: 'Statistics for Experimental Analysis', credits: 2, nonGpa: false },
    'PST 21110': { title: 'Computer Laboratory 2-I', credits: 1, nonGpa: false },
    'PST 21111': { title: 'Physical Chemistry Laboratory I', credits: 1, nonGpa: false },
    'PST-EAP-2101': { title: 'Academic English I', credits: 2, nonGpa: true },

    /* ========== YEAR 2 — SEMESTER 2 ========== */
    'PST 22201': { title: 'Physics of Electromagnetic Radiation and Introduction to Laser', credits: 2, nonGpa: false },
    'PST 22202': { title: 'Quantum Physics, Atomic & Nuclear Physics', credits: 2, nonGpa: false },
    'PST 22103': { title: 'Physics Laboratory 2-II', credits: 1, nonGpa: false },
    'PST 22204': { title: 'Chemistry of Elements', credits: 2, nonGpa: false },
    'PST 22205': { title: 'Physical Chemistry', credits: 2, nonGpa: false },
    'PST 22106': { title: 'Inorganic Chemistry Laboratory II', credits: 1, nonGpa: false },
    'PST 22107': { title: 'Analytical Chemistry Laboratory I', credits: 1, nonGpa: false },
    'PST 22208': { title: 'Software Engineering', credits: 2, nonGpa: false },
    'PST 22209': { title: 'Statistical Methodology', credits: 2, nonGpa: false },
    'PST 22110': { title: 'Computer Laboratory 2-II', credits: 1, nonGpa: false },
    'PST 22211': { title: 'Operating Systems', credits: 2, nonGpa: false },
    'PST 22112': { title: 'Leadership and Communication', credits: 1, nonGpa: false },
    'PST 22213': { title: 'Biology for Physical Sciences', credits: 2, nonGpa: false },
    'PST 22114': { title: 'Soft Skill Development', credits: 1, nonGpa: false },
    'PST 22215': { title: 'Mathematical Methods', credits: 2, nonGpa: false },
    'PST 22116': { title: 'Introduction to Astronomy', credits: 1, nonGpa: false },
    'PST 22217': { title: 'Industrial Metrology', credits: 2, nonGpa: false },
    'PST 22218': { title: 'Management Information Systems', credits: 2, nonGpa: false },
    'PST 22219': { title: 'Molecular Spectroscopy', credits: 2, nonGpa: false },
    'PST-EAP-2201': { title: 'Academic English II', credits: 2, nonGpa: true },

    /* ========== YEAR 3 — APPLIED PHYSICS (HONOURS) ========== */
    'PST 31201': { title: 'Solid State Physics', credits: 2, nonGpa: false },
    'PST 31202': { title: 'Nuclear Physics & Applications', credits: 2, nonGpa: false },
    'PST 31203': { title: 'Quantum Mechanics', credits: 2, nonGpa: false },
    'PST 31104': { title: 'Material Physics', credits: 1, nonGpa: false },
    'PST 31205': { title: 'Special Relativity', credits: 2, nonGpa: false },
    'PST 31206': { title: 'Optical Fiber & Telecommunication', credits: 2, nonGpa: false },
    'PST 31107': { title: 'Introduction to Nanotechnology', credits: 1, nonGpa: false },
    'PST 32201': { title: 'Statistical Physics', credits: 2, nonGpa: false },
    'PST 32104': { title: 'Advanced Electronics', credits: 1, nonGpa: false },
    'PST 32206': { title: 'Astrophysics', credits: 2, nonGpa: false },

    /* ========== YEAR 3 — CHEMICAL TECHNOLOGY (HONOURS) ========== */
    'PST 31216': { title: 'Biochemistry - I', credits: 2, nonGpa: false },
    'PST 31217': { title: 'Electroanalytical Techniques', credits: 2, nonGpa: false },
    'PST 31218': { title: 'Industrial Chemistry and Technology - II (Inorganic)', credits: 2, nonGpa: false },
    'PST 32214': { title: 'Chemistry of Drug Design and Drug Action', credits: 2, nonGpa: false },
    'PST 32215': { title: 'Polymer Chemistry & Technology', credits: 2, nonGpa: false },

    /* ========== YEAR 3 — COMPUTER SCIENCE & TECHNOLOGY (HONOURS) ========== */
    'PST 31224': { title: 'Artificial Intelligence & Expert Systems', credits: 2, nonGpa: false },
    'PST 31225': { title: 'Software Project Management', credits: 2, nonGpa: false },
    'PST 31227': { title: 'Object Oriented Analysis and Design', credits: 2, nonGpa: false },
    'PST 32224': { title: 'Artificial Neural Networks', credits: 2, nonGpa: false },
    'PST 32227': { title: 'Data Communication and Computer Networks', credits: 2, nonGpa: false },

    /* ========== YEAR 4 — COMMON ========== */
    'PST 41201': { title: 'Research Methodology and Scientific Communication', credits: 2, nonGpa: false },
    'PST 41215': { title: 'Industrial Management', credits: 2, nonGpa: false },

    /* ========== YEAR 4 — APPLIED PHYSICS ========== */
    'PST 41202': { title: 'Computational Physics', credits: 2, nonGpa: false },
    'PST 41203': { title: 'Robotics', credits: 2, nonGpa: false },
    'PST 41204': { title: 'Remote Sensing & GIS', credits: 2, nonGpa: false },
    'PST 42801': { title: 'Project Work (Industrial Exposure): BSc Thesis', credits: 8, nonGpa: false },

    /* ========== YEAR 4 — CHEMICAL TECHNOLOGY ========== */
    'PST 41217': { title: 'Natural Products Chemistry', credits: 2, nonGpa: false },
    'PST 41218': { title: 'Biotechnology', credits: 2, nonGpa: false },
    'PST 41221': { title: 'Instrumental Analysis', credits: 2, nonGpa: false },
    'PST 42804': { title: 'Project Work (Industrial Exposure): BSc Thesis', credits: 8, nonGpa: false },

    /* ========== YEAR 4 — COMPUTER SCIENCE & TECHNOLOGY ========== */
    'PST 41228': { title: 'Computer System Security', credits: 2, nonGpa: false },
    'PST 41230': { title: 'Internet of Things (IoT)', credits: 2, nonGpa: false },
    'PST 41232': { title: 'Cloud Computing', credits: 2, nonGpa: false },
    'PST 41805': { title: 'Project: BSc Thesis in Computer Science & Technology', credits: 8, nonGpa: false },
    'PST 42606': { title: 'Industrial Training', credits: 6, nonGpa: false },
};

/**
 * Parse a PST course code to extract year, semester, and credits.
 * Returns null if code doesn't match expected pattern.
 *
 * Supported formats:
 *   - "PST 12201" / "PST12201"    → Year 1, Sem 2, 2 credits
 *   - "PST-EGP-1101"              → Non-GPA English course
 *   - "PST-EAP-2201"              → Non-GPA English course
 */
export function parseCourseCode(raw) {
    if (!raw) return null;
    const code = raw.trim().toUpperCase().replace(/\s+/g, ' ');

    // English / Non-GPA pattern: PST-EGP-... or PST-EAP-...
    if (/PST[-]?(EGP|EAP)/i.test(code)) {
        const numMatch = code.match(/(\d)(\d)(\d+)$/);
        return {
            year: numMatch ? parseInt(numMatch[1]) : null,
            sem: numMatch ? parseInt(numMatch[2]) : null,
            credits: 2,
            nonGpa: true,
        };
    }

    // Standard pattern: PST[space]YNNCCC or PST YNNCCC
    const match = code.match(/PST\s?(\d)(\d)(\d)\d{2}$/);
    if (match) {
        return {
            year: parseInt(match[1]),
            sem: parseInt(match[2]),
            credits: parseInt(match[3]),
            nonGpa: false,
        };
    }

    return null;
}

/**
 * Normalise a code to the canonical form used in COURSE_DB.
 * E.g. "pst12201" → "PST 12201", "PSTEGP1101" → "PST-EGP-1101"
 */
export function normaliseCode(raw) {
    if (!raw) return raw;
    const up = raw.trim().toUpperCase().replace(/\s+/g, '');

    // English courses
    const egpMatch = up.match(/^PST[-]?(EGP|EAP)[-]?(\d+)$/);
    if (egpMatch) return `PST-${egpMatch[1]}-${egpMatch[2]}`;

    // Standard: PST + 5 digits
    const stdMatch = up.match(/^PST(\d{5})$/);
    if (stdMatch) return `PST ${stdMatch[1]}`;

    return raw.trim().toUpperCase();
}

/** Look up a course by code. Returns { title, credits, nonGpa } or null. */
export function lookupCourse(raw) {
    const key = normaliseCode(raw);
    return COURSE_DB[key] || null;
}
