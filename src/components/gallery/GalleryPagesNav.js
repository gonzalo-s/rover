import { Box, ButtonGroup, Button } from "@chakra-ui/react";
import { useAppContext } from "../appContext";

export default function GalleryPagesNav() {
  const { filters, pages, selectPage } = useAppContext();

  let activePage = filters.page;

  function handleOnClick(value) {
    selectPage(Number(value));
  }
  return (
    <Box w="100%" border="1px" display="flex" justifyContent="center">
      <ButtonGroup spacing="2px">
        {pages.map((page, idx) => {
          let pageNumber = idx + 1;

          return (
            <Button
              w="2rem"
              variant="nasa"
              value={pageNumber}
              onClick={(event) => handleOnClick(event.target.value)}
              isDisabled={pageNumber === activePage}
              key={idx}
            >
              {pageNumber}
            </Button>
          );
        })}
      </ButtonGroup>
    </Box>
  );
}
