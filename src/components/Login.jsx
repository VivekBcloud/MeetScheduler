import React, { useEffect, useState } from "react";
import { loadGoogleScript } from "../lib/GoogleLogin";

const googleClientId = "";
//  process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = () => {
  const [gapi, setGapi] = useState();
  const [googleAuth, setGoogleAuth] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState();

  const onSuccess = (googleUser) => {
    setIsLoggedIn(true);
    const profile = googleUser.getBasicProfile();
    setName(profile.getName());
    setEmail(profile.getEmail());
    setImageUrl(profile.getImageUrl());
  };

  const onFailure = () => {
    setIsLoggedIn(false);
  };

  const logOut = () => {
    (async () => {
      await googleAuth.signOut();
      setIsLoggedIn(false);
      renderSigninButton(gapi);
    })();
  };

  const renderSigninButton = (_gapi) => {
    _gapi.signin2.render("google-signin", {
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      theme: "dark",
      onsuccess: onSuccess,
      onfailure: onFailure,
    });
  };

  useEffect(() => {
    //window.gapi is available at this point
    window.onGoogleScriptLoad = () => {
      const _gapi = window.gapi;
      setGapi(_gapi);

      _gapi.load("auth2", () => {
        (async () => {
          const _googleAuth = await _gapi.auth2.init({
            client_id: googleClientId,
          });
          setGoogleAuth(_googleAuth);
          renderSigninButton(_gapi);
        })();
      });
    };

    //ensure everything is set before loading the script
    loadGoogleScript();
  }, []);

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
      {!isLoggedIn && <div id="google-signin"></div>}
      {isLoggedIn && (
        <div>
          <div>
            <img src={imageUrl} />
          </div>
          <div>{name}</div>
          <div>{email}</div>
          <button className="btn-primary" onClick={logOut}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
