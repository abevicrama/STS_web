import React from 'react';
import Hero from './Hero';
import About from './About';
import Stats from './Stats';
import UpcomingEvents from './UpcomingEvents';
import RecentEvent from './RecentEvent';
import RecentProjects from './RecentProjects';
import { CommitteeSection } from './Committee';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Stats />
            <UpcomingEvents />
            <RecentEvent />
            <RecentProjects />
            <CommitteeSection />
        </>
    );
};

export default Home;
