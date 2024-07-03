import Main from "../Main/Main";
import { createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home";
import AddTask from "../pages/AddTask";
import ViewTasks from "../pages/ViewTask";
import EditTask from "../pages/EditTask";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/add-task',
                element: <AddTask></AddTask>
            },
            {
                path: '/tasks',
                element:<ViewTasks></ViewTasks>
            },
            {
                path: "/edit-task/:id",
                element:<EditTask></EditTask>
            }
        ]
    }
]);

export default router;
