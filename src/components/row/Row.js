import Card from "../card/Card";

function Row(props) {
  return (
    <div
      className="flex flex-wrap w-full sm:justify-start justify-center pl-20 pr-20 mt-3"
      key={props.property.length}
    >
      {props.property.map((item, index) => {
        return (
          <div
            key={index}
            className="ml-10 ssm:w-[80%] sm:w-[45%] md:w-[45%] lg:w-[30%] 2lg:w-[23%]"
          >
            <Card item={item} index={index} />
          </div>
        );
      })}
    </div>
  );
}

export default Row;
