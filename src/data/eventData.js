/**
 * Event data for STS Programme events.
 *
 * Structure:
 *  - Each top-level key is the eventId used in the route: /event/:eventId
 *  - `editions` is an array of year-specific records
 *    Each edition:
 *      - badge:        Academic year badge e.g. "20/21"
 *      - year:         Display year e.g. 2021
 *      - coordinators: array of names
 *      - schoolCount:  total schools participated
 *      - schools:      [{name, students}]
 *      - notes:        special notes string
 *      - images:       array of image URLs (or local paths)
 */

export const eventData = {
    nanapahasa: {
        id: 'nanapahasa',
        title: 'NanaPahasa',
        subtitle: 'Bridging the Lab Gap for A/L Students',
        description:
            'NanaPahasa is STS\'s annual laboratory outreach programme that invites students from schools ' +
            'that lack the equipment and resources to conduct Advanced Level practical sessions — covering ' +
            'Physics, Chemistry, ICT, and sometimes Agriculture. ' +
            'Participant schools visit the department\'s own laboratory facilities at the university, where ' +
            'STS undergraduates personally demonstrate each required practical, clearly and step-by-step. ' +
            'Students are also provided with model papers, worked answers, and exam tips, while senior ' +
            'undergraduates deliver motivational talks to encourage the students ahead of their examinations.',
        coverImage:
            'https://images.unsplash.com/photo-1544531835-3a9d08e7c10d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        location: 'Department Laboratories, Sabaragamuwa University',
        frequency: 'Annual',
        category: 'Education Outreach',
        editions: [
            {
                badge: '20/21',
                year: 2021,
                coordinators: ['K. M. Perera', 'S. A. Fernando'],
                schoolCount: 6,
                schools: [
                    { name: 'Mahinda College, Galle', students: 85 },
                    { name: 'Richmond College, Galle', students: 72 },
                    { name: 'Dharmasoka College, Ambalangoda', students: 60 },
                    { name: 'Southlands College, Galle', students: 55 },
                    { name: 'Rahula College, Matara', students: 90 },
                    { name: 'St. Aloysius College, Galle', students: 48 },
                ],
                notes:
                    'First edition of NanaPahasa conducted at the university labs. ' +
                    'Undergraduates demonstrated Physics and Chemistry A/L practicals and distributed model papers with full worked answers.',
                images: [
                    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
                    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
                    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
                ],
            },
            {
                badge: '21/22',
                year: 2022,
                coordinators: ['D. R. Jayawickrama', 'N. M. Silva', 'P. K. Bandara'],
                schoolCount: 9,
                schools: [
                    { name: 'Mahinda College, Galle', students: 110 },
                    { name: 'Richmond College, Galle', students: 98 },
                    { name: 'Dharmasoka College, Ambalangoda', students: 75 },
                    { name: 'Southlands College, Galle', students: 62 },
                    { name: 'Rahula College, Matara', students: 104 },
                    { name: 'St. Aloysius College, Galle', students: 55 },
                    { name: 'Devapathiraja College, Ratgama', students: 80 },
                    { name: 'St. Servatius College, Matara', students: 70 },
                    { name: 'Maliyadeva College, Kurunegala', students: 65 },
                ],
                notes:
                    'Expanded to cover ICT practicals alongside Physics and Chemistry. ' +
                    'Undergraduates led individual practical demonstrations and conducted a dedicated exam motivation session.',
                images: [
                    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
                    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
                    'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&q=80',
                    'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80',
                ],
            },
            {
                badge: '22/23',
                year: 2023,
                coordinators: ['T. S. Ranawaka', 'A. D. Kumari'],
                schoolCount: 12,
                schools: [
                    { name: 'Mahinda College, Galle', students: 130 },
                    { name: 'Richmond College, Galle', students: 115 },
                    { name: 'Dharmasoka College, Ambalangoda', students: 88 },
                    { name: 'Southlands College, Galle', students: 70 },
                    { name: 'Rahula College, Matara', students: 120 },
                    { name: 'St. Aloysius College, Galle', students: 65 },
                    { name: 'Devapathiraja College, Ratgama', students: 95 },
                    { name: 'St. Servatius College, Matara', students: 85 },
                    { name: 'Maliyadeva College, Kurunegala', students: 78 },
                    { name: 'Ananda College, Colombo', students: 140 },
                    { name: 'Royal College, Colombo', students: 150 },
                    { name: 'Nalanda College, Colombo', students: 110 },
                ],
                notes:
                    'Largest NanaPahasa to date. Agriculture practical demonstrations were added for the first time. ' +
                    'Full model-paper sets with answers were distributed to all participating students.',
                images: [
                    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
                    'https://images.unsplash.com/photo-1491309055486-4560e4d4b3a6?w=800&q=80',
                    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
                    'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800&q=80',
                    'https://images.unsplash.com/photo-1623520856754-7c26f4f78ead?w=800&q=80',
                ],
            },
        ],
    },

    nanasaviya: {
        id: 'nanasaviya',
        title: 'NanaSaviya',
        subtitle: 'Rebuilding Futures, One School at a Time',
        description:
            'NanaSaviya is STS\'s annual community service programme where students from all batches of the ' +
            'department unite to make a tangible difference to a school in genuine need. ' +
            'Each year, a school is carefully selected based on the severity of its physical needs. ' +
            'Volunteers arrive and get to work with their own hands — repairing and rebuilding damaged furniture, ' +
            'fixing and cleaning broken chairs and tables, repainting classrooms and corridors, restoring ' +
            'blackboards, constructing classroom partition boards, and reviving computer labs by cleaning, ' +
            'repairing, and rebuilding computers. ' +
            'NanaSaviya is a celebration of hands-on effort, cross-batch teamwork, and the belief that ' +
            'every child deserves a learning environment that inspires them.',
        coverImage:
            'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        location: 'Selected School — Island-wide',
        frequency: 'Annual',
        category: 'Community Service',
        editions: [
            {
                badge: '21/22',
                year: 2022,
                coordinators: ['R. M. Wijesinghe', 'S. N. Gamage'],
                schoolCount: 4,
                schools: [
                    { name: 'Ananda College, Colombo', students: 40 },
                    { name: 'Nalanda College, Colombo', students: 35 },
                    { name: 'Isipathana College', students: 30 },
                    { name: 'Thurstan College', students: 28 },
                ],
                notes: 'Inaugural NanaSaviya. Volunteers repaired furniture, repainted classrooms, and restored the school\'s computer laboratory.',
                images: [
                    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
                    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80',
                ],
            },
            {
                badge: '22/23',
                year: 2023,
                coordinators: ['L. D. Niroshana', 'K. A. Peris', 'M. T. Herath'],
                schoolCount: 7,
                schools: [
                    { name: 'Ananda College, Colombo', students: 55 },
                    { name: 'Nalanda College, Colombo', students: 48 },
                    { name: 'Isipathana College', students: 42 },
                    { name: 'Thurstan College', students: 38 },
                    { name: 'Royal College, Colombo', students: 60 },
                    { name: 'Mahinda College, Galle', students: 35 },
                    { name: 'Richmond College, Galle', students: 30 },
                ],
                notes: 'Fixed damaged desks and chairs, rebuilt classroom partition boards, repainted corridors, and cleaned and repaired computer equipment across the school.',
                images: [
                    'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
                    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
                    'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&q=80',
                ],
            },
        ],
    },

    cricket: {
        id: 'cricket',
        title: 'STS Cricket Match',
        subtitle: 'Beyond the Lecture Hall',
        description:
            'The STS Cricket Match is an annual sporting event that goes beyond boundaries — both on and off the pitch. ' +
            'Students from every batch of the department, along with academic staff members, come together to compete ' +
            'in a friendly but spirited cricket match held outside the university. ' +
            'It is a day that cuts across academic years and hierarchies, bringing undergraduates and lecturers onto ' +
            'the same field to share laughs, showcase talent, and build memories that outlast any semester. ' +
            'The match is as much about community and camaraderie as it is about cricket.',
        coverImage:
            'https://images.unsplash.com/photo-1531415074968-bc2366c012ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        location: 'Outdoor Ground — Off Campus',
        frequency: 'Annual',
        category: 'Sports',
        editions: [
            {
                badge: '21/22',
                year: 2022,
                coordinators: ['Sports Committee 2021/22'],
                schoolCount: 0,
                schools: [],
                notes: 'Students and staff from all batches participated. Students won in a competitive match held at an off-campus ground.',
                images: [
                    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
                    'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80',
                ],
            },
            {
                badge: '22/23',
                year: 2023,
                coordinators: ['Sports Committee 2022/23'],
                schoolCount: 0,
                schools: [],
                notes: 'Academic staff clinched victory in a closely fought match. A record turnout of supporters cheered both teams throughout the day.',
                images: [
                    'https://images.unsplash.com/photo-1593766787575-5e8420dc5d42?w=800&q=80',
                    'https://images.unsplash.com/photo-1531415074968-bc2366c012ce?w=800&q=80',
                ],
            },
        ],
    },

    astrocamp: {
        id: 'astrocamp',
        title: 'Astro Camp',
        subtitle: 'Exploring the Cosmos',
        description:
            'A night under the stars for astronomy enthusiasts. Telescope observation, astrophysics lectures, ' +
            'night-sky photography, and a memorable camping experience in Sri Lanka\'s most scenic locations.',
        coverImage:
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        location: 'Knuckles Range & surrounds',
        frequency: 'Annual',
        category: 'Science',
        editions: [
            {
                badge: '22/23',
                year: 2023,
                coordinators: ['B. M. Dissanayake', 'C. K. Jayalath'],
                schoolCount: 0,
                schools: [],
                notes:
                    'First Astro Camp edition. 45 participants, 3 telescopes, and clear skies allowed ' +
                    'observation of Saturn\'s rings and the Orion Nebula.',
                images: [
                    'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
                    'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&q=80',
                    'https://images.unsplash.com/photo-1538370965046-79c0d6907d47?w=800&q=80',
                ],
            },
        ],
    },

    pitch: {
        id: 'pitch',
        title: 'Pitch Competition',
        subtitle: 'Innovate to Solvate',
        description:
            'An idea-thon where student teams pitch innovative solutions to real-world problems before a ' +
            'panel of industry experts. Winners receive seed funding and mentorship to develop their ideas.',
        coverImage:
            'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        location: 'Auditorium, Sabaragamuwa University',
        frequency: 'Annual',
        category: 'Innovation',
        editions: [
            {
                badge: '22/23',
                year: 2023,
                coordinators: ['Innovation Club, STS'],
                schoolCount: 0,
                schools: [],
                notes:
                    '18 teams competed. Winning pitch: "Smart Water Quality Monitor" by Team AquaSense. ' +
                    'Prize: LKR 50,000 seed fund.',
                images: [
                    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
                    'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80',
                ],
            },
        ],
    },
};
