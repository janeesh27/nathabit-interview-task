import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SearchResults from "../components/SearchResults";
import Favorites from "../components/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: `/search`,
    element: <SearchResults />,
  },
  {
    path: `/favorites`,
    element: <Favorites />,
  },
]);

export default router;
