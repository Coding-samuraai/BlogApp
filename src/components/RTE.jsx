import React, { Suspense, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import conf from "./../conf/conf";
import { ClipLoader } from "react-spinners";
function RTE({ name, control, label, defaultValue = "" }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => {
          return (
            <>
              {loading ? (
                <div className="w-full h-96 flex justify-center items-center">
                  <ClipLoader size={50} color={"black"} loading={loading} />
                </div>
              ) : (
                <></>
              )}
              <Editor
                apiKey={conf.tinyMCEApiKey}
                initialValue={defaultValue}
                onPostRender={() => {
                  console.log("Editor is ready");
                  setLoading(false);
                }}
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                  ],
                  toolbar:
                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
                onEditorChange={onChange}
              />
            </>
          );
        }}
      />
    </div>
  );
}

export default RTE;
