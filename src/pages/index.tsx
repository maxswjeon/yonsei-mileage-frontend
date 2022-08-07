import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStore } from "../store";

type FormValues = {
  a1: number;
  a2: number;
  subjects: number;
  b1: number;
  b2: number;
  grade: number;
  graduate: boolean;
};

const Home: NextPage = () => {
  const store = useStore();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      a1: store.a1 == -1 ? undefined : store.a1,
      a2: store.a2 == -1 ? undefined : store.a2,
      subjects: store.subjects == -1 ? undefined : store.subjects,
      b1: store.b1 == -1 ? undefined : store.b1,
      b2: store.b2 == -1 ? undefined : store.b2,
      grade: store.grade == -1 ? undefined : store.grade,
      graduate: store.graduate,
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    store.setData(data);
    router.push("/list");
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100%">
      <Box
        maxWidth="500px"
        width="100%"
        p="5"
        boxShadow="2xl"
        rounded="lg"
        mt={["0", "20"]}
      >
        <Heading as="h1" size="lg" pb="3" textAlign="center">
          연세대학교 마일리지 검색
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mt="3">
            <FormLabel>총 이수 학점</FormLabel>
            <Input type="number" {...register("a1", { required: true })} />
          </FormControl>
          <FormControl mt="3">
            <FormLabel>졸업 이수 학점</FormLabel>
            <Input type="number" {...register("a2", { required: true })} />
          </FormControl>
          <FormControl mt="3">
            <FormLabel>신청 과목 수</FormLabel>
            <Input
              type="number"
              {...register("subjects", { required: true })}
            />
          </FormControl>
          <FormControl mt="3">
            <FormLabel>직전학기 이수학점</FormLabel>
            <Input type="number" {...register("b1", { required: true })} />
          </FormControl>
          <FormControl mt="3">
            <FormLabel>학기당 수강 학점</FormLabel>
            <Input type="number" {...register("b2", { required: true })} />
          </FormControl>
          <FormControl mt="3">
            <FormLabel>학년</FormLabel>
            <Input type="number" {...register("grade", { required: true })} />
          </FormControl>
          <FormControl mt="3">
            <Checkbox {...register("graduate")}>졸업 신청</Checkbox>
          </FormControl>
          <Button
            mt={4}
            w="100%"
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            시작
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Home;
