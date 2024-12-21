import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { GoldChart } from "@/components/GoldChart";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  created_at: string;
}

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, excerpt, slug, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blog posts:", error);
        throw error;
      }

      return data as BlogPost[];
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 mt-16">
        <h1 className="text-4xl font-bold mb-12">Gold Investment Blog</h1>
        <div className="mb-12">
          <Skeleton className="h-[400px] w-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24 mt-16">
      <h1 className="text-4xl font-bold mb-12">Gold Investment Blog</h1>
      <div className="mb-12">
        <GoldChart />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Link to={`/blog/${post.slug}`} key={post.id}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                <CardDescription>
                  {new Date(post.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;