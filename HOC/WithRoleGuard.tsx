"use client";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const WithRoleGuard = (Component: React.FC, allowedRoles: string[]) => {
  return function GuardedComponent(props: any) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      if (!loading) {
        if (!user || !allowedRoles.includes(user.role)) {
          router.replace("/unauthorized"); // Redirect if not authorized
        } else {
          setAuthorized(true);
        }
      }
    }, [user, loading, router]);

    if (loading) return <p>Loading...</p>; // Show loading state
    if (!authorized) return null; // Prevent flickering

    return <Component {...props} />;
  };
};

export default WithRoleGuard;
