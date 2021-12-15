import { Stack, Flex, Text } from "@chakra-ui/react";
import { getManifestsByName } from "./API/getManifestsByName";
import { useQuery } from "react-query";
import RoverImage from "./roverImage";

function Opportunity({ goToView }) {
  const { isLoading, data, error } = useQuery("opportunityManifest", () =>
    getManifestsByName("opportunity")
  );
  if (isLoading) {
    return <Flex>Loading..</Flex>;
  }
  if (error) {
    return <Flex>Error: {error.message}</Flex>;
  }
  let manifest = data.data.photo_manifest;
  let lastSol = manifest.max_sol;
  let name = manifest.name;
  let photoDate = manifest.max_date;

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
      <Text color="gray.500">LAST PHOTO: {photoDate} </Text>
      <RoverImage solar={lastSol} rover={"opportunity"} goToView={goToView} />
    </Stack>
  );
}

export default Opportunity;
