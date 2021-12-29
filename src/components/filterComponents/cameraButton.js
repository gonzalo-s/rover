import { Button } from "@chakra-ui/react";

export default function CameraButton({ camera }) {
  return (
    <Button fontWeight="500" variant="ghost" p="0.5rem">
      {" "}
      {camera.name}
    </Button>
  );
}
