import SignInButton from "./components/SignInButton";
function App() {
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-center text-3xl m-5">Smart Hire</h1>
      <SignInButton route="/sign-in/candidate">Sign In as Candidate</SignInButton>
      <SignInButton route="/sign-in/recruiter">Sign In as Recruiter</SignInButton>
    </div>
  );
}

export default App;
