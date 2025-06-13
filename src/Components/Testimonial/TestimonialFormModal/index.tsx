"use client";

import { useEffect } from "react";
import { IconX } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { useCreateTestimonial } from "@/api/testimonials/queries/useTestimonialsQuery";

interface TestimonialFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TestimonialFormModal: React.FC<TestimonialFormModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const { mutateAsync, isPending } = useCreateTestimonial();

  // ✅ Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      await mutateAsync(formData);
      onClose();
      reset();
    } catch (error) {
      console.error("Failed to create testimonial", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 w-full max-w-md relative mx-4 my-10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4  bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600"
        >
          <IconX />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Add Testimonial
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="block w-full rounded-md border-gray-300 dark:bg-neutral-800 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 py-2 px-3"
              placeholder="Enter name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Description
            </label>
            <input
              {...register("description", { required: true })}
              type="text"
              className="block w-full rounded-md border-gray-300 dark:bg-neutral-800 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 py-2 px-3"
              placeholder="Enter description"
              required  
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
              Image
            </label>
            <input
              {...register("image", { required: true })}
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          {watch("image")?.[0] && (
            <img
              src={URL.createObjectURL(watch("image")[0])}
              alt="Preview"
              className="rounded-md h-32 object-cover"
            />
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 bg-gradient-to-r from-[rgb(20,161,168)] to-[rgb(3,105,161)] text-white rounded-md"
          >
            {isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestimonialFormModal;
