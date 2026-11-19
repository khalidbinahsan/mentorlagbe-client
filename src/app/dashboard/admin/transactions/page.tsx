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

interface PaymentRecord {
  _id: string;
  userName: string;
  userEmail: string;
  userRole: string;
  planName: string;
  amount: number;
  currency: string;
  transactionId: string;
  paidAt: string;
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<PaymentRecord[]>([]);

  useEffect(() => {
    api.get("/api/admin/transactions").then((res) => setTransactions(res.data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold tracking-tight">Stripe Subscription Transactions</h1>

      <div className="rounded-xl border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No Stripe transactions recorded yet.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx) => (
                <TableRow key={tx._id}>
                  <TableCell>
                    <div className="font-semibold">{tx.userName}</div>
                    <div className="text-xs text-muted-foreground">{tx.userEmail}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">{tx.userRole}</Badge>
                  </TableCell>
                  <TableCell>{tx.planName}</TableCell>
                  <TableCell className="font-bold text-emerald-600">
                    ${tx.amount} {tx.currency}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{tx.transactionId}</TableCell>
                  <TableCell>{new Date(tx.paidAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}