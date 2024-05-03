import React, { useState } from 'react';

const BasicSlider: React.FC = () => {
    const [sliderVal, setSliderVal] = useState<number>(5);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderVal(Number(event.target.value));

};

return (
    <div>
        <input
            type="range"
            min={0}
            max={10}
            value={sliderVal}
            onChange={handleChange}
        />
        <p>Value: {sliderVal}</p>
    </div>
    );
};

export default BasicSlider;