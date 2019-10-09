import React from 'react'

const TextInput = props => {
    return <input
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
    />
}
export default TextInput;