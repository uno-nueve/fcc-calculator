import React, { useState } from 'react';
import './calculator.css'
import * as math from 'mathjs';

const Button = ({ symbol, color, handleClick }) => {
    return (
        <div 
            className='button-wrapper' 
            style={{backgroundColor : color}}
            onClick={() => handleClick(symbol)}
        >
            { symbol }
        </div>
    );
}

const Input = ({ text, result }) => {
    return (
        <div className='input-wrapper'>
            <div className="result">
                <h1>{ result }</h1>
            </div>
            <div className="text">
                <h3>{ text }</h3>
            </div>
        </div>
    );
}

const CalculatorTest = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState('');

    const addToText = (value) => {
        setText(text => [...text, value + ' '])
    }

    const resetInput = () => {
        setText('')
        setResult('')
    }

    const calculateResult = () => {
        const input = text.join('')

        setResult(math.evaluate(input))
    }

    const buttonColor = '#f2a33c'
    
    return (
        <div className='calculator-wrapper'>
            <Input text={text} result={result} />
            <div className="row">
                <Button symbol={'7'} handleClick={addToText} />
                <Button symbol={'8'} handleClick={addToText} />
                <Button symbol={'9'} handleClick={addToText} />
                <Button symbol={'/'} color={buttonColor} handleClick={addToText} />
            </div>
            <div className="row">
                <Button symbol={'4'} handleClick={addToText} />
                <Button symbol={'5'} handleClick={addToText} />
                <Button symbol={'6'} handleClick={addToText} />
                <Button symbol={'*'} color={buttonColor} handleClick={addToText} />
            </div>
            <div className="row">
                <Button symbol={'1'} handleClick={addToText} />
                <Button symbol={'2'} handleClick={addToText} />
                <Button symbol={'3'} handleClick={addToText} />
                <Button symbol={'-'} color={buttonColor} handleClick={addToText} />
            </div>
            <div className="row">
                <Button symbol={'0'} handleClick={addToText} />
                <Button symbol={'.'} handleClick={addToText} />
                <Button symbol={'='} handleClick={calculateResult}/>
                <Button symbol={'+'} color={buttonColor} handleClick={addToText} />
            </div>
            <Button symbol={'Clear'} color={'red'} handleClick={resetInput} />
        </div>
    );
}

export default CalculatorTest;

