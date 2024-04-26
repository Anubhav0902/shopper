import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">
          Description
        </div>
        <div className="descriptionbox-nav-box fade">
          Reviews (122)
        </div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A blanditiis perspiciatis vel, id enim rem quas aspernatur illum esse harum modi, unde voluptatum atque recusandae vero omnis beatae cupiditate. Esse.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti molestiae repellat accusantium possimus molestias. Nobis ipsam officiis reiciendis repellendus cupiditate!
        </p>
      </div>
    </div>
  )
}

export default DescriptionBox
