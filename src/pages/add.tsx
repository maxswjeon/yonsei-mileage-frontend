import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import SearchItem from "../components/SearchItem";
import { Course } from "../models/course";
import { useStore } from "../store";

const AddPage: NextPage = () => {
  const [query, setQuery] = useState<string>("");
  const { addCourse, courses } = useStore();
  const router = useRouter();

  const { data } = useQuery<Course[]>(
    ["search", query],
    async () => {
      const { data } = await axios.get<Course[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/search?query=${query}`
      );
      return data;
    },
    {
      enabled: Boolean(query),
    }
  );

  return (
    <Flex justifyContent="center" alignItems="center" height="100%">
      <Box
        maxWidth="500px"
        width="100%"
        p="5"
        rounded="lg"
        boxShadow="2xl"
        mt={["0", "20"]}
      >
        <Flex justifyContent="space-between" alignItems="center" pb="3">
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => router.push("/list")}
            cursor="pointer"
          />
          <Heading as="h1" size="lg" textAlign="center">
            연세대학교 마일리지 검색
          </Heading>
          <FontAwesomeIcon icon={faChevronLeft} visibility="hidden" />
        </Flex>
        <Input
          placeholder="과목명을 입력하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {data &&
          data
            .map((item) => {
              if (courses.map((course) => course._id).includes(item._id)) {
                return null;
              }

              return (
                <SearchItem
                  key={item._id}
                  course={item}
                  onClick={() => {
                    setQuery("");
                    addCourse(item);
                    router.push("/list");
                  }}
                />
              );
            })
            .filter((e) => !!e)}
      </Box>
    </Flex>
  );
};

export default AddPage;
