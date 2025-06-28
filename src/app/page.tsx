"use client";

import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Glow } from "~/components/ui/glow";
import { Mockup, MockupFrame } from "~/components/ui/mockup";
import { Icons } from "~/components/ui/icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";
import { 
  ArrowRight, 
  Mic, 
  Bot, 
  Calendar, 
  Upload, 
  FileText, 
  Zap, 
  Users, 
  Clock, 
  CheckCircle,
  Star,
  Play,
  MessageSquare,
  Settings,
  Mail
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🌸</div>
              <span className="text-xl font-semibold text-foreground">Daisy</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/chat">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/chat">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-background text-foreground py-12 sm:py-24 md:py-32 px-4 fade-bottom overflow-hidden pb-0">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 pt-16 sm:gap-24">
          <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
            {/* Badge */}
            <Badge variant="outline" className="animate-appear gap-2">
              <span className="text-muted-foreground">🎉 Now with real-time transcription</span>
              <Link href="/chat" className="flex items-center gap-1 text-primary hover:underline">
                Try it free
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Badge>

            {/* Title */}
            <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight">
              AI Meeting Assistant That Actually Works
            </h1>

            {/* Description */}
            <p className="text-md relative z-10 max-w-[650px] animate-appear font-medium text-muted-foreground opacity-0 delay-100 sm:text-xl">
              Upload audio, get instant transcriptions, smart summaries, and action items. 
              Sync with your favorite tools through a chat-first interface powered by OpenAI.
            </p>

            {/* Social Proof Numbers */}
            <div className="flex items-center gap-8 text-sm text-muted-foreground animate-appear opacity-0 delay-200">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>10,000+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>1M+ minutes transcribed</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-current text-yellow-500" />
                <span>4.9/5 rating</span>
              </div>
            </div>

            {/* Actions */}
            <div className="relative z-10 flex flex-col sm:flex-row animate-appear justify-center gap-4 opacity-0 delay-300">
              <Link href="/chat">
                <Button size="lg" className="w-full sm:w-auto">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
              </Link>
              <Link href="#demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Image with Glow */}
            <div className="relative pt-12">
              <MockupFrame
                className="animate-appear opacity-0 delay-700"
                size="large"
              >
                <Mockup type="responsive">
                  <Image
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop&crop=center"
                    alt="Daisy AI Meeting Assistant Dashboard"
                    width={1200}
                    height={800}
                    priority
                    className="rounded-md"
                  />
                </Mockup>
              </MockupFrame>
              <Glow
                variant="top"
                className="animate-appear-zoom opacity-0 delay-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Everything you need for better meetings
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From transcription to action items, Daisy handles it all so you can focus on what matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Mic className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">AI Transcription</h3>
              <p className="text-muted-foreground">
                Powered by OpenAI Whisper for 99% accurate speech-to-text conversion in 50+ languages.
              </p>
            </motion.div>

            <motion.div 
              className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Smart Summaries</h3>
              <p className="text-muted-foreground">
                Get intelligent summaries, key decisions, and action items extracted automatically from your meetings.
              </p>
            </motion.div>

            <motion.div 
              className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Smart Integrations</h3>
              <p className="text-muted-foreground">
                Sync with Google Calendar, Slack, Notion, and 1000+ apps. Action items become calendar events automatically.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              How Daisy works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to transform your meetings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">1. Upload or Record</h3>
              <p className="text-muted-foreground">
                Upload your meeting audio files or record live meetings directly in Daisy.
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">2. AI Processing</h3>
              <p className="text-muted-foreground">
                Our AI transcribes, summarizes, and extracts action items with assignees and deadlines.
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">3. Sync & Act</h3>
              <p className="text-muted-foreground">
                Results sync to your tools automatically. Chat with Daisy to get insights and updates.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Loved by teams worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our customers are saying about Daisy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-card rounded-xl border border-border p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                "Daisy has completely transformed how we handle meeting follow-ups. Action items are automatically synced to our project management tools."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">SJ</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Product Manager, TechCorp</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-card rounded-xl border border-border p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                "The transcription accuracy is incredible, and the chat interface makes it so easy to find information from past meetings."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">MC</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Engineering Lead, StartupXYZ</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-card rounded-xl border border-border p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                "We've saved hours every week on meeting notes. The AI summaries are spot-on and the integrations work flawlessly."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">ER</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Emily Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Operations Director, GrowthCo</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-8">Trusted by teams at</p>
            <div className="flex items-center justify-center gap-12 opacity-60">
              <div className="text-2xl font-bold">TechCorp</div>
              <div className="text-2xl font-bold">StartupXYZ</div>
              <div className="text-2xl font-bold">GrowthCo</div>
              <div className="text-2xl font-bold">InnovateLab</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that's right for your team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <motion.div 
              className="bg-card rounded-xl border border-border p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-foreground">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">5 meetings per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Basic transcription</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">AI summaries</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Chat interface</span>
                </li>
              </ul>
              <Link href="/chat">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div 
              className="bg-card rounded-xl border-2 border-primary p-8 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-foreground">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Unlimited meetings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Advanced transcription</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Smart action items</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">All integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Real-time transcription</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <Link href="/chat">
                <Button className="w-full">
                  Start Free Trial
                </Button>
              </Link>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div 
              className="bg-card rounded-xl border border-border p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">Enterprise</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-foreground">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Custom integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">SSO & security</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">Dedicated support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icons.check className="w-4 h-4 text-primary" />
                  <span className="text-sm">SLA guarantee</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Frequently asked questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about Daisy
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                How accurate is the transcription?
              </AccordionTrigger>
              <AccordionContent>
                Daisy uses OpenAI's Whisper model, which provides 99%+ accuracy for clear audio in over 50 languages. 
                The accuracy depends on audio quality, but we consistently deliver industry-leading results.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                What file formats do you support?
              </AccordionTrigger>
              <AccordionContent>
                We support all major audio formats including MP3, WAV, M4A, FLAC, and more. You can also record 
                directly in the app or integrate with popular meeting platforms like Zoom and Google Meet.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                How do the integrations work?
              </AccordionTrigger>
              <AccordionContent>
                Daisy connects with your existing tools through secure APIs. Action items automatically become 
                calendar events, summaries can be sent to Slack channels, and transcripts can be saved to Notion 
                or Google Drive. Setup takes just a few clicks.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                Is my data secure and private?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely. We use enterprise-grade encryption, never store audio files longer than necessary, 
                and are SOC 2 compliant. Your meeting data is processed securely and never used to train AI models.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                Can I try Daisy for free?
              </AccordionTrigger>
              <AccordionContent>
                Yes! Our free plan includes 5 meetings per month with full transcription and AI summaries. 
                Pro plans also come with a 14-day free trial with no credit card required.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">
                Do you offer customer support?
              </AccordionTrigger>
              <AccordionContent>
                We provide email support for all users, with priority support for Pro customers and dedicated 
                support for Enterprise clients. Our team typically responds within 2-4 hours during business hours.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to transform your meetings?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of teams already using Daisy to make their meetings more productive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chat">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🌸</div>
                <span className="text-xl font-semibold text-foreground">Daisy</span>
              </div>
              <p className="text-muted-foreground">
                AI meeting assistant that transforms your conversations into actionable insights.
              </p>
              <div className="flex items-center gap-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Icons.twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Icons.linkedin className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <Icons.gitHub className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link href="/chat" className="text-muted-foreground hover:text-foreground">Try Daisy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Integrations</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">API Reference</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Status</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="border-t border-border mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Stay updated</h3>
                <p className="text-muted-foreground">Get the latest news and updates from Daisy.</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Daisy AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground">Terms of Service</Link>
              <Link href="#" className="hover:text-foreground">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}