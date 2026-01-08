import React from 'react'
import { HeroSection } from './HeroSection'
import HomeAbout from './HomeAbout'
import HomeCourses from './HomeCourses'
import GoogleReviews from './GoogleReviews'
import HomeFAQ from './HomeFAQ'

const HomeContainer = () => {
  return (
    <div className='space-y-10 md:space-y-20'>
        <HeroSection />
        <HomeAbout />
        <HomeCourses />
        <GoogleReviews />
        <HomeFAQ />
    </div>
  )
}

export default HomeContainer