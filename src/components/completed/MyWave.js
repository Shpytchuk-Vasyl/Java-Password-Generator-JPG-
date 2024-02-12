import * as React from 'react';
import "./MyWave.css"
import Wave from 'react-wavify';

export const MyWave = ({ children, scrollHeight }) => {
    return (
        <div className="waves">
            {children}
            <div className="wave-container" style={{height: scrollHeight}}>
                <Wave
                    fill="#00b6ad"
                    paused={false}
                    opacity="0.30"
                    options={{
                        height: 20,
                        amplitude: 50,
                        speed: 0.2,
                        points: 3,
                    }}
                />
            </div>
            <div className="wave-container" style={{height: scrollHeight}}>
                <Wave
                    fill="#00959e"
                    opacity="0.80"
                    paused={false}
                    options={{
                        height: 40,
                        amplitude: 20,
                        speed: 0.3,
                        points: 2,
                    }}
                />
            </div>
            <div className="wave-container" style={{height: scrollHeight}}>
                <Wave
                    fill="#01838a"
                    paused={false}
                    opacity="0.5"
                    options={{
                        height: 50,
                        amplitude: 30,
                        speed: 0.4,
                        points: 4,
                    }}
                />
            </div>
        </div>
    );
};