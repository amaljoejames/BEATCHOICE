// Button.js
import React from 'react';

const Button = ({ onClick, children, className }) => {
  return (
    <button onClick={onClick} className={`py-2 px-4 rounded ${className}`}>
      {children}
    </button>
  );
};

export default Button; // Ensure it's a default export

function InfoPopup({ title, description }) {
  return (
    <Card className="p-4 shadow-lg bg-black/40 backdrop-blur-md text-white max-w-xs mx-auto mb-4 border border-white/20">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </Card>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      {/* Add other scene elements here */}
    </Canvas>
  );
}
