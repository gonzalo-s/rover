import { Box, Button } from "@chakra-ui/react";
import { useActiveRover } from "./ViewsContext";

export default function GalleryFilters() {
  const activeRover = useActiveRover();
  let cameras = activeRover.cameras;

  console.log(cameras);
  return (
    <Box w="100%" border="1px" h="100%">
      <Box className="cammeras">
        {cameras.map((camera) => {
          return (
            <Button fontWeight="500" variant="ghost" key={camera.id} p="0.5rem">
              {" "}
              {camera.name}
            </Button>
          );
        })}
      </Box>
      filters
    </Box>
  );
}
