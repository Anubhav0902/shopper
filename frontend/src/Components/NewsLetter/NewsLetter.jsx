import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers on Your Emails</h1>
      <p>Subsribe to our newletter and stay updates</p>
      <div>
        <input type="email" placeholder='Your Email ID'/>
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
