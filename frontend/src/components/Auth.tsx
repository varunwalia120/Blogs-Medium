import { Link, useNavigate } from "react-router-dom";
import type { ChangeEvent } from "react";
import { useState } from "react";
import type { SignupType, SigninType } from "varunwalia120-medium-blogs-1";
import axios from "axios";
import { BACKEND_URL } from "../config";

type AuthInputs = SignupType | SigninType;

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();

  const [postInputs, setpostInputs] = useState<AuthInputs>({
    email: "",
    password: "",
    ...(type === "signup" ? { name: "" } : {}),
  });

  async function sendRequest() {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
      postInputs,
    );

    const jwt = response.data.jwt;
    localStorage.setItem("token", jwt);

    navigate("/blogs");
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div>
            <div className="text-3xl font-extrabold">
              {type === "signup" ? "Create an account" : "Welcome back"}
            </div>

            <div className="text-slate-500">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}

              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>

          <div className="mt-4">
            {type === "signup" && (
              <LabelledInput
                label="Name"
                placeholder="Username"
                onChange={(e) =>
                  setpostInputs({ ...postInputs, name: e.target.value })
                }
              />
            )}

            <LabelledInput
              label="Email"
              placeholder="Email"
              onChange={(e) =>
                setpostInputs({ ...postInputs, email: e.target.value })
              }
            />

            <LabelledInput
              label="Password"
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setpostInputs({ ...postInputs, password: e.target.value })
              }
            />

            <button
              onClick={sendRequest}
              type="button"
              className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-5 py-2.5"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div className="mt-3">
      <label className="block mb-1 text-sm font-semibold">{label}</label>

      <input
        onChange={onChange}
        type={type || "text"}
        className="border rounded-lg w-full p-2"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
