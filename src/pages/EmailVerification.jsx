import { useEffect, useState } from "react";
import authService from "../appwrite/auth";
import { Logo } from "../components";
import { set } from "react-hook-form";
function EmailVerification() {
  const [sent, setSent] = useState(false);
  const [time, setTime] = useState(60);

  async function handleSendVerification() {
    try {
      //   return;
      setSent(true);
      const token = await authService.verifyEmail();

      const timeInterval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(timeInterval);
            setSent(false);
            return 0;
          }
        });
      }, 1000);
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  }

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
          We will send a verification link to your registered email address.
          {sent ? (
            <span className="font-semibold ml-1 text-green-600">
              Verification email sent!
              <span> Try again in : {time} seconds</span>
            </span>
          ) : (
            <span
              onClick={handleSendVerification}
              className="font-semibold ml-1 cursor-pointer text-blue-600 hover:underline"
            >
              Click here to send.
            </span>
          )}
        </p>
        <p className="text-center text-base text-black/60">
          Please check your email after clicking above and click on the
          verification link to complete the process.
        </p>
      </div>
    </div>
  );
}

export default EmailVerification;
