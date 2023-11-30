import MicrosoftIcon from "@mui/icons-material/Microsoft";

export default function SignInButton() {
  return (
    <>
      <button
        type="button"
        className="bg-highlight text-primary hover:bg-highlight_hover focus-visible:outline-highlight inline-flex items-center gap-x-3 rounded-lg px-5 py-3 text-lg font-bold shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition duration-300 ease-in-out"
      >
        <MicrosoftIcon className="h-6 w-6" aria-hidden="true" />
        Sign in with Microsoft
      </button>
    </>
  );
}
