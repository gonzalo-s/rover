import {
  Tooltip,
  Stack,
  Image,
  Table,
  Tbody,
  Tr,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { useAppContext } from "../appContext";

export default function Photo() {
  const { filters, setActiveView } = useAppContext();

  function handleOnClick() {
    setActiveView("gallery");
  }
  let activePhoto = filters.activePhoto;

  console.log(filters);
  return (
    <Stack
      className="contentWrapper"
      display="flex"
      direction="column"
      justifyContent="center"
      alignItems="center"
      w="100%"
      minH="50vh"
      pb="5rem"
    >
      <Stack
        className="imgTableWrapper"
        flexDirection="column"
        alignItems="center"
        maxW="80%"
        border="1px"
        p="2rem"
        backgroundColor="whiteAlpha.500"
      >
        <Tooltip label="click to close">
          <Image
            src={activePhoto.img_src}
            onClick={handleOnClick}
            cursor="pointer"
            _hover={{
              p: "1px",
            }}
          />
        </Tooltip>
        <Table color="white" variant="simple" w="20rem">
          <TableCaption color="white">Photo Details</TableCaption>
          <Tbody>
            <Tr>
              <Td>Earth Date</Td>
              <Td>{activePhoto.earth_date}</Td>
            </Tr>
            <Tr>
              <Td>Sol</Td>
              <Td>{activePhoto.sol}</Td>
            </Tr>
            <Tr>
              <Td>Rover</Td>
              <Td>{activePhoto.rover.name}</Td>
            </Tr>
            <Tr>
              <Td>Camera</Td>
              <Td>
                {activePhoto.camera.name} ({activePhoto.camera.full_name})
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Stack>
    </Stack>
  );
}
