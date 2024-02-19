import Card from "../card/Card";

function Row(props) {
    console.log(props.property);
    return (
      <div className="flex flex-wrap w-full justify-between pl-20 pr-20 mt-3" key={props.property.length}>
            {props.property.map((item,index) => {
                return (
                    <Card item={item} index={index} key={index} />
                )
            })}
      </div>
    );
}

export default Row;