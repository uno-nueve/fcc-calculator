import React from 'react';

const Calculator = () => {
    return (
        <div className='calculator-wrapper'>
            <div className='display' id='display'>
                <h4>Input numbers</h4>
                <h2>Results</h2>
            </div>
            <div className='numkey-wrapper'>
                <button className='key' id='zero'>0</button>
                <button className='key' id='one'>1</button>
                <button className='key' id='two'>2</button>
                <button className='key' id='three'>3</button>
                <button className='key' id='four'>4</button>
                <button className='key' id='five'>5</button>
                <button className='key' id='six'>6</button>
                <button className='key' id='seven'>7</button>
                <button className='key' id='eight'>8</button>
                <button className='key' id='nine'>9</button>
            </div>
            <button className='key' id='clear'>C</button>
            <button className='key' id='add'>+</button>
            <button className='key' id='subtract'>-</button>
            <button className='key' id='multiply'>*</button>
            <button className='key' id='divide'>/</button>
            <button className='key' id='decimal'>.</button>
            <button className='key' id='equals'>=</button>
        </div>
    );
}

export default Calculator;
