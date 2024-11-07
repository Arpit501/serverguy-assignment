
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Comments from "./Comments"





const Body=()=>{

    const appRouter=createBrowserRouter([
        {
            path:"/",
            element:<Login/>,
        },
        {
            path:"/browse",
            element:<Browse/>
        },
        {
            path:"/comments",
            element:<Comments/>
        }
    ])

    return(
        
        <div className="m-0 p-0 box-border">
          <RouterProvider router={appRouter}/>
        </div>
    )
}

export default Body;