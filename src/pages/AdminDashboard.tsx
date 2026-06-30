import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  BadgeCheck, Download, Leaf, LogOut,
  Phone, Mail, Building2, Package,
  RefreshCw, Users, TrendingUp, Clock
} from "lucide-react";

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  quantity_kg: number | null;
  message: string | null;
  status: "new" | "contacted" | "converted" | "lost";
  source: string;
  created_at: string;
};

type Order = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  quantity_kg: number | null;
  customer_type: string | null;
  delivery_location: string | null;
  message: string | null;
  source: string | null;
  created_at: string;
};

const STATUS_COLORS: Record<Lead["status"], string> = {
  new:       "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  converted: "bg-green-100 text-green-700",
  lost:      "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | Lead["status"]>("all");
  const [updating, setUpdating] = useState<string | null>(null);

  // Auth guard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/admin");
    });
  }, [navigate]);

  // Fetch leads
  async function fetchLeads() {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setLeads(data as Lead[]);
  }

  // Fetch orders
  async function fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setOrders(data as Order[]);
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchLeads(), fetchOrders()]);
      setLoading(false);
    };

    loadData();

    const channel = supabase
      .channel("dashboard-orders")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          setOrders((prev) => [payload.new as Order, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Update status
  async function updateStatus(id: string, status: Lead["status"]) {
    setUpdating(id);
    await supabase.from("leads").update({ status }).eq("id", id);
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    setUpdating(null);
  }

  // Logout
  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin");
  }

  // Export CSV
  function exportCSV() {
    const headers = ["Name","Phone","Email","Company","Quantity(kg)","Message","Status","Date"];
    const rows = leads.map((l) => [
      l.name, l.phone, l.email ?? "",
      l.company ?? "", l.quantity_kg ?? "",
      (l.message ?? "").replace(/,/g, " "),
      l.status,
      new Date(l.created_at).toLocaleDateString("en-IN"),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hanuman-leads-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  // Stats
  const stats = {
    total:     leads.length,
    new:       leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  return (
    <div className="min-h-screen bg-[#f4f2e9]">

      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-[#e3ddce] bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md bg-[#2f6d43] text-white">
              <Leaf className="size-5" />
            </span>
            <div>
              <p className="font-black text-[#26302b]">Hanuman Enterprises</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#7a5a36]">Leads & Orders Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              className="inline-flex items-center gap-2 rounded-md border border-[#ded8c8] bg-white px-4 py-2 text-sm font-bold text-[#26302b] transition hover:bg-[#eaf3e8]"
            >
              <RefreshCw className="size-4" /> Refresh
            </button>
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 rounded-md bg-[#8f6235] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#744d29]"
            >
              <Download className="size-4" /> Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-md bg-[#26302b] px-4 py-2 text-sm font-bold text-white transition hover:bg-black"
            >
              <LogOut className="size-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Leads",  value: stats.total,     icon: Users,       color: "bg-[#26302b] text-white" },
            { label: "New",          value: stats.new,        icon: Clock,       color: "bg-blue-600 text-white" },
            { label: "Orders",       value: orders.length,    icon: Package,     color: "bg-[#8f6235] text-white" },
            { label: "Converted",    value: stats.converted,  icon: TrendingUp,  color: "bg-[#2f6d43] text-white" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-[#60665f]">{s.label}</p>
                <span className={`flex size-9 items-center justify-center rounded-md ${s.color}`}>
                  <s.icon className="size-4" />
                </span>
              </div>
              <p className="mt-3 text-4xl font-black text-[#26302b]">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {(["all","new","contacted","converted","lost"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-4 py-2 text-sm font-black capitalize transition ${
                filter === f
                  ? "bg-[#2f6d43] text-white"
                  : "border border-[#ded8c8] bg-white text-[#26302b] hover:bg-[#eaf3e8]"
              }`}
            >
              {f === "all" ? `All (${leads.length})` : `${f} (${leads.filter(l => l.status === f).length})`}
            </button>
          ))}
        </div>

        {/* Leads table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-[#e3ddce] bg-white shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-[#60665f]">
              <RefreshCw className="mr-2 size-5 animate-spin" /> Loading leads...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-[#60665f]">
              <Users className="mx-auto mb-3 size-10 opacity-30" />
              <p className="font-bold">No leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[#e3ddce] bg-[#f4f2e9]">
                  <tr>
                    {["Contact","Company","Phone / Email","Quantity","Message","Status","Date","Action"].map((h) => (
                      <th key={h} className="px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-[#60665f]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ece0]">
                  {filtered.map((lead) => (
                    <tr key={lead.id} className="transition hover:bg-[#fbfaf5]">
                      {/* Name */}
                      <td className="px-5 py-4">
                        <p className="font-black text-[#26302b]">{lead.name}</p>
                        {lead.source && (
                          <p className="mt-0.5 text-xs text-[#9a9e97]">{lead.source}</p>
                        )}
                      </td>

                      {/* Company */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-[#5f665f]">
                          <Building2 className="size-3.5 shrink-0 opacity-50" />
                          {lead.company ?? <span className="text-[#c0bdb5]">—</span>}
                        </div>
                      </td>

                      {/* Phone / Email */}
                      <td className="px-5 py-4">
                        <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 font-semibold text-[#2f6d43] hover:underline">
                          <Phone className="size-3.5" /> {lead.phone}
                        </a>
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="mt-1 flex items-center gap-1.5 text-xs text-[#60665f] hover:underline">
                            <Mail className="size-3" /> {lead.email}
                          </a>
                        )}
                      </td>

                      {/* Quantity */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5 text-[#5f665f]">
                          <Package className="size-3.5 opacity-50" />
                          {lead.quantity_kg ? `${lead.quantity_kg} kg` : <span className="text-[#c0bdb5]">—</span>}
                        </div>
                      </td>

                      {/* Message */}
                      <td className="max-w-[200px] px-5 py-4">
                        <p className="truncate text-[#5f665f]" title={lead.message ?? ""}>
                          {lead.message ?? <span className="text-[#c0bdb5]">—</span>}
                        </p>
                      </td>

                      {/* Status badge */}
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-black capitalize ${STATUS_COLORS[lead.status]}`}>
                          {lead.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-xs text-[#9a9e97]">
                        {new Date(lead.created_at).toLocaleDateString("en-IN", {
                          day: "2-digit", month: "short", year: "numeric"
                        })}
                        <br />
                        {new Date(lead.created_at).toLocaleTimeString("en-IN", {
                          hour: "2-digit", minute: "2-digit"
                        })}
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4">
                        <select
                          value={lead.status}
                          disabled={updating === lead.id}
                          onChange={(e) => updateStatus(lead.id, e.target.value as Lead["status"])}
                          className="rounded-md border border-[#ded8c8] bg-white px-3 py-2 text-xs font-bold text-[#26302b] outline-none transition focus:border-[#2f6d43] disabled:opacity-50"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="lost">Lost</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-8 rounded-xl border border-[#e3ddce] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-[#2f6d43]">Recent Orders</p>
              <h3 className="mt-1 text-xl font-black text-[#26302b]">Order Now form submissions</h3>
            </div>
            <span className="rounded-full bg-[#eaf3e8] px-3 py-1 text-xs font-black text-[#2f6d43]">
              {orders.length} total
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="mt-6 rounded-lg border border-dashed border-[#ded8c8] bg-[#fbfaf5] py-10 text-center text-[#60665f]">
              No orders yet.
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-[#e3ddce] bg-[#f4f2e9]">
                  <tr>
                    {['Customer','Company','Phone / Email','Quantity','Delivery','Business Type','Date'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-[#60665f]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0ece0]">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#fbfaf5]">
                      <td className="px-4 py-3">
                        <p className="font-black text-[#26302b]">{order.name}</p>
                        {order.source && <p className="mt-0.5 text-xs text-[#9a9e97]">{order.source}</p>}
                      </td>
                      <td className="px-4 py-3 text-[#5f665f]">{order.company ?? '—'}</td>
                      <td className="px-4 py-3">
                        <a href={`tel:${order.phone}`} className="font-semibold text-[#2f6d43] hover:underline">{order.phone}</a>
                        {order.email && (
                          <a href={`mailto:${order.email}`} className="mt-1 block text-xs text-[#60665f] hover:underline">
                            {order.email}
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-3 text-[#5f665f]">{order.quantity_kg ? `${order.quantity_kg} kg` : '—'}</td>
                      <td className="px-4 py-3 text-[#5f665f]">{order.delivery_location ?? '—'}</td>
                      <td className="px-4 py-3 text-[#5f665f]">{order.customer_type ?? '—'}</td>
                      <td className="px-4 py-3 text-xs text-[#9a9e97]">
                        {new Date(order.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-4 text-xs text-[#9a9e97]">
          <BadgeCheck className="mr-1 inline size-3" />
          Showing {filtered.length} of {leads.length} leads · {orders.length} orders · Secured with Supabase RLS
        </p>
      </main>
    </div>
  );
}