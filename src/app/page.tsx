"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Zap,
  Target,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  BarChart3,
  Clock
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Hero from "@/components/Home/Hero";
import FeaturesWithCourses from "@/components/Home/Features";
import Social from "@/components/Home/Social";
import CTA from "@/components/Home/CTA";

export default function LandingPage() {




  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none scrollbar scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-blue-900">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <Navbar />

      {/* Hero Section */}
      <Hero></Hero>

      {/* Features Section */}
      <FeaturesWithCourses></FeaturesWithCourses>

      {/* Social Proof Section */}
     <Social></Social>

      {/* CTA Section */}
     <CTA></CTA>

      <Footer />
    </div>
  );
}
