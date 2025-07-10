"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { 
  HelpCircle, 
  Search, 
  Book, 
  MessageSquare, 
  Mail, 
  ExternalLink,
  Play,
  FileText,
  Zap,
  Users,
  Shield,
  CreditCard
} from "lucide-react";
import { motion } from "framer-motion";

const helpCategories = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: <Play className="w-5 h-5" />,
    articles: [
      "How to upload your first meeting",
      "Understanding transcription accuracy",
      "Setting up integrations",
      "Creating your first summary"
    ]
  },
  {
    id: "features",
    title: "Features & Usage",
    icon: <Zap className="w-5 h-5" />,
    articles: [
      "AI transcription capabilities",
      "Action item extraction",
      "Meeting summaries",
      "Real-time transcription"
    ]
  },
  {
    id: "integrations",
    title: "Integrations",
    icon: <FileText className="w-5 h-5" />,
    articles: [
      "Google Calendar sync",
      "Slack notifications",
      "Notion workspace setup",
      "Zapier automation"
    ]
  },
  {
    id: "account",
    title: "Account & Billing",
    icon: <CreditCard className="w-5 h-5" />,
    articles: [
      "Upgrading your plan",
      "Managing billing",
      "Usage limits",
      "Canceling subscription"
    ]
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    icon: <Shield className="w-5 h-5" />,
    articles: [
      "Data encryption",
      "Privacy policy",
      "GDPR compliance",
      "Data retention"
    ]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: <HelpCircle className="w-5 h-5" />,
    articles: [
      "Audio upload issues",
      "Transcription problems",
      "Integration errors",
      "Performance issues"
    ]
  }
];

const faqs = [
  {
    question: "How accurate is the transcription?",
    answer: "Daisy uses OpenAI's Whisper model, which provides 99%+ accuracy for clear audio in over 50 languages. The accuracy depends on audio quality, but we consistently deliver industry-leading results."
  },
  {
    question: "What file formats do you support?",
    answer: "We support all major audio formats including MP3, WAV, M4A, FLAC, and more. You can also record directly in the app or integrate with popular meeting platforms like Zoom and Google Meet."
  },
  {
    question: "How do the integrations work?",
    answer: "Daisy connects with your existing tools through secure APIs. Action items automatically become calendar events, summaries can be sent to Slack channels, and transcripts can be saved to Notion or Google Drive. Setup takes just a few clicks."
  },
  {
    question: "Is my data secure and private?",
    answer: "Absolutely. We use enterprise-grade encryption, never store audio files longer than necessary, and are SOC 2 compliant. Your meeting data is processed securely and never used to train AI models."
  },
  {
    question: "Can I try Daisy for free?",
    answer: "Yes! Our free plan includes 5 meetings per month with full transcription and AI summaries. Pro plans also come with a 14-day free trial with no credit card required."
  },
  {
    question: "Do you offer customer support?",
    answer: "We provide email support for all users, with priority support for Pro customers and dedicated support for Enterprise clients. Our team typically responds within 2-4 hours during business hours."
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to your questions and get the most out of Daisy
          </p>
        </motion.div>

        {/* Search */}
        <motion.div 
          className="max-w-md mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get instant help from our support team
          </p>
          <Button className="w-full">Start Chat</Button>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Email Support</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Send us a detailed message
          </p>
          <Button variant="outline" className="w-full">
            Send Email
          </Button>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-md transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Book className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Documentation</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Browse our comprehensive guides
          </p>
          <Button variant="outline" className="w-full">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Docs
          </Button>
        </div>
      </motion.div>

      {/* Help Categories */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {helpCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-foreground">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.articles.slice(0, 3).map((article, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    • {article}
                  </li>
                ))}
                {category.articles.length > 3 && (
                  <li className="text-sm text-primary">
                    + {category.articles.length - 3} more articles
                  </li>
                )}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
        <motion.div 
          className="bg-card rounded-xl border border-border p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>

      {/* Contact Section */}
      <motion.div 
        className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20 p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-foreground mb-2">Still need help?</h3>
        <p className="text-muted-foreground mb-6">
          Our support team is here to help you get the most out of Daisy
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button>
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Join Community
          </Button>
        </div>
      </div>
    </div>
  );
}