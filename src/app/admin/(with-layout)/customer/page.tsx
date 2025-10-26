"use client";

import React, { useState } from "react";
import {
  useDeleteContact,
  useGetAllContact,
  useSearchContact,
} from "@/api/contact/query/useContactQuery";
import { Contact } from "@/api/contact/contactApi";
import { FiTrash2 } from "react-icons/fi";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Skeleton } from "@/Components/ui/skeleton";

const Customer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: allContacts, refetch: refetchAll, isLoading } =
    useGetAllContact();
  const { mutate: deleteContact, isPending: isDeleting } = useDeleteContact();
  const { data: searchedContacts, refetch: refetchSearch } =
    useSearchContact(searchQuery);

  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const openDeleteModal = (id: string) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedId) {
      deleteContact(selectedId, {
        onSuccess: () => {
          refetchAll();
          setIsDeleteModalOpen(false);
          setSelectedId(null);
        },
      });
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      refetchSearch();
    } else {
      refetchAll();
    }
  };

  const users: Contact[] =
    searchQuery.trim() && searchedContacts
      ? searchedContacts.data.contact
      : allContacts?.data.contact || [];

  return (
    <div className="bg-gray-50 flex flex-col justify-center px-4 mt-12 md:px-10">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          All Customers
        </h1>

        {/* Search */}
        <div className="flex flex-wrap items-center justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex w-full md:w-auto space-x-2">
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>FirstName</TableHead>
                <TableHead>LastName</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [...Array(5)].map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : users.length > 0 ? (
                users.map((user, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.mobile_number}</TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        className="text-blue-500 p-0"
                        onClick={() => setSelectedMessage(user.message)}
                      >
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        onClick={() => openDeleteModal(user._id)}
                      >
                        <FiTrash2 />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-gray-500 py-6"
                  >
                    No contacts found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="p-4 text-sm text-gray-600">
          Showing {users.length} contact{users.length !== 1 && "s"}
        </div>
      </div>

      {/* Message Modal */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message</DialogTitle>
            <DialogDescription>{selectedMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setSelectedMessage(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this contact?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customer;
