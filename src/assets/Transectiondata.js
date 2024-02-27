import { useState, useEffect } from 'react';
import Chartdata from './Chartdata.json'

 const Transectiondata = () => {
    const [data, setdata] = useState([])
  
    useEffect(() => {
      setdata(Chartdata)
      // fetch(Chartdata)
        // .then((res) => res.json())
        // .then((data) => setdata(data))
        // .catch((error) => console.error(error));
        // console.log(data)
    }, []);
  
    return data;
  };
  export default Transectiondata