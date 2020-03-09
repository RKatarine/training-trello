import { compose, withHandlers } from "recompose";
import CardEditor from "./CardEditor";
export default compose(
  withHandlers({
    onChange: props => event => {
      props.onChange(event.target.value);
    }
  })
)(CardEditor);
