import { Stack, Flex, Text } from "@chakra-ui/react";
import { getManifestsByName } from "./API/getManifestsByName";
import { useQuery } from "react-query";
import RoverImage from "./roverImage";

function Opportunity() {
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
  let name = manifest.name;
  let lastDate = manifest.max_date;
  console.log("op manifest ", manifest);

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
      <RoverImage date={lastDate} rover={"opportunity"} />
    </Stack>
  );
}

export default Opportunity;
