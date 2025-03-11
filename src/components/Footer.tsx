
import React from "react";
import { Link } from "react-router-dom";
import { Vote } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Vote className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">E-Vote</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              A secure, transparent, and user-friendly online voting system.
              Cast your vote with confidence on our platform designed with modern security measures.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/elections" className="text-muted-foreground hover:text-primary">
                  Elections
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} E-Vote. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
