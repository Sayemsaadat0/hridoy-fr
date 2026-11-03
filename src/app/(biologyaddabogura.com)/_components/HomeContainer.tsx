import React from 'react'
import { HeroSection } from './HeroSection'
import HomeAbout from './HomeAbout'
import HomeCourses from './HomeCourses'
import GoogleReviews from './GoogleReviews'
import HomeFAQ, { type HomeFaq } from './HomeFAQ'
import HomeContact from './HomeContact'
import { Course } from './types/course.types'

interface HomeContainerProps {
  courses: Course[]
  faqs: HomeFaq[]
}

const HomeContainer = ({ courses, faqs }: HomeContainerProps) => {
  return (
    <div className='space-y-10 md:space-y-20'>
        <HeroSection />
        <HomeAbout />
        <HomeCourses courses={courses} />
        <GoogleReviews />
        <HomeFAQ faqs={faqs} />
        <HomeContact />
    </div>
  )
}

export default HomeContainer
