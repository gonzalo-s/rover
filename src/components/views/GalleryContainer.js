import React from "react";
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
import getPhotosByEarthSolName from "../API/getPhotosByEarthSolName";
import Gallery from "../gallery/Gallery";
import GalleryPagesNav from "../gallery/GalleryPagesNav";
import GalleryFilters from "../gallery/GalleryFilters";
import logo from "../../img/nasa-logo.svg";

export default function GalleryContainer() {
  const {
    filters,
    getMaxPageAndPaginate,
    pages,
    setActiveView,
    rawPhotos,
    setRawPhotos,
  } = useAppContext();
  const isRawPhotosNull = rawPhotos === null ? true : false;
  const isThereADate = filters.date ? true : false;
  const isQueryEnabled = isRawPhotosNull && isThereADate ? true : false;

  let activePage = null;
  const { isLoading, isError, error } = useQuery(
    ["getPhotosByEarthSolName", filters],
    () =>
      getPhotosByEarthSolName(
        filters.date.type,
        filters.date.value,
        filters.rover
      ),
    {
      enabled: isQueryEnabled,
      onSuccess: (data) => {
        setRawPhotos(data.data.photos);
        getMaxPageAndPaginate(data.data.photos);
      },
    }
  );

  if (isLoading)
    return (
      <HStack justifyContent="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.blue"
          size="xl"
        />
      </HStack>
    );

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
        flexDirection={["column", "column", "row"]}
        wrap={"nowrap"}
        w="100%"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Image
          src={logo}
          borderRadius="full"
          boxSize="120px"
          pl={["0", "0", "20px"]}
        />{" "}
        <Stack
          className="RoverName"
          w="50%"
          h="55%"
          alignItems="center"
          justifyContent="center"
          letterSpacing="0.5rem"
        >
          <Text
            display={"flex"}
            fontSize="6xl"
            color="white"
            textAlign={"center"}
          >
            {" "}
            {filters.rover?.toUpperCase()}
          </Text>
        </Stack>
        <Box boxSize="120px" display={["none", "none", "flex"]} />
      </Box>
      <Box
        className="galleryWrapper"
        display="flex"
        flexDirection="column"
        pb="1rem"
        alignItems="center"
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
              flexWrap={["wrap", "wrap", "nowrap"]}
            >
              <Button minW="12.5rem" variant="nasa" onClick={handleOnBackClick}>
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
        <Box display={"flex"} flexDirection={"column"} w="100%" pt="2rem">
          {activePage ? <Gallery activePage={activePage} /> : ""}
          {activePage ? <GalleryPagesNav activePage={activePage} /> : ""}
        </Box>
      </Box>
    </Stack>
  );
}
