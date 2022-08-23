import type { NextPage } from "next";
import { selectAuthState, setAuthState,  } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from "../store/store";
import Link from 'next/link';
import {useRouter} from 'next/router';


const Home: NextPage = () => {
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
          pathname: '/page2',
          query: { username: 'cheri' },
        }}
      >
        <a>client side nav</a>
      </Link>
      <a onClick={()=>router.push('/page2')}>
        server side nav
      </a>
    </div>
  );
};
// export const getServerSideProps = wrapper.getServerSideProps(

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      // server-side에서 실행되니까 front의 store는 아래 구문으로 재정의된다!

      // we can set the initial state from here


      console.log('before state', store.getState())

      await store.dispatch(setAuthState(true))

      console.log("State on server", store.getState());

      return {
        props: {
          authState: false,

        },

      };
    }
);

export default Home;