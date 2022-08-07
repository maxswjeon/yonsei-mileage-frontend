import { Box, Checkbox, Flex, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Course } from "../models/course";
import { CourseMileageInfo } from "../models/courseMileageInfo";
import { useStore } from "../store";
import MileageData from "./MileageData";
import MinMileage from "./MinMileage";

type InfoResult = {
  result: boolean;
  data: CourseMileageInfo[];
};

interface MileageInfoProps {
  course: Course;
}

const MileageInfo: React.FC<MileageInfoProps> = (props) => {
  const { course } = props;
  const store = useStore();

  const [isSecond, setIsSecond] = useState<boolean>(false);

  const studentInfo = {
    subjects: store.subjects,
    grade: store.grade,
    graduate: store.graduate,
  };

  const { data, isLoading } = useQuery<InfoResult>(
    ["info", course._id, studentInfo, !isSecond],
    async () => {
      const { data } = await axios.post<InfoResult>(
        `${process.env.NEXT_PUBLIC_API_URL}/info`,
        {
          id: course._id,
          studentInfo,
          isFirst: !isSecond,
        }
      );

      return data;
    }
  );

  return (
    <Box p="5">
      <Flex justifyContent="space-between" alignItems="end">
        <Flex alignItems="end">
          <Heading as="h2" size="lg">
            {course.KNA}
          </Heading>
          <Text ml="3" color="gray.500">
            {course.EKNA}
          </Text>
        </Flex>
        <Text>{course.PROF} 교수님</Text>
      </Flex>
      <Heading as="h3" size="md" mt="3">
        내 정보
      </Heading>

      <Flex justifyContent="space-between" mt="3">
        <Text>총 이수학점 비율: {(store.a1 / store.a2).toFixed(4)}</Text>
        <Text>
          직전학기 이수학점 비율:{" "}
          {(store.b1 / store.b2 > 1 ? 1 : store.b1 / store.b2).toFixed(4)}
        </Text>
        <Checkbox
          checked={isSecond}
          onChange={(e) => setIsSecond(e.currentTarget.checked)}
        >
          재수강
        </Checkbox>
      </Flex>

      {isLoading && (
        <Heading as="h2" size="xl" textAlign="center" mt="5">
          로딩중
        </Heading>
      )}

      {data && (
        <>
          <MinMileage data={data.data} />
          <MileageData data={data.data} />
        </>
      )}
    </Box>
  );
};

export default MileageInfo;
