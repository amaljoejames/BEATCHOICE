// components/ui/card.js
export function Card({ children, className }) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
}
