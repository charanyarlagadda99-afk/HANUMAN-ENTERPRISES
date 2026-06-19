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

  return (
    <main className="overflow-hidden bg-[#fbfaf5] text-[#26302b]">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Story />
      <Benefits />
      <Process />
      <ProductShowcase />
      <Industries />
      <Sustainability />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

function Header({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
        <a
          href="#contact"
          className="hidden rounded-md bg-[#2f6d43] px-5 py-3 text-sm font-black text-white shadow-lg shadow-green-950/15 transition hover:-translate-y-0.5 hover:bg-[#245535] lg:inline-flex"
        >
          Order Now
        </a>
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

function Hero() {
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
            <a className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-7 font-black text-white backdrop-blur transition hover:bg-white hover:text-[#26302b]" href="#products">
              Order Now
            </a>
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

    // Client-side validation
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
      const { error } = await supabase.from("leads").insert([
        {
          name: form.name.trim(),
          company: form.company.trim() || null,
          phone: form.phone.trim(),
          email: form.email.trim() || null,
          quantity_kg: form.quantity ? parseInt(form.quantity) : null,
          message: form.message.trim() || null,
          source: "website_form",
        },
      ]);

      if (error) throw error;

      setStatus("success");
      setForm({ name: "", company: "", phone: "", email: "", quantity: "", message: "" });
    } catch (err: unknown) {
      console.error(err);
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

export default App;
