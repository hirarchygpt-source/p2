"use client";

import React from "react";
import { FilePlus2 } from "lucide-react";
import ConsoleShell from "../../_components/ConsoleShell";
import { Card, Input, PrimaryButton, Select, TextArea } from "../../_components/ui";

export default function Page() {
  const [form, setForm] = React.useState({
    thesisId: "",
    title: "",
    student: "",
    department: "CS",
    supervisor: "",
    year: "2025",
    keywords: "",
    abstract: "",
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Thesis added (mock): ${JSON.stringify(form, null, 2)}`);
  }

  return (
    <ConsoleShell title="Add Thesis" subtitle="Register a thesis entry (and file later) — mock UI." rightActions={null}>
      <Card title="Thesis Details">
        <form onSubmit={submit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Thesis ID" value={form.thesisId} onChange={(e) => set("thesisId", e.target.value)} placeholder="T-2025-091" />
            <Input label="Year" value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="2025" />
            <Input label="Title" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Thesis title" />
            <Input label="Student Name" value={form.student} onChange={(e) => set("student", e.target.value)} placeholder="Student name" />
            <Select label="Department" value={form.department} onChange={(e) => set("department", e.target.value)}>
              <option>CS</option>
              <option>SE</option>
              <option>EE</option>
              <option>Env</option>
              <option>Mgmt</option>
            </Select>
            <Input label="Supervisor" value={form.supervisor} onChange={(e) => set("supervisor", e.target.value)} placeholder="Supervisor name" />
          </div>

          <Input label="Keywords" value={form.keywords} onChange={(e) => set("keywords", e.target.value)} placeholder="AI, NLP, Urdu, ..." />

          <TextArea label="Abstract" rows={6} value={form.abstract} onChange={(e) => set("abstract", e.target.value)} placeholder="Optional (mock)" />

          <div className="flex items-center gap-2">
            <PrimaryButton type="submit">
              <FilePlus2 className="h-4 w-4" />
              Add Thesis
            </PrimaryButton>
          </div>
        </form>
      </Card>
    </ConsoleShell>
  );
}
