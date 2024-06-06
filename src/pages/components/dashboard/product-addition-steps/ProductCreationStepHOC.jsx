/* eslint-disable react/prop-types */
const ProductCreationStepHOC = ({
  title = "",
  children = null,
  justify = "center",
}) => {
  return (
    <div
      className="center"
      style={{ flexDirection: "column", alignItems: justify }}
    >
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default ProductCreationStepHOC;
