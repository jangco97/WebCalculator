import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const HistoryPage = () => {
  const userData = useSelector(state => state.user?.userData);
  const {userId} = useParams();
  const [basicCal, setBasicCal] = useState(null)
  const [engineeringCal, setEngineeringCal] = useState(null)
  const handleDeleteCalculate = async () => {
    try {
      await axiosInstance.delete(`/calculate/${userId}`);
      
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteEngineering = async () => {
    try {
      await axiosInstance.delete(`/engineering/${userId}`);
      
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function fetchCalculate() {
      try {
        const response = await axiosInstance.get(`/calculate/${userId}`);
        setBasicCal(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCalculate();
  }, [userId]);
  useEffect(() => {
    async function fetchEngineering() {
      try {
        const response = await axiosInstance.get(`/engineering/${userId}`);
        setEngineeringCal(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEngineering();
  }, [userId]);
  return (
    <div>
      <h1 className='flex justify-center mb-3 mt-3 font-bold text-xl'>{userData.name}의 계산 기록</h1>
      <div className='flex justify-center'>
        <div className='mr-40 bg-gray-400 p-10 rounded-2xl'> 
          <>
          <h1 className='text-lg bg-gray-400'>기본 계산기</h1>
          {basicCal?.map((cal) => (
            <div key={cal._id}>
              <div className='flex'>
              <div>{cal.firstinput}</div>
              <div>{cal.operator}</div>
              <div>{cal.secondinput} = </div>
              <div>{cal.result}</div>
              </div>
              
              
            </div>
            ))}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-10" onClick={handleDeleteCalculate}>초기화</button>
          </>
          
        </div>
        <div className=' bg-gray-400 p-10 rounded-2xl'>
        <>
          <h1 className='text-lg'>공학용 계산기</h1>
          {engineeringCal?.map((cal) => (
                <div key={cal._id}>
                  <div className='flex'>
                  <div>{cal.operator} </div>
                <div>{cal.firstinput}</div>
                  </div>
                
            
              
              <div>{cal.result}</div>
            </div>
            ))}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-10" onClick={handleDeleteEngineering}>초기화</button>
          </>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
