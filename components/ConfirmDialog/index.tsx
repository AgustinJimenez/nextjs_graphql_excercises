/* eslint-disable react/display-name */
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

const ConfirmDialog = React.forwardRef((props: any, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [data, setData] = React.useState(null);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  React.useImperativeHandle(ref, () => ({
    close,
    open,
    data,
    setData,
  }));

  return (
    <>
      <Dialog onClose={close} open={isOpen}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          {(() => {
            switch (typeof props?.children) {
              case "function":
                return props?.children?.(data);

              default:
                return props?.children;
            }
          })()}
        </DialogContent>
      </Dialog>
    </>
  );
});
export default ConfirmDialog;
