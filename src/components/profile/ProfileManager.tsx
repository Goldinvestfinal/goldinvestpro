import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { User } from '@supabase/supabase-js';
import { Card } from "@/components/ui/card";

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
}

export const ProfileManager = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          toast({
            title: "Error",
            description: "Failed to load profile data",
            variant: "destructive",
          });
        } else if (profileData) {
          setProfile(profileData);
          setEditForm({
            first_name: profileData.first_name || '',
            last_name: profileData.last_name || '',
          });
        }
      }
    };

    fetchUserAndProfile();
  }, []);

  const handleUpdateProfile = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: editForm.first_name,
        last_name: editForm.last_name,
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } else {
      setProfile({
        ...profile!,
        first_name: editForm.first_name,
        last_name: editForm.last_name,
      });
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    }
  };

  const getInitials = (firstName: string | null, lastName: string | null) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'U';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gold">Profile Settings</h2>
        <Button 
          onClick={() => setIsEditing(true)} 
          className="bg-gold hover:bg-gold-light text-white transition-colors"
        >
          Edit Profile
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-background via-background to-gold/5 backdrop-blur-sm border-gold/20 p-8 rounded-xl shadow-xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-gold/20">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-gold text-white text-3xl">
                {getInitials(profile?.first_name, profile?.last_name)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gold">
              {profile?.first_name} {profile?.last_name}
            </h3>
            <p className="text-gold/80">{user?.email}</p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-gold/10 px-4 py-2 rounded-full text-gold/90">
                Member since {new Date(user?.created_at || '').toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-background border-gold/20">
          <DialogHeader>
            <DialogTitle className="text-gold">Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gold/80">First Name</label>
              <Input
                value={editForm.first_name}
                onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                placeholder="Enter your first name"
                className="border-gold/20 bg-background focus:border-gold"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gold/80">Last Name</label>
              <Input
                value={editForm.last_name}
                onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                placeholder="Enter your last name"
                className="border-gold/20 bg-background focus:border-gold"
              />
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                className="border-gold/20 text-gold hover:bg-gold/10"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateProfile}
                className="bg-gold hover:bg-gold-light text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};