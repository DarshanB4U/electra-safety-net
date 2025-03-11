
import React from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { LoginForm } from "@/components/LoginForm";
import { Vote } from "lucide-react";

export default function Login() {
  return (
    <PageLayout>
      <div className="container max-w-md mx-auto py-12">
        <div className="flex flex-col items-center mb-8">
          <Vote className="h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your account</p>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm p-8">
          <LoginForm />
          
          <div className="mt-6 text-center text-sm">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
