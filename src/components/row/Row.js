import Card from "../card/Card";

function Row(props) {
  return (
    <div
      className="flex flex-wrap w-full justify-start pl-20 pr-20 mt-3"
      key={props.property.length}
    >
      {props.property.map((item, index) => {
        return (
          <div
            key={index}
            className="ml-10 sm:w-[40%] md:w-[35%] lg:w-[30%] 2lg:w-[23%]"
          >
            <Card item={item} index={index} />
          </div>
        );
      })}
    </div>
  );
}

export default Row;
