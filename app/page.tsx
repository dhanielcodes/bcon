import AppButton from "@/components/fields/AppButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#FF7434] h-full w-full fixed top-0 left-0 grid place-items-center ">
      <Image src="/logo.svg" width={140} height={140} alt="logo" />

      <div className="space-y-2 w-full max-w-[650px]">
        <AppButton
          to="/register"
          placeholder="Create an account"
          className="mt-0"
        />
        <AppButton to="/login" placeholder="Login" secondary className="mt-0" />
        <AppButton
          to="/customer/dashboard"
          placeholder="Dashboard"
          outline
          className="mt-0"
        />
      </div>
    </div>
  );
}
