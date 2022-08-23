import type { NextPage } from "next";
import { selectAuthState, setAuthState } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../store/store";
import Link from 'next/link';
import {useRouter} from 'next/router';

const Page2: NextPage = () => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div
      style={{
        display: "grid",
        justifyItems: "center",
        margin: "20px",
        gridRowGap: "20px",
      }}
    >
      <div>page2</div>
      <div>{authState ? "Logged in" : "Not Logged In"}</div>
      <button
        onClick={() =>
          authState
            ? dispatch(setAuthState(false))
            : dispatch(setAuthState(true))
        }
      >
        {authState ? "Logout" : "LogIn"}
      </button>
      <Link 
        href={{
          pathname: '/',
        }}
      >
        <a>Link go home</a>
      </Link>
      <a onClick={()=>router.back()}>
        router go home
      </a>
    </div>
  );
};



export default Page2;