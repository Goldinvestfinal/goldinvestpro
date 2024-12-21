import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  title: string;
  content: string;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("title, content, created_at")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching blog post:", error);
        throw error;
      }

      return data as BlogPost;
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 mt-16">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate("/blog")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-24 mt-16">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate("/blog")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <p>The blog post you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24 mt-16">
      <Button
        variant="ghost"
        className="mb-8"
        onClick={() => navigate("/blog")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Button>
      <article className="prose prose-gold lg:prose-xl max-w-none">
        <h1>{post.title}</h1>
        <p className="text-muted-foreground">
          {new Date(post.created_at).toLocaleDateString()}
        </p>
        <div className="mt-8 whitespace-pre-wrap">{post.content}</div>
      </article>
    </div>
  );
};

export default BlogPost;