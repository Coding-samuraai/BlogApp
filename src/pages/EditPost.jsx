import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
function EditPost() {
  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  async function fetchPost() {
    try {
      const data = await service.getPost(slug);
      setPostLoading(false);

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
      {postLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <ClipLoader size={40} color="black" />
        </div>
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
