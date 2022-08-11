import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useStore } from "../store";

type FormValues = {
  username: string;
  password: string;
};

type LoginResult = {
  result: boolean;
  total: string;
  remain: string;
  grade: string;
};

const InfoPage: NextPage = () => {
  const store = useStore();

  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    try {
      const { data } = await axios.post<LoginResult>(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        {
          username: values.username,
          password: values.password,
        }
      );

      store.setData({
        a1: Number(data.total) - Number(data.remain),
        a2: Number(data.total),
        grade: Number(data.grade),
      });
      onClose();
    } catch (e: unknown) {
      if (!axios.isAxiosError(e)) {
        toast({
          title: "오류",
          description: "알 수 없는 오류가 발생했습니다",
          status: "error",
        });
        return;
      }

      const error = e as AxiosError;
      if (error.response?.status === 403) {
        toast({
          title: "오류",
          description: "아이디 또는 비밀번호가 잘못되었습니다",
          status: "error",
        });
        return;
      }

      toast({
        title: "오류",
        description: "알 수 없는 오류가 발생했습니다",
        status: "error",
      });
    }
  };

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
        <Heading
          as="h1"
          size="lg"
          color={
            store.a1 == -1 ||
            store.a2 == -1 ||
            store.b1 == -1 ||
            store.b2 == -1 ||
            store.grade == -1 ||
            store.subjects == -1
              ? "red.600"
              : "black"
          }
        >
          학생정보
        </Heading>
      </Flex>
      <Button mt="3" size="sm" onClick={onOpen}>
        학생 정보 불러오기
      </Button>
      <Flex mt="3" justifyContent="space-between" gap="3">
        <FormControl>
          <FormLabel>총 이수 학점</FormLabel>
          <Input
            type="number"
            value={store.a1 != -1 ? store.a1 : undefined}
            onChange={(e) =>
              store.setData({ a1: Number(e.currentTarget.value) })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>졸업 이수 학점</FormLabel>
          <Input
            type="number"
            value={store.a2 != -1 ? store.a2 : undefined}
            onChange={(e) =>
              store.setData({ a2: Number(e.currentTarget.value) })
            }
          />
        </FormControl>
      </Flex>
      <Flex mt="1" justifyContent="space-between" gap="3">
        <FormControl>
          <FormLabel color="red.600">신청 과목 수 (직접입력)</FormLabel>
          <Input
            type="number"
            value={store.subjects != -1 ? store.subjects : undefined}
            onChange={(e) =>
              store.setData({ subjects: Number(e.currentTarget.value) })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel color="red.600">직전학기 이수 학점 (직접입력)</FormLabel>
          <Input
            type="number"
            value={store.b1 != -1 ? store.b1 : undefined}
            onChange={(e) =>
              store.setData({ b1: Number(e.currentTarget.value) })
            }
          />
        </FormControl>
      </Flex>
      <Flex mt="1" justifyContent="space-between" gap="3">
        <FormControl>
          <FormLabel color="red.600">학기당 수강 학점 (직접입력)</FormLabel>
          <Input
            type="number"
            value={store.b2 != -1 ? store.b2 : undefined}
            onChange={(e) =>
              store.setData({ b2: Number(e.currentTarget.value) })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>학년</FormLabel>
          <Input
            type="number"
            value={store.grade != -1 ? store.grade : undefined}
            onChange={(e) =>
              store.setData({ grade: Number(e.currentTarget.value) })
            }
          />
        </FormControl>
      </Flex>
      <FormControl mt="1">
        <FormLabel>졸업신청여부</FormLabel>
        <Checkbox
          checked={store.graduate}
          onChange={(e) => store.setData({ graduate: e.currentTarget.checked })}
        >
          졸업 신청
        </Checkbox>
      </FormControl>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>연세포탈 로그인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>연세포탈 아이디 (학번)</FormLabel>
              <Input
                type="text"
                placeholder="연세포탈 아이디(학번)를 입력하세요"
                {...register("username", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>연세포탈 비밀번호</FormLabel>
              <Input
                type="password"
                placeholder="연세포탈 비밀번호를 입력하세요"
                {...register("password", { required: true })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              isLoading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              mr="3"
            >
              로그인
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default InfoPage;
