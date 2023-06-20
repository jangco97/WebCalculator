import React, {useState} from 'react';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import './Calculator.css';
import axiosInstance from '../utils/axios';


function Calculator() {
    const [num, setNum] = useState(0);
    const [oldNum, setOldNum] = useState(0);
    const [oldNum2, setOldNum2] = useState(0);
    const [operator, setOperator] = useState();
    const [requestOperator, setRequestOperator] = useState('add')
    const [result, setResult] = useState(0);
    function inputNum (e) {
        let input = e.target.value
        if(num === 0){
            setNum(input);
        } else {
            setNum(num+input);
        }
    }

    function clear() {
        setNum(0);
        setOldNum(0);
        setOperator();
        setResult(0);
        setOldNum2(0);
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
        setOperator(operatorInput);
        setOldNum(num);
        setNum(0);
        if(e.target.value === "/") {
            setRequestOperator('divide');
        }else if(e.target.value === "X") {
            setRequestOperator('multiply');
        }else if(e.target.value === "-") {
            setRequestOperator('substract');
        }else if(e.target.value === "+") {
            setRequestOperator('add');
        } else {
          return
        }
    }

    const calculate = async() => {
      if(num && oldNum && operator) {
        try {
          const response = await axiosInstance.post(`/calculate/${requestOperator}`, {
            firstinput: oldNum,
            secondinput: num,
            operator: operator})
            setOldNum2(num)
            setNum(response.data.result)
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
                      <button className='orange' onClick={operatorHandler} value={'/'}>/</button>
                    </div>
                    
                    <div>
                      <button className='grey' onClick={inputNum} value={7}>7</button>
                      <button className='grey' onClick={inputNum} value={8}>8</button>
                      <button className='grey' onClick={inputNum} value={9}>9</button>
                      <button className='orange' onClick={operatorHandler} value={'X'}>X</button>
                    </div>
                    
                    <div><button className='grey' onClick={inputNum} value={4}>4</button>
                    <button className='grey' onClick={inputNum} value={5}>5</button>
                    <button className='grey' onClick={inputNum} value={6}>6</button>
                    <button className='orange' onClick={operatorHandler} value={'-'}>-</button>
                    </div>
                    <div>
                    <button className='grey' onClick={inputNum} value={1}>1</button>
                    <button className='grey' onClick={inputNum} value={2}>2</button>
                    <button className='grey' onClick={inputNum} value={3}>3</button>
                    <button className='orange' onClick={operatorHandler} value={'+'}>+</button>
                    </div>
                    <div>
                    <button className='grey' onClick={inputNum} value={0}>0</button>
                    <button style={{visibility: "hidden"}}>k</button> 
                    <button className='grey' onClick={inputNum} value={"."}>,</button>
                    <button className='orange' onClick={calculate}>=</button>
                    </div>
                    
                    
           
              
                </div>
                <div className='resultBox'>
        <div>첫번째 입력:{oldNum}</div>
        <div>연산자:{operator}</div>
        <div>두번쨰 입력: {oldNum2}</div>
        <div>결과: {result}</div>
      </div>
                
            </Container>
            
        </div>
        
      </div>
       
    )
}
export default Calculator;