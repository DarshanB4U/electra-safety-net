
import React from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="container py-20 text-center">
        <ShieldAlert className="h-24 w-24 text-destructive mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          You don't have permission to access this page.
        </p>
        <Button onClick={() => navigate("/")}>Return Home</Button>
      </div>
    </PageLayout>
  );
}
