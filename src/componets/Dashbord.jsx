import React from 'react';
import User from './User';
import { Doughnut, Line } from 'react-chartjs-2';
import Transectiondata  from '../assets/Transectiondata'; // Import Transectiondata as named export
import  Monthlydata from '../assets/Monthlydata'; // Import Monthlydata as named export
import { Chart, defaults } from 'chart.js/auto';
import './User.css';

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

    // Map monthly data to an array
    // const monthlyLabels = Object.keys(Monthlydatas);
    // const monthlyReceiveData = monthlyLabels.map(month => Monthlydatas[month].receive);
    // const monthlySendData = monthlyLabels.map(month => Monthlydatas[month].send);

    // // Line chart data
    // const lineData = {
    //     labels: monthlyLabels,
    //     datasets: [
    //         {
    //             label: 'Receive',
    //             data: monthlyReceiveData,
    //             borderColor: 'blue',
    //             // fill: false,
    //         },
    //         {
    //             label: 'Send',
    //             data: monthlySendData,
    //             borderColor: 'red',
    //             // fill: false,
    //         }
    //     ],
    // };
    // const lineOptions = {
    //     plugins: {
    //         title: {
    //             text: 'Cash-flow',
    //             align: 'center',
    //             font: { size: 20, family: 'Arial', weight: 'bold' },
    //             color: 'black',
    //             margin: { bottom: 10, top: 15 }, 
    //         },
    //         legend: {
    //             position: 'right',
    //             align: 'right',
    //             labels: {
    //                 color: 'gray',
    //                 size: '12px'
    //             }
    //         },
    //     },
    // };

    return (
        <div className=' scroll-smooth'>
            <div className="upper flex  gap-12">
                <User />
                <div className="circle-chart user" style={{ width: '400px', margin: '15px 0 0 0', position: 'relative', height: '300px', padding: '0 20px' }}>
                    <Doughnut data={chartData} style={{ width: '100%', height: '100%' }} options={chartOptions} />
                </div>
            </div>
           {/* <div className="linechart m-3  user" style={{height:'400px' ,width:'90%'}}>
           <Line data={lineData} style={{
                height:'100%'
            }}  options={lineOptions}/>
           </div> */}
           <Monthlydata/>
        </div>
    );
};

export default Dashbord;
