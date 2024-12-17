import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, BarElement, Tooltip, Legend } from 'chart.js/auto'; // Import Chart.js components
import { useSelector } from 'react-redux';

// Register necessary components
Chart.register(LinearScale, BarElement, Tooltip, Legend);

const BarGraph = () => {
  const { FinalData:data } = useSelector((state) => state.authSlice);
  
  // Filter data for boys and girls
  const boysData = data.filter(item => item.gender === 'male');
  const girlsData = data.filter(item => item.gender === 'female');

  // Extract marks for different subjects for boys and girls
  const boysMarks = boysData.map(item => [item.Maths, item.Physics, item.Chemistry]);
  const girlsMarks = girlsData.map(item => [item.Maths, item.Physics, item.Chemistry]);

  useEffect(() => {
    // Function to destroy existing chart
    const destroyChart = () => {
      if (window.barChart && window.barChart.destroy) {
        window.barChart.destroy();
      }
    };
    
    // Destroy existing chart before rendering new one
    destroyChart();
  }, []); // Run this effect only once on component mount

  const chartData = {
    labels: ['Maths', 'Physics', 'Chemistry'],
    datasets: [
      {
        label: 'Boys',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: boysMarks.flat(), // Flatten the array of marks for boys
        barPercentage: 0.4, // Adjust the bar width for boys
      },
      {
        label: 'Girls',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: girlsMarks.flat(), // Flatten the array of marks for girls
        barPercentage: 0.4, // Adjust the bar width for girls
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        type: 'linear', // Specify the type as 'linear'
        stacked: false,
        title: {
          display: true,
          text: 'Marks',
        },
      },
    },
    plugins: {
      legend:{
        position:'top'
      },
      title:{
        display:true,
        text:"Bar Graph"
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <div className="bar-graph-container" style={{ height: '80vh', width: '90vw' }}>
      <Bar data={chartData} options={options} ref={chartRef => { window.barChart = chartRef?.chartInstance; }} />
    </div>
  );
};

export default BarGraph;
