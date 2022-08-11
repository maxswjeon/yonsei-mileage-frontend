import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Course } from "../models/course";

interface SearchItemProps {
  course: Course;
  selected: boolean;
  onClick: () => void;
}

const ListItem: React.FC<SearchItemProps> = (props) => {
  const { course, onClick, selected } = props;

  return (
    <Box
      cursor="pointer"
      onClick={onClick}
      bgColor={selected ? "gray.100" : "white"}
      p="3"
    >
      <Flex justifyContent="space-between" py="2">
        <div>
          <Heading size="md">{course.KNA}</Heading>
          <Text color="gray.400" fontSize="xs">
            {course.EKNA}
          </Text>
        </div>
        <div>
          <Text textAlign="right">
            {course.ocode1_title} - {course.PROF}
          </Text>
          <Text textAlign="right">{course.FILE}</Text>
        </div>
      </Flex>
    </Box>
  );
};

export default ListItem;
