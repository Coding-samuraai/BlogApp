import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "./index";
import service from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register, control, watch, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => {
    return state.auth.userData;
  });

  async function submit(data) {
    try {
      setLoading(true);
      let dbPost = null;
      if (post) {
        const file = data.image[0]
          ? await service.uploadFile(data.image[0])
          : null;

        if (file) await service.deleteFile(post.featuredImage);

        dbPost = await service.updatePost(post.$id, {
          ...data,
          userId: userData.$id,
          featuredImage: file ? file.$id : post.featuredImage,
        });
      } else {
        const file = data?.image[0]
          ? await service.uploadFile(data.image[0])
          : null;

        dbPost = await service.createPost({
          featuredImage: file?.$id,
          userId: userData.$id,
          ...data,
        });
      }
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } catch (error) {
      console.log("PostForm Error : ", error);
    } finally {
      setLoading(false);
    }
  }

  const slugTransform = useCallback((val) => {
    if (val && typeof val == "string") {
      return val.trim().toLowerCase().replace(/\s+/g, "-");
    }

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name == "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: "true",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setValue, slugTransform]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
          disabled={post ? true : false}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          disabled
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
          isLoading={loading}
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
