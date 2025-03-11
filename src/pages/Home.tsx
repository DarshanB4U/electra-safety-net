
import React from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { ElectionCard } from "@/components/ElectionCard";
import { useElections } from "@/contexts/ElectionsContext";
import { Check, LockKeyhole, ShieldCheck, Vote } from "lucide-react";

export default function Home() {
  const { elections } = useElections();
  
  // Get a few active or upcoming elections for showcase
  const showcaseElections = elections
    .filter(e => e.status === "active" || e.status === "upcoming")
    .slice(0, 3);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Secure Online Voting Platform
            </h1>
            <p className="text-xl mb-8 text-white/90 animate-fade-in">
              Vote securely from anywhere, anytime with our advanced e-voting system.
              Your voice matters, and your vote is secure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button asChild size="lg" variant="default" className="bg-white text-primary hover:bg-white/90">
                <Link to="/elections">View Elections</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/register">Register to Vote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Voting</h3>
              <p className="text-muted-foreground">
                Industry-leading security measures to protect your vote and personal information.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
              <p className="text-muted-foreground">
                Simple and intuitive interface makes voting accessible to everyone.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <LockKeyhole className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Transparent Results</h3>
              <p className="text-muted-foreground">
                Real-time election results with full transparency and audit capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Elections Section */}
      {showcaseElections.length > 0 && (
        <section className="py-20">
          <div className="container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Active & Upcoming Elections</h2>
              <Button asChild variant="outline">
                <Link to="/elections">View All</Link>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {showcaseElections.map((election) => (
                <ElectionCard key={election.id} election={election} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <Vote className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Make Your Voice Heard?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of voters using our secure platform to participate in democratic processes.
            </p>
            <Button asChild size="lg">
              <Link to="/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
