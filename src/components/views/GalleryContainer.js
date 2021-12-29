import {
  Stack,
  Box,
  Button,
  Spinner,
  HStack,
  Text,
  Image,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useAppContext } from "../appContext";
import getPhotosByNameEarthDate from "../API/getPhotosByNameEarthDate";
import Gallery from "../gallery/Gallery";
import GalleryPagesNav from "../gallery/GalleryPagesNav";
import GalleryFilters from "../gallery/GalleryFilters";
import logo from "../../img/nasa-logo.svg";

export default function GalleryContainer() {
  const { filters, getAvailableCamerasAndPages, pages, setActiveView } =
    useAppContext();

  const isThereADate = filters.date ? true : false;
  let activePage = null;
  const { isLoading, isError, error } = useQuery(
    ["getPhotosByNameEarthDate", filters],
    () => getPhotosByNameEarthDate(filters.date.value, filters.rover),
    {
      enabled: isThereADate,
      onSuccess: (data) => {
        getAvailableCamerasAndPages(data.data.photos);
      },
    }
  );

  if (isLoading) return <Box>Loading...</Box>;

  if (isError) return <Box>ERROR Setting defaults: {error.message}</Box>;

  if (pages) {
    activePage = pages[filters.page - 1];
  }

  function handleOnBackClick() {
    setActiveView("roverSelect");
  }
  return (
    <Stack
      className="galleryTitleWrapper"
      w="100%"
      h="100%"
      justifyContent={"flex-start"}
    >
      <Box
        display="flex"
        flexDirection={"row"}
        wrap={"nowrap"}
        w="100%"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Image src={logo} borderRadius="full" boxSize="120px" pl="20px" />
        <Stack
          className="RoverName"
          w="50%"
          h="55%"
          alignItems="center"
          justifyContent="center"
          letterSpacing="0.5rem"
        >
          <Text fontSize="5xl" color="white">
            {" "}
            {filters.rover?.toUpperCase()}
          </Text>
        </Stack>
        <Box boxSize="120px" />
      </Box>
      <Box
        className="galleryWrapper"
        display="flex"
        flexDirection="column"
        pb="1rem"
        alignItems="center"
        //        justifyContent="flex-start"
      >
        <Box w="100%" h="5rem">
          {activePage ? (
            <Box
              display="flex"
              direction="row"
              w="100%"
              h="90%"
              alignItems="center"
              justifyContent="center"
              p="0.5rem"
            >
              <Button w="15rem" variant="nasa" onClick={handleOnBackClick}>
                Back to Select Rover
              </Button>

              <GalleryFilters />
            </Box>
          ) : (
            <HStack justifyContent="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="brand.blue"
                size="xl"
              />
            </HStack>
          )}
        </Box>
        <Box display={"flex"} flexDirection={"column"} w="100%">
          {activePage ? <Gallery activePage={activePage} /> : ""}
          {activePage ? <GalleryPagesNav activePage={activePage} /> : ""}
        </Box>
      </Box>
    </Stack>
  );
}
