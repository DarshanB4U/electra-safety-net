
import React, { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ElectionCard } from "@/components/ElectionCard";
import { useElections } from "@/contexts/ElectionsContext";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function Elections() {
  const { elections, isLoading } = useElections();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredElections = elections.filter(election => {
    // Apply search filter
    const matchesSearch = election.title.toLowerCase().includes(search.toLowerCase()) ||
                          election.description.toLowerCase().includes(search.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === "all" || election.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <PageLayout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Elections</h1>
        
        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search elections..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Elections</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoading ? (
          <LoadingSpinner className="py-20" />
        ) : filteredElections.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredElections.map((election) => (
              <ElectionCard key={election.id} election={election} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium mb-2">No elections found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
