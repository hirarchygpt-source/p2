"use client";

import React from "react";
import { CheckCircle2, ClipboardCheck, RotateCcw, Search } from "lucide-react";
import ConsoleShell from "../_components/ConsoleShell";
import { Badge, Card, Input, PrimaryButton, SecondaryButton, Select } from "../_components/ui";

const RECENT_TXNS = [
  { id: "#48964", isbn: "3234", title: "Magnolia Palace", member: "Ali", issued: "2025-12-27", returned: "—", method: "Desk" },
  { id: "#84011", isbn: "8842", title: "Alice’s Adventures in Wonder...", member: "Cristofer Bator", issued: "2025-12-26", returned: "2025-12-27", method: "Desk" },
  { id: "#51002", isbn: "9012", title: "Treasure Island", member: "Tatiana Arcand", issued: "2025-12-25", returned: "2025-12-26", method: "Kiosk" },
];

import { useConsole } from "../_components/ConsoleContext";

export default function Page() {
  const [mode, setMode] = React.useState<"Issue" | "Return">("Issue");
  const [form, setForm] = React.useState({
    memberId: "",
    isbn: "",
    method: "Desk",
    dueDays: "14",
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    alert(`${mode} done (mock): ${JSON.stringify(form, null, 2)}`);
  }

  return (
    <ConsoleShell
      title="Check-out Books"
      subtitle="Issue and return books quickly (mock)."
      rightActions={
        <div className="inline-flex rounded-2xl border bg-slate-50 p-1">
          <button
            className={mode === "Issue" ? "px-3 py-1 text-xs rounded-2xl bg-white shadow-sm text-slate-900" : "px-3 py-1 text-xs rounded-2xl text-slate-600"}
            onClick={() => setMode("Issue")}
          >
            Issue
          </button>
          <button
            className={mode === "Return" ? "px-3 py-1 text-xs rounded-2xl bg-white shadow-sm text-slate-900" : "px-3 py-1 text-xs rounded-2xl text-slate-600"}
            onClick={() => setMode("Return")}
          >
            Return
          </button>
        </div>
      }
    >
      <CheckoutContent mode={mode} form={form} set={set} submit={submit} />
    </ConsoleShell>
  );
}

function CheckoutContent({
  mode,
  form,
  set,
  submit,
}: {
  mode: "Issue" | "Return";
  form: { memberId: string; isbn: string; method: string; dueDays: string };
  set: (k: any, v: any) => void;
  submit: (e: React.FormEvent) => void;
}) {
  const { search } = useConsole();
  const filtered = RECENT_TXNS.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return [r.title, r.member, r.id, r.isbn].join(" ").toLowerCase().includes(q);
  });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-4">

      {/* LEFT: The Issue/Return Form */}
      <Card title={`${mode} Book`}>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Member ID / Name"
              placeholder="e.g. Ali"
              value={form.memberId}
              onChange={(e) => set("memberId", e.target.value)}
            />
            <Input
              label="Book ISBN"
              placeholder="e.g. 978-3-16-148410-0"
              value={form.isbn}
              onChange={(e) => set("isbn", e.target.value)}
            />
          </div>

          {mode === "Issue" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Duration"
                value={form.dueDays}
                onChange={(e) => set("dueDays", e.target.value)}
              >
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="30">30 Days</option>
              </Select>
              <Input
                label="Method (Auto)"
                value="Desk"
                disabled
                className="bg-slate-50 text-slate-500"
              />
            </div>
          )}

          {mode === "Return" && (
            <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 text-sm text-orange-800 flex items-start gap-2">
              <RotateCcw className="h-4 w-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Return Policy</p>
                <p className="opacity-80 text-xs">Late returns may incur a fine of $0.50 per day.</p>
              </div>
            </div>
          )}

          <div className="pt-2 flex items-center gap-2">
            <PrimaryButton type="submit">
              {mode === "Issue" ? <ClipboardCheck className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              Confirm {mode}
            </PrimaryButton>
            <SecondaryButton type="button" onClick={() => alert("Clear form mock")}>
              Reset
            </SecondaryButton>
          </div>
        </form>
      </Card>

      {/* RIGHT: Recent Transactions Table */}
      <Card title={`Recent Transactions`} right={<Badge text={`${filtered.length}`} />}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500">
                <th className="text-left font-medium py-2">Txn</th>
                <th className="text-left font-medium py-2">Title</th>
                <th className="text-left font-medium py-2">Member</th>
                <th className="text-left font-medium py-2">Issued</th>
                <th className="text-left font-medium py-2">Returned</th>
                <th className="text-left font-medium py-2">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((r, idx) => (
                <tr key={idx} className="text-slate-700">
                  <td className="py-2">
                    <div className="font-medium text-slate-900">{r.id}</div>
                    <div className="text-xs text-slate-500">ISBN {r.isbn}</div>
                  </td>
                  <td className="py-2">{r.title}</td>
                  <td className="py-2">{r.member}</td>
                  <td className="py-2">{r.issued}</td>
                  <td className="py-2">{r.returned}</td>
                  <td className="py-2">
                    <Badge text={r.method} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

