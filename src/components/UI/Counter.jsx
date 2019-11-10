import React from 'react'

const Counter = props => {
    const { dataTest, children } = props;
    return (
        <div data-test={dataTest}>
            {children}
        </div>
    )
}
export default Counter;
