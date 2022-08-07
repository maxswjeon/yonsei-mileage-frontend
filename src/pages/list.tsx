import { Box, Flex, Heading } from "@chakra-ui/react";
import { faChevronLeft, faPlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import ListItem from "../components/ListItem";
import MileageInfo from "../components/MileageInfo";
import useHydrated from "../hooks/useHydrated";
import { Course } from "../models/course";
import { useStore } from "../store";

const ListPage: NextPage = () => {
  const store = useStore();
  const hydrated = useHydrated();
  const courses = hydrated ? store.courses : [];
  const router = useRouter();
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  return (
    <Flex justifyContent="center" alignItems="center" height="100%">
      <Flex
        width={["100%", "70%"]}
        height="80vh"
        rounded="lg"
        boxShadow="2xl"
        mt={["0", "20"]}
        flexFlow="column"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          p="5"
          flexGrow="0"
          flexShrink="1"
          flexBasis="auto"
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => router.push("/")}
            cursor="pointer"
          />
          <Heading as="h1" size="lg" textAlign="center">
            연세대학교 마일리지 검색
          </Heading>
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => router.push("/add")}
            cursor="pointer"
          />
        </Flex>

        <Flex flexGrow="1" flexShrink="1" flexBasis="auto" overflow="hidden">
          <Box width="30%" overflowY="scroll">
            {courses.map((course) => (
              <ListItem
                key={course._id}
                course={course}
                onClick={() => setCurrentCourse(course)}
                selected={course._id === currentCourse?._id}
              />
            ))}

            {courses.length == 0 && (
              <Heading size="md" textAlign="center">
                아직 추가된 강의가 없습니다
              </Heading>
            )}
          </Box>
          <Box width="70%" overflowY="scroll">
            {currentCourse && <MileageInfo course={currentCourse} />}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ListPage;
