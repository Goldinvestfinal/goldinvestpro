import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { GoldChart } from "@/components/GoldChart";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  created_at: string;
}

const Blog = () => {
  const {
    data: posts,
    isLoading
  } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("blog_posts").select("id, title, excerpt, slug, created_at").order("created_at", {
        ascending: false
      });
      if (error) {
        console.error("Error fetching blog posts:", error);
        throw error;
      }
      return data as BlogPost[];
    }
  });

  if (isLoading) {
    return <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <h1 className="text-4xl font-bold mb-12">Gold Investment Blog</h1>
          <div className="mb-12">
            <Skeleton className="h-[400px] w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>;
  }

  return <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Gold Investment Blog</h1>
          <div className="flex gap-4">
            
            
          </div>
        </div>
        <div className="mb-12">
          <GoldChart />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white">
          {posts?.map(post => <Link to={`/blog/${post.slug}`} key={post.id}>
              <Card className="h-full hover:shadow-lg transition-shadow border-gold/20 hover:border-gold/40">
                <CardHeader className="bg-inherit">
                  <CardTitle className="text-xl mb-2 text-black">{post.title}</CardTitle>
                  <CardDescription className="text-black">
                    {new Date(post.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-black">{post.excerpt}</p>
                </CardContent>
              </Card>
            </Link>)}
        </div>
        <div className="flex justify-center mt-12">
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>;
};

export default Blog;
