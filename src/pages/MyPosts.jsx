import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { Query } from "appwrite";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { PostCard, Container } from "../components";
function MyPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState({
    active: [],
    inactive: [],
  });

  const { $id } = useSelector((state) => {
    return state.auth.userData;
  });

  async function getAllPosts() {
    try {
      setLoading(true);
      const activePosts = await service.getPosts([
        Query.equal("userId", $id),
        Query.equal("status", "active"),
      ]);
      const inactivePosts = await service.getPosts([
        Query.equal("userId", $id),
        Query.equal("status", "inactive"),
      ]);
      setPosts({
        active: activePosts.rows,
        inactive: inactivePosts.rows,
      });
    } catch (error) {
      console.log("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          <ClipLoader size={40} color="black" />
        </div>
      ) : (
        <div className="w-full py-8">
          <Container>
            <div className="container">
              <h1 className="text-2xl font-bold mb-4">Active Posts</h1>
              {posts.active.length > 0 ? (
                <div className="flex flex-wrap">
                  {posts.active.map((post) => {
                    return (
                      <div key={post.$id} className="p-2 w-1/4">
                        <PostCard {...post} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center">No Active posts</div>
              )}
            </div>
            <div className="container mx-auto mt-8">
              <h1 className="text-2xl font-bold mb-4">Inactive Posts</h1>
              {posts.inactive.length > 0 ? (
                <div className="flex flex-col flex-wrap">
                  {posts.inactive.map((post) => {
                    return (
                      <div key={post.$id} className="p-2 w-1/4">
                        <PostCard {...post} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center">No Inactive posts</div>
              )}
            </div>
          </Container>
        </div>
      )}
      ;
    </>
  );
}

export default MyPosts;
