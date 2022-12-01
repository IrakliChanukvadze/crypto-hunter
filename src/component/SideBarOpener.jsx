import { Button, Drawer } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const SideBarOpener = () => {
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };
  return (
    <>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer(false)}>
        {<div style={{ width: "100px", backgroundColor: "red" }}>"blabla"</div>}
      </Drawer>
    </>
  );
};

export default SideBarOpener;
