export const getFromLS = (key: string) => {
  // check localstorage is available
  if (typeof window === "undefined") return null;
  // check if the key exists
  if (!localStorage.getItem(key)) return null;
  // get the value from localstorage
  return JSON.parse(localStorage.getItem(key) || "");
};

export const storeToLS = (key: string, value: any) => {
  // check localstorage is available
  if (typeof window === "undefined") return null;
  // set the value in localstorage
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearLS = () => {
  // check localstorage is available
  if (typeof window === "undefined") return null;
  // clear localstorage
  localStorage.clear();
};
