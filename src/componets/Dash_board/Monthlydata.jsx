import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { MyContext } from '../../assets/Contextfile';

export default function Monthlydata() {
  const { transactions } = useContext(MyContext);

  // Calculate the main amount based on received and sent amounts
  let mainAmount = 0;
  transactions.forEach(transaction => {
    if (transaction.type === 'receive') {
      mainAmount += transaction.amount;
    } else if (transaction.type === 'send') {
      mainAmount -= transaction.amount;
    }
  });

  // Generate labels for the line chart (using the current date for simplicity)
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'short' });
  const currentDay = currentDate.getDate();
  const currentDateString = `${currentMonth} ${currentDay}`;

  // Prepare data for the line chart (only one data point representing the main amount)
  const linedata = {
    labels: [currentDateString],
    datasets: [
      {
        label: 'Main Amount',
        data: [mainAmount],
        backgroundColor: 'blue',
        borderColor: 'blue',
        fill: false,
        lineTension: 0.1,
      },
    ],
  };

  // Chart options
  const lineoptions = {
    responsive: true,
    plugins: {
      title: {
        text: 'Main Amount',
        align: 'center',
        font: { size: 20, family: 'Arial', weight: 'bold' },
        color: 'black',
        margin: { bottom: 15, top: 15 },
      },
      legend: {
        display: false, // Hide legend since there's only one line
      },
    },
  };

  return (
    <div className="user" style={{ height: '400px', width: '90%', marginBottom: '10px' }}>
      <Line data={linedata} options={lineoptions} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}
