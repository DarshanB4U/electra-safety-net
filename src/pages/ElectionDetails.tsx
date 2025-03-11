
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CandidateCard } from "@/components/CandidateCard";
import { useElections } from "@/contexts/ElectionsContext";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Calendar, Users, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

export default function ElectionDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getElection, hasVoted, castVote, isLoading } = useElections();
  const { user } = useAuth();
  
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  if (!id) {
    navigate("/elections");
    return null;
  }
  
  const election = getElection(id);
  
  if (isLoading) {
    return (
      <PageLayout>
        <div className="container py-12">
          <LoadingSpinner className="py-20" />
        </div>
      </PageLayout>
    );
  }
  
  if (!election) {
    return (
      <PageLayout>
        <div className="container py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Election Not Found</h1>
          <p className="mb-8 text-muted-foreground">
            The election you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/elections")}>Back to Elections</Button>
        </div>
      </PageLayout>
    );
  }
  
  const { title, description, startDate, endDate, status, candidates, totalVotes = 0 } = election;
  const userHasVoted = user ? hasVoted(id) : false;
  
  const handleCandidateSelect = (candidateId: string) => {
    if (status === "active" && !userHasVoted) {
      setSelectedCandidateId(candidateId);
    }
  };
  
  const handleVoteClick = () => {
    if (selectedCandidateId) {
      setShowConfirmDialog(true);
    }
  };
  
  const handleVoteConfirm = async () => {
    if (selectedCandidateId) {
      setIsVoting(true);
      try {
        await castVote(id, selectedCandidateId);
        // Vote is successful, no need to do anything special as the context will update
      } finally {
        setIsVoting(false);
        setShowConfirmDialog(false);
      }
    }
  };
  
  const getStatusBadge = () => {
    switch (status) {
      case "active":
        return <Badge className="badge-active">Active</Badge>;
      case "upcoming":
        return <Badge className="badge-upcoming">Upcoming</Badge>;
      case "closed":
        return <Badge className="badge-closed">Closed</Badge>;
      default:
        return null;
    }
  };
  
  // Calculate vote percentages for closed elections
  const calculateVotePercentage = (voteCount: number = 0) => {
    if (totalVotes === 0) return 0;
    return (voteCount / totalVotes) * 100;
  };

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-4xl font-bold">{title}</h1>
            {getStatusBadge()}
          </div>
          <p className="text-muted-foreground mb-6">{description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>
                {format(new Date(startDate), "MMMM d, yyyy")} - {format(new Date(endDate), "MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>{candidates.length} candidates</span>
            </div>
          </div>
          
          {status === "active" && (
            <div className="bg-muted rounded-lg p-4 mb-6">
              {!user ? (
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <p className="mb-4 sm:mb-0">
                    <AlertTriangle className="h-5 w-5 text-warning inline mr-2" />
                    You need to be logged in to vote
                  </p>
                  <Button onClick={() => navigate("/login")}>Login to Vote</Button>
                </div>
              ) : userHasVoted ? (
                <p className="text-success">
                  You have already voted in this election. Results will be available when the election closes.
                </p>
              ) : (
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <p>Select a candidate below and click "Cast Vote" to vote in this election.</p>
                  <Button 
                    onClick={handleVoteClick}
                    disabled={!selectedCandidateId || isVoting}
                    className="mt-4 sm:mt-0"
                  >
                    {isVoting ? "Processing..." : "Cast Vote"}
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {status === "closed" && (
            <div className="bg-muted rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-2">Election Results</h3>
              <p>Total votes cast: {totalVotes}</p>
            </div>
          )}
          
          {status === "upcoming" && (
            <div className="bg-muted rounded-lg p-4 mb-6">
              <p>
                This election has not started yet. Voting will be available from{" "}
                {format(new Date(startDate), "MMMM d, yyyy")}.
              </p>
            </div>
          )}
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Candidates</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              electionStatus={status}
              selected={selectedCandidateId === candidate.id}
              onSelect={handleCandidateSelect}
              votePercentage={calculateVotePercentage(candidate.voteCount)}
            />
          ))}
        </div>
      </div>
      
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm your vote</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to cast your vote in "{title}". This action cannot be undone.
              Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleVoteConfirm} disabled={isVoting}>
              {isVoting ? "Processing..." : "Confirm Vote"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  );
}
