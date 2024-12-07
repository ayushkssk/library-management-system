'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { BarChart3, BookOpen, CircleDollarSign, FileText, LayoutDashboard, Library, LogOut, Users, Users2 } from 'lucide-react'

// Import auth conditionally
let useAuth: () => { logout: () => void } | null = () => null;
try {
  const authModule = require('@/lib/auth');
  useAuth = authModule.useAuth;
} catch (error) {
  console.error('Failed to load auth module:', error);
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const auth = useAuth()

  const isActive = (path: string) => pathname === path

  const handleLogout = () => {
    if (auth && auth.logout) {
      auth.logout()
    } else {
      console.error('Logout function not available')
    }
  }

  return (
    <div className={cn("pb-12 min-h-screen bg-[#1a1b23]", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Library className="h-6 w-6 text-blue-500" />
            <h2 className="text-lg font-semibold text-white">
              Library Management
              <span className="block text-sm font-normal">System</span>
            </h2>
          </Link>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight text-gray-400">
            Main Menu
          </h2>
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white",
                isActive('/dashboard') ? "bg-pink-600 text-white" : "text-gray-400"
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/fine-master"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white",
                isActive('/dashboard/fine-master') ? "bg-pink-600 text-white" : "text-gray-400"
              )}
            >
              <CircleDollarSign className="h-4 w-4" />
              Fine Master
            </Link>
            <Link
              href="/dashboard/users"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white",
                isActive('/dashboard/users') ? "bg-pink-600 text-white" : "text-gray-400"
              )}
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="/dashboard/students"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white",
                isActive('/dashboard/students') ? "bg-pink-600 text-white" : "text-gray-400"
              )}
            >
              <Users2 className="h-4 w-4" />
              Students
            </Link>
            <Link
              href="/dashboard/staff"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white",
                isActive('/dashboard/staff') ? "bg-pink-600 text-white" : "text-gray-400"
              )}
            >
              <Users2 className="h-4 w-4" />
              Teachers / Staff
            </Link>
            <Link
              href="/dashboard/books"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white",
                isActive('/dashboard/books') ? "bg-pink-600 text-white" : "text-gray-400"
              )}
            >
              <BookOpen className="h-4 w-4" />
              Books
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xs font-semibold uppercase tracking-tight text-gray-400">
            Logs
          </h2>
          <div className="space-y-1">
            <Link
              href="/dashboard/issue-return"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white",
                isActive('/dashboard/issue-return') ? "bg-pink-600 text-white" : "text-gray-400"
              )}
            >
              <BarChart3 className="h-4 w-4" />
              Issue / Return
            </Link>
            <Link
              href="/dashboard/issue-logs"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white",
                isActive('/dashboard/issue-logs') ? "bg-pink-600 text-white" : "text-gray-400"
              )}
            >
              <FileText className="h-4 w-4" />
              Issue Logs
            </Link>
            <Link
              href="/dashboard/collection-reports"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-white",
                isActive('/dashboard/collection-reports') ? "bg-pink-600 text-white" : "text-gray-400"
              )}
            >
              <FileText className="h-4 w-4" />
              Collection Reports
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

