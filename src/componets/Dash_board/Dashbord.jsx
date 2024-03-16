import React, { useContext } from 'react';
import User from './User';
import { Doughnut, Line } from 'react-chartjs-2';
import Transectiondata  from '../../assets/Transectiondata'; // Import Transectiondata as named export
import  Monthlydata from './Monthlydata'; // Import Monthlydata as named export
import { Chart, defaults } from 'chart.js/auto';
import './User.css';
import { MyContext } from '../../assets/Contextfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = 'black';

const Dashbord = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    const tran_data = Transectiondata();
    const Monthlydatas = Monthlydata();
    
    const {user} =useContext(MyContext)

    // Extracting categories from the JSON data
    const categories = tran_data.reduce((acc, curr) => {
        Object.keys(curr.categories).forEach(category => {
            if (!acc.includes(category)) {
                acc.push(category);
            }
        });
        return acc;
    }, []);

    // Generating dataset for the Pie chart
    const chartData = {
        labels: categories,
        datasets: [
            {
                label: 'Expenses',
                data: categories.map(category => tran_data.reduce((acc, curr) => acc + curr.categories[category], 0)),
                backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#45e688'], // Example colors
            }
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                text: `Daily Expenses: ${formattedDate}`,
                align: 'start',
                font: { size: 20, family: 'Arial', weight: 'bold' },
                color: 'black',
                margin: { bottom: 10, top: 10 }, 
            },
            legend: {
                position: 'right',
                align: 'right',
                labels: {
                    color: 'gray',
                    size: '12px'
                }
            },
        },
    };
     const validationUser=user?.user ?true :false
     console.log(validationUser);
   
    //  ${validationUser ? '':'animate-spin'}

    return (
       <>
       {
        validationUser ?(
            <div className={`scroll-smooth h-full  `}>
            <div className="upper flex  gap-12">
                <User />
                <div className="circle-chart user" style={{  position: 'relative', height: '300px', padding: '0 20px' }}>
                    <Doughnut data={chartData} style={{ width: '100%', height: '100%' }} options={chartOptions} />
                </div>
            </div>
          
           <Monthlydata/>
        </div>
        ) :(
            <div className="loading   h-dvh flex justify-center  justify-items-center items-center w-full">
               <FontAwesomeIcon className='animate-spin' size='2x' icon={faSpinner}/>
               <h1>Loading</h1>
            </div>
        )
       }
       </>
    );
};

export default Dashbord;
