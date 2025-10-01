import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { status } = useSelector((state) => {
    return state.auth;
  });

  async function fetchPosts() {
    try {
      const data = await service.getPosts();
      if (data) setPosts(data.rows);
    } catch (error) {
      console.log("Error in Fetching records :", error);
    }
  }

  useEffect(() => {
    if (status) fetchPosts();
  }, []);

  if (!status) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1
                className="text-2xl font-bold hover:text-gray-500"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        {posts.length > 0 ? (
          <div className="flex flex-wrap">
            <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
            {posts.map((post) => {
              return (
                <div key={post.$id} className="p-2 w-1/4">
                  <PostCard {...post} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center">No posts found</div>
        )}
      </Container>
    </div>
  );
}

export default Home;
