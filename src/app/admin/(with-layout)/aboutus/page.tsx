"use client";

import React, { useState } from "react";
import {
  useAbout,
  useDeleteAbout,
  useGetAbout,
  useUpdateAbout,
} from "@/api/about/query/useAboutQuery";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

// shadcn imports
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Skeleton } from "@/Components/ui/skeleton";

const AdminFaqPage: React.FC = () => {
  const [about, setAbout] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  const { data, isLoading, error, refetch } = useGetAbout();
  const { mutate: createAbout } = useAbout();
  const { mutate: updateAbout } = useUpdateAbout();
  const { mutate: deleteAbout } = useDeleteAbout();

  const handleCreate = () => {
    if (!about.trim() || !description.trim()) {
      toast.error("Both title and description are required");
      return;
    }
    createAbout(
      { about_title: about, about_description: description },
      {
        onSuccess: () => {
          setAbout("");
          setDescription("");
          setOpenAddModal(false);
          refetch();
          toast.success("About created successfully!");
        },
        onError: () => {
          toast.error("Failed to create about");
        },
      }
    );
  };

  const handleSaveUpdate = () => {
    if (!editingId || !about.trim() || !description.trim()) {
      toast.error("Both title and description are required");
      return;
    }
    updateAbout(
      {
        id: editingId,
        data: { about_title: about, about_description: description },
      },
      {
        onSuccess: () => {
          setEditingId(null);
          setAbout("");
          setDescription("");
          refetch();
          toast.success("About updated successfully!");
        },
        onError: () => {
          toast.error("Failed to update about");
        },
      }
    );
  };

  const handleEdit = (id: string, title: string, desc: string) => {
    setEditingId(id);
    setAbout(title);
    setDescription(desc);
    setOpenAddModal(true);
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    deleteAbout(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        refetch();
        toast.success("About deleted successfully!");
      },
      onError: () => {
        toast.error("Failed to delete about");
      },
    });
  };

  const aboutList = data?.data?.about || [];

  return (
    <div className="container mx-auto p-4 lg:mt-28 md:mt-24 mt-8 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3">
        <h2 className="text-2xl font-semibold">
          MANAGE{" "}
          <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">
            AboutUs
          </span>
        </h2>

        <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
          <DialogTrigger asChild>
            <Button>+ Add AboutUs</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingId ? "Edit AboutUs" : "Add New AboutUs"}
              </DialogTitle>
              <DialogDescription>
                Provide the title and description for AboutUs section.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 mt-4">
              <Input
                type="text"
                placeholder="Enter title"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
              <Textarea
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
              <Button
                onClick={editingId ? handleSaveUpdate : handleCreate}
                className="w-full"
              >
                {editingId ? "Save Changes" : "Add AboutUs"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-lg shadow p-2 md:p-4">
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">Error fetching AboutUs data</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-sm md:text-base">#</TableHead>
                <TableHead className="text-sm md:text-base">Title</TableHead>
                <TableHead className="text-sm md:text-base">Description</TableHead>
                <TableHead className="text-center w-24 text-sm md:text-base">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aboutList.map((item: any, index: number) => (
                <TableRow key={item._id} className="align-top">
                  <TableCell className="text-sm">{index + 1}</TableCell>
                  <TableCell className="text-sm">{item.about_title}</TableCell>
                  <TableCell className="text-sm whitespace-normal break-words max-w-xs md:max-w-md">
                    {item.about_description}
                  </TableCell>
                  <TableCell className="flex items-center justify-center gap-3">
                    <button
                      onClick={() =>
                        handleEdit(item._id, item.about_title, item.about_description)
                      }
                      className="text-yellow-500 hover:scale-110 transition"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => setDeleteId(item._id)}
                      className="text-red-500 hover:scale-110 transition"
                    >
                      <FiTrash2 />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Are you sure you want to delete this item?
            </h3>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFaqPage;
