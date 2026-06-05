export const platformStats = [
  { label: "Digital Assets", value: "12,400+", change: "+18%" },
  { label: "Active Campaigns", value: "3,200", change: "+24%" },
  { label: "Verified Sellers", value: "890", change: "+12%" },
  { label: "Monthly Impressions", value: "48M", change: "+31%" },
] as const;

export const featuredAssets = [
  {
    id: "ast-001",
    title: "Neon Skyline Billboard Pack",
    category: "Outdoor Advertising",
    seller: "PixelForge Studios",
    price: "$2,400 / week",
    impressions: "1.2M",
    rating: 4.9,
    image: "from-violet-600/40 to-fuchsia-600/20",
  },
  {
    id: "ast-002",
    title: "Premium Podcast Ad Slot",
    category: "Audio",
    seller: "Signal Wave Media",
    price: "$850 / episode",
    impressions: "340K",
    rating: 4.8,
    image: "from-cyan-600/40 to-blue-600/20",
  },
  {
    id: "ast-003",
    title: "Creator Sponsorship Bundle",
    category: "Influencer",
    seller: "NovaReach",
    price: "$5,200 / campaign",
    impressions: "2.8M",
    rating: 4.7,
    image: "from-amber-600/40 to-orange-600/20",
  },
  {
    id: "ast-004",
    title: "Transit Wrap — Metro Line A",
    category: "Transit",
    seller: "Urban Canvas Co.",
    price: "$18,000 / month",
    impressions: "6.1M",
    rating: 5.0,
    image: "from-emerald-600/40 to-teal-600/20",
  },
  {
    id: "ast-005",
    title: "Programmatic Display Network",
    category: "Digital",
    seller: "AdLattice",
    price: "$0.42 CPM",
    impressions: "12M",
    rating: 4.6,
    image: "from-indigo-600/40 to-purple-600/20",
  },
  {
    id: "ast-006",
    title: "Stadium LED Ribbon Board",
    category: "Sports Media",
    seller: "ArenaVision",
    price: "$9,500 / event",
    impressions: "890K",
    rating: 4.9,
    image: "from-rose-600/40 to-pink-600/20",
  },
] as const;

export const marketplaceCategories = [
  "All Assets",
  "Outdoor",
  "Digital",
  "Audio",
  "Influencer",
  "Transit",
  "Sports",
] as const;

export const dashboardStats = [
  { label: "Active Listings", value: "24", trend: "+3 this week" },
  { label: "Pending Bookings", value: "7", trend: "2 need review" },
  { label: "Revenue (MTD)", value: "$18,420", trend: "+12% vs last month" },
  { label: "Campaign Reach", value: "4.2M", trend: "Across 6 channels" },
] as const;

export const dashboardActivity = [
  {
    id: "act-1",
    title: "Booking request — Neon Skyline Pack",
    time: "12 min ago",
    status: "pending" as const,
  },
  {
    id: "act-2",
    title: "Campaign approved — Q2 Brand Push",
    time: "1 hour ago",
    status: "success" as const,
  },
  {
    id: "act-3",
    title: "New message from Signal Wave Media",
    time: "3 hours ago",
    status: "info" as const,
  },
  {
    id: "act-4",
    title: "Payout processed — $2,150.00",
    time: "Yesterday",
    status: "success" as const,
  },
  {
    id: "act-5",
    title: "Asset verification submitted",
    time: "2 days ago",
    status: "pending" as const,
  },
] as const;

export const sidebarNavItems = [
  { label: "Overview", href: "/dashboard", icon: "layout-dashboard" },
  { label: "My Assets", href: "/dashboard#assets", icon: "package" },
  { label: "Campaigns", href: "/dashboard#campaigns", icon: "megaphone" },
  { label: "Bookings", href: "/dashboard#bookings", icon: "calendar" },
  { label: "Messages", href: "/dashboard#messages", icon: "message-square" },
  { label: "Transactions", href: "/dashboard#transactions", icon: "credit-card" },
  { label: "Settings", href: "/dashboard#settings", icon: "settings" },
] as const;

export const navLinks = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "For Sellers", href: "/#sellers" },
  { label: "For Advertisers", href: "/#advertisers" },
] as const;
