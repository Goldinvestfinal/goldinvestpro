import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Investment Analyst",
    content: "The best platform I've used for gold investments. Simple yet powerful.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Private Investor",
    content: "Excellent security features and the customer support is outstanding.",
    rating: 5,
  },
  {
    name: "Emma Davis",
    role: "Financial Advisor",
    content: "I recommend this platform to all my clients. It's reliable and user-friendly.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
          <p className="mt-4 text-lg text-gray-600">Join thousands of satisfied investors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardHeader>
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};