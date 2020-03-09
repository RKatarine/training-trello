import { withProps, compose, withState } from "recompose";
import sections from "../../stubs/sections";
import withLocalStorage from "../../hocs/withLocalStorage";
import App from "./App";

export default compose(
  withState("sections", "setSections", sections),
  withLocalStorage(["sections", "setSections"])
)(App);
