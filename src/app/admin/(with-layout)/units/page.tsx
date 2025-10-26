"use client";
import React, { useState } from "react";
import {
  useCreateUnits,
  useDeleteUnits,
  useSearchUnits,
  useUnits,
  useUpdateUnits,
} from "@/api/units/queries/useUnitsQuery";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";
import { FaEdit, FaTrash } from "react-icons/fa";

// shadcn imports
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Skeleton } from "@/Components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";

const Units = () => {
  const [units, setUnits] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [openAddModal, setOpenAddModal] = useState(false);

  const limit = 10;

  const { data, isLoading, error, refetch } = useUnits({ page: pageNumber, limit });
  const { mutate: createUnits } = useCreateUnits();
  const { mutate: updateUnits } = useUpdateUnits();
  const { mutate: deleteUnits } = useDeleteUnits();
  const { data: searchData, isLoading: searchLoading } = useSearchUnits(searchQuery);

  const handleCreate = () => {
    setIsLoading(true);
    if (!units.trim()) {
      toast.error("Units name is required");
      setIsLoading(false);
      return;
    }
    createUnits(
      { unit_name: units },
      {
        onSuccess: () => {
          setUnits("");
          refetch();
          setOpenAddModal(false);
          toast.success("Units created successfully!");
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
          toast.error("Failed to create Units");
        },
      }
    );
  };

  const handleSaveUpdate = () => {
    setIsLoading(true);
    if (!editingId || !updatedName.trim()) {
      toast.error("Units name is required");
      setIsLoading(false);
      return;
    }
    updateUnits(
      { id: editingId, data: { unit_name: updatedName } },
      {
        onSuccess: () => {
          setEditingId(null);
          setUpdatedName("");
          refetch();
          toast.success("Units updated successfully!");
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
          toast.error("Failed to update Units");
        },
      }
    );
  };

  const confirmDelete = () => {
    setIsLoading(true);
    if (!deleteId) {
      setIsLoading(false);
      return;
    }
    deleteUnits(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        refetch();
        toast.success("Units deleted successfully!");
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
        toast.error("Failed to delete units");
      },
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const categories = searchQuery ? searchData?.data.units : data?.data.units;
  const totalItems = data?.data.pagination?.totalItems || 0;
  const totalPages = data?.data.pagination?.totalPages || 1;

  const handleNextPage = () => {
    if (pageNumber < totalPages) setPageNumber((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (pageNumber > 1) setPageNumber((prev) => prev - 1);
  };

  return (
    <div className="px-4 md:px-10 mt-14">
      {/* Table */}
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <Dialog open={openAddModal} onOpenChange={setOpenAddModal}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">+ Add New</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Unit</DialogTitle>
                <DialogDescription>
                  Enter the unit name you want to add to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="flex gap-2 mt-4">
                <Input
                  type="text"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  placeholder="Enter units name"
                />
                <Button onClick={handleCreate} disabled={loading}>
                  {loading ? <AiOutlineLoading className="animate-spin" /> : "Save"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Input
            type="text"
            placeholder="Search here..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full md:w-64"
          />
        </div>

        {/* Table Data */}
        {(isLoading || searchLoading) ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">Error fetching units</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-2/3">Units Name</TableHead>
                <TableHead className="text-center w-1/3">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.map((unit) => (
                <TableRow key={unit._id}>
                  <TableCell>
                    {editingId === unit._id ? (
                      <Input
                        type="text"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                      />
                    ) : (
                      <span className="font-medium">{unit.unit_name}</span>
                    )}
                  </TableCell>
                  <TableCell className="flex items-center justify-center gap-4">
                    {editingId === unit._id ? (
                      <Button variant="outline" size="sm" onClick={handleSaveUpdate}>
                        Save
                      </Button>
                    ) : (
                      <FaEdit
                        onClick={() => {
                          setEditingId(unit._id);
                          setUpdatedName(unit.unit_name);
                        }}
                        className="text-green-500 cursor-pointer hover:scale-110 transition"
                      />
                    )}
                    <FaTrash
                      onClick={() => setDeleteId(unit._id)}
                      className="text-red-500 cursor-pointer hover:scale-110 transition"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Pagination */}
        {!searchQuery && !isLoading && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
            <p className="text-sm text-gray-600">
              Showing {(pageNumber - 1) * limit + 1} - {Math.min(pageNumber * limit, totalItems)} of {totalItems} entries
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={pageNumber === 1}>
                &lt; Prev
              </Button>
              <Button variant="outline" size="sm" onClick={handleNextPage} disabled={pageNumber >= totalPages}>
                Next &gt;
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <p className="text-sm mb-4">Are you sure you want to delete this unit?</p>
            <div className="flex justify-end gap-2">
              <Button variant="destructive" onClick={confirmDelete} disabled={loading}>
                {loading ? <AiOutlineLoading className="animate-spin" /> : "Delete"}
              </Button>
              <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Units;
