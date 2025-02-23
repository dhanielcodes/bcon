import AppButton from "@/components/fields/AppButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#FF7434] h-full fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[500px] px-4 flex flex-col justify-between py-10">
      <Image
        alt="o1"
        className="h-full w-full object-cover absolute left-0 top-0 -z-10"
        src="/images/Onboard1.png"
        height={1000}
        width={1000}
      />
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center">
          <Image alt="logo" src="/logo.svg" height={60} width={60} />
        </div>
        <h1 className="text-3xl font-semibold">Send money...Smartly</h1>
        <div className="text-[#555962]">
          We ensure it reaches your loved ones or business partners swiftly
        </div>
      </div>
      <div className="space-y-4">
        <AppButton
          to="/register"
          placeholder="Create an account"
          className="mt-0"
        />
        <AppButton to="/login" placeholder="Login" secondary className="mt-0" />
      </div>
    </div>
  );
}
