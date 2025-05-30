import GoogleSignIn from "../services/GoogleSignIn";
function SignInButton({ route, children }) {
  return (
    <button
      onClick={()=>{
        GoogleSignIn(route)
      }}
      className="text-center border-2 rounded p-2 m-2 block w-50 hover:bg-white hover:text-black hover:font-semibold"
    >
      {children}
    </button>
  );
}

export default SignInButton;
