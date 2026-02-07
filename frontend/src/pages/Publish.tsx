import { AppBar } from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ChangeEvent } from "react";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <AppBar />

      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          {/* Title input */}
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Title"
          />

          {/* Text editor */}
          <TextEditor
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          {/* Publish button */}
          <button
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog`,
                  {
                    title,
                    content: description,
                  },
                  {
                    headers: {
                      // THIS LINE FIXES YOUR 403 ERROR
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );

                // Navigate to created blog page
                navigate(`/blog/${response.data.id}`);
              } catch (e) {
                console.error("Publish failed:", e);
              }
            }}
            type="button"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="mt-2">
      <div className="w-full mb-4">
        <div className="flex items-center justify-between border">
          <div className="my-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>

            <textarea
              onChange={onChange}
              rows={8}
              className="focus:outline-none block w-full px-2 text-sm text-gray-800 bg-white border-0"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
