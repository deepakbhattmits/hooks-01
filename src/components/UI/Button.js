import React from 'react';
const Button = props => {
    const { type } = props
    return <button type={type}>{props.children}</button>
}
export default Button;