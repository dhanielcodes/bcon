"use client";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const WithRoleGuard = (Component: React.FC, allowedRoles: string[]) => {
  return function GuardedComponent(props: any) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && (!user || !allowedRoles.includes(user.role))) {
        router.replace("/"); // Redirect to error page
      }
    }, [user, loading, router]);

    if (loading || !user) return <p></p>; // Show loader while checking auth
    return <Component {...props} />;
  };
};

export default WithRoleGuard;
