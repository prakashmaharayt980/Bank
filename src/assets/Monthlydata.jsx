import React,{useEffect,useState} from 'react'
import { Line } from 'react-chartjs-2'
import '../componets/User.css'
import glbback from '../loginA/loginimage/backglb.png'

export default function Monthlydata() {
  const [data, setdata] = useState([])

  useEffect(() => {
    const fdata=generateMonthlyData()
    const fectdata=async ()=>{
      
      //  TODO:change it into real fectching Api
      setdata(fdata)
    }
    fectdata()
  },[])
  

  function generateMonthlyData() {
    const startDate = new Date(); // Today's date
    startDate.setDate(startDate.getDate() - 29); // Set start date to 30 days ago
  
    const monthlyData = {};
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i); // Add i days to start date
  
      const dateString = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); // Get date string in YYYY-MM-DD format
  
      // Generate random data for each day (you can replace this with your own data)
      const receive = Math.floor(Math.random() * 100) + 1; // Random receive value between 1 and 100
      const send = Math.floor(Math.random() * 100) + 1; // Random send value between 1 and 100
  
      monthlyData[dateString] = { receive, send };
    }
  
    return monthlyData;
  }
   
  const labels=Object.keys(data)
  const receiveamount=labels.map((label)=>data[label].receive)
  const sendamount=labels.map((label)=>data[label].send)

  const linedata={
    labels,
    datasets:[{
       label:'receive',
       data:receiveamount,
       background:'red',
       lineTension: 0.1,
    },
    {
       label:'send',
       data:sendamount,
       color:'gray',
       lineTension: 0.1,
    },
  ]

  }
  const lineoption={
   responsive:true,
   plugins: {
    title: {
        text:'Cash-flow',
        align: 'center',
        font: { size: 20, family: 'Arial', weight: 'bold' },
        color: 'black',
        margin: { bottom: 15, top: 15 }, 
        
    },
    // backgroundImage:{
    //   url:glbback,
    // },
    legend: {
        position: 'right',
        align: 'right',
        labels: {
            color: 'gray',
            size: '12px',
            gap:'10px'
        }
    },
},
   }
  
  return (
    <div className='user' style={{height:'400px' ,width:'90%'}}>
      <Line data={linedata} options={lineoption} style={{height:'100%',width:'100%'}} />
    </div>
  )
}
