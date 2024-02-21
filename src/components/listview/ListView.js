import Category from "../category/Category";
import Row from "../row/Row";

function ListView({data}) {
    return (
      <div className="main">
        <Category />
        <Row property={data} />
      </div>
    );
}

export default ListView;