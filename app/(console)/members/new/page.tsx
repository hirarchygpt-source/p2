"use client";

import React from "react";
import { Plus } from "lucide-react";
import ConsoleShell from "../../_components/ConsoleShell";
import { Card, Input, PrimaryButton, Select, TextArea } from "../../_components/ui";

export default function Page() {
  const [form, setForm] = React.useState({
    name: "",
    type: "Student",
    email: "",
    phone: "",
    address: "",
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Member created (mock): ${JSON.stringify(form, null, 2)}`);
  }

  return (
    <ConsoleShell title="Add Member" subtitle="Create a new member profile." rightActions={null}>
      <Card title="Member Details">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Ayesha Khalid" />
            <Select label="Member Type" value={form.type} onChange={(e) => set("type", e.target.value)}>
              <option>Student</option>
              <option>Faculty</option>
              <option>Staff</option>
              <option>Visitor</option>
            </Select>
            <Input label="Email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="name@example.com" />
            <Input label="Phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+92..." />
          </div>

          <TextArea label="Address" rows={3} value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Optional" />

          <div className="flex items-center gap-2">
            <PrimaryButton type="submit">
              <Plus className="h-4 w-4" />
              Create Member
            </PrimaryButton>
          </div>
        </form>
      </Card>
    </ConsoleShell>
  );
}
