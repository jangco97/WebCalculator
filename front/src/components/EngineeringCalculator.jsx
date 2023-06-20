import React, {useState} from 'react';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import './Engineering.css';
import axiosInstance from '../utils/axios';

function EngineeringCalculator() {
    const [num, setNum] = useState(0);
    const [oldNum, setOldNum] = useState(0);
    const [operator, setOperator] = useState();
    const [requestOperator, setRequestOperator] = useState('cos')
    const [result, setResult] = useState(0);
    function inputNum (e) {
        let input = e.target.value
        if(num === 0){
            setNum(input);
            setOldNum(input)
        } else {
            setNum(num+input);
            setOldNum(num+input);
        }
    }

    function clear() {
        setNum(0);
        setOldNum(0);
        setOperator();
        setResult(0);
    }

    function porcentagem(e) {
        setNum(num / 100);
    }

    function changeSign() {
        if(num > 0) {
            setNum(-num);
        } else {
            setNum(Math.abs(num));
        }
    }

    function operatorHandler(e) {
        let operatorInput = e.target.value;
        setOldNum(num);
        setOperator(operatorInput);
        setNum(0);
        if(e.target.value === "cos") {
            setRequestOperator('cos');
        }else if(e.target.value === "sin") {
            setRequestOperator('sin');
        }else if(e.target.value === "tan") {
            setRequestOperator('tan');
        }else if(e.target.value === "log") {
            setRequestOperator('log');
        } else if(e.target.value === "sqrt") {
            setRequestOperator('sqrt');
        } else if(e.target.value === "pow"){
            setRequestOperator('pow');
        } else if(e.target.value === "exp"){
           setRequestOperator('exp');
        } else {
          return;
        }
    }

    const calculate = async() => {
      if(num  && operator) {
        try {
          const response = await axiosInstance.post(`/engineering/${requestOperator}`, {
            firstinput: num,
            operator: operator})
            setNum(0)
            setResult(response.data.result)
        }catch(error){
          console.log(error)
        }
        
    }else {
      alert('입력이 올바르지 않습니다.')
    }
  }
    
    return (
      <div>
         <div>
          
            <Box m={5}/>
            <Container maxWidth="xs">
                <div className='wrapper'>
                <Box m={10}/>
                
                <h1 className='resultado'>{num}</h1>
                    
                    <div>
                      <button className='grey' onClick={clear}>AC</button>
                      <button className='grey' onClick={changeSign}>+/-</button>
                      <button className='grey' onClick={porcentagem}>%</button>
                      <button className='orange' onClick={operatorHandler} value={'sin'}>sin</button>
                    </div>
                    
                    <div>
                      <button className='grey' onClick={inputNum} value={7}>7</button>
                      <button className='grey' onClick={inputNum} value={8}>8</button>
                      <button className='grey' onClick={inputNum} value={9}>9</button>
                      <button className='orange' onClick={operatorHandler} value={'cos'}>cos</button>
                    </div>
                    
                    <div><button className='grey' onClick={inputNum} value={4}>4</button>
                    <button className='grey' onClick={inputNum} value={5}>5</button>
                    <button className='grey' onClick={inputNum} value={6}>6</button>
                    <button className='orange' onClick={operatorHandler} value={'tan'}>tan</button>
                    </div>
                    <div>
                    <button className='grey' onClick={inputNum} value={1}>1</button>
                    <button className='grey' onClick={inputNum} value={2}>2</button>
                    <button className='grey' onClick={inputNum} value={3}>3</button>
                    <button className='orange' onClick={operatorHandler} value={'log'}>log</button>
                    </div>
                    <div>
                    <button className='grey' onClick={inputNum} value={0}>0</button>
                    <button style={{visibility: "hidden"}}>k</button> 
                    <button className='grey' onClick={inputNum} value={"."}>,</button>
                    <button className='orange' onClick={calculate}>=</button>
                    </div>
                    <div>
                    <button className='orange' onClick={operatorHandler} value={'sqrt'}>sqrt</button>
                    <button className='orange' onClick={operatorHandler} value={'pow'}>pow</button>
                    <button className='orange' onClick={operatorHandler} value={'exp'}>exp</button>
                    </div>
                    
                    
           
              
                </div>
                <div className='resultBox'>
                <div>연산자:{operator}</div>
        <div>입력:{oldNum}</div>
        
        <div>결과: {result}</div>
      </div>
                
            </Container>
            
        </div>
        
      </div>
       
    )
}
export default EngineeringCalculator;