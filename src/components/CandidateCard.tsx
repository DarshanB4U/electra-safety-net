
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Candidate } from "@/types";
import { Check } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
  electionStatus: "upcoming" | "active" | "closed";
  selected?: boolean;
  onSelect?: (id: string) => void;
  votePercentage?: number;
}

export function CandidateCard({
  candidate,
  electionStatus,
  selected = false,
  onSelect,
  votePercentage = 0,
}: CandidateCardProps) {
  const { id, name, description, voteCount = 0 } = candidate;

  const handleSelect = () => {
    if (electionStatus === "active" && onSelect) {
      onSelect(id);
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card 
      className={`transition-all duration-200 ${
        electionStatus === "active" ? "cursor-pointer" : ""
      } ${selected ? "ring-2 ring-primary" : ""}`}
      onClick={handleSelect}
    >
      <CardHeader className="pb-2 pt-6 flex flex-col items-center text-center">
        <Avatar className="h-20 w-20 mb-4">
          <AvatarImage src={candidate.image} alt={name} />
          <AvatarFallback className="text-xl bg-primary text-primary-foreground">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold">{name}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        
        {electionStatus === "active" && onSelect && (
          <Button 
            variant={selected ? "default" : "outline"} 
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleSelect();
            }}
          >
            {selected ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Selected
              </>
            ) : (
              "Select Candidate"
            )}
          </Button>
        )}
        
        {electionStatus === "closed" && (
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Votes: {voteCount}</span>
              <span>{votePercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full" 
                style={{ width: `${votePercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
