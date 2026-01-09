"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import HomePage from "../components/HomePage";
import { Home } from "lucide-react";

export default function Page() {
  const links = [{ label: "Home", href: "/", icon: <Home size={20} /> }];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* FIXED SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-64">
        <Sidebar>
          <SidebarBody>
            <div className="flex h-full flex-col gap-2 overflow-y-auto no-scrollbar">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </SidebarBody>
        </Sidebar>
      </aside>

      {/* SCROLLABLE CONTENT */}
      <main className="ml-64 flex-1 overflow-y-auto">
        <HomePage />
      </main>
    </div>
  );
}
