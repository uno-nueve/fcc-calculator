import React, { useState } from 'react';
import * as math from 'mathjs'

const numbers = [
    {
        id: 'one',
        value: 1
    },
    {
        id: 'two',
        value: 2
    },
    {
        id: 'three',
        value: 3
    },
    {
        id: 'four',
        value: 4
    },
    {
        id: 'five',
        value: 5
    },
    {
        id: 'six',
        value: 6
    },
    {
        id: 'seven',
        value: 7
    },
    {
        id: 'eight',
        value: 8
    },
    {
        id: 'nine',
        value: 9
    },
];

const operators = [
    {
        id: 'add',
        value: '+'
    },
    {
        id: 'subtract',
        value: '-'
    },
    {
        id: 'multiply',
        value: '*'
    },
    {
        id: 'divide',
        value: '/'
    },
]

const NumKey = ({ value, id, update }) => {

    return(
        <button id={id} onClick={() => update(value.toString())}>{value}</button>
    );
}

const OpKey = ({ value, id, update }) => {

    return(
        <button id={id} onClick={() => update(value)}>{value}</button>
    );
}

const CalculatorTest2 = () => {
    const [display, setDisplay] = useState('');
    const [result, setResult] = useState('');

    const displayNumber = (value) => {
        if (display.length >= 1 && value === '0') {
            return;
        }
        setDisplay(display + value)
        setResult(math.evaluate(display + value))
    }

    const displayOperator = (value) => {
        if (display.length === 0 && value !== '-') {
            return;
        }
        setDisplay(display + ' ' + value + ' ')
    }

    const includeDecimal = () => {
        const input = display.split(' ')
        const currentInput= input[input.length - 1]

        if (!currentInput.includes('.')) {
            setDisplay(display + '.')
        }
    }

    const getResult = () => {
        setDisplay(result)
    }

    const reset = () => {
        setDisplay('')
        setResult('')
    }

    return (
        <div className='calculator-wrapper'>
            <div id="display">
                {/* { result ? <span> ({result}) </span> : '' } */}
                <span>{display || '0'}</span>
            </div>
            <div className="operators">
                { operators.map(({ value, id }) => {
                    return (
                        <OpKey value={value} id={id} key={id} update={displayOperator} />
                    );
                }) }
                <button id="clear" onClick={reset}>C</button>
            </div>
            <div className="numbers">
                { numbers.map(({ value, id }) => {
                    return (
                        <NumKey value={value} id={id} key={id} update={displayNumber} />
                    );
                }) }
            </div>
            <div className="other-keys">
                <button id="zero" onClick={() => displayNumber('0')}>0</button>
                <button id="equals" onClick={getResult}>=</button>
                <button id="decimal" onClick={includeDecimal}>.</button>
            </div>
        </div>
    );
}

export default CalculatorTest2;
