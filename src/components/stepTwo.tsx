import React, { useState } from 'react';

export const StepTwo = () => {
  const [location, setLocation] = useState<string>(`Lviv, Ukrain`);

  return (
    <div>
      <p>Is this your location</p>
      <div className="row">
        <div className="six columns">
          <label>Location</label>
          <input
            className="u-full-width"
            placeholder="First Name"
            type="text"
            onChange={(event) => setLocation(event.target.value)}
            value={location}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};
