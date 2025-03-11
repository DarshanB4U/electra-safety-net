
import React, { createContext, useContext, useState, useEffect } from "react";
import { Election, Candidate, Vote } from "../types";
import { 
  mockElections, 
  mockCandidates, 
  hasUserVoted, 
  addVote as addMockVote 
} from "../services/mockData";
import { useAuth } from "./AuthContext";
import { toast } from "@/hooks/use-toast";

interface ElectionsContextType {
  elections: Election[];
  isLoading: boolean;
  getElection: (id: string) => Election | undefined;
  getCandidates: (electionId: string) => Candidate[];
  hasVoted: (electionId: string) => boolean;
  castVote: (electionId: string, candidateId: string) => Promise<boolean>;
  createElection: (election: Omit<Election, "id" | "status" | "candidates" | "totalVotes">) => Promise<string>;
  updateElection: (election: Partial<Election> & { id: string }) => Promise<boolean>;
  deleteElection: (id: string) => Promise<boolean>;
  addCandidate: (candidate: Omit<Candidate, "id" | "voteCount">) => Promise<string>;
  updateCandidate: (candidate: Partial<Candidate> & { id: string }) => Promise<boolean>;
  deleteCandidate: (id: string) => Promise<boolean>;
}

const ElectionsContext = createContext<ElectionsContextType | undefined>(undefined);

export const ElectionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elections, setElections] = useState<Election[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Load mock elections data
    setElections(mockElections);
    setIsLoading(false);
  }, []);

  const getElection = (id: string) => {
    return elections.find(election => election.id === id);
  };

  const getCandidates = (electionId: string) => {
    return mockCandidates.filter(candidate => candidate.electionId === electionId);
  };

  const hasVoted = (electionId: string) => {
    if (!user) return false;
    return hasUserVoted(user.id, electionId);
  };

  const castVote = async (electionId: string, candidateId: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to vote",
        variant: "destructive",
      });
      return false;
    }

    // Check if election is active
    const election = getElection(electionId);
    if (!election) {
      toast({
        title: "Election not found",
        description: "The election you're trying to vote in doesn't exist",
        variant: "destructive",
      });
      return false;
    }

    if (election.status !== "active") {
      toast({
        title: "Voting not allowed",
        description: `This election is ${election.status}`,
        variant: "destructive",
      });
      return false;
    }

    // Check if user has already voted
    if (hasVoted(electionId)) {
      toast({
        title: "Already voted",
        description: "You have already cast your vote in this election",
        variant: "destructive",
      });
      return false;
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Add vote
    addMockVote(user.id, electionId, candidateId);

    // Update local elections state
    setElections(elections.map(e => {
      if (e.id === electionId) {
        return {
          ...e,
          totalVotes: (e.totalVotes || 0) + 1,
          candidates: e.candidates.map(c => {
            if (c.id === candidateId) {
              return {
                ...c,
                voteCount: (c.voteCount || 0) + 1,
              };
            }
            return c;
          }),
        };
      }
      return e;
    }));

    toast({
      title: "Vote successful",
      description: "Your vote has been recorded",
    });
    return true;
  };

  // Admin functions for election management
  const createElection = async (electionData: Omit<Election, "id" | "status" | "candidates" | "totalVotes">): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newElection: Election = {
      ...electionData,
      id: `election_${Date.now()}`,
      status: new Date() >= electionData.startDate && new Date() <= electionData.endDate 
        ? "active" 
        : new Date() > electionData.endDate 
          ? "closed" 
          : "upcoming",
      candidates: [],
      totalVotes: 0,
    };

    setElections([...elections, newElection]);
    mockElections.push(newElection);

    toast({
      title: "Election created",
      description: `"${newElection.title}" has been created successfully`,
    });
    return newElection.id;
  };

  const updateElection = async (electionUpdate: Partial<Election> & { id: string }): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const index = elections.findIndex(e => e.id === electionUpdate.id);
    if (index === -1) return false;

    // Create updated election
    const updatedElection = {
      ...elections[index],
      ...electionUpdate,
    };

    // Recalculate status if dates changed
    if (electionUpdate.startDate || electionUpdate.endDate) {
      const startDate = electionUpdate.startDate || elections[index].startDate;
      const endDate = electionUpdate.endDate || elections[index].endDate;
      
      updatedElection.status = new Date() >= startDate && new Date() <= endDate 
        ? "active" 
        : new Date() > endDate 
          ? "closed" 
          : "upcoming";
    }

    // Update elections array
    const updatedElections = [...elections];
    updatedElections[index] = updatedElection;
    setElections(updatedElections);

    // Update mock data
    const mockIndex = mockElections.findIndex(e => e.id === electionUpdate.id);
    if (mockIndex !== -1) {
      mockElections[mockIndex] = updatedElection;
    }

    toast({
      title: "Election updated",
      description: `"${updatedElection.title}" has been updated successfully`,
    });
    return true;
  };

  const deleteElection = async (id: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Filter out the election to delete
    setElections(elections.filter(e => e.id !== id));
    
    // Update mock data
    const index = mockElections.findIndex(e => e.id === id);
    if (index !== -1) {
      mockElections.splice(index, 1);
    }

    toast({
      title: "Election deleted",
      description: "The election has been deleted successfully",
    });
    return true;
  };

  // Admin functions for candidate management
  const addCandidate = async (candidateData: Omit<Candidate, "id" | "voteCount">): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newCandidate: Candidate = {
      ...candidateData,
      id: `candidate_${Date.now()}`,
      voteCount: 0,
    };

    // Add to mock candidates
    mockCandidates.push(newCandidate);

    // Update elections state with new candidate
    setElections(elections.map(e => {
      if (e.id === candidateData.electionId) {
        return {
          ...e,
          candidates: [...e.candidates, newCandidate],
        };
      }
      return e;
    }));

    toast({
      title: "Candidate added",
      description: `"${newCandidate.name}" has been added to the election`,
    });
    return newCandidate.id;
  };

  const updateCandidate = async (candidateUpdate: Partial<Candidate> & { id: string }): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find the candidate
    const candidateIndex = mockCandidates.findIndex(c => c.id === candidateUpdate.id);
    if (candidateIndex === -1) return false;

    // Update candidate in mock data
    const updatedCandidate = {
      ...mockCandidates[candidateIndex],
      ...candidateUpdate,
    };
    mockCandidates[candidateIndex] = updatedCandidate;

    // Update the candidate in the elections state
    setElections(elections.map(e => {
      const candidateInElection = e.candidates.findIndex(c => c.id === candidateUpdate.id);
      if (candidateInElection !== -1) {
        const updatedCandidates = [...e.candidates];
        updatedCandidates[candidateInElection] = updatedCandidate;
        return {
          ...e,
          candidates: updatedCandidates,
        };
      }
      return e;
    }));

    toast({
      title: "Candidate updated",
      description: `"${updatedCandidate.name}" has been updated successfully`,
    });
    return true;
  };

  const deleteCandidate = async (id: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find candidate to get electionId
    const candidate = mockCandidates.find(c => c.id === id);
    if (!candidate) return false;

    // Remove from mock candidates
    const candidateIndex = mockCandidates.findIndex(c => c.id === id);
    if (candidateIndex !== -1) {
      mockCandidates.splice(candidateIndex, 1);
    }

    // Update elections state by removing candidate
    setElections(elections.map(e => {
      if (e.id === candidate.electionId) {
        return {
          ...e,
          candidates: e.candidates.filter(c => c.id !== id),
        };
      }
      return e;
    }));

    toast({
      title: "Candidate removed",
      description: "The candidate has been removed from the election",
    });
    return true;
  };

  return (
    <ElectionsContext.Provider
      value={{
        elections,
        isLoading,
        getElection,
        getCandidates,
        hasVoted,
        castVote,
        createElection,
        updateElection,
        deleteElection,
        addCandidate,
        updateCandidate,
        deleteCandidate,
      }}
    >
      {children}
    </ElectionsContext.Provider>
  );
};

export const useElections = () => {
  const context = useContext(ElectionsContext);
  if (context === undefined) {
    throw new Error("useElections must be used within an ElectionsProvider");
  }
  return context;
};
