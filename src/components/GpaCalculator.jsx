import React, { useState } from 'react';
import { Plus, Trash2, Info, AlertTriangle, CheckCircle, ChevronDown, BookOpen, Download } from 'lucide-react';
import { lookupCourse, parseCourseCode } from '../data/courseDatabase';
import './GpaCalculator.css';

// ============================================================
//  EDITABLE CONFIG — "EDIT THIS TO MATCH UNIVERSITY POLICY"
// ============================================================

/** Grade → Grade-Point mapping.
 *  EDIT THIS FROM THE HANDBOOK PDF to match official policy. */
const GRADE_POINTS = {
    'A+': 4.00,
    'A': 4.00,
    'A-': 3.70,
    'B+': 3.30,
    'B': 3.00,
    'B-': 2.70,
    'C+': 2.30,
    'C': 2.00,
    'C-': 1.70,
    'D+': 1.30,
    'D': 1.00,
    'E': 0.00,
    'F': 0.00,
    'NA': null,          // Incomplete / not graded — excluded from calc
};

/** Programs offered by the department. */
const PROGRAMS = [
    'Physical Sciences & Technology (PST)',
    'Applied Physics',
    'Chemical Technology',
    'Computer Science & Technology (CST)',
];

/** Semester labels. */
const SEMESTERS = [
    { id: 'Y1S1', label: 'Year 1 — Semester 1' },
    { id: 'Y1S2', label: 'Year 1 — Semester 2' },
    { id: 'Y2S1', label: 'Year 2 — Semester 1' },
    { id: 'Y2S2', label: 'Year 2 — Semester 2' },
    { id: 'Y3S1', label: 'Year 3 — Semester 1' },
    { id: 'Y3S2', label: 'Year 3 — Semester 2' },
    { id: 'Y4S1', label: 'Year 4 — Semester 1' },
    { id: 'Y4S2', label: 'Year 4 — Semester 2' },
];

/** Minimum GPA credits a student must earn per semester.
 *  EDIT THIS FROM THE HANDBOOK PDF. */
const MIN_GPA_CREDITS = {
    Y1S1: 16,
    Y1S2: 16,
    Y2S1: 16,
    Y2S2: 16,
    Y3S1: 16,
    Y3S2: 16,
    Y4S1: 16,
    Y4S2: 16,
};

/** Preset course rows per semester — sourced from courseDatabase.js.
 *  EDIT courseDatabase.js to add/correct courses from the handbook PDF. */
const PRESET_COURSES = {
    Y1S1: [
        { code: 'PST 11201', title: 'Mechanics and Properties of Matter', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 11202', title: 'Introduction to Electricity and Magnetism', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 11103', title: 'Physics Laboratory 1-I', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 11204', title: 'General Chemistry', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 11205', title: 'Fundamentals of Organic Chemistry', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 11106', title: 'Inorganic Chemistry Laboratory I', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 11107', title: 'Structured Programming', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 11208', title: 'Computer Hardware and Software', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 11109', title: 'Computer Laboratory 1-I', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 11210', title: 'Calculus and Differential Equations', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST-EGP-1101', title: 'General English I', credits: 2, grade: 'NA', nonGpa: true },
    ],
    Y1S2: [
        { code: 'PST 12201', title: 'Physics of Heat and Waves', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 12102', title: 'Semi-Conductor Physics', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 12103', title: 'AC Theory & Circuits', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 12104', title: 'Physics Laboratory 1-II', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 12205', title: 'Fundamentals of Physical Chemistry', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 12206', title: 'Fundamentals of Analytical Chemistry', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 12107', title: 'Organic Chemistry Laboratory I', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 12108', title: 'Object Oriented Programming', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 12209', title: 'Fundamentals of Statistics', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 12110', title: 'Computer Laboratory 1-II', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 12211', title: 'Database Management Systems', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST-EGP-1201', title: 'General English II', credits: 2, grade: 'NA', nonGpa: true },
    ],
    Y2S1: [
        { code: 'PST 21201', title: 'Electronics', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 21202', title: 'Geometrical and Physical Optics', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 21103', title: 'Physics Laboratory 2-I', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 21204', title: 'Organic Chemistry', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 21205', title: 'Industrial Chemistry and Technology I', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 21106', title: 'Organic Chemistry Laboratory II', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 21207', title: 'Data Structures & Algorithms', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 21208', title: 'Computer Architecture and Assembly Language', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 21209', title: 'Statistics for Experimental Analysis', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 21110', title: 'Computer Laboratory 2-I', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 21111', title: 'Physical Chemistry Laboratory I', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST-EAP-2101', title: 'Academic English I', credits: 2, grade: 'NA', nonGpa: true },
    ],
    Y2S2: [
        { code: 'PST 22201', title: 'Physics of EM Radiation and Laser', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 22202', title: 'Quantum Physics, Atomic & Nuclear Physics', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 22103', title: 'Physics Laboratory 2-II', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 22204', title: 'Chemistry of Elements', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 22205', title: 'Physical Chemistry', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 22106', title: 'Inorganic Chemistry Laboratory II', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 22107', title: 'Analytical Chemistry Laboratory I', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 22208', title: 'Software Engineering', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 22209', title: 'Statistical Methodology', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 22110', title: 'Computer Laboratory 2-II', credits: 1, grade: 'NA', nonGpa: false },
        { code: 'PST 22211', title: 'Operating Systems', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST 22215', title: 'Mathematical Methods', credits: 2, grade: 'NA', nonGpa: false },
        { code: 'PST-EAP-2201', title: 'Academic English II', credits: 2, grade: 'NA', nonGpa: true },
    ],
};

// ============================================================
//  HELPERS
// ============================================================

const uid = () => Math.random().toString(36).slice(2);

const blankRow = () => ({
    id: uid(), code: '', title: '', credits: '', grade: 'NA', nonGpa: false,
});

const loadPreset = semId =>
    (PRESET_COURSES[semId] || []).map(c => ({ ...c, id: uid() }));

// ============================================================
//  CALCULATION
// ============================================================

function calcSemester(courses) {
    let gpaCreds = 0, qualityPts = 0, nonGpaCreds = 0;
    courses.forEach(c => {
        const cr = parseFloat(c.credits);
        if (isNaN(cr) || cr <= 0) return;
        if (c.nonGpa) { nonGpaCreds += cr; return; }
        const gp = GRADE_POINTS[c.grade];
        if (gp === null || gp === undefined) return; // NA — pending
        gpaCreds += cr;
        qualityPts += cr * gp;
    });
    const sgpa = gpaCreds > 0 ? qualityPts / gpaCreds : null;
    return { gpaCreds, qualityPts, nonGpaCreds, sgpa };
}

function calcCGPA(semesters) {
    let totalGpaCreds = 0, totalQP = 0;
    semesters.forEach(s => {
        const { gpaCreds, qualityPts } = calcSemester(s.courses);
        totalGpaCreds += gpaCreds;
        totalQP += qualityPts;
    });
    const cgpa = totalGpaCreds > 0 ? totalQP / totalGpaCreds : null;
    return { totalGpaCreds, totalQP, cgpa };
}

// ============================================================
//  SUB-COMPONENTS
// ============================================================

const GradeSelect = ({ value, onChange }) => (
    <select className="gpc-select" value={value} onChange={e => onChange(e.target.value)}>
        {Object.keys(GRADE_POINTS).map(g => (
            <option key={g} value={g}>{g === 'NA' ? 'N/A (Pending)' : g}</option>
        ))}
    </select>
);

const CourseRow = ({ course, onUpdate, onRemove, onCodeCommit }) => {
    const gp = GRADE_POINTS[course.grade];
    const cr = parseFloat(course.credits);
    const qp = (!course.nonGpa && gp !== null && !isNaN(cr)) ? (cr * gp).toFixed(2) : '—';
    const found = course.code ? lookupCourse(course.code) : null;

    return (
        <div className={`gpc-row ${course.nonGpa ? 'is-non-gpa' : ''}`}>
            {/* Code input — auto-fill fires onBlur for smoother UX */}
            <div className="gpc-code-wrap">
                <input
                    className={`gpc-input ${found ? 'code-found' : (course.code ? 'code-unknown' : '')}`}
                    placeholder="e.g. PST 11201"
                    value={course.code}
                    onChange={e => onUpdate('code', e.target.value)}
                    onBlur={() => onCodeCommit(course.code)}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === 'Tab') onCodeCommit(course.code); }}
                />
                {course.code && (
                    <span className={`code-chip ${found ? 'chip-ok' : 'chip-miss'}`}>
                        {found ? '✓' : '?'}
                    </span>
                )}
            </div>
            <input
                className="gpc-input gpc-title-input"
                placeholder="Auto-filled from code"
                value={course.title}
                onChange={e => onUpdate('title', e.target.value)}
            />
            <input
                className="gpc-input gpc-credit-input"
                type="number" min="1" max="9" placeholder="Cr"
                value={course.credits}
                onChange={e => onUpdate('credits', e.target.value)}
            />
            <GradeSelect value={course.grade} onChange={v => onUpdate('grade', v)} />
            <span className="gpc-qp">{qp}</span>
            <label className="gpc-toggle" title="Non-GPA course">
                <input
                    type="checkbox"
                    checked={course.nonGpa}
                    onChange={e => onUpdate('nonGpa', e.target.checked)}
                />
                <span className="gpc-toggle-label">Non-GPA</span>
            </label>
            <button className="gpc-remove" onClick={onRemove}><Trash2 size={15} /></button>
        </div>
    );
};

// ============================================================
//  MAIN PAGE
// ============================================================

const GpaCalculator = () => {
    const [tab, setTab] = useState('sgpa');

    // --- SGPA state ---
    const [sgpaSem, setSgpaSem] = useState('Y1S1');
    const [sgpaCourses, setSgpaCourses] = useState(loadPreset('Y1S1'));

    // --- CGPA state: list of semester objects { semId, courses } ---
    const [cgpaSemesters, setCgpaSemesters] = useState([
        { id: uid(), semId: 'Y1S1', courses: loadPreset('Y1S1') },
    ]);

    const [showInfo, setShowInfo] = useState(false);

    // ---- SGPA handlers ----
    const loadSgpaPreset = semId => {
        setSgpaSem(semId);
        setSgpaCourses(loadPreset(semId).length ? loadPreset(semId) : [blankRow()]);
    };

    const updateSgpaCourse = (id, field, value) =>
        setSgpaCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));

    /** Called when user finishes typing a code — auto-fills title, credits, nonGpa */
    const commitSgpaCode = (id, code) => {
        const info = lookupCourse(code);
        if (info) {
            setSgpaCourses(prev => prev.map(c =>
                c.id === id ? {
                    ...c,
                    title: info.title,
                    credits: String(info.credits),
                    nonGpa: info.nonGpa,
                } : c
            ));
        } else {
            // Try to at least fill credits from code structure
            const parsed = parseCourseCode(code);
            if (parsed) {
                setSgpaCourses(prev => prev.map(c =>
                    c.id === id ? {
                        ...c,
                        credits: String(parsed.credits),
                        nonGpa: parsed.nonGpa,
                    } : c
                ));
            }
        }
    };

    const removeSgpaCourse = id =>
        setSgpaCourses(prev => prev.filter(c => c.id !== id));

    const addSgpaCourse = () =>
        setSgpaCourses(prev => [...prev, blankRow()]);

    // ---- CGPA handlers ----
    const addCgpaSemester = () =>
        setCgpaSemesters(prev => [...prev, { id: uid(), semId: 'Y1S1', courses: [blankRow()] }]);

    const removeCgpaSemester = id =>
        setCgpaSemesters(prev => prev.filter(s => s.id !== id));

    const updateCgpaSemId = (id, semId) =>
        setCgpaSemesters(prev => prev.map(s =>
            s.id === id ? { ...s, semId, courses: loadPreset(semId).length ? loadPreset(semId) : [blankRow()] } : s
        ));

    const addCgpaCourse = semId =>
        setCgpaSemesters(prev => prev.map(s =>
            s.id === semId ? { ...s, courses: [...s.courses, blankRow()] } : s
        ));

    const removeCgpaCourse = (semId, cId) =>
        setCgpaSemesters(prev => prev.map(s =>
            s.id === semId ? { ...s, courses: s.courses.filter(c => c.id !== cId) } : s
        ));

    const updateCgpaCourse = (semId, cId, field, value) =>
        setCgpaSemesters(prev => prev.map(s =>
            s.id === semId ? {
                ...s,
                courses: s.courses.map(c => c.id === cId ? { ...c, [field]: value } : c)
            } : s
        ));

    /** Auto-fill on code commit for CGPA tab */
    const commitCgpaCode = (semId, cId, code) => {
        const info = lookupCourse(code);
        const parsed = info ? null : parseCourseCode(code);
        setCgpaSemesters(prev => prev.map(s =>
            s.id === semId ? {
                ...s,
                courses: s.courses.map(c => {
                    if (c.id !== cId) return c;
                    if (info) return { ...c, title: info.title, credits: String(info.credits), nonGpa: info.nonGpa };
                    if (parsed) return { ...c, credits: String(parsed.credits), nonGpa: parsed.nonGpa };
                    return c;
                })
            } : s
        ));
    };

    // ---- Download result sheet ----
    const downloadReport = (mode) => {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
        const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        const semLabel = s => SEMESTERS.find(x => x.id === s)?.label || s;
        const gpColour = v => { if (v === null || isNaN(v)) return '#888'; if (v >= 3.7) return '#27ae60'; if (v >= 3.0) return '#2980b9'; if (v >= 2.0) return '#e67e22'; return '#c0392b'; };
        const fmt = v => (v !== null && !isNaN(v)) ? v.toFixed(2) : '\u2014';
        let bodyHtml = '', cgpaTotal = 0, cgpaCreds = 0;
        const semestersToRender = mode === 'sgpa'
            ? [{ semId: sgpaSem, courses: sgpaCourses }]
            : cgpaSemesters.map(s => ({ semId: s.semId, courses: s.courses }));
        semestersToRender.forEach(({ semId, courses }) => {
            const { gpaCreds, qualityPts, nonGpaCreds, sgpa } = calcSemester(courses);
            cgpaTotal += qualityPts; cgpaCreds += gpaCreds;
            const min = MIN_GPA_CREDITS[semId] ?? 0;
            const meets = gpaCreds >= min;
            const rows = courses.map(c => {
                const cr = parseFloat(c.credits) || 0;
                const gp = GRADE_POINTS[c.grade];
                const qp = (!c.nonGpa && gp !== null && !isNaN(cr)) ? (cr * gp).toFixed(2) : '\u2014';
                return `<tr ${c.nonGpa ? 'class="nongpa-row"' : ''}><td>${c.code || '\u2014'}</td><td>${c.title || '\u2014'}</td><td style="text-align:center">${cr || '\u2014'}</td><td style="text-align:center">${c.grade === 'NA' ? 'Pending' : c.grade}</td><td style="text-align:center">${qp}</td><td style="text-align:center">${c.nonGpa ? '<span class="badge-ng">Non-GPA</span>' : '<span class="badge-g">GPA</span>'}</td></tr>`;
            }).join('');
            bodyHtml += `<div class="sem-block"><h3>${semLabel(semId)}</h3><table><thead><tr><th>Code</th><th>Course Title</th><th>Credits</th><th>Grade</th><th>Quality Pts</th><th>Type</th></tr></thead><tbody>${rows}</tbody></table><div class="sem-summary"><span>GPA Credits: <b>${gpaCreds.toFixed(1)}</b></span><span>Non-GPA Credits: <b>${nonGpaCreds.toFixed(1)}</b></span><span>Quality Points: <b>${qualityPts.toFixed(2)}</b></span><span>SGPA: <b style="color:${gpColour(sgpa)}">${fmt(sgpa)}</b></span><span class="status ${meets ? 'ok' : 'warn'}">${meets ? '&#10003; Meets minimum GPA credits (' + min + ' required)' : '&#9888; Below minimum \u2014 need ' + min + ', earned ' + gpaCreds.toFixed(1)}</span></div></div>`;
        });
        const finalGpa = cgpaCreds > 0 ? cgpaTotal / cgpaCreds : null;
        const modeLabel = mode === 'sgpa' ? 'Semester GPA (SGPA)' : 'Cumulative GPA (CGPA)';
        const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>GPA Result Sheet</title><style>*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;font-size:13px;color:#1a1a2e;background:#f5f5f5}.wrapper{max-width:900px;margin:0 auto;background:#fff;box-shadow:0 0 20px rgba(0,0,0,.12)}header{background:linear-gradient(135deg,#1a1a2e,#16213e);color:#fff;padding:28px 36px}header h1{font-size:1.6rem}header .sub{font-size:.9rem;opacity:.7;margin-top:4px}header .meta{margin-top:14px;font-size:.82rem;opacity:.6}.content{padding:28px 36px}.sem-block{margin-bottom:32px}.sem-block h3{font-size:1rem;color:#16213e;border-bottom:2px solid #e0e7ff;padding-bottom:6px;margin-bottom:12px}table{width:100%;border-collapse:collapse;font-size:.88rem}th{background:#f0f4ff;color:#2c3e50;font-weight:600;padding:9px 10px;text-align:left;border-bottom:2px solid #dce3f5}td{padding:8px 10px;border-bottom:1px solid #eef0f8;vertical-align:middle}tr.nongpa-row{opacity:.6;background:#fafafa}tr:last-child td{border-bottom:none}.badge-g{background:#e8f5e9;color:#27ae60;padding:2px 7px;border-radius:20px;font-size:.75rem;font-weight:600}.badge-ng{background:#f3f3f3;color:#888;padding:2px 7px;border-radius:20px;font-size:.75rem;font-weight:600}.sem-summary{display:flex;flex-wrap:wrap;gap:14px;margin-top:12px;background:#f8faff;border-radius:8px;padding:12px 16px;font-size:.88rem}.status{flex-basis:100%;font-weight:600}.status.ok{color:#27ae60}.status.warn{color:#c0392b}.final-box{background:linear-gradient(135deg,#e8f5e9,#e3f2fd);border-radius:12px;padding:24px 28px;margin-top:24px;display:flex;align-items:center;gap:32px}.final-box .label{font-size:.85rem;text-transform:uppercase;letter-spacing:.6px;color:#555}.final-box .value{font-size:3.2rem;font-weight:900;line-height:1}.final-box .stats{font-size:.85rem;color:#555;display:flex;flex-direction:column;gap:4px}footer{text-align:center;padding:14px;font-size:.75rem;color:#999;border-top:1px solid #eee}@media print{body{background:#fff}.wrapper{box-shadow:none}}</style></head><body><div class="wrapper"><header><h1>GPA Result Sheet</h1><div class="sub">Department of Physical Sciences &amp; Technology &mdash; Sabaragamuwa University of Sri Lanka</div><div class="meta">Generated: ${dateStr} at ${timeStr} &nbsp;|&nbsp; Mode: ${modeLabel}</div></header><div class="content">${bodyHtml}<div class="final-box"><div><div class="label">${mode === 'sgpa' ? 'SGPA' : 'CGPA'}</div><div class="value" style="color:${gpColour(finalGpa)}">${fmt(finalGpa)}</div></div><div class="stats"><span>Total GPA Credits: <b>${cgpaCreds.toFixed(1)}</b></span><span>Total Quality Points: <b>${cgpaTotal.toFixed(2)}</b></span>${mode === 'cgpa' ? '<span>Semesters: <b>' + semestersToRender.length + '</b></span>' : ''}</div></div></div><footer>Society of Technological Studies &mdash; STS &nbsp;|&nbsp; For reference purposes only.</footer></div></body></html>`;
        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `GPA-Result-${(mode === 'sgpa' ? semLabel(sgpaSem) : 'CGPA').replace(/\s+/g, '-')}-${now.getFullYear()}.html`;
        document.body.appendChild(a); a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // ---- Results ----
    const sgpaResult = calcSemester(sgpaCourses);
    const minReq = MIN_GPA_CREDITS[sgpaSem] ?? 0;
    const meetsMin = sgpaResult.gpaCreds >= minReq;
    const cgpaResult = calcCGPA(cgpaSemesters);

    const fmtGPA = v => (v !== null && !isNaN(v)) ? v.toFixed(2) : '—';
    const gpaColour = v => {
        if (v === null || isNaN(v)) return '';
        if (v >= 3.7) return 'col-excellent';
        if (v >= 3.0) return 'col-good';
        if (v >= 2.0) return 'col-average';
        return 'col-poor';
    };

    return (
        <div className="gpc-page">
            {/* Page header */}
            <header className="gpc-hero">
                <h1>GPA <span className="highlight">Calculator</span></h1>
                <p>Compute your Semester GPA (SGPA) and Cumulative GPA (CGPA) based on the PST curriculum.</p>
                <button className="gpc-info-btn" onClick={() => setShowInfo(v => !v)}>
                    <Info size={16} /> How credits work
                </button>
            </header>

            {/* Info box */}
            {showInfo && (
                <div className="gpc-info-box">
                    <h4><BookOpen size={16} /> Understanding Course Codes</h4>
                    <p>
                        A course code encodes: <strong>Degree · Year · Semester · Credits · Subject</strong>.
                        <br />
                        Example: <code>PST 12201</code> →
                        Physical Sciences &amp; Technology | Year <strong>1</strong> |
                        Semester <strong>2</strong> | <strong>2</strong> credits | Subject code 01.
                    </p>
                    <p>
                        <strong>Non-GPA courses</strong> (e.g., General English / Business English) are
                        credited but excluded from the GPA calculation. Toggle the "Non-GPA" switch for those rows.
                    </p>
                    <p>
                        Each semester table in the handbook specifies a
                        <em> minimum number of GPA credits</em> the student must earn.
                        This calculator will warn you if you fall below that threshold.
                    </p>
                </div>
            )}

            {/* Tabs */}
            <div className="gpc-tabs">
                <button className={`gpc-tab ${tab === 'sgpa' ? 'active' : ''}`} onClick={() => setTab('sgpa')}>
                    SGPA — This Semester
                </button>
                <button className={`gpc-tab ${tab === 'cgpa' ? 'active' : ''}`} onClick={() => setTab('cgpa')}>
                    CGPA — All Semesters
                </button>
            </div>

            {/* ============ SGPA TAB ============ */}
            {tab === 'sgpa' && (
                <div className="gpc-panel">
                    {/* Semester selector */}
                    <div className="gpc-sem-bar">
                        <label>Semester</label>
                        <div className="gpc-sem-select-wrap">
                            <select
                                className="gpc-sem-select"
                                value={sgpaSem}
                                onChange={e => loadSgpaPreset(e.target.value)}
                            >
                                {SEMESTERS.map(s => (
                                    <option key={s.id} value={s.id}>{s.label}</option>
                                ))}
                            </select>
                            <ChevronDown size={16} />
                        </div>
                        <span className="gpc-min-note">
                            Min GPA credits required: <strong>{minReq}</strong>
                        </span>
                    </div>

                    {/* Column headers */}
                    <div className="gpc-col-header">
                        <span>Code</span><span>Title</span>
                        <span>Cr</span><span>Grade</span>
                        <span>QP</span><span>Non-GPA</span><span></span>
                    </div>

                    {/* Rows */}
                    <div className="gpc-rows">
                        {sgpaCourses.map(c => (
                            <CourseRow
                                key={c.id}
                                course={c}
                                onUpdate={(f, v) => updateSgpaCourse(c.id, f, v)}
                                onRemove={() => removeSgpaCourse(c.id)}
                                onCodeCommit={code => commitSgpaCode(c.id, code)}
                            />
                        ))}
                    </div>

                    <button className="gpc-add-btn" onClick={addSgpaCourse}>
                        <Plus size={15} /> Add Course
                    </button>

                    {/* SGPA Summary */}
                    <div className="gpc-summary">
                        <div className="gpc-summary-stats">
                            <div className="gpc-stat">
                                <span className="gpc-stat-label">GPA Credits</span>
                                <span className="gpc-stat-value">{sgpaResult.gpaCreds.toFixed(1)}</span>
                            </div>
                            <div className="gpc-stat">
                                <span className="gpc-stat-label">Non-GPA Credits</span>
                                <span className="gpc-stat-value">{sgpaResult.nonGpaCreds.toFixed(1)}</span>
                            </div>
                            <div className="gpc-stat">
                                <span className="gpc-stat-label">Quality Points</span>
                                <span className="gpc-stat-value">{sgpaResult.qualityPts.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="gpc-gpa-display">
                            <span className="gpc-gpa-label">SGPA</span>
                            <span className={`gpc-gpa-value ${gpaColour(sgpaResult.sgpa)}`}>
                                {fmtGPA(sgpaResult.sgpa)}
                            </span>
                        </div>

                        <div className={`gpc-badge ${meetsMin ? 'badge-ok' : 'badge-warn'}`}>
                            {meetsMin
                                ? <><CheckCircle size={16} /> Meets minimum GPA credits ({minReq} required)</>
                                : <><AlertTriangle size={16} /> Below minimum — need {minReq} GPA credits, earned {sgpaResult.gpaCreds.toFixed(1)}</>
                            }
                        </div>
                        <button className="gpc-download-btn" onClick={() => downloadReport('sgpa')}>
                            <Download size={16} /> Download Result Sheet
                        </button>
                    </div>
                </div>
            )}

            {/* ============ CGPA TAB ============ */}
            {tab === 'cgpa' && (
                <div className="gpc-panel">
                    {cgpaSemesters.map((sem, idx) => {
                        const res = calcSemester(sem.courses);
                        return (
                            <div key={sem.id} className="gpc-semester-block">
                                <div className="gpc-sem-block-header">
                                    <div className="gpc-sem-select-wrap">
                                        <select
                                            className="gpc-sem-select compact"
                                            value={sem.semId}
                                            onChange={e => updateCgpaSemId(sem.id, e.target.value)}
                                        >
                                            {SEMESTERS.map(s => (
                                                <option key={s.id} value={s.id}>{s.label}</option>
                                            ))}
                                        </select>
                                        <ChevronDown size={14} />
                                    </div>
                                    <span className="gpc-sem-sgpa">
                                        SGPA: <strong className={gpaColour(res.sgpa)}>{fmtGPA(res.sgpa)}</strong>
                                    </span>
                                    {cgpaSemesters.length > 1 && (
                                        <button className="gpc-remove-sem" onClick={() => removeCgpaSemester(sem.id)}>
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>

                                {/* Col headers */}
                                <div className="gpc-col-header compact">
                                    <span>Code</span><span>Title</span>
                                    <span>Cr</span><span>Grade</span>
                                    <span>QP</span><span>Non-GPA</span><span></span>
                                </div>

                                <div className="gpc-rows">
                                    {sem.courses.map(c => (
                                        <CourseRow
                                            key={c.id}
                                            course={c}
                                            onUpdate={(f, v) => updateCgpaCourse(sem.id, c.id, f, v)}
                                            onRemove={() => removeCgpaCourse(sem.id, c.id)}
                                            onCodeCommit={code => commitCgpaCode(sem.id, c.id, code)}
                                        />
                                    ))}
                                </div>

                                <button className="gpc-add-btn small" onClick={() => addCgpaCourse(sem.id)}>
                                    <Plus size={13} /> Add Course
                                </button>
                            </div>
                        );
                    })}

                    <button className="gpc-add-sem-btn" onClick={addCgpaSemester}>
                        <Plus size={15} /> Add Semester
                    </button>

                    {/* CGPA Summary */}
                    <div className="gpc-summary">
                        <div className="gpc-summary-stats">
                            <div className="gpc-stat">
                                <span className="gpc-stat-label">Total GPA Credits</span>
                                <span className="gpc-stat-value">{cgpaResult.totalGpaCreds.toFixed(1)}</span>
                            </div>
                            <div className="gpc-stat">
                                <span className="gpc-stat-label">Total Quality Points</span>
                                <span className="gpc-stat-value">{cgpaResult.totalQP.toFixed(2)}</span>
                            </div>
                            <div className="gpc-stat">
                                <span className="gpc-stat-label">Semesters</span>
                                <span className="gpc-stat-value">{cgpaSemesters.length}</span>
                            </div>
                        </div>

                        <div className="gpc-gpa-display">
                            <span className="gpc-gpa-label">CGPA</span>
                            <span className={`gpc-gpa-value ${gpaColour(cgpaResult.cgpa)}`}>
                                {fmtGPA(cgpaResult.cgpa)}
                            </span>
                        </div>
                        <button className="gpc-download-btn" onClick={() => downloadReport('cgpa')}>
                            <Download size={16} /> Download Result Sheet
                        </button>
                    </div>
                </div>
            )}

            {/* Grade-point reference table */}
            <div className="gpc-grade-ref">
                <h4>Grade Point Reference <span className="gpc-edit-note">(Edit in GpaCalculator.jsx — GRADE_POINTS config)</span></h4>
                <div className="gpc-grade-grid">
                    {Object.entries(GRADE_POINTS).filter(([, v]) => v !== null).map(([g, pt]) => (
                        <div key={g} className="gpc-grade-pill">
                            <span className="gpc-grade-letter">{g}</span>
                            <span className="gpc-grade-pt">{pt.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GpaCalculator;
