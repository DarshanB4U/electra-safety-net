
import React from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Calendar, 
  ListPlus, 
  PlusCircle, 
  Users 
} from "lucide-react";
import { useElections } from "@/contexts/ElectionsContext";
import { format } from "date-fns";
import { Election } from "@/types";
import { mockUsers } from "@/services/mockData";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { elections } = useElections();
  
  // Get counts for dashboard
  const activeElectionsCount = elections.filter(e => e.status === "active").length;
  const upcomingElectionsCount = elections.filter(e => e.status === "upcoming").length;
  const closedElectionsCount = elections.filter(e => e.status === "closed").length;
  const totalVotersCount = mockUsers.filter(u => u.role === "voter").length;
  
  return (
    <ProtectedRoute requireAdmin>
      <PageLayout>
        <div className="container py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <Button onClick={() => navigate("/admin/election/new")}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Election
            </Button>
          </div>
          
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Elections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{activeElectionsCount}</span>
                  <Calendar className="h-8 w-8 text-primary opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Upcoming Elections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{upcomingElectionsCount}</span>
                  <Calendar className="h-8 w-8 text-warning opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Completed Elections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{closedElectionsCount}</span>
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Registered Voters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{totalVotersCount}</span>
                  <Users className="h-8 w-8 text-accent opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs for different sections */}
          <Tabs defaultValue="elections">
            <TabsList className="mb-6">
              <TabsTrigger value="elections">Elections</TabsTrigger>
              <TabsTrigger value="candidates">Candidates</TabsTrigger>
              <TabsTrigger value="voters">Voters</TabsTrigger>
            </TabsList>
            
            <TabsContent value="elections">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Elections</CardTitle>
                  <CardDescription>
                    View and manage all elections on the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 border-b font-medium">
                      <div className="col-span-5">Election</div>
                      <div className="col-span-2 text-center">Status</div>
                      <div className="col-span-3">Dates</div>
                      <div className="col-span-2 text-right">Actions</div>
                    </div>
                    
                    {elections.map((election) => (
                      <ElectionRow key={election.id} election={election} />
                    ))}
                    
                    {elections.length === 0 && (
                      <div className="p-6 text-center text-muted-foreground">
                        No elections found. Create your first election to get started.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="candidates">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Candidates</CardTitle>
                  <CardDescription>
                    Add and edit candidates for different elections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-10">Candidates management will be implemented in the next phase.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="voters">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Voters</CardTitle>
                  <CardDescription>
                    View and manage registered voters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-10">Voter management will be implemented in the next phase.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </PageLayout>
    </ProtectedRoute>
  );
}

function ElectionRow({ election }: { election: Election }) {
  const navigate = useNavigate();
  const { id, title, status, startDate, endDate } = election;
  
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
    <div className="grid grid-cols-12 p-4 border-b items-center">
      <div className="col-span-5 font-medium truncate" title={title}>
        {title}
      </div>
      <div className="col-span-2 text-center">
        {getStatusBadge()}
      </div>
      <div className="col-span-3 text-sm text-muted-foreground">
        {format(new Date(startDate), "MMM d, yyyy")} - {format(new Date(endDate), "MMM d, yyyy")}
      </div>
      <div className="col-span-2 flex justify-end gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(`/admin/election/${id}`)}
        >
          Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(`/admin/election/${id}/candidates`)}
        >
          <ListPlus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
