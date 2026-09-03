export default function StitchDivider() {
  return (
    <div className="w-full py-12 flex justify-center" aria-hidden="true">
      <svg
        width="200"
        height="2"
        viewBox="0 0 200 2"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-60"
      >
        {/* Tailoring stitch pattern */}
        <line x1="0" y1="1" x2="20" y2="1" stroke="#B8925A" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="25" y1="1" x2="45" y2="1" stroke="#B8925A" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="50" y1="1" x2="70" y2="1" stroke="#B8925A" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="75" y1="1" x2="95" y2="1" stroke="#B8925A" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="100" y1="1" x2="120" y2="1" stroke="#B8925A" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="125" y1="1" x2="145" y2="1" stroke="#B8925A" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="150" y1="1" x2="170" y2="1" stroke="#B8925A" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="175" y1="1" x2="195" y2="1" stroke="#B8925A" strokeWidth="0.5" strokeDasharray="3 3" />
        
        {/* Stitch dots */}
        <circle cx="10" cy="1" r="0.8" fill="#B8925A" />
        <circle cx="35" cy="1" r="0.8" fill="#B8925A" />
        <circle cx="60" cy="1" r="0.8" fill="#B8925A" />
        <circle cx="85" cy="1" r="0.8" fill="#B8925A" />
        <circle cx="110" cy="1" r="0.8" fill="#B8925A" />
        <circle cx="135" cy="1" r="0.8" fill="#B8925A" />
        <circle cx="160" cy="1" r="0.8" fill="#B8925A" />
        <circle cx="185" cy="1" r="0.8" fill="#B8925A" />
      </svg>
    </div>
  );
}
