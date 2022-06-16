import React, { useState } from 'react';

export const StepOne = () => {
  const [name, setName] = useState<string>();
  const [lastName, setLastName] = useState<string>();

  return (
    <div>
      <div className="row">
        <div className="six columns">
          <label>First Name</label>
          <input
            className="u-full-width"
            placeholder="First Name"
            type="text"
            onChange={(event) => setName(event.target.value)}
            value={name}
            autoFocus
          />
        </div>
      </div>
      <div className="row">
        <div className="six columns">
          <label>Last Name</label>
          <input
            className="u-full-width"
            placeholder="Last Name"
            type="text"
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
          />
        </div>
      </div>
    </div>
  );
};
