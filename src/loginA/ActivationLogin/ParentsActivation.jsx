import React  ,{useState} from 'react'
import ActivationLogin from './ActivationLogin'
import Ottp from './Ottp'

function ParentsActivation() {
    const [SuccessTowardOttp, setSuccessTowardOttp] = useState(false)
    const [DatatoOttp, setDatatoOttp] = useState('')
    const handledata=(data)=>{
        setSuccessTowardOttp(true)
        setDatatoOttp(data?.email)
    }
  return (
    <React.Fragment>
      {
        !SuccessTowardOttp && <ActivationLogin handledata={handledata}/>
      }
      {
        // SuccessTowardOttp && <Ottp email={DatatoOttp}/>
      }
    </React.Fragment>
  )
}

export default ParentsActivation
