import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Course } from "../../models/course";
import { useStore } from "../../store";

type InfoResult = {
  result: boolean;
  course: Course;
  data: { course: Course; data: History[]; min: number }[];
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

      <Heading as="h2" size="md" mt="3">
        강의정보
      </Heading>
      <Text>교수명: {course.PROF} 교수님</Text>

      <Heading as="h2" size="md" mt="3">
        최저 마일리지 정보
      </Heading>
      <Text fontSize="xs" color="gray.500">
        최저 마일리지 정보는 학생 정보를 반영하지 않은 정보입니다
      </Text>
      <Table>
        <Thead>
          <Tr>
            {data.map((d) => (
              <Th key={d.course._id} textAlign="center">
                {d.course.HYHG}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            {data.map((d) => (
              <Th key={d.course._id} textAlign="center">
                {d.min}
              </Th>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default CoursePage;
