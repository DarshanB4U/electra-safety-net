
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "voter";
}

export interface Candidate {
  id: string;
  name: string;
  description: string;
  image?: string;
  electionId: string;
  voteCount?: number;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: "upcoming" | "active" | "closed";
  candidates: Candidate[];
  totalVotes?: number;
}

export interface Vote {
  id: string;
  userId: string;
  electionId: string;
  candidateId: string;
  timestamp: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
