
import React from "react";
import { PageLayout } from "@/components/PageLayout";
import { 
  ShieldCheck, 
  BarChart3, 
  CheckCircle, 
  Users, 
  Lock,
  Timer
} from "lucide-react";

export default function About() {
  return (
    <PageLayout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About E-Vote</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>
              E-Vote is a secure, transparent, and user-friendly online voting platform designed
              to facilitate democratic processes in organizations, institutions, and communities.
              Our platform aims to increase voter participation by making voting accessible
              while maintaining the highest security standards.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
            <p>
              Our mission is to modernize the voting experience through technology while 
              ensuring the integrity, security, and accessibility of every election. 
              We believe that voting should be easy, secure, and available to all eligible 
              participants regardless of their location.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Key Features</h2>
            
            <div className="grid md:grid-cols-2 gap-6 my-6">
              <div className="flex gap-3">
                <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold">Secure Voting</h3>
                  <p className="text-muted-foreground">
                    End-to-end encryption and advanced security measures protect your vote.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Users className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold">User-Friendly</h3>
                  <p className="text-muted-foreground">
                    Intuitive interface makes voting accessible to everyone.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <BarChart3 className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold">Real-Time Results</h3>
                  <p className="text-muted-foreground">
                    View live election results once voting closes.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Timer className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold">Timed Elections</h3>
                  <p className="text-muted-foreground">
                    Automatically schedule and close elections with precise timing.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Lock className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold">Vote Verification</h3>
                  <p className="text-muted-foreground">
                    Verify that your vote was correctly recorded and counted.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-bold">Vote Confirmation</h3>
                  <p className="text-muted-foreground">
                    Receive confirmation that your vote was successfully cast.
                  </p>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Security Measures</h2>
            <p>
              Security is our top priority. Our platform employs multiple layers of protection:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>JWT Authentication for secure access</li>
              <li>Role-Based Access Control (RBAC)</li>
              <li>Data encryption for voter privacy</li>
              <li>Protection against CSRF & SQL injection attacks</li>
              <li>Comprehensive audit logs for transparency</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
            <p>
              Have questions or feedback? We'd love to hear from you. 
              Contact our team at <a href="mailto:info@evote-example.com" className="text-primary hover:underline">info@evote-example.com</a>.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
