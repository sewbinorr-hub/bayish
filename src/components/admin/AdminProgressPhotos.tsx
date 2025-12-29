import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Camera, Loader2, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProgressPhoto {
  id: string;
  photo_url: string;
  month: number;
  year: number;
  description: string | null;
  created_at: string;
  user_id: string;
  profiles: {
    full_name: string | null;
    email: string | null;
  } | null;
}

export const AdminProgressPhotos = () => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [users, setUsers] = useState<Array<{ id: string; full_name: string | null; email: string | null }>>([]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  useEffect(() => {
    fetchUsers();
    fetchPhotos();
  }, [selectedUser, selectedMonth, selectedYear]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .order("full_name");

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("progress_photos")
        .select("*")
        .order("year", { ascending: false })
        .order("month", { ascending: false })
        .order("created_at", { ascending: false });

      if (selectedUser !== "all") {
        query = query.eq("user_id", selectedUser);
      }

      if (selectedMonth !== "all") {
        query = query.eq("month", parseInt(selectedMonth));
      }

      if (selectedYear !== "all") {
        query = query.eq("year", parseInt(selectedYear));
      }

      const { data: photosData, error } = await query;

      if (error) throw error;

      // Fetch user profiles for each photo
      const userIds = [...new Set((photosData || []).map((p: any) => p.user_id))];
      const { data: profilesData } = await supabase
        .from("profiles")
        .select("user_id, full_name, email")
        .in("user_id", userIds);

      const profilesMap = new Map(
        (profilesData || []).map((p) => [p.user_id, { full_name: p.full_name, email: p.email }])
      );

      // Combine photos with profiles
      const photosWithProfiles = (photosData || []).map((photo: any) => ({
        ...photo,
        profiles: profilesMap.get(photo.user_id) || null,
      }));

      setPhotos(photosWithProfiles);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load progress photos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Group photos by user
  const groupedPhotos = photos.reduce((acc, photo) => {
    const userId = photo.user_id;
    if (!acc[userId]) {
      acc[userId] = {
        user: photo.profiles,
        photos: [],
      };
    }
    acc[userId].photos.push(photo);
    return acc;
  }, {} as Record<string, { user: { full_name: string | null; email: string | null } | null; photos: ProgressPhoto[] }>);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="glass-card border-0">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Filter by User</label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="All users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All users</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.full_name || user.email || "Unknown"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Filter by Month</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="All months" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All months</SelectItem>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={(index + 1).toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Filter by Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="All years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photos */}
      {photos.length === 0 ? (
        <Card className="glass-card border-0">
          <CardContent className="py-12 text-center">
            <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No progress photos found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedPhotos).map(([userId, { user, photos: userPhotos }]) => (
            <Card key={userId} className="glass-card border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">
                      {user?.full_name || user?.email || "Unknown User"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {userPhotos.length} photo{userPhotos.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="relative group rounded-lg overflow-hidden border hover:shadow-lg transition-all"
                    >
                      <img
                        src={photo.photo_url}
                        alt={`Progress photo ${months[photo.month - 1]} ${photo.year}`}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-white" />
                            <Badge variant="secondary" className="bg-white/20 text-white border-0">
                              {months[photo.month - 1]} {photo.year}
                            </Badge>
                          </div>
                          {photo.description && (
                            <p className="text-white text-sm mb-2 line-clamp-2">
                              {photo.description}
                            </p>
                          )}
                          <p className="text-white/80 text-xs">
                            {new Date(photo.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

