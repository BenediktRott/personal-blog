import { useEffect, useState } from "react";
import "./App.css";
import { api } from "./services/blogApi";
import { useAuth } from "./context/AuthContext";
import { Home } from "./pages/Home/Home";
import { Outlet } from "react-router";
import { Header } from "./components/Header/Header";

function App() {
  // const { token } = useAuth();
  // const [posts, setPosts] = useState(null);

  // useEffect(() => {
  //   let isMounted = true;
  //   console.log("Here");

  //   async function getPosts() {
  //     const posts = await api.getPosts();
  //     if (isMounted) setPosts(posts);
  //   }

  //   getPosts();

  //   console.log(posts);
  //   setPosts(posts);

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [token]);

  // if (!posts) {
  //   return <p>Loading posts...</p>;
  // }

  return (
    <>
      <div className="contentArea">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default App;
