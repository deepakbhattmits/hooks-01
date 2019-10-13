import React from 'react'

const TextInput = props => {
    const { refe, id, type, value, onChange } = props;
    return <input
        ref={refe}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
    />
}
export default TextInput;