import React, { useState } from "react";
import SignUpFirst from "./SignUpFirst";
import SignUpSecond from "./SignUpSecond";

export default function SignUp() {
    const [page, setPage] = useState(1);
  return (
    <>
      {page === 1 ? (
      <SignUpFirst />
      ) : (
        <SignUpSecond/>
      )}
      
    </>
  );
}
