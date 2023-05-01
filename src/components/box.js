const Box = ({ id, value, handleClick }) => {
  return (
    <div
      className="w-[200px] h-[200px] border border-white-700 box-border flex justify-center items-center"
      id={id}
      onClick={handleClick}
    >
      {" "}
      {value}
    </div>
  );
};

export default Box;
