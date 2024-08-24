import React from 'react';

const InputType = ({
     labelText, 
     InputType, 
     value, 
     onChange, 
     name,
    }) => {
    return (
        <>
          <div className="mb-1">
            <label htmlFor="exampleInputEmail" className="form-label">{labelText}</label>
            <input
              type={InputType}
              className="form-control"
              name={name}
              value={value}
              onChange={onChange}
            />
            </div>
        </>
    );
}

export default InputType;
