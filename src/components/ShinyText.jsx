const ShinyText = ({ text, disabled = false, speed = 5, isActive=false, className = '' }) => {
    const animationDuration = `${speed}s`;
  
    return (
      <div
        className={`text-[#f1f1f1b0] hover:text-white transition-all duration-300 ease-in-out bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className} ${isActive ? 'text-white' : ''}`}
        style={{
          backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 60%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          animationDuration: animationDuration,
        }}
      >
        {text}
      </div>
    );
  };
  
  export default ShinyText;