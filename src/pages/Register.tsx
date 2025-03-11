
import React from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { RegisterForm } from "@/components/RegisterForm";
import { Vote } from "lucide-react";

export default function Register() {
  return (
    <PageLayout>
      <div className="container max-w-md mx-auto py-12">
        <div className="flex flex-col items-center mb-8">
          <Vote className="h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground mt-2">Sign up to start voting in elections</p>
        </div>
        
        <div className="bg-card rounded-lg border shadow-sm p-8">
          <RegisterForm />
          
          <div className="mt-6 text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
