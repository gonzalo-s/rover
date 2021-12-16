import { Box, SimpleGrid, Image } from "@chakra-ui/react";

export default function GalleryContainer({ photos, date }) {
  if (photos.length === 0)
    return (
      <Box w="100%" h="100%" border="1px" bg="gray.400">
        There are no photos for {date}
      </Box>
    );

  // reformat Array

  let galleryPhotos = photos.map((photoObj) => {
    let newObj = {
      id: photoObj.id,
      img_src: photoObj.img_src,
      camera: photoObj.camera.name,
      earth_date: photoObj.earth_date,
      sol: photoObj.sol,
      rover: photoObj.rover.name,
    };

    return newObj;
  });

  console.log("reformat ", galleryPhotos);

  return (
    <Box w="100%" h="100%" border="1px" bg="gray.400" p="1rem">
      <SimpleGrid columns={5} spacingX="1rem" spacingY="1rem">
        {galleryPhotos.map((photo) => {
          return (
            <Box w="100%" h="100%">
              <Image
                src={photo.img_src}
                alt={`Photo from ${photo.rover}`}
                borderRadius="1rem"
              />
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
