import React  ,{useState} from 'react'
import ActivationLogin from './ActivationLogin'
import Ottp from './Ottp'

function ParentsActivation() {
    const [SuccessTowardOttp, setSuccessTowardOttp] = useState(false)
    const [DatatoOttp, setDatatoOttp] = useState('')
   
  return (
    <React.Fragment>
      <ActivationLogin/>
     
    </React.Fragment>
  )
}

export default ParentsActivation
