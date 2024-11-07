import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import search_icon from "../images/search_icon.png"
import {auth} from "../utils/firebase"
import {signOut } from "firebase/auth";
import { useSelector } from "react-redux";


const Browse = () => {
  const [info, setInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const user=useSelector( store=>store.user);


  const handleSignOut=()=>{
    signOut(auth).then(() => {

      }).catch((error) => {

      });
      
}


  const getTimeAgo = (dateString) => {
    const now = new Date();
    const createdDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - createdDate) / 1000);

    const years = Math.floor(diffInSeconds / (365 * 24 * 60 * 60));
    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;

    const months = Math.floor(diffInSeconds / (30 * 24 * 60 * 60));
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;

    const weeks = Math.floor(diffInSeconds / (7 * 24 * 60 * 60));
    if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;

    const days = Math.floor(diffInSeconds / (24 * 60 * 60));
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;

    const hours = Math.floor(diffInSeconds / (60 * 60));
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    return "Just now";
  };

  const handleCardClick = (item) => {
    navigate("/comments", { state: { comments: item.children || [] } });
  };

  const getdata = async () => {
    const data = await fetch(
      `https://hn.algolia.com/api/v1/search?tags=story&page=${page}&hitsPerPage=20`
    );

    const json = await data.json();

    setInfo(json.hits);
  };



  useEffect(() => {
    getdata();
  }, [page]);

  const filteredData = info.filter((item) => {
    const titleMatch = item.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const authorMatch = item.author
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const urlMatch = item.url
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatch || authorMatch || urlMatch;
  });



  return (
    <div>
      <Header/>
      <div className="bg-orange-500 w-full h-16 flex justify-between">
        <div className="flex items-center">
          <img
            className="w-16 h-12"
            src="https://hn.algolia.com/public/899d76bbc312122ee66aaaff7f933d13.png"
            alt="Logo"
          />
    
        </div>

        <div className="w-3/4 flex items-center ">
          <img src={search_icon} alt="" className="w-5 h-5 absolute left-44"/>
          <input
            className="w-3/4 h-12 p-3 pl-14"
            type="search"
            name=""
            id=""
            placeholder="Search stories by title, url or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
 <div className="flex justify-center mt-1 ">
<button className="font-semibold bg-orange-500 text-white p-2" onClick={handleSignOut}><i>Logout</i></button>
</div>


      </div>

      <div className="bg-orange-50 w-full">

    <div className="my-2">
         <span className=" text-orange-500 p-2 font-semibold text-lg font-sans mr-1 cursor-pointer hover:text-black">Welcome {user && user.displayName}</span>
    </div>

        <div className="ml-3">
          {filteredData.map((item) => (
            <div
              key={item.objectID}
              className="mb-3"
              onClick={() => handleCardClick(item)}
              style={{ cursor: "pointer" }}
            >
              <p className="">
                {item.title}{" "}
                <a href={item.url} target="_blank" rel="noreferrer">
                  ( {item.url} )
                </a>
              </p>
              <p className="text-slate-500 text-xs">
                {item.points} points | {item.author} |{" "}
                {getTimeAgo(item.created_at)} | {item.num_comments} comments
              </p>
            </div>
          ))}

          <div className="">
            <button
             className="border border-black p-1 m-2 cursor-pointer"
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
            >
              Previous
            </button>
            <button className="border border-black p-1 m-2 cursor-pointer" onClick={() => setPage((prev) => prev + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
