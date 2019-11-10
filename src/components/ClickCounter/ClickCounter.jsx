import React, { useState } from 'react'
// import Counter from '../UI/Counter'
const ClickCounter = () => {
    const [counter, setCounter] = useState(0);
    const handleClick = () => {
        setCounter(counter + 1)
    }
    return (
        <div data-test="component-click-counter">
            <h1 dataTest='counter-display'>
                {counter}
            </h1>
            <button data-test="increment-button" type="submit" onClick={handleClick}>
                increment button
            </button>
        </div>
    )
}
export default ClickCounter
