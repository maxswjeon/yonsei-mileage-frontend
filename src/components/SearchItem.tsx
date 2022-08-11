import { Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Course } from "../models/course";

interface SearchItemProps {
  course: Course;
}

const SearchItem: React.FC<SearchItemProps> = (props) => {
  const router = useRouter();
  const { course } = props;

  return (
    <Flex
      justifyContent="space-between"
      py="2"
      onClick={() => router.push(`/course/${course._id}`)}
      cursor="pointer"
    >
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
