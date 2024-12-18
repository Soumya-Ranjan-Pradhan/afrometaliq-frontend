"use client";

import React, { Suspense } from "react";
import AddCategory from "./Main";

const page = () => {
  return (
    <Suspense>
      <AddCategory />
    </Suspense>
  );
};

export default page;
