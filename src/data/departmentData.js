import { BookOpen, Users, Award, Briefcase, Atom, FlaskConical, Monitor, Zap } from 'lucide-react';

export const departmentData = {
    hero: {
        title: "Department of Physical Sciences & Technology",
        subtitle: "Faculty of Applied Sciences | Sabaragamuwa University of Sri Lanka",
        buttons: [
            { text: "Programs", link: "#programs" },
            { text: "Academic Hierarchy", link: "#hierarchy" },
            { text: "Student Opportunities", link: "#opportunities" }
        ]
    },
    about: {
        title: "About Us",
        description: "The Department of Physical Sciences & Technology is a hub of innovation and academic excellence. We offer a diverse range of undergraduate programs designed to equip students with theoretical knowledge and practical skills in Physical Sciences, Applied Physics, Chemical Technology, and Computer Science & Technology. Our curriculum is tailored to meet industry standards and foster research-driven minds."
    },
    hierarchy: {
        title: "Academic Hierarchy",
        note: "Names/titles can be updated by the society admin.",
        nodes: [
            {
                role: "Head of Department",
                name: "Dr. [Name]",
                icon: Users,
                children: [
                    {
                        role: "Programme Coordinators",
                        members: [
                            { role: "Applied Physics", name: "Dr. [Name]" },
                            { role: "Chemical Technology", name: "Dr. [Name]" },
                            { role: "Computer Science & Tech", name: "Dr. [Name]" }
                        ]
                    },
                    {
                        role: "Academic Staff",
                        categories: [
                            { title: "Senior Lecturers", names: ["Dr. [Name]", "Dr. [Name]"] },
                            { title: "Lecturers", names: ["Mr. [Name]", "Ms. [Name]"] },
                            { title: "Temporary Lecturers", names: ["[Name]", "[Name]"] }
                        ]
                    },
                    {
                        role: "Technical & Support Staff",
                        names: ["Mr. [Name] (TO)", "Ms. [Name] (Lab Assistant)"]
                    },
                    {
                        role: "Society Representatives",
                        names: ["[Name] (President)", "[Name] (Secretary)"]
                    }
                ]
            }
        ]
    },
    programs: [
        {
            title: "BSc in Physical Sciences",
            abbreviation: "BSc (Phy Sc)",
            icon: Atom,
            bestFor: "Students interested in fundamental sciences and teaching.",
            skills: ["Problem Solving", "Mathematical Modeling", "Analytical Thinking"]
        },
        {
            title: "BScHons in Applied Physics",
            abbreviation: "BScHons (App Phy)",
            icon: Zap,
            bestFor: "Careers in electronics, renewable energy, and material science.",
            skills: ["Electronics", "Data Analysis", "Instrumentation"]
        },
        {
            title: "BScHons in Chemical Technology",
            abbreviation: "BScHons (Chem Tech)",
            icon: FlaskConical,
            bestFor: "Roles in chemical industry, pharmacology, and research.",
            skills: ["Lab Safety", "Chemical Synthesis", "Quality Control"]
        },
        {
            title: "BScHons in Computer Science & Technology",
            abbreviation: "BScHons (Com Sc & Tech)",
            icon: Monitor,
            bestFor: "Software engineering, data science, and IT consultancy.",
            skills: ["Programming", "System Design", "Algorithm Optimization"]
        }
    ],
    curriculum: {
        title: "Course Code System",
        description: "Our course codes are structured to provide specific information about the module.",
        example: {
            code: "PST 12201",
            breakdown: [
                { part: "PST", meaning: "Physical Sciences & Technology" },
                { part: "1", meaning: "Year 1" },
                { part: "2", meaning: "Semester 2" },
                { part: "2", meaning: "2 Credits" },
                { part: "01", meaning: "Subject Code" }
            ]
        },
        highlights: ["Physics", "Chemistry", "Computing/Programming"]
    },
    opportunities: {
        title: "Student Opportunities",
        subtitle: "Industrial Exposure & Research",
        projectWork: {
            title: "Project Work (Industrial Exposure)",
            duration: "15 weeks",
            steps: [
                "Students submit a project proposal and present it to a panel appointed by the department around the 3rd week.",
                "Maintain a record book provided by the department.",
                "Submit evaluation reports during the period.",
                "Submit a final report and defend the thesis before an Examination Committee appointed by the department."
            ],
            note: "This applies across majoring streams (Applied Physics / Chemical Technology / Computer Science & Technology)."
        }
    },
    contact: {
        website: "https://www.sab.ac.lk/app/physical-sciences",
        email: "info@pst.sab.ac.lk",
        location: "Faculty of Applied Sciences, Belihuloya"
    }
};
