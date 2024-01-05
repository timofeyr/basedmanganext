"use client";
import { Button } from "@mui/material/";

const ButtonComponent = ({ children, ...props }: any) => {
  return (
    <div>
      <Button onClick={() => console.log("test")} {...props}>
        {children}
      </Button>
    </div>
  );
};

export default ButtonComponent;
