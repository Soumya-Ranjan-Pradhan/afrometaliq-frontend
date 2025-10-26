"use client";

import React, { useState } from "react";
import { useGetAllUsers, useSearchUsers } from "@/api/auth/queries/authQuery";

// shadcn imports
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Skeleton } from "@/Components/ui/skeleton";

const UserTable: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 10;

  const { data, isLoading, error } = useGetAllUsers({
    page: pageNumber,
    limit,
  });

  const { data: searchResults, isLoading: searchLoading } =
    useSearchUsers(searchQuery);

  const handleNextPage = () => {
    if (
      data?.data?.pagination?.totalPages &&
      pageNumber < data.data.pagination.totalPages
    ) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const displayUser =
    searchQuery && searchResults?.data?.users?.length
      ? searchResults.data.users
      : data?.data?.users || [];

  const totalItems = data?.data?.pagination?.totalItems || 0;
  const totalPages = data?.data?.pagination?.totalPages || 1;

  // Centered loader
  if (isLoading || searchLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="space-y-3 w-full max-w-4xl">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div className="text-red-500">Error fetching users</div>;

  return (
    <div className="bg-gray-50 flex flex-col justify-center px-4 md:px-10 mt-16">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6 mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">All Users</h1>

        {/* Search */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search here..."
            className="w-full md:w-1/3"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayUser.map((user: any, index: number) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination (hide when searching) */}
        {!searchQuery && (
          <div className="p-4 bg-gray-50 border-t flex flex-col md:flex-row justify-between items-center gap-3 mt-4">
            <p className="text-sm text-gray-600">
              Showing {(pageNumber - 1) * limit + 1} –{" "}
              {Math.min(pageNumber * limit, totalItems)} of {totalItems} entries
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={pageNumber === 1}
              >
                &lt; Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={pageNumber >= totalPages}
              >
                Next &gt;
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
