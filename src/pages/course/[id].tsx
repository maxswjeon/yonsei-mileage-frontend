import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Course } from "../../models/course";
import { CourseData } from "../../models/CourseData";
import CourseInfoSection from "../../sections/CourseInfoSection";
import GradeMinMileageSection from "../../sections/GradeMinMileageSection";
import MileageTabsSection from "../../sections/MileageTabsSection";
import MinMileageSection from "../../sections/MinMileageSection";
import { useStore } from "../../store";

type InfoResult = {
  result: boolean;
  course: Course;
  data: CourseData[];
};

const CoursePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const store = useStore();

  const { data: data_raw, isLoading } = useQuery<InfoResult>(
    // TODO: Add dependency here
    ["course", id],
    async () => {
      const { data } = await axios.post<InfoResult>(
        `${process.env.NEXT_PUBLIC_API_URL}/info`,
        { id }
      );

      return data;
    },
    {
      enabled: router.isReady && !!id,
    }
  );

  if (!router.isReady || isLoading) {
    return (
      <Box
        width="100%"
        maxWidth="840px"
        m="auto"
        mt="10"
        p="5"
        shadow="xl"
        rounded="xl"
      >
        <Flex alignItems="center">
          <Center cursor="pointer" onClick={() => router.push("/")} px="3">
            <FontAwesomeIcon icon={faChevronLeft} />
          </Center>
          <Flex alignItems="end" flex="1">
            <Heading as="h1" size="lg" mr="3">
              로딩중...
            </Heading>
          </Flex>
        </Flex>
      </Box>
    );
  }

  if (!id) {
    return (
      <Box
        width="100%"
        maxWidth="840px"
        m="auto"
        mt="10"
        p="5"
        shadow="xl"
        rounded="xl"
      >
        <Heading as="h1" size="xl" textAlign="center">
          올바른 접근이 아닙니다
        </Heading>
        <Center mt="5">
          <Button onClick={() => router.push("/")}>메인 페이지로</Button>
        </Center>
      </Box>
    );
  }

  if (!data_raw) {
    return (
      <Box
        width="100%"
        maxWidth="840px"
        m="auto"
        mt="10"
        p="5"
        shadow="xl"
        rounded="xl"
      >
        <Heading as="h1" size="xl" textAlign="center">
          데이터 불러오기에 실패했습니다
        </Heading>
        <Center mt="5">
          <Button onClick={() => router.push("/")}>메인 페이지로</Button>
        </Center>
      </Box>
    );
  }

  const { course, data } = data_raw;

  if (data.length === 0) {
    return (
      <Box
        width="100%"
        maxWidth="840px"
        m="auto"
        mt="10"
        p="5"
        shadow="xl"
        rounded="xl"
      >
        <Flex alignItems="center" pb="3">
          <Center cursor="pointer" onClick={() => router.push("/")} px="3">
            <FontAwesomeIcon icon={faChevronLeft} />
          </Center>
          <Flex alignItems="end" flex="1">
            <Heading as="h1" size="lg" mr="3">
              {course.KNA}
            </Heading>
            <Text size="sm" color="gray.500">
              {course.EKNA}
            </Text>
            <Spacer />
            <Text size="sm" color="gray.500">
              {course.FILE}
            </Text>
          </Flex>
        </Flex>

        <CourseInfoSection course={course} />

        <Heading as="h1" size="xl" textAlign="center">
          이전 학기 마일리지 정보가 없습니다
        </Heading>
        <Center mt="5">
          <Button onClick={() => router.push("/")}>메인 페이지로</Button>
        </Center>
      </Box>
    );
  }

  return (
    <Box
      width="100%"
      maxWidth="840px"
      m="auto"
      mt="10"
      p="5"
      shadow="xl"
      rounded="xl"
    >
      <Flex alignItems="center" pb="3">
        <Center cursor="pointer" onClick={() => router.push("/")} px="3">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Center>
        <Flex alignItems="end" flex="1">
          <Heading as="h1" size="lg" mr="3">
            {course.KNA}
          </Heading>
          <Text size="sm" color="gray.500">
            {course.EKNA}
          </Text>
          <Spacer />
          <Text size="sm" color="gray.500">
            {course.FILE}
          </Text>
        </Flex>
      </Flex>

      <CourseInfoSection course={course} />
      <MinMileageSection data={data} />
      <GradeMinMileageSection data={data} />
      <MileageTabsSection data={data} />
    </Box>
  );
};

export default CoursePage;
