"use client";
import { createContacts } from "@/api/contact/query/useContactQuery";
import React, { useState } from "react";
import { toast } from "react-toastify";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  mobile_number: "",
  message: "",
  password:""
};

const Contact = () => {
  const [contact, setContact] = useState(initialState);

  const { mutate: createContact } = createContacts();

  const handleCreate = () => {
    if (
      
      !contact.first_name.trim() ||
      !contact.last_name.trim() ||
      !contact.email.trim() ||
      !contact.mobile_number.trim() ||
      !contact.message.trim()
    ) {
      toast.error("All fields are required");
      return;
    }
    createContact(
      {
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        mobile_number: contact.mobile_number,
        message: contact.message,
      },
      {
        onSuccess: () => {
          setContact(initialState);
          toast.success("Message Send successfully!");
        },
        onError: () => {
          toast.error("Failed to create about");
        },
      }
    );
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dppfr1gjx/image/upload/v1731780156/gralxkgxm165na1msfx8.webp')",
      }}
    >
      {/* Overlay */}
      <div className="bg-black bg-opacity-50 min-h-screen">
        {/* Header Section */}
        <header className="text-white py-5 text-center">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-sm mt-2">
            Get in touch with us for any queries or assistance
          </p>
        </header>

        {/* Main Section */}
        <main className="max-w-6xl mx-auto p-5">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Points of Contact */}
            <div className="bg-white bg-opacity-80 shadow-lg rounded-lg p-5">
              <h2 className="text-2xl font-semibold text-gray-700">
                Points of Contact
              </h2>
              <div className="mt-4">
                <h3 className="font-bold text-lg">Information & Sales</h3>
                <p className="text-gray-600">Email: sales@example.com</p>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-lg">Support</h3>
                <p className="text-gray-600">Email: support@example.com</p>
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-lg">
                  Our Offices Around the World
                </h3>
                <p className="text-gray-600">
                  <span className="block">123 Main Street</span>
                  <span className="block">New York, NY 10001, USA</span>
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="block">456 Another Road</span>
                  <span className="block">London, UK</span>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white bg-opacity-80 shadow-lg rounded-lg p-5">
              <h2 className="text-2xl font-semibold text-gray-700">
                Send Us a Message
              </h2>
              <form className="mt-5 space-y-4" onSubmit={(e) => e.preventDefault()} >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm text-gray-600"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={contact.first_name}
                      onChange={(e) =>
                        setContact({ ...contact, first_name: e.target.value })
                      }
                      placeholder="Enter your first name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 text-sm"
                    />

                    
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm text-gray-600"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      value={contact.last_name}
                      onChange={(e) =>
                        setContact({ ...contact, last_name: e.target.value })
                      }
                      type="text"
                      placeholder="Enter your last name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-600"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                    type="email"
                    placeholder="Enter your email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm text-gray-600"
                  >
                    Mobile Number
                  </label>
                  <input
                    id="phone"
                    value={contact.mobile_number}
                    onChange={(e) =>
                      setContact({ ...contact, mobile_number: e.target.value })
                    }
                    type="tel"
                    placeholder="Enter your mobile number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-gray-600"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={contact.message}
                    onChange={(e) =>
                      setContact({ ...contact, message: e.target.value })
                    }
                    placeholder="Type your message here"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2 text-sm"
                  ></textarea>
                </div>
                <button
                 onClick={handleCreate}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#24246C] to-[#5A43AF] text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </main>

        {/* Google Map Section */}
        <section className="mt-10 my-4">
          <h2 className="text-center text-2xl font-semibold text-white">
            Find Us Here
          </h2>
          <div className="mt-5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345086166!2d144.95373531531678!3d-37.816279979751664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf57703ba77c94b0b!2s123%20Main%20Street%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sus!4v1614386711188!5m2!1sen!2sus"
              className="w-full h-64 border-0 rounded-md"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
