
const Loader = ({ style }) => {

  return (
    <div className={`flex justify-center items-center bg-transparent `}>

      <div className="relative">
      <div className={`top-1/2  left-1/2 animate-spin rounded-full border-2 border-gray-300 border-t-3  border-t-gray-950 opacity-80 ${style?style:"h-5 w-5"}`}></div>
      </div>
    </div>
  );
};

export default Loader;
