import { Box } from "@chakra-ui/react";

const Section = (props: { children?: React.ReactNode }) => (
  <Box mt="3">{props.children}</Box>
);

export default Section;
