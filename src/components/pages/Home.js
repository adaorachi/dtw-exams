import React from 'react';
import Hero from '../snippets/home/Hero';
import About from '../snippets/home/About';
import WhyUs from '../snippets/home/WhyUs';
import SubjectFeature from '../snippets/home/SubjectFeature';
import Courses from '../snippets/home/Courses';

export default function Home() {
  return (
    <div className="template">
      <Hero />
      <main id="main">
        <About />
        <WhyUs />
        <SubjectFeature />
        <Courses />
      </main>
    </div>
  );
}
