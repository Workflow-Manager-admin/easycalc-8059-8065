import React, { useState } from 'react';
import './Calculator.css';

// PUBLIC_INTERFACE
/**
 * Calculator component for EasyCalc application
 * Provides a user-friendly calculator with basic arithmetic operations
 */
const Calculator = () => {
  const [currentOperand, setCurrentOperand] = useState('0');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operation, setOperation] = useState('');
  const [shouldResetScreen, setShouldResetScreen] = useState(false);

  /**
   * Appends a digit to the current operand
   * @param {string} digit - The digit to append
   */
  const appendDigit = (digit) => {
    if (currentOperand === '0' || shouldResetScreen) {
      setCurrentOperand(digit);
      setShouldResetScreen(false);
    } else if (currentOperand.length < 12) { // Limit input length
      setCurrentOperand(`${currentOperand}${digit}`);
    }
  };

  /**
   * Appends a decimal point to the current operand if it doesn't already have one
   */
  const appendDecimal = () => {
    if (shouldResetScreen) {
      setCurrentOperand('0.');
      setShouldResetScreen(false);
      return;
    }
    
    if (!currentOperand.includes('.')) {
      setCurrentOperand(`${currentOperand}.`);
    }
  };

  /**
   * Sets the operation and moves the current operand to the previous operand
   * @param {string} op - The operation to perform
   */
  const chooseOperation = (op) => {
    if (currentOperand === '0' && previousOperand === '') return;
    
    if (previousOperand !== '') {
      calculateResult();
    }
    
    setOperation(op);
    setPreviousOperand(`${currentOperand} ${op}`);
    setShouldResetScreen(true);
  };

  /**
   * Calculates the result of the current operation
   */
  const calculateResult = () => {
    if (previousOperand === '' || shouldResetScreen) return;

    const prev = parseFloat(previousOperand.split(' ')[0]);
    const current = parseFloat(currentOperand);
    let result;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '×':
        result = prev * current;
        break;
      case '÷':
        if (current === 0) {
          result = 'Error';
        } else {
          result = prev / current;
        }
        break;
      default:
        return;
    }

    // Round to avoid floating point issues
    if (typeof result === 'number') {
      // Convert to string and check its length
      const resultStr = result.toString();
      
      // If result is too long, try to format it
      if (resultStr.length > 12) {
        // For very large or small numbers, use exponential notation
        if (result > 999999999 || (result < 0.000001 && result !== 0)) {
          result = result.toExponential(6);
        } else {
          // Otherwise, try to limit decimal places
          result = parseFloat(result.toFixed(10));
        }
      }
    }

    setCurrentOperand(result.toString());
    setPreviousOperand('');
    setOperation('');
    setShouldResetScreen(true);
  };

  /**
   * Clears all calculator state
   */
  const clear = () => {
    setCurrentOperand('0');
    setPreviousOperand('');
    setOperation('');
    setShouldResetScreen(false);
  };

  /**
   * Deletes the last character from the current operand
   */
  const deleteDigit = () => {
    if (shouldResetScreen) {
      setCurrentOperand('0');
      setShouldResetScreen(false);
    } else if (currentOperand.length === 1) {
      setCurrentOperand('0');
    } else {
      setCurrentOperand(currentOperand.slice(0, -1));
    }
  };

  /**
   * Toggles the sign of the current operand
   */
  const toggleSign = () => {
    if (currentOperand === '0') return;
    
    setCurrentOperand(
      currentOperand.startsWith('-') 
        ? currentOperand.slice(1) 
        : `-${currentOperand}`
    );
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="previous-operand">{previousOperand}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <div className="keypad">
        <button className="btn-calc btn-clear" onClick={clear}>AC</button>
        <button className="btn-calc btn-delete" onClick={deleteDigit}>⌫</button>
        <button className="btn-calc btn-operation" onClick={() => chooseOperation('÷')}>÷</button>
        
        <button className="btn-calc" onClick={() => appendDigit('7')}>7</button>
        <button className="btn-calc" onClick={() => appendDigit('8')}>8</button>
        <button className="btn-calc" onClick={() => appendDigit('9')}>9</button>
        <button className="btn-calc btn-operation" onClick={() => chooseOperation('×')}>×</button>
        
        <button className="btn-calc" onClick={() => appendDigit('4')}>4</button>
        <button className="btn-calc" onClick={() => appendDigit('5')}>5</button>
        <button className="btn-calc" onClick={() => appendDigit('6')}>6</button>
        <button className="btn-calc btn-operation" onClick={() => chooseOperation('-')}>−</button>
        
        <button className="btn-calc" onClick={() => appendDigit('1')}>1</button>
        <button className="btn-calc" onClick={() => appendDigit('2')}>2</button>
        <button className="btn-calc" onClick={() => appendDigit('3')}>3</button>
        <button className="btn-calc btn-operation" onClick={() => chooseOperation('+')}>+</button>
        
        <button className="btn-calc" onClick={toggleSign}>+/-</button>
        <button className="btn-calc" onClick={() => appendDigit('0')}>0</button>
        <button className="btn-calc" onClick={appendDecimal}>.</button>
        <button className="btn-calc btn-equals" onClick={calculateResult}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
