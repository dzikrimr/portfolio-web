"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type Step = "name" | "email" | "message" | "done";

const initialMessages = [
  {
    id: 1,
    from: "them",
    text: "Hey! I'd love to hear from you.",
    time: "10:30",
  },
  { id: 2, from: "them", text: "What's your name?", time: "10:30" },
];

export const ContactSection = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState<Step>("name");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isTyping, setIsTyping] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getPlaceholder = () => {
    switch (step) {
      case "name":
        return "Your name...";
      case "email":
        return "Your email...";
      case "message":
        return "Your message...";
      default:
        return "";
    }
  };

  const getNextPrompt = (currentStep: Step, value: string) => {
    switch (currentStep) {
      case "name":
        return `Nice to meet you, ${value}! What's your email?`;
      case "email":
        return "Perfect! Now, what would you like to talk about?";
      case "message":
        return "Thanks for reaching out! I'll get back to you soon. ✓";
      default:
        return "";
    }
  };

  const handleSend = () => {
    if (!inputValue.trim() || step === "done") return;

    const newTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: "me",
        text: inputValue,
        time: newTime,
      },
    ]);

    const newFormData = { ...formData, [step]: inputValue };
    setFormData(newFormData);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = getNextPrompt(step, inputValue);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "them",
          text: response,
          time: newTime,
        },
      ]);

      if (step === "name") setStep("email");
      else if (step === "email") setStep("message");
      else if (step === "message") {
        setStep("done");
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
      }
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages(initialMessages);
    setFormData({ name: "", email: "", message: "" });
    setStep("name");
    setInputValue("");
  };

  return (
    <section id="contact" className="relative py-24 px-4">
      {/* Section Header */}
      <div className="pb-12">
        <div className="text-center" data-aos="fade-up">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground tracking-tight">
            SAY HELLO
          </h2>
          <p className="text-xs text-muted-foreground/60 mt-4 max-w-xs mx-auto">
            Drop me a message and I'll get back to you soon
          </p>
        </div>
      </div>

      {/* Phone Container - centered and fully visible */}
      <div className="flex justify-center">
        {/* Android Phone Frame - scaled to fit */}
        <div
          className="relative w-[280px] sm:w-[320px] md:w-[340px]"
          data-aos="fade-up"
          data-aos-delay="100"
          style={{ height: "580px" }}
        >
          {/* Phone outer frame */}
          <div className="relative h-full rounded-[2.5rem] border-[12px] border-foreground/90 bg-background shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]">
            {/* Phone inner bezel */}
            <div className="relative h-full rounded-[2rem] overflow-hidden bg-card/50 flex flex-col">
              {/* Status bar with hole punch camera */}
              <div className="relative h-10 bg-card/80 flex items-center justify-center px-5 shrink-0">
                {/* Hole punch camera - centered */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-foreground/20 border-2 border-foreground/30">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-foreground/50" />
                </div>
                {/* Time */}
                <span className="text-[10px] text-muted-foreground absolute left-5">
                  {currentTime}
                </span>
                {/* Status icons */}
                <div className="flex items-center gap-2 absolute right-5">
                  <div className="flex items-end gap-0.5">
                    <div className="w-0.5 h-1   bg-muted-foreground/30 rounded-sm" />
                    <div className="w-0.5 h-1.5 bg-muted-foreground/50 rounded-sm" />
                    <div className="w-0.5 h-2   bg-muted-foreground/70 rounded-sm" />
                    <div className="w-0.5 h-3   bg-muted-foreground/90 rounded-sm" />
                  </div>
                  <span className="text-[9px] text-muted-foreground font-medium">
                    100%
                  </span>
                </div>
              </div>

              {/* Chat Header */}
              <div className="px-5 py-4 border-b border-border/30 bg-card/50 flex items-center gap-4 shrink-0">
                <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center">
                  <span className="text-xs text-foreground/70">DM</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">Dzikri Murtadlo</p>
                  <p className="text-[9px] text-muted-foreground">online</p>
                </div>
                {step === "done" && (
                  <button
                    onClick={resetChat}
                    className="text-[9px] text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded border border-border/30"
                  >
                    new
                  </button>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide bg-background/30">
                {messages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.from === "me" ? "justify-end" : "justify-start"
                    )}
                    data-aos="fade-up"
                    data-aos-delay={index < 2 ? 200 + index * 50 : 0}
                    data-aos-duration="400"
                  >
                    <div
                      className={cn(
                        "max-w-[80%] px-4 py-2.5 rounded-2xl",
                        msg.from === "me"
                          ? "bg-foreground/90 text-background rounded-br-sm"
                          : "bg-accent/40 text-foreground rounded-bl-sm"
                      )}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p
                        className={cn(
                          "text-[9px] mt-1 text-right",
                          msg.from === "me"
                            ? "text-background/40"
                            : "text-muted-foreground/60"
                        )}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-accent/40 rounded-2xl rounded-bl-sm px-5 py-3">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" />
                        <span
                          className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce"
                          style={{ animationDelay: "0.15s" }}
                        />
                        <span
                          className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce"
                          style={{ animationDelay: "0.3s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar */}
              <div className="p-4 border-t border-border/30 bg-card/40 shrink-0">
                {step !== "done" ? (
                  <div className="flex items-center gap-3">
                    <input
                      type={step === "email" ? "email" : "text"}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={getPlaceholder()}
                      className={cn(
                        "flex-1 px-5 py-3 rounded-full text-sm",
                        "bg-background/40 border border-border/40",
                        "text-foreground placeholder:text-muted-foreground/40",
                        "focus:outline-none focus:border-foreground/20",
                        "transition-all duration-200"
                      )}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                        "transition-all duration-200 cursor-pointer",
                        inputValue.trim()
                          ? "bg-foreground/90 text-background hover:bg-foreground hover:shadow-lg"
                          : "bg-muted/50 text-muted-foreground/40 cursor-not-allowed"
                      )}
                      aria-label="Kirim pesan"
                    >
                      {inputValue.trim() ? (
                        // SVG aktif
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-background"
                        >
                          <path d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z" />
                          <path d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z" />
                        </svg>
                      ) : (
                        // SVG disabled
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-muted-foreground/40"
                        >
                          <path d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z" />
                          <path d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                ) : (
                  <p className="text-[10px] text-center text-muted-foreground/50 py-2.5">
                    message delivered ✓
                  </p>
                )}
              </div>

              {/* Navigation bar */}
              <div className="h-8 bg-card/60 flex items-center justify-center shrink-0">
                <div className="w-28 h-1.5 rounded-full bg-foreground/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
