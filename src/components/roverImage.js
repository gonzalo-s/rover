import { Box, Image } from "@chakra-ui/react";
import { useQuery } from "react-query";
import getLastPhoto from "./API/getLastPhoto";
import { useViewUpdate, useRoverUpdate } from "../ViewsContext";

export default function RoverImage({ date, rover }) {
  const goToView = useViewUpdate();
  const roverUpdate = useRoverUpdate();

  let key = `getLastPhoto${rover}`;
  const { isLoading, data, error } = useQuery(key, () =>
    getLastPhoto(date, rover)
  );

  if (isLoading) {
    return <Box>Loading..</Box>;
  }
  if (error) {
    return <Box>Error: {error.message}</Box>;
  }
  let photos = data.data.photos;
  let lastPhoto = photos[photos.length - 1];

  function handleClick() {
    goToView("gallery");
    roverUpdate(rover);
  }
  return (
    <Box
      className="imgWrapper"
      as="button"
      display="flex"
      w="90%"
      h="90%"
      p="1rem"
      alignItems="center"
      justifyContent="center"
      onClick={handleClick}
    >
      <Image
        src={lastPhoto.img_src}
        borderRadius="0.5rem"
        boxShadow="dark-lg"
      />
    </Box>
  );
}
