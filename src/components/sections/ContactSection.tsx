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
  }, [messages, isTyping]);

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

  const handleSend = async () => {
    if (!inputValue.trim() || step === "done") return;

    const newTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const currentInputValue = inputValue;
    const currentStep = step;

    if (currentStep === "email") {
      const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!gmailRegex.test(currentInputValue.trim().toLowerCase())) {
        // Tampilkan pesan user
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            from: "me",
            text: currentInputValue,
            time: newTime,
          },
        ]);
        setInputValue("");

        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [
              ...prev,
              {
                id: Date.now() + 1,
                from: "them",
                text: "Please enter a valid Gmail address (e.g., name@gmail.com) 🙏",
                time: newTime,
              },
            ]);
          }, 800);
        }, 50);
        return;
      }
    }

    const updatedFormData = { ...formData, [currentStep]: currentInputValue };
    setFormData(updatedFormData);

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "me", text: currentInputValue, time: newTime },
    ]);

    setInputValue("");
    setIsTyping(false);

    setTimeout(() => {
      setIsTyping(true);

      setTimeout(async () => {
        setIsTyping(false);
        const response = getNextPrompt(currentStep, currentInputValue);

        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, from: "them", text: response, time: newTime },
        ]);

        if (currentStep === "name") setStep("email");
        else if (currentStep === "email") setStep("message");
        else if (currentStep === "message") {
          setStep("done");
          try {
            await fetch("/api/send", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedFormData),
            });
            toast({
              title: "Message delivered!",
              description: "I'll get back to you soon.",
            });
          } catch (err) {
            console.error("Failed to send email", err);
          }
        }
      }, 1000);
    }, 50);
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
    <section id="contact" className="relative py-20 md:py-24 px-4">
      <div className="pb-12 text-center" data-aos="fade-up">
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

      <div className="flex justify-center px-4">
        <div
          className="relative w-full max-w-[340px] h-[500px] sm:h-[580px]"
          data-aos="fade-up"
        >
          <div className="relative h-full rounded-[2.5rem] border-[6px] border-foreground/90 bg-background shadow-2xl">
            <div className="relative h-full rounded-[2rem] overflow-hidden bg-card/50 flex flex-col">
              <div className="h-10 bg-card/80 flex items-center justify-center px-5 shrink-0 relative">
                <span className="text-[10px] text-muted-foreground absolute left-5">
                  {currentTime}
                </span>
                <div className="w-4 h-4 rounded-full bg-foreground/20 border-2 border-foreground/30 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-foreground/50" />
                </div>
                <div className="flex items-center gap-2 absolute right-5">
                  <span className="text-[9px] text-muted-foreground font-medium">
                    100%
                  </span>
                </div>
              </div>

              <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-border/30 bg-card/50 flex items-center gap-3 sm:gap-4 shrink-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-accent/50 flex items-center justify-center text-xs text-foreground/70 flex-shrink-0">
                  DM
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">Dzikri Murtadlo</p>
                  <p className="text-[9px] text-muted-foreground italic truncate">
                    online
                  </p>
                </div>
                {step === "done" && (
                  <button
                    onClick={resetChat}
                    className="text-muted-foreground hover:text-foreground border border-border/30 p-1.5 sm:p-1.5 rounded transition-colors cursor-pointer touch-manipulation min-w-[36px] min-h-[36px] flex items-center justify-center active:scale-95"
                    aria-label="Reset conversation"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4 bg-background/30 scrollbar-hide">
                {messages.map((msg, idx) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300", 
                      msg.from === "me" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] sm:max-w-[80%] px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-sm leading-relaxed",
                        msg.from === "me"
                          ? "bg-foreground/90 text-background rounded-br-sm"
                          : "bg-accent/40 text-foreground rounded-bl-sm"
                      )}
                    >
                      {msg.text}
                      <p
                        className={cn("text-[9px] mt-1 text-right opacity-60")}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start animate-in fade-in duration-200">
                    <div className="bg-accent/40 rounded-2xl rounded-bl-sm px-4 sm:px-5 py-2.5 sm:py-3 flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0.15s]" />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 sm:p-4 border-t border-border/30 bg-card/40 shrink-0">
                {step !== "done" ? (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <input
                      type={step === "email" ? "email" : "text"}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={getPlaceholder()}
                      className="flex-1 px-3 sm:px-5 py-2.5 sm:py-3 rounded-full text-sm bg-background/40 border border-border/40 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/20 transition-all min-h-[44px] sm:min-h-[48px] touch-manipulation"
                      autoComplete={step === "email" ? "email" : "name"}
                      autoCapitalize={step === "name" ? "words" : "off"}
                      autoCorrect="off"
                      spellCheck={step !== "email"}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim()}
                      className={cn(
                        "w-11 h-11 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer min-w-[44px] touch-manipulation active:scale-95",
                        inputValue.trim()
                          ? "bg-foreground text-background hover:bg-foreground/90"
                          : "bg-muted/50 text-muted-foreground/40 cursor-not-allowed"
                      )}
                      aria-label="Send message"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <p className="text-[10px] text-center text-muted-foreground/50 py-2.5 italic">
                    message delivered ✓
                  </p>
                )}
              </div>
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
