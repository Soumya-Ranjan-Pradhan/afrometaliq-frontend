"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/Components/ui/pagination";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";
import { ChevronDown, Search, Filter } from "lucide-react";

const orders = [
  {
    id: "#12512B",
    date: "May 5, 4:20 PM",
    customer: "Tom Anderson",
    payment: "Paid",
    status: "Ready",
    total: "$49.90",
  },
  {
    id: "#12523C",
    date: "May 5, 4:15 PM",
    customer: "Jayden Walker",
    payment: "Paid",
    status: "Ready",
    total: "$34.36",
  },
  {
    id: "#51232A",
    date: "May 5, 4:10 PM",
    customer: "Inez Kim",
    payment: "Paid",
    status: "Shipped",
    total: "$5.51",
  },
  {
    id: "#23534D",
    date: "May 5, 4:12 PM",
    customer: "Francisco Henry",
    payment: "Paid",
    status: "Shipped",
    total: "$29.74",
  },
  {
    id: "#51323C",
    date: "May 5, 4:12 PM",
    customer: "Violet Phillips",
    payment: "Paid",
    status: "Shipped",
    total: "$23.06",
  },
  {
    id: "#51323C",
    date: "May 5, 4:12 PM",
    customer: "Violet Phillips",
    payment: "Paid",
    status: "Shipped",
    total: "$23.06",
  },
  {
    id: "#51323C",
    date: "May 5, 4:12 PM",
    customer: "Violet Phillips",
    payment: "Paid",
    status: "Shipped",
    total: "$23.06",
  },
  {
    id: "#51323C",
    date: "May 5, 4:12 PM",
    customer: "Violet Phillips",
    payment: "Paid",
    status: "Shipped",
    total: "$23.06",
  },
  {
    id: "#51323C",
    date: "May 5, 4:12 PM",
    customer: "Violet Phillips",
    payment: "Paid",
    status: "Shipped",
    total: "$23.06",
  },
  {
    id: "#51323C",
    date: "May 5, 4:12 PM",
    customer: "Violet Phillips",
    payment: "Paid",
    status: "Shipped",
    total: "$23.06",
  },
  {
    id: "#51323C",
    date: "May 5, 4:12 PM",
    customer: "Violet Phillips",
    payment: "Paid",
    status: "Shipped",
    total: "$23.06",
  },
];

export default function OrdersTable() {
  return (
    <div className="p-4 mt-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Orders</h1>
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button className="bg-blue-600 text-white">+ Add Order</Button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Status: Ready</DropdownMenuItem>
              <DropdownMenuItem>Status: Shipped</DropdownMenuItem>
              <DropdownMenuItem>Paid</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Input placeholder="Search..." className="w-full sm:w-[200px]" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead>
                <input type="checkbox" />
              </TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Payment status</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      order.payment === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {order.payment}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === "Ready"
                        ? "bg-orange-200 text-orange-900"
                        : order.status === "Shipped"
                        ? "bg-gray-700 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-4 text-sm text-gray-500">
        <div>274 Results</div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive href="#">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">...</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">24</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
