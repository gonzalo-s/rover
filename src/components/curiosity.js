import { Stack, Flex, Text } from "@chakra-ui/react";
import { getManifestsByName } from "./API/getManifestsByName";
import { useQuery } from "react-query";
import RoverImage from "./roverImage";

function Curiosity({ goToView }) {
  const { isLoading, data, error } = useQuery("curiosityManifest", () =>
    getManifestsByName("curiosity")
  );
  if (isLoading) {
    return <Flex>Loading..</Flex>;
  }
  if (error) {
    return <Flex>Error: {error.message}</Flex>;
  }
  let manifest = data.data.photo_manifest;
  let lastDate = manifest.max_date;
  let name = manifest.name;
  return (
    <Stack
      maxW="sm"
      minW="15rem"
      w="25vw"
      h="auto"
      bg="brand.bg"
      borderRadius="0.5rem"
      alignItems="center"
      direction="column"
    >
      <Text textAlign="center" fontSize="3xl" pt="1rem" color="white">
        {" "}
        {name}
      </Text>
      <Text color="gray.500">LAST PHOTO: {lastDate} </Text>
      <RoverImage date={lastDate} rover={"curiosity"} />
    </Stack>
  );
}

export default Curiosity;
