
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import { Election } from "@/types";
import { format } from "date-fns";

interface ElectionCardProps {
  election: Election;
}

export function ElectionCard({ election }: ElectionCardProps) {
  const { id, title, description, startDate, endDate, status, candidates, totalVotes } = election;

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

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {format(new Date(startDate), "MMM d, yyyy")} - {format(new Date(endDate), "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-1 justify-end">
            <Users className="h-4 w-4" />
            <span>{candidates.length} candidates</span>
          </div>
        </div>
        {status === "closed" && (
          <div className="mt-2 text-sm">
            <span className="font-medium">Total votes: {totalVotes}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/elections/${id}`}>
            {status === "active" ? "Vote Now" : status === "closed" ? "View Results" : "View Details"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
