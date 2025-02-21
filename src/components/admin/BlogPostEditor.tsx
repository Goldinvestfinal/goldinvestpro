
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
}

interface BlogPostEditorProps {
  post?: BlogPost | null;
  onClose: () => void;
}

export const BlogPostEditor = ({ post, onClose }: BlogPostEditorProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: post?.title || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    slug: post?.slug || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { title, content, excerpt, slug } = formData;
    
    try {
      if (post?.id) {
        // Update existing post
        const { error } = await supabase
          .from("blog_posts")
          .update({ title, content, excerpt, slug })
          .eq("id", post.id);

        if (error) throw error;
        toast({ title: "Post updated successfully" });
      } else {
        // Create new post
        const { error } = await supabase
          .from("blog_posts")
          .insert([{ title, content, excerpt, slug }]);

        if (error) throw error;
        toast({ title: "Post created successfully" });
      }

      onClose();
    } catch (error) {
      console.error("Error saving post:", error);
      toast({ 
        title: "Error saving post", 
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post ? "Edit Post" : "Create New Post"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Input
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <textarea
              id="content"
              className="w-full min-h-[200px] p-2 border rounded-md"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {post ? "Update" : "Create"} Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
