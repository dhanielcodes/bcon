import { ApiServiceAuth } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  return useMutation({
    mutationFn: ApiServiceAuth.LoginAuthService,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      window.location.href = "/customer/dashboard";
      // Store token or handle user state here if needed
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export default useLogin;
