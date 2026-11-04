import { LoginForm } from "@/components/auth/LoginForm";
import { demoCredentials } from "@/lib/auth";

export default function LoginPage() {
  const demoMode = process.env.DEMO_MODE !== "false";

  return (
    <LoginForm
      demoMode={demoMode}
      demoEmail={demoMode ? demoCredentials.email : ""}
      demoPassword={demoMode ? demoCredentials.password : ""}
    />
  );
}
