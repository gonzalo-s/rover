import { useQuery } from "react-query";
import { Stack, Box, Text, LightMode } from "@chakra-ui/react";
import GalleryNav from "../galleryNav";
import GalleryFilters from "../galleryFilters";
import GalleryContainer from "../galleryContainer";
import { useActiveRover } from "../ViewsContext";
import getPhotosByName from "../API/getPhotosByName";

export default function Gallery() {
  const today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    (today.getDate() - 1);
  const activeRover = useActiveRover();
  const rover = activeRover.name;
  const camerasArr = activeRover.cameras;
  let dateSol = `earth_date=${date}`;

  let key = `getPhotosByName${activeRover.name}`;
  const { isLoading, data, error } = useQuery(key, () =>
    getPhotosByName(dateSol, rover, camerasArr)
  );

  if (isLoading) {
    return <Box>Loading..</Box>;
  }
  if (error) {
    return <Box>Error: {error.message}</Box>;
  }

  let photos = data.data.photos;
  return (
    <Stack>
      <Box
        className="galleryWrapper"
        display="flex"
        flexDirection="column"
        w="100%"
        h="100%"
        minH="lg"
        bg="gray.200"
        pt="1rem"
        pb="1rem"
        alignItems="center"
        justifyContent="space-around"
        border="1px"
      >
        <Text fontSize="3xl">
          {photos.length === 0 ? (
            <Box w="100%" h="100%" border="1px">
              There are no photos for {date}
            </Box>
          ) : (
            "false"
          )}
        </Text>
        <Box display="flex" w="100%" align="center">
          <GalleryFilters />
        </Box>
        <Box w="95%">
          <GalleryContainer photos={photos} date={date} />
        </Box>
        <Box w="50%">
          <GalleryNav />
        </Box>
      </Box>
    </Stack>
  );
}
