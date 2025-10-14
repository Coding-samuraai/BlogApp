import { useEffect } from "react";
import authService from "../appwrite/auth";
import { Logo } from "../components";
function EmailVerification() {
  async function handleSendVerification() {
    try {
    //   return;
      const token = await authService.verifyEmail();
    } catch (error) {
      console.error("Error sending verification email:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("Sending verification email...");

    handleSendVerification();
  }, []);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Verify it's you
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          We have sent a verification link to your email. Please check your
          inbox and click on the link to verify your email address and login.
        </p>
      </div>
    </div>
  );
}

export default EmailVerification;
