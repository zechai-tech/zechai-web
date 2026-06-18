"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

interface Enquiry {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email: string;
  city: string;
  preferred_model: string;
  budget_range: string;
  message: string | null;
  status: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Authenticate session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAdmin = sessionStorage.getItem("zc_admin");
      if (isAdmin !== "true") {
        router.push("/admin");
      } else {
        setAuthorized(true);
      }
    }
  }, [router]);

  // Fetch enquiries if authorized
  useEffect(() => {
    if (authorized) {
      fetchEnquiries();
    }
  }, [authorized]);

  const fetchEnquiries = async () => {
    setIsRefreshing(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from("franchise_enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEnquiries(data || []);
    } catch (err: any) {
      console.error("Fetch enquiries error:", err);
      setErrorMsg("Failed to fetch enquiries. Please check Supabase connection.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const { error } = await supabase
        .from("franchise_enquiries")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      // Update local state immediately
      setEnquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
    } catch (err: any) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("zc_admin");
    router.push("/admin");
  };

  // Stats calculation
  const totalEnquiries = enquiries.length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === "new").length;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const thisWeekCount = enquiries.filter(
    (e) => new Date(e.created_at) >= sevenDaysAgo
  ).length;

  // Format date helper
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "contacted":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "converted":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "rejected":
        return "bg-rose-100 text-rose-800 border-rose-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#F2E8C4] flex items-center justify-center">
        <p className="font-display text-xl font-bold text-[#E8401C]">Loading portal...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2E8C4] font-sans pb-12">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#fdfaf0]/90 backdrop-blur-md border-b-2 border-[#E8401C]/10 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden sm:inline font-display text-xl font-extrabold text-[#E8401C] tracking-wide">
              Zé Chai
            </span>
          </div>

          <h1 className="font-display text-lg sm:text-2xl font-bold text-[#1A1A1A] tracking-tight">
            Franchise Enquiries
          </h1>

          <button
            onClick={handleLogout}
            className="bg-[#E8401C] hover:bg-[#cf3515] text-[#F2E8C4] font-display font-extrabold text-sm py-2 px-4 rounded-[6px] transition-all hover:scale-102 active:scale-98 shadow-sm cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Stats Dashboard Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1: Total */}
          <div className="bg-[#fdfaf0] border-2 border-[#E8401C]/15 rounded-[20px] p-6 shadow-sm flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-[#1A1A1A]/40 uppercase tracking-wider">
                Total Enquiries
              </span>
              <span className="font-display text-4xl font-extrabold text-[#1A1A1A] mt-2 block">
                {isLoading ? "..." : totalEnquiries}
              </span>
            </div>
            <div className="w-12 h-12 bg-[#E8401C]/10 rounded-full flex items-center justify-center text-[#E8401C]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>

          {/* Card 2: New */}
          <div className="bg-[#fdfaf0] border-2 border-[#E8401C]/15 rounded-[20px] p-6 shadow-sm flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-[#1A1A1A]/40 uppercase tracking-wider">
                New Leads
              </span>
              <span className="font-display text-4xl font-extrabold text-[#E8401C] mt-2 block">
                {isLoading ? "..." : newEnquiriesCount}
              </span>
            </div>
            <div className="w-12 h-12 bg-[#E8401C]/10 rounded-full flex items-center justify-center text-[#E8401C]">
              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          {/* Card 3: This Week */}
          <div className="bg-[#fdfaf0] border-2 border-[#E8401C]/15 rounded-[20px] p-6 shadow-sm flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-[#1A1A1A]/40 uppercase tracking-wider">
                This Week
              </span>
              <span className="font-display text-4xl font-extrabold text-[#1A1A1A] mt-2 block">
                {isLoading ? "..." : thisWeekCount}
              </span>
            </div>
            <div className="w-12 h-12 bg-[#E8401C]/10 rounded-full flex items-center justify-center text-[#E8401C]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </section>

        {/* Refresh Header Section */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-[#1A1A1A]/60 font-semibold">
            {!isLoading && `Showing ${enquiries.length} enquiries`}
          </span>

          <button
            onClick={fetchEnquiries}
            disabled={isRefreshing || isLoading}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 text-[#1A1A1A] border-2 border-[#E8401C]/15 font-display font-bold text-sm py-2 px-4 rounded-[8px] transition-all hover:scale-102 active:scale-98 shadow-sm cursor-pointer disabled:opacity-50"
          >
            <svg
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12" />
            </svg>
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Database Connection Error */}
        {errorMsg && (
          <div className="bg-red-50 border-2 border-red-500/20 text-red-600 font-bold p-6 rounded-[20px] text-center mb-8">
            <p className="mb-3">{errorMsg}</p>
            <button
              onClick={fetchEnquiries}
              className="bg-red-600 text-white font-display font-bold py-2 px-5 rounded-[8px] hover:bg-red-700 transition-colors"
            >
              Try Reconnecting
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-[#fdfaf0] border-2 border-[#E8401C]/10 rounded-[24px] p-20 text-center flex flex-col items-center justify-center">
            <svg className="animate-spin h-10 w-10 text-[#E8401C] mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="font-display font-bold text-lg text-[#E8401C]">Fetching lead list...</span>
          </div>
        ) : enquiries.length === 0 ? (
          /* Empty State */
          <div className="bg-[#fdfaf0] border-2 border-[#E8401C]/10 rounded-[24px] py-20 px-4 text-center">
            <span className="text-5xl mb-4 block">☕</span>
            <h3 className="font-display text-2xl font-bold text-[#1A1A1A] mb-2">No enquiries found</h3>
            <p className="text-[#1A1A1A]/60 max-w-sm mx-auto font-medium">
              Submit an enquiry on the main website to see it populate here in real-time.
            </p>
          </div>
        ) : (
          <>
            {/* Table layout (for Tablet & Desktop views) */}
            <div className="hidden md:block bg-[#fdfaf0] border-2 border-[#E8401C]/15 rounded-[24px] overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#E8401C] text-[#F2E8C4] font-display font-extrabold uppercase text-xs tracking-wider border-b border-[#E8401C]">
                    <th className="py-4 px-6">Name / Date</th>
                    <th className="py-4 px-6">Contact details</th>
                    <th className="py-4 px-6">City</th>
                    <th className="py-4 px-6">Model / Budget</th>
                    <th className="py-4 px-6">Message</th>
                    <th className="py-4 px-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8401C]/10 text-sm font-semibold text-[#1A1A1A]">
                  {enquiries.map((enquiry, idx) => (
                    <tr
                      key={enquiry.id}
                      className={`${
                        idx % 2 === 0 ? "bg-white" : "bg-[#fdfaf0]"
                      } hover:bg-[#F2E8C4]/20 transition-colors`}
                    >
                      {/* Name and Date */}
                      <td className="py-4 px-6">
                        <span className="block font-bold text-base text-[#1A1A1A]">
                          {enquiry.full_name}
                        </span>
                        <span className="block text-xs text-[#1A1A1A]/50 mt-1">
                          {formatDate(enquiry.created_at)}
                        </span>
                      </td>

                      {/* Contact Details */}
                      <td className="py-4 px-6">
                        <span className="block text-[#1A1A1A]">{enquiry.phone}</span>
                        <span className="block text-[#1A1A1A]/60 font-medium text-xs mt-0.5">
                          {enquiry.email}
                        </span>
                      </td>

                      {/* City */}
                      <td className="py-4 px-6 font-medium">{enquiry.city}</td>

                      {/* Model & Budget */}
                      <td className="py-4 px-6">
                        <span className="block text-[#E8401C] font-extrabold">
                          {enquiry.preferred_model}
                        </span>
                        <span className="block text-xs text-[#1A1A1A]/60 font-medium mt-0.5">
                          Budget: {enquiry.budget_range}
                        </span>
                      </td>

                      {/* Message */}
                      <td className="py-4 px-6 max-w-[240px]">
                        {enquiry.message ? (
                          <p className="line-clamp-2 text-xs font-normal text-[#1A1A1A]/70 leading-relaxed" title={enquiry.message}>
                            {enquiry.message}
                          </p>
                        ) : (
                          <span className="text-gray-300 italic font-normal text-xs">—</span>
                        )}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-6 text-center">
                        <div className="relative inline-block w-36">
                          <select
                            value={enquiry.status}
                            disabled={updatingId === enquiry.id}
                            onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                            className={`w-full py-1.5 px-3 border rounded-full text-xs font-bold uppercase tracking-wider outline-none cursor-pointer appearance-none text-center ${getStatusColor(
                              enquiry.status
                            )} disabled:opacity-50`}
                          >
                            <option value="new">🆕 New</option>
                            <option value="contacted">📞 Contacted</option>
                            <option value="converted">🤝 Converted</option>
                            <option value="rejected">❌ Rejected</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile layout (Collapses to elegant Cards on mobile screens) */}
            <div className="md:hidden space-y-4">
              {enquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="bg-[#fdfaf0] border-2 border-[#E8401C]/15 rounded-[20px] p-6 shadow-sm space-y-4"
                >
                  {/* Header: Name & Date */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display font-extrabold text-lg text-[#1A1A1A]">
                        {enquiry.full_name}
                      </h4>
                      <span className="text-xs text-[#1A1A1A]/50 block mt-0.5">
                        {formatDate(enquiry.created_at)}
                      </span>
                    </div>

                    {/* Status Dropdown */}
                    <div className="w-28 relative">
                      <select
                        value={enquiry.status}
                        disabled={updatingId === enquiry.id}
                        onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                        className={`w-full py-1 px-2.5 border rounded-full text-xs font-bold uppercase tracking-wider outline-none cursor-pointer appearance-none text-center ${getStatusColor(
                          enquiry.status
                        )} disabled:opacity-50`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  {/* Core details */}
                  <div className="grid grid-cols-2 gap-4 text-sm font-semibold border-y border-[#E8401C]/10 py-3">
                    <div>
                      <span className="text-xs text-[#1A1A1A]/40 block uppercase tracking-wider mb-0.5">
                        Model / Budget
                      </span>
                      <span className="text-[#E8401C] font-extrabold block">
                        {enquiry.preferred_model}
                      </span>
                      <span className="text-xs text-[#1A1A1A]/70">{enquiry.budget_range}</span>
                    </div>

                    <div>
                      <span className="text-xs text-[#1A1A1A]/40 block uppercase tracking-wider mb-0.5">
                        City / District
                      </span>
                      <span className="text-[#1A1A1A] block">{enquiry.city}</span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="text-sm font-semibold space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">📞</span>
                      <a href={`tel:${enquiry.phone}`} className="text-[#E8401C] hover:underline">
                        {enquiry.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">✉️</span>
                      <a href={`mailto:${enquiry.email}`} className="text-[#1A1A1A]/75 hover:underline">
                        {enquiry.email}
                      </a>
                    </div>
                  </div>

                  {/* Message details */}
                  {enquiry.message && (
                    <div className="bg-white/50 border border-[#E8401C]/5 rounded-[12px] p-3 text-xs">
                      <span className="text-[10px] text-[#1A1A1A]/40 block font-extrabold uppercase tracking-wider mb-1">
                        Message from applicant:
                      </span>
                      <p className="text-[#1A1A1A]/80 leading-relaxed font-normal">
                        {enquiry.message}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
