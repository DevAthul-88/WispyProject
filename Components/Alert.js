import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";
import { useState } from "react";


function AlertDialog({type , title , description , trigger}) {
  
  const [hide , setHide] = useState(trigger)
  
  return (
    <>
    {
      hide && <Alert status={type}>
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" onClick={() => setHide(false)}/>
    </Alert>
    }
    </>
  );
}

export default AlertDialog;
