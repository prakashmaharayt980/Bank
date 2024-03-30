
import { faFolder, faIdCard } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
const NavOfCard=[
  {to:'',icon:faIdCard,label:'Apply'},
  // {to:null,icon:null,label:'/'},
  {to:'statecard',icon:faFolder,label:'State'},
]

function Cardfile() {
  
  return (
    <div className='box-design'>
     <nav>
      <ul className='flex flex-row justify-evenly' >
        {
          NavOfCard.map((nav,index)=>(
          <li key={index}>
            <NavLink to={nav.to} activeclassname="active">
              <FontAwesomeIcon icon={nav?.icon} />
              <span>{nav.label} </span>
            </NavLink>
          </li>
          ))
        }
      </ul>
     </nav>
    </div>
  )
}

export default Cardfile
