// InfoPopup.js
const InfoPopup = ({ title, description }) => {
    return (
      <div className="p-4 bg-white/10 border border-white/20 rounded">
        <h3 className="font-bold text-white">{title}</h3>
        <p className="text-white/80">{description}</p>
      </div>
    );
  };
  
  export default InfoPopup;
  