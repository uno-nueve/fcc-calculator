import React, { useState, useEffect } from 'react';

const buttons = [
    {id: 'clear', value: 'C'},
    {id: 'divide', value: '/'},
    {id: 'multiply', value: 'X'},
    {id: 'subtract', value: '-'},
    {id: 'seven', value: '7'},
    {id: 'eight', value: '8'},
    {id: 'nine', value: '9'},
    {id: 'add', value: '+'},
    {id: 'four', value: '4'},
    {id: 'five', value: '5'},
    {id: 'six', value: '6'},
    {id: 'one', value: '1'},
    {id: 'two', value: '2'},
    {id: 'three', value: '3'},
    {id: 'zero', value: '0'},
    {id: 'decimal', value: '.'},
    {id: 'equals', value: '='},
];

const operators = ['+', '-', 'X', '/', 'C', '='];

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const Display = ({ input, output }) => {
    return (
        <div className='output'>
            <span className="result">{output}</span>
            <span id="display" className='input'>{input}</span>
        </div>
    )
}

const Key = ({ keyData: { id, value }, handleInput }) => {
    return(
        <button id={id} onClick={() => handleInput(value)}>
            { value }
        </button>
    )
}

const Keyboard = ({ handleInput }) => {
    return (
        <div className='keys'>
            { buttons.map((key) => (
                <Key key={key.id} keyData={key} handleInput={handleInput} />
            )) }
        </div>
    )
}

const CalculatorTest3 = () => {
    const [input, setInput] = useState('0');
    const [output, setOutput] = useState('');
    const [displayData, setDisplayData] = useState('');

    const handleResult = () => {
        const result = eval(displayData)
        setInput(`${result}`)
        setOutput(`${result} = ${result}`)
        setDisplayData(`${result}`)
    }

    const handleClear = () => {
        setInput('0')
        setDisplayData('')
    }

    const handleNumbers = (value) => {

        if (!displayData.length) {
            setInput(`${value}`)
            setDisplayData(`${value}`)
        } else {
            if (value === '0' && (displayData === '0' || input === '0')) {
                setDisplayData(`${displayData}`)
            } else {
                const lastDigit = displayData.charAt(displayData.length - 1)
                const lastIsOperator = lastDigit === '*' || operators.includes(lastDigit)

                setInput(lastIsOperator ? `${value}` : `${input}${value}`)
                setDisplayData(`${displayData}${value}`)
            }
        }
    }

    const decimalOperator = () => {
        
        const lastDigit = displayData.charAt(displayData.length - 1)

        if (!displayData.length) {
            setInput('0.')
            setDisplayData('0.')
        } else {
            if (lastDigit === '*' || operators.includes(lastDigit)) {
                setInput('0.')
                setDisplayData(`${displayData} 0.`)
            } else {
                setInput(lastDigit === '.' || input.includes('.') ? `${input}` : `${input}.`)
                
                const formatedValue = lastDigit === '.' || input.includes('.')
                    ? `${displayData}`
                    : `${displayData}.`
        
                setDisplayData(formatedValue)
            }
        }

    }
    
    const handleOperators = (value) => {

        if (displayData.length) {

            setInput(`${value}`)

            const prevToLastDigit = displayData.charAt(displayData.length - 2)
            const prevToLastIsOperator = operators.includes(prevToLastDigit) || prevToLastDigit === '*'

            const lastDigit = displayData.charAt(displayData.length -1)
            const lastIsOperator = operators.includes(lastDigit) || lastDigit === '*'

            const validOp = value === 'X' ? '*' : value

            if (
                (lastIsOperator && value !== '-') ||
                (prevToLastIsOperator && lastIsOperator)
            ) {
                if (prevToLastIsOperator) {
                    const updatedValue = `${displayData.substring(0, displayData.length - 2)}${value}`
                    setDisplayData(updatedValue)
                } else {
                    setDisplayData(`${displayData.substring(0, displayData.length - 1)}${validOp}`)
                }
            } else {
                setDisplayData(`${displayData}${validOp}`)
            }
        }
    }

    const handleInput = (value) => {
        const number = numbers.find((num) => num === value)
        const operator = operators.find((op) => op === value)

        switch (value) {
            case '=':
                handleResult()
                break;
            case 'C':
                handleClear()
                break;
            case number:
                handleNumbers(value)
                break;
            case '.':
                decimalOperator(value)
                break;
            case operator:
                handleOperators(value)
                break;
            default:
                break;
        }
    }

    const handleOutput = () => {
        setOutput(displayData)
    }

    useEffect(() => {
        handleOutput()
    }, [displayData])

    return (
        <div className='calculator'>
            <div className='calculator-wrapper'>
                <Display input={input} output={output} />
                <Keyboard handleInput={handleInput} />
            </div>
        </div>
    );
}

export default CalculatorTest3;
