import React from 'react';
import CollegeHero from '../components/College/CollegeHero';
import CollegeIntro from '../components/College/CollegeIntro';
import CollegeChallenges from '../components/College/CollegeChallenges';
import CollegeSolutions from '../components/College/CollegeSolutions';
import CollegeCTA from '../components/College/CollegeCTA';

const College = () => {
    return (
        <div>
            {/* Your College component content */}
            <CollegeHero />
            <CollegeIntro />
            <CollegeChallenges />
            <CollegeSolutions />
            <CollegeCTA />
           
        </div>
    );
};

export default College; // Ensure this line is present
