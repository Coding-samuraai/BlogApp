import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  async function fetchPost() {
    try {
      const data = await service.getPost(slug);
      setLoading(false);

      if (data) setPost(data);
      else navigate("/");
    } catch (error) {
      console.log("Error in fetching post : ", error);
    }
  }

  useEffect(() => {
    fetchPost();
  }, [navigate, slug]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="py-8">
          <Container>
            <PostForm post={post} />
          </Container>
        </div>
      )}
    </div>
  );
}

export default EditPost;
