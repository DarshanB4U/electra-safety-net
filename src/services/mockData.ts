
import { User, Election, Candidate, Vote } from "../types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Voter One",
    email: "voter1@example.com",
    role: "voter",
  },
  {
    id: "3",
    name: "Voter Two",
    email: "voter2@example.com",
    role: "voter",
  },
];

// Mock Candidates
export const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "John Smith",
    description: "Experienced leader with a focus on transparency.",
    electionId: "1",
    voteCount: 24,
  },
  {
    id: "2",
    name: "Jane Doe",
    description: "Dedicated to improving community engagement.",
    electionId: "1",
    voteCount: 19,
  },
  {
    id: "3",
    name: "Michael Brown",
    description: "Committed to innovation and sustainability.",
    electionId: "1",
    voteCount: 16,
  },
  {
    id: "4",
    name: "Robert Johnson",
    description: "Focused on economic growth and development.",
    electionId: "2",
    voteCount: 0,
  },
  {
    id: "5",
    name: "Emily Davis",
    description: "Advocate for education and healthcare improvements.",
    electionId: "2",
    voteCount: 0,
  },
  {
    id: "6",
    name: "William Garcia",
    description: "Promising a fresh perspective on city management.",
    electionId: "3",
    voteCount: 0,
  },
  {
    id: "7",
    name: "Sophia Martinez",
    description: "Bringing years of leadership and community service.",
    electionId: "3",
    voteCount: 0,
  },
];

// Mock Elections
export const mockElections: Election[] = [
  {
    id: "1",
    title: "City Council Election 2023",
    description: "Annual election for city council representatives",
    startDate: new Date("2023-11-01"),
    endDate: new Date("2023-11-15"),
    status: "closed",
    candidates: mockCandidates.filter(c => c.electionId === "1"),
    totalVotes: 59,
  },
  {
    id: "2",
    title: "School Board Election",
    description: "Election for school board members for the upcoming school year",
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    status: "active",
    candidates: mockCandidates.filter(c => c.electionId === "2"),
    totalVotes: 0,
  },
  {
    id: "3",
    title: "Neighborhood Association Leadership",
    description: "Election for the leadership positions in the neighborhood association",
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    status: "upcoming",
    candidates: mockCandidates.filter(c => c.electionId === "3"),
    totalVotes: 0,
  },
];

// Mock Votes
export const mockVotes: Vote[] = [
  {
    id: "1",
    userId: "2",
    electionId: "1",
    candidateId: "1",
    timestamp: new Date("2023-11-05"),
  },
  {
    id: "2",
    userId: "3",
    electionId: "1",
    candidateId: "2",
    timestamp: new Date("2023-11-07"),
  },
];

// Get user's votes
export function getUserVotes(userId: string): Vote[] {
  return mockVotes.filter(vote => vote.userId === userId);
}

// Check if user has voted in an election
export function hasUserVoted(userId: string, electionId: string): boolean {
  return mockVotes.some(vote => vote.userId === userId && vote.electionId === electionId);
}

// Add a vote
export function addVote(userId: string, electionId: string, candidateId: string): Vote {
  const newVote: Vote = {
    id: `vote_${Date.now()}`,
    userId,
    electionId,
    candidateId,
    timestamp: new Date(),
  };
  
  mockVotes.push(newVote);
  
  // Update candidate vote count
  const candidate = mockCandidates.find(c => c.id === candidateId);
  if (candidate) {
    candidate.voteCount = (candidate.voteCount || 0) + 1;
  }
  
  // Update election total votes
  const election = mockElections.find(e => e.id === electionId);
  if (election) {
    election.totalVotes = (election.totalVotes || 0) + 1;
  }
  
  return newVote;
}
