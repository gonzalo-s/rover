import { Box, Image } from "@chakra-ui/react";
import { useQuery } from "react-query";
import getLastPhoto from "./API/getLastPhoto";

export default function RoverImage({ solar, rover, goToView }) {
  let key = `getLastPhoto${rover}`;
  const { isLoading, data, error } = useQuery(key, () =>
    getLastPhoto(solar, rover)
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
