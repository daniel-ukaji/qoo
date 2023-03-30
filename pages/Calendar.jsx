import React from 'react'
import Header from '../components/misc/header'
import HostHeader from '../components/misc/hostHeader'
import Footer from '../components/misc/footer'

function Calendar() {
  return (
    <div>
        <HostHeader />
        <div className="flex items-center justify-center text-2xl h-screen mx-auto font-extrabold font-sora text-primary">
          Coming Soon
        </div>
        <Footer />
      </div>
  )
}

export default Calendar