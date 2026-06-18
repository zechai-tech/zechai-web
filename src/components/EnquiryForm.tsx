"use client";

import { useState } from "react";
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  model: string;
  budget: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  model?: string;
  budget?: string;
}

export default function EnquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    city: "",
    model: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const newErrors: FormErrors = {};

    // Name check
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    // Phone check (must be exactly 10 digits)
    const cleanPhone = formData.phone.replace(/[\s\-()]/g, "");
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Enter a valid 10-digit number";
    }

    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // City check
    if (!formData.city.trim()) {
      newErrors.city = "City or District is required";
    }

    // Model check
    if (!formData.model) {
      newErrors.model = "Preferred model is required";
    }

    // Budget check
    if (!formData.budget) {
      newErrors.budget = "Investment budget is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (validate()) {
      setIsSubmitting(true);
      try {
        const cleanPhone = formData.phone.replace(/[\s\-()]/g, "");
        const formattedPhone = `+91 ${cleanPhone}`;
        
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formattedPhone,
            email: formData.email,
            city: formData.city,
            model: formData.model,
            budget: formData.budget,
            message: formData.message,
          }),
        });

        const responseData = await res.json();
        if (!res.ok || responseData.error) {
          throw new Error(responseData.error || "Something went wrong.");
        }
        setIsSubmitted(true);
      } catch (err: any) {
        console.error(err);
        setSubmitError(err.message || "Something went wrong. Please try again or call us directly.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="enquiry-form" className="py-24 bg-[#F2E8C4] relative overflow-hidden">
      {/* Dynamic background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#E8401C]/5 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[#E8401C]/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-[#fdfaf0] border-4 border-[#E8401C] rounded-[24px] p-8 md:p-12 shadow-warm relative"
            >
              {/* Little corner sticker */}
              <div className="absolute top-[-20px] right-8 bg-[#E8401C] text-[#F2E8C4] font-display font-extrabold px-5 py-2 rounded-full shadow-md text-sm uppercase tracking-wider">
                Franchise 2025
              </div>

              <div className="text-center md:text-left mb-10 max-w-2xl">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-[#E8401C] mb-3 leading-tight">
                  Let's Build Together
                </h2>
                <p className="text-lg text-[#1A1A1A]/75 font-semibold">
                  Fill this in and our franchise team will reach out within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-bold text-[#1A1A1A] mb-1.5 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-white border-2 rounded-[10px] py-3 px-4 outline-none font-medium transition-colors ${
                        errors.name ? "border-red-500 focus:border-red-600" : "border-[#E8401C]/15 focus:border-[#E8401C] focus:border-[1.5px]"
                      }`}
                      placeholder="e.g. Mohammed Rahul"
                    />
                    {errors.name && <span className="text-xs font-bold text-red-500 mt-1">{errors.name}</span>}
                  </div>

                  {/* Phone Number - WhatsApp style prefixed input */}
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="text-sm font-bold text-[#1A1A1A] mb-1.5 uppercase tracking-wide">
                      Phone Number *
                    </label>
                    <div
                      className={`flex items-center bg-white border-2 rounded-[10px] py-0.5 px-4 transition-colors ${
                        errors.phone
                          ? "border-red-500 focus-within:border-red-600"
                          : "border-[#E8401C]/15 focus-within:border-[#E8401C] focus-within:border-[1.5px]"
                      }`}
                    >
                      {/* WhatsApp-style Prefix Dropdown */}
                      <div className="flex items-center gap-1.5 border-r border-[#1A1A1A]/10 pr-3 mr-3 select-none text-sm font-bold text-[#1A1A1A]">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      
                      {/* Unified input field */}
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-none outline-none py-3 font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/30"
                        placeholder="9876543210"
                      />
                    </div>
                    {errors.phone && <span className="text-xs font-bold text-red-500 mt-1">{errors.phone}</span>}
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-bold text-[#1A1A1A] mb-1.5 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-white border-2 rounded-[10px] py-3 px-4 outline-none font-medium transition-colors ${
                        errors.email ? "border-red-500 focus:border-red-600" : "border-[#E8401C]/15 focus:border-[#E8401C] focus:border-[1.5px]"
                      }`}
                      placeholder="e.g. rahul@example.com"
                    />
                    {errors.email && <span className="text-xs font-bold text-red-500 mt-1">{errors.email}</span>}
                  </div>

                  {/* City or District */}
                  <div className="flex flex-col">
                    <label htmlFor="city" className="text-sm font-bold text-[#1A1A1A] mb-1.5 uppercase tracking-wide">
                      City / District in Kerala *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full bg-white border-2 rounded-[10px] py-3 px-4 outline-none font-medium transition-colors ${
                        errors.city ? "border-red-500 focus:border-red-600" : "border-[#E8401C]/15 focus:border-[#E8401C] focus:border-[1.5px]"
                      }`}
                      placeholder="e.g. Kozhikode, Kerala"
                    />
                    {errors.city && <span className="text-xs font-bold text-red-500 mt-1">{errors.city}</span>}
                  </div>

                  {/* Preferred Model */}
                  <div className="flex flex-col">
                    <label htmlFor="model" className="text-sm font-bold text-[#1A1A1A] mb-1.5 uppercase tracking-wide">
                      Preferred Model *
                    </label>
                    <select
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      className={`w-full bg-white border-2 rounded-[10px] py-3 px-4 outline-none font-medium transition-colors appearance-none ${
                        errors.model ? "border-red-500 focus:border-red-600" : "border-[#E8401C]/15 focus:border-[#E8401C] focus:border-[1.5px]"
                      }`}
                      style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg fill='%23E8401C' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>\")", backgroundPosition: "right 12px center", backgroundRepeat: "no-repeat" }}
                    >
                      <option value="">Select a Model</option>
                      <option value="Kiosk">Kiosk Model (Starting from ₹15L)</option>
                      <option value="Express">Express Outlet (Starting from ₹20L)</option>
                      <option value="Café">Café Model (Starting from ₹25L)</option>
                    </select>
                    {errors.model && <span className="text-xs font-bold text-red-500 mt-1">{errors.model}</span>}
                  </div>

                  {/* Budget Range */}
                  <div className="flex flex-col">
                    <label htmlFor="budget" className="text-sm font-bold text-[#1A1A1A] mb-1.5 uppercase tracking-wide">
                      Investment Budget *
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className={`w-full bg-white border-2 rounded-[10px] py-3 px-4 outline-none font-medium transition-colors appearance-none ${
                        errors.budget ? "border-red-500 focus:border-red-600" : "border-[#E8401C]/15 focus:border-[#E8401C] focus:border-[1.5px]"
                      }`}
                      style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg fill='%23E8401C' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>\")", backgroundPosition: "right 12px center", backgroundRepeat: "no-repeat" }}
                    >
                      <option value="">Select Budget Range</option>
                      <option value="₹15L–20L">₹15L–20L</option>
                      <option value="₹20L–30L">₹20L–30L</option>
                      <option value="₹30L+">₹30L+</option>
                    </select>
                    {errors.budget && <span className="text-xs font-bold text-red-500 mt-1">{errors.budget}</span>}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label htmlFor="message" className="text-sm font-bold text-[#1A1A1A] mb-1.5 uppercase tracking-wide">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-white border-2 border-[#E8401C]/15 rounded-[10px] py-3 px-4 outline-none font-medium focus:border-[#E8401C] focus:border-[1.5px] transition-colors resize-none"
                    placeholder="Tell us about your proposed site location or business background..."
                  />
                </div>

                {/* Submit Error */}
                {submitError && (
                  <div className="bg-red-50 border border-red-500/20 text-red-600 font-bold px-4 py-3 rounded-[10px] text-sm text-center">
                    {submitError}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#E8401C] hover:bg-[#cf3515] text-[#F2E8C4] font-display font-extrabold text-lg py-4 px-6 rounded-[8px] transition-all hover:scale-103 active:scale-95 disabled:bg-gray-400 disabled:scale-100 disabled:pointer-events-none shadow-[0_6px_20px_rgba(232,64,28,0.2)] cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-[#F2E8C4]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Send My Enquiry"
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            /* Animated Confirmation Card */
            <motion.div
              key="success-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="bg-[#fdfaf0] border-4 border-[#E8401C] rounded-[24px] p-8 md:p-12 text-center shadow-warm max-w-2xl mx-auto relative overflow-hidden"
            >
              {/* Background celebration shapes */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10%" cy="20%" r="40" fill="#E8401C" />
                  <circle cx="90%" cy="80%" r="60" fill="#E8401C" />
                </svg>
              </div>

              {/* Dynamic Logo loader inside confirmation page */}
              <div className="flex justify-center mb-6">
                <Logo />
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#E8401C] mb-4">
                🎉 Enquiry Submitted Successfully
              </h2>
              <p className="text-lg md:text-xl text-[#1A1A1A] font-semibold mb-8 max-w-md mx-auto leading-relaxed">
                Thank you for your interest in Zé Chai Franchise.<br />
                Our team has received your enquiry and will contact you within 24 hours.
              </p>

              {/* Summary details */}
              <div className="bg-[#F2E8C4]/60 border border-[#E8401C]/10 rounded-[16px] p-5 text-left text-sm md:text-base space-y-2.5 max-w-sm mx-auto mb-8">
                <div>
                  <span className="font-bold text-[#1A1A1A]/50 uppercase text-xs tracking-wider block">Applicant</span>
                  <span className="font-semibold text-[#1A1A1A]">{formData.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-bold text-[#1A1A1A]/50 uppercase text-xs tracking-wider block">Model</span>
                    <span className="font-semibold text-[#E8401C]">{formData.model} Model</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#1A1A1A]/50 uppercase text-xs tracking-wider block">Budget</span>
                    <span className="font-semibold text-[#E8401C]">{formData.budget}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setFormData({ name: "", phone: "", email: "", city: "", model: "", budget: "", message: "" });
                  setIsSubmitted(false);
                }}
                className="bg-[#E8401C] hover:bg-[#cf3515] text-[#F2E8C4] font-display font-bold py-3.5 px-8 rounded-[8px] transition-all hover:scale-103 active:scale-95 shadow-[0_4px_12px_rgba(232,64,28,0.12)] cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
