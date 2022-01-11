import React from "react";
import GoogleLogin from "react-google-login";

// const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <div>
      <div className="p-7 pl-16 pr-16 text-gray-200 bg-neutral-600 h-fit rounded-3xl shadow-lg shadow-black/50">
        <div className="text-3xl mb-4 font-medium -tracking-tight ">Login</div>
        <div className="text-xl font-thin  ">Login to manage your account</div>
        <form action="post" className="flex flex-col gap-5 mt-5 w-96 text-base">
          <input
            name="user"
            className="font-light text-gray-200 bg-neutral-800 border rounded-xl  w-full py-2 px-8  leading-tight focus:outline-none focus:shadow-outline "
            type="text"
            placeholder="Username"
          />
          <input
            className="font-light text-gray-200 bg-neutral-800 border rounded-xl  w-full py-2 px-8  leading-tight focus:outline-none focus:shadow-outline "
            type="password"
            placeholder="Password"
          />
          <div>
            <input
              type="checkbox"
              id="remember"
              className="rounded text-yellow-200 "
            />{" "}
            <label htmlFor="remember" className="font-extralight text-sm">
              Remember me
            </label>
          </div>
          <button className="rounded-3xl w-full bg-yellow-200 p-2 text-gray-700 font-medium hover:font-semibold">
            Sign in
          </button>
        </form>
      </div>
      <div className="flex flex-col text-gray-300 gap-2 mt-4">
        <div className="m-auto font-light">
          {`Don't have account? `}
          <a href="" className="font-normal hover:underline">
            Signup
          </a>
        </div>
        <div className="m-auto font-normal hover:underline">
          <a href="">Forgot Password</a>
        </div>
      </div>
      {
        /////////////////////////////////////////////////////
      }

      <GoogleLogin
        clientId="430129549242-9c7kkau6sofo3kn2shb2g7ff1cd4u539.apps.googleusercontent.com"
        buttonText="Login with google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default Login;
