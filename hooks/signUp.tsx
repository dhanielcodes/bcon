import { ApiServiceAuth } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

const useSignUp = () => {
  return useMutation({
    mutationFn: ApiServiceAuth.RegisterAuthService,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      //window.location.href = "/customer/dashboard";
      // Store token or handle user state here if needed
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export default useSignUp;
