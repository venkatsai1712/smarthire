import { GoogleSignInFunction } from "../services/GoogleSignIn";
import googleLogo from "../assets/images/googleLogo.webp";
function SignInButton({ route, children }) {
  return (
    <button
      onClick={() => {
        GoogleSignInFunction(route);
      }}
      className="text-center border-2 rounded p-2 m-2 w-50 hover:bg-white hover:text-black hover:font-semibold flex items-center"
    >
      <img src={googleLogo} className="w-5 mr-2" />
      {children}
    </button>
  );
}

export default SignInButton;
