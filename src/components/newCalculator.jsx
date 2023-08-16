import React, { useState } from 'react';

const buttons = [
    {id: 'clear', value: 'C', type: 'clear' },
    {id: 'divide', value: '/', type: 'operator' },
    {id: 'multiply', value: '*', type: 'operator' },
    {id: 'subtract', value: '-', type: 'operator' },
    {id: 'seven', value: '7', type: 'number' },
    {id: 'eight', value: '8', type: 'number' },
    {id: 'nine', value: '9', type: 'number' },
    {id: 'add', value: '+', type: 'operator' },
    {id: 'four', value: '4', type: 'number' },
    {id: 'five', value: '5', type: 'number' },
    {id: 'six', value: '6', type: 'number' },
    {id: 'one', value: '1', type: 'number' },
    {id: 'two', value: '2', type: 'number' },
    {id: 'three', value: '3', type: 'number' },
    {id: 'zero', value: '0', type: 'number' },
    {id: 'decimal', value: '.', type: 'decimal' },
    {id: 'equals', value: '=', type: 'equals' },
];

const Display = ({ display, results }) => {
    console.log('Is this true: ', display.length === 1 && display === '0')
    return (
        <div id="display">
            { results === '' 
                ? display === ''
                    ? 0
                    : display
                : results
            }
        </div>
    )
};

const Key = ({ value, id, type, handleInput }) => {
    return (
        <button 
            className='button'
            id={ id }
            onClick={ () => handleInput(value, type) }
        >
            { value }
        </button>
    )
};

const Keyboard = ({ handleInput }) => {
    return (
        <div className='keyboard'>
            { buttons.map((key) => (
                <Key 
                    value={key.value} 
                    id={key.id} 
                    key={key.id} 
                    type={key.type} 
                    handleInput={handleInput} 
                />
            )) }
        </div>
    )
};

const NewCalculator = () => {
    const [display, setDisplay] = useState('');
    const [calculation, setCalculation] = useState('');
    const [results, setResults] = useState('');

    const handleInput = (value, type) => {

        if (results !== '') {
            setDisplay(results)
            setResults('')
        }

        setDisplay(display => display + value)

        switch (type) {
            case 'number':
                handleNumber(value)
                break;
            case 'operator':
                handleOperator(value)
                break;
            case 'clear':
                handleClear()
                break;
            case 'decimal':
                handleDecimal()
                break;
            case 'equals':
                handleResult()
                break;
            default:
                break;
        }
    };

    const handleNumber = (value) => {

        switch (value) {
            case '0':
                if (display.length === 1 && display === '0') {
                    setDisplay(display)
                } else {
                    setDisplay(display + value.toString())
                    setCalculation(display + value.toString())
                }
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                setDisplay(display + value.toString())
                setCalculation(display + value.toString())
                break;
        default:
                break;
        }
    };

    const handleOperator = (value) => {

        const lastDigit = display.charAt(display.length - 1)
        const lastIsOperator = buttons.some((key) => key.type === 'operator' && key.value === lastDigit)

        const prevLastDigit = display.charAt(display.length - 2)
        const prevLastIsOperator = buttons.some((key) => key.type === 'operator' && key.value === prevLastDigit)

        switch (value) {
            case '-':
                if (!lastIsOperator) {
                    setDisplay(display + value.toString())
                    setCalculation(display + value.toString())
                } else {
                    if (lastIsOperator && lastDigit === '*') {
                        setDisplay(display + value.toString())
                        setCalculation(display + value.toString())
                    } else if (lastIsOperator && lastDigit !== '*') {
                        const updatedValue = calculation.substring(0, calculation.length - 1) + value;
                        setDisplay(updatedValue.toString())
                        setCalculation(updatedValue.toString())
                    }
                }
                break;
            case '+':
            case '/':
                if (!lastIsOperator && display.length >= 1) {
                    setDisplay(display + value.toString())
                    setCalculation(display + value.toString())
                } else {
                    if (prevLastIsOperator && lastIsOperator) {
                        const updatedValue = calculation.substring(0, calculation.length - 2) + value;
                        setDisplay(updatedValue.toString())
                        setCalculation(updatedValue.toString())
                    } else {
                        if (lastIsOperator) {
                            const updatedValue = calculation.substring(0, calculation.length - 1) + value;
                            setDisplay(updatedValue.toString())
                            setCalculation(updatedValue.toString())
                        }
                    }
                }
                break;
            case '*':
                if (!lastIsOperator && display.length >= 1) {
                    setDisplay(display + value.toString())
                    setCalculation(display + value.toString())
                } else {
                    if (lastIsOperator) {
                        const updatedValue = calculation.substring(0, calculation.length - 1) + value;
                        setDisplay(updatedValue.toString())
                        setCalculation(updatedValue.toString())
                    }
                }
                break;
            default:
                break;
        }
    };

    const handleClear = () => {

        setDisplay('')
        setCalculation('')
        setResults('')
    };

    const handleDecimal = () => {

        const lastDigit = calculation.charAt(calculation.length - 1);

        if (display.length === 0) {
            setDisplay('0.')
            setCalculation('0.')
        } else {
            if (lastDigit === '*' || buttons.some((key) => key.type === 'operator' && key.value === lastDigit)) {
                setDisplay(display + '0.')
                setCalculation(calculation + '0.')
            } else {
                if (lastDigit === '.' || calculation.includes('.')) {
                    const operator = calculation.includes('+') 
                        ? '+' 
                        : calculation.includes('-')
                        ? '-'
                        : calculation.includes('*')
                        ? '*'
                        : calculation.includes('/')
                        ? '/'
                        : ''
                    
                    if (operator !== '') {
                        const operatorSplit = calculation.indexOf(operator)
                        const operatorSplitted = calculation.split(operatorSplit)

                        setDisplay(operatorSplitted + '.')
                        setCalculation(operatorSplitted + '.')
                    } else {
                        setDisplay(display)
                        setCalculation(calculation)
                    }
                } else {
                    setDisplay(display + '.')
                    setCalculation(calculation + '.')
                }
            }
        }
    };

    const handleResult = () => {

        if (calculation.length >= 1) {
            const res = eval(calculation)
            setDisplay('')
            setCalculation(res.toString())
            setResults(res.toString())
        }
    };

    return (
        <div>
            <h1>Calculator</h1>
            <Display display={display} results={results} />
            <Keyboard handleInput={handleInput} />
        </div>
    );
}

export default NewCalculator;
