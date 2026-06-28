import { supabase } from "./lib/supabase";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChefHat,
  Clock,
  Factory,
  Flame,
  Hotel,
  Leaf,
  Mail,
  MapPin,
  Menu,
  PackageCheck,
  Phone,
  Recycle,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  TreePine,
  Truck,
  Utensils,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

const heroImage = "/images/hero-biomass-production.png";
const productImage = "/images/biomass-bricks-product.png";

const navItems = ["Home", "Story", "Benefits", "Process", "Products", "Industries", "Contact"];

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

const benefits: Array<[string, string, LucideIcon]> = [
  ["High Heat Output", "Dense fuel bricks deliver steady, efficient heat for demanding commercial operations.", Flame],
  ["Longer Burning Time", "Uniform compression helps reduce refueling frequency and kitchen downtime.", Clock],
  ["Lower Fuel Costs", "A practical alternative to conventional fuels for businesses watching operating margins.", Wallet],
  ["Reduced Waste Impact", "Wood residues are reused instead of being discarded, burned, or sent to landfills.", Recycle],
  ["Dependable Supply", "Built for regular commercial demand with reliable dispatch planning.", Truck],
  ["Consistent Quality", "Controlled sizing, density, and moisture practices support predictable performance.", BadgeCheck],
];

const process: Array<[string, string, LucideIcon]> = [
  ["Source Wood Waste", "Sawmills, furniture units, and wood processors provide usable residues.", TreePine],
  ["Clean & Sort", "Material is screened to remove contaminants and maintain fuel-grade consistency.", ShieldCheck],
  ["Dry & Prepare", "Moisture is managed for efficient compression and cleaner combustion.", Zap],
  ["Compress Bricks", "Wood particles are densified into high-performance commercial biomass bricks.", Factory],
  ["Inspect Quality", "Finished bricks are checked for shape, density, strength, and usability.", PackageCheck],
  ["Deliver Supply", "Orders are packed and dispatched for hotels, bakeries, kitchens, and industries.", Truck],
];

const industries: Array<[string, string, LucideIcon]> = [
  ["Hotels", "Stable fuel supply for boilers, heating, and large-scale hospitality operations.", Hotel],
  ["Restaurants", "Cost-conscious fuel for commercial kitchens and traditional cooking setups.", Utensils],
  ["Bakeries", "Consistent heat for ovens and production schedules.", ChefHat],
  ["Industrial Kitchens", "Bulk-friendly biomass energy for continuous food operations.", Building2],
  ["Food Production", "Renewable process heat for commercial manufacturing facilities.", Factory],
  ["Commercial Businesses", "Cleaner fuel choice for businesses reducing conventional fuel dependency.", Sparkles],
];

const stats = [
  ["100%", "Wood Waste Reuse Focus"],
  ["High", "Thermal Efficiency"],
  ["Bulk", "Commercial Supply"],
  ["Lower", "Operating Fuel Cost"],
];

const testimonials = [
  {
    company: "Green Hearth Bakery",
    person: "Operations Manager",
    quote: "The fuel bricks burn consistently and help us control daily oven fuel costs without compromising output.",
  },
  {
    company: "Urban Plate Hospitality",
    person: "Procurement Lead",
    quote: "Hanuman Enterprises gives us dependable supply and a cleaner story to support our sustainability goals.",
  },
  {
    company: "Metro Industrial Kitchen",
    person: "Facility Supervisor",
    quote: "The product quality is steady, packing is practical, and dispatch coordination has been professional.",
  },
];

function sectionId(label: string) {
  return label.toLowerCase();
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <main className="overflow-hidden bg-[#fbfaf5] text-[#26302b]">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} onOrderClick={() => setOrderOpen(true)} />
      <Hero onOrderClick={() => setOrderOpen(true)} />
      <Story />
      <Benefits />
      <Process />
      <ProductShowcase />
      <Pricing onOrderClick={() => setOrderOpen(true)} />
      <Industries />
      <Sustainability />
      {orderOpen && <OrderModal onClose={() => setOrderOpen(false)} />}
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

function Header({
  menuOpen,
  setMenuOpen,
  onOrderClick,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOrderClick: () => void;
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/30 bg-[#fbfaf5]/88 shadow-sm backdrop-blur-xl">
      <nav className="section flex h-20 items-center justify-between">
        <a href="#home" className="flex items-center gap-3" aria-label="Hanuman Enterprises home">
          <span className="flex size-11 items-center justify-center rounded-md bg-[#2f6d43] text-white shadow-lg shadow-green-950/20">
            <Leaf className="size-6" />
          </span>
          <span>
            <span className="block text-lg font-black tracking-tight">Hanuman Enterprises</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-[#7a5a36]">Biomass Fuel Bricks</span>
          </span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${sectionId(item)}`}
              className="rounded-md px-3 py-2 text-sm font-bold text-[#3d463f] transition hover:bg-[#eaf3e8] hover:text-[#2f6d43]"
            >
              {item}
            </a>
          ))}
        </div>
        <button
          onClick={() => onOrderClick()}
          className="hidden rounded-md bg-[#2f6d43] px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-950/15 transition hover:-translate-y-0.5 hover:bg-[#245535] lg:inline-flex"
        >
          Order Now
        </button>
        <button
          className="inline-flex size-10 items-center justify-center rounded-md border border-[#d7d3c5] bg-white text-[#26302b] lg:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>
      {menuOpen ? (
        <div className="border-t border-[#e5e0d1] bg-[#fbfaf5] lg:hidden">
          <div className="section grid gap-2 py-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${sectionId(item)}`}
                className="rounded-md px-3 py-3 text-sm font-bold text-[#3d463f] hover:bg-[#eaf3e8]"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero({ onOrderClick }: { onOrderClick: () => void }) {
  return (
    <section id="home" className="relative min-h-[860px] pt-20 text-white md:min-h-[790px]">
      <img src={heroImage} alt="Biomass fuel brick production facility" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111813] via-[#26302b]/82 to-[#26302b]/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(119,84,44,0.22),transparent_34%)]" />
      <div className="section relative z-10 flex min-h-[760px] items-center py-16">
        <motion.div className="max-w-3xl" {...fadeUp}>
          <span className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
            <Recycle className="size-4 text-[#9ccf72]" /> Wood Waste to Renewable Energy
          </span>
          <h1 className="mt-6 text-balance text-4xl font-black leading-tight tracking-normal md:text-6xl">
            Eco-Friendly Biomass Fuel Bricks for Modern Commercial Businesses
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84">
            Hanuman Enterprises transforms discarded wood waste into reliable, high-heat biomass fuel bricks that help
            hotels, restaurants, bakeries, and industrial kitchens reduce fuel costs while supporting sustainable practices.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#8f6235] px-7 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#744d29]" href="#contact">
              Contact Us <ArrowRight className="size-4" />
            </a>
            <button
              onClick={onOrderClick}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-7 font-black text-white backdrop-blur transition hover:bg-white hover:text-[#26302b]"
            >
              Order Now
            </button>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map(([value, label]) => (
              <div key={label} className="rounded-lg border border-white/16 bg-white/10 p-4 backdrop-blur-md">
                <div className="text-2xl font-black text-[#b9df88]">{value}</div>
                <div className="mt-1 text-sm font-semibold text-white/76">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="soft-grid bg-[#f4f2e9] py-20 md:py-28">
      <div className="section grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div className="relative min-h-[440px] overflow-hidden rounded-lg shadow-2xl shadow-[#1b261d]/14" {...fadeUp}>
          <img src={productImage} alt="Stacked biomass fuel bricks made from recycled wood waste" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-x-5 bottom-5 rounded-lg bg-white/86 p-5 shadow-xl backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2f6d43]">Circular Manufacturing</p>
            <p className="mt-2 text-xl font-black">Collected wood residues become dense, clean-burning fuel bricks.</p>
          </div>
        </motion.div>
        <motion.div {...fadeUp}>
          <SectionLabel>Our Story</SectionLabel>
          <h2 className="mt-4 text-balance text-3xl font-black tracking-normal md:text-5xl">
            Turning Industrial Wood Waste into Practical Renewable Fuel
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#5f665f]">
            We collect discarded wood waste from sawmills, furniture manufacturers, and wood-processing industries, then
            convert it through responsible sorting, drying, and compression methods into dependable biomass fuel bricks
            for commercial heat applications.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Collect", "Usable wood residues from local industry."],
              ["Process", "Clean, dry, and compress for consistency."],
              ["Supply", "Fuel bricks delivered for business use."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg border border-[#ded8c8] bg-white p-5 shadow-sm">
                <Leaf className="mb-4 size-6 text-[#2f6d43]" />
                <h3 className="font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#66685e]">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section id="benefits" className="bg-[#fbfaf5] py-20 md:py-28">
      <SectionHeading label="Key Benefits" title="Built for Cost Control, Heat Performance, and Sustainability" />
      <div className="section mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map(([title, text, Icon], index) => (
          <motion.div
            key={title}
            className="group rounded-lg border border-[#e3ddce] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#2f6d43]/35 hover:shadow-2xl hover:shadow-green-950/8"
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: index * 0.04 }}
          >
            <span className="flex size-12 items-center justify-center rounded-md bg-[#eaf3e8] text-[#2f6d43] transition group-hover:bg-[#2f6d43] group-hover:text-white">
              <Icon className="size-6" />
            </span>
            <h3 className="mt-6 text-xl font-black">{title}</h3>
            <p className="mt-3 leading-7 text-[#60665f]">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="bg-[#26302b] py-20 text-white md:py-28">
      <SectionHeading label="Manufacturing Process" title="From Waste Collection to Finished Fuel Brick Delivery" dark />
      <div className="section mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {process.map(([title, text, Icon], index) => (
          <motion.div key={title} className="relative rounded-lg border border-white/10 bg-white/6 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10" {...fadeUp}>
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black text-white/12">{String(index + 1).padStart(2, "0")}</span>
              <span className="flex size-12 items-center justify-center rounded-md bg-[#8f6235] text-white">
                <Icon className="size-6" />
              </span>
            </div>
            <h3 className="mt-7 text-xl font-black">{title}</h3>
            <p className="mt-3 leading-7 text-white/68">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProductShowcase() {
  return (
    <section id="products" className="soft-grid bg-[#f4f2e9] py-20 md:py-28">
      <div className="section grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <motion.div {...fadeUp}>
          <SectionLabel>Product Showcase</SectionLabel>
          <h2 className="mt-4 text-balance text-3xl font-black tracking-normal md:text-5xl">
            Premium Biomass Fuel Bricks for Commercial Heat Applications
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#5f665f]">
            Designed for businesses that need dependable heat, practical handling, and a more responsible fuel choice.
            Our biomass bricks are made from compressed wood waste and supplied for regular commercial consumption.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ["Material", "Recycled wood waste and sawdust"],
              ["Form", "Dense rectangular fuel bricks"],
              ["Use Cases", "Boilers, ovens, kitchens, heating"],
              ["Advantages", "High heat, long burn, lower waste"],
            ].map(([key, value]) => (
              <div key={key} className="rounded-lg bg-white p-5 shadow-sm">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-[#8f6235]">{key}</p>
                <p className="mt-2 font-bold text-[#26302b]">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div className="relative min-h-[500px] overflow-hidden rounded-lg shadow-2xl shadow-[#1b261d]/14" {...fadeUp}>
          <img src={productImage} alt="Biomass fuel brick product showcase" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111813]/72 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/22 bg-white/14 p-5 text-white backdrop-blur">
            <p className="text-sm font-bold text-[#b9df88]">Commercial Grade Fuel</p>
            <p className="mt-2 text-2xl font-black">Reliable bricks for daily business operations.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section id="industries" className="bg-[#fbfaf5] py-20 md:py-28">
      <SectionHeading label="Industries We Serve" title="Renewable Fuel for High-Usage Commercial Environments" />
      <div className="section mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {industries.map(([title, text, Icon], index) => (
          <motion.div key={title} className="rounded-lg border border-[#e3ddce] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1b261d]/8" {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.04 }}>
            <Icon className="size-9 text-[#8f6235]" />
            <h3 className="mt-5 text-xl font-black">{title}</h3>
            <p className="mt-3 leading-7 text-[#60665f]">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Sustainability() {
  return (
    <section className="relative py-20 text-white md:py-28">
      <img src={heroImage} alt="Wood waste recycling for biomass fuel" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[#17211b]/86" />
      <div className="section relative z-10 grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div {...fadeUp}>
          <SectionLabel light>Sustainability Impact</SectionLabel>
          <h2 className="mt-4 text-balance text-3xl font-black md:text-5xl">
            Cleaner Energy Choices Start with Smarter Waste Use
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/72">
            By transforming usable wood residues into biomass fuel bricks, Hanuman Enterprises helps commercial buyers
            support a circular economy while reducing dependency on conventional fuels.
          </p>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Waste Diverted", "Wood residues gain a productive second life."],
            ["Renewable Source", "Fuel made from plant-based material streams."],
            ["Cleaner Operations", "Supports businesses moving toward greener procurement."],
            ["Local Value", "Creates usefulness from industrial byproducts."],
          ].map(([title, text]) => (
            <motion.div key={title} className="rounded-lg border border-white/12 bg-white/8 p-6 backdrop-blur" {...fadeUp}>
              <Leaf className="mb-5 size-8 text-[#b9df88]" />
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-white/68">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-[#f4f2e9] py-20 md:py-28">
      <SectionHeading label="Client Confidence" title="Trusted by Businesses That Need Reliable Fuel Supply" />
      <div className="section mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.div key={item.company} className="rounded-lg bg-white p-6 shadow-lg shadow-[#1b261d]/6" {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.05 }}>
            <div className="flex gap-1 text-[#c28a45]">
              {Array.from({ length: 5 }).map((_, star) => (
                <Star key={star} className="size-4 fill-current" />
              ))}
            </div>
            <p className="mt-5 leading-7 text-[#4f584f]">"{item.quote}"</p>
            <div className="mt-6 border-t border-[#eee7d8] pt-5">
              <p className="font-black">{item.company}</p>
              <p className="mt-1 text-sm font-semibold text-[#7a5a36]">{item.person}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    quantity: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setErrorMsg("");

  if (!form.name.trim()) {
    setErrorMsg("Name is required.");
    return;
  }
  if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim())) {
    setErrorMsg("Enter a valid 10-digit Indian mobile number.");
    return;
  }

  setStatus("loading");

  try {
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, type: "inquiry" }),
    });

    if (!res.ok) throw new Error("Failed");
    setStatus("success");
    setForm({ name: "", company: "", phone: "", email: "", quantity: "", message: "" });
  } catch {
    setStatus("error");
    setErrorMsg("Something went wrong. Please call or WhatsApp us directly.");
  }
}

  return (
    <section id="contact" className="bg-[#fbfaf5] py-20 md:py-28">
      <div className="section grid gap-10">
        <motion.div {...fadeUp}>
          <SectionLabel>Contact Hanuman Enterprises</SectionLabel>
          <h2 className="mt-4 text-3xl font-black tracking-normal md:text-5xl">
            Order Biomass Fuel Bricks for Your Business
          </h2>

          {status === "success" ? (
            <div className="mt-8 rounded-lg border border-[#2f6d43]/30 bg-[#eaf3e8] p-6">
              <div className="flex gap-3">
                <Leaf className="size-6 shrink-0 text-[#2f6d43]" />
                <div>
                  <h3 className="font-black text-[#2f6d43]">Inquiry Received!</h3>
                  <p className="mt-2 text-sm leading-6 text-[#5f665f]">
                    We'll contact you within 24 hours. For urgent orders, call{" "}
                    <a href="tel:+918187869698" className="font-bold text-[#2f6d43] underline">
                      +91 81878 69698
                    </a>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="mt-5 rounded-md bg-[#2f6d43] px-6 py-2 text-sm font-black text-white hover:bg-[#245535]"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="h-12 rounded-md border border-[#ded8c8] bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15"
              />
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company Name"
                className="h-12 rounded-md border border-[#ded8c8] bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15"
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="h-12 rounded-md border border-[#ded8c8] bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="h-12 rounded-md border border-[#ded8c8] bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15"
              />
              <input
                type="text"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Monthly Fuel Requirement (kg)"
                className="h-12 rounded-md border border-[#ded8c8] bg-white px-4 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15 md:col-span-2"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your use case"
                className="min-h-32 rounded-md border border-[#ded8c8] bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15 md:col-span-2"
              />

              {errorMsg && (
                <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm font-semibold text-red-700 md:col-span-2">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#2f6d43] px-7 font-black text-white transition hover:-translate-y-0.5 hover:bg-[#245535] disabled:opacity-50 md:col-span-2"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Inquiry <Send className="size-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        <motion.div className="rounded-lg bg-[#26302b] p-7 text-white shadow-2xl shadow-[#1b261d]/14 md:p-8" {...fadeUp}>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#b9df88]">Company Details</p>
              <h3 className="mt-3 text-2xl font-black">Business Information</h3>
            </div>
            <a
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#8f6235] px-5 font-black text-white transition hover:bg-[#744d29]"
              href="tel:+918187869698"
            >
              Call Sales Team <Phone className="size-4" />
            </a>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Info icon={Phone} label="Cell" value="+91 81878 69698 / +91 89784 61866" />
            <Info icon={Mail} label="Email" value="hanumanentp23@gmail.com" />
            <Info icon={MapPin} label="Address" value="Kondakarla Village, Atchutapuram Mandal, Anakapalli District - 531033" />
            <Info icon={BadgeCheck} label="GST" value="37CJTPJ8744A1ZU" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#111813] pt-14 text-white">
      <div className="section grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.9fr_0.9fr_0.9fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-md bg-[#2f6d43]">
              <Leaf className="size-5" />
            </span>
            <div>
              <p className="font-black">Hanuman Enterprises</p>
              <p className="text-sm text-white/58">Eco-friendly biomass fuel bricks.</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/62">
            Hanuman Enterprises transforms wood waste into dependable biomass fuel bricks for hotels, restaurants,
            bakeries, industrial kitchens, and commercial businesses.
          </p>
        </div>

        <div>
          <h3 className="font-black">Company Details</h3>
          <ul className="mt-5 grid gap-3 text-sm text-white/64">
            <li>GST: 37CJTPJ8744A1ZU</li>
            <li>Manufacturer and supplier of biomass fuel bricks</li>
            <li>Serving commercial and industrial fuel users</li>
            <li>Focused on wood waste recycling and renewable energy</li>
          </ul>
        </div>

        <div>
          <h3 className="font-black">Products & Uses</h3>
          <ul className="mt-5 grid gap-3 text-sm text-white/64">
            <li>Compressed biomass fuel bricks</li>
            <li>Commercial kitchen and bakery fuel</li>
            <li>Boiler, oven, and process heat applications</li>
          </ul>
        </div>

        <div>
          <h3 className="font-black">Contact</h3>
          <ul className="mt-5 grid gap-3 text-sm text-white/64">
            <li>Cell: +91 81878 69698</li>
            <li>Cell: +91 89784 61866</li>
            <li>Email: hanumanentp23@gmail.com</li>
            <li>Kondakarla Village, Atchutapuram Mandal</li>
            <li>Anakapalli District - 531033</li>
            <li>Supply: Bulk commercial orders</li>
          </ul>
        </div>
      </div>
      <div className="section flex flex-col gap-4 py-6 text-sm text-white/58 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-white/58">(c) 2026 Hanuman Enterprises. All Rights Reserved.</p>
        <div className="flex gap-4">
          <a href="#home" className="transition hover:text-[#b9df88]">Home</a>
          <a href="#products" className="transition hover:text-[#b9df88]">Products</a>
          <a href="#contact" className="transition hover:text-[#b9df88]">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({ label, title, dark = false }: { label: string; title: string; dark?: boolean }) {
  return (
    <motion.div className="section text-center" {...fadeUp}>
      <SectionLabel light={dark}>{label}</SectionLabel>
      <h2 className={`mx-auto mt-4 max-w-3xl text-balance text-3xl font-black tracking-normal md:text-5xl ${dark ? "text-white" : "text-[#26302b]"}`}>
        {title}
      </h2>
    </motion.div>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-sm font-black uppercase tracking-[0.18em] ${light ? "text-[#b9df88]" : "text-[#2f6d43]"}`}>
      {children}
    </p>
  );
}

function Info({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-white/10 text-[#b9df88]">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-sm font-bold text-white/55">{label}</p>
        <p className="mt-1 font-semibold">{value}</p>
      </div>
    </div>
  );
}

function Pricing({ onOrderClick }: { onOrderClick: () => void }) {
  const tiers = [
    {
      qty: "100 – 500 kg",
      price: "₹12",
      per: "per kg",
      total: "₹1,200 – ₹6,000",
      tag: "Trial Order",
      tagColor: "bg-[#eaf3e8] text-[#2f6d43]",
      highlight: false,
    },
    {
      qty: "500 – 1,000 kg",
      price: "₹11",
      per: "per kg",
      total: "₹5,500 – ₹11,000",
      tag: "Most Popular",
      tagColor: "bg-[#D4A017] text-white",
      highlight: true,
    },
    {
      qty: "1,000 – 5,000 kg",
      price: "₹10",
      per: "per kg",
      total: "₹10,000 – ₹50,000",
      tag: "Bulk Saver",
      tagColor: "bg-[#eaf3e8] text-[#2f6d43]",
      highlight: false,
    },
    {
      qty: "5,000+ kg",
      price: "Custom",
      per: "negotiated rate",
      total: "Best price guaranteed",
      tag: "Enterprise",
      tagColor: "bg-[#26302b] text-white",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="bg-[#f4f2e9] py-20 md:py-28">
      <SectionHeading
        label="Transparent Pricing"
        title="Bulk Pricing for Commercial Buyers"
      />
      <p className="section mt-4 text-center text-[#5f665f]">
        All prices are ex-factory, Kondakarla Village, Anakapalli. GST @5% (HSN 4401) extra.
        Delivery charges applicable based on location.
      </p>

      <div className="section mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier) => (
          <motion.div
            key={tier.qty}
            className={`relative rounded-xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
              tier.highlight
                ? "border-[#D4A017] bg-[#26302b] text-white shadow-lg"
                : "border-[#e3ddce] bg-white"
            }`}
            {...fadeUp}
          >
            {/* Tag */}
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-black ${tier.tagColor}`}>
              {tier.tag}
            </span>

            {/* Price */}
            <div className="mt-5">
              <span className={`text-5xl font-black ${tier.highlight ? "text-[#D4A017]" : "text-[#26302b]"}`}>
                {tier.price}
              </span>
              {tier.price !== "Custom" && (
                <span className={`ml-1 text-sm font-bold ${tier.highlight ? "text-white/70" : "text-[#60665f]"}`}>
                  {tier.per}
                </span>
              )}
            </div>

            {/* Quantity */}
            <p className={`mt-3 text-sm font-black uppercase tracking-widest ${tier.highlight ? "text-white/60" : "text-[#7a5a36]"}`}>
              {tier.qty}
            </p>

            {/* Total */}
            <p className={`mt-2 text-sm font-semibold ${tier.highlight ? "text-white/80" : "text-[#5f665f]"}`}>
              Est. total: {tier.total}
            </p>

            <div className={`my-5 border-t ${tier.highlight ? "border-white/15" : "border-[#ede8db]"}`} />

            {/* Features */}
            {[
              "Wood waste biomass bricks",
              "Consistent heat output",
              "Bulk packaging included",
              tier.qty === "5,000+ kg" ? "Dedicated account manager" : "Standard delivery",
            ].map((f) => (
              <div key={f} className="flex items-center gap-2 mb-2">
                <span className={`text-sm font-bold ${tier.highlight ? "text-[#b9df88]" : "text-[#2f6d43]"}`}>✓</span>
                <span className={`text-sm ${tier.highlight ? "text-white/80" : "text-[#5f665f]"}`}>{f}</span>
              </div>
            ))}

            <button
              onClick={onOrderClick}
              className={`mt-5 w-full rounded-lg py-3 text-sm font-black transition hover:-translate-y-0.5 ${
                tier.highlight
                  ? "bg-[#D4A017] text-white hover:bg-[#b8880f]"
                  : "bg-[#2f6d43] text-white hover:bg-[#245535]"
              }`}
            >
              {tier.price === "Custom" ? "Get Custom Quote" : "Order Now"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="section mt-8 rounded-xl border border-[#e3ddce] bg-white p-5 text-center">
        <p className="text-sm text-[#60665f]">
          <span className="font-black text-[#2f6d43]">Note: </span>
          Prices are indicative and subject to change based on raw material availability and transport distance.
          Final pricing confirmed upon order placement. Minimum order: 100 kg.
        </p>
      </div>
    </section>
  );
}


function OrderModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    customer_type: "",
    quantity: "",
    delivery_location: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name.trim()) { setErrorMsg("Name is required."); return; }
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim())) {
      setErrorMsg("Enter a valid 10-digit Indian mobile number."); return;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setErrorMsg("Valid email is required — we'll send your confirmation here."); return;
    }
    if (!form.customer_type) { setErrorMsg("Please select your business type."); return; }
    if (!form.quantity.trim()) { setErrorMsg("Please enter your required quantity."); return; }

    setStatus("loading");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "order" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please call us directly at +91 81878 69698.");
    }
  }

  // Close on backdrop click
  function handleBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={handleBackdrop}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl bg-[#2f6d43] px-6 py-5">
          <div>
            <h2 className="text-xl font-black text-white">Place Your Order</h2>
            <p className="mt-0.5 text-sm text-[#b9df88]">
              Fill details — our team contacts you within 24 hours
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
          >
            <X className="size-5" />
          </button>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center p-10 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-[#eaf3e8]">
              <BadgeCheck className="size-8 text-[#2f6d43]" />
            </div>
            <h3 className="mt-5 text-2xl font-black text-[#26302b]">Order Request Received!</h3>
            <p className="mt-3 leading-7 text-[#5f665f]">
              Thank you for your order. We've sent a confirmation to{" "}
              <span className="font-black text-[#2f6d43]">{form.email}</span>.
              Our team will contact you within <strong>24 hours</strong> to confirm
              pricing, delivery, and payment details.
            </p>
            <div className="mt-6 w-full rounded-xl bg-[#f4f2e9] p-4 text-left">
              <p className="text-xs font-black uppercase tracking-widest text-[#7a5a36]">
                For urgent orders
              </p>
              <a
                href="tel:+918187869698"
                className="mt-2 flex items-center gap-2 font-black text-[#2f6d43]"
              >
                <Phone className="size-4" /> +91 81878 69698
              </a>
              <a
                href="tel:+918978461866"
                className="mt-1 flex items-center gap-2 font-black text-[#2f6d43]"
              >
                <Phone className="size-4" /> +91 89784 61866
              </a>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full rounded-xl bg-[#2f6d43] py-3 font-black text-white hover:bg-[#245535]"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 p-6">

            {/* Name */}
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-[#7a5a36]">
                Full Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="h-12 w-full rounded-lg border border-[#ded8c8] bg-[#fbfaf5] px-4 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-[#7a5a36]">
                Phone Number * (10 digits)
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                maxLength={10}
                placeholder="9XXXXXXXXX"
                className="h-12 w-full rounded-lg border border-[#ded8c8] bg-[#fbfaf5] px-4 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-[#7a5a36]">
                Email Address * (confirmation sent here)
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="you@company.com"
                className="h-12 w-full rounded-lg border border-[#ded8c8] bg-[#fbfaf5] px-4 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15"
              />
            </div>

            {/* Company */}
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-[#7a5a36]">
                Business / Company Name
              </label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Hotel name, bakery name, etc."
                className="h-12 w-full rounded-lg border border-[#ded8c8] bg-[#fbfaf5] px-4 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15"
              />
            </div>

            {/* Business Type */}
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-[#7a5a36]">
                Business Type *
              </label>
              <select
                name="customer_type"
                value={form.customer_type}
                onChange={handleChange}
                className="h-12 w-full rounded-lg border border-[#ded8c8] bg-[#fbfaf5] px-4 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15"
              >
                <option value="">Select your business type</option>
                <option value="hotel">Hotel / Resort</option>
                <option value="restaurant">Restaurant / Cafe</option>
                <option value="bakery">Bakery / Food Processing</option>
                <option value="industrial">Industrial Kitchen</option>
                <option value="other">Other Commercial Business</option>
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-[#7a5a36]">
                Required Quantity (kg) *
              </label>
              <input
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                type="number"
                min="100"
                placeholder="Minimum 100 kg"
                className="h-12 w-full rounded-lg border border-[#ded8c8] bg-[#fbfaf5] px-4 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15"
              />
              {/* Price estimate */}
              {form.quantity && parseInt(form.quantity) >= 100 && (
                <p className="mt-1.5 text-xs font-bold text-[#2f6d43]">
                  Estimated:{" "}
                  {parseInt(form.quantity) >= 5000
                    ? "Custom pricing — our team will contact you"
                    : `₹${(
                        parseInt(form.quantity) *
                        (parseInt(form.quantity) >= 1000 ? 10 : parseInt(form.quantity) >= 500 ? 11 : 12)
                      ).toLocaleString("en-IN")} (excl. GST & delivery)`}
                </p>
              )}
            </div>

            {/* Delivery Location */}
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-[#7a5a36]">
                Delivery Location
              </label>
              <input
                name="delivery_location"
                value={form.delivery_location}
                onChange={handleChange}
                placeholder="City, District, State"
                className="h-12 w-full rounded-lg border border-[#ded8c8] bg-[#fbfaf5] px-4 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15"
              />
            </div>

            {/* Message */}
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-widest text-[#7a5a36]">
                Additional Requirements
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={3}
                placeholder="Frequency of orders, special packaging, any other requirements..."
                className="w-full rounded-lg border border-[#ded8c8] bg-[#fbfaf5] px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#2f6d43] focus:ring-2 focus:ring-[#2f6d43]/15"
              />
            </div>

            {errorMsg && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {errorMsg}
              </div>
            )}

            {/* Info box */}
            <div className="rounded-lg bg-[#eaf3e8] p-4">
              <p className="text-xs font-black uppercase tracking-widest text-[#2f6d43]">
                What happens next?
              </p>
              <ul className="mt-2 space-y-1">
                {[
                  "You receive a confirmation email immediately",
                  "Our team calls you within 24 hours",
                  "Pricing, delivery & payment confirmed",
                  "Order dispatched from Anakapalli",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-2 text-xs text-[#5f665f]">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#2f6d43] text-[10px] font-black text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#2f6d43] py-4 font-black text-white transition hover:bg-[#245535] disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Placing Order...
                </>
              ) : (
                <>Place Order Request <ArrowRight className="size-4" /></>
              )}
            </button>

            <p className="text-center text-xs text-[#9a9e97]">
              No payment required now. Our team confirms everything before dispatch.
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
}
export default App;
