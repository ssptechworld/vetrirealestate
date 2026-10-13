import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Compass,
  Award,
  Building2,
  Users,
  Quote,
  User,
  ArrowRight,
  CheckCircle2,
  HardHat,
  FileText
} from 'lucide-react';
import { fadeUp, staggerContainer } from '../utils/animations';

// Verified local image assets from project
import aboutIntroVilla from '../assets/about_intro_villa.jpg';
import aboutCourtyard from '../assets/about_courtyard.jpg';
import aboutHeroVilla from '../assets/about_hero_villa.jpg';
import builtByUsBg from '../assets/built_by_us_bg.jpg';
import Founder from '../assets/Murugar.jpg'

/**
 * FOUNDER ASSET CONFIGURATION:
 * When a verified photograph of Vijayakumar is provided, assign the image import here.
 * Set to null by default so a clean, dignified portrait placeholder is rendered instead
 * of using unverified stock photography.
 */
const FOUNDER_PHOTO = Founder;

// Confirmed Founder Information
const FOUNDER_INFO = {
  name: "Vijayakumar",
  designation: "Founder",
  biographyPlaceholder: "[Add founder biography here]",
  visionStatementPlaceholder: "[Add founder's vision statement here]"
};

// Company & Brand Profiles
// Presented as associated company profiles without unconfirmed legal ownership claims.
const COMPANY_PROFILES = [
  {
    id: "raghavi-construction",
    name: "Raghavi Construction",
    badge: "Associated Company Profile",
    category: "Construction & Development",
    initials: "RC",
    image: builtByUsBg,
    imageAlt: "Raghavi Construction structural execution and residential development",
    imageCaption: "Civil & Structural Execution",
    description: "A specialized construction entity focused on durable structural engineering, residential developments, and rigorous civil execution standards.",
    placeholderTitle: "Company History & Business Scope",
    placeholderText: "[Company history, full business description, and project portfolio to be added upon verified confirmation]"
  },
  {
    id: "vetri-vinayaga",
    name: "Vetri Vinayaga",
    badge: "Associated Brand Profile",
    category: "Real Estate & Enterprise",
    initials: "VV",
    image: aboutCourtyard,
    imageAlt: "Vetri Vinayaga architectural real estate and property development",
    imageCaption: "Property Development & Curation",
    description: "An associated entity and brand profile active within real estate and development initiatives, contributing to project delivery and client engagement.",
    placeholderTitle: "Business Role & Responsibilities",
    placeholderText: "[Specific operational role, business scope, and service portfolio to be added upon verified confirmation]"
  },
  {
    id: "vv-construction",
    name: "VV Construction",
    badge: "Associated Company Profile",
    category: "Civil Works & Contracting",
    initials: "VVC",
    image: aboutHeroVilla,
    imageAlt: "VV Construction architectural craftsmanship and structural works",
    imageCaption: "Site Works & Contracting",
    description: "A dedicated construction profile handling site execution, structural works, and building management with an emphasis on safety and craft.",
    placeholderTitle: "Specific Services & Scope",
    placeholderText: "[Detailed services, contract responsibilities, and operational scope to be added upon verified confirmation]"
  }
];

// 5 Core Company Values (presented as foundational principles, not unverified claims)
const COMPANY_VALUES = [
  {
    icon: Building2,
    title: "Quality Construction",
    description: "Uncompromising adherence to robust engineering, superior building materials, and resilient craftsmanship."
  },
  {
    icon: Users,
    title: "Customer Satisfaction",
    description: "Attentive client guidance, prompt communication, and homes designed around real living comforts."
  },
  {
    icon: ShieldCheck,
    title: "Transparent Communication",
    description: "Clear legal documentation, straightforward milestone updates, and open, honest transactions."
  },
  {
    icon: Compass,
    title: "Attention to Detail",
    description: "Precision in spatial layout, ventilation, natural light, and refined aesthetic finishes."
  },
  {
    icon: Award,
    title: "Long-Term Trust",
    description: "Fostering enduring relationships with homeowners and partners through dependability and integrity."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#121417] pt-24 sm:pt-28 pb-20 overflow-x-hidden">

      {/* 1. HERO BANNER */}
      <section className="bg-[#0E1013] text-white pt-20 pb-24 border-b border-[#C5A880]/20 relative overflow-hidden rounded-b-[48px] sm:rounded-b-[80px] shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C5A880]/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="px-4 py-1.5 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#C5A880] text-xs font-semibold uppercase tracking-widest inline-block">
              About Vetri Real Estate
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto text-white leading-tight"
          >
            Crafting Enduring Spaces with Integrity & Precision
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light"
          >
            Introducing our enterprise, dedicated construction entities, and leadership committed to transparent development and exceptional building standards.
          </motion.p>
        </div>
      </section>

      {/* 4. FOUNDER PROFILE SECTION: "Meet Our Founder" */}
      <section className="py-20 sm:py-28 bg-[#0E1013] text-white border-y border-[#C5A880]/20 relative overflow-hidden rounded-[48px] sm:rounded-[64px] my-14 shadow-2xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C5A880]/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Section Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-2xl mx-auto mb-14 space-y-3"
          >
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block">
              Leadership & Vision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Meet Our Founder
            </h2>
            <p className="text-zinc-400 text-sm font-light">
              Guiding our organization with a core commitment to structural durability, client satisfaction, and dependable execution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Founder Portrait / Clean Dignified Placeholder */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="w-full max-w-md aspect-[3/4] rounded-t-[140px] sm:rounded-t-[200px] rounded-b-[36px] overflow-hidden border border-[#C5A880]/40 relative shadow-2xl bg-gradient-to-b from-[#181B20] via-[#121417] to-[#0B0C0E] p-8 flex flex-col items-center justify-between text-center group">

                {/* Background decorative subtle grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

                {/* Ambient glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C5A880]/15 via-transparent to-transparent pointer-events-none" />

                {/* If verified photo exists, render it; otherwise, render the clean placeholder */}
                {FOUNDER_PHOTO ? (
                  <img
                    src={FOUNDER_PHOTO}
                    alt={`${FOUNDER_INFO.name} — ${FOUNDER_INFO.designation}`}
                    className="w-full h-full object-cover rounded-t-[120px] rounded-b-[28px]"
                  />
                ) : (
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center space-y-6 py-6">

                    {/* Founder Monogram Medallion */}
                    <div className="relative">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#121417] border-2 border-[#C5A880]/70 flex items-center justify-center shadow-2xl relative">
                        <span className="font-serif text-3xl sm:text-4xl font-bold text-[#C5A880] tracking-wider">
                          VK
                        </span>
                      </div>
                      <div className="absolute -inset-2 rounded-full border border-[#C5A880]/20 animate-pulse pointer-events-none" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
                        {FOUNDER_INFO.name}
                      </h3>
                      <p className="text-xs tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
                        {FOUNDER_INFO.designation}
                      </p>
                    </div>

                    {/* Placeholder pill */}
                    <div className="bg-[#0E1013]/90 border border-dashed border-[#C5A880]/50 rounded-2xl px-4 py-3 max-w-xs space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold block">
                        Official Portrait Placeholder
                      </span>
                      <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                        A clean placeholder is displayed until the verified portrait is provided. No stock photos used.
                      </p>
                    </div>

                  </div>
                )}

                {/* Bottom Frame Accent */}
                <div className="relative z-10 text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                  Vetri Real Estate Leadership
                </div>
              </div>
            </motion.div>

            {/* Right Column: Founder Details */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="lg:col-span-7 space-y-6"
            >

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
                  Executive Profile
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  {FOUNDER_INFO.name}
                </h3>
                <div className="inline-flex items-center gap-2 pt-1">
                  <span className="px-3 py-1 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#C5A880] text-xs font-semibold uppercase tracking-wider">
                    {FOUNDER_INFO.designation}
                  </span>
                  <span className="text-xs text-zinc-400 font-light">
                    SASTHA FOUNDATION
                  </span>
                </div>
              </div>

              {/* Biography Block with Editable Placeholder */}
              <div className="bg-[#181B20] p-6 rounded-[28px] border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-white text-base flex items-center gap-2">
                    <User className="w-4 h-4 text-[#C5A880]" />
                    Biography & Background
                  </h4>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30 font-medium">
                    Editable Placeholder
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#121417] border border-dashed border-[#C5A880]/50">
                  <p className="font-mono text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                    Vijayakumar, the Founder of SASTHA FOUNDATION, believes that building a home is about more than creating a structure — it is about shaping a better future for families and communities.

                    With a vision centered on trust, quality, and long-term value, he aims to establish a foundation built on integrity, thoughtful planning, and customer satisfaction. His approach emphasizes the importance of understanding people's needs and creating spaces that offer comfort, confidence, and lasting value.

                    Through his leadership, SASTHA FOUNDATION aspires to build meaningful relationships with customers and contribute to the development of well-planned residential spaces. His commitment is to make the home-buying journey more transparent, reliable, and rewarding for every customer.
                  </p>
                </div>

                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  The founder's verified biography, background, and career history will be displayed here once official documentation is provided. No unverified claims or dates have been fabricated.
                </p>
              </div>

              {/* Founder's Vision Statement / Optional Personal Message */}
              <div className="bg-[#181B20] p-6 rounded-[28px] border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-white text-base flex items-center gap-2">
                    <Quote className="w-4 h-4 text-[#C5A880]" />
                    Founder's Vision Statement
                  </h4>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#C5A880]/15 text-[#C5A880] border border-[#C5A880]/30 font-medium">
                    Editable Placeholder
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#121417] border border-dashed border-[#C5A880]/50 space-y-2">
                  <p className="font-mono text-xs sm:text-sm text-stone-300 italic leading-relaxed pl-2 border-l-2 border-[#C5A880]">
                    We believe in building more than just homes — we are committed to creating spaces that offer comfort, confidence, and lasting value. Our goal is to make the home-buying journey more transparent, reliable, and rewarding for every customer.
                  </p>
                  <p className="text-right text-[11px] text-[#C5A880] font-medium">
                    — {FOUNDER_INFO.name}, {FOUNDER_INFO.designation}
                  </p>
                </div>

                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  A personal leadership message or company vision statement can be placed here to articulate the founder's ethos to prospective property buyers.
                </p>
              </div>

              {/* Leadership Guiding Principles */}
              <div className="pt-2 flex flex-wrap gap-2 sm:gap-3 text-xs">
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-stone-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                  Structural Integrity
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-stone-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                  Transparent Dealings
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-stone-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
                  Customer Satisfaction
                </span>
              </div>

            </motion.div>

          </div>

        </div>
      </section>


      {/* 3. COMPANY PROFILES SECTION: "Our Companies & Brands" */}
      <section className="py-20 sm:py-24 bg-white border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-3xl mx-auto mb-14 space-y-3"
          >
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block">
              Enterprise Overview
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E1013]">
              Our Companies & Brands
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base font-light leading-relaxed">
              Introducing the distinct company and brand profiles associated with our business, delivering specialized construction and real estate services.
            </p>
            <div className="inline-block mt-2 px-3 py-1 bg-[#FAF8F5] border border-stone-200 rounded-full text-[11px] text-zinc-500">
              * Associated company profiles — formal corporate structure details will be updated upon official confirmation.
            </div>
          </motion.div>

          {/* 3 Company Profiles Grid */}
          <motion.div
            variants={staggerContainer(0.15, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
          >
            {COMPANY_PROFILES.map((profile) => (
              <motion.div
                key={profile.id}
                variants={fadeUp}
                className="bg-[#FAF8F5] rounded-[32px] border border-stone-200/90 hover:border-[#C5A880]/70 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1.5"
              >
                {/* Profile Image Banner */}
                <div className="aspect-[16/10] relative overflow-hidden bg-[#121417]">
                  <img
                    src={profile.image}
                    alt={profile.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1013]/80 via-transparent to-transparent" />

                  {/* Monogram Seal */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#0E1013]/90 backdrop-blur-sm border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] font-serif font-bold text-sm shadow-md">
                    {profile.initials}
                  </div>

                  {/* Caption Pill */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-stone-200">
                    <span className="font-medium text-white">{profile.imageCaption}</span>
                    <span className="text-[10px] text-[#C5A880] bg-[#0E1013]/80 px-2 py-0.5 rounded-full border border-[#C5A880]/20">
                      Profile
                    </span>
                  </div>
                </div>

                {/* Profile Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold">
                        {profile.category}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 bg-stone-200/70 text-zinc-600 rounded-full font-medium">
                        {profile.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#0E1013] tracking-tight group-hover:text-[#9E825A] transition-colors">
                      {profile.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                      {profile.description}
                    </p>
                  </div>

                  {/* Editable Placeholder Box */}
                  <div className="pt-4 border-t border-stone-200">
                    <div className="bg-white p-4 rounded-2xl border border-dashed border-[#C5A880]/60 space-y-2 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[#0E1013] flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#C5A880]" />
                          {profile.placeholderTitle}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C5A880]/15 text-[#9E825A] font-semibold border border-[#C5A880]/30">
                          Placeholder
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-zinc-500 italic leading-relaxed">
                        {profile.placeholderText}
                      </p>
                      <p className="text-[10px] text-zinc-400 font-light">
                        * Ready to update once verified business details are submitted.
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>


      {/* 5. OUR VALUES SECTION */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block">
            Guiding Principles
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E1013]">
            Our Values
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-light leading-relaxed">
            The core company values that govern our construction practices, customer relationships, and long-term commitments.
          </p>
        </motion.div>

        {/* 5 Values Responsive Grid */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {COMPANY_VALUES.map((val, index) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="bg-white p-7 rounded-[28px] border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-[#C5A880]/60 transition-all duration-300 flex flex-col items-center text-center space-y-4 hover:-translate-y-1.5 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0E1013] border border-[#C5A880]/40 text-[#C5A880] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0E1013] group-hover:text-[#9E825A] transition-colors">
                  {val.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  {val.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-[#0E1013] text-white rounded-[36px] sm:rounded-[48px] p-8 sm:p-12 lg:p-16 border border-[#C5A880]/30 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#C5A880]/15 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block">
              Work With Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Discover Quality Living with Vetri Real Estate
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
              Explore our current residential developments or get in touch with our advisory team to discuss your property requirements.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/properties"
                className="px-6 py-3 rounded-full bg-[#C5A880] text-[#0E1013] font-semibold text-xs tracking-wider uppercase hover:bg-[#B5966C] transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                Explore Properties
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-full bg-transparent border border-white/30 text-white font-semibold text-xs tracking-wider uppercase hover:border-[#C5A880] hover:text-[#C5A880] transition-all duration-300 inline-flex items-center gap-2"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
