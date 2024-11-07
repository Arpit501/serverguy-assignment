
import Body from "./components/Body"
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <div className="">
    {/* <p className="text-red-600">hello</p> */}
    <Provider store={appStore}>
    <Body/>
    </Provider>
    </div>
  );
}

export default App;
