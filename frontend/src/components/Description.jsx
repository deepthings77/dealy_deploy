import React from 'react'
import Navbar from './Landing/components/Navbar'
import HeroSection from './Landing/components/HeroSection'
import FeatureSection from './Landing/components/FeatureSection'
import Workflow from './Landing/components/Workflow'

import Footer from './Landing/components/Footer'


const Description = () => {
  return (
   <>
    <div style={{
      background: "#131423"            
     }} >
     <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <FeatureSection />
        <Workflow />
        {/* <Pricing /> */}
        {/* <Testimonials /> */}
        <Footer />
      </div>
      </div>
   </>
  )
}

export default Description
