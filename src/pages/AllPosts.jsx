import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";

function AllPosts() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    try {
      const data = await service.getPosts();
      setPosts(data.rows);
    } catch (error) {
      console.log("Error in Fetching records :", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {loading ? (
        <h1>loading.....</h1>
      ) : (
        <div className="w-full py-8">
          <Container>
            <div className="flex flex-wrap">
              {posts.length === 0 ? (
                <h1 className="text-center w-full">No posts found</h1>
              ) : (
                <>
                  {posts.map((post) => {
                    return (
                      <div key={post.$id} className="p-2 w-1/4">
                        <PostCard
                          $id={post.$id}
                          title={post.title}
                          featuredImage={post.featuredImage}
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default AllPosts;
