"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "student" | "tutor" | "admin";
  plan: "free" | "pro";
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);

  const fetchUsers = () => {
    api.get("/api/admin/users").then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id: string, role: string) => {
    try {
      await api.patch(`/api/admin/users/${id}/role`, { role });
      toast.success(`User role updated to ${role}`);
      fetchUsers();
    } catch {
      toast.error("Failed to update user role");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold tracking-tight">Manage Platform Users</h1>

      <div className="rounded-xl border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead className="text-right">Change Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u._id}>
                <TableCell className="font-semibold">{u.name}</TableCell>
                <TableCell className="text-muted-foreground">{u.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="uppercase">{u.plan}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className="capitalize bg-emerald-600 text-white">{u.role}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="h-9 rounded-md border border-input bg-background px-2.5 text-sm"
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}