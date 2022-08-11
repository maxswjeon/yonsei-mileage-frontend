import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import SearchItem from "../components/SearchItem";
import { Course } from "../models/course";
import { useStore } from "../store";

const MainPage: NextPage = () => {
  const router = useRouter();

  const store = useStore();

  const disabled =
    store.a1 == -1 ||
    store.a2 == -1 ||
    store.b1 == -1 ||
    store.b2 == -1 ||
    store.grade == -1 ||
    store.subjects == -1;

  const [query, setQuery] = useState<string>("");
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
    <Box
      width="100%"
      maxWidth="840px"
      m="auto"
      mt="10"
      p="5"
      shadow="xl"
      rounded="xl"
    >
      <Flex justifyContent="space-between">
        <Heading as="h1" size="lg">
          강의 검색
        </Heading>
        <Button
          size="sm"
          onClick={() => router.push("/info")}
          colorScheme={disabled ? "teal" : undefined}
        >
          학생 정보 설정
        </Button>
      </Flex>
      <Input
        mt="3"
        placeholder="과목명, 교수명 또는 학정번호로 검색하세요"
        value={query}
        disabled={disabled}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      {data &&
        data.slice(0, 10).map((item) => {
          return <SearchItem key={item._id} course={item} />;
        })}
    </Box>
  );
};

export default MainPage;
