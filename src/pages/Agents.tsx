
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { agents } from "@/data/agents";
import { Filter, Eye } from "lucide-react";
import AgentDetailsModal from "./components/AgentDetailsModal";

const DummyAgentsList = () => {
  const [search, setSearch] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);

  const filtered = agents.filter(
    a =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.phone.includes(search) ||
      a.agentType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Agents</h1>
      <div className="flex items-center gap-3 mb-4">
        <Input
          placeholder="Search agents..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          type="button"
          className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded flex items-center gap-1"
          title="Standard Filter"
        >
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="hidden md:inline text-xs">Filter</span>
        </button>
      </div>
      <div className="rounded border bg-white shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-accent">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Agent Type</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-4 text-muted-foreground">No agents found</td>
              </tr>
            )}
            {filtered.map(agent => (
              <tr key={agent.id} className="border-t hover:bg-accent/30 transition">
                <td className="p-3">{agent.name}</td>
                <td className="p-3">{agent.email}</td>
                <td className="p-3">{agent.phone}</td>
                <td className="p-3">{agent.agentType}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => setSelectedAgent(agent)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-accent hover:bg-accent/50 text-sm text-primary"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedAgent && (
        <AgentDetailsModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
      )}
    </div>
  );
};

export default DummyAgentsList;
