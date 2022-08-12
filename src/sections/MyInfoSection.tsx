import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Section from "../components/Section";
import { useStore } from "../store";

const MyInfoSection: React.FC = (props) => {
  const store = useStore();

  return (
    <Section>
      <Heading as="h2" size="md">
        내 정보
      </Heading>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th textAlign="center">순위</Th>
              <Th textAlign="center">마일리지</Th>
              <Th textAlign="center">전공자 여부</Th>
              <Th textAlign="center">신청 과목수</Th>
              <Th textAlign="center">졸업 신청 여부</Th>
              <Th textAlign="center">초수강 여부</Th>
              <Th textAlign="center">총 이수학점 비율</Th>
              <Th textAlign="center">직전 이수학점 비율</Th>
              <Th textAlign="center">학년</Th>
              <Th textAlign="center">수강여부</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td textAlign="center">-</Td>
              <Td textAlign="center">-</Td>
              <Td textAlign="center">-</Td>
              <Td textAlign="center">{store.subjects}</Td>
              <Td textAlign="center">{store.graduate ? "O" : "X"}</Td>
              <Td textAlign="center">-</Td>
              <Td textAlign="center">{(store.a1 / store.a2).toFixed(4)}</Td>
              <Td textAlign="center">
                {(store.b1 / store.b2 > 1 ? 1 : store.b1 / store.b2).toFixed(4)}
              </Td>
              <Td textAlign="center">{store.grade}</Td>
              <Td textAlign="center">-</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Section>
  );
};

export default MyInfoSection;
