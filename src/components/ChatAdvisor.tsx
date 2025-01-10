import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { MessageCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatAdvisor = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      // Get the current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        throw new Error('Authentication required');
      }

      if (!session?.access_token) {
        throw new Error('Please log in to use the chat');
      }

      const response = await supabase.functions.invoke('chat-advisor', {
        body: { message: userMessage }
      });

      if (response.error) throw new Error(response.error.message);

      // Add AI response to chat
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full bg-gold hover:bg-gold-dark"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader>
          <DrawerTitle className="text-gold text-xl">Gold Investment Advisor</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col h-full p-4">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                Ask me anything about gold investment!
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-gold text-white ml-4'
                      : 'bg-gray-100 text-gray-900 mr-4'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about gold investment..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-gold hover:bg-gold-dark text-white"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Send'
              )}
            </Button>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};