import InstallButton from "@/components/download";
import AppButton from "@/components/fields/AppButton";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#FF7434] relative h-full flex flex-col justify-between px-4 py-10 w-full">
      <Image
        alt="o1"
        className="h-full w-full object-cover absolute left-0 top-0"
        src="/images/Onboard1.png"
        height={3000}
        width={3000}
      />
      <div className="relative  z-10 space-y-4 text-center">
        <div className="flex items-center justify-center">
          <Image alt="logo" src="/logo.svg" height={60} width={60} />
        </div>
        <h1 className="text-3xl font-semibold">Send money...Smartly</h1>
        <div className="text-[#555962]">
          We ensure it reaches your loved ones or business partners swiftly
        </div>
      </div>
      <div className="space-y-4 relative z-10">
        <InstallButton />
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
