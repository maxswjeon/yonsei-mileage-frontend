import { Flex, Heading, Text } from "@chakra-ui/react";
import { Course } from "../models/course";

interface SearchItemProps {
  course: Course;
  onClick: () => void;
}

const SearchItem: React.FC<SearchItemProps> = (props) => {
  const { course, onClick } = props;

  return (
    <Flex justifyContent="space-between" py="2" onClick={onClick}>
      <div>
        <Heading size="md">{course.KNA}</Heading>
        <Text>{course.EKNA}</Text>
      </div>
      <div>
        <Text textAlign="right">
          {course.ocode1_title} - {course.PROF}
        </Text>
        <Text textAlign="right">{course.FILE}</Text>
      </div>
    </Flex>
  );
};

export default SearchItem;
