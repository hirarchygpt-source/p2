"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Filter, Plus } from "lucide-react";
import ConsoleShell from "../_components/ConsoleShell";
import { Badge, Card, Input, Select } from "../_components/ui";

const BOOKS = [
  { isbn: "3234", title: "Magnolia Palace", author: "Fiona Davis", category: "Fiction", copies: 4, available: 2, shelf: "F-12" },
  { isbn: "1188", title: "Don Quixote", author: "Miguel de Cervantes", category: "Fiction", copies: 2, available: 0, shelf: "F-07" },
  { isbn: "0031", title: "Pride and Prejudice", author: "Jane Austen", category: "Fiction", copies: 3, available: 1, shelf: "F-03" },
  { isbn: "7711", title: "The Silent Patient", author: "Alex Michaelides", category: "Fiction", copies: 2, available: 1, shelf: "F-21" },
];

export default function Page() {
  const [category, setCategory] = React.useState("All");
  const [q, setQ] = React.useState("");

  const filtered = BOOKS.filter((b) => {
    const matchesCategory = category === "All" || b.category === category;
    const matchesQ =
      !q ||
      [b.isbn, b.title, b.author, b.shelf].join(" ").toLowerCase().includes(q.toLowerCase());
    return matchesCategory && matchesQ;
  });

  return (
    <ConsoleShell
      title="Inventory"
      subtitle="Browse catalog, availability, and shelf locations."
      rightActions={
        <>
          <button className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
            <Filter className="h-4 w-4 text-slate-500" />
            Filters
          </button>
          <Link
            href="/add-books"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            Add Book
          </Link>
        </>
      }
    >
      <Card
        title="Catalog"
        right={<Badge text={`${filtered.length} items`} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ISBN, title, author, shelf..." />
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>All</option>
            <option>Fiction</option>
            <option>Non-Fiction</option>
            <option>Children</option>
            <option>History</option>
            <option>Science</option>
            <option>Others</option>
          </Select>
          <div className="rounded-2xl border bg-slate-50 px-3 py-2 text-sm text-slate-700">
            Availability is mock for now.
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500">
                <th className="text-left font-medium py-2">Book</th>
                <th className="text-left font-medium py-2">Category</th>
                <th className="text-left font-medium py-2">Copies</th>
                <th className="text-left font-medium py-2">Available</th>
                <th className="text-left font-medium py-2">Shelf</th>
                <th className="text-left font-medium py-2" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((b) => (
                <tr key={b.isbn} className="text-slate-700">
                  <td className="py-2">
                    <div className="font-medium text-slate-900">{b.title}</div>
                    <div className="text-xs text-slate-500">
                      ISBN {b.isbn} • {b.author}
                    </div>
                  </td>
                  <td className="py-2">{b.category}</td>
                  <td className="py-2">{b.copies}</td>
                  <td className="py-2">
                    <span className={b.available > 0 ? "text-emerald-700" : "text-rose-700"}>
                      {b.available}
                    </span>
                  </td>
                  <td className="py-2">
                    <Badge text={b.shelf} />
                  </td>
                  <td className="py-2">
                    <Link href="#" className="text-xs text-slate-600 hover:text-slate-800 inline-flex items-center gap-1">
                      View <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </ConsoleShell>
  );
}
