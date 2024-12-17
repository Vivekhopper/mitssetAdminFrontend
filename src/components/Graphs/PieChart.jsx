import React, { useRef, useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto'; // Import Chart.js components
import { useSelector } from 'react-redux';

// Register necessary components
Chart.register();

const PieCharts = () => {
  const boysChartRef = useRef(null);
  const girlsChartRef = useRef(null);
  const { FinalData:data } = useSelector((state) => state.authSlice);
  

  const [boysData, setBoysData] = useState([]);
  const [girlsData, setGirlsData] = useState([]);

  useEffect(() => {
    // Filter data for boys and girls
    const boys = data.filter(student => student.gender === 'male');
    const girls = data.filter(student => student.gender === 'female');
    setBoysData(boys);
    setGirlsData(girls);
  }, []);

  useEffect(() => {
    // Ensure chart instances are properly destroyed
    if (boysChartRef.current && boysChartRef.current.chartInstance) {
      boysChartRef.current.chartInstance.destroy();
    }
    if (girlsChartRef.current && girlsChartRef.current.chartInstance) {
      girlsChartRef.current.chartInstance.destroy();
    }
  }, [boysData, girlsData]);

  const calculateTotalMarks = (students) => {
    return students.reduce((total, student) => {
      return total + student.Maths + student.Physics + student.Chemistry;
    }, 0);
  };

  const totalMarksBoys = calculateTotalMarks(boysData);
  const totalMarksGirls = calculateTotalMarks(girlsData);

  const boysPieData = {
    labels: ['Maths', 'Physics', 'Chemistry'],
    datasets: [{
      data: [
        boysData.reduce((total, student) => total + student.Maths, 0),
        boysData.reduce((total, student) => total + student.Physics, 0),
        boysData.reduce((total, student) => total + student.Chemistry, 0)
      ],
      backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(255, 99, 132, 0.7)', 'rgba(75, 192, 192, 0.7)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
      borderWidth: 1
    }]
  };

  const girlsPieData = {
    labels: ['Maths', 'Physics', 'Chemistry'],
    datasets: [{
      data: [
        girlsData.reduce((total, student) => total + student.Maths, 0),
        girlsData.reduce((total, student) => total + student.Physics, 0),
        girlsData.reduce((total, student) => total + student.Chemistry, 0)
      ],
      backgroundColor: ['rgba(54, 162, 235, 0.7)', 'rgba(255, 99, 132, 0.7)', 'rgba(75, 192, 192, 0.7)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
      borderWidth: 1
    }]
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h2>Boys Pie Chart</h2>
        {boysData.length > 0 && (
          <Pie data={boysPieData} options={pieOptions} ref={boysChartRef} />
        )}
        <p>Total Marks: {totalMarksBoys}</p>
      </div>
      <div>
        <h2>Girls Pie Chart</h2>
        {girlsData.length > 0 && (
          <Pie data={girlsPieData} options={pieOptions} ref={girlsChartRef} />
        )}
        <p>Total Marks: {totalMarksGirls}</p>
      </div>
    </div>
  );
};

export default PieCharts;
